import { Request, Response } from "express";
import { insertTemplate,getAllTemplates,getAllTemplatesByName } from "../services/template";





const getTemplates = async(_req: Request, res: Response) => {
    const responseUser = await getAllTemplates();
    res.send(responseUser) 
}


const getTemplatesByName = async ({params}: Request, res: Response) => {
    const nameTemplate = params.name;
    console.log(nameTemplate);
    try{   
       const responseItem = await getAllTemplatesByName(nameTemplate);
       res.send(responseItem);
    }
       catch(e){
          return res.status(400).json({error: "operacion erronea no existe ningun template"})
      } 
    return null
   
}



const postTemplate = async (req : Request, res: Response ) =>{
    console.log(req.body);
    console.log("Esto mandas")
       const TemplateDate = {name: req.body.name,categoria:req.body.categoria,descripcion:req.body.descripcion,date:req.body.date,event_id:req.body.event_id}
       try{   
          const responseItem = insertTemplate(TemplateDate);
          res.send(responseItem);
         }
          catch(e){
             res.status(500);
             res.send('ERROR DE DATOS');
                 
         } 
    }
    
    
 

export {getTemplates,postTemplate,getTemplatesByName}
