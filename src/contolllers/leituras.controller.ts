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
            foundUser.addLivros(
                new Livro(nome, genero, data, numPaginas, avaliacao)
            );
            return res.status(201).send({
                ok: true,
                message: "Leitura criada com sucesso",
                data: foundUser,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public list(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            if (!userId) {
                return RequestError.fieldNotProvided(res, "UserId");
            }
            const database = new UsuarioDataBase();
            const foundUser = database.getById(userId);

            if (!foundUser) {
                return RequestError.notFound(res, "User");
            }

            const livrosAno = foundUser.livros.filter(
                (livro) => livro.data.getFullYear() === new Date().getFullYear()
            );
            const paginasAno = livrosAno.reduce((prev, current) => {
                return prev + current.numPaginas;
            }, 0);

            let atingimentoMeta = Number(livrosAno.length / foundUser.meta);
            console.log(atingimentoMeta);

            if (atingimentoMeta > 1) {
                atingimentoMeta = 1;
            }

            return res.status(200).send({
                ok: true,
                message: "Lista de leituras",
                data: {
                    livros: foundUser.livros,
                    livirosAno: livrosAno.length,
                    paginasAno,
                    atingimentoMeta,
                },
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }

    public delete(req: Request, res: Response) {
        try {
            const { userId, leituraId } = req.params;

            if (!userId) {
                return RequestError.fieldNotProvided(res, "User");
            }
            if (!leituraId) {
                return RequestError.fieldNotProvided(res, "Livro");
            }

            const database = new UsuarioDataBase();
            const user = database.getById(userId);
            if (!user) {
                return RequestError.notFound(res, "User");
            }

            const listaDeLeitura = user.livros;

            const leituraIndex = listaDeLeitura.findIndex(
                (leitura) => leitura.idLivro === leituraId
            );

            if (leituraIndex < 0) {
                return RequestError.notFound(res, "livro");
            }
            const livroDeletado = listaDeLeitura.splice(leituraIndex, 1);

            return res.status(200).send({
                ok: true,
                message: "Livro deletado",
                data: livroDeletado,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
    public update(req: Request, res: Response) {
        try {
            const { userId, leituraId } = req.params;
            const { avaliacao } = req.body;

            if (!userId) {
                return RequestError.fieldNotProvided(res, "User");
            }
            if (!leituraId) {
                return RequestError.fieldNotProvided(res, "Livro");
            }

            const database = new UsuarioDataBase();
            const user = database.getById(userId);
            if (!user) {
                return RequestError.notFound(res, "User");
            }

            const listaDeLeitura = user.livros;
            let livro = listaDeLeitura.find(
                (leitura) => leitura.idLivro === leituraId
            );

            if (!livro) {
                return RequestError.notFound(res, "Livro");
            }

            if (avaliacao) {
                livro.avaliacao = avaliacao;
            }

            return res.status(200).send({
                ok: true,
                message: "Avaliação alterada!",
                data: livro,
            });
        } catch (error: any) {
            return ServerError.genericError(res, error);
        }
    }
}
