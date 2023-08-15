import { Schema,model} from "mongoose";
import { User } from "../interfaces/user.interface";
const UserScchema = new Schema <User>(
    {
        nameuser:{
            type: String,
            required:true
        },
        email:{
             type: String,
             required:true
         },

         password: {
             type: String,
             required:true
         },
         photo:{
            type: String,
            required:false
         }

    }
)

const UserModel = model('user', UserScchema);

export default UserModel; 