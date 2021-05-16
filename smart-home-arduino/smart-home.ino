#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include "BH1750FVI.h"
#include "Wire.h"
#include <MQUnifiedsensor.h>

#define waterSensor A6
#define humiditySensor A1
#define Board ("Arduino MEGA")
#define Pin (A0) //Analog input 3 of your arduino
#define Type ("MQ-2") //MQ2
#define Voltage_Resolution (5)
#define ADC_Bit_Resolution (10) // For arduino UNO/MEGA/NANO
#define RatioMQ2CleanAir (9.83) //RS / R0 = 9.83 ppm

#define DHTPINout A15 //Определение пинов датчиков температуры 22 outside
#define DHTPINinHome 22 //11 Home
#define DHTPINinGarage 24 //11 Garage  
#define DHTTYPE11 DHT11 //Определение датчиков температуры DHT 11
#define DHTTYPE22 DHT22 // DHT 22 (AM2302)

#define RELAY1 33 //Инициализация реле
#define RELAY2 32
#define RELAY3 35
#define RELAY4 34
#define RELAY5 37
#define RELAY6 36
#define RELAY7 39
#define RELAY8 38
#define RELAY9 41
#define RELAY10 40
#define RELAY11 43
#define RELAY12 42
#define RELAY13 45
#define RELAY14 44
#define RELAY15 47
#define RELAY16 46

DHT_Unified dhtOutside(DHTPINout, DHTTYPE22); //Инициализация датчиков
DHT_Unified dhtInHome(DHTPINinHome, DHTTYPE11);
DHT_Unified dhtInGarage(DHTPINinGarage, DHTTYPE11);
MQUnifiedsensor MQ2(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, Type);

BH1750FVI lightMeterF(13,0x23,BH1750FVI::k_DevModeContHighRes); //Определение датчиков освещенности
BH1750FVI lightMeterS(13,0x5C,BH1750FVI::k_DevModeContHighRes);

String controlData = "";
bool isAutoLight1 = true;
bool isAutoLight2 = true;
int autoLightMin1 = 14;
int autoLightMin2 = 14;
int autoLightMax1 = 50;
int autoLightMax2 = 50;
String lightPort1 = "firstFloorLight";
String lightPort2 = "secondFloorLight";
bool isAutoPumping = true;
int autoPumpMin = 50;
int autoPumpMax = 100;
String pumpingPort = "waterPump";
bool isAutoWatering = true;
int autoWateringMin = 350;
int autoWateringMax = 1000;
String wateringPort = "waterFlap";

int gasTimerValue = 0;
int gasTimerMax = 6;
int waterTimerValue = 0;
int waterTimerMax = 6;
int humidityTimerValue = 0;
int humidityTimerMax = 6;
bool isGasAlert = false;
bool isWaterAlert = false;
bool isHumidityAlert = false;

bool isGasAutoAlert = true;
bool isWaterAutoAlert = true;
bool isHumidityAutoAlert = true;

int gasAlertMax = 50;
int gasAlertMin = 1;
int waterAlertMax = 100;
int waterAlertMin = 1;
int humidityAlertMax = 1000;
int humidityAlertMin = 350;

uint32_t delayMS; //Задержка
int error_counter_1_a = 0;
int error_counter_2_a = 0;
int error_counter_1_b = 0;
int error_counter_2_b = 0;

