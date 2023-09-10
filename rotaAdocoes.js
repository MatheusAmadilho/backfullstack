import { Router } from "express";
import AdocaoCTRL from "./Controle/AdocaoCtrl.js"; // Certifique-se de ter a classe AdocaoCTRL importada corretamente

const rotaAdocao = new Router();
const adocaoCTRL = new AdocaoCTRL(); // Certifique-se de ter a classe AdocaoCTRL importada corretamente

rotaAdocao.post('/', adocaoCTRL.gravar)
    .put('/', adocaoCTRL.atualizar)
    .delete('/', adocaoCTRL.excluir)
    .get('/', adocaoCTRL.consultar)
    .get('/:codAdocao', adocaoCTRL.consultarPorCodigo);

export default rotaAdocao;
