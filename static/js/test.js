onStart();


// Famers slice
// Outgoing data
//tooltips to graph

function plotChart(usedata){
	var plotdata = [{
		data: usedata,
	}];
	var options = {
		xaxis:{
			mode: "time"
		}
	};
	$.plot($("#placeholder"), plotdata, options);
} 

function getDateRange(){
	var ranges = [];
	ranges.push(data[0][0]);
	ranges.push(data[[data.length-1]][0]);
	return ranges;
}""
function addDateSel(){
	var dateminmax = getDateRange();
	$('#placeholder').after('<input type="text" size="50" id="datefirst" value="'+(new Date(dateminmax[0])).toLocaleDateString("en-US")+'"/>');
	$('#datefirst').after('<input type="text" size="50" id="datesecond" value="'+(new Date(dateminmax[1])).toLocaleDateString("en-US")+'"/>');
	$('#datesecond').after('<select id="timeunit"><option value="1">Daily</option><option value="2">Weekly</option><option value="3">Monthly</option></select>');
	$('#timeunit').after('<input type="submit" id="datechoose" value="choose">');
	$('#datefirst').glDatePicker({
		selectedDate: new Date(getDateRange()[0]),
		selectableDateRange: [
        { from: new Date(getDateRange()[0]),
            to: new Date(getDateRange()[1]) },
        ]
	});
	$('#datesecond').glDatePicker({
		selectedDate: new Date(getDateRange()[1]),
		selectableDateRange: [
	    { from: new Date(getDateRange()[0]),
	        to: new Date(getDateRange()[1]) },
	    ]
	});
	$('#datechoose').click(function(){renderNew();});

}

function textmanage(){
	$("#loading").hide();
	$("#listensplot").prepend('<h1>Listens Data</h1>');
}

function getDates(){
	var firsttime = (new Date($('#datefirst').val())).getTime();
	var secondtime = (new Date($('#datesecond').val())).getTime();
	if (secondtime < firsttime){
		alert("Second date must be after first");
		return null;
	}
	else{
		var daterange = [];
		for(var i = 0; i < data.length; i++){
			if (data[i][0] > secondtime){
				break;
			}
			if (data[i][0] >= firsttime){
				daterange.push(data[i]);
			}
		}
		return daterange;
	}
}

function getMonths(datecount){
	var date = datecount[0];
	var count = datecount[1];
	var fullDate = new Date(date);
	var date_month = (new Date(fullDate.getFullYear(),fullDate.getMonth())).getTime();
	return [date_month,count];
}

function getWeeks(datecount){
	var date = datecount[0];
	var count = datecount[1];
	var fullDate = new Date(date);
	var date_month = (new Date(fullDate.getFullYear(),fullDate.getMonth(),Math.floor(fullDate.getDate()/7)*7)).getTime();
	return [date_month,count];
}

function reduceVals(datecounts){
	var reducedcounts = {}
	for (var i = 0; i < datecounts.length; i++){
		if (reducedcounts[datecounts[i][0]] == undefined){
			reducedcounts[datecounts[i][0]] = datecounts[i][1];
		}
		else {
			reducedcounts[datecounts[i][0]] += datecounts[i][1];	
		}
	}
	var retval = []
	for (var key in reducedcounts){
		retval.push([key,reducedcounts[key]]);
	}
	return retval;
}

function renderNew(){
	var displayData = getDates();
	if (displayData != null) {
		var timeunit = $("#timeunit").find(':selected').val();
		if(timeunit=='2'){
			displayData = reduceVals(displayData.map(getWeeks));
		}
		if(timeunit=='3'){
			displayData = reduceVals(displayData.map(getMonths));
		}
		plotChart(displayData);
	}
}

function onStart(){
	plotChart(data);
	textmanage();
	addDateSel();
}






