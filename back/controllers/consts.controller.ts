import { Request, Response } from 'express'

const RACES = [
    { label: 'Abyssin', value: 'abyssin' },
    { label: 'American Bobtail', value: 'american_bobtail' },
    { label: 'American Curl', value: 'american_curl' },
    { label: 'American Shorthair', value: 'american_shorthair' },
    { label: 'American Wirehair', value: 'american_wirehair' },
    { label: 'Balinais', value: 'balinais' },
    { label: 'Bengal', value: 'bengal' },
    { label: 'Birman', value: 'birman' },
    { label: 'Bobtail japonais', value: 'bobtail_japonais' },
    { label: 'Bombay', value: 'bombay' },
    { label: 'British Longhair', value: 'british_longhair' },
    { label: 'British Shorthair', value: 'british_shorthair' },
    { label: 'Burmese', value: 'burmese' },
    { label: 'Burmilla', value: 'burmilla' },
    { label: 'California Spangled', value: 'california_spangled' },
    { label: 'Ceylan', value: 'ceylan' },
    { label: 'Chartreux', value: 'chartreux' },
    { label: 'Chausie', value: 'chausie' },
    { label: "Chat de l'île de Man", value: 'chat_ile_man' },
    { label: 'Cornish Rex', value: 'cornish_rex' },
    { label: 'Cymric', value: 'cymric' },
    { label: 'Devon Rex', value: 'devon_rex' },
    { label: 'Donskoy', value: 'donskoy' },
    { label: 'Egyptian Mau', value: 'egyptian_mau' },
    { label: 'European Shorthair', value: 'european_shorthair' },
    { label: 'Exotic Shorthair', value: 'exotic_shorthair' },
    { label: 'German Rex', value: 'german_rex' },
    { label: 'Havana Brown', value: 'havana_brown' },
    { label: 'Highlander', value: 'highlander' },
    { label: 'Himalayen', value: 'himalayen' },
    { label: 'Khao Manee', value: 'khao_manee' },
    { label: 'Korat', value: 'korat' },
    { label: 'LaPerm', value: 'laperm' },
    { label: 'Maine Coon', value: 'maine_coon' },
    { label: 'Mandarin', value: 'mandarin' },
    { label: 'Manx', value: 'manx' },
    { label: 'Mau égyptien', value: 'mau_egyptien' },
    { label: 'Munchkin', value: 'munchkin' },
    { label: 'Nebelung', value: 'nebelung' },
    { label: 'Norvégien', value: 'norvegien' },
    { label: 'Ocicat', value: 'ocicat' },
    { label: 'Oriental', value: 'oriental' },
    { label: 'Persan', value: 'persan' },
    { label: 'Peterbald', value: 'peterbald' },
    { label: 'Pixiebob', value: 'pixiebob' },
    { label: 'Ragdoll', value: 'ragdoll' },
    { label: 'Russe', value: 'russe' },
    { label: 'Safari', value: 'safari' },
    { label: 'Savannah', value: 'savannah' },
    { label: 'Scottish Fold', value: 'scottish_fold' },
    { label: 'Selkirk Rex', value: 'selkirk_rex' },
    { label: 'Siamois', value: 'siamois' },
    { label: 'Sibérien', value: 'siberien' },
    { label: 'Singapura', value: 'singapura' },
    { label: 'Snowshoe', value: 'snowshoe' },
    { label: 'Sokoke', value: 'sokoke' },
    { label: 'Somali', value: 'somali' },
    { label: 'Sphynx', value: 'sphynx' },
    { label: 'Thaï', value: 'thai' },
    { label: 'Tiffany', value: 'tiffany' },
    { label: 'Tonkinois', value: 'tonkinois' },
    { label: 'Toyger', value: 'toyger' },
    { label: 'Turc de Van', value: 'turc_van' },
    { label: 'Ukrainien Levkoy', value: 'ukrainien_levkoy' },
    { label: 'Van Kedisi', value: 'van_kedisi' },
]
const GENDERS = [
    {
        label: 'Mâle',
        value: 'MALE',
    },
    {
        label: 'Femelle',
        value: 'FEMALE',
    },
]
const TOWNS = [
    { label: 'Paris', value: 'paris' },
    { label: 'Marseille', value: 'marseille' },
    { label: 'Lyon', value: 'lyon' },
    { label: 'Toulouse', value: 'toulouse' },
    { label: 'Nice', value: 'nice' },
    { label: 'Nantes', value: 'nantes' },
    { label: 'Strasbourg', value: 'strasbourg' },
    { label: 'Montpellier', value: 'montpellier' },
    { label: 'Bordeaux', value: 'bordeaux' },
    { label: 'Lille', value: 'lille' },
    { label: 'Rennes', value: 'rennes' },
    { label: 'Reims', value: 'reims' },
    { label: 'Le Havre', value: 'le_havre' },
    { label: 'Saint-Étienne', value: 'saint_etienne' },
    { label: 'Toulon', value: 'toulon' },
    { label: 'Grenoble', value: 'grenoble' },
    { label: 'Dijon', value: 'dijon' },
    { label: 'Angers', value: 'angers' },
    { label: 'Nîmes', value: 'nimes' },
    { label: 'Villeurbanne', value: 'villeurbanne' },
    { label: 'Saint-Denis', value: 'saint_denis' },
    { label: 'Le Mans', value: 'le_mans' },
    { label: 'Aix-en-Provence', value: 'aix_en_provence' },
    { label: 'Clermont-Ferrand', value: 'clermont_ferrand' },
    { label: 'Brest', value: 'brest' },
    { label: 'Limoges', value: 'limoges' },
    { label: 'Amiens', value: 'amiens' },
    { label: 'Perpignan', value: 'perpignan' },
    { label: 'Metz', value: 'metz' },
    { label: 'Besançon', value: 'besancon' },
    { label: 'Orléans', value: 'orleans' },
    { label: 'Rouen', value: 'rouen' },
    { label: 'Mulhouse', value: 'mulhouse' },
    { label: 'Caen', value: 'caen' },
    { label: 'Nancy', value: 'nancy' },
    { label: 'Saint-Denis', value: 'saint_denis' },
    { label: 'Argenteuil', value: 'argenteuil' },
    { label: 'Montreuil', value: 'montreuil' },
    { label: 'Roubaix', value: 'roubaix' },
    { label: 'Dunkerque', value: 'dunkerque' },
    { label: 'Avignon', value: 'avignon' },
]
const STATUS = [
    {
        label: 'Adoptable',
        value: 'ADOPTABLE',
    },
    {
        label: 'Adopté',
        value: 'ADOPTED',
    },
    {
        value: 'PENDING',
        label: "En cours d'adoption",
    },
]

async function getConstantsController(req: Request, res: Response) {
    try {
        const data = {
            status: STATUS,
            races: RACES,
            genders: GENDERS,
            towns: TOWNS,
        }

        res.status(200).json({ success: true, data })
    } catch (err) {
        console.error('Erreur lors de la récupération des données :', err)
        res.status(500).json({
            success: false,
            error: 'Erreur interne du serveur',
        })
    }
}

export default {
    getConstantsController,
}
