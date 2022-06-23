# Welcome to InsureX backend server!

## GitHub Repositories

Backend:
https://github.com/vrcorpru/InsureX_backend

Frontend:
https://github.com/vrcorpru/InsureX_client

## For install backend server:

1. Create Amazon AWS EC2 instance(s) and configure it.

Install and configure it by default ubuntu user or change configuration:

Create Public/private key pair to access server from SSH on port 22.

3. Install Ubuntu Server 20.0+ and all security and critical updates.

4. Configure access to Amazon instances from SSH.

Example key pair access from ssh:

> ssh -i "InsureX.pem" ubuntu@ec2-44-200-240-61.compute-1.amazonaws.com

> ssh -i "InsureX.pem" ubuntu@ec2-54-211-135-79.compute-1.amazonaws.com

6. Configure security and network access in Amazon AWS EC2.

if you need use ports less when 1024, run it:

> sudo apt-get install libcap2-bin
> 
> sudo setcap cap_net_bind_service=+ep readlink -f \`which node\`

6. Install PM2 to run server as service in systemctl:

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04-ru

8. Install GLOBAL Node.js, NPM, NVM, cross-env, nodemon package services:

sudo apt-get update

sudo apt-get install npm
sudo apt-get install yarn

nvm install node

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

npm install nodemon -g

9. Install EN-EL locale.

We need 3 locales to install:

> ru_RU

> ru_RU.iso88595

> ru_RU.utf8

For install run this:

> locale -a # show installed locales

> sudo apt-get install language-pack-en

> sudo update-locale

7. Install and check PostgreSQL Database Server (on base backend server or separately):

Changing postgresql password: https://chartio.com/resources/tutorials/how-to-set-the-default-user-password-in-postgresql/

Configure PostgreSQL ports: https://stackoverflow.com/questions/17838613/open-port-in-ubuntu

Install and configure InsureX database, database roles and users from database scripts.

Check access to InsureX database:

sudo -u postgres -i
psql
\c InsureX

If you need it, open PostgreSQL ports (as 5432), and install pgAdmin for use access to database.

8. Create your web server folder structure and git clone.

9. Initialize Amazon EC2 instance snapsots & backups (optional)

10. Configure backend web server.

Run
npm install
in created folder InsureX_server structure

See config.js file for change configuration parameters.

11. Generate Swagger API documentation:

Run 
npm run swagger-autogen-test
npm run swagger-autogen

12. Running server instance.

npm run start-test
npm run start

13. Use pm2 utility to run server as service.


14. Enable Redis server if needed:

Install Docker as service.

Run
sudo docker-compose up
in InsureX_server folder.

This creates a Docker container with a Redis server running on port 6379 by default.

Change Redis security parameters if needed.

Enable session and redis sections in config.js to use Redis and Socket.io server.

15. Old server (v.1) placed in InsureX_server_old folder.

To run this use npm install first, and than node index.js in his folder.

16. Old admin interface placed in Admin_panel branch


17. Postman queries placed in Postman_queries folder.


18. Database scripts and backups placed in InsureX_database folder.

## Performance recommendations:

- Do not use a long queries, etc. POST and PATCH queries can be blocked and works incorrectly if this is not optimized!
- Do not extend large objects (use model._extend() methods accurately)!
- Use routers separately!
- Use Google Drive routers maximum separately!
- Use business logic separately!

