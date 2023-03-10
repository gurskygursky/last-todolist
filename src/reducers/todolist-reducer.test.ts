import {v1} from 'uuid';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from '../reducers/todolist-reducer';
import {TasksFilterType, TodolistType} from '../Todolist';

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

test('correct todolist should change its name', () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'Reading list', filter: 'All'},
        {id: todolistID2, title: 'What to learn ', filter: 'All'},
    ]

    const action = changeTodolistTitleAC(todolistID2, 'new todolist');

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe('Reading list')
    expect(endState[1].title).toBe('new todolist')
});

test('correct filter of todolist should be changed', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newFilter: TasksFilterType = 'Completed'

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'}
    ]

    const action = changeTodolistFilterAC(todolistID1, newFilter);

    const endState = todolistReducer(startState, action)

    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('All');
});
