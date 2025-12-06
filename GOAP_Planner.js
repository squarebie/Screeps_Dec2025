/**
 * The GOAP_Planner is the brain of our AI. It is responsible for finding a
 * sequence of actions (a "plan") that will satisfy a given goal.
 * 
 * For now, our planner is very simple. It doesn't use a sophisticated
 * algorithm like A*. Instead, it uses a hard-coded logic to create a
 * two-step plan for our harvesters.
 */

const ACTIONS = require('ACTIONS_Library');

const GOAP_Planner = {
    /**
     * Finds a plan for the given creep to satisfy one of the given goals.
     * @param {Creep} creep The creep to find a plan for.
     * @param {Object} goals The goals the creep can choose from.
     * @returns {Array} A plan, which is an array of actions.
     */
    findPlan: function(creep, goals) {
        // TODO: Implement a more sophisticated goal selection process.
        // For now, we only have one goal, so we'll just use that one.
        const goal = Object.values(goals)[0]; 

        // This is a very basic "plan" - it's a hard-coded sequence of actions
        // that will lead to the goal. A real planner would dynamically create this
        // sequence using a search algorithm.
        
        // For now, our simple plan is to harvest energy, then deliver it.
        // We'll check the creep's state to see which action to perform.
        if (creep.store[RESOURCE_ENERGY] > 0) {
            return [ACTIONS.DeliverEnergyToSpawn];
        } else {
            return [ACTIONS.HarvestEnergy];
        }
    }
};

module.exports = GOAP_Planner;
