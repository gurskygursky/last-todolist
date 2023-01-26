import {v1} from 'uuid';
import {removeTodolistAC, todolistReducer} from '../reducers/todolist-reducer';
import { TodolistType } from '../Todolist';

test('task should be removed is correct', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TodolistType[] = [
        {id: todolistID1, title: 'Reading list', filter: 'All'},
        {id: todolistID2, title: 'What to learn ', filter: 'All'},
    ];

    const endState = todolistReducer(startState, removeTodolistAC(todolistID1));


    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
});
