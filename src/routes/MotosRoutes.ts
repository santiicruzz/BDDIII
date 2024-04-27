import{Request, Response, Router} from "express";
import Motos from "../models/motos";

class PostRouter{

    router : Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createMoto(req: Request, res: Response):Promise<void>{
        console.log(req.body);
        const moto = req.body;
        console.log(moto);
        const newMoto = new Motos(moto);
        await newMoto.save();
        res.json({status: res.status});
    }
    public async getMotos(req: Request, res: Response):Promise<void>{
       const allMotos = await Motos.find();
        res.json({status: res.status});
    }
    public async getMoto(req: Request, res: Response):Promise<void>{
       const {id} = req.params;
       const moto = await Motos.findById(id);
        res.json({status: res.status});
    }
    public async updateMoto(req: Request, res: Response):Promise<void>{
        const {id} = req.params;
        await Motos.findByIdAndUpdate(id,req.body);
        res.json({status: res.status});
    }
    public async deleteMoto(req: Request, res: Response):Promise<void>{
        const {id} = req.params;
        await Motos.findByIdAndRemove(id,req.body);
        res.json({status: res.status});
    }

    routes(){
        this.router.post("/", this.createMoto);
        this.router.get("/", this.getMotos);
        this.router.get("/:id", this.getMoto);
        this.router.put("/:id", this.updateMoto);
        this.router.delete("/:id", this.deleteMoto);
    }
}

const MotosRoutes = new PostRouter();
export default MotosRoutes.router;