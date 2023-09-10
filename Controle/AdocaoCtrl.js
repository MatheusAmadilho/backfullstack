import { application, json } from "express";
import Adocao from "../Modelos/Adocao.js";
import Animal from "../Modelos/Animal.js";

// Classe que manipula/controla as adoções
export default class AdocaoCTRL {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const adotante = dados.adotante;
            const data = dados.data;
            const codigoAnimal = dados.animal.id;
            const animal = new Animal(0, "")
    
            .consultarID(codigoAnimal)
                .then((animal) => {
                    if (adotante && data && animal) {
                        const adocao = new Adocao(0, adotante, data, animal);
                        adocao.gravar()
                            .then(() => {
                                resposta.status(200).json({
                                    status: true,
                                    codigo: adocao.id,
                                    mensagem: "Adoção registrada com sucesso"
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
                            mensagem: "Informe todos os dados da adoção corretamente."
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
                mensagem: "Método não permitido ou adoção no formato JSON não fornecido."
            });
        }
    }
    

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
    
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const adotante = dados.adotante;
            const data = dados.data;
            const codigoAnimal = dados.animal.id;
            const animal = new Animal(0, "")
    
            .consultarID(codigoAnimal)
                .then((animal) => {
                    if (id && adotante && data && animal) {
                        const adocao = new Adocao(id, adotante, data, animal);
                        adocao.atualizar().then(() => {
                            resposta.status(200).json({
                                status: true,
                                mensagem: "Adoção atualizada com sucesso"
                            });
                        }).catch((erro) => {
                            resposta.status(500).json({
                                status: false,
                                mensagem: erro.message
                            });
                        });
                    } else {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Informe todos os dados da adoção corretamente."
                        });
                    }
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou adoção no formato JSON não fornecido."
            });
        }
    }
    

    excluindo(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;

            if (id) {
                const adocao = new Adocao(id);
                adocao.removerdoBD().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Adoção excluída com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID da adoção corretamente."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou adoção no formato JSON não fornecido."
            });
        }
    }

    consultando(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === "GET") {
            const adocao = new Adocao();
            adocao.consultar('').then((adocoes) => {
                resposta.status(200).json(adocoes);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou adoção no formato JSON não fornecido."
            });
        }
    }

    consultandopeloID(requisicao, resposta) {
        resposta.type("application/json");
        const id = requisicao.params["id"];

        if (requisicao.method === "GET") {
            const adocao = new Adocao();
            adocao.consultarID(id).then((adocaoInfo) => {
                resposta.status(200).json(adocaoInfo);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou adoção no formato JSON não fornecido."
            });
        }
    }
}
