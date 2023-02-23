import { usuario } from "./usuario";
import { User } from "../models/usuario.models";
export class UsuarioDataBase {
  public login(nome: string, senha: string) {
    return usuario.find(
      (user) => user.userNome === nome && user.senha === senha
    );
  }
}
