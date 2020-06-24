# online-todo
This is an API that covers all neded for an online todo list 
where you will be able to have multiple channels, users into the channels,
create invitations to new users, authentification, permissions and personal invitations for each channel

# config

depending on the ENV you choose this have a different config, which can be modified in the server > config folder, if you want to run the dev config you must have mongodb running

```mongodb
mongod
```

for prod introduce on the .env file the TOKEN and mongodb string connection

## Run the project

This is an express server so you must have node install
On the package.json you have to set the node_ENV as dev or prod

```node env
SET NODE_ENV=dev
```

then just 
```start
npm start
```

