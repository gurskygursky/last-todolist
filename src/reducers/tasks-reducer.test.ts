import {v1} from 'uuid';
import {TasksType} from './../Todolist';
import {removeTaskAC, tasksReducer} from './../reducers/tasks-reducer';

test('task should be removed is correct', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TasksType = {
        [todolistID1]: [
            {id: '1', title: 'The Madness Of Crowds', isDone: true},
            {id: '2', title: 'Atomic Habits:', isDone: true},
            {id: '3', title: 'The Rise and Fall of the Third Reich', isDone: true},
            {id: '4', title: 'JavaScript for Kids', isDone: true},
            {id: '5', title: `JavaScript Absolute Beginner's Guide`, isDone: false},
        ],
        [todolistID2]: [
            {id: '1', title: 'HTML & CSS', isDone: true},
            {id: '2', title: 'Javascript', isDone: true},
            {id: '3', title: 'Typescript', isDone: true},
            {id: '4', title: 'React', isDone: true},
            {id: '5', title: 'Node.JS', isDone: false},
        ],
    };

    const endState = tasksReducer(startState, removeTaskAC(todolistID1, '2'));


    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID1]).toEqual(
        [
            {id: '1', title: 'The Madness Of Crowds', isDone: true},
            {id: '3', title: 'The Rise and Fall of the Third Reich', isDone: true},
            {id: '4', title: 'JavaScript for Kids', isDone: true},
            {id: '5', title: `JavaScript Absolute Beginner's Guide`, isDone: false},
        ]
    );
    expect(endState[todolistID2]).toEqual(
        [
            {id: '1', title: 'HTML & CSS', isDone: true},
            {id: '2', title: 'Javascript', isDone: true},
            {id: '3', title: 'Typescript', isDone: true},
            {id: '4', title: 'React', isDone: true},
            {id: '5', title: 'Node.JS', isDone: false},
        ]
    );
});