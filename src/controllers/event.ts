import { Request, Response} from "express";
import { insertEvent, getAllEvents, getEventByName,getEventCategory } from "../services/event";

const getEvent =async ({params}:Request, res: Response) => {
try{
    const nameEvent= params.nameEvent;
    const response = await getEventByName(nameEvent);
    res.send(response);
}   
catch(e){
    console.log("ningun dato coincidente")
    res.send({data:"ERROR DE DATOS"});
}
}

const getEventByCategory =async ({params}:Request, res: Response) => {
    try{
        const category= params.category;
        const response = await getEventCategory(category);
        res.send(response);
    }   
    catch(e){
        console.log("ningun dato coincidente")
        res.send({data:"ERROR DE DATOS"});
    }
    }


const getEvents = async(_req: Request, res: Response) => {
    
    const responseEvent = await getAllEvents();
    res.send(responseEvent) 
    
}

const postEvent = async ({ body } : Request, res: Response ) =>{
     console.log(body);  try{
       
        const responseItem = insertEvent(body);
     res.send(responseItem);
    }
     catch(e){
        res.status(500);
        res.send('ERROR DE DATOS');
            
    }
}

export{getEvent, getEvents, postEvent, getEventByCategory};