import { application, json } from "express";
import Adocao from "../Modelos/Adocao.js";
import Animal from "../Modelos/Animal.js";

// Classe que manipula/controla adoções
export default class AdocaoCTRL {

    // Grava os dados das requisições (post) vindas da internet
    // Também recupera os dados no formato Json vindos da requisição

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const animalId = dados.animalId;
            const adotante = dados.adotante;
            const data = new Date(dados.data);

            // Consultar o animal pelo ID
            const animal = new Animal();
            animal.consultarID(animalId)
                .then((animalEncontrado) => {
                    if (animalEncontrado) {
                        // O animal foi encontrado, podemos criar a adoção
                        const adocao = new Adocao(0, animalEncontrado, adotante, data);

                        // Chame o método gravar da adoção e aguarde a resposta
                        return adocao.gravar()
                            .then((adocaoId) => {
                                // Agora que temos o ID gerado, podemos enviá-lo na resposta
                                resposta.status(200).json({
                                    status: true,
                                    codAdocao: adocaoId,
                                    mensagem: "Adoção realizada com sucesso!"
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    status: false,
                                    mensagem: erro.message
                                });
                            });
                    } else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Animal não encontrado"
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou formato JSON não fornecido."
            });
        }
    }

    // Atualiza os dados de uma adoção existente
    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codAdocao = dados.codAdocao;
            const animalId = dados.animalId;
            const adotante = dados.adotante;
            const data = new Date(dados.data);

            // Consultar o animal pelo ID
            const animal = new Animal();
            animal.consultarID(animalId)
                .then((animalEncontrado) => {
                    if (animalEncontrado) {
                        // O animal foi encontrado, agora você pode atualizar a adoção
                        const adocao = new Adocao(codAdocao, animalEncontrado, adotante, data);

                        // Chame o método atualizar da adoção e aguarde a resposta
                        return adocao.atualizar()
                            .then(() => {
                                resposta.status(200).json({
                                    status: true,
                                    mensagem: "Adoção atualizada com sucesso!"
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    status: false,
                                    mensagem: erro.message
                                });
                            });
                    } else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Animal não encontrado"
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou formato JSON não fornecido."
            });
        }
    }

    // Exclui uma adoção com base no código da adoção (codAdocao)
    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codAdocao = dados.codAdocao;

            if (codAdocao) {
                // Excluir a adoção
                const adocao = new Adocao(codAdocao);
                adocao.removerdoBD()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Adoção excluída com sucesso"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente o código da adoção."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou formato JSON não fornecido."
            });
        }
    }

    // Consulta todas as adoções ou filtra por termo (opcional)
    consultando(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method == "GET") {
            const termo = requisicao.query.termo || "";
            const adocao = new Adocao();
            adocao.consultar(termo)
                .then((adocoes) => {
                    resposta.json(adocoes);
                })
                .catch((erro) => {
                    resposta.json({
                        status: false,
                        mensagem: erro
                    });
                });
        }
    }

    // Consulta uma adoção pelo código da adoção (codAdocao)
    consultandoPorCodigo(requisicao, resposta) {
        resposta.type("application/json");
        const codAdocao = requisicao.params.codAdocao;

        if (requisicao.method === "GET") {
            // Consultar a adoção pelo código
            const adocao = new Adocao();
            adocao.consultarPorCodigo(codAdocao)
                .then((adocoes) => {
                    if (adocoes.length > 0) {
                        resposta.status(200).json(adocoes[0]);
                    } else {
                        resposta.status(404).json({
                            status: false,
                            mensagem: "Adoção não encontrada"
                        });
                    }
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou formato JSON não fornecido."
            });
        }
    }
}
