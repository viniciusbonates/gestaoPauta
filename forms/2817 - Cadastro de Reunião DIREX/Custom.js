function definePainelEnabled(){
    let stateNow = window.parentOBJ.ECM.workflowView.stateDescription;
    if(stateNow == 'Detalhes da Solicitação'){ document.getElementById('PainelControle').style.display = 'none'; }

    let stts = window.parent.ECM.workflowView.sequence
    if(stts == 10){
        document.getElementById('PainelControle').style.display = 'none'
    }  
}window.addEventListener('load', definePainelEnabled)

var myToast =  function (tp, title) {
    FLUIGC.toast({
        title: title,   //'Ação realizada com sucesso!',
        message: '',
        type: tp        //success, danger, info and warning.
        });
}

function geradorPDF(){
        
    console.log(pdfMake)
    var dt_slc 	= document.getElementById('dt_dataInicio').value
    let dtPDF   = dt_slc;
    dtPDF = dtPDF.split('-')
    var itns 	= DatasetFactory.getDataset('Pauta DIREX', null,null,null).values;
    var itns_fil = [];
    var objInit			= '{';
    var objFim			= '}';
    var objVrg			= ',';
    var objStyles		= '\"styles\": {'+
                                    '\"header\": {'+
                                        '\"fontSize\": \"13\",'+
                                        '\"bold\": \"true\",'+
                                        '\"margin\": [0, 0, 0, 10]'+
                                    '},'+
                                    '\"subheader\": {'+
                                        '\"fontSize\": \"12\",'+
                                        '\"bold\": \"true\",'+
                                        '\"margin\": [0, 10, 0, 5]'+
                                    '},'+
                                    '\"tableExample\": {'+
                                        '\"margin\": [0, 5, 0, 15]'+
                                    '},'+
                                    '\"tableHeader\": {'+
                                        '\"bold\": \"true\",'+
                                        '\"fontSize\": \"12\",'+
                                        '\"color\": \"black\"'+
                                    '},'+
                                    '\"tableText\": {'+
                                        '\"bold\": \"true\",'+
                                        '\"fontSize\": \"11\",'+
                                        '\"color\": \"black\"'+
                                    '},'+
                                    '\"txtH\": {'+
                                        '\"bold\": \"true\",'+
                                        '\"fontSize\": \"11\",'+
                                        '\"alignment\": \"justify\"'+
                                    '}'+
                                '}'
    var objContent	 	= '\"content\": [ ';
    var objPdf 			= 0; 
    var ck_itn_now		= 0;
    for(i = 0; i < itns.length; i++){
        var dlbr_itn = itns[i]["txt_Deliberacao"]
        console.log(dlbr_itn)
        var dt_itn = itns[i].dataSelected
        /*******		Validação 		********/
        if(dt_itn != null & dt_itn != '' && dt_itn != undefined){
            dt_itn = dt_itn.split('/');
            dt_itn = dt_itn[2] + '-' +dt_itn[1] + '-'+ dt_itn[0]
            console.log(itns[i]["txt_NumProcess"])
            if(dlbr_itn == '' || dlbr_itn == null){                     // < ---- Texto Deliberacao preenchido
                ck_itn_now = true;
            }
            if(dt_slc != dt_itn || itns[i].txt_NumProcess == ''){       // < ---- N° processo existente ou data de reunião selecionada no momento da solicitacao igual a de reunião cadastrada
                ck_itn_now = true;
            }
            if(itns[i]["hdn_aprvAssr"] == ''){                          // < ---- || itns[i]["hdn_aprvAssr"] != '15' 'hdn_aprvAssr deve existir valor'
                ck_itn_now = true;
            }
        /***************************************/
            if(ck_itn_now != true){		
                console.log('***********************');
                itns_fil.push(itns[i])
            }else{ 
                ck_itn_now = false; 
            }
        }
        console.log(itns_fil)
    }
    /*******		itns_fil montado com os itens validados 		********/
    for(j = 0; j < itns_fil.length; j++){
        dtr = j + 1;
        if(objPdf == 0){ /****** INICIO  ********/
        /*{
			style: 'tableExample',
			table: {
				body: [
					['Column 1', 'Column 2', 'Column 3'],
					['One value goes here', 'Another one here', 'OK?']
				]
			}
		}*/
            /*var a = {
                "content": [{
                    "style": "tableExample",
                    "table": {
                        "body": [
                            ["REUNIÃO ORDINÁRIA DIREX/AM 28/06/2023"],
                        ]
                    }
                }, {
                    "text": " N° Solicitação: 26247",
                    "style": "subheader"
                }, "dfgbdsfghgfsdhfgd"],
                "styles": {
                    "header": {
                        "fontSize": "18",
                        "bold": "true",
                        "margin": [0, 0, 0, 10]
                    },
                    "subheader": {
                        "fontSize": "16",
                        "bold": "true",
                        "margin": [0, 10, 0, 5]
                    },
                    "tableExample": {
                        "margin": [0, 5, 0, 15]
                    },
                    "tableHeader": {
                        "bold": "true",
                        "fontSize": "13",
                        "color": "black"
                    }
                }
            }*/
            console.log(objPdf)
            
            objPdf = objInit + objContent + '{ "style": "tableExample", "table": {  "widths": ["*"], "body": [ [{"text": "REUNIÃO ORDINÁRIA DIREX/AM - '+dtPDF[2]+"/"+dtPDF[1]+"/"+dtPDF[0]+'", "style": "tableText"}], '+
                                                                                            '[{"text": "Manaus, '+dtPDF[2]+' de '+dtPDF[1]+' de '+dtPDF[0]+'.", "style": "tableText"}], '+
                                                                                            '[{"text": "DELIBERAÇÕES", "style": "tableText"}] ] }},' 
            objPdf = objPdf + '{'+
                '"text": "Aos cinco dias do mês de dezembro de 2022, às 10h, reuniu-se a Diretoria Executiva do SEBRAE no Amazonas, de forma virtual, com a participação das Diretoras Lamisse '+
                'Said da Silva Cavalcanti – Diretora Superintendente, Adrianne Antony Gonçalves – Diretora Técnica e Ananda Carvalho Normando Pessôa – Diretora Administrativa e Financeira para deliberarem os seguintes assuntos: ",'+
                '"style": "txtH",'+
                '"bold": "false"'+
            '},'

            objPdf = objPdf + '{'+
                '"text": "PROPOSIÇÕES:",'+
                '"style": "txtH",'+
                '"alignment": "center",'+
			    '"margin": [0, 20, 0, 5]'+
            '},'

            objPdf =  objPdf + '{"text": \" N° Solicitação: '+itns_fil[j].txt_NumProcess + '\", "style": "subheader"},';
            dlbr_now = itns_fil[j]["txt_Deliberacao"]

            //dlbr_now = dlbr_now.replace(/\r/g, '---')
            //dlbr_now = dlbr_now.replace(/\n/g, '---') 
            dlbr_now = dlbr_now.replace(/\t/g, ' ')
            //objPdf =  objPdf + '\"' + dlbr_now + '\"';

            let totalLength = dlbr_now.length 
            var arrParts 	= []; 
            for(l = 0; l < totalLength; l++){
                f 			= dlbr_now.indexOf('\n')
                if(f == 0){
                    dlbr_now	= dlbr_now.slice(1, totalLength);
                }else{
                    part_dlbr 	= dlbr_now.slice(0, f) 
                    dlbr_now	= dlbr_now.slice(f, totalLength);
                    if(part_dlbr != '' && part_dlbr != ' '){
                        arrParts.push(part_dlbr);
                    }
                }
            }
            for(ll = 0; ll < arrParts.length; ll++){
                teto = ll +1
                if(teto == arrParts.length){
                    objPdf =  objPdf + '\"' + arrParts[ll] + '\"';	
                }else { objPdf =  objPdf + '{ "text": \"' + arrParts[ll] + '\","margin": [0, 5] },'; }
            }

        }else{
            objPdf =  objPdf + '{"text": \" N° Solicitação: '+itns_fil[j].txt_NumProcess + '\", "style": "subheader"},';
            dlbr_now = itns_fil[j]["txt_Deliberacao"]
            dlbr_now = dlbr_now.replace(/\r/g, '')
            //dlbr_now = dlbr_now.replace(/\n/g, '') 
            dlbr_now = dlbr_now.replace(/\t/g, '')
            let totalLength = dlbr_now.length 
            var arrParts 	= []; 
            for(l = 0; l < totalLength; l++){
                f 			= dlbr_now.indexOf('\n')
                if(f == 0){
                    dlbr_now	= dlbr_now.slice(1, totalLength);
                }else{
                    part_dlbr 	= dlbr_now.slice(0, f) 
                    dlbr_now	= dlbr_now.slice(f, totalLength);
                    if(part_dlbr != '' && part_dlbr != ' '){
                        arrParts.push(part_dlbr);
                    }
                }
            }
            for(ll = 0; ll < arrParts.length; ll++){
                teto = ll +1
                if(teto == arrParts.length){
                    objPdf =  objPdf + '\"' + arrParts[ll] + '\"';	
                }else { objPdf =  objPdf + '{ "text": \"' + arrParts[ll] + '\","margin": [0, 5] },'; }
            }

            //objPdf = objPdf + ' \"'+ dlbr_now+'\"';
        }
        if(dtr == itns_fil.length){ /****** FIM  ********/
            objPdf = objPdf + ']' + objVrg;
        }else{ /****** MEIO  ********/ 
            objPdf = objPdf + '\n' + objVrg; 
        }
    }
    if(objPdf != 0){
        objPdf = objPdf + objStyles + objFim
        console.log(objPdf)
        objPdfFinal = JSON.parse(objPdf)
        pdfMake.createPdf(objPdfFinal).open();
    }else{
        myToast('warning', 'Não a itens de Pauta para Gerar o Arquivo');
    }
    /*var objPdfFinal = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
        
    }*/
}
function getPDF () { document.getElementById('getData').addEventListener('click', function () { geradorPDF() } ) }
window.addEventListener('load', getPDF)


