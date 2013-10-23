Meteor.startup(function () {

  if (Devices_Type.find().count() == 0) {
    Devices_Type.insert({type_name: "iPhone/iPod"});
    Devices_Type.insert({type_name: "iPad"});
    Devices_Type.insert({type_name: "Android Phones"});
    Devices_Type.insert({type_name: "Android Tablets"});
  };

  RESTstop.configure({use_auth: false});

  RESTstop.add('checkin/:param', function () {
    var param = this.params.param;    

    var mac = param.substring(0, 12);
    var uid = param.substring(13);
    console.log("Пришел запрос: MAC = " + mac + ", UID = " + uid);
    
    var user = GetUserByMAC(mac);
    if (!user) 
      return "Can't find such MAC-addreses";

    var device = GetDeviceById(uid);
    if (!device)
      return "Can't find such device-ID";

    console.log("-------- Устройство: ", device.name);

    var checkinDate = GetCurrentDateAndTime ();
    Devices.update(device._id, {$set: {checkin_date: checkinDate, owner_id: user._id}});
  });

});

function GetCurrentDateAndTime () {
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

function GetUserByMAC(mac) {
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

function GetDeviceById(uid) {
  var d = Devices.findOne({id: uid});
  if (!d) 
    console.log("-------- Такого устройства в базе нет: " + uid);

  return d;
}
