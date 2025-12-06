// CREEP_Manager.js

const GOAP_Planner = require('GOAP_Planner');
const GOALS = require('GOALS_Library');
const ACTIONS = require('ACTIONS_Library');

function CREEP_Manager() {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        if (!creep.memory.plan || creep.memory.plan.length === 0) {
            let availableGoals = {};
            if (creep.memory.role === 'harvester') {
                availableGoals = { 'StoreEnergy': GOALS.StoreEnergy };
            } else if (creep.memory.role === 'upgrader') {
                availableGoals = { 'UpgradeRoomController': GOALS.UpgradeRoomController };
            }
            creep.memory.plan = GOAP_Planner.findPlan(creep, availableGoals);
        }

        if (creep.memory.plan && creep.memory.plan.length > 0) {
            const actionName = creep.memory.plan[0].name;
            const action = ACTIONS[actionName];

            if (action) {
                if (action.perform(creep)) {
                    // Action is complete, remove from plan
                    creep.memory.plan.shift();
                }
            } else {
                 console.log(`Creep ${creep.name}: Could not find action ${actionName}`);
                 creep.memory.plan = [];
            }
        }
    }
}

module.exports = CREEP_Manager;
