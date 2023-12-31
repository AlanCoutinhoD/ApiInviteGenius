import { Request, Response} from "express";
import { insertEvent, getAllEvents, getEventByName,getEventCategory,getEventByIdUser } from "../services/event";
import { Usuario } from "../interfaces/email.interface";
import { sendEmail } from '../services/emailService';

import * as xlsx from "xlsx";
const multer = require ('multer');



const storagePhotoInvitation = multer.diskStorage({
    destination: function(_req: any,_file: any,cb: (arg0: null, arg1: string) => void){
    cb(null, './invitationPhotos/')
 },
    filename: function(_req: any,file: { fieldname: string; originalname: string; },cb: (arg0: null, arg1: string) => void){
       cb(null,`${Date.now()}-${file.originalname}`)
    }
 })



const storage = multer.diskStorage({

    destination: function(_req: any, _file: any, cb: (arg0: null, arg1: string) => void){
        cb(null, './useremails/');
    },
    filename: function(_req: any,file: { fieldname: string; originalname: string; }, cb: (arg0: null, arg1: string) => void){
        cb(null,`${Date.now()}-${file.originalname}`)
    }

})

const getEventsByIdUser = async ({params}:Request, res: Response) => {
    try{
        const idUser= params.userId;
        const response = await getEventByIdUser(idUser);
        res.send(response);
    }   
    catch(e){
        console.log("ningun dato coincidente")
        res.send({data:"ERROR DE DATOS"});
    }
    }

    const uploadInvitationPhoto = multer({storagePhotoInvitation : storagePhotoInvitation})
    exports.uploadInvitationPhoto = uploadInvitationPhoto.single('invitationPhoto')

    const uploademails = multer({storage : storage})
    exports.uploademails = uploademails.array('emails','imageRoute')


const getEvent = async ({params}:Request, res: Response) => {
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

const postEvent = async (req : Request, res: Response ) =>{
    const routefilename = "./useremails/" ;  
    const filename = req.file?.filename;
    const files = req.files as Express.Multer.File[];

    files.forEach(file => {
        console.log(`Archivo recibido: ${file.originalname}`);
      });

    if(filename === undefined){
        const eventDate= {id_user: req.body.id_user, nameEvent: req.body.nameEvent, imageRoute: req.body.imageRoute, category: req.body.category, adress: req.body.adress, type: req.body.type, numParticipants: req.body.numParticipants, date: req.body.date, price: req.body.price, emails:"null"}
        try{
            const responseItem = insertEvent(eventDate);
             res.send(responseItem);
            }
             catch(e){
                res.status(500);
                res.send('ERROR DE DATOS');
                    
            }

    }

    else{

   
    const excelfile = xlsx.readFile(routefilename+filename)
    console.log(filename);

    
    console.log(req.body);  
    const eventDate= {id_user: req.body.id_user, nameEvent: req.body.nameEvent, imageRoute: req.body.imageRoute, category: req.body.category, adress: req.body.adress, type: req.body.type, numParticipants: req.body.numParticipants, date: req.body.date, price: req.body.price, emails:filename}
    const sheetName = excelfile.SheetNames[0];

// Obtiene los datos de la hoja
const usuarios: Usuario[] = xlsx.utils.sheet_to_json(excelfile.Sheets[sheetName]);


for (const usuario of usuarios) {
    
    console.log(`Correo electrónico: ${usuario.Email}`);
    console.log('-------------------');
    await sendEmail(usuario.Email,"Hola!", `Holaaa!, un saludo ${usuario.Nombre} `);
  
  }
    try{
    const responseItem = insertEvent(eventDate);
     res.send(responseItem);
    }
     catch(e){
        res.status(500);
        res.send('ERROR DE DATOS');
            
    }
}
}

export{getEvent, getEvents, postEvent, getEventByCategory, uploademails, getEventsByIdUser};