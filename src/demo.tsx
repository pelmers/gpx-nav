import React from 'react';
import { createRoot } from 'react-dom/client';

import ErrorComponent from './components/ErrorComponent';
import LoadGpxComponent from './components/LoadGpxComponent';
import LoadingComponent from './components/LoadingComponent';
import { GpxInfo } from './types';
import { pointsToMapsUrl } from './mapTools';

type State = {
    gpxInfo?: GpxInfo;
    gpxError?: string;
    isLoadingFile?: boolean;
};

// Limitation of google maps directions: max 25 waypoints.
const GMAPS_TARGET_POINTS = 25;

class App extends React.Component<{}, State> {
    state: State = {};

    onFileAdded = async (file: File, joinTracks: boolean) => {
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
            console.log('url1', pointsToMapsUrl(this.state.gpxInfo.points));
            // TODO: show this in a component
            // TODO: by the way if the start and the end are too close then it's no good...
            return <div>see console</div>;
        } else {
            return <LoadGpxComponent onGpxLoad={this.onFileAdded} />;
        }
    }
}

const root = createRoot(document.getElementById('react-root')!);
root.render(<App />);
