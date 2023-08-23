import { Router } from "express";
const routerTemplate = Router();
import { getTemplates,postTemplate,getTemplatesByName } from "../controllers/template";


routerTemplate.get("/allTemplates",getTemplates);
routerTemplate.get("/getTemplatesByName/:name",getTemplatesByName);
routerTemplate.post("/insertTemplate",postTemplate);
export {routerTemplate};