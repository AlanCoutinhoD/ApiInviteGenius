import { User } from "../interfaces/user.interface";
import UserModel from "../models/user"
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


export {insertUser,getAllUsers,getUserByEmail,getUserPhoto}