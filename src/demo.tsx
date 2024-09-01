import React from 'react';
import { createRoot } from 'react-dom/client';

import ErrorComponent from './components/ErrorComponent';
import LoadGpxComponent from './components/LoadGpxComponent';
import LoadingComponent from './components/LoadingComponent';
import { GpxInfo } from './types';

type State = {
    gpxInfo?: GpxInfo;
    gpxError?: string;
    isLoadingFile?: boolean;
};

class App extends React.Component<{}, State> {
    state: State = {};

    onFileAdded = async (file: File, smoothingFactor: number, joinTracks: boolean) => {
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
                gpxInfo: gpxParse.default(gpxContents, smoothingFactor, joinTracks),
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
            // TODO: just show the generated maps link
            throw new Error('not implemented');
        } else {
            return <LoadGpxComponent onGpxLoad={this.onFileAdded} />;
        }
    }
}

const root = createRoot(document.getElementById('react-root')!);
root.render(<App />);
