import express from 'express';
import { json, urlencoded } from "body-parser";
import { parse } from 'url';
import services from './services.js';
import proxy from './lib/proxy.mjs';
import restreamer from './lib/restreamer.mjs';
import cors from 'cors';

// set up the app
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));


app.use(cors());

app.get('/', (_req, res) => res.json({message: "API Gateway is alive."}));

app.get('/ping', (_req, res) =>res.json({message: "pong"}));


// Bootstrap services

for (const service of services) {
    console.log(service)
    const name = service.name;
    const host = service.host;
    const port = service.port;
    const rootPath = service.rootPath || "";
    const protocol = service.protocol || "http";
  
    console.log(`Boostrapping service: ${protocol}://${host}:${port}/${rootPath}`);
  
    let middleware = [];
  
    // need to restream the request so that it can be proxied
    middleware.push(restreamer());
  
    app.use(`/api/v1/${name}*`, middleware, (req, res, next) => {
      const newPath = parse(req.originalUrl).pathname.replace(`/api/v1/${name}`, rootPath);
      let targetUrl = protocol+"://"+host+":"+port+"/"+newPath;
      console.log("Redirected to:"+targetUrl);
      proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
    });
}

export default app;
