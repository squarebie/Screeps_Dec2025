// SYS_CPU

module.exports = SYS_CPU

function SYS_CPU()
{
    CPU_GeneratePixel()
}

function CPU_GeneratePixel()
{
    console.log(module.name, 'Game.cpu.bucket: ' + Game.cpu.bucket)
    
    const myBucket = Game.cpu.bucket
    
    if (myBucket === 10000)
    {
        console.log(module.name + 'CPU_GeneratePixel::')
        Game.cpu.generatePixel()
        //Game.notify("CPU_PixelGenerated")
    }
}