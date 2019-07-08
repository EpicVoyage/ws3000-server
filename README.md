# ws3000-server
Provides an HTTP interface for the [EpicVoyage/ambientweather-ws3000](https://github.com/EpicVoyage/ambientweather-ws3000) USB driver

# Usage
```
http://[hostname-or-ip]:8080/[sensor-id]
```

Ex. http://192.168.0.100:8080/2

```json
{"active":true,"temperature":"26.3","humidity":52}
```

# Raspbian Quickstart
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install npm git build-essential libusb libusb-dev
git clone git@github.com:EpicVoyage/ws3000-server.git
cd ws3000-server
npm install
sudo cp 69-stmicro.rules /etc/udev/rules.d/
```

Copy the contents of `crontab.txt` into crontab:

```bash
crontab -e
```

Reboot.
