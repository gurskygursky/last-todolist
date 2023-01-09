import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type PropsType = {
    callbackHandler: (value: string) => void;
}

export const InputForm: React.FC<PropsType> = (props) => {

    const [value, setValue] = useState<string>('');

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const onClickHandler = () => {
        props.callbackHandler(value);
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            props.callbackHandler(value);
            setValue('');
        }
    }

    return (
        <div>
            <input type={'text'}
                   value={value}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};
