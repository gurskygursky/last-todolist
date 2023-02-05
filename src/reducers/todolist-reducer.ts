import {v1} from 'uuid';
import {TasksFilterType, TodolistType} from '../Todolist';

export const todolistReducer = (state: Array<TodolistType>, action: TodolistReducerActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter((todolist: TodolistType) => todolist.id !== action.payload.todolistID);
        case 'ADD_TODOLIST':
            return [{id: action.payload.todolistID, title: action.payload.title, filter: "All"}, ...state];
        case 'CHANGE_TODOLIST_TITLE':
            return state.map((todolist: TodolistType) => todolist.id === action.payload.todolistID
                ? {...todolist, title: action.payload.title}
                : todolist)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map((todolist: TodolistType) => todolist.id === action.payload.todolistID
                ? {...todolist, filter: action.payload.filter}
                : todolist)
        default:
            return state;
    }
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
type TodolistReducerActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todolistID}
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {todolistID: v1(), title}
    } as const
}

export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {todolistID, title}
    } as const
}
export const changeTodolistFilterAC = (todolistID: string, filter: TasksFilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {todolistID, filter}
    } as const
}
