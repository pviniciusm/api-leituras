import { usuario } from "./usuario";

export class UsuarioDataBase {
  public list() {
    return [...usuario];
  }
}
