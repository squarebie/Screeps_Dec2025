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
        // For now, we only have one goal passed in at a time.
        const goal = Object.values(goals)[0]; 

        // This is a very basic "plan" - it's a hard-coded sequence of actions
        // that will lead to the goal. A real planner would dynamically create this
        // sequence using a search algorithm.
        
        // We'll check the creep's state to see which action to perform.
        if (creep.store.getFreeCapacity() > 0) {
            // If the creep has capacity, its first step is to get energy.
            // We'll prioritize withdrawing from storage, and fall back to harvesting.
            const storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
            });

            if (storage) {
                return [ACTIONS.WithdrawEnergy];
            } else {
                return [ACTIONS.HarvestEnergy];
            }
        } else {
            // If the creep is full, it should perform the action that satisfies its goal.
            if (goal.name === 'FillContainers') {
                return [ACTIONS.DropEnergyAtContainer];
            } else if (goal.name === 'UpgradeRoomController') {
                return [ACTIONS.UpgradeController];
            } else if (goal.name === 'ConstructBuildings') {
                return [ACTIONS.BuildConstructionSite];
            } else if (goal.name === 'DistributeEnergy') {
                return [ACTIONS.DeliverEnergy];
            } else if (goal.name === 'MaintainStructures') {
                return [ACTIONS.Repair];
            }
        }
        
        // If no plan is found, return an empty array.
        return [];
    }
};

module.exports = GOAP_Planner;
