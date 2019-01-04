# Kandy API Tracker 

It tracks, monitor & report the API health status of kandy.io

### Install as Chrome App

1. Open Chrome browser
2. Go to URL, [chrome://extensions/](chrome://extensions/)
3. Switch ON, *Developer mode*
4. Click on *Load unpacked* button
5. Select **kandy-api-tracker/bin** directory
6. Search *Kandy API Tracker* in Chrome Apps section on this page, verify it's presence

### Run this Chrome App

1. Open Chrome browser
2. Go to URL, [chrome://apps/](chrome://apps/)
3. Search *Kandy API Tracker*, click on it to open

### Run it as standalone page

1. Double clcik on the **kandy-api-tracker/bin/index.html** file to open it in your system's default browser

### Execute commands for development

1. Setup repository via `git clone https://dev.azure.com/kandyio/kandy-api-tracker/_git/kandy-api-tracker`
2. Resolve build dependency via `npm install` that would require latest **node.js** on dev system
3. Generate final build via `node build.js` & open *bin/index.html* file in browser 

### Important note

1. As of now, after evry changes in js files, `node build.js` command has to be executed to re-build project
2. Opening the *src/index.html* won't work properly because necessary js files won't get loaded, so always open it via *bin/index.html*
3. The app would work without any http-server, just by opening *bin/index.html* file in browser

### Branching
 * master : Our master branch
 * develop: Our development branch.
If you are contributing:
* a feature, please branch off of `develop`.
When feature is completed raised the Pull request against develop.