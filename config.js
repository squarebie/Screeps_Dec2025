// config.js

const config = {
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

module.exports = config;
