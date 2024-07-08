import express from 'express';
import { CreateTodo, DeleteTodo, GetTodoList, UpdateTodo } from '../controller/todo.controller';
import { handlerCheckValidation, createTodoValidation, updateTodoValidation, deleteTodoValidation } from '../validation';


export default (router: express.Router) => {
    router.get('/todos', GetTodoList);
    router.post('/todos', createTodoValidation, handlerCheckValidation, CreateTodo);
    router.patch('/todos/:id', updateTodoValidation, handlerCheckValidation, UpdateTodo);
    router.delete('/todos/:id', deleteTodoValidation, handlerCheckValidation, DeleteTodo);
}