import { v4 as creatUuid } from "uuid";
import { Livro } from "./leitura.models";

export class User {
    private _id: string;
    private _livros: Livro[];

    constructor(
        private _userNome: string,
        private _senha: string,
        private _nome: string,
        private _meta: number
    ) {
        this._id = creatUuid();
        this._livros = [];
    }
}