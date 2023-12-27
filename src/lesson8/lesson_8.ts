// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    // console.log(nums)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return nums.reduce((acc, num) => {
        return acc + num
    })
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return a + b < c || a + c < b || b + c < a ? "00"
        : a == b && a == c ? '10'
            : a == b || a == c || b == c ? "01"
                : "11"
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

// export function getSum(number: number): number {
//
//     //...здесь пишем код.
//     // В return стоит "заглушка", чтоб typescript не ругался
//     const arr = number.toString().split('')
//     let res = 0
//     for (let i = 0; i < arr.length; i++) {
//         res = res + +arr[i]
//     }
//     return res
// }


export function getSum(number: number): number {
    const arr = Array.from(String(number), Number);
    return arr.reduce((sum, current) => sum + current, 0);
}

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    const even = arr.map((el, index) => index % 2 ? el : 0).reduce((acc, el) => acc + el)
    const odd = arr.map((el, index) => !(index % 2) ? el : 0).reduce((acc, el) => acc + el)
    return even < odd

}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return array.filter(el => el > 0 && !(el % 1)).map(el => el ** 2)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

// export function sumFirstNumbers(N: number): number {
//     //...здесь пишем код.
//     // В return стоит "заглушка", чтоб typescript не ругался
//     let res = 0
//     for(let i = 0; i<=N; i++) {
//         res=res+i
//     }
//     return res
// }
export function sumFirstNumbers(N: number): number {
    return (N * (N + 1)) / 2;
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    let result = []
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    for (let i = 0; i < banknotes.length; i++) {
        if (amountOfMoney >= banknotes[i]) {
            while (amountOfMoney >= banknotes[i]) {
                result.push(banknotes[i])
                amountOfMoney = amountOfMoney - banknotes[i]
            }
        }
    }
    return result
}