import { Request, Response } from "express";
import { UsuarioDataBase } from "../database/usuario.database";
import { RequestError } from "../error/request.error";
import { ServerError } from "../error/server.error";
import { Livro } from "../models/leitura.models";
import { UsuarioController } from "./usuario.controller";

export class LeiturasController {
  public create(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { nome, genero, data, numPaginas, avaliacao } = req.body;

      if (!userId) {
        return RequestError.fieldNotProvided(res, "UserId");
      }
      if (!nome || !genero || !data || !numPaginas) {
        return RequestError.fieldNotProvided(res, "Field");
      }
      const database = new UsuarioDataBase();
      const foundUser = database.getById(userId);
      if (!foundUser) {
        return RequestError.notFound(res, "User");
      }
      foundUser.addLivros(new Livro(nome, genero, data, numPaginas, avaliacao));
      return res.status(201).send({
        ok: true,
        message: "Leitura criada com sucesso",
        data: foundUser,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
