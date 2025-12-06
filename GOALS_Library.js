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
    },
    'ConstructBuildings': {
        name: 'ConstructBuildings',
        priority: 3, // Highest priority for now
        isAchieved: (creep) => {
            return creep.room.find(FIND_CONSTRUCTION_SITES).length === 0;
        },
        desiredState: { 'siteBuilt': true }
    }
};

module.exports = GOALS;
