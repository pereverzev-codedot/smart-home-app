# COMMANDS FOR ARDUINO

use true/false or 1-0 commands for bool,
and other

# firstFloorLight1-4

bool, on/off first floor light

# secondFloorLight1-4

bool, on/off sec floor light

# garageLight1-2

# outsideLight1-2

Without numbers - for all floor or block

# waterPump - насос

# waterFlap - клапан

# allLight - весь свет

**automatic system commands**

# isAutoLight1-2

включать ли автоматом **При остановке автоматики свет и реле не переключаются!!!**

# autoLightOn1-2

пороговые значения датчика освещенности для **включения** автосвета

# autoLightOff1-2

пороговые значения для **вЫключения** авосвета

# isAutoPumping

автоматом сосать воду?

# pumpingStartVal

пороговое значение датчика воды для начала откачки (большее)

# pumpingStopVal

пороговое значение для прекращения/остановки откачки (меньшее)

# isAutoWatering

автоматически ли поливать?

# wateringStartVal

пороговое значение датчика влажности земли для включения полива (большее)

# wateringStopVal

пороговое значение для выключения полива (меньшее)

**alert commands**

# gasAlertStartVal

значение датчика газа для включения оповещения об утечке **Т.с. для waterAlert и для humidityAlert**

# gasAlertStopVal

значение датчика газа для выключения оповещения об утечке **Т.с. для waterAlert и для humidityAlert**

# gasAlert

bool включать ли оповещения газа

# waterAlert

bool включать ли оповещения утечки воды

# humidityAlert

bool включать ли оповещения сухости

# \_\_\_AlertDelay (gas or water or humidity)

задержка перед высылками WARNING

**set port commands)))))))))))**

# setLightPort1

введите сюда название общей команды для выполнения вместо автовключения света в первой комнате

# setLightPort2

введите сюда название общей команды для выполнения вместо автовключения света во второй комнате

# setWateringPort

введите сюда название общей команды для выполнения вместо открытия клапана автополива

# setPumpingPort

введите сюда название общей команды для выполнения вместо автооткачки воды
