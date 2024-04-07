import { Todo } from "../todos/models/todo.model"

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 🌯');
}


const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todo =[], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todo;
    state.filter = filter;
}

const saveStateToLoclaStorage = () => {
    localStorage.setItem('state',JSON.stringify(state) );
}

const getTodo = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => todo.done === false);
        default:
            throw new  Error (`Option ${filter} is not valid`);
    }
}

const addTodo = (description)  => {
    if (!description) throw new  Error ('Description is required');
    state.todos.push(new Todo(description));
    saveStateToLoclaStorage();
}

const toggleTodo = (todoId) => {
    
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLoclaStorage();
}

const deleteTodo = (todoId) => {
   state.todos= state.todos.filter(todo => todo.id !== todoId);
   saveStateToLoclaStorage();
}

const deleteCompletedes = () => {
    state.todos= state.todos.filter(todo => !todo.done);
    saveStateToLoclaStorage();
}

const setFilter = (filter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLoclaStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    getTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedes,
    setFilter,
    getCurrentFilter
}