function resMethods(){
    res = {}
    return res
}
function orderMethods(){
    this.Nsolicitacao        = 24920; 
    this.host                = window.origin //"http://10.4.4.52:8080";   
    resMethods();
}
orderMethods.prototype.movePOST = function (NumSolicitacao) {
    var Nsolicitacao        = NumSolicitacao; 
    var host                = this.host; 
    if(NumSolicitacao == undefined || NumSolicitacao == ''){
        Nsolicitacao        = this.Nsolicitacao; 
        window.res['order'] = 0; 
        return console.log('Necessário selecionar um Item')
    }
    var host                = this.host;     
    this.requestsGET(Nsolicitacao, this.host);
    var interval = setInterval(pst, 100)
    console.log(Nsolicitacao)
    function pst(){
        try{
            var request = window.res 
            console.log(request)
            let resp    = request.response
            console.log(resp)
            if(resp != undefined){
                var movementSequence    = request.response.items.length;
                var targetState         = request.response.items[request.response.items.length - 1].state.sequence;
                if(targetState == 9){ targetState = 5 }
                else if(targetState == 5){ targetState = 9 }
                $.ajax({
                    method: "POST",
                    url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/move",
                    contentType: "application/json", 
                    data:  JSON.stringify({
                        "movementSequence":     movementSequence,   //7
                        "targetState":          targetState,        //9
                        "formFields": {
                            "txt_titulo": "TESTE  AAA"
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
                    orderMethodsMi.requestsGET(n, host);
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
                window.res['check']     = false;
            }else if(window.res['check'] == false){
                window.res['order']     = 1;
            }
        }
        window.res['err']       = '';
        console.log(window.res)
        console.log('**************')
    })
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)