void setup() {

Serial.begin(9600);
MQ2.setRegressionMethod(1);
MQ2.setA(574.25); MQ2.setB(-2.222);
MQ2.init();
float calcR0 = 0;
for (int i = 1; i <= 10; i ++)
{
MQ2.update();
calcR0 += MQ2.calibrate(RatioMQ2CleanAir);
}
MQ2.setR0(calcR0 / 10);
if (isinf(calcR0)) {
Serial.println("Warning: Conection issue founded, R0 is infite (Open circuit detected) please check your wiring and supply");
while (1);
}
if (calcR0 == 0) {
Serial.println("Warning: Conection issue founded, R0 is zero (Analog pin with short circuit to ground) please check your wiring and supply");
while (1);
}
MQ2.serialDebug(true);

Wire.begin(); //Инициализация подключения датчиков освещенности
lightMeterF.begin();
lightMeterS.begin();

dhtOutside.begin(); //Инициализация датчиков температуры
dhtInGarage.begin();
dhtInHome.begin();

sensor_t sensor;
delayMS = sensor.min_delay / 1000;

pinMode(RELAY1, OUTPUT);
pinMode(RELAY2, OUTPUT);
pinMode(RELAY3, OUTPUT);
pinMode(RELAY4, OUTPUT);
pinMode(RELAY5, OUTPUT);
pinMode(RELAY6, OUTPUT);
pinMode(RELAY7, OUTPUT);
pinMode(RELAY8, OUTPUT);
pinMode(RELAY9, OUTPUT);
pinMode(RELAY10, OUTPUT);
pinMode(RELAY11, OUTPUT);
pinMode(RELAY12, OUTPUT);
pinMode(RELAY13, OUTPUT);
pinMode(RELAY14, OUTPUT);
pinMode(RELAY15, OUTPUT);
pinMode(RELAY16, OUTPUT);

digitalWrite(RELAY1, HIGH);
digitalWrite(RELAY2, HIGH);
digitalWrite(RELAY3, HIGH);
digitalWrite(RELAY4, HIGH);
digitalWrite(RELAY5, HIGH);
digitalWrite(RELAY6, HIGH);
digitalWrite(RELAY7, HIGH);
digitalWrite(RELAY8, HIGH);
digitalWrite(RELAY9, HIGH);
digitalWrite(RELAY10, HIGH);
digitalWrite(RELAY11, HIGH);
digitalWrite(RELAY12, HIGH);
digitalWrite(RELAY13, HIGH);
digitalWrite(RELAY14, HIGH);
digitalWrite(RELAY15, HIGH);
digitalWrite(RELAY16, HIGH);
}

bool check = false;
void loop() {
//Задержка между измерениями
delay(1000);
generateOutString();
readSerialPort();
}

void readSerialPort() {

String port = "";
String value = "";
bool isVal = false;
if(Serial.available() > 0) {
controlData = Serial.readString();
Serial.println(controlData);
for(int counter = 0;counter<controlData.length();counter++){
if(String(controlData[counter])!=":"&&String(controlData[counter])!=";"&&String(controlData[counter])!=" "&&String(controlData[counter])!="}"&&String(controlData[counter])!="{"&&String(controlData[counter])!="("&&String(controlData[counter])!=")"){
if(!isVal){port = port + controlData[counter];}
else {value = value + controlData[counter];}
}
if(String(controlData[counter])==":"){isVal=true;}
if(String(controlData[counter])==";"||counter==controlData.length()-1){relayController(port,value);port="";value="";isVal=false;Serial.println("разпаршено");}

      }
    }

}

