/*function determineEditor(){
    arrElemtsTrigger = [];
    getData = document.getElementById('getData');
    var buttons = window.parentOBJ.document.getElementsByTagName('button');
    //var uls = window.parentOBJ.document.getElementsByTagName('a');
    var lis = window.parentOBJ.document.getElementsByTagName('li');
    this.arrEnv = [buttons, lis];
    console.log(this.arrEnv)
    btn1 = document.getElementById('btn1').getElementsByTagName('button')[0];
    arrElemtsTrigger.push(getData);
    arrElemtsTrigger.push(btn1);
    this.buttonReference = arrElemtsTrigger;
    this.inpIn = ['txt_IniDelibr', 'txt_FinDelibr', 'txt_Deliberacao', 'txt_Justificativa', 'txt_InfoDISUP', 'txt_InfoDIRAF', 'txt_InfoDITEC'];
    this.arrEdits = [];
    this.setRichEditor();
    this.setFuncbutton();
}
determineEditor.prototype.disabledEditor = function (inp) {
    var thisInput   = document.getElementById(inp.id);
    objCheck        = thisInput.parentElement.parentElement.getElementsByClassName('in');
    if(objCheck.length == 0){
        var divDisabled = document.createElement('div');
        divDisabled.setAttribute('class', "fluig-style-guide modal-backdrop  in");
        divDisabled.setAttribute('style', "background-color: rgba( 0, 0, 0, .07);display: block;");
        divDisabled.setAttribute('id', "shadow");
        divDisabled.setAttribute('tabindex', "-1");
        thisInput.parentElement.getElementsByTagName('iframe')[0].tabIndex = -1;
        divEditor   = document.getElementById(inp.id).parentElement.parentElement;
        divEditor.append(divDisabled);
    } 
}
determineEditor.prototype.cleanEditor = function (inp) {
    var thisInput   = document.getElementById(inp.id);
    objCheck        = thisInput.parentElement.parentElement.getElementsByClassName('in');
    if(objCheck.length != 0){
        //var divDisabled = objCheck[0];
        thisInput.parentElement.getElementsByTagName('iframe')[0].tabIndex = 0;
        divEditor   = thisInput.parentElement.parentElement;
        //divIn       = divEditor.children[1];
        divEditor.removeChild(divEditor.children[1]);
    } 
}
determineEditor.prototype.setDataInput = function (inp) {
    for(i = 0; i < this.arrEdits.length; i++){
        if(this.arrEdits[i].editor.name == inp.id){
            this.arrEdits[i].setData(inp.value);
        }
    }
}
determineEditor.prototype.setDataInputsParams = function () {
    for(i = 0; i < this.inpIn.length; i++){
        inpNow = document.getElementById(this.inpIn[i]);
        inpNow.value = this.arrEdits[i].getData();
    }  
    //this.inpIn.value = this.edit.getData();
}
determineEditor.prototype.setFuncbutton = function () {
    if(typeof this.buttonReference != 'string'){
        for (let x in this.buttonReference) {
            this.buttonReference[x].addEventListener('click', function () { myEditor.setDataInputsParams(); });
        }
    }else{
        document.getElementById(this.buttonReference).addEventListener('click', function () { myEditor.setDataInputsParams(); }) 
    }
    for(let z in this.arrEnv){
        arrTargetNow = this.arrEnv[z]
        for (y = 0; y < arrTargetNow.length; y++) {
            console.log(arrTargetNow[y])
            var btnSave = arrTargetNow[y].getAttribute('data-save');
            var btn = arrTargetNow[y].getAttribute('data-send');
           
            console.log(y)
            console.log(btnSave)
            console.log(btn)
            if (btn == '' ) {
                arrTargetNow[y].addEventListener('click', function () { myEditor.setDataInputsParams(); });
            }
            if (btnSave == '') {
                console.log(arrTargetNow[y])
                arrTargetNow[y].addEventListener('click', function () { myEditor.setDataInputsParams(); });
            }
        }
    }
}
determineEditor.prototype.setRichEditor = function () {
    arrInps = [];
    for(i = 0; i < this.inpIn.length; i++){
        inpNow = document.getElementById(this.inpIn[i]);
        arrInps.push(inpNow);
        editNow = FLUIGC.richeditor(inpNow.id);
        this.arrEdits.push(editNow);
        this.arrEdits[i].setData(inpNow.value);
    }  
}
function initEditor(){ myEditor = new determineEditor(); }
window.addEventListener('load', initEditor)
*/
var myToast_ptd =  function (tp, title) {
    FLUIGC.toast({
        title: title,   //'Ação realizada com sucesso!',
        message: '',
        type: tp        //success, danger, info and warning.
        });
}

