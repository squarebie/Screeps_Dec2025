// CONSOLE_GameTick

module.exports = CONSOLE_GameTick

function CONSOLE_GameTick()
{
    Display_GameTick()
}

function Display_GameTick()
{
    const gameTime = Game.time
    
    console.log()
    console.log('GameTime: ' + gameTime)
}