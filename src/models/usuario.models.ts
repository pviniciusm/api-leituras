import { v4 as creatUuid } from "uuid";
import { Livro } from "./leitura.models";

export class User {
  private _id: string;
  private _livros: Livro[];

  constructor(
    private _username: string,
    private _password: string,
    private _nome: string,
    private _meta: number
  ) {
    this._id = creatUuid();
    this._livros = [];
  }

  public get nome() {
    return this._nome;
  }

  public get password() {
    return this._password;
  }

  public set userName(userName: string) {
    this._username = userName;
  }
  public set password(password: string) {
    this._password = password;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }
  public set meta(meta: number) {
    this._meta = meta;
  }
  public get username() {
    return this._username;
  }

  public toJson() {
    return {
      id: this._id,
      livros: this._livros,
      username: this._username,
      nome: this._nome,
      meta: this._meta,
    };
  }
}
