// main.js

module.exports.loop = main

const CONSOLE_GameTick = require('CONSOLE_GameTick')
const SYS_CleanMemory = require('SYS_CleanMemory')

const SCENE_StartingTemplate = require('SCENE_StartingTemplate')

function main()
{
    _main_Init()
    SCENE_StartingTemplate()
}

function _main_Init()
{
    CONSOLE_GameTick()
    SYS_CleanMemory()
}

