import React from 'react';
type Props = {
    onGpxLoad: (gpxFile: File, joinTracks: boolean) => unknown;
};
type State = {
    joinTracks: boolean;
};
export default class LoadGpxComponent extends React.Component<Props, State> {
    gpxInputRef: React.RefObject<HTMLInputElement>;
    state: {
        joinTracks: boolean;
    };
    render(): JSX.Element;
}
export {};
