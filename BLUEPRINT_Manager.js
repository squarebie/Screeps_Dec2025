// BLUEPRINT_Manager.js

function BLUEPRINT_Manager() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        const spawn = room.find(FIND_MY_SPAWNS)[0];

        // If we have no roads, let's plan one.
        const roads = room.find(FIND_STRUCTURES, { filter: { structureType: STRUCTURE_ROAD } });
        if (roads.length === 0) {
            const sources = room.memory.sources;
            if (sources) {
                sources.forEach(sourceInfo => {
                    const source = Game.getObjectById(sourceInfo.id);
                    if (source) {
                        const path = room.findPath(spawn.pos, source.pos, { ignoreCreeps: true });
                        path.forEach(step => {
                            room.createConstructionSite(step.x, step.y, STRUCTURE_ROAD);
                        });
                    }
                });
            }
        }
    }
}

module.exports = BLUEPRINT_Manager;
