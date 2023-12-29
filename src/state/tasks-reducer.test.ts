import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('task should be deleted', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const tasks = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }


    const newTasks = tasksReducer(tasks, removeTaskAC(todolistId1, tasks[todolistId1][0].id))

    expect(newTasks[todolistId1].length).toBe(1)
    expect(newTasks[todolistId1][0].title).toBe("JS")
    expect(newTasks[todolistId2].length).toBe(2)
})
test('task should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const tasks = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const newTasks = tasksReducer(tasks, addTaskAC(todolistId2, 'Fresh-added Task'))

    expect(newTasks[todolistId1].length).toBe(2)
    expect(newTasks[todolistId2].length).toBe(3)
    expect(newTasks[todolistId2][2].title).toBe('Fresh-added Task')

})
test('task title should be updated', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const tasks = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }


    const newTasks = tasksReducer(tasks, changeTaskTitleAC(
        todolistId2, tasks[todolistId2][1].id, 'The Great React Book'))

    expect(newTasks[todolistId1].length).toBe(2)
    expect(newTasks[todolistId2].length).toBe(2)
    expect(newTasks[todolistId2][1].title).toBe('The Great React Book')
    expect(newTasks[todolistId2][0].title).toBe('Milk')
})
test('task status should be updated', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const tasks = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }

    const newTasks = tasksReducer(tasks, changeTaskStatusAC(
        todolistId2, tasks[todolistId2][0].id, false ))

    expect(newTasks[todolistId1][1].isDone).toBe(true)
    expect(newTasks[todolistId1][0].isDone).toBe(true)
    expect(newTasks[todolistId2][0].isDone).toBe(false)
    expect(newTasks[todolistId2][1].isDone).toBe(true)
})






