import React from 'react';
import { createRoot } from 'react-dom/client';

import ErrorComponent from './components/ErrorComponent';
import LoadGpxComponent from './components/LoadGpxComponent';
import LoadingComponent from './components/LoadingComponent';
import { GpxInfo } from './types';
import { MapMode, pointsToMapsUrl } from './mapTools';

type State = {
    gpxInfo?: GpxInfo;
    gpxError?: string;
    isLoadingFile?: boolean;
    mapMode?: MapMode;
};

// Limitation of google maps directions: max 25 waypoints.
const GMAPS_TARGET_POINTS = 25;

class App extends React.Component<{}, State> {
    state: State = {};

    onFileAdded = async (file: File, joinTracks: boolean, mapMode: MapMode) => {
        this.setState({ isLoadingFile: true });
        try {
            // Import the other components async so the bundle can be split
            const [gpxContents, gpxParse] = await Promise.all([
                file.text(),
                import('./gpxParsing'),
            ]);
            this.setState({
                isLoadingFile: false,
                gpxError: undefined,
                gpxInfo: gpxParse.default(gpxContents, GMAPS_TARGET_POINTS, joinTracks),
                mapMode,
            });
        } catch (e) {
            this.setState({
                isLoadingFile: false,
                gpxError: e.message,
            });
        }
    };

    render() {
        if (this.state.isLoadingFile) {
            return <LoadingComponent message={'Processing selected file'} />;
        } else if (this.state.gpxError != null) {
            return (
                <>
                    <ErrorComponent message={this.state.gpxError} />
                    <LoadGpxComponent onGpxLoad={this.onFileAdded} />
                </>
            );
        } else if (this.state.gpxInfo != null) {
            const url = pointsToMapsUrl(this.state.gpxInfo.points, this.state.mapMode);
            return (
                <div className="resultLinkContainer center">
                    <h2>Open Google Maps</h2>
                    <button
                        style={{ fontSize: 24 }}
                        onClick={() => window.open(url, '_blank')}
                    >
                        Open in Google Maps
                    </button>
                </div>
            );
        } else {
            return <LoadGpxComponent onGpxLoad={this.onFileAdded} />;
        }
    }
}

const root = createRoot(document.getElementById('react-root')!);
root.render(<App />);
