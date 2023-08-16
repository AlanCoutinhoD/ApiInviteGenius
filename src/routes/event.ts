import { Router } from "express";
import { getEvents, getEvent, postEvent, getEventByCategory,uploademails } from "../controllers/event";
const routerEvent = Router();

routerEvent.get("/allEvents",getEvents);
routerEvent.get("/getEventByName/:nameEvent",getEvent);
routerEvent.get("/getEventByCategory/:category",getEventByCategory);
routerEvent.post("/registrarEvento",uploademails,postEvent);

export {routerEvent};