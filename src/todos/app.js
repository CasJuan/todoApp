import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todo';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInpunt: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList , todos);
    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInpunt);
    const todoListUL = document.querySelector(ElementIDs.TodoList);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;
        if (event.target.value.trim().lenght === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });
    
    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

    });


}