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
    window.res['arrIndx'] = [];
    return res
}
function orderMethods(){
    this.Nsolicitacao        = '';//24920 
    this.host                = window.origin //"http://10.4.4.52:8080";   
    resMethods();
}
orderMethods.prototype.movePOST = function (NumSolicitacao, acao, vtDISUP, vtDIRAF, vtDITEC) {
    var Nsolicitacao            = NumSolicitacao; 
    this.Nsolicitacao           = NumSolicitacao;
    orderMethodsMi.Nsolicitacao = NumSolicitacao;

    var acao = acao

    var host                    = this.host;  
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
                var movementSequence    = request.responseIs.items.length;
                var targetState         = request.responseIs.items[request.responseIs.items.length - 1].state.sequence;
                var aprvAssr            = 0; 
                targetState = acao 
                aprvAssr    = acao
                /**
                 *  targetState:    11  = Analise Assr
                 *                  9   = Ajuste
                 *                  15  = Incluir
                 *                  16  = Excluir
                */
               if(vtDISUP != undefined || vtDISUP != ''){
                    var setFields = {
                        "hdn_aprvAssr": aprvAssr,
                        "hdn_DISUP_vt": vtDISUP,
                        "hdn_DIRAF_vt": vtDIRAF,
                        "hdn_DITEC_vt": vtDITEC
                    }
               }else{
                    var setFields = {
                        "hdn_aprvAssr": aprvAssr
                    }
               }
                $.ajax({
                    method: "POST",
                    url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/move",
                    contentType: "application/json", 
                    data:  JSON.stringify({
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
        window.res['responseIs']       = response;
        if(window.res['check'] != undefined){
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
        window.res['order']         = 1;
        window.res['arrIndx']       = [];
        window.res['responseIs']    = ''
    } 
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)