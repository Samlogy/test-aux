interface PaginationResult {
    data: any[]
    pagination: {
        page: number
        size: number
        totalItems: number
        pages: number
    }
}
interface ErrorResult {
    message: string
    status: number
}

export default async function paginateData(
    page: number,
    size: number,
    model: any,
    filters?: any
): Promise<PaginationResult | ErrorResult> {
    try {
        if (page < 1 || isNaN(page) || isNaN(size) || size < 1) {
            throw {
                message:
                    'Invalid page number or size. Must be greater than or equal to 1.',
                status: 400,
            }
        }

        const totalItems = filters
            ? await model.count({
                  where: { ...filters },
              })
            : await model.count()
        const skip = (page - 1) * size
        const pages = Math.ceil(totalItems / size)

        if (pages > 0 && page > pages) {
            throw {
                message:
                    'Page not found. The requested page exceeds the total number of pages.',
                status: 404,
            } as ErrorResult
        }

        const data = filters
            ? await model.findMany({
                  where: { ...filters },
                  skip,
                  take: size,
              })
            : await model.findMany({
                  skip,
                  take: size,
              })

        return {
            data,
            pagination: {
                page,
                size,
                totalItems,
                pages,
            },
        } as PaginationResult
    } catch (error: any) {
        return {
            message: error.message || 'Internal Server Error',
            status: error.status || 500,
        } as ErrorResult
    }
}
