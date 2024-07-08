import { check, param, validationResult } from "express-validator";
import express from "express";


export const createTodoValidation = [
    check('title')
        .notEmpty().withMessage("Enter todo title")
]


export const updateTodoValidation = [
    param('id')
        .notEmpty().withMessage("Enter todo id"),

    check('title')
        .notEmpty().withMessage("Enter todo title")
]


export const deleteTodoValidation = [
    param('id')
        .notEmpty().withMessage("Enter todo id"),
]


export const handlerCheckValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.status(403).json({ errors: result.array() })
    }
    next()
}