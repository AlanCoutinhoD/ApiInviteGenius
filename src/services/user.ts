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

const newPhotoUser = async(_id: string, photo: string)  =>{
    const responseUser= UserModel.findByIdAndUpdate(_id,{ photo: photo })
    return responseUser;
}

const newPasswordUser = async(_id: string, password: string)  =>{
const responseUser= UserModel.findByIdAndUpdate(_id,{ password: password })
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

const getUserPhoto = async(email:string) => {
    const responseUser = await UserModel.findOne({email:email})
    return responseUser;
    
}


export {insertUser,getAllUsers,getUserByEmailAndPassword,getUserPhoto,newPasswordUser,newPhotoUser, getUserEmail,getUserName}