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
