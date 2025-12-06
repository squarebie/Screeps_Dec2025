// GOALS_Library.js

const GOALS = {
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
    },
    'FillContainers': {
        name: 'FillContainers',
        priority: 1, // Lowest priority, as it's a background task
        isAchieved: (creep) => {
            // This is a continuous process
            return false;
        },
        desiredState: { 'containerFilled': true }
    },
    'DistributeEnergy': {
        name: 'DistributeEnergy',
        priority: 2, // Same as upgrading
        isAchieved: (creep) => {
            // This is a continuous process
            return false;
        },
        desiredState: { 'energyDistributed': true }
    },
    'MaintainStructures': {
        name: 'MaintainStructures',
        priority: 4, // Highest priority
        isAchieved: (creep) => {
            // This goal is achieved when the target structure is fully repaired
            const target = Game.getObjectById(creep.memory.repairTarget);
            return !target || target.hits === target.hitsMax;
        },
        desiredState: { 'structureRepaired': true }
    }
};

module.exports = GOALS;
