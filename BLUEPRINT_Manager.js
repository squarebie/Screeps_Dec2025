// BLUEPRINT_Manager.js

function BLUEPRINT_Manager() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        const spawn = room.find(FIND_MY_SPAWNS)[0];

        // Only place new blueprints if there are no other road construction sites.
        const roadConstructionSites = room.find(FIND_CONSTRUCTION_SITES, { 
            filter: { structureType: STRUCTURE_ROAD } 
        });
        if (roadConstructionSites.length > 0) {
            return;
        }

        // Find all sources and filter them to find the ones that don't have a road yet.
        const sources = room.memory.sources.map(s => Game.getObjectById(s.id)).filter(s => s);
        let sourcesWithoutRoads = [];
        for (const source of sources) {
            const path = room.findPath(spawn.pos, source.pos, { ignoreCreeps: true });
            let hasRoad = true;
            for (const step of path) {
                const structures = room.lookForAt(LOOK_STRUCTURES, step.x, step.y);
                if (!structures.some(s => s.structureType === STRUCTURE_ROAD)) {
                    hasRoad = false;
                    break;
                }
            }
            if (!hasRoad) {
                sourcesWithoutRoads.push(source);
            }
        }

        // Find the closest source without a road and build to it.
        if (sourcesWithoutRoads.length > 0) {
            const closestSource = spawn.pos.findClosestByPath(sourcesWithoutRoads);
            if (closestSource) {
                const path = room.findPath(spawn.pos, closestSource.pos, { ignoreCreeps: true });
                path.forEach(step => {
                    room.createConstructionSite(step.x, step.y, STRUCTURE_ROAD);
                });
            }
        }
    }
}

module.exports = BLUEPRINT_Manager;
