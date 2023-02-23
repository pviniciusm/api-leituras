import { Request, Response } from "express";
import { UsuarioDataBase } from "../database/usuario.database";

export class UsuarioController {
  public list(req: Request, res: Response) {
    try {
      const { userNome } = req.params;
      const database = new UsuarioDataBase();
      let usuario = database.list();

      if (userNome) {
        usuario = usuario.filter((usuario) => usuario.userNome === userNome);
      }

      res.status(200).send({
        ok: true,
        message: "Lista de Usuarios",
        data: usuario.map((item) => item.toJson()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
