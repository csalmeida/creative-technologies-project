import * as p5 from 'p5'
import "p5/lib/addons/p5.sound"

    // Creating a sound wave.
    const wave = new p5.Oscillator()
    wave.setType("sine")
    wave.start()
    wave.amp(0.1, 1)
    wave.freq(200)
    console.log("Wave", wave)