# Whatsapp bot for questionnaires

[Try it!](https://wa.me/5218135453539?text=Hola)

[![](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5218135453539?text=Hola)

This is a library for turning your diagrams into whatsapp bots in order to reach millions of people thanks to its wide adoption worldwide. 

## Common applications
- Medical pre-diagnoses
- Whatsapp price list for bussinesses
- Technical support guide bot
- Digital menus/gallery
- Your imagination is the limit

Example of medical algorithm diagram turned into whatsapp bot in order to prevent cardiovascular diseases:
![](https://raulmarfiles.blob.core.windows.net/random/latidos-por-mexico-diagrama.jpeg)

## Technical information

The foundation of the logic of the script is the structure of the `questions.js` file. Because every time the bot receives a message, it registers the user and looks for the last node he was in, then it compares the options of the next possible nodes with the received message to know which is the next step.

- Built on whatsapp-web.js (for preventing bans)
- Easy to configure
- Puppeteer based
- Run anywhere
- Node and npm required

<img style="width: 200px; margin: 0 auto;" src="https://raulmarfiles.blob.core.windows.net/random/whatsapp-bot-in-action.gif">

## Getting Started

1. Install the library
``` bash
npm i whatsapp-questionnaire-bot
```

2. Add `index.js` to the root of the project 

3. Inside `index.js` configure the library
```js
const { WhatsappQuestionnnaireBot } = require('whatsapp-questionnaire-bot');

// Consult the example questions file at "./example/questions.js" for the structure
const { questions } = require('./questions');

// This will appear when entering a non-existing option (the ** turn bold the messages)
const errorString = '*Please type the letter of the desired option. Example: a*'

// This will be the first message you receive when client is ready
const successString = 'Hi, I am online'

const country_code = 'XXX'; // 521 for Mexico
const number = 'XXXXXXXXXX'; // phone number
const platform = 'headful-arm-x86' // other: 'headless-arm' for rpi or arm cloud machines or 'headless-x86' for remote servers

const questionnaire = new WhatsappQuestionnnaireBot(
  questions, // array of obj (specific structure)
  country_code,
  number,
  successString,
  errorString,
  platform,
)
```

4. Question structure example
```js
// question.content needs to be strictly unindented for good formating in whatsapp
// The first keyword needs to be stricly 'init'
// Each object is a node in the diagram
// Each object has an unique keyword for identification 
// Each object has an options array with the letters to be match in order to reach the next (keyword) option

const questions = [
  {
    keyword: 'init',
    content: `
*Hi there! How can I help you?*
*Please type the letter of the desired option. Example: a*

ℹ️ Information
🅰️ Locations
🅱️ Opening hours
    `,
    options: [
      {i: 'information'},
      {a: 'locations'},
    ]
  },
  {
    keyword: 'information',
    content: `
*Visit the website*
*www.raulmar.me*

🅰️ Main menu
    `,
    options: [
      {a: 'init'},
    ]
  },
  {
    keyword: 'locations',
    content: `
*Locations*
*Monterrey, MX*
*Lyon, FR*

🅰️ Main menu
    `,
    options: [
      {a: 'init'},
    ]
  },
  ...
]
```

5. For headless systems (rpi os lite, cloud vm, remote servers) install the following packages
```bash
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

```

6. Install dependencies
```bash
npm i
```

In case you get an error regarding the chromium installation install it manually

``` bash
sudo apt install chromium
```

7. Run it!

For development:
```bash
# start
node index.js

# stop
ctrl + c
```

For production (daemon):

- Install pm2:
```
npm i pm2 --save
```

```bash
# start
npx pm2 start index.js

# stop
npx pm2 delete all
```

6. Scan the QR from the terminal and chat!