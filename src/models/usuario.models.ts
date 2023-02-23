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

  public get nome() {
    return this._nome;
  }

  public get senha() {
    return this._senha;
  }

  public set userName(userName: string) {
    this._userNome = userName;
  }
  public set senha(senha: string) {
    this._senha = senha;
  }
  public set name(name: string) {
    this._nome = name;
  }
  public set meta(meta: number) {
    this._meta = meta;
  }
  public get userNome() {
    return this._userNome;
  }

  public toJson() {
    return {
      id: this._id,
      livros: this._livros,
      userNome: this._userNome,
      nome: this._nome,
      meta: this._meta,
    };
  }
}
