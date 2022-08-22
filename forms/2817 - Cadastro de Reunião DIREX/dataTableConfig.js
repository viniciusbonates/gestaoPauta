function dataTableConfig(){
    /*** Configure Input Object Options ***/
        this.configField = {                                                                      // Caso configField não seja configurado. As opçãoes Default serão apresentadas.
            inputId:          'dataSelected',                                                     // Nome do campo que será utilizado para receber o valor selecionado na dataTable.
            validationStyle:  'has-warning has-feedback',                                         // Estilo de apresentação do campo. Style-guide: 'has-success has-feedback', 'has-error has-feedback'.
            col:              'col-md-2',                                                         // Configuração de GRID style-guide. 
            colInnerDistri:   'pull-left',                                                       // Determina a posição do campo dentro da COL. Default: 'pull-right'.
            setLabel: {                                                                           // Caso não configurado não será apresentado.
                enabled:      false,                                                              // Default: false. true: Apresnta Label | false: Não apresenta.
                value:        'dataSelected',
                innerText:    'Input with success'
            },                                                                              
            setIcone: {                                                                           // Caso não configurado será apresentado o valor padrão: true, 'flaticon flaticon-check-circle icon-sm form-control-feedback'.
                enabled:      true,                                                               // Default: true. true: Apresnta Icone | false: Não apresenta. 
                value:        'flaticon flaticon-alert icon-sm form-control-feedback'             // Caso não configurado será apresentado o valor padrão 'flaticon flaticon-check-circle icon-sm form-control-feedback'.
            },
            setHelpBlock: {                                                                       // Caso não configurado será apresentado o valor padrão: true, 'Valor Selecionado.'.
                enabled:      true,                                                               // Default: true. true: Apresnta HelpBlock | false: Não apresenta. 
                innerText:    'Selecione um Item.'                                               // Determina o texto de Auxilio. Default 'Valor Selecionado.'.
            }
        }
    /*** End Input Object Configuration ***/

    this.initMyInterval     = true;
    this.setChangeEvent		= true;
    this.tableReference     = window.testDatatable
    this.setConfigExecution();  
}
dataTableConfig.prototype.initialize = function () {
    this.orderLineSuper(this.configField);
    changeEvent = this.setChangeEvent;
    if(changeEvent){
        this.changeEventInput();
        this.changeEventTable();
    }
}
dataTableConfig.prototype.setConfigExecution = function () {
    var order = this.initialize()
    this.initMyInterval = setInterval(order, 2000) 
}
dataTableConfig.prototype.constructInputValueSelected = function (configField){
    var config = {}
        config = this.determineObjConfig(configField, config);
    var dataSelected = document.getElementById(config.inputId);
    var objDivCol = document.createElement('div');
        objDivCol.setAttribute('class', config.col);
    var objDivInnerCol = document.createElement('div');
        objDivInnerCol.setAttribute('class', config.colInnerDistri);
    var objDivClassValidate = document.createElement('div');
        objDivClassValidate.setAttribute('class', config.validationStyle);
    var objLabel = document.createElement('label');
        objLabel.setAttribute('class', config.setLabel.enabled ? 'control-label' : 'control-label sr-only');
        objLabel.setAttribute('for', config.inputId);
        objLabel.innerText = config.setLabel.innerText;
    var objIconeV = document.createElement('i');
        objIconeV.setAttribute('class', config.setLabel.enabled ? config.setIcone.value : config.setIcone.value);  /**  <-------------------------Verificar a Necessidade */
        objIconeV.setAttribute('aria-hidden', 'true'); 
    var objP_helpBlok = document.createElement('p');
        objP_helpBlok.setAttribute('class', 'help-block');
        objP_helpBlok.innerText = config.setHelpBlock.innerText;
    //Montagem da estrutura do Campo.
    objDivClassValidate.appendChild(objLabel);
    objDivClassValidate.appendChild(dataSelected);
    objDivClassValidate.appendChild(objIconeV);
    objDivClassValidate.appendChild(objP_helpBlok);
    objDivInnerCol.appendChild(objDivClassValidate);
    objDivCol.appendChild(objDivInnerCol);

    return objDivCol;
}
dataTableConfig.prototype.determineObjConfig = function (configField, config){
    var configDefaut = {
        inputId: 'dataSelected',
        validationStyle: 'has-success has-feedback',
        col: 'col-md-2',
        colInnerDistri: 'pull-right',
        setLabel: {
            enabled: false,
            value: 'dataSelected',
            innerText: 'Input with success'
        },
        setIcone: {
            enabled: true,
            value: 'flaticon flaticon-check-circle icon-sm form-control-feedback'
        },
        setHelpBlock: {
            enabled: true,
            innerText: 'Valor Selecionado.'
        }
    }
    if(typeof configField != 'object' || configField == null || configField == undefined){
        return config = configDefaut
    }else if(typeof configField == 'object'){
        let propObj  = ['inputId', 'validationStyle', 'col', 'colInnerDistri', 'setLabel', 'setIcone', 'setHelpBlock']
        let subPropObj  = ['enabled', 'value', 'col', 'innerText']
        let arrRequire = ['inputId', 'validationStyle', 'col']
        for(i = 0; i < propObj.length; i++){
            let prop = propObj[i]
            // Require
            for(j = 0; j < arrRequire.length; j++){
                if(arrRequire[j] == prop){
                    let valueProp = configField[prop]
                    if(valueProp != null || valueProp != undefined ||  valueProp != ''){
                        config[prop] = valueProp
                    }else{
                        console.log('Propriedade(s) '+ prop +' do Object configField obrigatório não informado')
                        return 
                    }
                }
            }
             //define prop
             if(configField[prop] == null || configField[prop] == undefined || configField[prop] == ''){
                config[prop] = configDefaut[prop]   
            }else{
                config[prop] = configField[prop]
            }
        }
        return config
    }
}      
dataTableConfig.prototype.orderLineSuper = function (objConfig) {
    var divIn = document.getElementsByClassName('row fs-no-margin')
    var divAll = divIn[0].parentElement.parentElement
    var inpasd = this.constructInputValueSelected(objConfig) /**  <-------------------------this.configField in  dataTableConfig*/
    if(divAll.id == 'target'){
        let tempr = divIn[0].children[0]
        tempr.className = 'col-md-5'
        tempr.children[0].className = ''
        divIn[0].removeChild(divIn[0].children[0])
        divIn[0].appendChild(inpasd)
        divIn[0].appendChild(tempr)

        clearInterval(this.initMyInterval) /**  <-------------------------this.myInterval in  dataTableConfig*/
    }
}
dataTableConfig.prototype.changeEventInput = function () {
    objFunc = {
        fnc: ['formatDinamic'],
        formatDinamic: function () {
            var configFormat = {
                inputId: 'dataSelected',
                validationStyle: 'has-success has-feedback',
                col: 'col-md-2',
                colInnerDistri: 'pull-left',
                setLabel: {
                    enabled: false,
                    value: 'dataSelected',
                    innerText: 'Input with success'
                },
                setIcone: {
                    enabled: true,
                    value: 'flaticon flaticon-check-circle icon-sm form-control-feedback'
                },
                setHelpBlock: {
                    enabled: true,
                    innerText: 'Item Selecionado.'
                }
            }
            if(configFormat != undefined){
                var divCol      = document.getElementById(configFormat.inputId).parentElement.parentElement.parentElement
                var divInCol    = document.getElementById(configFormat.inputId).parentElement.parentElement
                var divFeedBack = document.getElementById(configFormat.inputId).parentElement
                var labelInp    = divFeedBack.children[0]
                var iconInp     = divFeedBack.children[2]
                var pInp        = divFeedBack.children[3]
        
                divCol.className        = configFormat.col
                divInCol.className      = configFormat.colInnerDistri
                divFeedBack.className   = configFormat.validationStyle
                labelInp.value          = configFormat.setLabel.value
                labelInp.innerText      = configFormat.setLabel.innerText
                iconInp.className       = configFormat.setIcone.value
                pInp.innerText          = configFormat.setHelpBlock.innerText
            }
        }
    }
    this.tableReference.onselectrow(this.tableReference.myTable, objFunc);
}

                                   /****** Metodos com Necessidade de Tratamento******** */

