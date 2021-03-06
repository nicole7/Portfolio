import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
    const app = express();
    
    app.use(createCellsRouter(filename, dir));

    if (useProxy) {
        app.use(createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent'
    }))
    } else {
        //absolute path to get to html file - dont want everything, just up to the buil directory
        const packagePath = require.resolve('@javascripter-ng/local-client/build/index.html')
        app.use(express.static(path.dirname(packagePath)));
    }

    //bring express into async
    return new Promise<void>((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};