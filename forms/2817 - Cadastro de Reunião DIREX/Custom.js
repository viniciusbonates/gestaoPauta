/*function openItem(){
    //https://myweb.am.sebrae.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=24878&app_ecm_workflowview_taskUserId=00000514
    //http://10.4.4.52:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=24719

        var url = "http://10.4.4.52:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
        var arrColumnsRender = ['N° Solicitação', 'Data Solicitação', 'Nome Solicitante', 'Unidade', 'Assunto', 'Justificativa']
        var indexLink = []
        var divIn = document.getElementsByClassName('row fs-no-margin')
        var divAll = divIn[0].parentElement.parentElement       //DIV com o componente dataTable
        var tableBody   = divAll.getElementsByTagName('tbody')[0]    
        var nomeCol     = divAll.getElementsByTagName('thead')[0].rows[0].cells
        var rows = tableBody.rows                              //Linhas da pagina atual da dataTable
        for(i = 0; i < rows.length; i++){
            let row = rows[i]
            let cells = row.cells
            indexLink[i] = cells[0]
            if(cells[0].innerText != ''){
                let textLink = cells[0].innerText
                let inHTML = "<a href=\""+ url + textLink +"\""+ "class=\"cad-link\""+"target=\"_blank\""+"style=\"color:blue\" ml=\"true\">"+"<i class=\"flaticon flaticon-link icon-md\"></i>"+
                textLink+"</a>"
                cells[0].innerHTML = inHTML
            }
        }
}
window.addEventListener('load', openItem)
*/
/*
function Custom(){
    console.log(DatasetFactory.getDataset("Pauta DIREX", null, null, null))
	var dataset = DatasetFactory.getDataset("Pauta DIREX", null, null, null)
	var data = dataset.values[0]
	
	var myJSON 	= JSON.stringify(data);
	var dv		= myJSON.split(',')
	for(j = 0; j < dv.len){

	}
	var dv1		= dv.split(':')

	var tabela = document.getElementById('PanelControl').children[1]

	for(i = 0; i < dataset.values.length; i++){
		var dataIN = dataset.values[i].zm_DataReuniao
		var linha = document.createElement("TR"); 
		tabela.appendChild(linha);
		for(y = 0; y < 6; y++){
			var coluna = document.createElement("TD");                 
			coluna.innerHTML = dataIN;     
			linha.appendChild(coluna);                      
		}                
	}
            
	
	console.log(document.getElementById('PanelControl').children[1].rows)
	//console.log(dv1)
}
window.addEventListener('load', Custom)
*/

function geradorPDF(){
    
console.log(pdfMake)
console.log(objMain.objCollection)
var dt_slc 	= document.getElementById('dt_dataInicio').value
var itns 	= objMain.objCollection;
var itns_fil = [];
var objInit			= '{';
var objFim			= '}';
var objVrg			= ',';
var objStyles		= '\"styles\": {'+
								'\"header\": {'+
									'\"fontSize\": \"18\",'+
									'\"bold\": \"true\",'+
									'\"margin\": [0, 0, 0, 10]'+
								'},'+
								'\"subheader\": {'+
									'\"fontSize\": \"16\",'+
									'\"bold\": \"true\",'+
									'\"margin\": [0, 10, 0, 5]'+
								'},'+
								'\"tableExample\": {'+
									'\"margin\": [0, 5, 0, 15]'+
								'},'+
								'\"tableHeader\": {'+
									'\"bold\": \"true\",'+
									'\"fontSize\": \"13\",'+
									'\"color\": \"black\"'+
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
		if(dlbr_itn == '' || dlbr_itn == null){
			ck_itn_now = true;
		}
		if(dt_slc != dt_itn && itns[i].txt_NumProcess == ''){
			ck_itn_now = true;
		}
		if(itns[i]["hdn_aprvAssr"] == ''){ //|| itns[i]["hdn_aprvAssr"] != '15'
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

		console.log(objPdf)
		objPdf = objInit + objContent + '{"text": "Deliberação 38ª Reunião DIREX 2022 ", "style": "header"},' 
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
		//dlbr_now = dlbr_now.replace(/\r/g, '')
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
objPdf = objPdf + objStyles + objFim
console.log(objPdf)
objPdfFinal = JSON.parse(objPdf)
pdfMake.createPdf(objPdfFinal).open();

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