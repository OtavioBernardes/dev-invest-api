import supertest from 'supertest';
import { Router } from "express";
import { adaptRoute } from "../src/main/adapters";
import express from 'express'

type MockServerOptions = {
    loginUseCase?: any;
    creditUseCase?: any
}

const routes = async (options: MockServerOptions): Promise<Router> => {
    const router = Router();

    router.post('/api/user/login', adaptRoute(options.loginUseCase));
    router.post('/api/account/credit', adaptRoute(options.creditUseCase));

    return router;
};

export const mockApp = async (options: MockServerOptions): Promise<any> => {

    const app = express()
    app.use(express.json())
    app.use(await routes(options))

    return app.listen(3333, () => console.log('listening'));
};

export const mockServer = async (options: MockServerOptions): Promise<supertest.SuperTest<supertest.Test>> => {
    const app = await mockApp(options);
    return supertest(app);
};
