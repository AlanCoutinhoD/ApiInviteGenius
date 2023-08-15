import { Router } from "express";
import {readdirSync} from "fs";
const cleanFileName = (fileName:string) =>{
    const file = fileName.split('.').shift();
    return file;
}
const PATH_ROUTER = `${__dirname}`;

const router = Router();

readdirSync(PATH_ROUTER).filter((fileName) => {
   const cleanName = cleanFileName(fileName)
   if(cleanName !== 'index'){
    import(`./${cleanName}`).then((moduleRouter) => {
        console.log(`Cargando la ruta... /${cleanName}`)
        router.use(`/${cleanName}`,moduleRouter.router)
    })
   
    
   }
    
});

export {router};