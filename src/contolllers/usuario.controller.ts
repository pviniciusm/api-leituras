import { Request, Response } from "express";
import { UsuarioDataBase } from "../database/usuario.database";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";

export class UsuarioController {
  public login(req: Request, res: Response) {
    try {
      const { userNome, senha } = req.body;
      const database = new UsuarioDataBase();
      const usuario = database.login(String(userNome), String(senha));

      if (!usuario) {
        return RequestError.notFound(res, "User");
      }

      return res
        .status(200)
        .send({ ok: true, message: "User found successfully", data: usuario });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
