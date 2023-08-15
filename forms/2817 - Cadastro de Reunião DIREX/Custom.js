function setDataset(){
    colleague = DatasetFactory.getDataset("colleague",null,null,null);
    dsc_Unidades = DatasetFactory.getDataset("dsc_Unidades",null,null,null);
    colleagueGroup = DatasetFactory.getDataset("colleagueGroup", null, null, null)
}window.addEventListener('load', setDataset)

function DemandResp() {
    cll     = colleague;
    c5      = DatasetFactory.createConstraint("groupId", 'UsuarioInc', 'UsuarioInc',  ConstraintType.MUST_NOT); 
    cnst    = new Array(c5);
    dsCllFinal = DatasetFactory.getDataset("colleague",null,cnst,null);
    elemSelc = document.getElementById('slc_demandante')
    for(z = 0; z < dsCllFinal.values.length; z++){
        nameCll     = dsCllFinal.values[z]['colleagueName']
        idCll       = dsCllFinal.values[z]['colleaguePK.colleagueId']
        console.log(nameCll)
        console.log(idCll)
        var node = document.createElement("option");
        var att = document.createAttribute("value");
        att.value = idCll
        node.setAttributeNode(att)
        node.innerText = nameCll
        elemSelc.appendChild(node);
    }
    console.log(dsCllFinal)

}
window.addEventListener('load', DemandResp)

function setValueInpDelibr() {
    let stateNow = window.parentOBJ.ECM.workflowView.sequence;
    matDirIn = 0;
    if(stateNow == 4 || stateNow == 0){
        document.getElementById('txt_IniDelibr').value = 'Aos cinco dias do mês de dezembro de 2022, às 10h, reuniu-se a Diretoria Executiva do SEBRAE no Amazonas, de forma virtual, com a participação das Diretoras Lamisse Said da Silva Cavalcanti – Diretora Superintendente, Adrianne Antony Gonçalves – Diretora Técnica e Ananda Carvalho Normando Pessôa – Diretora Administrativa e Financeira para deliberarem os seguintes assuntos:'
        document.getElementById('txt_FinDelibr').value = 'A reunião foi encerrada às 11h30, ficando acordado entre as Diretoras a realização da 46ª Reunião Ordinária DIREX 2022 no dia 05/12/2022, conforme previsto em calendário.'
        document.getElementById('txt_tituloReuniao').value = '20ª REUNIÃO ORDINÁRIA DIREX/AM '
    }

    var mat             = window.parent.WCMAPI.userCode;
    var ds_mat_ger_pdf  = colleague
    var ds_und_ger_pdf  = dsc_Unidades
    console.log(ds_mat_ger_pdf)
    console.log(ds_und_ger_pdf)
    console.log(mat)
    for(var i = 0;i<ds_mat_ger_pdf.values.length;i++){
        //console.log('***************************************///////////////////////////////////////////')
        //console.log(ds_und_ger_pdf)
        if(mat == ds_mat_ger_pdf.values[i]['colleaguePK.colleagueId']){
            var und = ds_mat_ger_pdf.values[i]['groupId'];
            console.log(und)
            for(var j=0;j<ds_und_ger_pdf.values.length;j++){
                if(und == ds_und_ger_pdf.values[j]['AntigaSigla']){
                    console.log("%Pool:Role:"+ds_und_ger_pdf.values[j]['Sigla']+"%")
                    matDirIn = ds_und_ger_pdf.values[j]['Sigla'];
                    if(ds_und_ger_pdf.values[j]['Sigla'] == 'NTIC'){
                        matDirIn = "DIRAF";
                    }else{
                        matDirIn = ds_und_ger_pdf.values[j]['Sigla'];
                    }
                }
            }
        }
    }
    if(matDirIn != 0){
        console.log(document.getElementById('txt_Info'+matDirIn))
        document.getElementById('txt_Info'+matDirIn).parentElement.parentElement.style.display = 'block';
        document.getElementById('txt_obsDlbr'+matDirIn).parentElement.parentElement.style.display = 'block';
    }
}window.addEventListener('load',setValueInpDelibr)

