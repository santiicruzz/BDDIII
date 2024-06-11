import { Server } from './server';
import "./config/mongoose";
import dotenv from 'dotenv';
dotenv.config();
const server = new Server();
server.Start();