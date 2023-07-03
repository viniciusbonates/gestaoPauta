function determineEditor(){
    this.inpIn = document.getElementById('txt_IniDelibr');
    this.edit = FLUIGC.richeditor('txt_IniDelibr');
    this.edit.setData(this.inpIn.value);
    this.setFuncbutton();
}
determineEditor.prototype.setDataInput = function () {
    this.inpIn.value = this.edit.getData();
}
determineEditor.prototype.setFuncbutton = function () {
    document.getElementById('getData').addEventListener('click', function () { myEditor.setDataInput(); }) 
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