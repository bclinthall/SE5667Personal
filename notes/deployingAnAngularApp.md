`ng serve` builds the app and starts a server for it.  By default
the server listens on port 4200, and can be accessed at `localhost:4200`.
To put something on the web behind a nginx reverse proxy, you need 
to be able to tell the angular app the public host and port from which 
it can be accessed, like this:
```
ng serve --port 3000 --public-host https://cs.5667.ml
```
It is particular about only being accessible from the url given as the
public-host. There's got to be a way to make it more flexible to allow
an options `www` for example.
