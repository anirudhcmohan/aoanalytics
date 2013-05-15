onStart();

function onStart(){
	for(var key in calls) break;
	textmanage();
	plotChart(key, calls[key]);
	addFarmerSel();
}

function plotChart(farmerid, usedata){
	$("h3").remove();
	$("h1").after('<h3>Total calls by farmer '+ farmerid + ': ' +usedata.length+'</h3>');
	var plotdata = [{
		data: usedata,
		bars: {
			show: true
		}
	}];
	var options = {
		xaxis:{
			mode: "time"
		}

	};
	$.plot($("#placeholder"), plotdata, options);
} 

function textmanage(){
	$("#loading").remove();
	$("#farmersplot").prepend('<h1 id="chartitle">Listens Data by Farmer</h1>');
}

function addFarmerSel(){
	var farmerbox = '<p>Farmer:</p><select id="farmerbox">';
	for (var key in calls){
		farmerbox += '<option value="'+key+'">'+key+'</option>';
	}
	farmerbox += '</select>';
	$('#placeholder').after(farmerbox);
	$('#farmerbox').after('<input type="submit" id="farmerchoose" value="choose">');
	$('#farmerchoose').click(function(){renderNew();});
}

function renderNew(){
	var farmerid = $("#farmerbox").find(':selected').val();
	plotChart(farmerid, calls[farmerid]);
}