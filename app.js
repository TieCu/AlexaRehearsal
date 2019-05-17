const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput){
        const speakOutput = 'Welcome to Let\'s Rehearse';

        return handlerInput.responseBuilder(speakOutput).getResponse();
    }
}

const ErrorHandler = {
    canHandle(handlerInput){
        return true;
    },
    handle(handlerInput, error){
        console.log('ERROR MESSAGE: $(error.message)');
        console.log(error.trace);
        return handlerInput.responseBuilder.speak('Sorry I can\'t understand the command. Please say again.');
    }
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lamda();
