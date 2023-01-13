import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type PropsType = {
    callback: (value: string) => void;
}

export const InputForm: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>('');


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
        setError(null);
    }

    const callbackHandler = () => {
        if (value.trim() !== '') {
            props.callback(value);
            setValue('');
        }
        if (value.trim() === '') {
            setError('Invalid value!')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            callbackHandler();
            setValue('');
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                   // style={error ? {borderColor: 'crimson'} : {}}
                   type={'text'}
                   value={value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={callbackHandler}>+</button>
            <div className={error ? 'textError' : ''}>{error}</div>
        </div>
    );
};
