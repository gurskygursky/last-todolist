import {TodolistType} from './../Todolist';

export const todolistReducer = (state: Array<TodolistType>, action: any) => {
    switch (action.type) {
        case '':
            return state;
        default:
            return state;
    }
};
