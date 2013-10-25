DeviceTracker
=============

Для установки клиента на Mac OS X:
curl https://raw.github.com/TouchInstinct/DeviceTracker/master/install_MacOSX.sh > install.sh && sh ./install.sh 192.168.1.5

Для запуска front-end потребуется:
1. nodejs (0.10.21)
2. meteor
3. forever (npm install forever -g)

Для запуска meteor-проекта:
1. Перейти в папку meteor-проекта
2. meteor bundle bundle.tar.gz
3. Распаковать этот архив на сервере
4. Перейти в эту папку
5. export MONGO_URL="mongodb://localhost:27017/meteor"
6. export ROOT_URL="http://192.168.1.5"
7. export PORT=3000
8. forever main.js
