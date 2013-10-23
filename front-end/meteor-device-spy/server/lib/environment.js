Meteor.startup(function () {  

	RESTstop.configure({use_auth: false});

  	if (Devices_Type.find().count() == 0) {
    	Devices_Type.insert({type_name: "iPhone/iPod"});
    	Devices_Type.insert({type_name: "iPad"});
    	Devices_Type.insert({type_name: "Android Phones"});
    	Devices_Type.insert({type_name: "Android Tablets"});
  	};

});
