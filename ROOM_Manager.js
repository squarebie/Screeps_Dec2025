// ROOM_Manager.js

module.exports = ROOM_Manager

function ROOM_Manager()
{
    for (const roomName in Game.rooms)
    {
        const room = Game.rooms[roomName]
        
        // Initialize room memory if it doesn't exist
        if (!Memory.rooms) {
            Memory.rooms = {};
        }
        if (!Memory.rooms[roomName]) {
            Memory.rooms[roomName] = {};
        }

        // Scan for sources and store them in memory if not already present
        if (!Memory.rooms[roomName].sources) {
            console.log(`RoomManager: Scanning room ${room.name} for sources.`);
            const sources = room.find(FIND_SOURCES);
            Memory.rooms[roomName].sources = [];
            for (const source of sources) {
                Memory.rooms[roomName].sources.push({
                    id: source.id,
                    pos: source.pos
                });
            }
        }
    }
}