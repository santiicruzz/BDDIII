"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const MotosRoutes_1 = __importDefault(require("./routes/MotosRoutes"));
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
        this.app.use((0, express_1.json)());
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
    }
    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening on port', this.app.get('port'));
        });
    }
}
exports.Server = Server;
