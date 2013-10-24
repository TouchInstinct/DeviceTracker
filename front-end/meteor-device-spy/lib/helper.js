GetTimeAndDateFromDate = function(date) {

	if (!date) return "";

	var hours = date.getHours();
 	if (hours < 10) hours = "0" + hours;

 	var minutes = date.getMinutes();
 	if (minutes < 10) minutes = "0" + minutes;

 	var days = date.getDate();
 	if (days < 10) days = "0" + days;

 	var months = date.getMonth() + 1;
 	if (months < 10) months = "0" + months;

 	return hours + ":" + minutes + " " + days + "." + months + "." + date.getFullYear();
};