import { Router } from "express";
import { UsuarioController } from "../contolllers/usuario.controller";

export const userRoutes = () => {
  const app = Router();

  app.get("/", new UsuarioController().list);

  return app;
};
