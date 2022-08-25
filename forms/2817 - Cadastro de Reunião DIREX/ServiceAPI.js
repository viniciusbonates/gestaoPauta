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
        return console.log('Necessário selecionar um Item')
    }
    var host                = this.host;     
    this.requestsGET(Nsolicitacao, this.host);
    var interval = setInterval(pst, 100)
    function pst(){
        try{
            var request = window.res 
            if(request.items.length != undefined){
                var movementSequence    = request.items.length;
                var targetState         = request.items[request.items.length - 1].state.sequence;
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
                    async: false
                }).done(function (response) { 
                    console.log(response); 
                    let n = orderMethodsMi.Nsolicitacao;
                    let host = orderMethodsMi.host;
                    orderMethodsMi.requestsGET(n, host);
                    window.res['order'] = 2
                })
                clearInterval(interval)
            }
        }catch(err){window.res =  err.name; console.log(err.name); clearInterval(interval) }
    }
}
orderMethods.prototype.requestsGET = function (NumSolicit, host) {
    $.ajax({
        method: "GET",
        url: host+"/process-management/api/v2/requests/"+NumSolicit+"/activities?page=1&pageSize=1000",
        contentType: "application/json"
    }).done(function (response) { 
        window.res['res']     = response;
        window.res['order']   = 1; 
        console.log(window.res)
    })
}
function orderMethodsInit() { orderMethodsMi = new orderMethods(); }
window.addEventListener('load', orderMethodsInit)