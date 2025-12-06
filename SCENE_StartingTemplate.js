// SCENE_StartingTemplate

module.exports = SCENE_StartingTemplate

function SCENE_StartingTemplate()
{
    const ROOM_Manager = require('ROOM_Manager')
    const CREEP_Manager = require('CREEP_Manager')
    const SPAWN_Manager = require('SPAWN_Manager')
    const BLUEPRINT_Manager = require('BLUEPRINT_Manager')
    
    //console.log(Game.time, module.name)
    SYS_CPU = require('SYS_CPU')
    SYS_CPU()

    ROOM_Manager()
    CREEP_Manager()
    SPAWN_Manager()
    BLUEPRINT_Manager()
}


function _SCENARIO_2024_Aug28()
{
    const ROOMS_Manage = require('ROOMS_Manage')
    const UpdateCreeps = require('UpdateCreeps')
    const CreepManager = require('CreepManager')
    
    const SYS_CPU = require('SYS_CPU')
    const SYS_DEV = require('SYS_DEV')
    
    SYS_CPU()
    ROOMS_Manage()
    UpdateCreeps()
    SYS_DEV()  // Dev sandbox
    
    // TODO: Consider: MANAGE_Rooms, MANAGE_Structures, and MANAGE_Creeps.
    
}