import{Request, Response, Router} from "express";
import MotosController from "../controllers/motos";
import {TokenValidation} from '../utilities/verifyToken';

class MotosRouter{

    router : Router;
    constructor(){
        this.router = Router();
        this.routes();
    }
    
    routes(){
        this.router.post("/", TokenValidation, MotosController.createMoto);
        this.router.get("/", TokenValidation, MotosController.getMotos);
        this.router.get("/:id", TokenValidation, MotosController.getMotoByIdPropietario);
        this.router.put("/:id", TokenValidation, MotosController.updateMoto);
        this.router.delete("/:id", TokenValidation, MotosController.deleteMoto);
    }
}

const MotosRoutes = new MotosRouter();
export default MotosRoutes.router;