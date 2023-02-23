import { usuario } from "./usuario";
import { User } from "../models/usuario.models";

export class UsuarioDataBase {
  public create(user: User) {
    return usuario.push(user);
  }
  public list() {
    return [...usuario];
  }
  public login(nome: string, senha: string) {
    return usuario.find(
      (user) => user.userNome === nome && user.senha === senha
    );
  }
}