function info_setItns(){
    var WKNumProces = window.WKNumProces
    ct1DT           = DatasetFactory.createConstraint("txt_NumProcess", WKNumProces , WKNumProces,  ConstraintType.MUST);
    cnstDt          = new Array(ct1DT)
    dataDtIn        = DatasetFactory.getDataset('Cadastro de Reunião DIREX', null, cnstDt, null);
    var dt_slc      = dataDtIn.values[0]['dt_dataInicio']
    formatDte = dt_slc.split('-')[2]+'/'+dt_slc.split('-')[1]+'/'+dt_slc.split('-')[0]
    console.log(formatDte)
    c2 = DatasetFactory.createConstraint("dataSelected", formatDte , formatDte,  ConstraintType.MUST, true); 
    c3 = DatasetFactory.createConstraint("txt_resultAnalis", 2, 2,  ConstraintType.MUST);
    c4 = DatasetFactory.createConstraint("txt_resultAnalis", null, null,  ConstraintType.MUST_NOT);

    arrdir = ['DISUP', 'DIRAF', 'DITEC']
    for(i = 0; i < arrdir.length; i++){
        dirNow = arrdir[i]
        matDir = "%Pool:Role:"+dirNow+"%";
        c1 = DatasetFactory.createConstraint("hdn_dir_vinc", matDir, matDir,  ConstraintType.MUST, true); 
        cnst = new Array(c1, c2, c3, c4);
        itns = DatasetFactory.getDataset('Pauta DIREX', null, cnst, null).values;
        console.log(itns)
        //<a href="https://mywebhm.am.sebrae.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=26559" class="cad-link" target="_blank" style="color:blue" ml="true"><i class="flaticon flaticon-link icon-md"></i>26559</a>

        for(j = 0; j < itns.length; j++){
            NumSolict = itns[j]['txt_NumProcess']
            itnLink = 'https://mywebhm.am.sebrae.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+NumSolict
            console.log(itnLink)
            va = document.createElement('a')
            va.setAttribute('href', itnLink);
            va.setAttribute('class', 'cad-link');
            va.setAttribute('target', '_blank');
            va.setAttribute('style', 'color: blue');
            va.setAttribute('ml', 'true');
            va.textContent = NumSolict

            document.getElementById('itnsList_ptd_'+dirNow).appendChild(va)
        }    
    }
}
window.addEventListener('load', info_setItns)
function updatePDF_ptd(dirIndx){
    //document.scrollingElement.scrollTop = 0
    var state = window.parentOBJ.ECM.workflowView.sequence
    var iniTxt = document.getElementById('txt_IniDelibr').value;
    var finTxt = document.getElementById('txt_FinDelibr').value;
    //var dt_slc 	= document.getElementById('dt_dataInicio').value;

    console.log(dirIndx)
    if(dirIndx == undefined){ dirIndx = 0 }

    var WKNumProces = window.WKNumProces
    ct1DT           = DatasetFactory.createConstraint("txt_NumProcess", WKNumProces , WKNumProces,  ConstraintType.MUST);
    cnstDt          = new Array(ct1DT)
    dataDtIn        = DatasetFactory.getDataset('Cadastro de Reunião DIREX', null, cnstDt, null);
    var dt_slc      = dataDtIn.values[0]['dt_dataInicio']

    var objPdf = 0;

    var ds_mat_ger_pdf  = colleague;
    var ds_und_ger_pdf  = dsc_Unidades;
    var matDir          = dirIndx;
    var dirImed         = 0;
    var mat             = window.parent.WCMAPI.userCode;
    var arrItns_Dir 	= [];
    var stateParamIs    = 15;
    var und             = dirIndx;
    if(state == 8 || state == 10){
        console.log(state)
        
        formatDte = dt_slc.split('-')[2]+'/'+dt_slc.split('-')[1]+'/'+dt_slc.split('-')[0]
        console.log(formatDte)
        c2 = DatasetFactory.createConstraint("dataSelected", formatDte , formatDte,  ConstraintType.MUST, true); 
        c3 = DatasetFactory.createConstraint("txt_resultAnalis", 2, 2,  ConstraintType.MUST);
        c4 = DatasetFactory.createConstraint("txt_resultAnalis", null, null,  ConstraintType.MUST_NOT);

        if(state == 8 && matDir == 0){
            for(var i = 0;i<ds_mat_ger_pdf.values.length;i++){
                if(mat == ds_mat_ger_pdf.values[i]['colleaguePK.colleagueId']){
                    und = ds_mat_ger_pdf.values[i]['groupId'];
                    console.log(und)
                    for(var j=0;j<ds_und_ger_pdf.values.length;j++){
                        if(und == ds_und_ger_pdf.values[j]['AntigaSigla']){
                            console.log("%Pool:Role:"+ds_und_ger_pdf.values[j]['Sigla']+"%")
                            dirImed = ds_und_ger_pdf.values[j]['Sigla'];
                            if(ds_und_ger_pdf.values[j]['Sigla'] == 'NTIC'){
                                matDir = "%Pool:Role:DIRAF%";
                            }else{
                                matDir = "%Pool:Role:"+ds_und_ger_pdf.values[j]['Sigla']+"%";
                            }
                        }
                    }
                }
            }
            
           
            c1 = DatasetFactory.createConstraint("hdn_dir_vinc", matDir, matDir,  ConstraintType.MUST, true); 
            //c3 = DatasetFactory.createConstraint("hdn_aprvAssr", stateParamIs , stateParamIs,  ConstraintType.MUST, true); 
            cnst = new Array(c1, c2, c3, c4);
            itns = DatasetFactory.getDataset('Pauta DIREX', null, cnst, null).values;
            arrItns_Dir.push(itns)
        }
        else if(state == 8 && matDir != 0){
            matDir = "%Pool:Role:"+matDir+"%";
            c1 = DatasetFactory.createConstraint("hdn_dir_vinc", matDir, matDir,  ConstraintType.MUST, true); 
            cnst = new Array(c1, c2, c3, c4);
            itns = DatasetFactory.getDataset('Pauta DIREX', null, cnst, null).values;
            arrItns_Dir.push(itns)
        }
        console.log(arrItns_Dir)
        
        var dtPDF   = new Date();   
        diaPtd_dir = ''
        if(dtPDF.getDate() < 10){ diaPtd_dir = '0'+dtPDF.getDate() }
        else{ diaPtd_dir = dtPDF.getDate() }
        anoPtd_dir = dtPDF.getFullYear()

        MonthIn     = new Date().getMonth() 
        HoursIn     = new Date().getHours()
        MonthStr    = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'] 
        var ttlDir_ptd = ''
        if(und == 'DIRAF'){ ttlDir_ptd = 'DIRETORIA ADMINISTRATIVA FINANCEIRA' }
        else if(und == 'DITEC'){ ttlDir_ptd = 'DIRETORIA TECNICA' }
        else{ ttlDir_ptd = 'DIRETORIA SUPERINTENDENTE' }
        
        var objPdf  = '<div>' 
        objPdf      = objPdf + '<div>'+
            '<p align="center">'+
            '<span>'+
                    '<span >'+
                    '<b><span style="font-size:12.0pt">'+document.getElementById('txt_tituloReuniao').value +anoPtd_dir+'</span></b>'+ 
                    '</span>'+
                '</span>'+
            '</p>'+
            '<p align="center" style="border:none; margin-bottom:0cm; padding:0cm; ">'+
                '<span style="line-height:normal">'+
                    '<span style="tab-stops:center 233.85pt right 467.75pt">'+
                        '<span >'+
                            '<b><span style="font-size:12.0pt">'+ttlDir_ptd+'</span></b>'+
                        '</span>'+
                    '</span>'+
                '</span>'+
            '</p>'+
        '</div>'

        objPdf      = objPdf +'<p style="margin-left:0.6cm;"><b>Data: '+diaPtd_dir+' de '+MonthStr[MonthIn]+' de '+anoPtd_dir+'.</b>'+
        '<p style="margin-left:0.6cm;"><b>Hora: '+HoursIn+'h</b></p>'+
        '</p>'
                        
        for(i = 0; i < arrItns_Dir.length; i++){
            itnDirNow = arrItns_Dir[i];
            dirImed = 0;
            for(j = 0; j < itnDirNow.length; j++){
                numIten = j + 1
                dirImedVinc = itnDirNow[j]["hdn_dir_vinc"].split(':')[2]
                if(dirImed != dirImedVinc){
                    dirImed = dirImedVinc;
                    objPdf = objPdf + '<p style="margin-top:0.6cm; margin-bottom:0.6cm; text-align:center">'+
                    '<span style="line-height:normal">'+
                        '<span >'+
                            '<b><u><span style="font-size:100%">PAUTA '+dirImed+': </span></u></b>'+
                        '</span>'+
                    '</span>'+
                    '</p>'+'<br></br>'
                }

                var txtDlbr = itnDirNow[j]["txt_Deliberacao"];
                txtDlbr = txtDlbr.toLowerCase();
                var txtJstf = itnDirNow[j]["txt_Justificativa"];

                var resultadoDelbr = ''
                /*let result = txtDlbr.search("body");
                let result2 = txtDlbr.search("/body");
                fnl = result2 - 1
                inc = result + 5
                bd = txtDlbr.substring(inc, fnl)        // Obtem apenas o BODY do HTML salvo no input
                console.log(bd)
                */
                /*dlbr_now = '<div style="margin-left:0.6cm;"><b>'+ numIten + '.  </b>Deliberação acerca  '+txtDlbr+ '<br></br>'+
                '<div style="margin-left:0.6cm;">'+
                '<b><u><span style="font-size:12.0pt"><span style="font-family:&quot;Arial&quot;,sans-serif">Justificativa:</span></span></u></b>'+txtJstf+'<br></br>'+ //<div style="margin-left:0.6cm;">'
                '<span style="line-height:150%"><b><span style="font-size:12.0pt"><span style="line-height:150%"><span style="color:black">Deliberação:</span></span></span></b>'+
                */
                dlbr_now = '<div style="margin-left:0.6cm;"><b>'+ numIten + '.   </b>'+
                '<div style="margin-left:0.6cm;">'+
                txtDlbr+'<br></br>'+
                '<span style="line-height:150%"><b><span style="font-size:12.0pt"><span style="line-height:150%"><span style="color:black">Deliberação:</span></span></span></b>'+
                '<span style="font-size:12.0pt"><span style="line-height:150%"><span style="color:black"> <b>'+resultadoDelbr+'</b></span></span></span></span>'+
                '</div></div><br></br>';
                //dlbr_now = itnDirNow[j]["txt_Deliberacao"];
                objPdf = objPdf + dlbr_now;

                if(j == itnDirNow.length - 1){
                    objPdf = objPdf + '<p style="margin-left:0.6cm; font-size:11.0pt">'+
                    '<span style="line-height:normal">'+
                        '<span >'+
                            '<b><u><span>INFORMES '+dirImed+': </span></u></b>'+
                        '</span>'+
                    '</span>'+
                    '</p>' 

                    objPdf = objPdf + '<div style="margin-left:0.6cm;">'+ document.getElementById('txt_Info'+dirImed).value +'</div>';
                }
            }
        }

        objPdf = objPdf + '</div>'

        var win = window.open("#","_blank");
        elements =  win.document.write(objPdf)
        win.document.write( '<html>' );
        win.document.write(   '<head>');
        win.document.write(   '</head>');
        win.document.write(   '<body onload="window.print();">');
        win.document.write(   elements  );
        win.document.write(   '<script>'+
                        'setTimeout(() => {'+
                            'window.print();'+
                        '}, 1200);'+
                        '</script> ');
        win.document.write(   '</body>');
        win.document.write(  '</html>');

    }else{
        myToast_ptd('warning', 'Não a itens de Pauta para Gerar o Arquivo');
    } 
}
function getPDF_ptd () { 
    var ds_mat_ger_pdf  = colleague;
    var ds_und_ger_pdf  = dsc_Unidades;
    und = ''
    matDir = ''
    for(var i = 0; i <ds_mat_ger_pdf.values.length; i++){
        if(mat == ds_mat_ger_pdf.values[i]['colleaguePK.colleagueId']){
            und = ds_mat_ger_pdf.values[i]['groupId'];
            for(var j=0;j<ds_und_ger_pdf.values.length;j++){
                if(und == ds_und_ger_pdf.values[j]['AntigaSigla']){
                    dirImed = ds_und_ger_pdf.values[j]['Sigla'];
                    if(ds_und_ger_pdf.values[j]['Sigla'] == 'NTIC'){
                        matDir = "DIRAF";
                    }else{
                        matDir = ds_und_ger_pdf.values[j]['Sigla'];
                    }
                }
            }
        }
    }
    arrins = ['getData_ptd', 'getData_ptd_1', 'getData_ptd_2']
    arrInpsAcess = ['switch_DISUP', 'switch_DIRAF', 'switch_DITEC']
    arrdir = ['DISUP', 'DIRAF', 'DITEC']
    for(i = 0; i < arrins.length; i++){
        dirIn = arrdir[i];
        btnDirItnsNow =  document.getElementById(arrins[i])
        btnDirItnsNow.value = dirIn
        if(arrdir[i] != matDir){ 
            console.log(arrins[i]+'_all')
            document.getElementById(arrins[i]+'_all').style.display = 'none';
            document.getElementById(arrInpsAcess[i]+'_all').style.display = 'none'; 
        }
        btnDirItnsNow.addEventListener('click', function () { updatePDF_ptd(this.value) } ) 
    }

    
    for(j = 0; j < arrInpsAcess.length; j++){
        inpAcessNow = document.getElementById(arrInpsAcess[j])
        if(inpAcessNow.checked == true){
            document.getElementById(arrins[j]+'_all').style.display = 'block'; 
        }
    }
}
window.addEventListener('load', getPDF_ptd)