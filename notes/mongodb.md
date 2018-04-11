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
Remember, the schema was defined with key: value pairs. You can use an object as the value. That object will be key value pairs. Use a `default` key to include a function that generates a default value.

### Modifiers
Include `get` or `set` key with a function value to modify stuff on set or get.

For the getter modifiers, must enable them using  
`Schema.set('toJSON', {getters: true});` 

### Virtuals
If you want a fullName field, then you don't actually need a real field, make it a virtual field.

### Indexes
You can enforce uniqueness of a field with `unique: true`

You can make a secondary index with `index: true`

### Defining custom model methods
Use static methods like `fineOneByUsername`. The model class acts like a database. Custom CRUD methods like `findOneByUsername` should be static model methods. A model instance is like a record. Authentication and validation methods should be model instance methods.

### Validation
There are predefined validators. Like `required` which takes a boolean or `match` which takes a regex, or `enum` which takes an array.

#### Custom validation
You can use the `validate` key. It takes an array. FIrst item in array: a function that returns a boolean. Second item: error message if function returns `false`.

### Mongoose middleware
They execute some code before or after a mongoose operation (`init`, `validate`, `save`, `remove`).

 
### Mongoose ref fields
A field in a mongoose model can be of type Schema.ObjectId. Include a ref field specifying which schema/model to use. Ex:
```
author: {
    type: Schema.ObjectId,
    ref: 'User'
}
```
You can then assign an instance of `User` to the author field. You dont have to find the user's id.

When retrieving the object, you need to tell it to fetch in the data from the User table.
```
Post.find().populate('author').exec((err, posts) => {...});
```



