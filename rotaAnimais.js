import { Router } from "express";
import AnimalCTRL from "./Controle/AnimalCtrl.js";

const rotaAnimais = new Router();
const animaisCTRL = new AnimalCTRL();

rotaAnimais.post('/',animaisCTRL.gravar)
.put('/',animaisCTRL.atualizar)
.delete('/',animaisCTRL.excluindo)
.get('/',animaisCTRL.consultando)
.get('/:id',animaisCTRL.consultandopeloID);

export default rotaAnimais;