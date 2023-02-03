import {v1} from "uuid";
import {TasksType, TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

enum ACTIONS {
    REMOVE_TASK = 'REMOVE_TASK',
    REMOVE_TODOLIST = 'REMOVE_TODOLIST',
    ADD_TASK = 'ADD_TASK',
    TASK_STATUS_CHANGED = 'TASK_STATUS_CHANGED',
    TASK_TITLE_CHANGED = 'TASK_TITLE_CHANGED',
    ADD_TODOLIST = 'ADD_TODOLIST',
}

export const tasksReducer = (state: TasksType, action: TasksReducerActionsType | RemoveTodolistActionType | AddTodolistActionType): TasksType => {
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
        case ACTIONS.TASK_STATUS_CHANGED:
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].map((task: TaskType) => task.id === action.payload.taskID
                        ? {...task, isDone: action.payload.isDone} : task)
            }
        case ACTIONS.TASK_TITLE_CHANGED:
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].map((task: TaskType) => task.id === action.payload.taskID
                        ? {...task, title: action.payload.title} : task)
            }
        case ACTIONS.ADD_TODOLIST: return {
            ...state, [action.payload.todolistID]: []
        }
        default:
            return state;
    }
};

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
type TasksReducerActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;

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
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: ACTIONS.TASK_STATUS_CHANGED,
        payload: {todolistID, taskID, isDone}
    } as const
}
export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: ACTIONS.TASK_TITLE_CHANGED,
        payload: {todolistID, taskID, title}
    } as const
}