function defineState () {
    let stts = window.parent.ECM.workflowView.sequence
    if(stts == 4 || stts == 0){
        document.getElementById('PainelControle').style.display = 'none'
    }    
}
window.addEventListener('load', defineState)

function unidade(){
    var ds_mat = DatasetFactory.getDataset("colleague",null,null,null);
    var ds_und = DatasetFactory.getDataset("dsc_Unidades",null,null,null);

    var mat = document.getElementById("cmb_NomeSolicita").value;

    for(var i=0;i<ds_mat.values.length;i++){
        if(mat == ds_mat.values[i]['colleaguePK.colleagueId']){
            //document.getElementById("mt_solicit").value = mat
            var und = ds_mat.values[i]['groupId'];
            for(var j=0;j<ds_und.values.length;j++){
                if(und == ds_und.values[j]['AntigaSigla']){
                    //console.log(ds_und.values[j]['Sigla'])
					//console.log(ds_und.values[j])
                    document.getElementById("cmb_GerenteSolicitante").value = ds_und.values[j]['NomeGerente']
                    document.getElementById("zm_UnidadeSolicitante").value = ds_und.values[j]['NomeUnidade']
                    document.getElementById("hd_numSuperior").value = ds_und.values[j]['Matricula']
                }
            }
        }
    }
}
window.addEventListener("load", unidade);

function styleFormatDisable(){
    let arrayInput      = document.getElementsByTagName("input");
    let arraySpan       = document.getElementsByTagName("span");
    let arraySelect     = document.getElementsByTagName("select");
    let arrayP          = document.getElementsByTagName("p");
    let arrayTextA      = document.getElementsByTagName("textarea");
    //let arrayStrong     = document.getElementsByTagName("strong");
    let arrayTotal  = [arrayInput, arraySpan, arraySelect, arrayP, arrayTextA/*, arrayStrong*/];
    for(i = 0; i < arrayTotal.length; i++){
        let arrayGo = arrayTotal[i];
        for(y = 0; y < arrayGo.length; y++){
            if(arrayGo[y].getAttribute("class") != "fluigicon fluigicon-zoom-in" && arrayGo[y].getAttribute("class") != "input-group-addon"
            && arrayGo[y].getAttribute("class") != "select2-selection__choice__remove" && arrayGo[y].getAttribute("class") != "Obrigatorio"){
                //console.log(arrayGo[y].getAttribute("class"))
                arrayGo[y].style.color = "black";
            }
        }
    }
}
//function controllerTime(){ setTimeout(styleFormatDisable, 6000); }
//window.addEventListener('load', styleFormatDisable)