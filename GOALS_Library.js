// GOALS_Library.js

const GOALS = {
    'StoreEnergy': {
        name: 'StoreEnergy',
        priority: 1,
        isAchieved: (creep) => {
            return false;
        },
        desiredState: { 'energyDelivered': true }
    },
    'UpgradeRoomController': {
        name: 'UpgradeRoomController',
        priority: 2, // Higher priority than storing energy for now
        isAchieved: (creep) => {
            return false;
        },
        desiredState: { 'controllerUpgraded': true }
    }
};

module.exports = GOALS;
