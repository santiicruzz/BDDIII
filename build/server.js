"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const MotosRoutes_1 = __importDefault(require("./routes/MotosRoutes"));
const PropietariosRoutes_1 = __importDefault(require("./routes/PropietariosRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // La variable de constructor siempre tiene el mismo nombre
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4040);
        //MidlesWares
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        // this.app.post('/api/post', function(req, res){
        //     res.json({
        //        "suma": req.body.numA + req.body.numB
        //     })
        // });
        this.app.get('/api/get', function (req, res) {
            let varUno = Number(req.query.numA);
            let varDos = Number(req.query.numB);
            res.json({
                "suma": varUno + varDos
            });
        });
        this.app.use('/api/motos', MotosRoutes_1.default);
        this.app.use('/api/propietarios', PropietariosRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
    }
    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening on port', this.app.get('port'));
        });
    }
}
exports.Server = Server;
