import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

// localhost:3001/api/v1/cat?page=1&size=10'
async function getCatsController(req: Request, res: Response) {
    try {
        const { page = 1, size = 10 } = req.query
        const offset = (Number(page) - 1) * Number(size)

        const cats = await prisma.cat.findMany({
            take: Number(size),
            skip: offset,
        })

        res.status(200).json({ success: true, data: cats })
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function getCatByIdCatController(req: Request, res: Response) {
    try {
        const { id }: { id?: string } = req.params
        const cat = await prisma.cat.findUnique({
            where: { id: Number(id) },
        })
        res.status(200).json({ success: true, data: cat })
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function postCatController(req: Request, res: Response) {
    try {
        const body = req.body
        console.log(body)
        const newCat = await prisma.cat.create({
            data: body,
        })
        res.status(200).json({ success: true, data: newCat })
    } catch (error) {
        console.error('Erreur lors de la création des données :', error)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function putCatByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const body = req.body
        const catExist = await prisma.cat.findUnique({
            where: { id },
        })
        if (!catExist) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }
        const updatedCat = await prisma.cat.update({
            where: { id },
            data: body,
        })
        res.status(201).json({ success: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function adoptCatController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const { status } = req.body
        const catExist = await prisma.cat.findUnique({
            where: { id },
        })
        if (!catExist) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }
        const updatedCat = await prisma.cat.update({
            where: { id },
            data: {
                status,
            },
        })
        res.status(201).json({ success: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function deleteCatByIdController(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const chatExistante = await prisma.cat.findUnique({
            where: { id },
        })
        if (!chatExistante) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }
        await prisma.cat.delete({
            where: { id },
        })
        res.status(204).json()
    } catch (error) {
        console.error(
            'Erreur lors de la suppression des données par ID :',
            error
        )
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
// localhost:3001/api/v1/cat?page=1&size=10&name=sam&email=sam@gmail.com'
async function filtersCatsController(req: Request, res: Response) {
    try {
        let { page = 1, size = 10, ...filters } = req.query

        const offset = (Number(page) - 1) * Number(size)

        const filtredCats = await prisma.cat.findMany({
            take: Number(size),
            skip: offset,
            where: filters,
        })
        res.status(200).json({ success: true, data: filtredCats })
    } catch (err) {
        console.error(
            'Erreur lors de la récupération des données filtrées :',
            err
        )
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}

export default {
    getCatsController,
    getCatByIdCatController,
    postCatController,
    putCatByIdController,
    deleteCatByIdController,
    filtersCatsController,
    adoptCatController,
}
