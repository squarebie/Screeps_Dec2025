// GOAP_Planner.js

const ACTIONS = require('ACTIONS_Library');

const GOAP_Planner = {
    findPlan: function(creep, goals) {
        // For now, let's just consider the first goal
        const goal = Object.values(goals)[0]; 

        // Find actions that can satisfy the goal's desired state
        const usefulActions = [];
        for (const actionKey in ACTIONS) {
            const action = ACTIONS[actionKey];
            const effects = action.effects(creep);
            if (effects.energyDelivered && goal.desiredState.energyDelivered) {
                 // A real planner would check preconditions here and chain actions
                 usefulActions.push(action);
            }
            if (effects.hasEnergy) {
                // This is a precursor action to delivering energy
                usefulActions.unshift(action); // Put it at the beginning of the plan
            }
        }
        
        // This is a very basic "plan" - just a list of actions
        // that could lead to the goal. A real planner would create a sequence.
        
        // For now, let's just see if the creep has energy
        if (creep.store[RESOURCE_ENERGY] > 0) {
            return [ACTIONS.DeliverEnergyToSpawn];
        } else {
            return [ACTIONS.HarvestEnergy];
        }
    }
};

module.exports = GOAP_Planner;
