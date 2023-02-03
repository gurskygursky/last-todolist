import {v1} from "uuid";
import {TasksType, TaskType} from "../Todolist";
import { RemoveTodolistActionType } from "./todolist-reducer";

enum ACTIONS {
    REMOVE_TASK = 'REMOVE_TASK',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TASK = 'ADD_TASK',
}

export const tasksReducer = (state: TasksType, action: TasksReducerActionsType | RemoveTodolistActionType): TasksType => {
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
        case ACTIONS.ADD_TASK:
            return {
                ...state,
                [action.payload.todolistID]: [
                    {
                        id: v1(),
                        title: action.payload.title,
                        isDone: false
                    }, ...state[action.payload.todolistID]
                ]
            }
        default:
            return state;
    }
};

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type TasksReducerActionsType = RemoveTaskActionType | AddTaskActionType;

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: ACTIONS.REMOVE_TASK,
        payload: {todolistID, taskID}
    } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: ACTIONS.ADD_TASK,
        payload: {todolistID, title}
    } as const
}
