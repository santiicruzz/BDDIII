import {Schema, model} from "mongoose";

const MotoSchema = new Schema({
    placa:{type:String, required: true},
    marca:{type:String, required: true},
    color:{type:String, required: true},
    modelo:{type:String, required: true},
    propietario:[{ ref: "Propietarios", type: Schema.Types.ObjectId, required: true }]
});
export default model("Motos", MotoSchema)