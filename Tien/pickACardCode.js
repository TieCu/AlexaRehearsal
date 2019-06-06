const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = "Let's get you a randomized card. Would you like one that is a specific color or would you like it to be completely random?";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const RandomCardHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
    && handlerInput.requestEnvelope.request.intent.name === 'RandomCardIntent';
  },
  handle(handlerInput) {
    const numArr = numberData;
    const typeArr = typeData;
    const numIndex = Math.floor(Math.random() * numArr.length);
    const typeIndex = Math.floor(Math.random() * typeArr.length);
    const randomCard = numArr[numIndex] + " of " + typeArr[typeIndex] + " card.";
    const speechOutput = "You got the " + randomCard;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      //.withSimpleCard(SKILL_NAME, randomCard)
      .getResponse();
  },
};

const RandomRedCardHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
    && handlerInput.requestEnvelope.request.intent.name === 'RandomRedCardIntent';
  },
  handle(handlerInput) {
    const numArr = numberData;
    const typeArr = redTypeData;
    const numIndex = Math.floor(Math.random() * numArr.length);
    const typeIndex = Math.floor(Math.random() * typeArr.length);
    const randomCard = numArr[numIndex] + " of " + typeArr[typeIndex] + " card.";
    const speechOutput = "You got the " + randomCard;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
};

const RandomBlackCardHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
    && handlerInput.requestEnvelope.request.intent.name === 'RandomBlackCardIntent';
  },
  handle(handlerInput) {
    const numArr = numberData;
    const typeArr = blackTypeData;
    const numIndex = Math.floor(Math.random() * numArr.length);
    const typeIndex = Math.floor(Math.random() * typeArr.length);
    const randomCard = numArr[numIndex] + " of " + typeArr[typeIndex] + " card.";
    const speechOutput = "You got the " + randomCard;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  }
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(error.trace);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

//Constants
const numberData = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King',
];

const typeData = [
  'Hearts',
  'Diamonds',
  'Clubs',
  'Clovers',
  ];
  
const redTypeData = [
  'Hearts',
  'Diamonds',
  ];
  
const blackTypeData = [
  'Clubs',
  'Clovers',
  ];



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    RandomCardHandler,
    RandomRedCardHandler,
    RandomBlackCardHandler,
    HelpHandler,
    CancelAndStopHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
