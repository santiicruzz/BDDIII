import {Schema, model} from "mongoose";

const PropietarioSchema = new Schema({
    cedula:{type:String, required: true},
    nombre:{type:String, required: true},
    apellido:{type:String, required: true},
    correo:{type:String, required: true},
    telefono:{type:String, reuired: true}
});
export default model("Propietarios", PropietarioSchema)