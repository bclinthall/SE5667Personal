Design goals: 

1.  support 'simple horizontal scaling' while sustaining durability. 
Horizontal scaling: increase db capacity by adding more machines.
2. support web app dev with JSON outputs.

mongodb is almost as queryable as relational databases.

Solves query performance by indexing.

MongoDb index.  Not sure, but it looks like its data structure in which all values of a property serve as keys to lists of records with that property value.

Replica sets: like backups. One is primary and in charge of writes. The others can be read from. If the primary is unavailable for 10 seconds, a secondary becomes primary.  When the primary comes back online, it will be a secondary.

MongoDb horizontal scaling = sharding. 
Sharding splits the data among machines or shards. Each shard functions as a separate db.

Several shards make a logical db. Operations on it are performed through "query router" services that route operations to the appropriate shards.

## Running
sudo service mongod start
sudo service mongod stop

### CRUD

#### Read 
Two kinds of `or` query. 
'''
db.posts.find({ "user": { $in: ["alice", "bob"] } })
'''

'''
db.posts.find( { $or: [{ "user": "alice" }, { "user": "bob" }] })
'''

#### Update
`db.collection.remove(<query>)` removes documents from a collection.

`db.collection.drop()` removes the collection.


`db.collection.remove(<query>, bool justOne)` .

## Mongoose
`const mongoose = require('mongoose');`
Construct a schema: `MySchema = mongoose.Schema({key1: String, ...});`
Use the schema to register a model `mongoose.model('User, MySchema');`

* Define schemas and register models in a model file. 
* require the model file in the mongoose config file.
* call the config file in the server file.

The express setup follows a similar pattern.
* The server file calls the config file. 
* The config file requires the routes file (and passes it the app)
* The route requires the controller.

When we're implementing CRUD methods, the workflow goes like this:
1. Export a middleware from a controller. The middleware should send a status and some json to the `res` response object. 
2. Define and export and route param methods you need from the controller.
3. Register a route for your method so that you can get the json via a rest call.
4. Register any route param methods you need on the app from the routes file.

### READ
A mongoose model has a `find` method, it takes parametes to filter and specify which fields are required.

#### Route parameters
'''
Route path: /users/:userId/books/:bookId 
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
'''
https://expressjs.com/en/guide/routing.html#route-parameters

If you need to do some something whenever a parameter is included in a request URL you can do that by registering it like this `app.param(':userId', function(req, res, next, val){...})` where `val` is the value of the param. It can be useful to attach some information to the `req` object in this method.
https://expressjs.com/en/api.html
Of course, you can also just give a reference to a callback function with the appropriate params. Best practice is to export the callback from a controller and register the param callback with the routes.
 
### Update
Use different http request methods with same routes for different behavior. get reads, post creates, PUT updates. POST and PUT come with data. You can send post requests with extra data from command line like this: \\
curl -X PUT -H "Content-Type: application/json" -d '{"lastName": "Updated"}' localhost:3000/users/[id]

### Delete
An instance of a mongoose model has a remove method.

## Extending a Mongoose schema

### Default Values
Include in schema/model document.

