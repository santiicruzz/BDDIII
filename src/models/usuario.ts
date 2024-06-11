import {Schema, model, Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface Iusuario extends Document {
    userName: string;
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const shemaUsuario = new Schema({
    userName:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true}
});

shemaUsuario.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

shemaUsuario.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.get('password'));
};

export default model<Iusuario>('usuarioModel', shemaUsuario)