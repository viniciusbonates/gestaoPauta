//***********************************************************************************************************************************/
/**
 *  res = {} mehtod 'Order'
 *      -> 0 == NumSolicitacao empty
 *      -> 1 == 1º passagem por requestGET
 *      -> 2 == 2° ultima passagem por requestGET
 * 
 * 
 */			 
//***********************************************************************************************************************************/
function resMethods(){
    res = {}
    return res
}
function orderMethods(){
    this.Nsolicitacao        = '';//24920 
    this.host                = window.origin //"http://10.4.4.52:8080";   
    resMethods();
}
orderMethods.prototype.movePOST = function (NumSolicitacao, acao) {
    var Nsolicitacao            = NumSolicitacao; 
    this.Nsolicitacao           = NumSolicitacao;
    orderMethodsMi.Nsolicitacao = NumSolicitacao;

    var acao = acao

    var host                    = this.host;  
    this.requestsGET(Nsolicitacao, this.host);
    var interval = setInterval(pst, 100)
    console.log(Nsolicitacao)
    function pst(){
        try{
            var request = window.res 
            let resp    = request.response
            if(resp != undefined){
                var movementSequence    = request.response.items.length;
                var targetState         = request.response.items[request.response.items.length - 1].state.sequence;
                var aprvAssr            = 0;
                //if(targetState == 11){ 
                    targetState = acao 
                    aprvAssr    = acao

                    console.log(targetState)
                    console.log(aprvAssr)
                //}
                //else if(targetState == 5){ 
                    //targetState = 9; 
                    //aprvAssr    = 1
                //}

                /**
                 *  targetState:    11  = Analise Assr
                 *                  9   = Ajuste
                 *                  15  = Incluir
                 *                  16  = Excluir
                */




                $.ajax({
                    method: "POST",
                    url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/move",
                    contentType: "application/json", 
                    data:  JSON.stringify({
                        "movementSequence":     movementSequence,   //7
                        "targetState":          targetState,        //9
                        "formFields": {
                            "hdn_aprvAssr": aprvAssr
                        }
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
                    window.res['check'] = true
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
        contentType: "application/json"
    }).done(function (response) { 
        window.res['response']       = response;
        if(window.res['check'] != undefined){
            if(window.res['check'] == true){
                window.res['order']     = 2;
            }else if(window.res['check'] == false){
                window.res['order']     = 1;
            }
        }
        window.res['err']       = '';
    })
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)