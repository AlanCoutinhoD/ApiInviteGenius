import { Schema,model } from "mongoose";
import { Event } from "../interfaces/event.interface";
const EventSchema = new Schema<Event>(
    {
        id_event: {
            type: Number,
            required: false
        },
       id_user: {
        type: String,
        required: true
        },
        nameEvent: {
            type: String,
            required: true
        },
        imageRoute: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        numParticipants: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        emails:{
            type: String,
            required: true

        }
        
    }
)

const EventModel = model('event', EventSchema);
export default EventModel;