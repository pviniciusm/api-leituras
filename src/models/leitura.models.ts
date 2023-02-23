import { v4 as creatUuid } from "uuid";

export class Livro {
  public idLivro: string;

  constructor(
    public nome: string,
    public genero: string,
    public data: Date,
    public numPaginas: number,
    public avaliacao?: 1 | 2 | 3 | 4 | 5
  ) {
    this.idLivro = creatUuid();
  }
}
