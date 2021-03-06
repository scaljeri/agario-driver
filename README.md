## AGAR.IO Driver [![Build Status](https://travis-ci.org/scaljeri/agario-driver.svg?branch=master)](https://travis-ci.org/scaljeri/agario-driver) [![Code Climate](https://codeclimate.com/github/scaljeri/agario-driver/badges/gpa.svg)](https://codeclimate.com/github/scaljeri/agario-driver) [![Coverage Status](https://coveralls.io/repos/github/scaljeri/agario-driver/badge.svg?branch=master)](https://coveralls.io/github/scaljeri/agario-driver?branch=master) [![Dependency Status](https://david-dm.org/scaljeri/agario-driver.svg)](https://david-dm.org/scaljeri/agario-driver) [![devDependency Status](https://david-dm.org/scaljeri/agario-driver/dev-status.svg)](https://david-dm.org/scaljeri/agario-driver#info=devDependencies)

[![Join the chat at https://gitter.im/scaljeri/agario-driver](https://badges.gitter.im/scaljeri/agario-driver.svg)](https://gitter.im/scaljeri/agario-driver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The goal of this project is twofold:

    1) Manage the environment for an agar.io bot game play
        * Facebook login
        * black and white and low res setup
        * Start/stop the game  (restart on game-over)
        * Shared libraries for agar.io bots in general
    2) A bot implementation

The basis for endless bot play :)

## Project status
Currently the focus is on image processing. After that a bot will be built. 

## Setup

    $> git clone https://github.com/scaljeri/agario-driver.git
    $> cd agario-driver
    $> npm install
    $> npm run bundle
    
## Testing
All code is tested except for the page objects. To run the tests do

    $> npm test
    
To checkout the code-coverage report 

    $> open coverage/lcov-report/index.html
    
## Commandline arguments
There are many command-line-options available which I will explain below

### --facebook
Before using this option make sure you have a file called `facebook.json`. This
JSON file holds your facebook credentials and should look like the following

    {
        username: "bar"
        password: "foo123"
    }
    
and the CLI
    
    $> ./driver.js --facebook

### [--snapshots=output_dir]
This option enables you to take screenshots while playing the game manually

    $> ./driver.js --snapshots
    
Hit `t` to take a snapshot which will be written into the `./snapshots` folder.
If you would like to change the output directory 

    $> ./driver.js --snapshots ./screenshots

If the directory does not exists it will be create for you.
These screenshots can be used to test and improve your bot if necessary.

### [--dry=image_file]
As a bot developer you can use this option to test your bot against a specific snapshot. Although
the response from the bot is written to the console, the whole analysis is also written to image.
For example, if the input image was `img.png`, the analysed version is `img-proc.png`. Note that
you have to use `--bot` to incorporate the results from the bot!

    $> ./driver.js --dry=./snapshots/MdHfeD.png
    
### [--bot=[bot_file.js]
TODO





TODO ------------

## Chromedriver

