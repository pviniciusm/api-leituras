import { Router } from "express";
import { Usuario } from "../contolllers/usuario.controller";

export const userRoutes = () => {
  const app = Router();
  app.post("/", new Usuario().createUser);
  return app;
};
