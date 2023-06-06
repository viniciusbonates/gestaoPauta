itensTools = {
    myModal: function () {
        FLUIGC.modal({
            title: 'Atenção',
            content: 'Se o boleto vence em 1 ou 2 dias é necessário <strong>comunicar a Unidade de Contabilidade, Orçamento e Finanças - UCOF</strong> <strong style="color: red">imediatamente !</strong>',
            id: 'fluig-modal',
            size: 'large ',
            actions: [{
                    'label': 'Cancelar',
                    'autoClose': true
                },{
                    'bind': 'data-run-my-method',
                    'label': 'Confirmar',
                    'autoClose': true
                }]
            }, function(err, data) {
                if(err) {
            // do error handling
                } else {
                    console.log(data)
                }
            });
            $(document).on('click', '[data-run-my-method]', function(ev) {
            //    alert("Started from Message Page");
                    console.log(window)
            });
    },
    myToast: function (tp, title) {
        FLUIGC.toast({
            title: title,   //'Ação realizada com sucesso!',
            message: '',
            type: tp        //success, danger, info and warning.
            });
    }
}
function dataTableConfig(){
    /*** Configure Input Object Options ***/
    this.configField = {                                                                            // Caso configField não seja configurado. As opçãoes Default serão apresentadas.
            inputId:          'dataSelected',                                                       // Nome do campo que será utilizado para receber o valor selecionado na dataTable.
            validationStyle:  'has-warning has-feedback',                                           // Estilo de apresentação do campo. Style-guide: 'has-success has-feedback', 'has-error has-feedback'.
            col:              'col-md-1',                                                           // Configuração de GRID style-guide. 
            colInnerDistri:   'pull-left',                                                          // Determina a posição do campo dentro da COL. Default: 'pull-right'.
            setLabel: {                                                                             // Caso não configurado não será apresentado.
                enabled:      false,                                                                // Default: false. true: Apresnta Label | false: Não apresenta.
                value:        'dataSelected',
                innerText:    'Input with success'
            },                                                                              
            setIcone: {                                                                             // Caso não configurado será apresentado o valor padrão: true, 'flaticon flaticon-check-circle icon-sm form-control-feedback'.
                enabled:      true,                                                                 // Default: true. true: Apresnta Icone | false: Não apresenta. 
                value:        'flaticon flaticon-alert icon-sm form-control-feedback'               // Caso não configurado será apresentado o valor padrão 'flaticon flaticon-check-circle icon-sm form-control-feedback'.
            },
            setHelpBlock: {                                                                         // Caso não configurado será apresentado o valor padrão: true, 'Valor Selecionado.'.
                enabled:      true,                                                                 // Default: true. true: Apresnta HelpBlock | false: Não apresenta. 
                innerText:    'Selecione um Item.'                                                  // Determina o texto de Auxilio. Default 'Valor Selecionado.'.
            }
        }
    /*** End Input Object Configuration ***/

    var configButton = {
        type: 'button',
        id: 'btn1',
        innerText: 'Enviar Deliberação',
        setIcon: 'flaticon flaticon-document-check icon-sm', 
        col: 'col-md-2'
    }
     /**
     *  targetState:    11  = Analise Assr
     *                  9   = Ajuste
     *                  15  = Incluir
     *                  16  = Excluir
    */
    var configDropdowns = {
        type: 'dropdown',
        id: 'btnDrpDwn1',
        innerText: 'Ações Assessoria ',
        col: 'col-md-2',
        ul: [
            {
                id: 'AprovarAssr',
                innerText: 'Aprovar Inserção de Item',
                value: '15',
                icon: 'fluigicon fluigicon-checked icon-sm'        
            },
            {
                id: 'ReverterAssr',
                innerText: 'Puxar Item para Analise',
                value: '11',
                icon: 'fluigicon fluigicon-file-bell-empty icon-sm'    
            },
            {
                id: 'AjusteAssr',
                innerText: 'Solicitar Ajuste',
                value: '9',
                icon: 'fluigicon fluigicon-fileedit icon-sm'        
            },
            {
                class: 'divider'    
            },
            {
                id: 'ExcluirAssr',
                innerText: 'Excluir Item',
                value: '16',
                icon: 'flaticon flaticon-file-delete icon-sm'        
            }
        ]
    }

    this.itensConfigs       = [configDropdowns, configButton];//configButton                                // Determina os itens criados e a ordem de posição conforme ordem de posição do array  
    
    /** */
    this.orderSuper         = ["dataSelected", "btnDrpDwn1", "btn1", "datatable-area-search"];//"btn1"              // Determina a ordem dos elementos no linha superior. Deve ser determinado da esquerda para direita indicando os elementos por 'id'. Ex: ['btn1', 'btnDrpDwn1', ...]

    this.APImethods         = new orderMethods();                                                           // se carregado pelo arquivo ServiceAPI: APImethods= window.orderMethodsMi. Construtor iniciado aqui.
    this.resAPI             = window.res
    this.initMyInterval     = true;
    this.setChangeEvent		= true;
    this.tableReference     = window.testDatatable;
    this.itensBuilt         = {
        name: []
    };
    this.setConfigExecution();  
}
dataTableConfig.prototype.initialize = function () {
    this.orderLineSuper(this.configField, this.itensConfigs, this.orderSuper);
    changeEvent = this.setChangeEvent;
    if(changeEvent){
        this.changeEventInput();
        this.changeEventTable();
        this.loadEventTable();
        this.itensBuiltFunctions();
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
        dataSelected.setAttribute('style', 'color: black')
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

    this.setitensBuilt(objDivCol, 'dataSelected')
    return objDivCol;
}
dataTableConfig.prototype.constructButton = function (configButton){
    var buttonV = document.createElement('button');
        buttonV.setAttribute('type', 'button');
        buttonV.setAttribute('class','btn btn-primary');
        buttonV.setAttribute('disabled','disabled');
        buttonV.innerText = configButton.innerText;
    var iV = document.createElement('i');
        iV.setAttribute('class', configButton.setIcon);
        iV.setAttribute('aria-hidden', 'true');
    var divV = document.createElement('div');
        divV.setAttribute('id', configButton.id);
        divV.setAttribute('class', configButton.col);

        buttonV.appendChild(iV);
        divV.appendChild(buttonV)
    
    this.setitensBuilt(divV, 'btn1');   
    return divV;
}
dataTableConfig.prototype.constructButtonDropDown = function (configButtonDrpDwn){
    var divColV = document.createElement('div');
        divColV.setAttribute('class', configButtonDrpDwn.col);
    var divV = document.createElement('div');
        divV.setAttribute('id', configButtonDrpDwn.id);
        divV.setAttribute('class', 'btn-group');
    var buttonV = document.createElement('button');
        buttonV.setAttribute('type', 'button');
        buttonV.setAttribute('class','btn btn-primary dropdown-toggle');
        //buttonV.setAttribute('disabled','disabled');
        buttonV.setAttribute('data-toggle','dropdown');
        buttonV.innerText = configButtonDrpDwn.innerText;
    var spanV = document.createElement('span');
        spanV.setAttribute('class', 'caret');    
    var ulV = document.createElement('ul');
        ulV.setAttribute('class', 'dropdown-menu');
        ulV.setAttribute('role', 'menu');
    for(let i = 0; i < configButtonDrpDwn.ul.length; i++){
        if(configButtonDrpDwn.ul[i].class == 'divider'){
            var liV = document.createElement('li');
            liV.setAttribute('class', configButtonDrpDwn.ul[i].class);
            ulV.appendChild(liV);
        }else{
            var liV = document.createElement('li');
                liV.setAttribute('style', 'cursor: pointer');
                liV.setAttribute('id', configButtonDrpDwn.ul[i].id);
                liV.setAttribute('value', configButtonDrpDwn.ul[i].value);
            var aV = document.createElement('a');
                if(configButtonDrpDwn.ul[i].icon != undefined){
                    var iconV = this.constructIcon().construct(configButtonDrpDwn.ul[i].icon);
                    aV.appendChild(iconV);
                    aV.innerHTML = aV.innerHTML + '|' + configButtonDrpDwn.ul[i].innerText;
                    liV.appendChild(aV);
                }else{
                    aV.innerText = configButtonDrpDwn.ul[i].innerText;
                    liV.appendChild(aV);
                }
            ulV.appendChild(liV);
        }
    }

    buttonV.appendChild(spanV);
    divV.appendChild(buttonV);
    divV.appendChild(ulV);
    divColV.appendChild(divV);
    
    this.setitensBuilt(divV, configButtonDrpDwn.id);   
    return divColV;
}
dataTableConfig.prototype.constructIcon = function (configIcon){
    icon = {}
    icon = {
        construct: function (configIcon) {
            var iV = document.createElement('i');
            iV.setAttribute('class', configIcon);
            iV.setAttribute('aria-hidden', 'true');
            return iV
        }
    }  
    return icon;
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
dataTableConfig.prototype.orderLineSuper = function (objConfig, itensConfigs, orderSuper) {
    /**
     *  Determina a ordem dos elementos na linha superior do dataTable.
     */
    var divIn   = document.getElementsByClassName('row fs-no-margin');          // div onde estarão contidos os elementos.
    var divAll  = divIn[0].parentElement.parentElement;                         // div contendo todo o componete. Linha superior, linha inferior e dataTable.
    var elementsBuilt = {id: []};                                               // Array que recebe os elementos HTML já criados.
    if(divAll.id == 'target'){
        if(itensConfigs.length != 0){
            for(let i = 0; i < itensConfigs.length; i++){
                let ElemItem = itensConfigs[i];
                if(ElemItem.type == 'button'){  
                    elementsBuilt.id.push(ElemItem.id); 
                    elementsBuilt[ElemItem.id] = this.constructButton(ElemItem); 
                }else if(ElemItem.type == 'dropdown'){ 
                    elementsBuilt.id.push(ElemItem.id);  
                    elementsBuilt[ElemItem.id] = this.constructButtonDropDown(ElemItem); 
                };
            }
        }
        var inpDefaut  = this.constructInputValueSelected(objConfig) /**  <-------------------------this.configField in  dataTableConfig*/  
        
        let rowSuper                    = divIn[0];
        let tempr                       = divIn[0].children[0];                 // Obtem o elem 'barra de pesquisa'. Obs: Esse elemnto é criado juntamente com a dataTable.
        tempr.className                 = 'col-md-5';
        tempr.children[0].className     = '';
        rowSuper.removeChild(rowSuper.children[0]);                             // Limpa toda a linha para reordenar.

        elementsBuilt.id.push('dataSelected');
        elementsBuilt['dataSelected'] = inpDefaut;
        elementsBuilt.id.push('datatable-area-search');
        elementsBuilt['datatable-area-search'] = tempr;                         // datatable-area-search

        for(let j = 0; j < orderSuper.length; j++){
            let elemNow = orderSuper[j];
            let elemBuilt = elementsBuilt[elemNow];
            rowSuper.appendChild(elemBuilt);
        }

        clearInterval(this.initMyInterval) /**  <-------------------------this.myInterval in  dataTableConfig*/
    }
}
dataTableConfig.prototype.changeEventInput = function () {
    let itens       = this.itensBuilt;
    let objFunc = {
        fnc: ['formatDinamic', 'disabledOptions', 'enabledButton'],
        formatDinamic: function () {
            var configFormat = {
                inputId: 'dataSelected',
                validationStyle: 'has-success has-feedback',
                col: 'col-md-1',
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
        },
        disabledOptions: function () {
            drpDwn  = itens['btnDrpDwn1'];
            let lis = drpDwn.getElementsByTagName('li');
            let dataSelected = document.getElementById('dataSelected').value;
            console.log(dataSelected)
            let States      = [11, 9, 15, 16]
            let refEnabled  = [
                [11],
                [9, 15, 16],
                [9, 15, 16],
                [9, 15, 16]
            ] 
            let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", dataSelected, dataSelected, ConstraintType.MUST); 
            let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
            if(itenPauta['hdn_aprvAssr'] != null || itenPauta['hdn_aprvAssr'] != undefined){
                let assrAp = itenPauta['hdn_aprvAssr'];
                for(let k = 0; k < lis.length; k++){ 
                    if(lis[k].hasAttribute("hidden")){
                        lis[k].removeAttribute("hidden");
                    }
                }
                for(let i = 0; i < States.length; i++){
                    if(States[i] == assrAp){
                        let itns = refEnabled[i];
                        for(let l = 0; l < lis.length; l++){
                            for(let j = 0; j < itns.length; j++){
                                if(itns[j] == lis[l].value){
                                    lis[l].hidden = 'true';
                                }
                            }
                        }
                    }
                }  
            }
        },
        enabledButton: function (){
            var iten = itens['btn1'];
            let dataSelected = document.getElementById('dataSelected').value;
            let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", dataSelected, dataSelected, ConstraintType.MUST); 
            let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
            console.log('1 * * ** * * * ** ')
            if(itenPauta['hdn_aprvAssr'] != null || itenPauta['hdn_aprvAssr'] != undefined){
                let assrAp = itenPauta['hdn_aprvAssr'];
                let inps = document.getElementsByClassName('inpDlbr')
                arrNamesIt = ['slc_DISUP_vt', 'slc_DIRAF_vt', 'slc_DITEC_vt', 'txt_Deliberacao']
                if(15 == assrAp){
                    document.getElementById('Delibr').style.display = 'block';
                    iten.getElementsByTagName('button')[0].disabled = false;
                    for(let i = 0; i < inps.length; i++){
                        let nowInp = inps[arrNamesIt[i]];
                        nowInp.value = '';
                        nowInp.disabled = false;
                    } 
                }else if(26 == assrAp){
                    arrNames = ['hdn_DISUP_vt', 'hdn_DIRAF_vt', 'hdn_DITEC_vt', 'txt_Deliberacao']
                    for(let i = 0; i < inps.length; i++){
                        let nowInp = inps[arrNamesIt[i]]
                        console.log(itenPauta[arrNames[i]])
                        if(nowInp.tagName == 'SELECT'){
                            console.log(nowInp.options) 
                            for(let j = 0; j < nowInp.options.length; j++){
                                console.log(nowInp.options[j].value)
                                console.log(itenPauta[arrNames[i]])
                                if(nowInp.options[j].value == itenPauta[arrNames[i]]){
                                    nowInp.options[j].selected = true;
                                    inps[arrNamesIt[i]].value = itenPauta[arrNames[i]];
                                }
                            }
                            nowInp.style.color = 'black';
                            nowInp.disabled = 'disabled';
                        }else{  inps[arrNamesIt[i]].value = itenPauta[arrNames[i]]; nowInp.style.color = 'black'; nowInp.disabled = 'disabled'; }
                    }
                    document.getElementById('Delibr').style.display = 'block'
                    iten.getElementsByTagName('button')[0].disabled = true 
                }else{
                    document.getElementById('Delibr').style.display = 'none'
                    iten.getElementsByTagName('button')[0].disabled = true 
                }
            }
        }
    }
    this.tableReference.onselectrow(this.tableReference.myTable, objFunc);
}

                                   /****** Metodos com Necessidade de Tratamento******** */

dataTableConfig.prototype.changeEventTable = function () {
    var TableFluig          = this.TableFluig();
    var constructIcon       = this.constructIcon(); 
    let itens = this.itensBuilt;
    let objFunc = {
        fnc: [
                {'fncName': 'openItem', 'metodhParam': 'reload'},
                {'fncName': 'statusAsr', 'metodhParam': 'reload'},
                {'fncName': 'enabledButton', 'metodhParam': 'reload'}    
        ],
        openItem: function () {
            var secIntervalOpenItem = setInterval(pushOpenItem, 20)
            function pushOpenItem(){    
                var url = "http://mywebhm.am.sebrae.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
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
                    if(cells[0].innerText != ''){
                        textLink = cells[0].innerText
                        let inHTML = "<a href=\""+ url + textLink +"\""+ "class=\"cad-link\""+"target=\"_blank\""+"style=\"color:blue\" ml=\"true\">"+"<i class=\"flaticon flaticon-link icon-md\"></i>"+
                        textLink+"</a>"
                        cells[0].innerHTML = inHTML
                        console.log(inHTML)
                    }
                }
                clearInterval(secIntervalOpenItem)
            }
        },
        statusAsr: function () {
            var secIntervalStatusAsr = setInterval(pushStatusAsr, 20);
            function pushStatusAsr(){
                let col         = TableFluig.getCol('Aprov.Assessoria');
                let colNumSol   = TableFluig.getCol('Solicitação');
                console.log(colNumSol[0])
                for(let i = 0; i < col.length; i++){
                    if(colNumSol[i].children[0] != undefined){
                        var numSlct     = colNumSol[i].children[0].innerText;
                    }else{ clearInterval(secIntervalStatusAsr) }
                    let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", numSlct, numSlct, ConstraintType.MUST); 
                    let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
                    if(itenPauta['hdn_aprvAssr'] != null || itenPauta['hdn_aprvAssr'] != undefined){
                        console.log(itenPauta)
                        let assrAp = itenPauta['hdn_aprvAssr'];
                        if(assrAp == 15){
                            let iconChecked     = constructIcon.construct('flaticon flaticon-file-check icon-md');
                            col[i].appendChild(iconChecked);
                            let icn = col[i].innerHTML;                                     //Descrição
                            icn = icn +' <b>Aprovado</b>';
                            col[i].innerHTML = icn;
                        }else if(assrAp == 11){
                            let iconEmpty       = constructIcon.construct('fluigicon fluigicon-file-bell-empty icon-md');
                            col[i].appendChild(iconEmpty);
                            let icn = col[i].innerHTML;                                     //Descrição
                            icn = icn +' <b>Análise</b>';
                            col[i].innerHTML = icn;
                        }else if(assrAp == 16){
                            let iconEmpty       = constructIcon.construct('flaticon flaticon-file-delete icon-md');
                            col[i].appendChild(iconEmpty);
                            let icn = col[i].innerHTML;                                     //Descrição
                            icn = icn +' <b>Excluído</b>';
                            col[i].innerHTML = icn;    
                        }else if(assrAp == 9){
                            let iconEmpty       = constructIcon.construct('fluigicon fluigicon-fileedit icon-md');
                            col[i].appendChild(iconEmpty);
                            let icn = col[i].innerHTML;                                     //Descrição
                            icn = icn +' <b>Ajuste</b>';
                            col[i].innerHTML = icn;    
                        }
                        else if(assrAp == 26){
                            let iconEmpty       = constructIcon.construct('fluigicon fluigicon-checked icon-md');
                            col[i].appendChild(iconEmpty);    
                            let icn = col[i].innerHTML;                                     //Descrição
                            icn = icn +' <b>Deliberado</b>';
                            col[i].innerHTML = icn;
                        }

                    }else{
                        let iconEmpty       = constructIcon.construct('fluigicon fluigicon-file-bell-empty icon-md');
                        col[i].appendChild(iconEmpty);
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Análise</b>';
                    }
                } 
                clearInterval(secIntervalStatusAsr)  
            }
        },
        enabledButton: function (){
            var iten = itens['btn1']
            document.getElementById('Delibr').style.display = 'none'
            iten.getElementsByTagName('button')[0].disabled = true
        }
    }
    this.tableReference.setFunc(objFunc);
}
dataTableConfig.prototype.loadEventTable = function () {
    var TableFluig          = this.TableFluig();
    var constructIcon       = this.constructIcon(); 
    let objFuncload = {
        fnc: [
                {'fncName': 'openItem', 'metodhParam': 'load'},
                {'fncName': 'statusAsr', 'metodhParam': 'load'}
        ],
        openItem: function () {
            var url = "http://mywebhm.am.sebrae.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID="
            var arrColumnsRender = ['N° Solicitação', 'Data Solicitação', 'Nome Solicitante', 'Unidade', 'Assunto', 'Justificativa']
            var indexLink = []
            var divIn       = document.getElementsByClassName('row fs-no-margin')
            var divAll      = divIn[0].parentElement.parentElement       //DIV com o componente dataTable
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
        },
        statusAsr: function () {
            let col         = TableFluig.getCol('Aprov.Assessoria');
            let colNumSol   = TableFluig.getCol('Solicitação');
            //console.log(colNumSol[3].children[0].innerText)
            for(let i = 0; i < col.length; i++){
                let numSlct         = colNumSol[i].children[0].innerText;
                let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", numSlct, numSlct, ConstraintType.MUST); 
                let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
                if(itenPauta['hdn_aprvAssr'] != null || itenPauta['hdn_aprvAssr'] != undefined){
                    //console.log(itenPauta)
                    let assrAp = itenPauta['hdn_aprvAssr'];

                    if(assrAp == 15){
                        let iconChecked     = constructIcon.construct('flaticon flaticon-file-check icon-md');
                        col[i].appendChild(iconChecked);
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Aprovado</b>';
                        col[i].innerHTML = icn;
                    }else if(assrAp == 11){
                        let iconEmpty       = constructIcon.construct('fluigicon fluigicon-file-bell-empty icon-md');
                        col[i].appendChild(iconEmpty);
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Análise</b>';
                        col[i].innerHTML = icn;
                    }else if(assrAp == 16){
                        let iconEmpty       = constructIcon.construct('flaticon flaticon-file-delete icon-md');
                        col[i].appendChild(iconEmpty);
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Excluído</b>';
                        col[i].innerHTML = icn;
                    }else if(assrAp == 9){
                        let iconEmpty       = constructIcon.construct('fluigicon fluigicon-fileedit icon-md');
                        col[i].appendChild(iconEmpty);    
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Ajuste</b>';
                        col[i].innerHTML = icn;
                    }
                    else if(assrAp == 26){
                        let iconEmpty       = constructIcon.construct('fluigicon fluigicon-checked icon-md');
                        col[i].appendChild(iconEmpty);    
                        let icn = col[i].innerHTML;                                     //Descrição
                        icn = icn +' <b>Deliberado</b>';
                        col[i].innerHTML = icn;
                    }

                }else{
                    let iconEmpty       = constructIcon.construct('fluigicon fluigicon-file-bell-empty icon-md');
                    col[i].appendChild(iconEmpty);
                    let icn = col[i].innerHTML;                                     //Descrição
                    icn = icn +' <b>Análise</b>';
                    col[i].innerHTML = icn;
                }
            }   
        }
    }
    if(objFuncload != '' && objFuncload != null && objFuncload != undefined){
        for(let i = 0; i < objFuncload.fnc.length; i++){
            if(objFuncload.fnc[i].metodhParam == 'load'){
                let name 		= objFuncload.fnc[i].fncName
                objFuncload[name]()
            }
        }
    }
}
dataTableConfig.prototype.itensBuiltFunctions = function () {
    let itens = this.itensBuilt;
    let TableFluig  = this.TableFluig();
    let itenBuitFunc = {
        fnc: [
                {'fncName': 'moveItem'},
                {'fncName': 'moveItemDelibr'}
        ],
        moveItem: async function () {
            drpDwn  = itens['btnDrpDwn1'];
            let lis = drpDwn.getElementsByTagName('li')
            for(let i = 0; i < lis.length; i++){
                let liNow = lis[i];
                if(liNow.id){
                    await liNow.addEventListener('click', async function() { await hipotesis(this); await hipotesis2(); }); /******************************** */
                    async function hipotesis(elem){
                        let nameIten = 'dataSelected'
                        console.log(itens)
                        let it = dataTablemi.itensBuilt[nameIten];
                        var iten = dataTablemi.itensBuilt['btn1'];
                        inp = it.getElementsByTagName('input')[0];
                        inpValue = inp.value;  
                        let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", inpValue, inpValue, ConstraintType.MUST); 
                        let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
                        let statusAssr      = itenPauta['hdn_aprvAssr'];
                        
                        //console.log(itensTools.myModal())

                        if(elem.value != statusAssr){    
                            await dataTablemi.APImethods.movePOST(inpValue, elem.value); /******** */
                            var interv = setInterval(defineStatus, 200);
                        }
                        function defineStatus () { 
                            let colItens = dataTablemi.TableFluig().getCol('Aprov.Assessoria');
                            let colValue = dataTablemi.TableFluig().getCol('N° Solicitação');
                            //dataTablemi.resAPI  = window.res['response']; 
                            var responsNow = window.res
                            console.log(responsNow)
                            responsNowIns = responsNow.responseIs
                            console.log(responsNowIns)
                            var order           = window.res['order'];
                            console.log(order)
                            console.log(window.res['check']);
                            console.log(window.res['order']);
                            console.log(window.res['responseIs']);
                            //let res             = dataTablemi.resAPI;
                            var  res             = window.res['responseIs'];
                            if(order == 2 && res != {}){
                                var err                 = window.res['err'];
                                window.res['check']     = false;
                                if(err != undefined && err.indexOf('Error') == -1){
                                    if(res != undefined && res != '' && res != {}){
                                        console.log(res)      
                                        console.log(window.res['responseIs'])                                                                         
                                        var stateActive     = res.items[res.items.length - 1].active
                                        var stateNow        = res.items[res.items.length - 1].state.sequence
                                        var stateInstanced  = res.items[res.items.length - 1].processInstanceId
                                        var colItem = 0;
                                        for(let i = 0; i < colValue.length; i++){
                                            if(inpValue == colValue[i].innerText){
                                                colItem = colItens[i]
                                            }
                                        } 
                                        console.log(stateNow);
                                        //console.log(stateActive);
                                        //console.log(stateInstanced)
                                        //console.log(inpValue)
                                        if(stateActive == true && stateInstanced == inpValue){
                                            if(stateNow == 15){ 
                                                //colItem.removeChild(colItem.children[0]); 
                                                colItem.innerHTML = ''
                                                let icon = dataTablemi.constructIcon().construct('flaticon flaticon-file-check icon-md');
                                                colItem.appendChild(icon);
                                                let icn             = colItem.innerHTML;                                     //Descrição
                                                icn                 = icn +' <b>Aprovado</b>';
                                                colItem.innerHTML    = icn;
                                                dataTablemi.resAPI = {};
                                                window.res['arrIndx'].push('1');
                                                orderMethodsMi.indexFunctionsX();
                                                itensTools.myToast('success', 'Ação realizada com sucesso!');
                                                let inps = document.getElementsByClassName('inpDlbr')
                                                arrNamesIt = ['slc_DISUP_vt', 'slc_DIRAF_vt', 'slc_DITEC_vt', 'txt_Deliberacao']
                                                document.getElementById('Delibr').style.display = 'block';
                                                iten.getElementsByTagName('button')[0].disabled = false;
                                                console.log('************** * ** * * * ** * *** **'+ iten)
                                                for(let i = 0; i < inps.length; i++){
                                                    let nowInp = inps[arrNamesIt[i]];
                                                    nowInp.value = '';
                                                    nowInp.disabled = false;
                                                } 
                                                clearInterval(interv)
                                            }
                                            else if(stateNow == 11){
                                                //colItem.removeChild(colItem.children[0])
                                                colItem.innerHTML = ''
                                                let icon = dataTablemi.constructIcon().construct('fluigicon fluigicon-file-bell-empty icon-md');
                                                colItem.appendChild(icon);
                                                let icn             = colItem.innerHTML;                                     //Descrição
                                                icn                 = icn +' <b>Análise</b>';
                                                colItem.innerHTML    = icn;
                                                dataTablemi.resAPI = {};
                                                window.res['arrIndx'].push('1');
                                                orderMethodsMi.indexFunctionsX();
                                                itensTools.myToast('success', 'Ação realizada com sucesso!');
                                                document.getElementById('Delibr').style.display = 'none'
                                                iten.getElementsByTagName('button')[0].disabled = true 
                                                clearInterval(interv)
                                            }
                                            else if(stateNow == 16){
                                                //colItem.removeChild(colItem.children[0])
                                                colItem.innerHTML = ''
                                                let icon = dataTablemi.constructIcon().construct('flaticon flaticon-file-delete icon-md');
                                                colItem.appendChild(icon);
                                                let icn             = colItem.innerHTML;                                     //Descrição
                                                icn                 = icn +' <b>Excluído</b>';
                                                colItem.innerHTML    = icn;
                                                dataTablemi.resAPI = {};
                                                window.res['arrIndx'].push('1');
                                                orderMethodsMi.indexFunctionsX();
                                                itensTools.myToast('success', 'Ação realizada com sucesso!');
                                                clearInterval(interv)
                                            }
                                            else if(stateNow == 9){
                                                //colItem.removeChild(colItem.children[0])
                                                colItem.innerHTML = ''
                                                let icon = dataTablemi.constructIcon().construct('fluigicon fluigicon-fileedit icon-md');
                                                colItem.appendChild(icon);
                                                let icn             = colItem.innerHTML;                                     //Descrição
                                                icn                 = icn +' <b>Ajuste</b>';
                                                colItem.innerHTML    = icn;
                                                dataTablemi.resAPI = {};
                                                window.res['numIndx'] = 2;
                                                window.res['arrIndx'].push('1');
                                                orderMethodsMi.indexFunctionsX();
                                                itensTools.myToast('success', 'Ação realizada com sucesso!');
                                                clearInterval(interv)
                                            }
                                            else if(stateNow == 26){
                                                //colItem.removeChild(colItem.children[0])
                                                colItem.innerHTML = ''
                                                let icon = dataTablemi.constructIcon().construct('fluigicon fluigicon-checked icon-md');
                                                colItem.appendChild(icon);
                                                let icn             = colItem.innerHTML;                                     //Descrição
                                                icn                 = icn +' <b>Deliberado</b>';
                                                colItem.innerHTML    = icn;
                                                dataTablemi.resAPI = {};
                                                window.res['numIndx'] = 2;
                                                window.res['arrIndx'].push('1');
                                                orderMethodsMi.indexFunctionsX();
                                                itensTools.myToast('success', 'Ação realizada com sucesso!');
                                                clearInterval(interv)
                                            }
                                            else{ clearInterval(interv) }
                                        }else{ clearInterval(interv) } 
                                    }
                                }else { clearInterval(interv) }
                            }else if(order == 0){ clearInterval(interv) }
                        }
                    }
                    async function hipotesis2() { 
                        var intervdisabledOptions = setInterval(defineOptions, 200);
                        function defineOptions(){
                            let order           = window.res['order'];
                            let res             = window.res['responseIs'];
                            if(order == 2 && res != {}){
                                let err                 = window.res['err'];
                                if(err != undefined && err.indexOf('Error') == -1){
                                    if(res != undefined && res != '' && res != {}){
                                        let itens = dataTablemi.itensBuilt;
                                        drpDwn  = itens['btnDrpDwn1'];
                                        let lis = drpDwn.getElementsByTagName('li');
                                        let dataSelected = document.getElementById('dataSelected').value;
                                        let States      = [11, 9, 15, 16, 26]
                                        let refEnabled  = [
                                            [11],
                                            [9, 15, 16],
                                            [9, 15, 16],
                                            [9, 15, 16],
                                            [11, 9, 15, 16],
                                        ] 
                                        let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", dataSelected, dataSelected, ConstraintType.MUST); 
                                        let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
                                        if(itenPauta['hdn_aprvAssr'] != null || itenPauta['hdn_aprvAssr'] != undefined){
                                            let assrAp = itenPauta['hdn_aprvAssr'];
                                            for(let k = 0; k < lis.length; k++){ 
                                                if(lis[k].hasAttribute("hidden")){
                                                    lis[k].removeAttribute("hidden");
                                                }
                                            }
                                            for(let i = 0; i < States.length; i++){
                                                if(States[i] == assrAp){
                                                    let itns = refEnabled[i];
                                                    for(let l = 0; l < lis.length; l++){
                                                        for(let j = 0; j < itns.length; j++){
                                                            if(itns[j] == lis[l].value){
                                                                lis[l].hidden = 'true';
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            window.res['numIndx'] = 2;
                                            window.res['arrIndx'].push('1');
                                            orderMethodsMi.indexFunctionsX();

                                            clearInterval(intervdisabledOptions);  
                                        }else{ clearInterval(intervdisabledOptions); }
                                    }
                                }else{ clearInterval(intervdisabledOptions); }
                            }
                        }
                    }
                    //})
                }
            }
        },moveItemDelibr: function () {
            btn             = itens['btn1'];
            console.log(btn)
            btn.addEventListener('click', function() { hipotesis(); }); 
            function hipotesis(){
                let nameIten    = 'dataSelected'
                statusDelibr    = 26;
                inpsPanel       = document.getElementsByClassName('inpDlbr')
                let it = dataTablemi.itensBuilt[nameIten];
                inp = it.getElementsByTagName('input')[0];
                inpValue = inp.value;  
                let cntrts          = DatasetFactory.createConstraint("txt_NumProcess", inpValue, inpValue, ConstraintType.MUST); 
                let itenPauta       = DatasetFactory.getDataset('Pauta DIREX', null, new Array(cntrts), null).values[0];
                let statusAssr      = itenPauta['hdn_aprvAssr'];

                DISUP = inpsPanel['slc_DISUP_vt'].value;
                DIRAF = inpsPanel['slc_DIRAF_vt'].value;
                DITEC = inpsPanel['slc_DITEC_vt'].value;
                Delibr = inpsPanel['txt_Deliberacao'].value;
                
                arrNamesInp = ['slc_DISUP_vt', 'slc_DIRAF_vt', 'slc_DITEC_vt', 'txt_Deliberacao'];
                for(i = 0; i < inpsPanel.length; i++){
                    inpNow = inpsPanel[arrNamesInp[i]]
                    if(inpNow.value != '' && inpNow.value != 0){
                        if(statusDelibr != statusAssr){    
                            dataTablemi.APImethods.movePOST(inpValue, statusDelibr, DISUP, DIRAF, DITEC, Delibr); 
                            var intervmoveItemDelibr = setInterval(defineStatusDelibr, 100);
                        }
                    }else{ itensTools.myToast('info', 'É necessário preencher todos os campos de Deliberação!'); break; }
                }                

                function defineStatusDelibr () { 
                    let colItens = dataTablemi.TableFluig().getCol('Aprov.Assessoria');
                    let colValue = dataTablemi.TableFluig().getCol('N° Solicitação');
                    var itenBtn1 = dataTablemi.itensBuilt['btn1'];
                    var responsNow = window.res
                    responsNowIns = responsNow.responseIs
                    var order           = window.res['order'];
                    var  res             = window.res['responseIs'];
                    console.log(window.res['responseIs'])   
                    console.log(window.res['order'])    
                    console.log(order)    
                    if(order == 2 && res != {}){
                        var err                 = window.res['err'];
                        window.res['check']     = false;
                        if(err != undefined && err.indexOf('Error') == -1){
                            if(res != undefined && res != '' && res != {}){
                                console.log(res)      
                                console.log(window.res['responseIs'])                                                                         
                                var stateActive     = res.items[res.items.length - 1].active
                                var stateNow        = res.items[res.items.length - 1].state.sequence
                                var stateInstanced  = res.items[res.items.length - 1].processInstanceId
                                var colItem = 0;
                                for(let i = 0; i < colValue.length; i++){
                                    if(inpValue == colValue[i].innerText){
                                        colItem = colItens[i]
                                    }
                                } 
                                console.log(stateNow);
                                if(stateActive == true && stateInstanced == inpValue){
                                    if(stateNow == 26){  
                                        colItem.innerHTML = ''
                                        let icon = dataTablemi.constructIcon().construct('fluigicon fluigicon-checked icon-md');
                                        colItem.appendChild(icon);
                                        let icn             = colItem.innerHTML;                                     //Descrição
                                        icn                 = icn +' <b>Deliberado</b>';
                                        colItem.innerHTML    = icn;
                                        dataTablemi.resAPI = {};
                                        let inps = document.getElementsByClassName('inpDlbr')
                                        arrNamesIt = ['slc_DISUP_vt', 'slc_DIRAF_vt', 'slc_DITEC_vt', 'txt_Deliberacao']
                                        document.getElementById('Delibr').style.display = 'block';
                                        itenBtn1.getElementsByTagName('button')[0].disabled = true;
                                        console.log('************** * ** * * * ** * *** **'+ itenBtn1)
                                        for(let i = 0; i < inps.length; i++){
                                            let nowInp = inps[arrNamesIt[i]];
                                            //nowInp.value = '';
                                            nowInp.disabled = true;
                                        } 
                                        window.res['numIndx'] = 1;
                                        window.res['arrIndx'].push('1');
                                        orderMethodsMi.indexFunctionsX();
                                        itensTools.myToast('success', 'Ação realizada com sucesso!');
                                        clearInterval(intervmoveItemDelibr)
                                    }
                                    else{ clearInterval(intervmoveItemDelibr) }
                                }else{ clearInterval(intervmoveItemDelibr) } 
                            }
                        }else { clearInterval(intervmoveItemDelibr) }
                    }else if(window.res['order'] == 0){ 
                        clearInterval(intervmoveItemDelibr); 
                    }
                }
            }

        }
    }
    if(itenBuitFunc != '' && itenBuitFunc != null && itenBuitFunc != undefined){
        for(let i = 0; i < itenBuitFunc.fnc.length; i++){
            let name 		= itenBuitFunc.fnc[i].fncName;
            itenBuitFunc[name]();
        }
    }
}
dataTableConfig.prototype.setitensBuilt = function (item, name) {
    this.itensBuilt.name.push(name);
    this.itensBuilt[name] = item;
    return this.itensBuilt
}
dataTableConfig.prototype.TableFluig = function () {
    TableFluig = {}
    var table       = document.getElementById('target');
    var head        = table.getElementsByTagName('thead')[0].rows[0].cells;
    var tbody       = table.getElementsByTagName('tbody')[0];  
    var rows        = tbody.rows;  
    var headNames = []
    for(i = 0; i < head.length; i++){
        headNames[i] = head[i].innerText;
    }

    TableFluig = {
        table:  table,
        head:   head,
        tbody:  tbody,
        rows:   rows,
        getCol: function (columName){
            var col = []
            var pos = 0
            for(i = 0; i < headNames.length; i++){
                if(headNames[i] == columName){
                    pos = i;
                }
            }
            for(j = 0; j < this.rows.length; j++){
                var cells = this.rows[j].cells;
                cell = cells[pos]
                col[j] = cell 
            }
            return col
        }
    };

    return TableFluig
}

function dataTableinit() { dataTablemi = new dataTableConfig(); }
window.addEventListener('load', dataTableinit)


