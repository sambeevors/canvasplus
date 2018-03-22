'use strict'

import { EZCanvas, Ease } from './ezcanvas.js'

document.addEventListener('DOMContentLoaded', event => {
    EZCanvas.addCanvas({
        size: [300, 150]
    })

    EZCanvas.addAnimation({
        duration: 900,
        easing: Ease.outQuad,
        loop: true
    })

    EZCanvas.addShape({
        animation: 0,
        shape: 'circ',
        position: {
            start: [15, 15],
            end: [100, 100]
        }
    })

    console.log(EZCanvas)

    EZCanvas.run(0, 0)

    setTimeout(() => {
        EZCanvas.addAnimation({
            duration: 2500,
            loop: true,
            easing: Ease.inOutCubic
        })

        EZCanvas.addShape({
            animation: 1,
            shape: 'rect',
            position: {
                start: [100, 250],
                end: [10, 15]
            },
            fill: 'red',
            GCO: 'source-atop'
        })

        EZCanvas.run(0, 1)

        setTimeout(() => {
            EZCanvas.addShape({
                animation: 1,
                shape: 'circ',
                r: 15,
                fill: 'rgba(0, 255, 0, .5)',
                position: {
                    start: [200, 15],
                    end: [0, 15]
                },
                opacity: {
                    start: 0.5
                }
            })
        }, 2000)
    }, 5000)
})
