import Adocao from "../Modelos/Adocao.js";
import Animal from "../Modelos/Animal.js";
import conectando from "./Conexao.js";

export default class AdocaoBD {

    async incluir(adocao) {
        if (adocao instanceof Adocao) {
            const conexao = await conectando();
            const SQL = "INSERT INTO adocoes (animal_id, adotante, data) VALUES (?, ?, ?)";
            const valores = [adocao.animal.id, adocao.adotante, adocao.data];
            const resultado = await conexao.query(SQL, valores);
            return resultado[0].insertId; // Retornando o ID gerado
        }
    }

    async alterar(adocao) {
        if (adocao instanceof Adocao) {
            const conexao = await conectando();
            const SQL = "UPDATE adocoes SET animal_id=?, adotante=?, data=? WHERE codAdocao=?";
            const valores = [adocao.animal.id, adocao.adotante, adocao.data, adocao.codAdocao];
            await conexao.query(SQL, valores);
        }
    }

    async excluir(adocao) {
        if (adocao instanceof Adocao) {
            const conexao = await conectando();
            const SQL = "DELETE FROM adocoes WHERE codAdocao=?";
            const valores = [adocao.codAdocao];
            await conexao.query(SQL, valores);
        }
    }

    async consultar(termo) {
        const adocoes = [];
        const conexao = await conectando();
        const SQL = "SELECT * FROM adocoes as a INNER JOIN animais as ani ON a.animal_id=ani.id WHERE ani.nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(SQL, valores);

        for (const row of rows) {
            const animal = new Animal(row["id"], row["nome"], row["idade"], row["pelagem"], row["genero"], row["porte"], row["necessidadesEspeciais"], row["vacinas"], row["castrado"], row["foto"]);
            const adocao = new Adocao(row['codAdocao'], animal, row['adotante'], row['data']);
            adocoes.push(adocao);
        }

        return adocoes;
    }

    async consultarPorCodigo(codAdocao) {
        const adocao = [];
        const conexao = await conectando();
        const SQL = "SELECT * FROM adocoes as a INNER JOIN animais as ani ON a.animal_id=ani.id WHERE codAdocao = ?";
        const valores = [codAdocao];
        const [rows] = await conexao.query(SQL, valores);

        for (const row of rows) {
            const animal = new Animal(row["id"], row["nome"], row["idade"], row["pelagem"], row["genero"], row["porte"], row["necessidadesEspeciais"], row["vacinas"], row["castrado"], row["foto"]);
            const adocaoItem = new Adocao(row['codAdocao'], animal, row['adotante'], row['data']);
            adocao.push(adocaoItem);
        }

        return adocao;
    }
}
