import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {v1} from "uuid";


let tasks: TasksStateType;

beforeEach(() => {
    tasks = {
        ['todolistId1']: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        ['todolistId2']: [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true}
        ]
    }
})

test('task should be removed', () => {

    const action = removeTaskAC('todolistId2', '2')
    const endTasks = tasksReducer(tasks, action)
    expect(endTasks['todolistId2'].length).toBe(1)
    expect(endTasks['todolistId2'][0].title).toBe("Milk")
    expect(endTasks['todolistId1'].length).toBe(2)
})
test('task should be added', () => {

    const action = addTaskAC('todolistId2', 'newTaskTitle')
    const endTasks = tasksReducer(tasks, action)
    expect(endTasks['todolistId2'].length).toBe(3)
    expect(endTasks['todolistId2'][2].title).toBe("newTaskTitle")
    expect(endTasks['todolistId1'].length).toBe(2)
})
test('task status should be changed', () => {


    const action = changeTaskStatusAC('todolistId2', '2', false)
    const endTasks = tasksReducer(tasks, action)
    expect(endTasks['todolistId2'].length).toBe(2)
    expect(endTasks['todolistId2'][1].isDone).toBe(false)
    expect(endTasks['todolistId1'].length).toBe(2)
})
test('task title should be changed', () => {

    const action = changeTaskTitleAC('todolistId2', '2', 'newTitle')
    const endTasks = tasksReducer(tasks, action)
    expect(endTasks['todolistId2'].length).toBe(2)
    expect(endTasks['todolistId2'][1].title).toBe('newTitle')
    expect(endTasks['todolistId1'][1].title).toBe('JS')
    expect(endTasks['todolistId1'].length).toBe(2)
})

test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist', v1())

    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC('todolistId2')

    const endState = tasksReducer(tasks, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
