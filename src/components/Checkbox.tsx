import React, {ChangeEvent, memo, useCallback} from 'react';

type PropsType = {
    isDone: boolean
    callback: (isDone: boolean) => void;
}

export const Checkbox: React.FC<PropsType> = memo((props) => {

    const onChangeCheckboxHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked);
    }, [props.callback]);

    return (
        <input type={'checkbox'}
               checked={props.isDone}
               onChange={onChangeCheckboxHandler}
        />
    );
});
