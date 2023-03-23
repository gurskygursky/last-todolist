import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type PropsType = {
    callback: (value: string) => void;
    value: string;
}

export const EditForm: React.FC<PropsType> = memo((props) => {

    const [value, setValue] = useState<string>(props.value);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const editModeHandler = () => {
        if (value.trim() !== '') {
            props.callback(value);
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
                props.callback(value);
                setEditMode(!editMode);
            }
            if (value.trim() === '') {
                setError('Invalid value!');
            }
        }
    }

    return (
        editMode
            ? <input className={error ? 'error' : ''}
                // style={error ? {borderColor: 'crimson', color: 'crimson'} : {}}
                     value={error ? error : value}
                     onChange={onChangeHandler}
                     onKeyDown={onKeyPressHandler}
                     onBlur={editModeHandler}
                     autoFocus
            />
            : <span onDoubleClick={editModeHandler}>{props.value}</span>
    );
});
