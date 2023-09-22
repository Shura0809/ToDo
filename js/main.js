// Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach( function (task){
    renderTask(task)
})
}

checkEmptyList()


//Добавление задачи
form.addEventListener('submit', addTask);

//Удаление задачи
tasksList.addEventListener('click', deleteTask)

//Отмечаем задачу завершенной 
tasksList.addEventListener('click', doneTask);

// Функции

function addTask(event){
     // Отменяем отправку формы 
     event.preventDefault();

     // достаем текст задачи из поля ввода 
     const taskText = taskInput.value;

     // Описываем задачу в виде объета 
     const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
     };

     // Добавляем задачу в массив задачами
     tasks.push(newTask)

     //Добавляем задачу в хранище браузера
     saveToLocalStorage()

     renderTask(newTask)
 
     //Очищаем поле ввода и возвращаем фокус на него
     taskInput.value = '';
     taskInput.focus()
 
     // Скрыть лист, если в списке больше одной задачи
    //  if(tasksList.children.length > 1){
    //      emptyList.classList.add('none')}

    //  saveHTMLtoLS()
    checkEmptyList()
    
}

function deleteTask(event){
    //Проверяем если клик был НЕ по кнопке 'Удалить задачу'
    if ( event.target.dataset.action !== 'delete') return;

        //Проверяем что клик по кнопке удаления
    
    const parenNode = event.target.closest('.list-group-item');

    //Определяем ID задачи
    const id = Number(parenNode.id);

    //Находим индекс задачи в массиве
    const index = tasks.findIndex((task) =>  task.id === id );

    // Удаляем задачу из массива с задачами
    tasks.splice(index, 1)


    //Удаляем задачу из разметки
    parenNode.remove();

        //Проверка что таск лист пустой. если он пуст возвращаем картинку 
    // if(taskList.children.length === 1){
    //     emptyList.classList.remove('none')}  


    // saveHTMLtoLS()
    checkEmptyList()
    saveToLocalStorage()
}

function doneTask(){
    //Проверяем если клик был НЕ по кнопке DONE
    if ( event.target.dataset.action !== 'done')return;
        // Клик по кнопке Done
       const parentNode = event.target.closest('.list-group-item');

        //Определяем  ID задачи
        const id = Number(parentNode.id);

        const task = tasks.find(function (task)  {
            if (task.id === id){
                return true;
            }
        })
        task.done = !task.done

        //Добавляем задачу в хранище браузера
        saveToLocalStorage()

       const taskTitle = parentNode.querySelector('.task-title');
       taskTitle.classList.toggle('task-title--done');
    //    saveHTMLtoLS()
}

function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }

}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task){
    //ФОРМИРУЕМ CSS класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

     
     // Формируем разметку для новой задачи 
     const taskHtml = `
     <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
     <span class="${cssClass}">${task.text}</span>
     <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
         </button>
         <button type="button" data-action="delete" class="btn-action">
             <img src="./img/cross.svg" alt="Done" width="18" height="18">
         </button>
     </div>
 </li>`;
 
     //Добавляем задачу на страницу
     tasksList.insertAdjacentHTML('beforeend', taskHtml); 
}












//Сохранение через localStorage
// if (localStorage.getItem('tasksHTML')){
//     taskList.innerHTML = localStorage.getItem('tasksHTML');
// }
// function saveHTMLtoLS(){
//     localStorage.setItem('tasksHTML', taskList.innerHTML);
// }