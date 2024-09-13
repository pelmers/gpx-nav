import React from 'react';
type Option<T> = {
    value: T;
    label: string;
};
type Props<T> = {
    labelText: string;
    options: Option<T>[];
    defaultValue: T;
    helpText: string;
    onChange: (selectedValue: T) => unknown;
};
export default function MultipleChoiceInputComponent<T extends React.Key>(props: Props<T>): JSX.Element;
export {};
