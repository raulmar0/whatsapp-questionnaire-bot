const { LocalAuth } = require('whatsapp-web.js');

class User {
  constructor(phone, lastStep) {
    this.lastStep = lastStep;
    this.phone = phone;
  }
}

let users = [];

const getUser = (phone) => {
  currentUser = users.find((user) => user.phone === phone);
  console.log('getUser()', currentUser);
  return currentUser;
};

const isNewUser = (phone) => {
  for (user of users) {
    if (user.phone === phone) {
      return false;
    }
  }
  return true;
};

const getPlatformConfig = (platform) => {
  if(platform === 'headless-arm') {
    let config = {
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ["--no-sandbox"],
        executablePath: "/usr/bin/chromium",
      },
    };
    return config
  } 

  if(platform === 'headless-x86') {
    let config = {
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ["--no-sandbox"],
      },
    };
    return config
  } 

  if(platform === 'headful-arm-x86') {
    let config = {
      authStrategy: new LocalAuth(),
    };
    return config
  } 
}

module.exports = { User, users, getUser, isNewUser, getPlatformConfig };