void relayController(String port, String value){
if(value=="true")
value = "1";
if(value == "false")
value="0";
if(port=="garageLight1"){
relaySwitch(RELAY15, value.toInt(), port);
}
else
if(port=="garageLight2"){
relaySwitch(RELAY16, value.toInt(), port);
}
else
if(port=="firstFloorLight1"){
relaySwitch(RELAY1, value.toInt(), port);
}
else
if(port=="firstFloorLight2"){
relaySwitch(RELAY2, value.toInt(), port);
}
else
if(port=="firstFloorLight3"){
relaySwitch(RELAY3, value.toInt(), port);
}
else
if(port=="firstFloorLight4"){
relaySwitch(RELAY4, value.toInt(), port);
}
else
if(port=="secondFloorLight1"){
relaySwitch(RELAY5, value.toInt(), port);
}
else
if(port=="secondFloorLight2"){
relaySwitch(RELAY11, value.toInt(), port);
}
else
if(port=="secondFloorLight3"){
relaySwitch(RELAY12, value.toInt(), port);
}
else
if(port=="secondFloorLight4"){
relaySwitch(RELAY13, value.toInt(), port);
}
else
if(port=="outsideLight1"){
relaySwitch(RELAY6, value.toInt(), port);
}
else
if(port=="outsideLight2"){
relaySwitch(RELAY14, value.toInt(), port);
}
else
if(port=="waterPump"){
relaySwitch(RELAY10, value.toInt(), port);
}
else
if(port=="waterFlap"){
relaySwitch(RELAY8, value.toInt(), port);
}
else
if(port=="firstFloorLight"){
relayController("firstFloorLight1", value);
relayController("firstFloorLight2", value);
relayController("firstFloorLight3", value);
relayController("firstFloorLight4", value);
}
else
if(port=="secondFloorLight"){
relayController("secondFloorLight1", value);
relayController("secondFloorLight2", value);
relayController("secondFloorLight3", value);
relayController("secondFloorLight4", value);
}
else
if(port=="outsideLight"){
relayController("outsideLight1", value);
relayController("outsideLight2", value);
}
else
if(port=="garageLight"){
relayController("garageLight1", value);
relayController("garageLight2", value);
}
else
if(port=="allLight"){
relayController("firstFloorLight1", value);
relayController("firstFloorLight2", value);
relayController("firstFloorLight3", value);
relayController("firstFloorLight4", value);
relayController("secondFloorLight1", value);
relayController("secondFloorLight2", value);
relayController("secondFloorLight3", value);
relayController("secondFloorLight4", value);
relayController("outsideLight1", value);
relayController("outsideLight2", value);
relayController("garageLight1", value);
relayController("garageLight2", value);
}
else
if(port=="isAutoLight1"){
if(value=="1")isAutoLight1=true;
if(value=="0")isAutoLight1=false;
}
else
if(port=="isAutoLight2"){
if(value=="1")isAutoLight2=true;
if(value=="0")isAutoLight2=false;
}
else
if(port=="autoLightOn1"){
autoLightMin1 = value.toInt();
}
else
if(port=="autoLightOn2"){
autoLightMin2 = value.toInt();
}
else
if(port=="autoLightOff1"){
autoLightMax1 = value.toInt();
}
else
if(port=="autoLightOff2"){
autoLightMax2 = value.toInt();
}
else
if(port=="isAutoPumping"){
if(value=="1")isAutoPumping=true;
if(value=="0")isAutoPumping=false;
}
else
if(port=="pumpingStartVal"){
autoPumpMax = value.toInt();
}
else
if(port=="pumpingStopVal"){
autoPumpMin = value.toInt();
}
else
if(port=="isAutoWatering"){
if(value=="1")isAutoWatering=true;
if(value=="0")isAutoWatering=false;
}
else
if(port=="wateringStopVal"){
autoWateringMin = value.toInt();
}
else
if(port=="wateringStartVal"){
autoWateringMax = value.toInt();
}
else
if(port=="gasAlertStartVal"){
gasAlertMax = value.toInt();
}
else
if(port=="gasAlertStopVal"){
gasAlertMin = value.toInt();
}
else
if(port=="waterAlertStartVal"){
waterAlertMax = value.toInt();
}
else
if(port=="waterAlertStopVal"){
waterAlertMin = value.toInt();
}
else
if(port=="humidityAlertStartVal"){
humidityAlertMax = value.toInt();
}
else
if(port=="humidityAlertStopVal"){
humidityAlertMin = value.toInt();
}
else
if(port=="gasAlert"){
if(value=="1")isGasAutoAlert=true;
if(value=="0")isGasAutoAlert=false;
}
else
if(port=="waterAlert"){
if(value=="1")isWaterAutoAlert=true;
if(value=="0")isWaterAutoAlert=false;
}
else
if(port=="humidityAlert"){
if(value=="1")isHumidityAutoAlert=true;
if(value=="0")isHumidityAutoAlert=false;
}
else
if(port=="gasAlertDelay"){
gasTimerMax = value.toInt();
}
else
if(port=="waterAlertDelay"){
waterTimerMax = value.toInt();
}
else
if(port=="humidityAlertDelay"){
humidityTimerMax = value.toInt();
}
else
if(port=="setLightPort1"){
lightPort1 = value;
}
else
if(port=="setLightPort2"){
lightPort2 = value;
}
else
if(port=="setWateringPort"){
wateringPort = value;
}
else
if(port=="setPumpingPort"){
pumpingPort = value;
}
else
{sendError(1);}
}

