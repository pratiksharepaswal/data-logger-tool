# data_logger_tool
It's a data logger tool which logs user clickstreams in database and this project can be hosted on many computers over the same wifi.

## Technologies used
Project is created with:
* Node.js 
* Javascript
* HTML & CSS 
* MongoDB Compass 
* Express.js

## Setup
### MongoDB Compass
* Download and install MongoDB Compass v4.2.2
* Now create new folders 'data' and 'db' in C drive as
```bash
C:\data\db
```
* Now, Copy the path of bin folder of MongoDB as shown below and add this path to the Environmental Variables and click ok
```bash
C:\Program Files\MongoDB\Server\4.2\bin 
```
* Now open your command prompt and write 'mongod' command and press enter.
* Without closing the previous cmd, open another cmd and write 'mongo' command and press enter.
* Now restart your Computer and open a new cmd and write 'mongo' command and press enter and your server will start.
* Now open your MongoDB Compass.

### Node.js
* Now install Node.js, and Clone this repository in your system.
* now open this project in visual studio code and install all dependencies mentioned in 'package.json' using command:
```bash
$ npm install
```
* Now run the code using:
```bash
$ npm start
# Or run with Nodemon
$ npm run dev
```
```bash
# Visit http://localhost:8000
```
### Database
In MongoDb Compass, a 'test' named database will be created where every user clickstream data will be saved along with the message.
