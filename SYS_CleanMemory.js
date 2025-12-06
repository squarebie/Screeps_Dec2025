// SYS_CleanMemory

module.exports = SYS_CleanMemory

function SYS_CleanMemory()
{
    //console.log(Game.time, module.name)
    
    CleanMemory()
}

function CleanMemory()
{
    for(var name in Memory.creeps)
    {
        if(!Game.creeps[name])
        {
            delete Memory.creeps[name];
        }
    }
}