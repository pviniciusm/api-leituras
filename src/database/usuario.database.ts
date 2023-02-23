import { User } from "../models/usuario.models";
import { usuario } from "./usuario";

export class UsuarioDataBase {
  public create(user: User) {
    return usuario.push(user);
  }
}
