import React from 'react';
import LabelInputWithHelp from './LabelInputWithHelp';

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

export default function MultipleChoiceInputComponent<T extends React.Key>(
    props: Props<T>
) {
    const { labelText, options, defaultValue, helpText, onChange } = props;

    return (
        <LabelInputWithHelp
            label={<label>{labelText}</label>}
            input={
                <div>
                    {options.map((option) => (
                        <div key={option.value} style={{ marginBottom: '8px' }}>
                            <input
                                type="radio"
                                id={String(option.value)}
                                name={labelText}
                                value={String(option.value)}
                                defaultChecked={option.value === defaultValue}
                                onChange={() => onChange(option.value)}
                                style={{ marginRight: '8px' }}
                            />
                            <label htmlFor={String(option.value)}>{option.label}</label>
                        </div>
                    ))}
                </div>
            }
            helpText={helpText}
        />
    );
}
