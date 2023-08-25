import { Router } from "express";
import { getTemplates,postTemplate,getTemplatesByName, uploadImage, getPhotoTemplate } from "../controllers/template";

const routerTemplate = Router();

routerTemplate.post("/insertTemplate",uploadImage,postTemplate);
routerTemplate.get("/allTemplates",getTemplates);
routerTemplate.get("/getTemplatesByName/:name",getTemplatesByName);
routerTemplate.get("/getTemplatesByIdEvent/:event_id",getPhotoTemplate);
export {routerTemplate};