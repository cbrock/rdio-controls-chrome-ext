rdio-controls-chrome-ext
========================

A Google Chrome extension for playing and pausing rdio.com playback

**Notes**
* This project uses ES6 syntax because... well, because I can :) [Babel](http://babeljs.io/) is used to compile the source down to Chrome-compatible [UMD](https://github.com/umdjs/umd)
* [Crockford's JSCS presets](https://github.com/jscs-dev/node-jscs/blob/master/presets/crockford.json) (_slightly_ modified) are used, for no other reason than I wanted to give them a try

**Installation**
* `git clone` the repo locally
* Run `npm install` to install dependencies
* Run `grunt` to compile the source and copy assets to `dist`
* To install the Chrome extension locally, [follow the steps in the Chrome developers' guide](https://developer.chrome.com/extensions/getstarted#unpacked), and point Chrome to the root of your cloned repo.

> Icons made by <a href="http://www.elegantthemes.com" title="Elegant Themes">Elegant Themes</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a>
