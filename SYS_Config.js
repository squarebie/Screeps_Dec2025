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
        }
    }
};

module.exports = SYS_Config;
