/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function seleccionElementos(){
    
        var statesdemo = {
	state0: {
		html:'Estamos proximos a comenzar.',
                title:"Estas listo?",
		buttons: { 'No lo estoy': false, 'Siguiente': true },
		focus: 1,
		submit:function(e,v,m,f){
			if(v){
				e.preventDefault();
				$.prompt.goToState('state1');
				return false;
			}
			$.prompt.close();
		}
	},
	state1: {
		html:'Escoge la funcion de mecanizado que necesitas.',
		buttons: { 'Atras': -1, 'Salir': 0 },
		focus: 1,
		submit:function(e,v,m,f){
			e.preventDefault();
			if(v==0)
				$.prompt.close();
			else if(v==-1)
				$.prompt.goToState('state0');
		}
	}
};

$.prompt(statesdemo);
  
};

