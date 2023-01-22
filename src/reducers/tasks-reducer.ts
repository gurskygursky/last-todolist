import {TasksType, TaskType} from './../Todolist';
import {RemoveTodolistActionType} from './../reducers/todolist-reducer';

enum ACTIONS {
    REMOVE_TASK = 'REMOVE_TASK',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
}

export const tasksReducer = (state: TasksType, action: TasksReducerActionsType | RemoveTodolistActionType) => {
    switch (action.type) {
        case ACTIONS.REMOVE_TASK:
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter((task: TaskType) =>
                    task.id !== action.payload.taskID)
            }
        case ACTIONS.REMOVE_TODOLIST:
            return {
                ...state, [action.payload.todolistID]: []
            }
        default:
            return state;
    }
};

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type TasksReducerActionsType = RemoveTaskActionType;

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: ACTIONS.REMOVE_TASK,
        payload: {todolistID, taskID}
    } as const
}
