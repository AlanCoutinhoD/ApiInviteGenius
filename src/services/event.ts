import { Event } from "../interfaces/event.interface";
import EventModel from "../models/event";
const insertEvent =async (item:Event) => {

    const responseInsert = await EventModel.create(item);
    return responseInsert;
}


const getAllEvents = async() => {
  
    const responseEvent = await EventModel.find({})
     console.log(responseEvent);
    return responseEvent;
}


const getEventByName =async (nameEvent:string) => {
    const responseEvent = await EventModel.find({nameEvent:nameEvent})
    return responseEvent;
}

const getEventCategory =async (category:string) => {
    const responseEvent = await EventModel.find({category:category})
    return responseEvent;
}

export{insertEvent,getAllEvents,getEventByName, getEventCategory}