import { Prisma, PrismaClient } from '@prisma/client'
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
        gender: 'MALE',
        popularity: 0
    },
    {
        name: 'Mittens',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/709.jpg',
        description: 'Fluffy cat with cute mittens on its paws.',
        race: 'calico',
        town: 'marseille',
        status: 'ADOPTABLE',
        gender: 'FEMALE',
        popularity: 0
    },
    {
        name: 'Shadow',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/MTc5NDg0Ng.jpg',
        description: 'Sleek black cat with a mysterious aura.',
        race: 'domestic_shorthair',
        town: 'lyon',
        status: 'ADOPTABLE',
        gender: 'MALE',
        popularity: 0
    },
    {
        name: 'Cupcake',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/bh2.jpg',
        description: 'Sweet and playful cat resembling a delightful cupcake.',
        race: 'persian',
        town: 'nice',
        status: 'ADOPTABLE',
        gender: 'FEMALE',
        popularity: 0
    },
    {
        name: 'Leo',
        age: 4,
        picture: 'https://cdn2.thecatapi.com/images/efd.jpg',
        description: 'Regal cat with a majestic presence.',
        race: 'maine_coon',
        town: 'toulouse',
        status: 'ADOPTABLE',
        gender: 'MALE',
        popularity: 0
    },
    {
        name: 'Luna',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/_I3nlhPtP.jpg',
        description: 'Graceful cat with a moon-like charm.',
        race: 'siamese',
        town: 'strasbourg',
        status: 'ADOPTABLE',
        gender: 'FEMALE',
        popularity: 0
    },
    {
        name: 'Oliver',
        age: 3,
        picture: 'https://cdn2.thecatapi.com/images/a29.jpg',
        description: 'Adventurous cat with a love for exploring.',
        race: 'bengal',
        town: 'bordeaux',
        status: 'ADOPTABLE',
        gender: 'MALE',
        popularity: 0
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
        gender: 'FEMALE',
        popularity: 0
    },
    {
        name: 'Simba',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/MjA4NjA3Nw.jpg',
        description: 'Playful and energetic cat with a lion-like spirit.',
        race: 'siberian',
        town: 'montpellier',
        status: 'ADOPTABLE',
        gender: 'MALE',
        popularity: 0
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
        gender: 'FEMALE',popularity: 0
    },

    {
        name: 'Cleo',
        age: 2,
        picture: 'https://cdn2.thecatapi.com/images/1qa.jpg',
        description: 'Elegant and sophisticated cat with a regal demeanor.',
        race: 'egyptian_mau',
        town: 'toulon',
        status: 'ADOPTABLE',
        gender: 'FEMALE',
        popularity: 0
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
        gender: 'MALE',
        popularity: 0
    },
    {
        name: 'Misty',
        age: 1,
        picture: 'https://cdn2.thecatapi.com/images/d51.jpg',
        description: 'Mysterious and enchanting cat with a mist-like presence.',
        race: 'russian_blue',
        town: 'grenoble',
        status: 'ADOPTABLE',
        gender: 'FEMALE',
        popularity: 0
    },
]

async function initDb() {
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

initDb()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default initDb;