import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

async function getCatsController(req: Request, res: Response) {
    try {
        const chats = await prisma.cat.findMany()
        res.status(200).json({ success: true, data: chats })
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function getCatByIdCatController(req: Request, res: Response) {
    try {
        const { id }: { id?: string } = req.params
        const chat = await prisma.cat.findUnique({
            where: { id: Number(id) },
        })
        res.status(201).json({ success: true, data: chat })
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function postCatController(req: Request, res: Response) {
    try {
        const body = req.body
        const resultat = await prisma.cat.create({
            data: body,
        })
        res.status(200).json({ success: true, data: resultat })
    } catch (error) {
        console.error('Erreur lors de la création des données :', error)
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function putCatByIdController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const donneesMisesAJour = req.body
        const chatExistante = await prisma.cat.findUnique({
            where: { id: catId },
        })
        if (!chatExistante) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }
        const chatMisAJour = await prisma.cat.update({
            where: { id: catId },
            data: donneesMisesAJour,
        })
        res.status(201).json({ success: true, data: chatMisAJour })
    } catch (error) {
        console.error(
            'Erreur lors de la mise à jour des données par ID :',
            error
        )
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function deleteCatByIdController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const chatExistante = await prisma.cat.findUnique({
            where: { id: catId },
        })
        if (!chatExistante) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }
        await prisma.cat.delete({
            where: { id: catId },
        })
        res.status(204).json() // Pas de contenu
    } catch (error) {
        console.error(
            'Erreur lors de la suppression des données par ID :',
            error
        )
        res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}
async function filtersCatsController(req: Request, res: Response) {
    try {
        const filtres = req.query
        const chatsFiltres = await prisma.cat.findMany({
            where: filtres,
        })
        res.status(200).json({ success: true, data: chatsFiltres })
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
}
