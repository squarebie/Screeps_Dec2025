// ACTIONS_Library.js

const ACTIONS = {
    'HarvestEnergy': {
        name: 'HarvestEnergy',
        cost: 1,
        preconditions: (creep) => creep.store.getFreeCapacity() > 0,
        effects: (creep) => ({ 'hasEnergy': true }),
        perform: function(creep) {
            // Find a source if the creep doesn't have one
            if (!creep.memory.targetSource) {
                const sources = creep.room.memory.sources;
                if (sources && sources.length > 0) {
                    creep.memory.targetSource = sources[0].id;
                }
            }

            // Harvest the source
            const source = Game.getObjectById(creep.memory.targetSource);
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            return creep.store.getFreeCapacity() === 0; // Returns true when action is complete
        }
    },
    'DeliverEnergyToSpawn': {
        name: 'DeliverEnergyToSpawn',
        cost: 1,
        preconditions: (creep) => creep.store[RESOURCE_ENERGY] > 0,
        effects: (creep) => ({ 'energyDelivered': true }),
        perform: function(creep) {
            const spawn = Game.spawns['Spawn1'];
            if (spawn) {
                if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            return creep.store[RESOURCE_ENERGY] === 0; // Returns true when action is complete
        }
    },
    'UpgradeController': {
        name: 'UpgradeController',
        cost: 1,
        preconditions: (creep) => creep.store[RESOURCE_ENERGY] > 0,
        effects: (creep) => ({ 'controllerUpgraded': true }),
        perform: function(creep) {
            const controller = creep.room.controller;
            if (controller) {
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            return creep.store[RESOURCE_ENERGY] === 0; // Returns true when action is complete
        }
    }
};

module.exports = ACTIONS;
