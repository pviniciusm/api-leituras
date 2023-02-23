import { Request, Response } from "express";
import { UsuarioDataBase } from "../database/usuario.database";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";
import { User } from "../models/usuario.models";

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
        .send({
          ok: true,
          message: "User found successfully",
          data: usuario.toJson(),
        });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public createUser(req: Request, res: Response) {
    try {
      const { userName, senha, name, meta } = req.body;
      const newUser = new User(userName, senha, name, meta);
      const dataBase = new UsuarioDataBase();
      if (userName === "" || senha === "" || name === "" || meta === "") {
        return res.status(404).send({
          ok: false,
          message: "Fill in the fields (preencha os campos)",
        });
      }
      if (senha < 5) {
        return res.status(404).send({
          ok: false,
          message: " A senha precisa de pelo menos 5 caracteres",
        });
      }
      dataBase.create(newUser);
      return res.status(200).send({
        ok: true,
        message: "O usuário foi criado com sucesso",
        data: newUser.toJson(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString("Internal Serve Error"),
      });
    }
  }

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
        message: error.toString("Internal Serve Error"),
      });
    }
  }
}
