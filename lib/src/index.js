const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
let { User, users, getUser, isNewUser, getPlatformConfig } = require('./utils')

class WhatsappQuestionnnaireBot {
  constructor(
    questions, 
    country_code, 
    number, 
    successString, 
    errorString,
    platform
    ) {
    this.questions = questions;
    this.country_code = country_code;
    this.number = number;
    this.successString = successString;
    this.errorString = errorString;
    this.platform = platform;
    this.initBot()
  }

  initBot(){ 

    // Initialization process
    const client = new Client(getPlatformConfig(this.platform));
    
    
    client.initialize();
    
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
      console.log("Client is ready!");
    
      setTimeout(() => {
        let chatId = `${this.country_code}${this.number}@c.us`;
          client.sendMessage(chatId, this.successString).then((response) => {
              if (response.id.fromMe) {
                  console.log("Pam is ready to work");
              }
          })
      }, 5000);
    
    });
    
    
    // Diagram resolving logic
    client.on('message', message => {
      if(message.body === 'easteregg'){
        client.sendMessage(message.from, '¯\_( ͠• ͜ʖ ͡•)_/¯');
        return
      }
    
      message.body = message.body.toLowerCase()
    
      // When is a new user, we add it to a "register" of users
      // and we display the first question
      if (isNewUser(message.from)) {
        users.push(new User(message.from, 'init'));
        client.sendMessage(message.from, this.questions[0].content);
        return;
      }
      
      currentUser = getUser(message.from);
    
      // 1. We take the last keyword registered by the user
      let lastQuestionKeyword = currentUser.lastStep;
      // 2. We search the whole question from questions.js
      let lastQuestion = this.questions.find(
        (question) => question.keyword === lastQuestionKeyword
      );
      // 3. We find a match of the received msg in the options of the question
      let answerMatchObj = lastQuestion.options.find((option) => Object.keys(option)[0] === message.body) || 'not found';
      let answerMatchKeyword = Object.values(answerMatchObj)[0];
    
      if (answerMatchObj === 'not found') {
        client.sendMessage(message.from, this.errorString)
      }
    
      // 4. We search a match of the match's keyword on questions.js
      let nextQuestion = this.questions.find(
        (question) => question.keyword === answerMatchKeyword
      );
    
      client.sendMessage(message.from, nextQuestion.content);
      currentUser.lastStep = nextQuestion.keyword;
    
    });

  }
} 

module.exports = {
  WhatsappQuestionnnaireBot
};


