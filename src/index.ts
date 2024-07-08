import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import ApplicationRoutes from './routers';
import HttpErrors from 'http-errors';



const allowedUrls = ['http://localhost:7500/'];

const corsOptions = (req: express.Request, callback: (err: Error | null, options?: cors.CorsOptions) => void) => {
    const origin: any = req.header('Origin');

    if (origin && allowedUrls.includes(origin)) {
        callback(null, { origin: true, credentials: true });
    } else {
        callback(new Error('Not allowed by CORS'), { origin: false });
    }
}


const app = express()


app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', ApplicationRoutes())

const routerNotFound = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(HttpErrors.NotFound("THis router not found"))
}
app.use(routerNotFound)








interface CustomError extends Error {
    status?: number;
}


const handlerError = async (error: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error?.name === "PrismaClientInitializationError") {
        res.status(502).json({
            message: 'database connection failed'
        })
    }
    else {
        res.status(500).json({
            message: 'error',
            data: error
        })
    }
}

app.use(handlerError)




const server = http.createServer(app)
server.listen(7500, () => {
    console.log('Server is running on port 7500')
})