void relaySwitch(uint8_t port,int value, String portName){
if(value==0){
if(digitalRead(port)==LOW){
digitalWrite(port, HIGH);
String output = "{'datatype':'change', '"+portName+"': "+value+"}";
char a = (char)34;
output.replace("'",String(a));
Serial.println(output);
}
}
else
if(value==1){
if(digitalRead(port)==HIGH){
digitalWrite(port, LOW);
String output = "{'datatype':'change', '"+portName+"': "+value+"}";
char a = (char)34;
output.replace("'",String(a));
Serial.println(output);
}
}
else
sendError(1);
}

void generateOutString(){
String outputData = "{'datatype':'data', ";
sensors_event_t event;

outputData = outputData+getDHTdata(dhtInHome,"hth",event);
outputData = outputData+", "+getDHTdata(dhtInGarage,"gth",event);
outputData = outputData+", "+getDHTdata(dhtOutside,"oth",event);
outputData = outputData+", "+getMQ2data(MQ2,"gas");
outputData = outputData+", "+getLightMeterData(lightMeterF,"lightr1",1);
outputData = outputData+", "+getLightMeterData(lightMeterS,"lightr2",2);
outputData = outputData+", "+getWaterSensorData("water");
outputData = outputData+", "+getHumiditySensorData("humidity");
outputData = outputData+"}";
char a = (char)34;
outputData.replace("'",String(a));
Serial.println(outputData);
}

String getDHTdata(DHT_Unified dht,String dataName,sensors_event_t event){
String outData = "'"+dataName+"':{'temperature': ";
dht.temperature().getEvent(&event);
if (isnan(event.temperature)) {
outData = outData+"-1000, ";
}
else {
outData = outData+String(event.temperature)+", ";
}
outData = outData + "'humidity': ";
dht.humidity().getEvent(&event);
if (isnan(event.relative_humidity)) {
outData = outData+"-1000 ";
}
else {
outData = outData+String(event.relative_humidity);
}
outData = outData+"}";
return outData;
}

String getMQ2data(MQUnifiedsensor mq2,String dataName){
mq2.update();
float gasProcent = mq2.readSensor()/10000;
String outData = "'"+dataName+"': "+String(gasProcent);
if(isGasAutoAlert){
isGasAlert = alert("gas",gasAlertMax,gasAlertMin,gasProcent,isGasAlert);
gasTimerValue=sendWarnings("gas", gasTimerValue, gasTimerMax, isGasAlert);
}
else{
gasTimerValue=0;}
return outData;
}

String getLightMeterData(BH1750FVI lightMeter,String dataName,int sensorNumber){
//if (lightMeter.measurementReady()) {
float lux = lightMeter.GetLightIntensity();
String outData = "'"+dataName+"': "+String(lux);
if(sensorNumber ==1){
autoSystem(isAutoLight1,autoLightMin1,autoLightMax1,lightPort1,lux,false);
}
if(sensorNumber ==2){
autoSystem(isAutoLight2,autoLightMin2,autoLightMax2,lightPort2,lux,false);
}
return outData;
//}
// else
//return "{ light: -1000 }";
}

