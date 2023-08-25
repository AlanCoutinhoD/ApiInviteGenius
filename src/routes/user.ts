import {Router} from "express";
import { getUsers, postUser,getUser,uploadphoto,getPhotoUser,UpdatePasswordUser,updatePhoto,getUserByEmail,getUserByName} from "../controllers/user";

const router = Router();

router.get("/usuario/:email/:password",getUser);
router.get("/allUsers",getUsers);
router.get("/photoUser/:nameuser",getPhotoUser)
router.post("/registrarUsuario",uploadphoto,postUser);
router.put("/UserUpdatePassword/:nameuser/:password",UpdatePasswordUser);
router.put("/UserUpdatePhoto/:nameuser",uploadphoto,updatePhoto);
router.get("/getEmail/:email",getUserByEmail)
router.get("/getUserByname/:nameuser",getUserByName);
export {router};