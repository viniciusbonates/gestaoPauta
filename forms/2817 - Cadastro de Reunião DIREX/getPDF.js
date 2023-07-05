function determineEditor(){
    arrElemtsTrigger = [];
    getData = document.getElementById('getData');
    btn1 = document.getElementById('btn1').getElementsByTagName('button')[0];
    arrElemtsTrigger.push(getData);
    arrElemtsTrigger.push(btn1);
    this.buttonReference = arrElemtsTrigger;
    this.inpIn = ['txt_IniDelibr', 'txt_FinDelibr', 'txt_Deliberacao', 'txt_Justificativa'];
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


function updatePDF(){
    document.scrollingElement.scrollTop = 0
    var iniTxt = document.getElementById('txt_IniDelibr').value;
    var finTxt = document.getElementById('txt_FinDelibr').value;
    var objPdf = 0;

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

    console.log(arrItns_Dir)

    var dt_slc 	= document.getElementById('dt_dataInicio').value;
    let dtPDF   = dt_slc;
    dtPDF = dtPDF.split('-');
    MonthIn     = new Date().getMonth() 
    MonthStr    = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'] 
        

    var objPdf = '<div style="border:solid windowtext 1.0pt;  margin-left:0px;" >'+
        '<p align="center" style="border:none; border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-bottom:1.0pt">'+
        '<span style="">'+
                '<span style="text-autospace:none">'+
                '<b><span style="font-size:12.0pt">20ª REUNI&Atilde;O ORDIN&Aacute;RIA DIREX/AM '+dtPDF[0]+'</span></b>'+
                '</span>'+
            '</span>'+
        '</p>'+
        '<p align="center" style="border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-top:1.0pt; padding-bottom:1.0pt">'+
            '<span style="line-height:normal">'+
                '<span style="text-autospace:none">'+
                    '<b><span style="font-size:12.0pt">Manaus, '+dtPDF[2]+' de '+MonthStr[MonthIn]+' de '+dtPDF[0]+'</span></b>'+
                '</span>'+
            '</span>'+
        '</p>'+
        '<p align="center" style="border:none; margin-bottom:0cm; padding:0cm; ">'+
            '<span style="line-height:normal">'+
                '<span style="tab-stops:center 233.85pt right 467.75pt">'+
                    '<span style="text-autospace:none">'+
                        '<b><span style="font-size:12.0pt">DELIBERA&Ccedil;&Otilde;ES</span></b>'+
                    '</span>'+
                '</span>'+
            '</span>'+
        '</p>'+
    '</div>'

    var objPdf = objPdf + iniTxt;
    objPdf = objPdf + '<p align="center" style="margin-top:0cm; margin-right:-8.85pt; margin-bottom:0cm; margin-left:0cm; text-align:center">'+
                '<span style="line-height:normal">'+
                    '<span style="text-autospace:none">'+
                        '<b><u><span style="font-size:12.0pt">PROPOSI&Ccedil;&Otilde;ES:</span></u></b>'+
                    '</span></span></p>' 
                    
    for(i = 0; i < arrItns_Dir.length; i++){
        itnDirNow = arrItns_Dir[i];
        dirImed = 0;
        for(j = 0; j < itnDirNow.length; j++){
            dirImedVinc = itnDirNow[j]["hdn_dir_vinc"].split(':')[2]
            if(dirImed != dirImedVinc){
                dirImed = dirImedVinc;
                objPdf = objPdf + '<p style="margin-top:0cm; margin-right:-8.85pt; margin-bottom:0cm; margin-left:0cm; text-align:justify">'+
                '<span style="line-height:normal">'+
                    '<span style="text-autospace:none">'+
                        '<b><u><span style="font-size:12.0pt">PAUTA '+dirImed+': </span></u></b>'+
                    '</span>'+
                '</span>'+
                '</p>'
            }
            dlbr_now = itnDirNow[j]["txt_Deliberacao"];
            objPdf = objPdf + dlbr_now;
        }
    }


    objPdf = objPdf + finTxt;
    objPdf = objPdf + '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:10%"><b><span style="font-size:12.0pt">Ananda Carvalho Normando Pess&ocirc;a</span></b></span></p>'+
    '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:normal"><span style="tab-stops:center 0.0pt 0.0pt"><span style="font-size:12.0pt">Diretora Superintendente</span></span></span></p>'+
    '<p style="text-align:justify;line-height:normal"><span style="line-height:normal"><span style="font-size:12.0pt"><span style="line-height:normal"></span></span></span></p>'+
    '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:10%"><span style="tab-stops:center 108.0pt 360.0pt"><b><span style="font-size:12.0pt">   Lamisse Said da Silva Cavalcanti            Adrianne Antony Gon&ccedil;alves</span></b></span></span></p>'+
    '<p align="center" style="margin-bottom:0cm; text-align:center"><span style="line-height:normal"><span style="tab-stops:center 108.0pt 360.0pt"><span style="font-size:12.0pt">                    Diretora T&eacute;cnica                        Diretora Administrativa Financeira</span></span></span></p>'
    
    var opt = {
        filename: 'myfile.pdf',
        margin: 5,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
                    scale: 5,
                    width: 800
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', precision: 50 }
    };

    html2pdf().set(opt).from(objPdf).save(); 
}
function getPDF () { document.getElementById('getData').addEventListener('click', function () { updatePDF() } ) }
window.addEventListener('load', getPDF)