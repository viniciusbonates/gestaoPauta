function resMethods(){
    res = {}
    return res
}
function order(){
    resMethods();
    //requestsGET();
    movePOST();
}
function movePOST (){
    var Nsolicitacao        = 24920;
    var host                = "http://10.4.4.52:8080";     
    requestsGET(Nsolicitacao);
    var interval = setInterval(pst, 100)
    function pst(){
        var request             = window.res 
        console.log(request)
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
            }).done(function (response) { console.log(response); })
            clearInterval(interval)
        }
    }
}
function requestsGET(NumSolicit) {
    var Nsolicitacao    = 24920; 
    var host            = "http://10.4.4.52:8080";
    if(NumSolicit != '' && NumSolicit != undefined){
        Nsolicitacao = NumSolicit
    }
    $.ajax({
        method: "GET",
        url: host+"/process-management/api/v2/requests/"+Nsolicitacao+"/activities?page=1&pageSize=1000",
        contentType: "application/json"
    }).done(function (response) { 
        window.res = response;
    })
}

window.addEventListener('load', order)