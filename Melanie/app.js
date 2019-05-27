const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput){
        const speakOutput = 'Welcome to Randomizer Utility';

        return handlerInput.responseBuilder(speakOutput).getResponse();
    },
}

const RandomRollHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
        && handlerInput.requestEnvelope.request.intent.name ==='RandomRollIntent'
    },
    handle(handlerInput){
        var variableRolls = handlerInput.requestEnvelope.request.intent.slots.NumberofDie.value;
        var dieType = handlerInput.requestEnvelope.request.intent.slots.dieType.value;

        var allRolls;
        var totalCount = 0;
        for (let index = 0; index < variableRolls; index++) {
            var roll = Math.floor(Math.random() * dieType);
            allRolls.push(roll);
            totalCount += roll;
        }

        var allRollsText = 'You rolled: ';
        for (let index = 0; index < allRolls.length; index++) {
            allRollsText += allRolls[index];

            if(index > 0 && index != allRolls.length - 1){
                allRollsText += ', ';
            }
            
        }

        allRollsText += '. For a total of ' + totalCount;
        console.log(allRollsText);

        return handlerInput.responseBuilder(allRollsText).getResponse();


    }
}

const SessionEndedRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    
        return handlerInput.responseBuilder.getResponse();
    },
}

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
        RandomRollHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lamda();