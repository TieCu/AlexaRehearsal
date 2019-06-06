/* eslint-disable  func-names */
/* eslint-disable  no-restricted-syntax */
/* eslint-disable  no-loop-func */
/* eslint-disable  consistent-return */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Welcome to Dungeons and Dragons Class Picker. Ask to pick a class to get started.')
      .reprompt('Ask to pick a class to start.')
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-Nov-21: AMAZON.FallackIntent is currently available in en-* and de-DE locales.
  //              This handler will not be triggered except in those locales, so it can be
  //              safely deployed here in the code for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const PickClassIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'PickClassIntent';
  },
  handle(handlerInput) {
    
    let nextIntent = handlerInput.requestEnvelope.request.intent.slots.hasMagic.value;

    if(nextIntent === COMBAT_TYPE){
        return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'PhysicalTypeIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .getResponse();
    }
    
    return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'MagicTypeIntent',
            confirmationStatus: 'NONE',
            slots: {}
        })
        .getResponse();
  },
};

const PhysicalTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'PhysicalTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.physical.value;
    
        if(nextIntent === PHYSICAL_TYPE){
            return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'StrengthTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'DexterityTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    },
};

const StrengthTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'StrengthTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.strength.value;
    
        if(nextIntent === STRENGTH_TYPE){
            return handlerInput.responseBuilder
            .speak("You should be a barbarian. Barbarians go into rages and lead their team into battle.")
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak("You should be a fighter. Fighters can use a variety of attacks to outsmart their opponents.")
            .getResponse();
    },
};

const DexterityTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'DexterityTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.dexterity.value;
    
        if(nextIntent === DEXTERITY_TYPE){
            return handlerInput.responseBuilder
            .speak("You should be a monk. Monks use their mastery of spiritual energies to kill their oppenents, while they dodge enemy attacks.")
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak("You should be a rogue. Rogues wait in the shadows to pounce on unexpecting foes.")
            .getResponse();
    },
};

const MagicTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'MagicTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.magic.value;
    
        if(nextIntent === MAGIC_TYPE){
            return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'ArcaneTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'DivineTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    },
};

const ArcaneTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'ArcaneTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.arcane.value;
    
        if(nextIntent === ARCANE_RANGE){
            return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'ArcaneMeleeTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'ArcaneRangedTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    },
};

const ArcaneMeleeTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'ArcaneMeleeTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.arcaneMelee.value;
    
        if(nextIntent === ARCANE_FIGHTER){
            return handlerInput.responseBuilder
            .speak("You should be a fighter. Fighters can use a variety of attacks to outsmart their opponents.")
            .getResponse();
        }
        else if (nextIntent === ARCANE_ROGUE){
            return handlerInput.responseBuilder
            .speak("You should be a rogue. Rogues wait in the shadows to pounce on unexpecting foes.")
            .getResponse();
        }
        else if (nextIntent === ARCANE_MONK){
            return handlerInput.responseBuilder
            .speak("You should be a monk. Monks use their mastery of spiritual energies to kill their oppenents, while they dodge enemy attacks.")
            .getResponse();
        }
        return handlerInput.responseBuilder
            .speak("You should be a bard. Bards are generalists, choosing their abilities as their situations require.")
            .getResponse();
    },
};

const ArcaneRangedTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'ArcaneRangedTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.arcaneRanged.value;
    
        if(nextIntent === ARCANE_FIEND){
            return handlerInput.responseBuilder
            .speak("You should be a warlock. Warlocks pray to fiends to recieve large bursts of power.")
            .getResponse();
        }
        else if (nextIntent === ARCANE_TRAINING){
            return handlerInput.responseBuilder
            .speak("You should be a wizard. Wizards know a large number of spells to do things such as teleport, cast fireballs, or enhance their allies.")
            .getResponse();
        }
        else if (nextIntent === ARCANE_BLOODLINE){
            return handlerInput.responseBuilder
            .speak("You should be a sorcerer. Sorcerers modify their spells to change how they attack foes or assist their friends.")
            .getResponse();
        }
        return handlerInput.responseBuilder
            .speak("You should be a bard. Bards are generalists, choosing their abilities as their situations require.")
            .getResponse();
    },
};

const DivineTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'DivineTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.divine.value;
    
        if(nextIntent === NATURE_TYPE){
            return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'NatureTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: 'HolyTypeIntent',
                confirmationStatus: 'NONE',
                slots: {}
            })
            .getResponse();
    },
};

const NatureTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'NatureTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.nature.value;
    
        if(nextIntent === RANGER_TYPE){
            return handlerInput.responseBuilder
            .speak("You should be a ranger. Rangers can use magic to heal allies or shoot arrows into their enemies from afar.")
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak("You should be a druid. Druids can use the power of nature to harm their foes, heal their friends, or turn into beasts.")
            .getResponse();
    },
};

const HolyTypeIntent = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
          && request.intent.name === 'HolyTypeIntent';
    },
    handle(handlerInput) {
        
        let nextIntent = handlerInput.requestEnvelope.request.intent.slots.holy.value;
    
        if(nextIntent === PALADIN_TYPE){
            return handlerInput.responseBuilder
            .speak("You should be a paladin. Paladins use magic to heal their allies, smite oppenents with the power of gods, or use auras to buff all nearby allies.")
            .getResponse();
        }
        
        return handlerInput.responseBuilder
            .speak("You should be a cleric. Clerics use holy powers from the gods to meet the demands of any situation.")
            .getResponse();
    },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('This is a Dungeons and Dragons class picker. Simply ask to pick a class and I\'ll find the best one for you')
      .reprompt('Simply ask to pick a class and I\'ll find the best one for you')
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Good luck on your travels, adventurer')
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

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

/* CONSTANTS */

const skillBuilder = Alexa.SkillBuilders.custom();
const SKILL_NAME = 'Class Picker';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that. Simply ask to pick a class and I\'ll find the best one for you`;
const FALLBACK_REPROMPT = 'What can I help you with?';
const COMBAT_TYPE = "physical";
const PHYSICAL_TYPE = "strength";
const STRENGTH_TYPE = "rage";
const DEXTERITY_TYPE = "ki";
const MAGIC_TYPE = "arcane";
const ARCANE_RANGE = "melee";
const ARCANE_FIGHTER = "combat prowess";
const ARCANE_ROGUE = "attack from the shadows";
const ARCANE_MONK = "spiritual master";
const ARCANE_FIEND = "fiend";
const ARCANE_TRAINING = "training";
const ARCANE_BLOODLINE = "bloodline";
const NATURE_TYPE = "nature";
const RANGER_TYPE = "have a pet animal";
const PALADIN_TYPE = "auras";

const requiredSlots = [
  'hasMagic',
  'physical',
  'strength',
  'dexterity',
  'magic',
  'arcane',
  'arcaneMelee',
  'arcaneRanged',
  'divine',
  'nature',
  'holy'
];

/* HELPER FUNCTIONS */

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            isValidated: true,
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            resolved: filledSlots[item].value,
            isValidated: false,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        resolved: filledSlots[item].value,
        isValidated: false,
      };
    }
  }, this);

  return slotValues;
}

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PickClassIntent,
    PhysicalTypeIntent,
    StrengthTypeIntent,
    DexterityTypeIntent,
    MagicTypeIntent,
    ArcaneTypeIntent,
    ArcaneMeleeTypeIntent,
    ArcaneRangedTypeIntent,
    DivineTypeIntent,
    NatureTypeIntent,
    HolyTypeIntent,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();