import { Prisma, PrismaClient } from '@prisma/client'
// import { PrismaClient } from '@prisma/client/edge'
import hash from '../utils/hash'
const prisma = new PrismaClient()

const CATS: Prisma.CatCreateManyInput[] = [
    {
        name: 'Whiskers',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/drq.jpg',
        description:
            'Adorable cat with beautiful whiskers and a playful personality.',
        race: 'tabby',
        town: 'paris',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Mittens',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/709.jpg',
        description: 'Fluffy cat with cute mittens on its paws.',
        race: 'calico',
        town: 'marseille',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
    {
        name: 'Shadow',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/MTc5NDg0Ng.jpg',
        description: 'Sleek black cat with a mysterious aura.',
        race: 'domestic_shorthair',
        town: 'lyon',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Cupcake',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/bh2.jpg',
        description: 'Sweet and playful cat resembling a delightful cupcake.',
        race: 'persian',
        town: 'nice',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
    {
        name: 'Leo',
        age: 4,
        picture: 'https://cdn2.thecatapi.com/images/efd.jpg',
        description: 'Regal cat with a majestic presence.',
        race: 'maine_coon',
        town: 'toulouse',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Luna',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/_I3nlhPtP.jpg',
        description: 'Graceful cat with a moon-like charm.',
        race: 'siamese',
        town: 'strasbourg',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
    {
        name: 'Oliver',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/a29.jpg',
        description: 'Adventurous cat with a love for exploring.',
        race: 'bengal',
        town: 'bordeaux',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Daisy',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/av5.jpg',
        description:
            'Floral-inspired cat with a gentle and affectionate nature.',
        race: 'ragdoll',
        town: 'nantes',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
    {
        name: 'Simba',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/MjA4NjA3Nw.jpg',
        description: 'Playful and energetic cat with a lion-like spirit.',
        race: 'siberian',
        town: 'montpellier',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Mocha',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/cvd.jpg',
        description:
            'Cat with a rich and warm coat resembling the color of mocha.',
        race: 'siberian',
        town: 'lille',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },

    {
        name: 'Cleo',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/1qa.jpg',
        description: 'Elegant and sophisticated cat with a regal demeanor.',
        race: 'egyptian_mau',
        town: 'toulon',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
    {
        name: 'Teddy',
        age: 4,
        picture: 'https://cdn2.thecatapi.com/images/chv.jpg',
        description:
            'Fluffy cat resembling a teddy bear with a gentle and affectionate nature.',
        race: 'norwegian_horest',
        town: 'le_havre',
        status: 'ADOPTABLE',
        sex: 'MALE',
    },
    {
        name: 'Misty',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/d51.jpg',
        description: 'Mysterious and enchanting cat with a mist-like presence.',
        race: 'russian_blue',
        town: 'grenoble',
        status: 'ADOPTABLE',
        sex: 'FEMALE',
    },
]

export default async function initDb() {
    const usersExist = await prisma.user.findMany()

    if (usersExist.length === 0) {
        await prisma.user.createMany({
            data: [
                {
                    email: 'admin@gmail.com',
                    password: await hash.hashPassword('1234'),
                    isAdmin: true,
                },
                {
                    email: 'visitor@gmail.com',
                    password: await hash.hashPassword('1234'),
                    isAdmin: false,
                },
            ],
        })

        console.log('Initial Users inserted successfully')
    } else {
        console.log('Users already exists. Skipping initialization.')
    }

    const catsExist = await prisma.cat.findMany()
    if (catsExist.length === 0) {
        await prisma.cat.createMany({
            data: CATS,
        })

        console.log('Initial cats inserted successfully')
    } else {
        console.log('Cats already exists. Skipping initialization.')
    }
}

export const deleteData = async () => {
    try {
        const deleteResult = await prisma.cat.deleteMany({})
        console.log(`Deleted ${deleteResult.count} cats`)
    } catch (error) {
        console.error('Error deleting cats:', error)
    } finally {
        await prisma.$disconnect()
    }
}
