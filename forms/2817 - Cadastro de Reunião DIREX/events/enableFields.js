function enableFields(form){ 
    var Now_State = parseInt(getValue("WKNumState"));

	if(Now_State == 0){
		form.setEnabled("cmb_NomeSolicita", false);
	}
	if(Now_State == 8){
		form.setEnabled("cmb_NomeSolicita", false);
	}
	if(Now_State == 10){
		form.setEnabled("cmb_NomeSolicita", false);
		form.setEnabled("dt_dataInicio", false);
	}
}