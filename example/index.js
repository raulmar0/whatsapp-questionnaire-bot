require('dotenv').config()
const { WhatsappQuestionnnaireBot } = require('whatsapp-questionnaire-bot');
const { questions, errorString, successString } = require('./questions');

// Environment variables
const country_code = process.env.COUNTRY_CODE;
const number = process.env.NUMBER;

const questionnaire = new WhatsappQuestionnnaireBot(questions, country_code, number, successString, errorString,'headful-arm-x86')