onStart();

function onStart(){
	for(var key in calls) break;
	textmanage();
	plotPerFarmerChart(key, calls[key]);
	addFarmerSel();
	plotAllFarmersChart(counts);
}

function plotAllFarmersChart(usedata){
	$("#plot2subtitle").remove();
	$("#chartitle2").after('<h3 id="plot2subtitle">Sorted by descending order of usage</h3>');
	var plotdata = [{
		data: usedata,
		bars: {
			show: true
		}
	}];
	// var options = {
	// 	xaxis:{
	// 		mode: "time"
	// 	}

	// };
	$.plot($("#placeholder2"), plotdata);
}

function plotPerFarmerChart(farmerid, usedata){
	$("#plot1subtitle").remove();
	$("#chartitle").after('<h3 id="plot1subtitle">Total calls by farmer '+ farmerid + ': ' +usedata.length+'</h3>');
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
	$("#farmersplot").prepend('<h1 id="chartitle">Listens Data by Individual Farmer</h1>');
	$("#farmershistogram").prepend('<h1 id="chartitle2">Listens Data for All Farmers</h1>');
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
	plotPerFarmerChart(farmerid, calls[farmerid]);
}