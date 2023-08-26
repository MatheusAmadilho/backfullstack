import AnimalBD from '../Persistencia/AnimalBD.js';

/* --- Criando camada de modelo ---*/
export default class Animal {
    
    #id;
    #nome;
    #idade;
    #pelagem;
    #genero;
    #porte;
    #necessidadesEspeciais;
    #vacinas;
    #castrado;
    #foto;
    
    constructor(id, nome, idade, pelagem, genero, porte, necessidadesEspeciais, vacinas, castrado, foto) {
        this.#id = id;
        this.#nome = nome;
        this.#idade = idade;
        this.#pelagem = pelagem;
        this.#genero = genero;
        this.#porte = porte;
        this.#necessidadesEspeciais = necessidadesEspeciais;
        this.#vacinas = vacinas;
        this.#castrado = castrado;
        this.#foto = foto;
    }

    get id() {
        return this.#id;
    }

    set id(novoID) {
        this.#id = novoID;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get idade() {
        return this.#idade;
    }

    set idade(novaIdade) {
        this.#idade = novaIdade;
    }

    get pelagem() {
        return this.#pelagem;
    }

    set pelagem(novaPelagem) {
        this.#pelagem = novaPelagem;
    }

    get genero() {
        return this.#genero;
    }

    set genero(novoGenero) {
        this.#genero = novoGenero;
    }

    get porte() {
        return this.#porte;
    }

    set porte(novoPorte) {
        this.#porte = novoPorte;
    }

    get necessidadesEspeciais() {
        return this.#necessidadesEspeciais;
    }

    set necessidadesEspeciais(temNecessidadesEspeciais) {
        this.#necessidadesEspeciais = temNecessidadesEspeciais;
    }

    get vacinas() {
        return this.#vacinas;
    }

    set vacinas(novasVacinas) {
        this.#vacinas = novasVacinas;
    }

    get castrado() {
        return this.#castrado;
    }

    set castrado(estaCastrado) {
        this.#castrado = estaCastrado;
    }

    get foto() {
        return this.#foto;
    }

    set foto(novaFoto) {
        this.#foto = novaFoto;
    }

    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            idade: this.#idade,
            pelagem: this.#pelagem,
            genero: this.#genero,
            porte: this.#porte,
            necessidadesEspeciais: this.#necessidadesEspeciais,
            vacinas: this.#vacinas,
            castrado: this.#castrado,
            foto: this.#foto
        };
    }

    async gravar() {
        const animalBD = new AnimalBD();
        // Código gerado pelo banco
        this.id = await animalBD.incluir(this);
    }

    async atualizar() {
        const animalBD = new AnimalBD();
        await animalBD.alterar(this);
    }

    async removerdoBD() {
        const animalBD = new AnimalBD();
        await animalBD.excluir(this);
    }

    async consultar(termo) {
        const animalBD = new AnimalBD();
        const animais = await animalBD.consultar(termo);
        return animais;
    }

    async consultarID(id) {
        const animalBD = new AnimalBD();
        const animais = await animalBD.consultarID(id);
        return animais;
    }
}
