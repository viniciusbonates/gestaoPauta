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
    this.Nsolicitacao           = '';//24920 
    this.host                   = window.origin //"http://10.4.4.52:8080";   
    this.targetAssignee               = document.getElementById('cmb_NomeSolicita').value
    resMethods();
}
orderMethods.prototype.movePOST = function (NumSolicitacao, acao, vtDISUP, vtDIRAF, vtDITEC, dlbr) {
    var Nsolicitacao            = NumSolicitacao; 
    this.Nsolicitacao           = NumSolicitacao;
    orderMethodsMi.Nsolicitacao = NumSolicitacao;
    var acao = acao
    var targetAssignee = this.targetAssignee
    console.log(targetAssignee)
    var host                    = this.host;  
    console.log(host)
    console.log(Nsolicitacao)
    console.log(window.res['check']);
    console.log(window.res['order']);
    console.log(window.res['responseIs']);
    this.requestsGET(Nsolicitacao, this.host);
    var interval = setInterval(pst, 100)
   // console.log(Nsolicitacao)
    function pst(){
        try{
            var request = window.res 
            let resp    = request.responseIs
            if(resp != undefined && resp != ""){
                var movementSequence    = request.responseIs.items[request.responseIs.items.length - 1].movementSequence;
                var targetState         = request.responseIs.items[request.responseIs.items.length - 1].state.sequence;
                var aprvAssr            = 0; 
                targetState = acao 
                aprvAssr    = acao;
                (window.res['lngtItems'] == 0) ? window.res['lngtItems'] = request.responseIs.items.length : window.res['lngtItems'] = window.res['lngtItems'];
                (window.res['stItems'] == 0) ? window.res['stItems'] = request.responseIs.items[request.responseIs.items.length - 1].state.sequence : window.res['stItems'] = window.res['stItems'];
                console.log(window.res['lngtItems'])
                console.log(window.res['stItems'])
                console.log(targetState)
                console.log(movementSequence)
                
                console.log(vtDISUP)
                console.log(vtDIRAF)
                console.log(vtDITEC)
                console.log(dlbr)


                /**
                 *  targetState:    11  = Analise Assr
                 *                  9   = Ajuste
                 *                  15  = Incluir
                 *                  16  = Excluir
                */
               if(vtDISUP != undefined && vtDISUP != ''){
                    var setFields = {
                        "hdn_aprvAssr": aprvAssr,
                        "hdn_DISUP_vt": vtDISUP,
                        "hdn_DIRAF_vt": vtDIRAF,
                        "hdn_DITEC_vt": vtDITEC,
                        "txt_Deliberacao": dlbr
                    }
                    console.log('****** a ')
                    console.log(setFields)
               }else{
                    var setFields = {
                        "hdn_aprvAssr": aprvAssr
                    }
                    console.log('******* b ')
               }
               //"targetAssignee": targetAssignee,
               $.ajax({
                method: "POST",
                url: "http://10.4.4.52:8080/api/public/2.0/workflows/assumeProcessTask",
                contentType: "application/json", 
                data:  JSON.stringify(
                    { "colleagueId" : targetAssignee, // Colleague id 
                     "processInstanceId" : Nsolicitacao, // Process instance id 
                     "movementSequence" : movementSequence, // Sequence from the task to take 
                     "replacementId" : targetAssignee // User id from the replacement taking the task for the user 
                    }
                     ),
                async: false,
                error: function(x, e) {
                    console.log(x)
                }
            }).done(function (response) { 
                console.log(response); 
            })
                $.ajax({
                    method: "POST",
                    url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/move",
                    contentType: "application/json", 
                    data:  JSON.stringify({
                        "targetAssignee": targetAssignee,
                        "movementSequence":     movementSequence,   //7
                        "targetState":          targetState,        //9
                        "formFields": setFields
                        }),
                    async: false,
                    error: function(x, e) {
                        console.log(x)
                        console.log(e)
                    }
                }).done(function (response) { 
                    console.log(response); 
                    let n = orderMethodsMi.Nsolicitacao;
                    let host = orderMethodsMi.host;
                    window.res['check'] = true;
                    console.log(window.res['check']);
                    console.log(window.res['order']);
                    console.log(window.res['responseIs']);
                    if(n != ''){
                        orderMethodsMi.requestsGET(n, host)
                    }else{
                        window.res['order']     = 0;
                    }
                })
                clearInterval(interval)
            }
        }catch(err){window.res['err'] =  err.name; clearInterval(interval);console.log(err) }
    }
}
orderMethods.prototype.requestsGET = function (NumSolicit, host) {
    $.ajax({
        method: "GET",
        url: host+"/process-management/api/v2/requests/"+NumSolicit+"/activities?page=1&pageSize=1000",
        contentType: "application/json",
        async: true
    }).done(function (response) { 
        console.log(response)
        console.log(window.res['order']);
        console.log(response.items.length)
        window.res['responseIs']       = response;
        st  = response.items[response.items.length - 1].state.sequence
        console.log(st)
        if(window.res['check'] != undefined && window.res['lngtItems'] != response.items.length && window.res['stItems'] != st){
            if(window.res['check'] == true){
                window.res['order']     = 2;
                console.log(window.res['check']);
                    console.log(window.res['order']);
                    console.log(window.res['responseIs']);
                console.log('**********************************************')
            }else if(window.res['check'] == false){
                window.res['order']     = 1;
            }
        }
        window.res['err']       = '';
    })
}
orderMethods.prototype.indexFunctionsX = function () {
    console.log('**********************************')
    window.res['numIndx'] = 2;
    //window.res['arrIndx'] = [];
    if(window.res['arrIndx'].length == window.res['numIndx'] ){
        window.res['order']         = 0;
        window.res['arrIndx']       = [];
        window.res['responseIs']    = '';
        window.res['lngtItems'] = 0;
        window.res['stItems'] = 0;
    } 
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)