// BLUEPRINT_Manager.js

function BLUEPRINT_Manager() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];
        const spawn = room.find(FIND_MY_SPAWNS)[0];

        // --- Container Placement Logic ---
        const sources = room.memory.sources.map(s => Game.getObjectById(s.id)).filter(s => s);
        for (const source of sources) {
            // Check if there is already a container or construction site near the source
            const nearbyContainers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });
            const nearbyConstructionSites = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            if (nearbyContainers.length === 0 && nearbyConstructionSites.length === 0) {
                // Find a suitable spot for a container
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        const x = source.pos.x + i;
                        const y = source.pos.y + j;
                        if (room.getTerrain().get(x, y) !== TERRAIN_MASK_WALL) {
                            room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                            return; // Place one blueprint at a time
                        }
                    }
                }
            }
        }
        
        // --- Road Placement Logic (only runs if no container sites exist) ---
        const containerConstructionSites = room.find(FIND_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        });
        if (containerConstructionSites.length > 0) {
            return;
        }

        // Only place new blueprints if there are no other road construction sites.
        const roadConstructionSites = room.find(FIND_CONSTRUCTION_SITES, { 
            filter: { structureType: STRUCTURE_ROAD } 
        });
        if (roadConstructionSites.length > 0) {
            return;
        }

        // Find all sources and filter them to find the ones that don't have a road yet.
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
