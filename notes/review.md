register a route with the app in `config/express.js`. 

In the route, require the controller, and assign a method from the 
controller to handle some http request. It must be a method that takes
a request and response object. It can optionally take a third `next` param.

In that method in the controller, decide what to do based on the request
object and attach your reponse to the response object.
