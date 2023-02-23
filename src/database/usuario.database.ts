import { usuario } from "./usuario";
import { User } from "../models/usuario.models";

export class UsuarioDataBase {
  public create(user: User) {
    return usuario.push(user);
  }
  public list() {
    return [...usuario];
  }
  public login(nome: string, password: string) {
    return usuario.find(
      (user) => user.username === nome && user.password === password
    );
  }
}
