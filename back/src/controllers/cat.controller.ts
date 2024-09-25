import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { updateCatsWithAdoptionStatus } from '../utils/fn'
import paginateData from '../utils/pagination'

const prisma = new PrismaClient()

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
async function getCatDetailsById(req: AuthenticatedRequest, res: Response) {
    try {
        const id = Number(req.params.id)
        
        const catExist = await prisma.cat.findUnique({
            where: { id },
        })
        
        if (!catExist) {
            return res.status(404).json({ error: "Ce chat n'existe pas" })
        }

        res.status(200).json({
            success: true,
            data: catExist,
        })
    } catch (err) {
        console.error(
            'Erreur lors de la récupération des données du chat:',
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
        
        // set cat to favorite
        if (!existingFavorite) { 
            await prisma.favCat.create({
                data: {
                    userId,
                    catId,
                },
            })
            
            return res.status(204).json()
        }

        // unset cat fron favorite
        await prisma.favCat.delete({
            where: { userId_catId: { userId, catId } },
        })
        return res.status(204).json()
    } catch (err) {
        console.error('Erreur lors de la favorisation du chat :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function getFavoriteCatController(req: Request, res: Response) {
    try {
        const userId = Number(req.params.userId)
        const catId = Number(req.params.catId)

        const data = await prisma.favCat.findMany({
            where: {  userId, catId  },
        })
        
        return res.status(200).json({ success: true, data })
    } catch (err) {
        console.error('Erreur lors de la récupération de la liste des chat en favoris favoris: ', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function getCatPopularityController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)

        const popularity = await prisma.reqAdopt.count({
            where: {
              catId: catId,
            },
        });
        
        return res.status(200).json({success: true, data: popularity})
    } catch (err) {
        console.error('Erreur lors de la favorisation du chat :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}

async function getAdoptionRequestsController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId);
        let { page = 1, size = 10 } = req.query

        const result = await paginateData(
            Number(page),
            Number(size),
            prisma.reqAdopt,
            catId
        )
        res.status(200).json({ success: true, data: result })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données par ID :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function createAdoptionRequestController(req: Request, res: Response) {
    try {
        const catId = Number(req.body.catId)
        const userId = Number(req.body.userId)

        const newReq = await prisma.reqAdopt.create({
            data: {
                userId,
                catId,
            },
        })
        res.status(201).json({ succes: true, data: newReq })
    } catch (err) {
        console.error('Erreur lors de la création d"une requête d"adoption de chat :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function acceptAdoptionRequestController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const userId = Number(req.params.userId)

        const existingRequest = await prisma.reqAdopt.findUnique({
            where: { userId_catId: { userId, catId } },
        })

        if (!existingRequest) {
            return res.status(400).json({
                error: "Cette demande d'adoption pour ce chat n'existe pas ! ",
            })
        }

        const updatedCat = await prisma.cat.update({
            where: {
              id: catId,
            },
            data: {
              status: "ADOPTED",
            },
          });

        await prisma.reqAdopt.delete({
            where: { userId_catId: { userId, catId } },
        })

        res.status(201).json({ succes: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors dé l"acceptation de la requête d"adoption du chat :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}
async function denyAdoptionRequestController(req: Request, res: Response) {
    try {
        const catId = Number(req.params.catId)
        const userId = Number(req.params.userId)

        const existingRequest = await prisma.reqAdopt.findUnique({
            where: { userId_catId: { userId, catId } },
        })

        if (!existingRequest) {
            return res.status(400).json({
                error: "Il n y a aucune demande d'adoption pour ce chat !",
            })
        }

        await prisma.reqAdopt.delete({
            where: { userId_catId: { userId, catId } },
        })

        res.status(204).json()
    } catch (err) {
        console.error('Erreur lors du refus de la requete d"adoption du chat: ', err)
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

        const body = req.body
        // delete body.isReqAdopt

        const newCat = await prisma.cat.create({
            data: {
                ...body,
                picture: image.path,
                age: Number(body.age),
            },
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
        const body = req.body
        // delete body.isReqAdopt

        const updatedCat = await prisma.cat.update({
            where: { id },
            data: { ...body, picture: image.path, age: Number(body.age) },
        })
        res.status(201).json({ success: true, data: updatedCat })
    } catch (err) {
        console.error('Erreur lors de la mise à jour des données du chat par ID :', err)
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
            return res.status(404).json({ success: false, error: "Ce chat n'existe pas" })
        }

        await prisma.cat.delete({
            where: { id },
        })
        res.status(204).json()
    } catch (error) {
        console.error(
            'Erreur lors de la suppression du chat par ID :',
            error
        )
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}

export default {
    getCatDetailsById,
    filtersCatsController,
    setFavoriteCatController,
    getFavoriteCatController,
    getCatPopularityController,

    getAdoptionRequestsController,
    createAdoptionRequestController,
    acceptAdoptionRequestController,
    denyAdoptionRequestController,

    postCatController,
    putCatByIdController,
    deleteCatByIdController,
}
