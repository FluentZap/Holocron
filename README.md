# Holocron

### Design Goals

Building the definitive Star Wars: Edge of the Empire companion app.

### Technologies used
* React and Reach-Router for front end routing and navigation
* State controlled by Redux using middleware SignalR WebSocket Calls
* Backend was done in C# using MySQL and EF core for data management
* SignalR is used for websocket connections injected into Redux middleware for real time database updates

<p align="center">
  <img width="40%" src="https://github.com/FluentZap/Holocron/blob/master/Readme/Login.png?raw=true" />
  <img width=40%" src="https://github.com/FluentZap/Holocron/blob/master/Readme/MainMenu.png?raw=true" />
</p>

### User authentication and Updates

User authentication is done by Username and Password. The client is then issued a login token generated by the backend and synced with the unique SignalR connection id that is stored in MySQL database. When an update is triggered for a user or group, the backend will check with the current connections and issue updates to those affected.

<p align="center">
  <img src="https://github.com/FluentZap/Holocron/blob/master/Readme/CreatorList.png?raw=true" width="32%" />
  <img src="https://github.com/FluentZap/Holocron/blob/master/Readme/CreatorCareer.png?raw=true" width="32%" />
  <img src="https://github.com/FluentZap/Holocron/blob/master/Readme/CreatorStats.png?raw=true" width="32%" />
</p>

### Realtime database with a MySQL provider

Holocron features simultaneous multiuser access, and real-time updates for all connected clients.
That means you can create a character, buy/sell equipment, upgrade stats on your laptop and the see the characters roster card update on your phone.
This system also allows for real-time games sessions without waiting for a client side polling system to fetch the updates.


### Dynamic load from XML Datasets for owners of Edge of the Empire Rulebooks

There is a wonderful application created and maintained by OggDude. Holocron can load datasets from the OggDude Character Creator.
