var Thingy = require('thingy52');
const mqtt = require('mqtt');
var connected = false;

const mqtt_options={
  clientId: '<YOUR-THING-ID>',
  username: 'thing',
  password: '<YOUR-THING-KEY>',
  clean: true,
};



console.log('Thingy:52 to tingg.io bridge');

function connectToTingg()
{
  try {
    client.on('error', function(err) {
      console.log("error");
    });

    client.on('connect', function(){
      console.log('connected to tingg.io');
      connected = true;
    });

    const client = mqtt.connect('mqtt://mqtt.tingg.io', mqtt_options);
  }catch(error)
  {
    console.log("can't connect to tingg.io - check your thing ID and thing key!");
    connected = false;
  };
}

connectToTingg();


function publishToTingg(topic, value)
{
  if(connected == false)
  {
    connectToTingg();
  }
  if(connected == true)
  {
    client.publish(topic, value);
  }

}



function onTemperatureData(temperature) {
    publishToTingg("temperature", temperature);
}

function onPressureData(pressure) {
    publishToTingg("pressure", pressure);
}

function onHumidityData(humidity) {
    publishToTingg("humidity", humidity);
}

function onGasData(gas) {
  var _co2 = gas.eco2;
  var _voc = gas.tvoc;
  publishToTingg("co2", _co2);
  publishToTingg("voc", _voc);
}

function onColorData(color) {
  publishToTingg("color", color);
}

function onButtonChange(state) {
    var _button = (state == 'Pressed');
    publishToTingg("button", _button);
}

function onDiscover(thingy) {
  console.log('Discovered: ' + thingy);

  thingy.on('disconnect', function() {
    console.log('Disconnected!');
  });

  thingy.connectAndSetUp(function(error) {
    console.log('Connected! ' + error ? error : '');

    thingy.on('temperatureNotif', onTemperatureData);
    thingy.on('pressureNotif', onPressureData);
    thingy.on('humidityNotif', onHumidityData);
    thingy.on('gasNotif', onGasData);
    thingy.on('colorNotif', onColorData);
    thingy.on('buttonNotif', onButtonChange);

    thingy.temperature_interval_set(5000, function(error) {
        if (error) {
            console.log('Temperature sensor configure! ' + error);
        }
    });
    thingy.pressure_interval_set(5000, function(error) {
        if (error) {
            console.log('Pressure sensor configure! ' + error);
        }
    });
    thingy.humidity_interval_set(5000, function(error) {
        if (error) {
            console.log('Humidity sensor configure! ' + error);
        }
    });
    thingy.color_interval_set(5000, function(error) {
        if (error) {
            console.log('Color sensor configure! ' + error);
        }
    });
    thingy.gas_mode_set(1, function(error) {
        if (error) {
            console.log('Gas sensor configure! ' + error);
        }
    });

    thingy.temperature_enable(function(error) {
        console.log('Temperature sensor started! ' + ((error) ? error : ''));
    });
    thingy.pressure_enable(function(error) {
        console.log('Pressure sensor started! ' + ((error) ? error : ''));
    });
    thingy.humidity_enable(function(error) {
        console.log('Humidity sensor started! ' + ((error) ? error : ''));
    });
    thingy.color_enable(function(error) {
        console.log('Color sensor started! ' + ((error) ? error : ''));
    });
    thingy.gas_enable(function(error) {
        console.log('Gas sensor started! ' + ((error) ? error : ''));
    });
    thingy.button_enable(function(error) {
        console.log('Button started! ' + ((error) ? error : ''));
    });
  });
}

Thingy.discover(onDiscover);
