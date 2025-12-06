// SPAWN_Manager.js

const config = require('config');

function SPAWN_Manager() {
    // A generic function to spawn a creep of a given role
    const spawnCreep = (role, spawn) => {
        const newName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
        const body = config.creeps[role].body;
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
        if (harvesters.length < config.creeps.harvester.desired) {
            spawnCreep('harvester', spawn);
            return; // Only spawn one creep per tick
        }

        // Spawn upgraders if we don't have enough
        const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if (upgraders.length < config.creeps.upgrader.desired) {
            spawnCreep('upgrader', spawn);
        }
    }
}

module.exports = SPAWN_Manager;
