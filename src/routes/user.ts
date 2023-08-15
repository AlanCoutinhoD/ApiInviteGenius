import {Router} from "express";
import { getUsers, postUser,getUser,uploadphoto,getPhotoUser } from "../controllers/user";

const router = Router();

router.get("/usuario/:email/:password",getUser);
router.get("/allUsers",getUsers);
router.get("/photoUser/:email",getPhotoUser)
router.post("/registrarUsuario",uploadphoto,postUser);
  

export {router};