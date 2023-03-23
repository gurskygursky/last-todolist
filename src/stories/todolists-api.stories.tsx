import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'LISTS_API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
            .then(res => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const title = 'sss'

    const [state, setState] = useState<any>(null);
    useEffect(() => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title},  settings)
            .then(res => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null);

    const todolistId = '9cd425ff-5b60-40ca-a7d5-e105b50a63ff';

    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,  settings)
            .then(res => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null);

    const todolistId = '6a48b59f-6e0f-41c4-8e4c-c75293eaddbb';
    const title = 'XXXXXX';

    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title},  settings)
            .then(res => {
                setState(res.data);
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>
}
