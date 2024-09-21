export const updateCatsWithAdoptionStatus = (
    cats: any,
    adoptionRequests: any
) => {
    const catIdSet = new Set(adoptionRequests.map((r: any) => r.catId))

    const updatedCats = cats.map((c: any) => ({
        ...c,
        isReqAdopt: catIdSet.has(c.id),
    }))

    return updatedCats
}

export function generateFileName(ext: string): string {
    const currentDate = new Date()
    const timestamp = Date.now()

    // Extract date components
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1)
    const day = String(currentDate.getDate())

    return `${year}-${month}-${day}-${timestamp}${ext}`
}

type GenericObject<T> = Record<string, T>

export function pick<T>(
    object: GenericObject<T>,
    keys: string[]
): GenericObject<T> {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            return { ...obj, [key]: object[key] }
        }
        return obj
    }, {} as GenericObject<T>)
}
