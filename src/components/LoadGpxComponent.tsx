import React from 'react';
import CheckboxControlInputComponent from './CheckboxControlInputComponent';
import RangeSliderComponent from './RangeSliderComponent';
import { MapMode } from '../mapTools';
import MultipleChoiceInputComponent from './MultipleChoiceInputComponent';

type Props = {
    onGpxLoad: (gpxFile: File, joinTracks: boolean, mapMode: MapMode) => unknown;
};

type State = {
    joinTracks: boolean;
    mapMode: MapMode;
};

export default class LoadGpxComponent extends React.Component<Props, State> {
    gpxInputRef = React.createRef<HTMLInputElement>();

    state = {
        joinTracks: false,
        mapMode: 'bike' as const,
    };

    render() {
        const joinTracksHelpText = `If there are multiple tracks in the GPX file,
            then join them together. Otherwise, only show the first one.
            Note that most files only have one track.`;

        const handleFiles = (files: FileList) =>
            this.props.onGpxLoad(files[0], this.state.joinTracks, this.state.mapMode);
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
                    <MultipleChoiceInputComponent
                        labelText="Travel Mode"
                        helpText="Select the initial travel mode. This can be changed within Google Maps."
                        options={[
                            {
                                value: 'bike' as const,
                                label: 'Bike',
                            },
                            {
                                value: 'car' as const,
                                label: 'Car',
                            },
                            {
                                value: 'walk' as const,
                                label: 'Walk',
                            },
                        ]}
                        defaultValue={this.state.mapMode}
                        onChange={(value) => this.setState({ mapMode: value })}
                    />
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
