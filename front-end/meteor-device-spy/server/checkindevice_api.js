Meteor.startup(function () {

  RESTstop.add('checkindevice/:param', function () {
    var param = this.params.param;    

    var mac = param.substring(0, 12);
    var uid = param.substring(13);
    console.log("Запрос api-метода checkindevice: MAC = " + mac + ", UID = " + uid);
    
    var user = GetUserByMAC(mac);
    if (!user) 
      return "Can't find such MAC-addreses";

    var device = GetDeviceById(uid);
    if (!device)
      return "Can't find such device-ID";

    console.log("-------- Устройство: ", device.name);

    Devices.update(device._id, {$set: {checkin_date: new Date(), owner_id: user._id}});
  });

});
