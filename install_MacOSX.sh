#!/bin/bash

if [ ! $# == 1 ]; then
	echo "Не задан адрес сервера";
	exit 1;
fi

curl -# -o libusb-1.0.dylib https://raw.github.com/TouchInstinct/DeviceTracker/master/binary/libusb-1.0.dylib
curl -# -o LibUsbDotNet.dll https://raw.github.com/TouchInstinct/DeviceTracker/master/binary/LibUsbDotNet.dll
curl -# -o UsbPhoneTracker.dll https://raw.github.com/TouchInstinct/DeviceTracker/master/binary/UsbPhoneTracker.dll
curl -# -o UsbPhoneTracker.Mac.exe https://raw.github.com/TouchInstinct/DeviceTracker/master/binary/UsbPhoneTracker.Mac.exe

if [ ! -e /usr/local/bin/DeviceTracker ]; then
	sudo mkdir /usr/local/bin/DeviceTracker
fi
sudo cp UsbPhoneTracker.Mac.exe /usr/local/bin/DeviceTracker
sudo cp libusb-1.0.dylib /usr/local/bin/DeviceTracker
sudo cp LibUsbDotNet.dll /usr/local/bin/DeviceTracker
sudo cp UsbPhoneTracker.dll /usr/local/bin/DeviceTracker

sudo touch /Library/LaunchDaemons/DeviceTracker.plist
sudo tee /Library/LaunchDaemons/DeviceTracker.plist > /dev/null <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>KeepAlive</key>
		<true/>
	<key>Label</key>
  		<string>DeviceTracker</string>
  	<key>ProgramArguments</key>
  		<array>
			<string>/usr/local/bin/DeviceTracker/DeviceTracker.sh</string>
		</array>
	<key>RunAtLoad</key>
		<true/>
</dict>
</plist>
EOF

sudo touch /usr/local/bin/DeviceTracker/DeviceTracker.sh
sudo chmod +x /usr/local/bin/DeviceTracker/DeviceTracker.sh
sudo tee /usr/local/bin/DeviceTracker/DeviceTracker.sh > /dev/null <<'EOF'
	cd /usr/local/bin/DeviceTracker
	mono UsbPhoneTracker.Mac.exe $1
EOF

sudo launchctl unload /LaunchDaemons/LaunchDaemons/DeviceTracker.plist 2>> /dev/null
sudo launchctl load /Library/LaunchDaemons/DeviceTracker.plist 2>> /dev/null
sudo launchctl start DeviceTracker

rm libusb-1.0.dylib
rm LibUsbDotNet.dll
rm UsbPhoneTracker.dll
rm UsbPhoneTracker.Mac.exe
rm $0
