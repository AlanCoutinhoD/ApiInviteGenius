import { Request, Response } from "express";
import { insertUser, getAllUsers,getUserByEmailAndPassword,getUserPhoto,newPasswordUser,newPhotoUser,getUserEmail,getUserName,newNameUser} from "../services/user";
import path from "path";
import fs from 'fs-extra';

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

const getUserByName = async({params}:Request, res: Response ) =>{
   const userName = params.nameuser;
   const response = await getUserName(userName);

   if(response == null){
      res.send("ERROR no se encontro nada");
   }
   else{
      res.send(response);
   }
  
}

const getPhotoUser= async({params}:Request, res: Response ) => {   
      const nameuser = params.nameuser;
      const response = await getUserPhoto(nameuser);
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
   const response = await getUserByEmailAndPassword(email,password);
   
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
   console.log(req.body);
   const filename = req.file?.filename;
   
   console.log("Esto mandas")

    if(req.file==undefined){
      const userDate = {nameuser: req.body.nameuser,email:req.body.email,password:req.body.password,photo:"error.jpeg"}
      try{   
         const responseItem = insertUser(userDate);
         res.send(responseItem);
        }
         catch(e){
            res.status(500);
            res.send('ERROR DE DATOS');
                
        } 
   }
    else{
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
   
}

const UpdatePasswordUser = async (req : Request, res: Response ) =>{

const username = req.params.nameuser;
const newPassword = req.params.password;
try{   
   const responseItem = await newPasswordUser(username,newPassword);
   res.send(responseItem);
  }
   catch(e){
      res.status(500);
      res.send('ERROR DE DATOS');
          
  } 
 
}


const updateNameUser = async (req : Request, res: Response ) =>{

   const nameuser = req.params.nameuser;
   const nameUserNew = req.params.newNameUser;
   try{   
      const responseItem = await newNameUser(nameuser,nameUserNew);
      res.send(responseItem);
     }
      catch(e){
         res.status(500);
         res.send('ERROR DE DATOS');
             
     } 
    
   }

const updatePhoto = async (req : Request, res: Response ) =>{
   const nameuser = req.params.nameuser;
   console.log(nameuser)
   const filename = req.file?.filename;   
   if(filename === undefined){
      return res.status(400).json({error: "La foto esta vacia"})
   }

   else{
      try{   
         const responseItem = await newPhotoUser(nameuser,filename);
        console.log(responseItem)
        return res.send(responseItem);
        }
         catch(e){

            return res.status(400).json({error: "operacion erronea"})
        } 
   } 

}
const getUserByEmail = async (req : Request, res: Response ) =>{
   const userEmail = req.params.email;
   console.log(userEmail);
   try{   
      const responseItem = await getUserEmail(userEmail);
      if (responseItem === null){
         return res.status(400).json({error: "operacion erronea no existe ningun usuario"})

      }
      else{
         return res.send(responseItem.email);
      }
     

     }
      catch(e){
         return res.status(400).json({error: "operacion erronea no existe ningun usuario"})
     } 

}

export{getUsers,getUser,postUser,uploadphoto,getPhotoUser,UpdatePasswordUser,updatePhoto, getUserByEmail,getUserByName, updateNameUser};