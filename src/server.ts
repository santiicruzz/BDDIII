import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import MotosRoutes from './routes/MotosRoutes';
import PropietariosRoutes from './routes/PropietariosRoutes'
import authRoutes from './routes/authRoutes';

class Server{
    public app: express.Application;

    constructor(){
        this.app = express();// La variable de constructor siempre tiene el mismo nombre
        this.config();
        this.routes();
    }
    config(){
        this.app.set('port',process.env.PORT || 4040)
        //MidlesWares
        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes(){
       // this.app.post('/api/post', function(req, res){
       //     res.json({
        //        "suma": req.body.numA + req.body.numB
       //     })
       // });
       this.app.get('/api/get', function(req, res){
            let varUno = Number(req.query.numA)
            let varDos = Number(req.query.numB)
            res.json({
                "suma": varUno + varDos
            })
        });
        this.app.use('/api/motos', MotosRoutes);
        this.app.use('/api/propietarios', PropietariosRoutes);
        this.app.use('/api/auth', authRoutes);
        
    }
    public Start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server is listening on port', this.app.get('port'))
        })
    }
}
export{Server};