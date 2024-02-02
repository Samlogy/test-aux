export interface User {
    id: number
    email: string
    password: string
    isAdmin: boolean
    cats?: Cat[]
    favCats?: FavCat[]
    reqAdopts?: ReqAdopt[]
}

export interface Cat {
    id: number
    name: string
    description: string
    race: string
    sex: GENDER
    age: number
    town: string
    picture: string
    status: STATUS
    popularity: number
    users?: User[]
    favCats?: FavCat[]
    reqAdopts?: ReqAdopt[]
}

export interface FavCat {
    userId: number
    catId: number
    user: User
    cat: Cat
}

export interface ReqAdopt {
    userId: number
    catId: number
    user: User
    cat: Cat
}

export enum GENDER {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum STATUS {
    ADOPTABLE = 'ADOPTABLE',
    ADOPTED = 'ADOPTED',
    PENDING = 'PENDING',
}
