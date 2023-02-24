import { v4 as creatUuid } from "uuid";

export class Livro {
  public idLivro: string;
  public data: Date;

  constructor(
    public nome: string,
    public genero: string,
    data: string,
    public numPaginas: number,
    public avaliacao?: 1 | 2 | 3 | 4 | 5
  ) {
    this.idLivro = creatUuid();
    this.data = new Date(Date.parse(data));
  }
}
