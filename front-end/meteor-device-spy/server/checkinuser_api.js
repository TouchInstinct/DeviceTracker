Meteor.startup(function () {

	RESTstop.add('checkinuser/:mac', function () {
		var mac = this.params.mac;
		console.log("Запрос api-метода checkinuser: MAC = " + mac);

		var user = GetUserByMAC(mac);
		if (!user)
			return "Can't find such MAC-addreses";
	});

});
