import { Router } from "express";
import AdocaoCTRL from "./Controle/AdocaoCtrl.js";

const rotaAdocoes = new Router();
const adocoesCTRL = new AdocaoCTRL();

rotaAdocoes
.post('/', adocoesCTRL.gravar)
.put('/', adocoesCTRL.atualizar)
.delete('/', adocoesCTRL.excluindo)
.get('/', adocoesCTRL.consultando)
.get('/:id', adocoesCTRL.consultandopeloID);

export default rotaAdocoes;
