//Библиотеки на сенсоры DHT температура и влажность
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

//Библиотеки на сенсоры освещенности
#include "BH1750.h"
#include "Wire.h"


//датчик воды
#define waterSensor A6
//датчик влажности
#define humiditySensor A1
//Библиотека на MQ2 датчик газа
#include <MQUnifiedsensor.h>
/************************Hardware Related Macros************************************/
#define         Board                   ("Arduino MEGA")
#define         Pin                     (A0)  //Analog input 3 of your arduino
/***********************Software Related Macros************************************/
#define         Type                    ("MQ-2") //MQ2
#define         Voltage_Resolution      (5)
#define         ADC_Bit_Resolution      (10) // For arduino UNO/MEGA/NANO
#define         RatioMQ2CleanAir        (9.83) //RS / R0 = 9.83 ppm 

/*****************************Globals***********************************************/
MQUnifiedsensor MQ2(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, Type);
/*****************************Globals***********************************************/

//Определение пинов датчиков температуры
#define DHTPINout 15 //22 outside
#define DHTPINinHome 22  //11 Home
#define DHTPINinGarage 24  //11 Garage  


//Определение датчиков температуры
#define DHTTYPE11    DHT11     // DHT 11
#define DHTTYPE22    DHT22     // DHT 22 (AM2302)


//Инициализация датчиков
DHT_Unified dhtOutside(DHTPINout, DHTTYPE22);
DHT_Unified dhtInHome(DHTPINinHome, DHTTYPE11);
DHT_Unified dhtInGarage(DHTPINinGarage, DHTTYPE11);

//Определение датчиков освещенности
BH1750 lightMeter(0x23);

//Задержка
uint32_t delayMS;



void setup() {

  //Init the serial port communication - to debug the library
  Serial.begin(9600);

  //Set math model to calculate the PPM concentration and the value of constants
  MQ2.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ2.setA(574.25); MQ2.setB(-2.222); // Configurate the ecuation values to get LPG concentration
  /*
    Exponential regression:
    Gas    | a      | b
    H2     | 987.99 | -2.162
    LPG    | 574.25 | -2.222
    CO     | 36974  | -3.109
    Alcohol| 3616.1 | -2.675
    Propane| 658.71 | -2.168
  */


  MQ2.init();



  Serial.print("Calibrating please wait.");
  float calcR0 = 0;
  for (int i = 1; i <= 10; i ++)
  {
    MQ2.update(); // Update data, the arduino will be read the voltage on the analog pin
    calcR0 += MQ2.calibrate(RatioMQ2CleanAir);
    Serial.print(".");
  }
  MQ2.setR0(calcR0 / 10);
  Serial.println("  done!.");

  if (isinf(calcR0)) {
    Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply");
    while (1);
  }
  if (calcR0 == 0) {
    Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply");
    while (1);
  }
  /*****************************  MQ CAlibration ********************************************/

  MQ2.serialDebug(true);

  //Инициализация подключения датчиков освещенности


  Wire.begin();
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println(F("BH1750 Advanced begin"));
  }
  else {
    Serial.println(F("Error initialising BH1750"));
  }


  //Инициализация датчиков температуры
  dhtOutside.begin();
  dhtInGarage.begin();
  dhtInHome.begin();

  sensor_t sensor;
  dhtOutside.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor outside"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));
  // Print humidity sensor details.
  dhtOutside.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor outside"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
  Serial.println(F("------------------------------------"));


  dhtInHome.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor in home"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));
  // Print humidity sensor details.
  dhtInHome.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor in home"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
  Serial.println(F("------------------------------------"));


  dhtInGarage.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor in garage"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("°C"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("°C"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("°C"));
  Serial.println(F("------------------------------------"));
  // Print humidity sensor details.
  dhtInGarage.humidity().getSensor(&sensor);
  Serial.println(F("Humidity Sensor in garage"));
  Serial.print  (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print  (F("Driver Ver:  ")); Serial.println(sensor.version);
  Serial.print  (F("Unique ID:   ")); Serial.println(sensor.sensor_id);
  Serial.print  (F("Max Value:   ")); Serial.print(sensor.max_value); Serial.println(F("%"));
  Serial.print  (F("Min Value:   ")); Serial.print(sensor.min_value); Serial.println(F("%"));
  Serial.print  (F("Resolution:  ")); Serial.print(sensor.resolution); Serial.println(F("%"));
  Serial.println(F("------------------------------------"));
  //Установка задержки между считываниями
  delayMS = sensor.min_delay / 1000;
}

int error_counter_1_a = 0;
int error_counter_2_a = 0;
int error_counter_1_b = 0;
int error_counter_2_b = 0;

void loop() {
  //Задержка между измерениями
  delay(1000);

  // Получение температуры с датчиков
  sensors_event_t event;
  dhtInHome.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    Serial.print(F("Temperature in home: "));
    Serial.print(event.temperature);
    Serial.println(F("°C"));
  }

  dhtInGarage.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    Serial.print(F("Temperature in garage: "));
    Serial.print(event.temperature);
    Serial.println(F("°C"));
  }

  dhtOutside.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    Serial.print(F("Temperature outside: "));
    Serial.print(event.temperature);
    Serial.println(F("°C"));
  }
  // Получение влажности с датчиков
  dhtInHome.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity in home: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
  }

  dhtInGarage.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity in garage: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
  }

  dhtOutside.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity Outside: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
  }

  //Вывод с датчика газа
  MQ2.update(); // Update data, the arduino will be read the voltage on the analog pin
  MQ2.readSensor(); // Sensor will read PPM concentration using the model and a and b values setted before or in the setup
  MQ2.serialDebug(); // Will print the table on the serial port

  //Вывод инфы с датчиков освещенности
  if (lightMeter.measurementReady()) {
    float lux = lightMeter.readLightLevel();
    Serial.print("Light: ");
    Serial.print(lux);
    Serial.println(" lx");
  }
  //Считывание данных с датчика воды
  Serial.print("Наличие воды: ");
  Serial.println(analogRead(waterSensor));

  //Считываем данные с датчика влажности
  Serial.print("Сухость почвы: ");
  Serial.println(analogRead(humiditySensor));
}
