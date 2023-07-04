function determineEditor(){
    this.buttonReference = 'getData';
    this.inpIn = ['txt_IniDelibr', 'txt_FinDelibr', 'txt_Deliberacao'];
    this.arrEdits = [];
    this.setRichEditor();
    this.setFuncbutton();
}
determineEditor.prototype.disabledEditor = function (inp) {
    var thisInput   = document.getElementById(inp.id);
    objCheck        = thisInput.parentElement.getElementsByClassName('in');
    if(objCheck.length == 0){
        var divDisabled = document.createElement('div');
        divDisabled.setAttribute('class', "fluig-style-guide modal-backdrop  in");
        divDisabled.setAttribute('style', "height: 375px; top: 26px; left: 15px; width: 1090px; background-color: rgba( 0, 0, 0, .1);display: block;");
        divDisabled.setAttribute('id', "shadow");
        divDisabled.setAttribute('tabindex', "-1");
        thisInput.parentElement.getElementsByTagName('iframe')[0].tabIndex = -1;
        divEditor   = document.getElementById(inp.id).parentElement.children[2];
        divIn       = divEditor.children[1];
        divIn.append(divDisabled);
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
    document.getElementById(this.buttonReference).addEventListener('click', function () { myEditor.setDataInputsParams(); }) 
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
    var iniTxt = document.getElementById('txt_IniDelibr').value
    var finTxt = document.getElementById('txt_FinDelibr').value 
    var tblIn = 0;

    var tblIn = '<div style="border:solid windowtext 1.0pt; padding:7.0pt 4.0pt 1.0pt 4.0pt; margin-left:0cm; margin-right:-8.85pt">'+
        '<p align="center" style="border:none; border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-bottom:1.0pt"><span style="line-height:normal"><span style="text-autospace:none"><b><span style="font-size:12.0pt">20ª REUNI&Atilde;O ORDIN&Aacute;RIA DIREX/AM 2023</span></b></span></span></p>'+
        '<p align="center" style="border:none; border-bottom:.5pt solid windowtext; margin-bottom:0cm; text-align:center; padding:0cm; padding-top:1.0pt; padding-bottom:1.0pt"><span style="line-height:normal"><span style="text-autospace:none"><b><span style="font-size:12.0pt">Manaus, 15 de maio de 2023</span></b></span></span></p>'+
        '<p style="border:none; margin-bottom:0cm; padding:0cm; padding-top:1.0pt"><span style="line-height:normal"><span style="tab-stops:center 233.85pt right 467.75pt"><span style="text-autospace:none"><b><span style="font-size:12.0pt">                                                              DELIBERAÇÕES</span></b></span></span></span></p>'+
    '</div>'

    var tblIn = tblIn + iniTxt;
    tblIn = tblIn + finTxt;
    
    var opt = {
        filename: 'myfile.pdf',
        margin: 5,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
                    scale: 2,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(tblIn).save(); 
}
function getPDF () { document.getElementById('getData').addEventListener('click', function () { updatePDF() } ) }
window.addEventListener('load', getPDF)