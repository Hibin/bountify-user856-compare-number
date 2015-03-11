# bountify-user856-compare-number

https://bountify.co/script-to-compare-number-and-append-value

First you need to install NodeJS and NPM:

There is 2 ways:

    sudo apt-get instal nodejs npm

or following this guide

    https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server

After installing NodeJS and NPM download color.js and package.json to a new directory

    git clone https://github.com/Hibin/bountify-user856-color.git

open terminal with this directory

    cd bountify-user856-compare-number

and run:
  
    npm install
  
This will install all the dependencies.

Then

    chmod 755 compare.js

Now you are ready to run the main script as follows:

    ./compare.js /path/to/target/directory /path/to/target/file.txt
 
 