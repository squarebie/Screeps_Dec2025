// SPAWN_Manager.js

const SYS_Config = require('SYS_Config');

function SPAWN_Manager() {
    // A generic function to spawn a creep of a given role
    const spawnCreep = (role, spawn) => {
        const newName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
        const body = SYS_Config.creeps[role].body;
        const memory = { memory: { role: role } };
        
        const result = spawn.spawnCreep(body, newName, memory);
        if (result === OK) {
            console.log(`Spawning new ${role}: ${newName}`);
        }
    };

    const spawn = Game.spawns['Spawn1'];
    if (spawn && !spawn.spawning) {
        // Spawn harvesters if we don't have enough
        const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if (harvesters.length < SYS_Config.creeps.harvester.desired) {
            spawnCreep('harvester', spawn);
            return; // Only spawn one creep per tick
        }

        // Spawn upgraders if we don't have enough
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if (upgraders.length < SYS_Config.creeps.upgrader.desired) {
            spawnCreep('upgrader', spawn);
            return; // Only spawn one creep per tick
        }

        // Spawn builders if we don't have enough
        const builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < SYS_Config.creeps.builder.desired) {
            spawnCreep('builder', spawn);
            return; // Only spawn one creep per tick
        }

        // Spawn haulers if we don't have enough
        const haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        if (haulers.length < SYS_Config.creeps.hauler.desired) {
            spawnCreep('hauler', spawn);
        }
    }
}

module.exports = SPAWN_Manager;
