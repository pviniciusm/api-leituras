import { Router } from "express";
import { UsuarioController } from "../contolllers/usuario.controller";
import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";

export const userRoutes = () => {
  const app = Router();
  app.get(
    "/user",
    LoginValidatorMiddleware.loginValidator,
    new UsuarioController().login
  );
  return app;
};
