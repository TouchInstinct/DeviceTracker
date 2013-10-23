Session.set("session_devices_type", "iPhone/iPod");

// ----------
Template.devices_list.device = function () {
  return Devices.find({device_type : Session.get("session_devices_type")}, {sort: {checkin_date: -1}});
};

Template.devices_list.get_name_by_id = function () {
  var owner = Users.findOne({_id: this.owner_id});
  if (!owner) return "Не задано";
  return owner.name + " " + owner.surname;
};
// ----------

// ----------
Template.check_device_type.type = function () {
  return Devices_Type.find();
};

Template.check_device_type.events = {
  'click' : function () {
    Session.set("session_devices_type", this.type_name);
  }
};

Template.check_device_type.can_be_active = function () {
  return Session.equals("session_devices_type", this.type_name) ? "active" : "";
};
// ----------

