//***********************************************************************************************************************************/
/*
 *  res = {} mehtod 'Order'
 *      -> 0 == NumSolicitacao empty
 *      -> 1 == 1º passagem por requestGET
 *      -> 2 == 2° ultima passagem por requestGET
 */			 
//***********************************************************************************************************************************/
function resMethods(){
    res = {}
    window.res['arrIndx']   = [];
    window.res['lngtItems'] = 0;
    window.res['stItems'] = 0;
    return res
}
function orderMethods(){
    this.host                   = window.origin //"http://10.4.4.52:8080";   
    this.targetAssignee         = document.getElementById('cmb_NomeSolicita').value
    resMethods();
}
orderMethods.prototype.movePOST = async function (NumSolicitacao, acao, dlbr, justf, votes, obsThis, resultAnalis) { 
    var Nsolicitacao                = NumSolicitacao;           // Para este escopo
    orderMethodsMi.Nsolicitacao     = NumSolicitacao;           // Para o .done do ajax
    var acao                        = acao
    var targetAssignee              = this.targetAssignee
    var host                        = this.host;  
    await this.requestsGET(NumSolicitacao, this.host);
    console.log('**************************************** 1')
    async function pst(){
        try{
            var request = window.res 
            let resp    = request.responseIs
            console.log(resp)
            if(resp != undefined && resp != ""){
                var movementSequence    = request.responseIs.items[request.responseIs.items.length - 1].movementSequence;
                var targetState         = request.responseIs.items[request.responseIs.items.length - 1].state.sequence;
                var aprvAssr            = 0; 
                targetState = acao 
                aprvAssr    = acao;
                (window.res['lngtItems'] == 0)  ? window.res['lngtItems']   = request.responseIs.items.length : window.res['lngtItems'] = window.res['lngtItems'];
                (window.res['stItems'] == 0)    ? window.res['stItems']     = request.responseIs.items[request.responseIs.items.length - 1].state.sequence : window.res['stItems'] = window.res['stItems'];
                /**
                 *  targetState:    11  = Analise Assr
                 *                  9   = Ajuste
                 *                  15  = Incluir
                 *                  16  = Excluir
                */
                if(votes.DISUP != undefined && votes.DISUP != ''){
                    var setFields = {
                        "hdn_aprvAssr":     aprvAssr,
                        "hdn_DISUP_vt":     votes.DISUP,
                        "hdn_DIRAF_vt":     votes.DIRAF,
                        "hdn_DITEC_vt":     votes.DITEC,
                        "txt_Deliberacao":  dlbr,
                        "txt_Justificativa":  justf,
                        "txt_obsDlbrDISUP":  obsThis.DISUP,
                        "txt_obsDlbrDIRAF":  obsThis.DIRAF,
                        "txt_obsDlbrDITEC":  obsThis.DITEC
                    }
                }else if(justf != undefined || justf != ''){
                        var setFields = {
                            "hdn_aprvAssr":     aprvAssr,
                            "txt_Justificativa":  justf,
                            "txt_resultAnalis": resultAnalis
                        }
                }else{
                        var setFields = { "hdn_aprvAssr": aprvAssr }
                }
                async function assumeUser(){
                    await $.ajax({
                        method: "POST",
                        url: host + "/api/public/2.0/workflows/assumeProcessTask",
                        contentType: "application/json", 
                        data:  JSON.stringify(
                            { 
                                "colleagueId" :         targetAssignee,         // Colleague id 
                                "processInstanceId" :   Nsolicitacao,           // Process instance id 
                                "movementSequence" :    movementSequence,       // Sequence from the task to take 
                                "replacementId" :       targetAssignee          // User id from the replacement taking the task for the user 
                            }
                            ),
                        async: false,
                        error: function(x, e) {
                            console.log(x)
                        }
                        }).done(async function (response) { 
                            console.log(response);
                            await response 
                        })
                }
                async function moveProcess(){
                    await $.ajax({
                        method: "POST",
                        url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/move",
                        contentType: "application/json", 
                        data:  JSON.stringify({
                            "assignee":             targetAssignee,
                            "targetAssignee":       'Pool:Role:Assessores',
                            "movementSequence":     movementSequence,   //7
                            "targetState":          targetState,        //9
                            "formFields":           setFields
                            }),
                        async: false,
                        error: function(x, e) {
                            console.log(x)
                            console.log(e)
                        }
                    }).done(async function (response) { 
                        console.log(response); 
                        n = orderMethodsMi.Nsolicitacao;
                        h = orderMethodsMi.host;
                        window.res['check'] = true;
                        if(orderMethodsMi.Nsolicitacao != ''){
                            await orderMethodsMi.requestsGET(n, h);
                        }else{
                            window.res['order']     = 0;
                        }
                    })
                }
                

                await assumeUser()
                await moveProcess()

            }
        }catch(err){window.res['err'] =  err.name;console.log(err) }
    }
    await pst();
}
orderMethods.prototype.requestsGET = async function (NumSolicit, host) {
    await $.ajax({
        method: "GET",
        url: host+"/process-management/api/v2/requests/"+NumSolicit+"/activities?page=1&pageSize=1000",
        contentType: "application/json",
        async: true
    }).done(async function (response) { 
        window.res['responseIs']        = response;
        st                              = response.items[response.items.length - 1].state.sequence
        if(window.res['check'] != undefined && window.res['lngtItems'] != response.items.length && window.res['stItems'] != st){
            if(window.res['check'] == true){
                window.res['order']     = 2;
            }else if(window.res['check'] == false){
                window.res['order']     = 1;
            }
        }
        window.res['err']       = '';
        console.log(window.res) 
        await response
    })
}
orderMethods.prototype.indexFunctionsX = function () {
    window.res['numIndx'] = 2;
    if(window.res['arrIndx'].length == window.res['numIndx'] ){
        window.res['order']         = 0;
        window.res['arrIndx']       = [];
        window.res['responseIs']    = '';
        window.res['lngtItems']     = 0;
        window.res['stItems']       = 0;
    } 
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)