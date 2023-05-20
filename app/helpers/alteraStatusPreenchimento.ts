import Preenchimento from "../schemas/preenchimento";
const { idPreenchimento } = require("./globalVariables");

async function alteraStatusPreenchimento(statusPreenchimento: string){

    let requestPreenchimento = await Preenchimento.findOne({_id: idPreenchimento});

    if(requestPreenchimento.statusPreenchimento == statusPreenchimento){
        return 'IGUAL';
    }

    requestPreenchimento.statusPreenchimento = statusPreenchimento;

    let status;
    await requestPreenchimento.save().then(async novoPreenchimento =>{
        status = 'ALTERADO';
    }).catch(async error =>{
        status = 'ERROR';
    })

    return status;
}

export default alteraStatusPreenchimento;