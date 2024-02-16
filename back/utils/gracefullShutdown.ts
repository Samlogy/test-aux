export const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'] as const

export type ISignals = readonly ['SIGINT', 'SIGTERM', 'SIGHUP']

async function gracefulShutdown({
    signal,
    server,
}: {
    signal: typeof signals[number]
    server: any
}) {
    // const redisClient = new Cache()
    console.log(`Got signal ${signal}. Good bye`)
    await server.close()
    // await redisClient.close()
    // await disconnectMongoDB()
    process.exit(0)
}

export default function checkSignals(server: any, signals: ISignals) {
    for (let i = 0; i < signals.length; i++) {
        process.on(signals[i], () =>
            gracefulShutdown({
                signal: signals[i],
                server,
            })
        )
    }
}
