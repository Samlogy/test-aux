import { Prisma, PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils/hash'
const prisma = new PrismaClient()

const DATA: Prisma.CatCreateManyInput[] = [
    {
        name: 'Whiskers',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/drq.jpg',
        description:
            'Adorable cat with beautiful whiskers and a playful personality.',
        race: 'Tabby',
        town: 'Paris',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Mittens',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/709.jpg',
        description: 'Fluffy cat with cute mittens on its paws.',
        race: 'Calico',
        town: 'Marseille',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Shadow',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/MTc5NDg0Ng.jpg',
        description: 'Sleek black cat with a mysterious aura.',
        race: 'Domestic Shorthair',
        town: 'Lyon',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Cupcake',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/bh2.jpg',
        description: 'Sweet and playful cat resembling a delightful cupcake.',
        race: 'Persian',
        town: 'Nice',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Leo',
        age: 4,
        picture: 'https://cdn2.thecatapi.com/images/efd.jpg',
        description: 'Regal cat with a majestic presence.',
        race: 'Maine Coon',
        town: 'Toulouse',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Luna',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/_I3nlhPtP.jpg',
        description: 'Graceful cat with a moon-like charm.',
        race: 'Siamese',
        town: 'Strasbourg',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Oliver',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/a29.jpg',
        description: 'Adventurous cat with a love for exploring.',
        race: 'Bengal',
        town: 'Bordeaux',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Daisy',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/av5.jpg',
        description:
            'Floral-inspired cat with a gentle and affectionate nature.',
        race: 'Ragdoll',
        town: 'Nantes',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Simba',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/MjA4NjA3Nw.jpg',
        description: 'Playful and energetic cat with a lion-like spirit.',
        race: 'Siberian',
        town: 'Montpellier',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Mocha',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/cvd.jpg',
        description:
            'Cat with a rich and warm coat resembling the color of mocha.',
        race: 'British Shorthair',
        town: 'Lille',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Oscar',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/cqm.jpg',
        description:
            'Charming cat with a lovable personality and expressive eyes.',
        race: 'Scottish Fold',
        town: 'Rennes',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Cleo',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/1qa.jpg',
        description: 'Elegant and sophisticated cat with a regal demeanor.',
        race: 'Egyptian Mau',
        town: 'Toulon',
        status: 'Adoptable',
        sex: 'Female',
    },
    {
        name: 'Teddy',
        age: 4,
        picture: 'https://cdn2.thecatapi.com/images/chv.jpg',
        description:
            'Fluffy cat resembling a teddy bear with a gentle and affectionate nature.',
        race: 'Norwegian Forest',
        town: 'Le Havre',
        status: 'Adoptable',
        sex: 'Male',
    },
    {
        name: 'Misty',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/d51.jpg',
        description: 'Mysterious and enchanting cat with a mist-like presence.',
        race: 'Russian Blue',
        town: 'Grenoble',
        status: 'Adoptable',
        sex: 'Female',
    },
]

export default async function initDb() {
    const usersExist = await prisma.user.findMany()

    if (usersExist.length === 0) {
        await prisma.user.createMany({
            data: [
                {
                    email: 'admin@gmail.com',
                    password: await hashPassword('1234'),
                    isAdmin: true,
                },
                {
                    email: 'visitor@gmail.com',
                    password: await hashPassword('1234'),
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
            data: [...DATA],
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
