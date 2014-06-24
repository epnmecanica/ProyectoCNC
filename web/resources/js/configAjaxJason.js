var fetch_json = function() {
	
    $.ajax({
        type: 'GET',
        url:  "/OpenCNC/cad/get",
		/*dataType: 'json',*/
        async: true,
        success: function(result) {
			
			/*var tmp = "Fetch time is: " + result.milliTime + " !"
			   + "<br /><br />and the JSON is:<br /><br />"
		       + JSON.stringify(result) + "<br /><br />";
			*/
                        $("#theJson").html(result);
			//$("#theJson").html(tmp);
                        
                       alert("hola");
			
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Issue fetching the JSON: "
				+ textStatus + " "
				+ errorThrown + "!" + " Mauri");
        }
    });
    
};