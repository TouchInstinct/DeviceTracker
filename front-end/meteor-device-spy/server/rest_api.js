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
    
    mac = mac.toUpperCase();
    var user = Users.findOne({MAC: mac});
    if (!user) {

      mac = mac.toLowerCase();
      user = Users.findOne({MAC: mac});
      if (!user)
        return res+" Can't find such MAC-address in db";
        return "Can't find such MAC-address in db";

    }

    var d = Devices.findOne({id: uid});
    if (!d) return "Can't find such device";

    var checkin_time = GetCurrentDateAndTime ();
    Devices.update(d._id, {$set: {checkin_date: checkin_time, owner_id: user._id}});
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