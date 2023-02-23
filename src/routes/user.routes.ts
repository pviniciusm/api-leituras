import { Router } from "express";
import { UsuarioController } from "../contolllers/usuario.controller";

export const userRoutes = () => {
  const app = Router();
  app.post("/", new UsuarioController().createUser);
  app.get("/", new UsuarioController().list);
  return app;
};
