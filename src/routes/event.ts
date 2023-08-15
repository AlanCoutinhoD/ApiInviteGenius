import { Router } from "express";
import { getEvents, getEvent, postEvent, getEventByCategory } from "../controllers/event";
const routerEvent = Router();

routerEvent.get("/allEvents",getEvents);
routerEvent.get("/getEventByName/:nameEvent",getEvent);
routerEvent.get("/getEventByCategory/:category",getEventByCategory);
routerEvent.post("/registrarEvento",postEvent);

export {routerEvent};