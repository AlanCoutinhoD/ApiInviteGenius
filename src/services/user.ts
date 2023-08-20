import { User } from "../interfaces/user.interface";
import UserModel from "../models/user"

const newPhotoUser = async(_id: string, photo: string)  =>{
    console.log(photo)
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

const getUserByEmail = async(email:string,password:string) => {
    const responseUser = await UserModel.findOne({email:email,password:password})
    return responseUser;
    
}

const getUserPhoto = async(email:string) => {
    const responseUser = await UserModel.findOne({email:email})
    return responseUser;
    
}


export {insertUser,getAllUsers,getUserByEmail,getUserPhoto,newPasswordUser,newPhotoUser}