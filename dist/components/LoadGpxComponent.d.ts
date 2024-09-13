import React from 'react';
import { MapMode } from '../mapTools';
type Props = {
    onGpxLoad: (gpxFile: File, joinTracks: boolean, mapMode: MapMode) => unknown;
};
type State = {
    joinTracks: boolean;
    mapMode: MapMode;
};
export default class LoadGpxComponent extends React.Component<Props, State> {
    gpxInputRef: React.RefObject<HTMLInputElement>;
    state: {
        joinTracks: boolean;
        mapMode: "bike";
    };
    render(): JSX.Element;
}
export {};
