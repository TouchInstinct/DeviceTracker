Meteor.startup(function () {

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
