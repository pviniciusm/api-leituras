import { Router } from "express";
import { UsuarioController } from "../contolllers/usuario.controller";
import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";

export const userRoutes = () => {
  const app = Router();
  app.post("/", new UsuarioController().createUser);
  app.get("/", new UsuarioController().list);
  app.get(
    "/user",
    LoginValidatorMiddleware.loginValidator,
    new UsuarioController().login
  );
  return app;
};
