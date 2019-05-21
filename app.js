const Alexa = require('ask-sdk-core');

//Default Launching Behavior for the Skill
const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput){
        const speakOutput = 'Welcome to Let\'s Rehearse';

        return handlerInput.responseBuilder(speakOutput).getResponse();
    },
}

const SaveSceneHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'NewSceneIntent';
    },
    handle(handlerInput){
        const speech = "Please read off the scene that you would like to store, ";

    }
}

const RehearseSceneHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'RehearseIntent';
    },
    handle(handlerInput){

    }
}

const HearSceneHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'ReviewSceneIntent';
    },
    handle(handlerInput){

    }
}

const DeleteSceneHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'DeleteSceneIntent';
    },
    handle(handlerInput){

    }
}

const EditSceneHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === "EditSceneIntent";
    },
    handle(handlerInput){

    }
}

//Request to end the session handler
const SessionEndedRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    
        return handlerInput.responseBuilder.getResponse();
    },
}

//Catch all for errors and everything that gets missed by the rest of the handlers
const ErrorHandler = {
    canHandle(handlerInput){
        return true;
    },
    handle(handlerInput, error){
        console.log('ERROR MESSAGE: $(error.message)');
        console.log(error.trace);
        return handlerInput.responseBuilder.speak('Sorry I can\'t understand the command. Please say again.');
    },
}

//adding all of the methods
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lamda();
