import AdocaoBD from '../Persistencia/AdocaoBD.js';

/* --- Criando camada de modelo ---*/
export default class Adocao {
    
    #id;
    #adotante;
    #data;
    #animal;
    
    constructor(id, adotante, data, animal={}) {
        this.#id = id;
        this.#adotante = adotante;
        this.#data = data;
        this.#animal = animal;
    }

    get id() {
        return this.#id;
    }

    set id(novoID) {
        this.#id = novoID;
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

    get animal() {
        return this.#animal;
    }

    set animal(novoAnimal) {
        this.#animal = novoAnimal;
    }

    toJSON() {
        return {
            id: this.#id,
            adotante: this.#adotante,
            data: this.#data,
            animal: this.#animal
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

    async consultarID(id) {
        const adocaoBD = new AdocaoBD();
        const adocaoInfo = await adocaoBD.consultarID(id);
        return adocaoInfo;
    }
}
