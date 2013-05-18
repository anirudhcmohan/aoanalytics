onStart();

function onStart(){
	for(var key in calls) break;
	textmanage();
	plotPerFarmerChart(key, calls[key]);
	addFarmerSel();
	plotAllFarmersChart(counts);
}

function showTooltip(x, y, contents) {
	$("<div id='tooltip'>" + contents + "</div>").css({
		position: "absolute",
		display: "none",
		top: y + 5,
		left: x + 5,
		border: "1px solid #fdd",
		padding: "2px",
		"background-color": "#fee",
		opacity: 0.80
	}).appendTo("body").fadeIn(200);
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
	var options = {
		// xaxis:{
		// 	mode: "time"
		// }
		grid: {
			hoverable: true
		}
	};
	$.plot($("#placeholder2"), plotdata, options);
}

$("#placeholder2").bind("plothover",function(event, pos, item){
	if(item){
		$("#tooltip").remove();
		var percents = computePercentiles(item.datapoint[0]+1);
		showTooltip(item.pageX,item.pageY, percents[0]+"% of farmers make " + percents[1] + "% of the calls");
	}

});

function computePercentiles(stopIndex){
	var callCount = 0;
	var countvals = counts.map(function(i){return i[1];}) 
	for(var i = 0; i < stopIndex; i++){
		callCount += countvals[i];
	}
	return [(stopIndex/totfarmers*100).toFixed(1), (callCount/totcalls*100).toFixed(1)];
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