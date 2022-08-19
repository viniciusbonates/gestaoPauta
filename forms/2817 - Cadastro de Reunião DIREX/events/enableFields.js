function enableFields(form){ 
    var Now_State = parseInt(getValue("WKNumState"));

	if(Now_State == 0){
		form.setEnabled("cmb_NomeSolicita", false);
	}
}