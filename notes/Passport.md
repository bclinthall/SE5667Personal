# Passport
Passport is an Node.js module that handles authentication. It allows various authentication strategies (locally or using social media).



Like with the other external Node.js modules we use, we will want a config file for passport. 
We will tell the config file how to create a passport instance just like we want. Then we will require the config file and create the instance in the server file.

Middlewares configure the express application. They should be registered with Express in thexpress config file. 
We want passport to do some stuff while routes are being handled, so we need to regisert its middlewares with express.


## Passport strategies

There are Node.js modules for the different Passport strategies.

It's good practice to give each strategy its own config file.
