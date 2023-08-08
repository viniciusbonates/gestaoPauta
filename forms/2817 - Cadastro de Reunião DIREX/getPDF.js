function determineEditor(){
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

var myToast =  function (tp, title) {
    FLUIGC.toast({
        title: title,   //'Ação realizada com sucesso!',
        message: '',
        type: tp        //success, danger, info and warning.
        });
}

function updatePDF(){
    document.scrollingElement.scrollTop = 0
    var state = window.parentOBJ.ECM.workflowView.sequence
    var iniTxt = document.getElementById('txt_IniDelibr').value;
    var finTxt = document.getElementById('txt_FinDelibr').value;
    var dt_slc 	= document.getElementById('dt_dataInicio').value;
    var objPdf = 0;

    var ds_mat_ger_pdf  = colleague
    var ds_und_ger_pdf  = dsc_Unidades
    var matDir          = 0
    var dirImed         = 0;
    var mat             = window.parent.params.taskUserId;
    var arrItns_Dir 	= []
    if(state == 8 || state == 10){
        console.log(state)
        if(state == 8){
            for(var i = 0;i<ds_mat_ger_pdf.values.length;i++){
                if(mat == ds_mat_ger_pdf.values[i]['colleaguePK.colleagueId']){
                    var und = ds_mat_ger_pdf.values[i]['groupId'];
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
            formatDte = dt_slc.split('-')[2]+'/'+dt_slc.split('-')[1]+'/'+dt_slc.split('-')[0]
            console.log(formatDte)
            c1 = DatasetFactory.createConstraint("hdn_dir_vinc", matDir , matDir,  ConstraintType.MUST, true); 
            c2 = DatasetFactory.createConstraint("dataSelected", formatDte , formatDte,  ConstraintType.MUST, true); 
            c3 = DatasetFactory.createConstraint("hdn_aprvAssr", 26 , 26,  ConstraintType.MUST, true); 
            
            cnst = new Array(c1, c2, c3);
            itns = DatasetFactory.getDataset('Pauta DIREX', null, cnst, null).values;
            arrItns_Dir.push(itns)
        }else{
            c1 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DISUP%" , "%Pool:Role:DISUP%",  ConstraintType.MUST, true); 
            c2 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DITEC%" , "%Pool:Role:DITEC%",  ConstraintType.MUST, true); 
            c3 = DatasetFactory.createConstraint("hdn_dir_vinc", "%Pool:Role:DIRAF%" , "%Pool:Role:DIRAF%",  ConstraintType.MUST, true); 

            formatDte = dt_slc.split('-')[2]+'/'+dt_slc.split('-')[1]+'/'+dt_slc.split('-')[0]
            c4 = DatasetFactory.createConstraint("dataSelected", formatDte , formatDte,  ConstraintType.MUST, true);
            cStts = DatasetFactory.createConstraint("hdn_aprvAssr", 26 , 26,  ConstraintType.MUST, true); 

            cnst1 = new Array(c1, cStts, c4)
            cnst2 = new Array(c2, cStts, c4)
            cnst3 = new Array(c3, cStts, c4)
            itnsDISUP = DatasetFactory.getDataset('Pauta DIREX', null, cnst1, null).values;
            itnsDITEC = DatasetFactory.getDataset('Pauta DIREX', null, cnst2, null).values;
            itnsDIRAF = DatasetFactory.getDataset('Pauta DIREX', null, cnst3, null).values;
            if(itnsDISUP.length != 0){ arrItns_Dir.push(itnsDISUP) }
            if(itnsDITEC.length != 0){ arrItns_Dir.push(itnsDITEC) }
            if(itnsDIRAF.length != 0){ arrItns_Dir.push(itnsDIRAF) }
        }

        console.log(arrItns_Dir)

        
        let dtPDF   = dt_slc;
        dtPDF = dtPDF.split('-');
        MonthIn     = new Date().getMonth() 
        MonthStr    = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'] 
            
        var objPdf  = '<div style="border: 3px solid black; padding: 20px;">' 
        objPdf      = objPdf + '<div style="border:solid windowtext 1.0pt;  margin-left:0px;" >'+
            '<p align="center" style="border:none; border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-bottom:1.0pt">'+
            '<span style="">'+
                    '<span >'+//style="text-autospace:none"
                    '<b><span style="font-size:12.0pt">'+document.getElementById('txt_tituloReuniao').value + dtPDF[0]+'</span></b>'+ //20ª REUNI&Atilde;O ORDIN&Aacute;RIA DIREX/AM '
                    '</span>'+
                '</span>'+
            '</p>'+
            '<p align="center" style="border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-top:1.0pt; padding-bottom:1.0pt">'+
                '<span style="line-height:normal">'+
                    '<span >'+//style="text-autospace:none"
                        '<b><span style="font-size:12.0pt">Manaus, '+dtPDF[2]+' de '+MonthStr[MonthIn]+' de '+dtPDF[0]+'</span></b>'+
                    '</span>'+
                '</span>'+
            '</p>'+
            '<p align="center" style="border:none; margin-bottom:0cm; padding:0cm; ">'+
                '<span style="line-height:normal">'+
                    '<span style="tab-stops:center 233.85pt right 467.75pt">'+
                        '<span >'+//style="text-autospace:none"
                            '<b><span style="font-size:12.0pt">DELIBERA&Ccedil;&Otilde;ES</span></b>'+
                        '</span>'+
                    '</span>'+
                '</span>'+
            '</p>'+
        '</div>'

        var objPdf = objPdf + iniTxt;
        objPdf = objPdf + '<p align="center" style="margin-top:0cm; margin-bottom:0cm; margin-left:0cm; text-align:center">'+
                    '<span style="line-height:normal">'+
                        '<span >'+//style="text-autospace:none"
                            '<b><u><span style="font-size:12.0pt">PROPOSI&Ccedil;&Otilde;ES:</span></u></b>'+
                        '</span></span></p>' 
                        
        for(i = 0; i < arrItns_Dir.length; i++){
            itnDirNow = arrItns_Dir[i];
            dirImed = 0;
            for(j = 0; j < itnDirNow.length; j++){
                numIten = j + 1
                dirImedVinc = itnDirNow[j]["hdn_dir_vinc"].split(':')[2]
                if(dirImed != dirImedVinc){
                    dirImed = dirImedVinc;
                    objPdf = objPdf + '<p style="margin-top:0.6cm; margin-bottom:0.6cm; text-align:justify">'+
                    '<span style="line-height:normal">'+
                        '<span >'+//style="text-autospace:none"
                            '<b><u><span style="font-size:100%">PAUTA '+dirImed+': </span></u></b>'+
                        '</span>'+
                    '</span>'+
                    '</p>'
                }
                ///dlbr_now = '<div style="margin-left:0.6cm;">'+itnDirNow[j]["txt_Deliberacao"]+'</div>';
                var txtDlbr = itnDirNow[j]["txt_Deliberacao"];
                var txtJstf = itnDirNow[j]["txt_Justificativa"];

                var resultadoDelbr = ''
                var DIRAF = itnDirNow[j]["hdn_DIRAF_vt"];
                var DISUP = itnDirNow[j]["hdn_DISUP_vt"];
                var DITEC = itnDirNow[j]["hdn_DITEC_vt"];
                arrVts = [DIRAF, DISUP, DITEC]
                vt1 = 0;
                vt2 = 0;
                if(DIRAF == 1 && DISUP == 1 && DITEC == 1){ resultadoDelbr = 'Aprovado por unanimidade.' }
                else{
                    for(t = 0; t < arrVts.length; t++){
                        ckVt = arrVts[t]
                        if(ckVt == 1){
                            vt1++
                        }else{vt2++ }
                    }
                    if(vt1 > vt2){ resultadoDelbr = 'Aprovado.' }
                    else{ resultadoDelbr = 'Reprovado.' }
                }
              
              
                
                let result = txtDlbr.search("body");
                let result2 = txtDlbr.search("/body");
                fnl = result2 - 1
                inc = result + 5
                bd = txtDlbr.substring(inc, fnl)        // Obtem apenas o BODY do HTML salvo no input
                console.log(bd)
                dlbr_now = '<div style="margin-left:0.6cm;"><b>'+ numIten + '.  </b>'+bd+ '<br></br>'+
                '<b><u><span style="font-size:12.0pt"><span style="font-family:&quot;Arial&quot;,sans-serif">Justificativa:</span></span></u></b>'+txtJstf+'<br></br>'+ //<div style="margin-left:0.6cm;">'
                '<span style="line-height:150%"><b><span style="font-size:12.0pt"><span style="line-height:150%"><span style="color:black">Deliberação:</span></span></span></b>'+
                '<span style="font-size:12.0pt"><span style="line-height:150%"><span style="color:black"> <b>'+resultadoDelbr+'</b></span></span></span></span>'+'</div><br></br>';
                //dlbr_now = itnDirNow[j]["txt_Deliberacao"];
                objPdf = objPdf + dlbr_now;

                if(j == itnDirNow.length - 1){
                    objPdf = objPdf + '<p style="margin-top:0.6cm; margin-bottom:0.6cm; text-align:justify">'+
                    '<span style="line-height:normal">'+
                        '<span >'+
                            '<b><u><span style="font-size:100%">INFORMES '+dirImed+': </span></u></b>'+
                        '</span>'+
                    '</span>'+
                    '</p>' 

                    objPdf = objPdf + '<div style="margin-left:0.6cm;">'+ document.getElementById('txt_Info'+dirImed).value +'</div>';
                }
            }
        }


        objPdf = objPdf + '<p style="margin-top:0.6cm; margin-bottom:1cm; text-align:justify">'+finTxt+'</p>';
        objPdf = objPdf + '<br></br><br></br>'
        objPdf = objPdf + '<p align="center" style="text-align:center"><span style="line-height:10%"><b><span style="font-size:12.0pt">Ananda Carvalho Normando Pess&ocirc;a</span></b></span></p>'+
        '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:normal"><span style="tab-stops:center 0.0pt 0.0pt"><span style="font-size:12.0pt">Diretora Superintendente</span></span></span></p><br></br>'+
        '<p style="text-align:justify;line-height:normal"><span style="line-height:normal"><span style="font-size:12.0pt"><span style="line-height:normal"></span></span></span></p>'+
        '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:10%"><span style="tab-stops:center 108.0pt 360.0pt"><b><span style="font-size:12.0pt">   Lamisse Said da Silva Cavalcanti            Adrianne Antony Gon&ccedil;alves</span></b></span></span></p>'+
        '<p align="center" style="text-align:center"><span style="line-height:normal"><span style="tab-stops:center 108.0pt 360.0pt"><span style="font-size:12.0pt">                    Diretora T&eacute;cnica                        Diretora Administrativa Financeira</span></span></span></p>'
        
        objPdf = objPdf + '</div>'

        var win = window.open("#","_blank");
        elements =  win.document.write(objPdf)
        win.document.write( '<html>' );
        
                  win.document.write(   '<head>');
        
                  //win.document.write(      '<link rel="stylesheet" href="styles.css"' );
        
                  //win.document.write(      '<link rel="shortcut icon" href="./assets/images/suframa.ico">' );
        
                  //win.document.write(      '<link rel="stylesheet" href="assets/styles/main.css">' );
        
                  win.document.write(   '</head>');
        
                  //win.document.write(   '<title> RELATORIO: '+ this._tituloPPB+'</title>');
        
                  win.document.write(   '<body onload="window.print();">');
        
                  win.document.write(   elements  );
        
                  win.document.write(   '<script>'+
                                    'setTimeout(() => {'+
                                        'window.print();'+
                                    '}, 1200);'+
                                    '</script> ');
                  
        
                  win.document.write(   '</body>');
        
                  win.document.write(  '</html>');


        /*var opt = {
            filename: 'myfile.pdf',
            pagebreak: { mode: 'avoid-all' },
            margin: 7,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                        scale: 5,
                        width: 797
            },
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait', precision: 1 }
        };

        html2pdf().set(opt).from(objPdf).save();
    */

    }else{
        myToast('warning', 'Não a itens de Pauta para Gerar o Arquivo');
    } 
}
function getPDF () { document.getElementById('getData').addEventListener('click', function () { updatePDF() } ) }
window.addEventListener('load', getPDF)