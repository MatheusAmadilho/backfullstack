import Animal from "../Modelos/Animal.js";
import conectando from "./Conexao.js";

export default class AnimalBD {
  async incluir(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectando();
      const SQL =
        "INSERT INTO animais (nome, idade, pelagem, genero, porte, necessidadesEspeciais, vacinas, castrado, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const valores = [
        animal.nome,
        animal.idade,
        animal.pelagem,
        animal.genero,
        animal.porte,
        animal.necessidadesEspeciais,
        animal.vacinas,
        animal.castrado,
        animal.foto,
      ];
      const resultado = await conexao.query(SQL, valores); 
      return resultado[0].insertId; // retornando o id gerado
    }
  }

  async alterar(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectando();
      const SQL =
        "UPDATE animais SET nome=?, idade=?, pelagem=?, genero=?, porte=?, necessidadesEspeciais=?, vacinas=?, castrado=?, foto=? WHERE id=?";
      const valores = [
        animal.nome,
        animal.idade,
        animal.pelagem,
        animal.genero,
        animal.porte,
        animal.necessidadesEspeciais,
        animal.vacinas,
        animal.castrado,
        animal.foto,
        animal.id,
      ];
      await conexao.query(SQL, valores);
    }
  }

  async excluir(animal) {
    if (animal instanceof Animal) {
      const conexao = await conectando();
      const SQL = "DELETE FROM animais WHERE id=?";
      const valores = [animal.id];
      await conexao.query(SQL, valores);
    }
  }

  async consultar() {
    const conexao = await conectando();
    const SQL = "SELECT * FROM animais";
    const [rows] = await conexao.query(SQL);
    const listaDeAnimais = [];
    for (const row of rows) {
      const animal = new Animal(
        row["id"],
        row["nome"],
        row["idade"],
        row["pelagem"],
        row["genero"],
        row["porte"],
        row["necessidadesEspeciais"],
        row["vacinas"],
        row["castrado"],
        row["foto"]
      );
      listaDeAnimais.push(animal);
    }
    return listaDeAnimais;
  }

  // async consultarID(id) {
  //   const conexao = await conectando();
  //   const SQL = "SELECT * FROM animais WHERE id=?";
  //   const valores = [id];
  //   const [rows] = await conexao.query(SQL, valores);
  //   const listaDeAnimais = [];
  //   for (const row of rows) {
  //     const animal = new Animal(
  //       row["id"],
  //       row["nome"],
  //       row["idade"],
  //       row["pelagem"],
  //       row["genero"],
  //       row["porte"],
  //       row["necessidadesEspeciais"],
  //       row["vacinas"],
  //       row["castrado"],
  //       row["foto"]
  //     );
  //     listaDeAnimais.push(animal);
  //   }
  //   return listaDeAnimais;
  // }
  
  async consultarID(id) {
    const conexao = await conectando();
    const SQL = "SELECT * FROM animais WHERE id=?";
    const valores = [id];
    const [rows] = await conexao.query(SQL, valores);

    if (rows.length > 0) {
        const row = rows[0];
        const animal = new Animal(
            row["id"],
            row["nome"],
            row["idade"],
            row["pelagem"],
            row["genero"],
            row["porte"],
            row["necessidadesEspeciais"],
            row["vacinas"],
            row["castrado"],
            row["foto"]
        );
        return animal;
    } else {
        return null; // Retorna null se nenhum animal for encontrado
    }
}
}
