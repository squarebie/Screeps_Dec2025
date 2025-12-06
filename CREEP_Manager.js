// CREEP_Manager.js

const GOAP_Planner = require('GOAP_Planner');
const GOALS = require('GOALS_Library');
const ACTIONS = require('ACTIONS_Library');

function CREEP_Manager() {
    // --- Dynamic Goal Assignment ---
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        const damagedStructures = room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax * 0.8 // Repair structures at 80% health
        });

        if (damagedStructures.length > 0) {
            const idleCreeps = room.find(FIND_MY_CREEPS, {
                filter: (c) => !c.memory.plan || c.memory.plan.length === 0
            });

            if (idleCreeps.length > 0) {
                const closestCreep = damagedStructures[0].pos.findClosestByPath(idleCreeps);
                if (closestCreep) {
                    closestCreep.memory.plan = GOAP_Planner.findPlan(closestCreep, { 'MaintainStructures': GOALS.MaintainStructures });
                    closestCreep.memory.repairTarget = damagedStructures[0].id;
                }
            }
        }
    }

    // --- Plan Execution ---
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        if (!creep.memory.plan || creep.memory.plan.length === 0) {
            let availableGoals = {};
            if (creep.memory.role === 'harvester') {
                availableGoals = { 'FillContainers': GOALS.FillContainers };
            } else if (creep.memory.role === 'upgrader') {
                availableGoals = { 'UpgradeRoomController': GOALS.UpgradeRoomController };
            } else if (creep.memory.role === 'builder') {
                availableGoals = { 'ConstructBuildings': GOALS.ConstructBuildings };
            } else if (creep.memory.role === 'hauler') {
                availableGoals = { 'DistributeEnergy': GOALS.DistributeEnergy };
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
