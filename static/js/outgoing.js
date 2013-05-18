onStart();

// tooltips to graph
// play with axes, titles, etc.

function plotChart(usedata){
	var plotdata = [{
		data: usedata,
	}];
	if (usedata.length < 50){
		var options = {
			xaxis:{
				mode: "time"
			},
			series:{
				lines:{
					show: true
				},
				points:{
					show:true
				}
			}
		};
	}
	else{
		var options = {
			xaxis:{
				mode: "time"
			}
		};
	}
	$.plot($("#placeholder1"), plotdata, options);
} 

function getDateRange(){
	var ranges = [];
	ranges.push(data_count[0][0]);
	ranges.push(data_count[[data_count.length-1]][0]);
	return ranges;
}

function addDateSel(){
	var dateminmax = getDateRange();
	$('#placeholder1').after('<input type="text" size="50" id="datefirst" value="'+(new Date(dateminmax[0])).toLocaleDateString("en-US")+'"/>');
	$('#datefirst').after('<input type="text" size="50" id="datesecond" value="'+(new Date(dateminmax[1])).toLocaleDateString("en-US")+'"/>');
	$('#datesecond').after('<select id="datadisplaytype"><option value="1">Number Listens</option><option value="2">Average Duration</option></select>');
	$('#datadisplaytype').after('<select id="timeunit"><option value="1">Weekly</option><option value="2">Monthly</option></select>');
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
	$("#loading").remove();
	$("#outgoingcountplot").prepend('<h1>Outgoing Data</h1>');
}

function getDates(datatype){
	var firsttime = (new Date($('#datefirst').val())).getTime();
	var secondtime = (new Date($('#datesecond').val())).getTime();
	if (secondtime < firsttime){
		alert("Second date must be after first");
		return null;
	}
	else{
		var daterange = [];
		if(datatype=='1'){
			for(var i = 0; i < data_count.length; i++){
				if (data_count[i][0] > secondtime){
					break;
				}
				if (data_count[i][0] >= firsttime){
					daterange.push(data_count[i]);
				}
			}
		}
		else{
			for(var i = 0; i < data_duration.length; i++){
				if (data_duration[i][0] > secondtime){
					break;
				}
				if (data_duration[i][0] >= firsttime){
					daterange.push(data_duration[i]);
				}
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

function reduceVals(datecounts, reducetype){
	var reducedcounts = {}
	for (var i = 0; i < datecounts.length; i++){
		if (reducedcounts[datecounts[i][0]] == undefined){
			reducedcounts[datecounts[i][0]] = [datecounts[i][1],1];
		}
		else {
			reducedcounts[datecounts[i][0]][0] += datecounts[i][1];
			reducedcounts[datecounts[i][0]][1] += 1;	
		}
	}
	var retval = []
	if (reducetype == "sum"){
		for (var key in reducedcounts){
			retval.push([key,reducedcounts[key][0]]);
		}
	}
	else {
		for (var key in reducedcounts){
			retval.push([key,reducedcounts[key][0]/reducedcounts[key][1]]);
		}	
	}
	return retval;
}

function renderNew(){
	var timeunit = $("#timeunit").find(':selected').val();
	var datatype = $("#datadisplaytype").find(':selected').val();
	var displayData = getDates(datatype);
	if (displayData != null) {
		if(timeunit=='1' && datatype=='1'){
			displayData = reduceVals(displayData.map(getWeeks),"sum");
		}
		else if(timeunit=='2' && datatype=='1'){
			displayData = reduceVals(displayData.map(getMonths),"sum");
		}
		else if(timeunit=='1' && datatype=='2'){
			displayData = reduceVals(displayData.map(getWeeks),"mean");
		}
		else{
			displayData = reduceVals(displayData.map(getMonths),"mean");
		}
		plotChart(displayData);
	}
}

function onStart(){
	plotChart(reduceVals(data_count.map(getWeeks),"sum"));
	textmanage();
	addDateSel();
}