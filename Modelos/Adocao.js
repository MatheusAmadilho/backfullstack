import AdocaoBD from "../Persistencia/AdocaoBD.js";

/* --- Criando camada de modelo para adoção---*/
export default class Adocao {
    #codAdocao;
    #animal;
    #adotante;
    #data;

    constructor(codAdocao = 0, animal = {}, adotante, data) {
        this.#codAdocao = codAdocao;
        this.#animal = animal;
        this.#adotante = adotante;
        this.#data = data;
    }

    get codAdocao() {
        return this.#codAdocao;
    }

    set codAdocao(novoID) {
        this.#codAdocao = novoID;
    }

    get animal() {
        return this.#animal;
    }

    set animal(novoAnimal) {
        this.#animal = novoAnimal;
    }

    get adotante() {
        return this.#adotante;
    }

    set adotante(novoAdotante) {
        this.#adotante = novoAdotante;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    toJSON() {
        return {
            codAdocao: this.#codAdocao,
            animal: this.#animal,
            adotante: this.#adotante,
            data: this.#data,
        };
    }

    async gravar() {
        const adocaoBD = new AdocaoBD();
        // Código gerado pelo banco
        this.id = await adocaoBD.incluir(this);
    }

    async atualizar() {
        const adocaoBD = new AdocaoBD();
        await adocaoBD.alterar(this);
    }

    async removerdoBD() {
        const adocaoBD = new AdocaoBD();
        await adocaoBD.excluir(this);
    }

    async consultar(termo) {
        const adocaoBD = new AdocaoBD();
        const adocoes = await adocaoBD.consultar(termo);
        return adocoes;
    }

    async consultarPorCodigo(codAdocao) {
        const adocaoBD = new AdocaoBD();
        const adocao = await adocaoBD.consultarPorCodigo(codAdocao);
        return adocao;
    }
}
