import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/render-todo';

const ElementIDs = {
    TodoList: '.todo-list',
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

}