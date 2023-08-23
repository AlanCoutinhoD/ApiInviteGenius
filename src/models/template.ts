import { Schema,model} from "mongoose";
import { Template } from "../interfaces/template.interface";

const TemplateScchema = new Schema <Template>(
    {
        name:{
            type: String,
            required:true
        },
        categoria:{
             type: String,
             required:true
         },

         descripcion: {
             type: String,
             required:true
         },
        date:{
            type: Date,
            required:true
         },
         event_id:{
            type: String,
            required:true
         }

    }
)



const TemplateModel = model('template', TemplateScchema);

export default TemplateModel; 