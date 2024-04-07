import todoStore, { Filters } from "../../store/todo.store";

let element;

export const renderPending = (elemetnId) => {

    if(!element)
        element = document.querySelector(elemetnId);

    if(!element)
        throw new Error (`Element ${elemetnId} not found`);

    element.innerHTML = todoStore.getTodo(Filters.Pending).length;
}