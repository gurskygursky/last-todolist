import React, {ChangeEvent} from 'react';

type PropsType = {
    isDone: boolean
    callback: (isDone: boolean) => void;
}

export const Checkbox: React.FC<PropsType> = (props) => {

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }

    return (
        <input type={'checkbox'}
               checked={props.isDone}
               onChange={onChangeCheckboxHandler}
        />
    );
};
