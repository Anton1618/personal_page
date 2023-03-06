/* === Игра ===
- По нажатию на кнопку "играть", запускается игра, значение кнопки заменяется на "проверить"
- Генерируется два числа для мат вычисления
- Пользователю требуется ввести верный ответ в форму заполнения
- По нажатию на кнопку "проверить", выводится результат проверки, значение кнопки заменяется на "играть"
*/


/* Функция, генерирующая числа */
const getRandomNum = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(0)
    // По умолчанию функция возвращает значение от 0 до 1. 
    // Для получения иного значения, например от 0 до 100, применяется умножение на диапазон разности значений верхней и нижней границ, после чего прибавляется нижняя граница: ((100-0)+0)
    // Для округления применяется метод .toFixed, где значение указывает на размер вещественной части числа. Ноль станет означать получение целого значения
}


/* Функция, генерирующая числа и символ в задаче вычисления, а также составляющая пример на их основе */
const getTask = () => {
    const symbol = (Math.random() < 0.5) ? '+' : '-' // Простой генератор 50% вероятности, когда в половине случаев символ станет либо "+", либо "-"
    task = `${getRandomNum(0, 100)} ${symbol} ${getRandomNum(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}


/* Блок HTML игры разбивается по элементам, на которые устанавливаются ссылки*/
const gameElements = document.getElementById('my_game').children
const title = gameElements[0] // <h2>Игра</h2>
const userTask = gameElements[1] // <p></p> // Задача пользователя
const userAnswer = gameElements[2] // <input type="number" hidden='true'> // Ответ пользователя
const btnGame = gameElements[3] // <button>Начать</button>


/* Объект для хранения состояния игры */
const gameState = {
    taskInProcess: false, // Изначально состояние неактивное, т.е. false
    rightAnswer: null, // Значение мат вычисления для проверки
}


/* Задание фукнционала кнопке при клике на неё */
const startGameFunc = () => {
    if (!gameState.taskInProcess) { // Проверка на неактивность игры
        title.innerText = 'Игра началась' // Изменение текста в названии игры с её началом
        userAnswer.value = null // Очистка поля ввода, иначе пользователь должен будет это сделать вручную
        const task = getTask() // Генерация игры и ответа
        userTask.innerText = task // Демонстрация задачи пользователю
        userAnswer.hidden = false // Включение видимости поля ввода
        btnGame.innerText = 'Проверить' // Изменение текста кнопки
        gameState.taskInProcess = true // Изменение состояния
    } else {
        const isRight = gameState.rightAnswer == userAnswer.value // Сравнить ответ пользователя с правильным
        userTask.innerText = userTask.innerText + ' = ' + gameState.rightAnswer // Отобразить результат к строке с примером
        title.innerText = (isRight) ? 'Вы победили!' : 'В следующий раз повезет :)' // Отобразить поздравление вместо текста в названии игры
        btnGame.innerText = 'Начать заново' // Сменить значение кнопки и состояния
        gameState.taskInProcess = false
    }
}


/* Обработчик события, при нажатии на кнопку Enter для удобства ввода данных */
btnGame.addEventListener('click', startGameFunc)
userAnswer.addEventListener('keydown', (e) => { // На ответ пользователя добавляется обработчик события
    // Демонстрация отображения ввода символов в поле ввода: console.log(e)    
    if (e.key === 'Enter') {
        startGameFunc()
    } else if (e.key === 'Escape') {
        userAnswer.blur()
    }
})






/* Панель выбора элементов на подобии выбора товаров интернет магазина*/
// const choosedEl1 = document.querySelector('.my_game') 
// Синтаксис обращения селектора такой же как и при обращении к элементам css
// Выполнение линейно, поэтому при множестве одинаковых названий селекторов, взят будет первый соответствующий элемент
// Если необходимо взять несколько элементов, то применяется свойство querySelectorAll
// const choosedEl2 = document.querySelectorAll('.my_game')
// console.log(choosedEl2)

const choosedEl = document.querySelectorAll('.choosed_block_container > div')
// Что аналогично ранее применямому методу children для выбора в нем какого-то элемента по id
// const anyValue = document.getElementById('определенный класс для выбора')
// console.log(choosedEl.length)
const counterEl = document.querySelector('.choosed_block span') // Определение элемента, который при выборе станет увеличивать значение счетчика

// Данные первичны, отображение вторично. Чтобы пользователь не мог войти в код страницы и изменить значение выбранных элементов, например, выбранных товаров интернет магазина, потребуется отдельно сохранять значение выделенных элементов
// Действие фукнции скрывается за интерфейсом инкапсуляции класса
const choosedState = {
    countElements: 0,
    setCountValue(value) {
        this.countElements += value
        counterEl.innerText = this.countElements
    }
}

// Для того, чтобы не применять для каждого элемента метод onclick, все элементы итерируются в цикле обработчиком события 
for (let i = 0; i < choosedEl.length; i++) { // Применение обработчика событий на выбранном элементе, по событию клика 'click', с применением при этом функции-колбека (e)
    choosedEl[i].addEventListener('click', (e) => { // обладает множеством свойств, например, target, который для каждого выбранного элемента станет отображать его стилевые свойства. Увидеть это можно следующей инструкцией console.log(e)})
        if (e.target.className === '') { // Определение факта выбранности блока по наличию класса choose_block , для того, чтобы иметь возможность вернуть его состояние обратно. Производится проверка на соответствия класса пустой строке
            e.target.className = 'choosed_element' // Если у элемента не было класса, то класс задается 
            choosedState.setCountValue(1) // И увеличивается значение
        } else {
            e.target.className = ''
            choosedState.setCountValue(-1) // Уменьшение значения
        }
    })
}




/* Функция, которая выполняется через определенное время*/
const timeIsOver = () => {
    alert('Время вышло')
}
// setTimeout(timeIsOver, 2000)


/* Циклично выполняемая функция будильник для проверки самочувствия человека для предотвращения переутомления */
// const alarm = setInterval(() => {
//     let wantToSleep = confirm('Хотите ли вы спать?')
//     if (wantToSleep) {
//         console.log('tic')
//     } else {
//         clearInterval(alarm)
//     }
// }, 3000)



/* div с классом контейнера. Получение необходимых отдельных переменных для p, h3 и span */
const postsBlock = document.querySelector(".posts_block_container")
// h3 и span будут моделироваться отдельной функцией addPost
// const postTitle = document.querySelector(".posts_block_container h3")
// const postBody = document.querySelector(".posts_block_container span")

/* Функционал кнопки раскрытия постов */
const showPostsBTN = document.querySelector(".posts_block button")


/* Генерирование постов в заголовке h3, в его разделе span, в его параграфе p, добавляется элемент */
function addPost(title, body) {
    const postTitle = document.createElement('h3')
    const postBody = document.createElement('span')
    const postItem = document.createElement('p')

    postTitle.innerText = title
    postBody.innerText = body

    postsBlock.append(postItem) // Для передачи одного 
    postItem.append(postTitle, postBody) // Для передачи двух
}


/* Функция получения псевдоданных */
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            for (item of data) {
                addPost(item.title, item.body)
            }
        })
        .catch(err => console.log(err.message))
}


// function createPost(title, body, userId) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title: 'title',
//             body: 'body',
//             userId: userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then(response => {
//             console.log(response)
//         })
//         .catch(err => console.log(err.message))
// }

// createPost('title', 'body', 15)

showPostsBTN.onclick = () => { getPosts() }