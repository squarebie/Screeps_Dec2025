// SPAWN_Manager.js

const config = require('config');

function SPAWN_Manager() {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if (harvesters.length < config.creeps.harvester.desired) {
        const newName = 'Harvester' + Game.time;
        const spawn = Game.spawns['Spawn1']; 
        if (spawn && !spawn.spawning) {
            const result = spawn.spawnCreep(config.creeps.harvester.body, newName, { memory: { role: 'harvester' } });
            if (result === OK) {
                console.log('Spawning new harvester: ' + newName);
            }
        }
    }
}

module.exports = SPAWN_Manager;
