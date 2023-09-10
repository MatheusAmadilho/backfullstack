import Adocao from "../Modelos/Adocao.js";
import conectando from "./Conexao.js";
import Animal from "../Modelos/Animal.js";

export default class AdocaoBD {
  async incluir(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectando();
      const SQL =
        "INSERT INTO adocoes (adotante, data, codigoAnimal) VALUES (?, ?, ?)";
      const valores = [
        adocao.adotante,
        adocao.data,
        adocao.animal.id
      ];
      const resultado = await conexao.query(SQL, valores);
      return resultado[0].insertId; // retornando o id gerado
    }
  }

  async alterar(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectando();
      const SQL =
        "UPDATE adocoes SET adotante=?, data=?, codigoAnimal=? WHERE id=?";
      const valores = [
        adocao.adotante,
        adocao.data,
        adocao.animal.id,
        adocao.id
      ];
      await conexao.query(SQL, valores);
    }
  }

  async excluir(adocao) {
    if (adocao instanceof Adocao) {
      const conexao = await conectando();
      const SQL = "DELETE FROM adocoes WHERE id=?";
      const valores = [adocao.id];
      await conexao.query(SQL, valores);
    }
  }

  async consultar() {
    const conexao = await conectando();
    const SQL = "SELECT * FROM adocoes as a INNER JOIN animais as c ON a.codigoAnimal = c.id WHERE adotante LIKE ?";
    const [rows] = await conexao.query(SQL);
    const listaDeAdocoes = [];
    for (const row of rows) {
      const animal = new Animal(row['codigoAnimal'],row['nome']);
      const adocao = new Adocao(
        row["id"],
        row["adotante"],
        row["data"],
        row["codigoAnimal"],animal
      );
      listaDeAdocoes.push(adocao);
    }
    return listaDeAdocoes;
  }

  async consultarID(id) {
    const conexao = await conectando();
    const SQL = "SELECT * FROM adocoes WHERE id=?";
    const valores = [id];
    const [rows] = await conexao.query(SQL, valores);
    const listaDeAdocoes = [];
    for (const row of rows) {
      const adocao = new Adocao(
        row["id"],
        row["adotante"],
        row["data"],
        row["animal"]
      );
      listaDeAdocoes.push(adocao);
    }
    return listaDeAdocoes;
  }
}
