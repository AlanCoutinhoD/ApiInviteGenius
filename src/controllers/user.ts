import { Request, Response } from "express";
import { insertUser, getAllUsers,getUserByEmail,getUserPhoto } from "../services/user";
import path from "path";
import fs from 'fs-extra';
//import UserModel from "../models/user";
const multer = require ('multer');

const storage = multer.diskStorage({
   destination: function(_req: any,_file: any,cb: (arg0: null, arg1: string) => void){
   cb(null, './userphotos/')
},
   filename: function(_req: any,file: { fieldname: string; originalname: string; },cb: (arg0: null, arg1: string) => void){
      cb(null,`${Date.now()}-${file.originalname}`)
   }
})

const uploadphoto = multer({storage : storage})
exports.uploadphoto = uploadphoto.single('image')

const getPhotoUser= async({params}:Request, res: Response ) => {   
      const email = params.email;
      const response = await getUserPhoto(email);
      const image = response?.photo;
      const pathImage = path.resolve( __dirname, `../../userphotos/${image}`);
      const pathImageError = path.resolve(__dirname,`../../userphotos/error.jpeg`)
      console.log("nombre de la foto" + response?.photo);
      if (await fs.existsSync(pathImage)) {
         console.log("si existe!")
         res.sendFile(pathImage);
     }
     else (
      res.sendFile(pathImageError)
     )
      
   
    
   
   }

const getUser = async({params}:Request, res: Response ) => {
try{
   const email = params.email;
   const password = params.password;
   const response = await getUserByEmail(email,password);
   
   res.send(response);
}
 catch(e){
    
    res.send({data:"ERROR DE DATOS"});
        
}

}

const getUsers = async(_req: Request, res: Response) => {
    const responseUser = await getAllUsers();
    res.send(responseUser) 
}

const postUser = async (req : Request, res: Response ) =>{
   const filename = req.file?.filename;
   console.log(req.file);
   console.log("Esto mandas")
    const userDate = {nameuser: req.body.nameuser,email:req.body.email,password:req.body.password,photo:filename}
       try{   
     const responseItem = insertUser(userDate);
     res.send(responseItem);
    }
     catch(e){
        res.status(500);
        res.send('ERROR DE DATOS');
            
    }
}

export{getUsers, getUser, postUser, uploadphoto,getPhotoUser};