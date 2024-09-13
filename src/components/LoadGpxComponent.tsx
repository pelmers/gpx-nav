import React from 'react';
import CheckboxControlInputComponent from './CheckboxControlInputComponent';
import RangeSliderComponent from './RangeSliderComponent';

type Props = {
    onGpxLoad: (gpxFile: File, joinTracks: boolean) => unknown;
};

type State = {
    joinTracks: boolean;
};

export default class LoadGpxComponent extends React.Component<Props, State> {
    gpxInputRef = React.createRef<HTMLInputElement>();

    state = {
        // TODO: add control for map mode
        joinTracks: false,
    };

    render() {
        const joinTracksHelpText = `If there are multiple tracks in the GPX file,
            then join them together. Otherwise, only show the first one.
            Note that most files only have one track.`;

        const handleFiles = (files: FileList) =>
            this.props.onGpxLoad(files[0], this.state.joinTracks);
        return (
            <div className="center">
                <h4 id="gpx-step-header">Load GPX file</h4>
                <div id="gpx-step-contents">
                    <div>
                        <button
                            id="gpx-button"
                            onClick={() => this.gpxInputRef.current!.click()}
                        >
                            Select
                        </button>
                        <input
                            type="file"
                            id="gpx-input"
                            accept=".gpx"
                            ref={this.gpxInputRef}
                            onChange={() =>
                                handleFiles(this.gpxInputRef.current!.files!)
                            }
                        />
                    </div>
                    <div
                        id="gpx-dragdrop"
                        onClick={() => this.gpxInputRef.current!.click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            (e.target as Element).classList.remove('dragEnter');
                            handleFiles(e.dataTransfer!.files);
                        }}
                        onDragEnter={(e) => {
                            (e.target as Element).classList.add('dragEnter');
                        }}
                        onDragExit={(e) => {
                            (e.target as Element).classList.remove('dragEnter');
                        }}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    >
                        Or drag and drop here
                    </div>
                </div>
                <div className="control-group">
                    <CheckboxControlInputComponent
                        labelText="Join Tracks"
                        defaultChecked={this.state.joinTracks}
                        helpText={joinTracksHelpText}
                        onChange={(checked) => this.setState({ joinTracks: checked })}
                    />
                </div>
            </div>
        );
    }
}
