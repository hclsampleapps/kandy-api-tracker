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

1. Double click on the **kandy-api-tracker/bin/index.html** file to open it in your system's default browser

### Execute commands for development

1. Setup repository via `git clone https://github.com/hclsampleapps/kandy-api-tracker`
2. Resolve build dependency via `npm install` that would require latest **node.js** on dev system
3. Generate final build via `node build.js` & open *bin/index.html* file in browser 

### Important note

1. As of now, after every changes in js files, `node build.js` command has to be executed to re-build project
2. Opening the *src/index.html* won't work properly because necessary js files won't get loaded, so always open it via *bin/index.html*
3. The app would work without any http-server, just by opening *bin/index.html* file in browser

### Branching strategy

We are following **GitFlow** as the branching strategy and for release management.

The central repo holds two main branches with an infinite lifetime:

- master
- develop

The `master` branch at origin should be familiar to every Git user. Parallel to the `master` branch, another branch exists called `develop`.

We consider `origin/master` to be the main branch where the source code of HEAD always reflects a *production-ready* state.

We consider `origin/develop` to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release.

#### Supporting branches 

Next to the main branches `master` and `develop`, our development model uses a variety of supporting branches to aid parallel development between team members.

The different types of branches we may use are:

- Feature branches
- Release branches
- Hotfix branches

### Contributing

Fork the repository. Then, run:

```
git clone --recursive git@github.com:<username>/gitflow.git
cd kandy-api-tracker
git branch master origin/master
git flow init -d
git checkout develop
git flow feature start <your feature>
```

Then, do work and commit your changes. When your `feature` is completed, raise the pull-request against `develop`.

To know more about *GitFlow*, please refer

- [Introducing GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

### Coding conventions

Contributors should strictly follow these conventions:

1. File names are in lowercase
2. Id allocated to any html tags are in lowercase
3. Variable names are in camelCase
4. Class names are in PascalCase


Before tracking for API , User have to fill the following details for all preference controls as mentioned below : 

### Account
- Base URL
- Account Client ID
- User Email
- Password

### SMS
- SMS text
- Sender Address - in E164 format
- Receiver Address - in E164 format

### Chat
- Chat text
- Receiver primary contact ID

### Presence
- Set Status Presence for any user
- Presentity user primary contact ID

### Address Book 
- Primary contact ID of the user
- First Name
- Last Name
- User's Email Address
- Business Phone Number
- Home Phone Number
- Buddy
- Contact ID (should be unique ID)
- Search by First Name 

### Voice/Audio 
- Account Client ID
- End User's Email 
- Password
- Receiver's primary contact ID in SIP format (sip:janedoe@domain.com)

### 2FA
- For SMS verification, provide any valid contact number to receive the OTP
- For Email verification, provide any valid user's email ID to receive the OTP