dataTableConfig.prototype.changeEventTable = function () {
    objFunc = {
        fnc: [
                {'fncName': 'openItem', 'metodhParam': 'reload'}
        ],
        openItem: function () {
            var secInterval = setInterval(push, 20)
            function push(){    
                var url = "http://10.4.4.52:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
                var arrColumnsRender = ['N° Solicitação', 'Data Solicitação', 'Nome Solicitante', 'Unidade', 'Assunto', 'Justificativa']
                var indexLink = []
                var divIn = document.getElementsByClassName('row fs-no-margin')
                var divAll = divIn[0].parentElement.parentElement       //DIV com o componente dataTable
                var tableBody   = divAll.getElementsByTagName('tbody')[0]    
                var nomeCol     = divAll.getElementsByTagName('thead')[0].rows[0].cells
                var rows = tableBody.rows   //Linhas da pagina atual da dataTable
                var textLink = 0        
                console.log(rows)                   
                for(i = 0; i < rows.length; i++){
                    let row = rows[i]
                    let cells = row.cells
                    //indexLink[i] = cells[0]
                    console.log(cells)
                    console.log(cells[0])
                    if(cells[0].innerText != '' && cells[0].ml == undefined){
                        textLink = cells[0].innerText
                        let inHTML = "<a href=\""+ url + textLink +"\""+ "class=\"cad-link\""+"target=\"_blank\""+"style=\"color:blue\" ml=\"true\">"+"<i class=\"flaticon flaticon-link icon-md\"></i>"+
                        textLink+"</a>"
                        cells[0].innerHTML = inHTML
                        console.log(inHTML)
                    }
                }
                clearInterval(secInterval)
            }
        }
    }
    this.tableReference.setFunc(objFunc);
}
/*
function openItem(){
    //http://10.4.4.52:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=24719
    var url = "http://10.4.4.52:8080/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
    var arrColumnsRender = ['N° Solicitação', 'Data Solicitação', 'Nome Solicitante', 'Unidade', 'Assunto', 'Justificativa']
    var indexLink = []
    var divIn = document.getElementsByClassName('row fs-no-margin')
    var divAll = divIn[0].parentElement.parentElement       //DIV com o componente dataTable
    var tableBody   = divAll.getElementsByTagName('tbody')[0]    
    var nomeCol     = divAll.getElementsByTagName('thead')[0].rows[0].cells
    var rows = tableBody.rows   //Linhas da pagina atual da dataTable
    var textLink = 0                           
    for(i = 0; i < rows.length; i++){
        let row = rows[i]
        let cells = row.cells
        indexLink[i] = cells[0]
        if(cells[0].innerText != ''){
            textLink = cells[0].innerText
            let inHTML = "<a href=\""+ url + textLink +"\""+ "class=\"cad-link\""+"target=\"_blank\""+"style=\"color:blue\">"+"<i class=\"flaticon flaticon-link icon-md\"></i>"+
            textLink+"</a>"
            cells[0].innerHTML = inHTML
            
        }
    }


    var aV = document.createElement('a');
        aV.setAttribute('href', url + textLink);
        aV.setAttribute('class', 'cad-link');
        aV.setAttribute('target', '_blank');
        aV.setAttribute('style', 'color:blue');
    var iV = document.createElement('i');
        iV.setAttribute('class', 'flaticon flaticon-link icon-md');

        aV.appendChild(iV)
    
}
window.addEventListener('load', openItem)
*/
function dataTableinit() { dataTablemi = new dataTableConfig(); }
window.addEventListener('load', dataTableinit)


