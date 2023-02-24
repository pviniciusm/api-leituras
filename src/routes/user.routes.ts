import { Router } from "express";
import { LeiturasController } from "../contolllers/leituras.controller";
import { UsuarioController } from "../contolllers/usuario.controller";
import { LoginValidatorMiddleware } from "../middlewares/login-validator-middleware";

export const userRoutes = () => {
  const app = Router();
  app.post("/", new UsuarioController().createUser);
  app.get("/", new UsuarioController().list);
  app.post(
    "/login",
    LoginValidatorMiddleware.loginValidator,
    new UsuarioController().login
  );
  app.post("/:userId/leituras", new LeiturasController().create);
  app.get("/:userId/leituras", new LeiturasController().list);
  app.delete("/:userId/leituras/:leituraId", new LeiturasController().delete);
  app.put("/:userId/leituras/:leituraId", new LeiturasController().update);
  return app;
};