String getWaterSensorData(String dataName){
String outData = "'"+dataName+"': "+String(analogRead(waterSensor));
autoSystem(isAutoPumping,autoPumpMin,autoPumpMax,pumpingPort,analogRead(waterSensor),true);
if(isWaterAutoAlert){
isWaterAlert = alert("water",waterAlertMax,waterAlertMin,analogRead(waterSensor),isWaterAlert);
waterTimerValue=sendWarnings("water", waterTimerValue, waterTimerMax, isWaterAlert);
}
else{
waterTimerValue=0;}
return outData;
}

String getHumiditySensorData(String dataName){
String outData = "'"+dataName+"': "+String(analogRead(humiditySensor));
autoSystem(isAutoWatering,autoWateringMax,autoWateringMin,wateringPort,analogRead(humiditySensor),true);
if(isHumidityAutoAlert){
isHumidityAlert = alert("humidity",humidityAlertMax,humidityAlertMin,analogRead(humiditySensor),isHumidityAlert);
humidityTimerValue=sendWarnings("humidity", humidityTimerValue, humidityTimerMax, isHumidityAlert);
}
else{
humidityTimerValue=0;}  
 return outData;
}

void autoSystem(bool isAutomatic,int turnOnValue,int turnOffValue,String port,float currentValue,bool isIn){
if(isIn){
if(isAutomatic==true){
if(currentValue>turnOnValue){
relayController(port,"1");
}
if(currentValue<turnOffValue){
relayController(port,"0");
}  
 }
}
else{
if(isAutomatic==true){
if(currentValue<turnOnValue){
relayController(port,"1");
}
if(currentValue>turnOffValue){
relayController(port,"0");
}  
 }
}
}

void sendError(int typeOfError){
if(typeOfError==1)
Serial.println("errorReadingData");
}

bool alert(String alertType, int startValue,int stopValue,float currentValue,bool isAlert){
if(!isAlert){
if(currentValue>startValue){
isAlert = true;
if(alertType=="gas"){
sendToSerial("{'datatype': 'alert', 'type': 'alert', 'message':'Внимание! Обнаружена утечка газа'}");
}
if(alertType=="water"){
sendToSerial("{'datatype': 'alert', 'type': 'alert', 'message':'Внимание! Обнаружено затопление водой'}");
}
if(alertType=="humidity"){
sendToSerial("{'datatype': 'alert', 'type': 'alert', 'message':'Внимание! Почва высохла'}");
}
if(alertType=="temperature"){
sendToSerial("{'datatype': 'alert', 'type': 'alert', 'message':'Внимание! Температура выше нормы'}");
}  
 }
}
if(isAlert){  
 if(currentValue<stopValue){
isAlert = false;
if(alertType=="gas"){
sendToSerial("{'datatype': 'alert', 'type': 'message', 'message':'Утечка газа устранена!'}");
}
if(alertType=="water"){
sendToSerial("{'datatype': 'alert', 'type': 'message', 'message':'Затопление водой устранено!'}");
}
if(alertType=="humidity"){
sendToSerial("{'datatype': 'alert', 'type': 'message', 'message':'Почва успешно полита!'}");
}
}  
 }
return isAlert;
}

int sendWarnings(String alertType, int timerValue, int timerMax, bool isAlert){
if(isAlert){
if(timerValue>=timerMax){
timerValue=0;
if(alertType=="gas"){
sendToSerial("{'datatype': 'alert', 'type': 'warning', 'message':'Утечка газа все еще не устранена!'}");
}
if(alertType=="water"){
sendToSerial("{'datatype': 'alert', 'type': 'warning', 'message':'Затопление водой все еще не устранено!'}");
}
if(alertType=="humidity"){
sendToSerial("{'datatype': 'alert', 'type': 'warning', 'message':'Почва все еще не полита!'}");
}

    return timerValue;

}
else{
return timerValue+1;
}
}
else{
return 0;
}
}

void sendToSerial(String data){

char a = (char)34;
data.replace("'",String(a));
Serial.println(data);

}