function definePainelEnabled(){
    console.log('************************************************        **********************************************')
    console.log(matDirIn)
/*  Depreciado ->
    let stateNow = window.parentOBJ.ECM.workflowView.stateDescription;
    if(stateNow == 'Detalhes da Solicitação'){ document.getElementById('PainelControle').style.display = 'none'; }
*/
    var ckInpStateDef = document.getElementById('txt_FinDelibr')
    var ckIsmatDirIn = 0;
    arrdirImed = ['DISUP', 'DIRAF', 'DITEC']
    for(i = 0; i < arrdirImed.length; i++){
        if(matDirIn == arrdirImed[i]){
            ckIsmatDirIn++
            console.log('************************************************        **********************************************')
            console.log(ckIsmatDirIn)
        }
    }
    if(ckInpStateDef.tagName == 'SPAN' && ckIsmatDirIn == 0){
        document.getElementById('DadosCadastro').innerHTML = '';
        document.getElementById('PainelControle').innerHTML = '';
    }

    let stts = window.parent.ECM.workflowView.sequence
    if(stts == 10 || stts == 14){
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
 

    var ds_mat_ger_pdf  = colleague
    var ds_und_ger_pdf  = dsc_Unidades
    var matDir          = 0
    var dirImed         = 0;
    var mat             = window.parent.params.taskUserId;
    var arrItns_Dir 	= []
    if(atvd == 8){
        for(var i = 0;i<ds_mat_ger_pdf.values.length;i++){
            if(mat == ds_mat_ger_pdf.values[i]['colleaguePK.colleagueId']){
                var und = ds_mat_ger_pdf.values[i]['groupId'];
                console.log(und)
                for(var j=0;j<ds_und_ger_pdf.values.length;j++){
                    if(und == ds_und_ger_pdf.values[j]['AntigaSigla']){
                        console.log("%Pool:Role:"+ds_und_ger_pdf.values[j]['Sigla']+"%")
                        dirImed = ds_und_ger_pdf.values[j]['Sigla'];
                        if(ds_und_ger_pdf.values[j]['Sigla'] == 'ATIC'){
                            matDir = "%Pool:Role:DISUP%";
                        }else{
                            matDir = "%Pool:Role:"+ds_und_ger_pdf.values[j]['Sigla']+"%";
                        }
                    }
                }
            }
        }
        c1 = DatasetFactory.createConstraint("hdn_dir_vinc", matDir , matDir,  ConstraintType.MUST, true); 
        cnst = new Array(c1);
        itns = DatasetFactory.getDataset('Pauta DIREX', null, cnst, null).values;
        arrItns_Dir.push(itns)
    }else{
        c1 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DISUP%" , "%Pool:Role:DISUP%",  ConstraintType.MUST, true); 
        c2 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DITEC%" , "%Pool:Role:DITEC%",  ConstraintType.MUST, true); 
        c3 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DIRAF%" , "%Pool:Role:DIRAF%",  ConstraintType.MUST, true); 
        cnst1 = new Array(c1)
        cnst2 = new Array(c2)
        cnst3 = new Array(c3)
        itnsDISUP = DatasetFactory.getDataset('Pauta DIREX', null, cnst1, null).values;
        itnsDITEC = DatasetFactory.getDataset('Pauta DIREX', null, cnst2, null).values;
        itnsDIRAF = DatasetFactory.getDataset('Pauta DIREX', null, cnst3, null).values;
        if(itnsDISUP.length != 0){ arrItns_Dir.push(itnsDISUP) }
        if(itnsDITEC.length != 0){ arrItns_Dir.push(itnsDITEC) }
        if(itnsDIRAF.length != 0){ arrItns_Dir.push(itnsDIRAF) }
    }
    console.log(pdfMake)
    var dt_slc 	= document.getElementById('dt_dataInicio').value
    let dtPDF   = dt_slc;
    dtPDF = dtPDF.split('-')

    

    var arrItns_Dir_fil = [];
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
                                        '\"fontSize\": \"11\",'+
                                        '\"bold\": \"true\",'+
                                        '\"margin\": [20, 10, 20, 5]'+
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
    for(i = 0; i < arrItns_Dir.length; i++){
        itns = arrItns_Dir[i];
        itns_filtr = [];
        for(j = 0; j < itns.length; j++){ 
            var dlbr_itn = itns[j]["txt_Deliberacao"]
            console.log(dlbr_itn)
            var dt_itn = itns[j].dataSelected
            /*******		Validação 		********/
            if(dt_itn != null & dt_itn != '' && dt_itn != undefined){
                dt_itn = dt_itn.split('/');
                dt_itn = dt_itn[2] + '-' +dt_itn[1] + '-'+ dt_itn[0]
                console.log(itns[j]["txt_NumProcess"])
                if(dlbr_itn == '' || dlbr_itn == null){                     // < ---- Texto Deliberacao preenchido
                    ck_itn_now = true;
                }
                if(dt_slc != dt_itn || itns[j].txt_NumProcess == ''){       // < ---- N° processo existente ou data de reunião selecionada no momento da solicitacao igual a de reunião cadastrada
                    ck_itn_now = true;
                }
                if(itns[j]["hdn_aprvAssr"] == ''){                          // < ---- || itns[i]["hdn_aprvAssr"] != '15' 'hdn_aprvAssr deve existir valor'
                    ck_itn_now = true;
                }
                console.log(itns[j]["hdn_dir_vinc"])
                if(itns[j]["hdn_dir_vinc"] == '' || itns[j]["hdn_dir_vinc"] == null){                          // < ---- Indicação da Diretoria Imediata 
                    ck_itn_now = true;
                }
            /***************************************/
                if(ck_itn_now != true){		
                    console.log('***********************');
                    itns_filtr.push(itns[j])
                }else{ 
                    ck_itn_now = false; 
                }
            }
            console.log(itns_filtr)
        }
        if(itns_filtr.length != 0){ arrItns_Dir_fil.push(itns_filtr) } 
    }
    console.log(arrItns_Dir_fil)
    /*******		itnDirNow montado com os itens validados 		********/
    for(i = 0; i < arrItns_Dir_fil.length; i++){
        itnDirNow = arrItns_Dir_fil[i];
        dirImed = 0;
        dtrArrAll = i + 1;
        MonthIn     = new Date().getMonth() 
        MonthStr    = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'] 
        for(j = 0; j < itnDirNow.length; j++){
            dtr = j + 1;
            if(objPdf == 0){ /****** INICIO  ********/
                console.log(objPdf)
                objPdf = objInit + objContent + '{ "style": "tableExample", "table": {  "widths": ["*"], "body": [ [{"text": "REUNIÃO ORDINÁRIA DIREX/AM - '+dtPDF[0]+'", "style": "tableText", "alignment": "center"}], '+
                                                                                                '[{"text": "Manaus, '+dtPDF[2]+' de '+MonthStr[MonthIn]+' de '+dtPDF[0]+'.", "style": "tableText", "alignment": "center"}], '+
                                                                                                '[{"text": "DELIBERAÇÕES", "style": "tableText", "alignment": "center"}] ] }},' 
                objPdf = objPdf + '{ "text": "'+ document.getElementById('txt_IniDelibr').value +  '",'+
                            '"style": "txtH",'+
                            '"bold": "false"'+
                        '},'
                /*    '"text": "Aos cinco dias do mês de dezembro de 2022, às 10h, reuniu-se a Diretoria Executiva do SEBRAE no Amazonas, de forma virtual, com a participação das Diretoras Lamisse '+
                    'Said da Silva Cavalcanti – Diretora Superintendente, Adrianne Antony Gonçalves – Diretora Técnica e Ananda Carvalho Normando Pessôa – Diretora Administrativa e Financeira para deliberarem os seguintes assuntos: ",'+
                    '"style": "txtH",'+
                    '"bold": "false"'+
                '},'*/

                objPdf = objPdf + '{'+
                    '"text": "PROPOSIÇÕES:",'+
                    '"style": "txtH",'+
                    '"alignment": "center",'+
                    '"margin": [0, 20, 0, 5]'+
                '},'

                dirImedVinc = itnDirNow[j]["hdn_dir_vinc"].split(':')[2]
                if(dirImed != dirImedVinc){
                    dirImed = dirImedVinc;
                }
                objPdf = objPdf + '{'+
                '"text": "PAUTA '+dirImed+':",'+
                '"fontSize": 13,'+
                '"bold": "true",'+
                '"margin": [0, 40, 0, 0]'+
                '},'

                //objPdf =  objPdf + '{"text": \"'+dtr+'.   N° Solicitação: '+itnDirNow[j].txt_NumProcess + '\", "style": "subheader"},';
                dlbr_now = itnDirNow[j]["txt_Deliberacao"]

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
                    teto = ll + 1
                    /**
                     * Uma virgula ',' é adicionada automaticamente quando a mais de uma deliberação 
                    */
                    if(teto == arrParts.length && arrItns_Dir_fil.length == 2){
                        if(ll == 0){
                            objPdf =  objPdf + '{"text": \"'+dtr+'.   '+ arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 }';
                        }else{ objPdf =  objPdf + '{ "text": \"' + arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 }';}
                        	
                    }else { 
                        if(ll == 0){
                            objPdf =  objPdf + '{"text": \"'+dtr+'.   '+ arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 },';
                        }else{ objPdf =  objPdf + '{ "text": \"' + arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 },';}
                    }
                }
                console.log(objPdf)
            }else{
                dirImedVinc = itnDirNow[j]["hdn_dir_vinc"].split(':')[2];
                console.log(dirImedVinc)
                if(dirImed != dirImedVinc){
                    dirImed = dirImedVinc;
                    objPdf = objPdf + '{'+
                    '"text": "PAUTA '+dirImed+':",'+
                    '"fontSize": 13,'+
                    '"bold": "true",'+
                    '"margin": [0, 40, 0, 0]'+
                    '},'
                }
                //objPdf =  objPdf + '{"text": \"'+dtr+'.   N° Solicitação: '+itnDirNow[j].txt_NumProcess + '\", "style": "subheader"},';
                dlbr_now = itnDirNow[j]["txt_Deliberacao"]
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
                    if(ll == 0){
                        objPdf =  objPdf + '{"text": \"'+dtr+'.   '+ arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 },';
                    }else{ objPdf =  objPdf + '{ "text": \"' + arrParts[ll] + '\","margin": [20, 5], "fontSize": 11 },';}
                }
                //objPdf = objPdf + ' \"'+ dlbr_now+'\"';
            }
        }
            console.log(dtrArrAll + ' -----------------------------------------')
            console.log(arrItns_Dir_fil.length + ' -----------------------------------------')
            if(dtrArrAll == arrItns_Dir_fil.length){ /****** FIM  ********/
            objPdf = objPdf + '{ "text": "'+ document.getElementById('txt_FinDelibr').value +  '",'+
                    '"style": "txtH",'+
                    '"bold": "false",'+
                    '"margin": [0, 15, 0, 0]'+
                '},'
                objPdf = objPdf + '{'+
                    '"text": "Ananda Carvalho Normando Pessôa",'+
                    '"fontSize": 13,'+
                    '"bold": "true",'+
                    '"alignment": "center",'+
                    '"margin": [0, 50, 0, 0]'+
                '},{'+
                    '"text": "Diretora Superintendente",'+
                    '"fontSize": 11,'+
                    '"bold": true ,'+
                    '"alignment": "center"'+
                '},{'+
                    '"text": ["Lamisse Said da Silva Cavalcanti                                            Adrianne Antony Gonçalves"],'+
                    '"fontSize": 13,'+
                    '"bold": true,'+
                    '"margin": [0, 50, 0, 0]'+
                '},{'+
                    '"text": ["Diretoria Tecnica                                                                                        Diretoria Administrativa Financeira"],'+
                    '"fontSize": 11,'+
                    '"bold": true'+
                "}";
                objPdf = objPdf + ']' + objVrg;
            }else{ /****** MEIO  ********/ 
                objPdf = objPdf + '\n' + objVrg; 
            }
    }
    if(objPdf != 0){
        objPdf = objPdf + objStyles + objFim
        objPdfFinal = JSON.parse(objPdf)
        console.log(objPdfFinal)
        pdfMake.createPdf(objPdfFinal).open();
    }else{
        myToast('warning', 'Não a itens de Pauta para Gerar o Arquivo');
    }
}
/*function getPDF () { document.getElementById('getData').addEventListener('click', function () { geradorPDF() } ) }
window.addEventListener('load', getPDF)
*/

function defineState () {
    let stts = window.parent.ECM.workflowView.sequence
    if(stts == 4 || stts == 0){
        document.getElementById('PainelControle').style.display = 'none'
    }    
}
window.addEventListener('load', defineState)

function unidade(){
    var ds_mat_in = colleague
    var ds_und_in = dsc_Unidades
    var mat = document.getElementById("cmb_NomeSolicita").value;
    for(var i=0;i<ds_mat_in.values.length;i++){
        if(mat == ds_mat_in.values[i]['colleaguePK.colleagueId']){
            var und = ds_mat_in.values[i]['groupId'];
            for(var j=0;j<ds_und_in.values.length;j++){
                if(und == ds_und_in.values[j]['AntigaSigla']){
                    document.getElementById("cmb_GerenteSolicitante").value = ds_und_in.values[j]['NomeGerente']
                    document.getElementById("zm_UnidadeSolicitante").value = ds_und_in.values[j]['NomeUnidade']
                    document.getElementById("hd_numSuperior").value = ds_und_in.values[j]['Matricula']
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