import { v4 as creatUuid } from "uuid";

export class Livro {
    public idLivro: string;

    constructor(
        public nome: string,
        public genero: string,
        public data: Date,
        public avaliacao: string[]
    ) {
        this.idLivro = creatUuid();
    }
}
