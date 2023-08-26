import { application, json } from "express";
import Animal from "../Modelos/Animal.js";

// Classe que manipula/controla os animais
export default class AnimalCTRL {

    // Grava os dados dos animais das requisições (post) vindas da internet
    // Também recupera os dados de um animal no formato JSON vindos da requisição
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const idade = dados.idade;
            const pelagem = dados.pelagem;
            const genero = dados.genero;
            const porte = dados.porte;
            const necessidadesEspeciais = dados.necessidadesEspeciais;
            const vacinas = dados.vacinas;
            const castrado = dados.castrado;
            const foto = dados.foto;
            if (nome && idade && pelagem && genero && porte) {
                // Gravar
                const animal = new Animal(0, nome, idade, pelagem, genero, porte, necessidadesEspeciais, vacinas, castrado, foto);
                animal.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        codigo: animal.id,
                        mensagem: "Animal cadastrado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados do animal."
                })
            }
        }
        else {
            // Código 400 o erro é do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou animal no formato JSON não fornecido."
            });
        }
    }

    // Atualiza, quando recebe uma requisição do tipo PUT
    atualizar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const nome = dados.nome;
            const idade = dados.idade;
            const pelagem = dados.pelagem;
            const genero = dados.genero;
            const porte = dados.porte;
            const necessidadesEspeciais = dados.necessidadesEspeciais;
            const vacinas = dados.vacinas;
            const castrado = dados.castrado;
            const foto = dados.foto;
            if (id && nome && idade && pelagem && genero && porte) {
                // Atualizar
                const animal = new Animal(id, nome, idade, pelagem, genero, porte, necessidadesEspeciais, vacinas, castrado, foto);
                animal.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Animal atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({ // Código 500 erro do servidor
                        status: false,
                        mensagem: erro.message
                    })
                })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados do animal."
                })
            }
        }
        else {
            // Código 400 o erro é do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou animal no formato JSON não fornecido."
            });
        }
    }

    excluindo(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;

            if (id) {
                // Deletar
                const animal = new Animal(id);
                animal.removerdoBD().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Animal excluído com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                })
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente o ID do animal."
                })
            }
        }
        else {
            // Código 400 o erro é do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou animal no formato JSON não fornecido."
            });
        }
    }

    consultando(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "GET") {
            // Consultar
            const animal = new Animal();

            animal.consultar('').then((animais) => {
                resposta.status(200).json(animais);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            // Código 400 o erro é do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou animal no formato JSON não fornecido."
            });
        }
    }

    consultandopeloID(requisicao, resposta) {
        resposta.type("application/json");
        const id = requisicao.params["id"];

        if (requisicao.method === "GET") {
            // Consultar
            const animal = new Animal();
            animal.consultarID(id).then((animais) => {
                resposta.status(200).json(animais);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            // Código 400 o erro é do usuário
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou animal no formato JSON não fornecido."
            });
        }
    }
}
