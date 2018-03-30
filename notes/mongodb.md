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


