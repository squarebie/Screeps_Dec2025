// SYS_Config.js

const SYS_Config = {
    performance: {
        maxCPU: 20,
        maxMemory: 2048 // in KB
    },
    creeps: {
        harvester: {
            desired: 2,
            body: [WORK, CARRY, MOVE]
        },
        upgrader: {
            desired: 1,
            body: [WORK, CARRY, MOVE]
        },
        builder: {
            desired: 1,
            body: [WORK, CARRY, MOVE]
        },
        hauler: {
            desired: 1,
            body: [CARRY, CARRY, MOVE, MOVE] // No WORK parts needed
        }
    }
};

module.exports = SYS_Config;
