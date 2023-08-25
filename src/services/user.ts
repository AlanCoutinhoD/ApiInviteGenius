import { User } from "../interfaces/user.interface";
import UserModel from "../models/user"


const getUserEmail = async(email: string)  =>{
    const responseUser= UserModel.findOne({email: email})
    return responseUser;
}

const getUserName = async(nameuser: string)  =>{
    const responseUser= UserModel.findOne({nameuser: nameuser})
    return responseUser;
}

const newPhotoUser = async(nameuser: string, photo: string)  =>{
    const responseUser= UserModel.findOneAndUpdate({nameuser},{ photo: photo })
    return responseUser;
}

const newPasswordUser = async(nameuser: string, password: string)  =>{
const responseUser= UserModel.findOneAndUpdate({nameuser},{password: password })
return responseUser;
}

const newNameUser = async(nameuser: string, newNameUser: string)  =>{
    const responseUser= UserModel.findOneAndUpdate({nameuser},{nameuser: newNameUser})
    return responseUser;
    }


const insertUser = async( item: User)  => {
    const responseInsert = await UserModel.create(item);
    return responseInsert;
};

const getAllUsers = async() => {
    const responseUser = await UserModel.find({})
    return responseUser;
    
}

const getUserByEmailAndPassword = async(email:string,password:string) => {
    const responseUser = await UserModel.findOne({email:email,password:password})
    return responseUser;
    
}

const getUserPhoto = async(nameuser:string) => {
    const responseUser = await UserModel.findOne({nameuser:nameuser})
    return responseUser;
    
}


export {insertUser,getAllUsers,getUserByEmailAndPassword,getUserPhoto,newPasswordUser,newPhotoUser, getUserEmail,getUserName, newNameUser}