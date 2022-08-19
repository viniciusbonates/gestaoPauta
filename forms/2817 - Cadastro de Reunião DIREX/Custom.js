function Custom(){
    console.log(DatasetFactory.getDataset("Pauta DIREX", null, null, null))
	var dataset = DatasetFactory.getDataset("Pauta DIREX", null, null, null)
	var data = dataset.values[0]
	
/*	var myJSON 	= JSON.stringify(data);
	var dv		= myJSON.split(',')
	for(j = 0; j < dv.len){

	}
	var dv1		= dv.split(':')
*/
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
                    console.log(ds_und.values[j]['Sigla'])
					console.log(ds_und.values[j])
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