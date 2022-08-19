function displayFields(form,customHTML){ 
    var Now_State = parseInt(getValue("WKNumState"));
    var NumProcesso = getValue("WKNumProces");
    var usuario = getValue("WKUser");
    var data = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    switch(Now_State){

        //Solicitação
        case 0:
                form.setValue("cmb_NomeSolicita",usuario);
                form.setValue("dt_DataSolicita",data.format(new Date()));

        
        break;

        default:
    }
}

