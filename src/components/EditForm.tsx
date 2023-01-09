import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (value: string) => void;
    value: string;
}

export const EditForm: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>(props.value);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const callbackHandler = () => {
        props.callback(value);
    }

    const editModeHandler = () => {
        if (value.trim() !== '') {
            callbackHandler();
            setEditMode(!editMode);
        }
        if (value.trim() === '') {
            setError('Invalid value!');
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        setError(null);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        const {key} = event;

        if (key === 'Enter') {
            if (value.trim() !== '') {
                callbackHandler();
                setEditMode(!editMode);
            }
            if (value.trim() === '') {
                setError('Invalid value!');
            }
        }
    }

    return (
        <div style={{listStyle: 'none', paddingTop: '15px'}}>
            {
                editMode
                    ? <input style={error ? {borderColor: 'crimson'} : {}}
                             value={value}
                             onChange={onChangeHandler}
                             onKeyDown={onKeyPressHandler}
                             onBlur={editModeHandler}
                             autoFocus/>
                    : <span onDoubleClick={editModeHandler}>{props.value}</span>
            }
            <div style={{color: 'crimson'}}>{error}</div>
        </div>
    );
};

