import {TodolistType} from './../Todolist';

enum ACTIONS {
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
}

export const todolistReducer = (state: Array<TodolistType>, action: TodolistReducerActionsType) => {
    switch (action.type) {
        case ACTIONS.REMOVE_TODOLIST:
            return state.filter((todolist: TodolistType) => todolist.id !== action.payload.todolistID);
        default:
            return state;
    }
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
type TodolistReducerActionsType = RemoveTodolistActionType;

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: ACTIONS.REMOVE_TODOLIST,
        payload: {todolistID}
    } as const
}
