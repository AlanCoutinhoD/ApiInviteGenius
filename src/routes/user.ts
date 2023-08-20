import {Router} from "express";
import { getUsers, postUser,getUser,uploadphoto,getPhotoUser,UpdatePasswordUser,updatePhoto,getUserByEmail } from "../controllers/user";

const router = Router();

router.get("/usuario/:email/:password",getUser);
router.get("/allUsers",getUsers);
router.get("/photoUser/:email",getPhotoUser)
router.post("/registrarUsuario",uploadphoto,postUser);
router.put("/UserUpdatePassword/:userId/:password",UpdatePasswordUser);
router.put("/UserUpdatePhoto/:userId",uploadphoto,updatePhoto);
router.get("/getEmail/:email",getUserByEmail)
export {router};