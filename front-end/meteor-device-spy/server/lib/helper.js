GetCurrentDateAndTime = function() {
  var date = new Date();

  var hours = date.getHours();
  if (hours < 10) hours = "0" + hours;

  var minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  var days = date.getDate();
  if (days < 10) days = "0" + days;

  var months = date.getMonth() + 1;
  if (months < 10) months = "0" + months;

  return hours + ":" + minutes + " " + days + "." + months + "." + date.getFullYear();
}

GetUserByMAC = function(mac) {
  mac = mac.toUpperCase();
  var user = Users.findOne({MAC_Addresses: mac});

  if (!user) {
    mac = mac.toLowerCase();
    user = Users.findOne({MAC_Addresses: mac});
    if (!user)
      console.log("-------- Такого МАС-адреса в базе нет: " + mac.toUpperCase());
  }

  if (user)
    console.log("-------- Подключил: " + user.name + " " + user.surname);

  return user;
}

GetDeviceById = function(uid) {
  var d = Devices.findOne({id: uid});
  if (!d) 
    console.log("-------- Такого устройства в базе нет: " + uid);

  return d;
}
