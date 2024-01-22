import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function initDb() {
    const existingRows = await prisma.user.findMany()

    if (existingRows.length === 0) {
        await prisma.user.createMany({
            data: [
                {
                    email: 'admin@gmail.com',
                    password: '1234',
                    isAdmin: true,
                },
                {
                    email: 'visitor@gmail.com',
                    password: '1234',
                    isAdmin: false,
                },
            ],
        })

        console.log('Initial data inserted successfully')
    } else {
        console.log('Data already exists. Skipping initialization.')
    }
}

// await prisma.user.create({
//     data: {
//         email: 'admin@gmail.com',
//         password: '1234',
//         isAdmin: true,
//     },
// })

// // Insert user with visitor role
// await prisma.user.create({
//     data: {
//         email: 'visitor@gmail.com',
//         password: '1234',
//         isAdmin: false,
//     },
// })
