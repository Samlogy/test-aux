import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import path from 'path'
import { AuthenticatedRequest } from '../middlewares/auth'
import { paginateData, updateCatsWithAdoptionStatus } from '../utils/fn'

const prisma = new PrismaClient()

async function getCatsController(req: AuthenticatedRequest, res: Response) {
    try {
        let { page = 1, size = 10 } = req.query
        const userId = req.user?.userId
        const isAdmin = req.user?.role

        const result = await paginateData(
            Number(page),
            Number(size),
            prisma.cat
        )

        if ('status' in result) {
            return res.status(result?.status).json({
                success: false,
                error: result?.message,
            })
        }

        const allRowsAdoptRequests = isAdmin
            ? await prisma.reqAdopt.findMany()
            : await prisma.reqAdopt.findMany({
                  where: { userId },
              })

        const updatedFiltredCats = updateCatsWithAdoptionStatus(
            result.data,
            allRowsAdoptRequests
        )

        res.status(200).json({
            success: true,
            data: { data: updatedFiltredCats, pagination: result.pagination },
        })
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function postCatController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ error: "Aucune image n'a été upload !" })
        }
        const image = req.file
        const imgPath = path.join(__dirname, 'uploads', image.originalname)

        const body = req.body

        const newCat = await prisma.cat.create({
            data: { ...body, picture: imgPath, age: Number(body.age) },
        })
        res.status(201).json({ success: true, data: newCat })
    } catch (error) {
        console.error('Erreur lors de la création des données :', error)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function putCatByIdController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ error: "Aucune image n'a été upload !" })
        }
        const id = Number(req.params.id)

        const catExist = await prisma.cat.findUnique({
            where: { id },
        })
        if (!catExist) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }

        const image = req.file
        const imgPath = path.join(__dirname, 'uploads', image.originalname)
        const body = req.body
        const updatedCat = await prisma.cat.update({
            where: { id },
            data: { ...body, picture: imgPath, age: Number(body.age) },
        })
        res.status(201).json({ success: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
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
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function filtersCatsController(req: AuthenticatedRequest, res: Response) {
    try {
        let { page = 1, size = 10, ...filters } = req.query
        const userId = req.user?.userId
        const isAdmin = req.user?.role

        const result = await paginateData(
            Number(page),
            Number(size),
            prisma.cat,
            filters
        )

        if ('status' in result) {
            return res.status(result?.status).json({
                success: false,
                error: result?.message,
            })
        }

        const allRowsAdoptRequests = isAdmin
            ? await prisma.reqAdopt.findMany()
            : await prisma.reqAdopt.findMany({
                  where: { userId },
              })

        const updatedFiltredCats = updateCatsWithAdoptionStatus(
            result.data,
            allRowsAdoptRequests
        )

        res.status(200).json({
            success: true,
            data: { data: updatedFiltredCats, pagination: result.pagination },
        })
    } catch (err) {
        console.error(
            'Erreur lors de la récupération des données filtrées :',
            err
        )
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function setFavoriteCatController(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId)
        const catId = Number(req.params.catId)

        const existingFavorite = await prisma.favCat.findUnique({
            where: { userId_catId: { userId, catId } },
        })

        if (!existingFavorite) {
            await prisma.favCat.create({
                data: {
                    userId,
                    catId,
                },
            })
            await prisma.cat.update({
                where: { id: catId },
                data: {
                    popularity: { increment: 1 },
                },
            })

            return res.status(201).json({ success: true, data: {} })
        }

        await prisma.favCat.delete({
            where: { userId_catId: { userId, catId } },
        })

        await prisma.cat.update({
            where: { id: catId },
            data: {
                popularity: { decrement: 1 },
            },
        })
        return res.status(204).json()
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function getAdoptionRequestsController(req: Request, res: Response) {
    try {
        let { page = 1, size = 10 } = req.query

        const result = await paginateData(
            Number(page),
            Number(size),
            prisma.reqAdopt
        )

        if ('status' in result) {
            return res.status(result?.status).json({
                success: false,
                error: result?.message,
            })
        }
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function requestAdoptionController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const userId = Number(req.params.userId)

        const newReq = await prisma.reqAdopt.create({
            data: {
                userId,
                catId,
            },
        })

        res.status(201).json({ succes: true, data: newReq })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function cancelAdoptionController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const userId = Number(req.params.userId)

        const existingRequest = await prisma.reqAdopt.findUnique({
            where: { userId_catId: { userId, catId } },
        })

        if (!existingRequest) {
            return res.status(400).json({
                error: "Vous avez déjà fait une demande d'adoption pour ce chat! ",
            })
        }

        await prisma.reqAdopt.delete({
            where: { userId_catId: { userId, catId } },
        })

        res.status(204).json()
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function approveAdoptionRequestController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const userId = Number(req.params.userId)

        const existingRequest = await prisma.reqAdopt.findUnique({
            where: { userId_catId: { userId, catId } },
        })

        if (!existingRequest) {
            return res.status(400).json({
                error: "Vous avez déjà fait une demande d'adoption pour ce chat! ",
            })
        }

        const updatedCat = await prisma.cat.update({
            where: { id: catId },
            data: {
                status: 'ADOPTED',
            },
        })

        await prisma.reqAdopt.delete({
            where: { userId_catId: { userId, catId } },
        })

        res.status(201).json({ succes: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function getAdoptionRequestsByUserIdController(
    req: Request,
    res: Response
) {
    try {
        const userId = Number(req.params.userId)
        const allRows = await prisma.reqAdopt.findMany({
            where: { userId },
        })
        res.status(200).json({ succes: true, data: allRows })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}

export default {
    getCatsController,
    postCatController,
    putCatByIdController,
    deleteCatByIdController,
    filtersCatsController,
    setFavoriteCatController,
    getAdoptionRequestsController,
    requestAdoptionController,
    cancelAdoptionController,
    approveAdoptionRequestController,
    getAdoptionRequestsByUserIdController,
}