is a perfect tool to control pages
like [agario](http://agar.io). In theory you can use any browser, but this project is only tested
with Chrome. Download the Chromedriver from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

TODO: Run the executable or is there more ????

## Bundle


Because Webdriver is used to control the page, but the javascript doing all the hard work gets injected 
into the page to boost performance (Webdriver is so extremely slow!)

The code inside `bundle.js` is the code that does the smart stuff, image processing and moving
the bot. The bundle is created as follows:

    $> npm run bundle
    
which is equivalent to

    $> browserify -t [ babelify --presets [ es2015 ] ] src/index.js -o bundle.js
    
## Run tests

Tu run the unit tests 

    $> npm test
    
which is equivalent to

    $> ./node_modules/.bin/mocha --compilers js:babel-core/register --harmony
    
This command uses the `.babelrc` file in order to compile ES2015 to ES5

## Facebook

If you like the bot can play using you Facebook account. For this to work you can provide you
credentials in a file called `facebook.json`. Example file:

    {
        "username": "my-name@facebook.com",
        "password": "my-password"
    }
    
## Snapshots

    $> ./bot.js --facebook --snapshots=./snapshots
    
    
## Manual load bundle

First start a webserver in the root of the project. For example

    $> python -m SimpleHTTPServer
    
Next, open the console and enter the following code

    console> $.getScript('http://localhost:8000/bundle.js')
    
TODO: Start the bot


Open the console of Chrome and enter the f

## Bookmarks

  * https://github.com/agariohack/agario-hack: Fake mouse movement
  
a=document.getElementById("canvas"),b=this.onkeydown,c=this.onkeyup,d=a.onmousemove,e=a.width/2,f=a.height/2,this.onkeydown=function(g){b(g),83!=g.keyCode||(e=-100000),68!=g.keyCode||(f=100000),69!=g.keyCode||(f=-100000),70!=g.keyCode||(e=100000),d({clientX:e,clientY:f})},this.onkeyup=function(g){c(g),83!=g.keyCode||(e=a.width/2),68!=g.keyCode||(f=a.height/2),69!=g.keyCode||(f=a.height/2),70!=g.keyCode||(e=a.width/2),d({clientX:e,clientY:f})},a.onmousemove=null,alert("You're ready to play Agar.io with ESDF!");

let okd =  window.onkeydown; window.onkeydown = (e) => {console.log('down:' + e.keyCode);okd({keyCode: e.keyCode === 32 ? 32 : 87});}
let oku =  window.onkeyup; window.onkeyup = (e) => { console.log('up:' + e.keyCode);oku({keyCode: e.keyCode === 32 ? 32 : 87});}

### agarly.com - Play it like a PRO
Although agar.io is a great game, [agarly](http://agarly.com) is a variant of this game with a lot of
action and a lot more fun. It is a game where you have to be fast and trick your opponents all the time. 
Maybe in the far future I'll write a bot for this game too, but until then you have to do it with human-play only.
I've written a hack which enables you to shoot with any key (not **spacebar** of course). Also, if you hold down the key
shooting/splitting will continue. This way you can split/merge extremely fast! Copy-past the code below into your browser's console 
(tested in Chrome only) and you can play as a PRO!

        (function (w, x) {
             let timer;
     
             function isVisible(elm) {
                 return !(!elm.offsetHeight && !elm.offsetWidth || getComputedStyle(elm).visibility === 'hidden');
             }
     
             document.getElementById('nick').value = 'tEaM eXtreMe++';
     
             function fireEvent(node, eventName) {
                 let doc = node.ownerDocument,
                     event = doc.createEvent('MouseEvents');
     
                 event.initEvent(eventName, true, true);
                 event.synthetic = true;
                 node.dispatchEvent(event, true);
             }
     
             let start = document.getElementById('PlayImage'),
                 playAgain = document.getElementById('statsContinue');
     
             setInterval(() => {
                 if (isVisible(start)) {
                     fireEvent(start, 'click');
                 }
     
                 if (isVisible(playAgain)) {
                     fireEvent(playAgain, 'click');
                     fireEvent(start, 'click');
                 }
             }, 1000);
     
             function changeKeyListeneres() {
                 let okd, oku, burst, burstForKey;
     
                 function stopBurst() {
                     clearInterval(burst);
                     burst = null;
                 }
             
                 function onKeyDown(e) {
                     if (burst && e.keyCode !== burstForKey) {
                        stopBurst(burst); 
                     }
                     
                     if (!burst) {
                         let output = 0, delay = 30;
                         burstKey = e.keyCode;
     
                         if (burstKey === 32) {
                             output = 32;delay = 100
                         } else if(burstKey === 91) {
                             output = 32;
                             delay = 100;
                         } else if (burstKey >= 65 && burstKey <= 90) {
                             output = 87;
                         }
     
                         if (output) {
                             let splitCount = 0;
     
                             burst = setInterval(() => {
                                 if (burstKey !== 91 || ++splitCount < 4) {
                                     okd({keyCode: output});
                                     oku({keyCode: output});
                                 }
                             }, delay);
                         }
                     }
                 }
     
                 if (w.onkeydown !== okd) {
                     okd = w.onkeydown;
                     w.onkeydown = onKeyDown;
     
                     oku = w.onkeyup;
                     w.onkeyup = (e) => {
                         clearInterval(burst);
                         burst = null;
                         oku({keyCode: e.keyCode === 32 ? 32 : 87});
                     };
     
                     clearInterval(timer);
                     console.log('Setup is ready, enjoy playing!!!');
                     
                     x(document).mousedown.forEach(listener=> {
                        listener.remove();
                     });
                     
                     x(document).click.forEach(listener=> {
                        listener.remove();
                     });
                 }
             }
     
             timer = setInterval(() => {
                 if (window.onkeydown) {
                     changeKeyListeneres();
                 }
             }, 500);
     
             // Prevent new tab with spam
             /*
             document.querySelector('#canvas').addEventListener('mouseup mousedown', (e) => {
                 e.stopImmediatePropagation();
                 e.stopPropagation();
                 e.preventDefault();
             });
             */
         })(window, getEventListeners);

[Minified/Uglified](https://babeljs.io/repl/#?babili=true&evaluate=true&lineWrap=true&presets=es2015%2Ces2015-loose%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&targets=&browsers=&builtIns=false&code=%20%20%20(function%20(w%2C%20x)%20%7B%0A%20%20%20%20%20%20%20%20let%20timer%3B%0A%0A%20%20%20%20%20%20%20%20function%20isVisible(elm)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20!(!elm.offsetHeight%20%26%26%20!elm.offsetWidth%20%7C%7C%20getComputedStyle(elm).visibility%20%3D%3D%3D%20'hidden')%3B%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20document.getElementById('nick').value%20%3D%20'tEaM%20eXtreMe%2B%2B'%3B%0A%0A%20%20%20%20%20%20%20%20function%20fireEvent(node%2C%20eventName)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20doc%20%3D%20node.ownerDocument%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20event%20%3D%20doc.createEvent('MouseEvents')%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20event.initEvent(eventName%2C%20true%2C%20true)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20event.synthetic%20%3D%20true%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20node.dispatchEvent(event%2C%20true)%3B%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20let%20start%20%3D%20document.getElementById('PlayImage')%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20playAgain%20%3D%20document.getElementById('statsContinue')%3B%0A%0A%20%20%20%20%20%20%20%20setInterval(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(isVisible(start))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fireEvent(start%2C%20'click')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(isVisible(playAgain))%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fireEvent(playAgain%2C%20'click')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fireEvent(start%2C%20'click')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%201000)%3B%0A%0A%20%20%20%20%20%20%20%20function%20changeKeyListeneres()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20let%20okd%2C%20oku%2C%20burst%2C%20burstForKey%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20stopBurst()%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(burst)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20burst%20%3D%20null%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20function%20onKeyDown(e)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(burst%20%26%26%20e.keyCode%20!%3D%3D%20burstForKey)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20stopBurst(burst)%3B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(!burst)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20output%20%3D%200%2C%20delay%20%3D%2030%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20burstKey%20%3D%20e.keyCode%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(burstKey%20%3D%3D%3D%2032)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20output%20%3D%2032%3Bdelay%20%3D%20100%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if(burstKey%20%3D%3D%3D%2091)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20output%20%3D%2032%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20delay%20%3D%20100%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20if%20(burstKey%20%3E%3D%2065%20%26%26%20burstKey%20%3C%3D%2090)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20output%20%3D%2087%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(output)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20let%20splitCount%20%3D%200%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20burst%20%3D%20setInterval(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20if%20(burstKey%20!%3D%3D%2091%20%7C%7C%20%2B%2BsplitCount%20%3C%204)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20okd(%7BkeyCode%3A%20output%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20oku(%7BkeyCode%3A%20output%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20delay)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(w.onkeydown%20!%3D%3D%20okd)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20okd%20%3D%20w.onkeydown%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20w.onkeydown%20%3D%20onKeyDown%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20oku%20%3D%20w.onkeyup%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20w.onkeyup%20%3D%20(e)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(burst)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20burst%20%3D%20null%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20oku(%7BkeyCode%3A%20e.keyCode%20%3D%3D%3D%2032%20%3F%2032%20%3A%2087%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clearInterval(timer)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20console.log('Setup%20is%20ready%2C%20enjoy%20playing!!!')%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20x(document).mousedown.forEach(listener%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20listener.remove()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20x(document).click.forEach(listener%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20listener.remove()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20timer%20%3D%20setInterval(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(window.onkeydown)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20changeKeyListeneres()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%20500)%3B%0A%0A%20%20%20%20%20%20%20%20%2F%2F%20Prevent%20new%20tab%20with%20spam%0A%20%20%20%20%20%20%20%20%2F*%0A%20%20%20%20%20%20%20%20document.querySelector('%23canvas').addEventListener('mouseup%20mousedown'%2C%20(e)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20e.stopImmediatePropagation()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20e.stopPropagation()%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20e.preventDefault()%3B%0A%20%20%20%20%20%20%20%20%7D)%3B%0A%20%20%20%20%20%20%20%20*%2F%0A%20%20%20%20%7D)(window%2C%20getEventListeners)%3B)

    'use strict';(function(a,b){function c(j){return(j.offsetHeight||j.offsetWidth)&&'hidden'!==getComputedStyle(j).visibility}function d(j,k){var l=j.ownerDocument,m=l.createEvent('MouseEvents');m.initEvent(k,!0,!0),m.synthetic=!0,j.dispatchEvent(m,!0)}function f(){function j(){clearInterval(n),n=null}var l,m,n,o;a.onkeydown!==l&&(l=a.onkeydown,a.onkeydown=function(p){if(n&&p.keyCode!==o&&j(n),!n){var q=0,r=30;if(burstKey=p.keyCode,32===burstKey?(q=32,r=100):91===burstKey?(q=32,r=100):65<=burstKey&&90>=burstKey&&(q=87),q){var s=0;n=setInterval(function(){(91!==burstKey||4>++s)&&(l({keyCode:q}),m({keyCode:q}))},r)}}},m=a.onkeyup,a.onkeyup=function(p){clearInterval(n),n=null,m({keyCode:32===p.keyCode?32:87})},clearInterval(g),console.log('Setup is ready, enjoy playing!!!'),b(document).mousedown.forEach(function(p){p.remove()}),b(document).click.forEach(function(p){p.remove()}))}var g;document.getElementById('nick').value='tEaM eXtreMe++';var h=document.getElementById('PlayImage'),i=document.getElementById('statsContinue');setInterval(function(){c(h)&&d(h,'click'),c(i)&&(d(i,'click'),d(h,'click'))},1e3),g=setInterval(function(){window.onkeydown&&f()},500)})(window,getEventListeners);

    
IMPORTANT: If you see a cell with the name `teAm eXtreMe++` it most likely will be me - please don't eat me!!!

You can find me in this room: [http://agarly.com/k2ByX](http://agarly.com/k2ByX) or you can goto [http://agarly.com](http://agarly.com) and 
checkout the room first. If it turns out it is not a vary active one, hit reload and you will most likely get in an other room!
