// SPAWN_Manager.js

function SPAWN_Manager() {
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if (harvesters.length < 2) {
        const newName = 'Harvester' + Game.time;
        // console.log('Spawning new harvester: ' + newName);
        const spawn = Game.spawns['Spawn1']; 
        if (spawn && !spawn.spawning) {
            const result = spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } });
            if (result === OK) {
                console.log('Spawning new harvester: ' + newName);
            }
        }
    }
}

module.exports = SPAWN_Manager;
