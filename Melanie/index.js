// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome, please state the dice you want to roll';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speechText = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const RandomRollHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' 
        && handlerInput.requestEnvelope.request.intent.name ==='RandomRollIntent'
    },
    handle(handlerInput){
        var variableRolls = handlerInput.requestEnvelope.request.intent.slots.NumberofDie.value;
        var dieType = handlerInput.requestEnvelope.request.intent.slots.dieType.value;
        
        console.log(variableRolls + ", " + dieType);

        var allRolls = [];
        var totalCount = 0;
        for (let index = 0; index < variableRolls; index++) {
            var roll = Math.floor((Math.random() * dieType + 1));
            allRolls.push(roll);
            totalCount += roll;
        }

        var allRollsText = 'You rolled: ';
        for (let index = 0; index < allRolls.length; index++) {
            allRollsText += allRolls[index];

            if(index !== allRolls.length - 1){
                allRollsText += ', ';
            }
            
        }
        
        console.log(allRolls);

        allRollsText += '. For a total of ' + totalCount;
        console.log(allRollsText);

        return handlerInput.responseBuilder.speak(allRollsText).getResponse();


    }
};
const StatRollHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'StatRollIntent'
    },
    handle(handlerInput){
        var rollType = handlerInput.requestEnvelope.request.intent.slots.RollType;
        var result = 0;

        switch (rollType) {
            case '3d6':
                for (let index = 0; index < 3; index++) {
                    result += Math.floor(6 * Math.random() + 1);
                }
                break;
            case '4d6 drop low':
                var rolls = [];
                for (let index = 0; index < 4; index++) {
                    rolls.push(Math.floor(6 * Math.random() + 1));
                }
                var lowest = 10;
                for (let index = 0; index < rolls.length; index++) {
                    const element = rolls[index];
                    if(element < lowest){
                        lowest = element;
                    }
                }
                rolls.forEach(element => {
                   result += element
                });
                rolls -= lowest;
                break;
            case '3d6 reroll 1\'s':
                for(let index = 0; index < 3; index++){
                    var roll;
                    do{
                        roll = Math.floor(6 * Math.random() + 1);
                    }while(roll === 1);
                    results += roll;
                }
                break;
        }
        var outputText = "Your stat roll was " + result;
        return handlerInput.responseBuilder.speak(outputText).getResponse();
    }
}
const ComplementaryColorHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'ComplementaryColorIntent'
    },
    handle(handlerInput){
        var r = Math.min(255, handlerInput.requestEnvelope.request.intent.slots.Red);
        var g = Math.min(255, handlerInput.requestEnvelope.request.intent.slots.Green);
        var b = Math.min(255, handlerInput.requestEnvelope.request.intent.slots.Blue);

        var R = r/255;
        var G = g/255;
        var B = b/255;

        var Cmax = Math.max(R, G, B);
        var Cmin = Math.min(R, G, B);
        var delta = Cmax - Cmin;

        var H;
        var S;
        var V;

        //Calculating the Hue value for the color that was just passed
        switch(Cmax){
            case Cmax === 0:
                H = 0;
                break;
            case Cmax === R:
                H = 60 * (0 + (G - B)/(Cmax - Cmin));
                break;
            case Cmax === G:
                H = 60 * (2 + (B - R)/(Cmax - Cmin));
                break;
            case Cmax === B:
                H = 60 * (4 + (R - G)/(Cmax - Cmin));
                break;
        }

        //Calculating the Saturation value for the passed color
        if(Cmax === 0 || (R === G && G === B)){
            S = 0;
        }
        else{
            S = (Cmax - Cmin)/Cmax;
        }

        //"Calculating" the Value for the passed color
        V = Cmax;

        //Calculating the complementary color
        H = ((H + 180) % 360);
        
        //Converting Back
        var Chroma = V * S;
        var Hprime = H/60;
        var X = Chroma * (1 - Math.abs(Hprime % 2 - 1));

        var R1;
        var G1;
        var B1;

        switch(Hprime){
            case 0 <= Hprime <= 1:
                R1 = Chroma;
                G1 = X;
                B1 = 0;
                break;
            case 1 < Hprime <= 2:
                R1 = X;
                G1 = Chroma;
                B1 = 0;
                break;
            case 2 < Hprime <= 3:
                R1 = 0;
                G1 = Chroma;
                B1 = X;
                break;
            case 3 < Hprime <= 4:
                R1 = 0;
                G1 = X;
                B1 = Chroma;
            case 4 < Hprime <= 5:
                R1 = X;
                G1 = 0;
                B1 = Chroma;
                break;
            case 5 < Hprime <= 6:
                R1 = Chroma;
                G1 = 0;
                B1 = X;
                break;
        }

        var m = V - Chroma;
        var RealR = R1 + m;
        var RealG = G1 + m;
        var RealB = B1 + m;

        var outputText = "Your color is R: " + RealR + ", G: " + RealG + ", B: " + RealB;
        return handlerInput.responseBuilder.speak(speechText).getResponse();
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        RandomRollHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();