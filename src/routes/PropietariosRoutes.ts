import{Request, Response, Router} from "express";
import PropietariosController from "../controllers/propietarios";
import {TokenValidation} from "../utilities/verifyToken";

class PropietariosRouter{

    router : Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    routes(){
        this.router.post("/", TokenValidation, PropietariosController.createPropietario);
        this.router.get("/", TokenValidation, PropietariosController.getPropietarios);
        this.router.get("/:id", TokenValidation, PropietariosController.getPropietarioById);
        this.router.put("/:id", TokenValidation, PropietariosController.updatePropietario);
        this.router.delete("/:id", TokenValidation, PropietariosController.deletePropietario);
    }
}
const PropietariosRoutes = new PropietariosRouter();
export default PropietariosRoutes.router;