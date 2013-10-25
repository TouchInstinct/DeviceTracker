#!/bin/bash

#install node.js
brew update
brew install node

# install meteor
curl https://install.meteor.com | sh

# install forever
npm install forever -g
npm install -g meteorite

git clone https://github.com/TouchInstinct/DeviceTracker.git
cd DeviceTracker/front-end/meteor-device-spy

mrt add reststop2
mrt add bootstrap-3

meteor bundle DeviceTracker.tar.gz

rm -rf ~/.local/DeviceTrackerls 
tar -zxf DeviceTracker.tar.gz -C ~/.local
mv ~/.local/bundle ~/.local/DeviceTracker
cd ~/.local/DeviceTracker


# autoload
touch ~/Library/LaunchAgents/DeviceTracker-front-end.plist
tee ~/Library/LaunchAgents/DeviceTracker-front-end.plist > /dev/null <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Label</key>
	<string>DeviceTracker-front-end</string>
	<key>ProgramArguments</key>
	<array>
		<string>/usr/local/bin/startDeviceTracker-front-end.sh</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
	<key>OnDemand</key>
	<true/>
</dict>
</plist>
EOF

sudo touch /usr/local/bin/startDeviceTracker-front-end.sh
sudo chmod +x /usr/local/bin/startDeviceTracker-front-end.sh
sudo tee /usr/local/bin/startDeviceTracker-front-end.sh > /dev/null <<'EOF'
#!/bin/bash
export MONGO_URL="mongodb://localhost:27017/meteor"
export ROOT_URL="http://mac10.touchin.ru"
export PORT=3000
cd ~/.local/DeviceTracker
forever main.js &
EOF

launchctl unload ~/Library/LaunchAgents/DeviceTracker-front-end.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/DeviceTracker-front-end.plist 2>/dev/null
launchctl start DeviceTracker-front-end
