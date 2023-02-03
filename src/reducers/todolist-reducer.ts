import {v1} from 'uuid';
import { TodolistType } from '../Todolist';

enum ACTIONS {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TODOLIST = 'ADD_TODOLIST',
}

export const todolistReducer = (state: Array<TodolistType>, action: TodolistReducerActionsType) => {
    switch (action.type) {
        case ACTIONS.REMOVE_TODOLIST:
            return state.filter((todolist: TodolistType) => todolist.id !== action.payload.todolistID);
        case ACTIONS.ADD_TODOLIST:
            return [{id: action.payload.todolistID, title: action.payload.title, filter: "All"}, ...state];
        default:
            return state;
    }
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
type TodolistReducerActionsType = RemoveTodolistActionType | AddTodolistActionType;

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: ACTIONS.REMOVE_TODOLIST,
        payload: {todolistID}
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: ACTIONS.ADD_TODOLIST,
        payload: {todolistID: v1(), title}
    } as const
}
