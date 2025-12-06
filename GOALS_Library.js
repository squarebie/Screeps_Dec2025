// GOALS_Library.js

const GOALS = {
    'StoreEnergy': {
        name: 'StoreEnergy',
        priority: 1,
        isAchieved: (creep) => {
            // This goal is a continuous process, so we'll re-evaluate it each tick.
            // A more complex goal would have a more defined end state.
            return false;
        },
        desiredState: { 'energyDelivered': true }
    }
};

module.exports = GOALS;
