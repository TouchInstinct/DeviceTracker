#!/bin/bash

#install node.js
brew update
brew install node

# install meteor
curl https://install.meteor.com | sh

# install forever
sudo npm install -g forever
sudo npm install -g meteorite

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
	<key>EnableGlobbing</key>
	<true/>
	<key>Label</key>
	<string>DeviceTracker-front-end</string>
	<key>ProgramArguments</key>
	<array>
		<string>~/.local/DeviceTracker/start.sh</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
	<key>OnDemand</key>
	<true/>
</dict>
</plist>
EOF

touch ~/.local/DeviceTracker/start.sh
chmod +x ~/.local/DeviceTracker/start.sh
tee ~/.local/DeviceTracker/start.sh > /dev/null <<'EOF'
#!/bin/bash
export MONGO_URL="mongodb://localhost:27017/meteor"
export ROOT_URL="http://192.168.1.5"
export PORT=3000
export PATH=/usr/local/bin/:$PATH
cd ~/.local/DeviceTracker
forever start main.js
EOF

launchctl unload ~/Library/LaunchAgents/DeviceTracker-front-end.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/DeviceTracker-front-end.plist 2>/dev/null
launchctl start DeviceTracker-front-end
