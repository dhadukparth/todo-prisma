import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GetTodoList = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        prisma.$connect()

        const todosList = await prisma.todo.findMany()

        res.status(200).json({
            message: 'get todo list',
            data: todosList
        });
    }
    catch (error) {
        next(error)
    }
    finally {
        prisma.$disconnect()
    }
}



export const CreateTodo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        prisma.$connect()

        const newTodo = await prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description
            }
        })

        res.status(201).json({
            message: 'create todo',
            data: newTodo
        })
    }
    catch (error: any) {
        next(error)
    }
    finally {
        prisma.$disconnect()
    }
}



export const UpdateTodo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        prisma.$connect()

        const updatedTodo = await prisma.todo.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: req.body.title,
                description: req.body.description
            }
        })

        res.status(200).json({
            message: 'update todo',
            data: updatedTodo
        })
    }
    catch (error) {
        next(error)
    }
    finally {
        prisma.$disconnect()
    }
}



export const DeleteTodo = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        prisma.$connect()

        const deletedTodo = await prisma.todo.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(200).json({
            message: 'delete todo',
            data: deletedTodo
        })
    }
    catch (error) {
        next(error)
    }
    finally {
        prisma.$disconnect()
    }
}