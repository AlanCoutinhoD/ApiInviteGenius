import { Request, Response } from "express";
import { insertTemplate,getAllTemplates,getAllTemplatesByName,getPhotoTemplateId } from "../services/template";
import path from "path";
import fs from 'fs-extra';

const multer = require ('multer');


const storage = multer.diskStorage({
    destination: function(_req: any,_file: any,cb: (arg0: null, arg1: string) => void){
    cb(null, './templates/')
 },
    filename: function(_req: any,file: { fieldname: string; originalname: string; },cb: (arg0: null, arg1: string) => void){
       cb(null,`${Date.now()}-${file.originalname}`)
    }
 })

 const uploadImage = multer({storage : storage})
exports.uploadImage = uploadImage.single('image')

const getPhotoTemplate= async({params}:Request, res: Response ) => {   
   const id_event = params.event_id;
   console.log(id_event)
   const response = await getPhotoTemplateId(id_event);
   const image = response?.image;
   const pathImage = path.resolve( __dirname, `../../templates/${image}`);
   const pathImageError = path.resolve(__dirname,`../../userphotos/error.jpeg`)
   console.log("nombre de la foto" + response?.image);
   if (await fs.existsSync(pathImage)) {
      console.log("si existe!")
      res.sendFile(pathImage);
  }
  else (
   res.sendFile(pathImageError)
  )
   

 

}

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
    const filename = req.file?.filename;
       const TemplateDate = {name: req.body.name,categoria:req.body.categoria,descripcion:req.body.descripcion,date:req.body.date,event_id:req.body.event_id,image:filename}
       try{   
          const responseItem = insertTemplate(TemplateDate);
          res.send(responseItem);
         }
          catch(e){
             res.status(500);
             res.send('ERROR DE DATOS');
                 
         } 
    }
    
    
 

export {getTemplates,postTemplate,getTemplatesByName,uploadImage,getPhotoTemplate}
