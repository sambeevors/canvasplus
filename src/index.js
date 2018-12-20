'use strict'

import { Canvas, Animation } from './classes/Animation.js'
import { Circle, Rectangle } from './classes/Shape.js'
import CanvasImage from './classes/Image.js'
import Color from 'color'

/*
  The Ease object contains several functions which take the progress,
  and modify it to create an ease in the animation. These can be applied
  on a per-canvas basis.
*/
const Ease = {
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inCubic: t => t * t * t,
  outCubic: t => --t * t * t + 1,
  inOutCubic: t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  inQuart: t => t * t * t * t,
  outQuart: t => 1 - --t * t * t * t,
  inOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  inQuint: t => t * t * t * t * t,
  outQuint: t => 1 + --t * t * t * t * t,
  inOutQuint: t =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

const CanvasPlus = (() => {
  let canvases = []
  let nextFrame

  // Position items on the frame
  const _positionItems = (items, progress, animation, canvas) => {
    // Loop through all the items (items are either shapes or images)
    for (let i = 0; i < items.length; i++) {
      // Set the GCO
      canvas.ctx.globalCompositeOperation = items[i].GCO
      canvas.ctx.beginPath()

      // Work out the position, rotation, opacity and scale of the item
      let pos = items[i].currentPosition(progress)
      let r = items[i].currentRotation(progress)
      let s = items[i].currentScale(progress)
      let o = items[i].currentOpacity(progress)

      // Save the current state of the canvas
      canvas.ctx.save()

      /*
        If the item is a rectangle or image, make sure the canvas
        works from the center of the shape (like how it does with circles)
      */
      if (items[i] instanceof Rectangle || items[i] instanceof CanvasImage) {
        canvas.ctx.translate(
          items[i].pos.x + items[i].w / 2,
          items[i].pos.y + items[i].h / 2
        )
      }

      // Rotate the canvas based on the current shape rotation
      canvas.ctx.rotate((r * Math.PI) / 180)

      // Draw the item
      if (items[i] instanceof CanvasImage) {
        canvas.ctx.globalAlpha = o
        canvas.ctx.drawImage(items[i].image, pos[0], pos[1], s[0], s[1])
        canvas.ctx.globalAlpha = 1
      } else {
        animation.shapes[i].draw(pos, s)
        canvas.ctx.fillStyle = Color(items[i].fill)
          .alpha(o)
          .rgb()
        canvas.ctx.fill()
      }

      // Restore the canvas to it's original rotation (0)
      canvas.ctx.restore()
    }
  }

  // Looping function for drawing each frame
  const _draw = () => {
    // Draw each canvas
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i]

      // Clear the frame completely
      canvas.ctx.clearRect(
        0,
        0,
        canvas.ctx.canvas.width,
        canvas.ctx.canvas.height
      )

      for (let i = 0; i < canvas.animations.length; i++) {
        let animation = canvas.animations[i]

        if (animation.play) {
          // Work out the current time
          const now = window.performance.now()

          // If this is the first frame, set the current time to the start time
          if (!animation.startTime) {
            animation.startTime = now
          }

          // Work out the progress of the animation (0 - 1)
          let p = (now - animation.startTime) / animation.duration
          // If the progress has passed one, adjust to be 1
          if (p > 1) p = 1

          // Set the value of the canvas' progress
          animation.progress = p

          // Draw the images and shapes
          _positionItems(animation.images, p, animation, canvas)
          _positionItems(animation.shapes, p, animation, canvas)

          // If the animation has ended
          if (p >= 1) {
            // Reset the start time
            animation.startTime = null
            // Reset the progress
            p = 0
            // Reset the GCO
            canvas.ctx.globalCompositeOperation = 'source-over'
            // Continue playing if animation should loop
            animation.play = animation.loop
          }
        }
      }
    }

    nextFrame = window.requestAnimationFrame(_draw)
  }

  return {
    // Creates a new canvas
    addCanvas: obj => {
      canvases.push(new Canvas(obj))
    },

    addAnimation: obj => {
      // Make sure we know which canvas we're adding the animatio to
      if (typeof obj.canvas === 'number' || canvases.length <= 1) {
        let canvas = typeof obj.canvas === 'number' ? obj.canvas : 0
        obj.canvases = canvases
        canvases[canvas].animations.push(new Animation(obj))
      } else {
        throw new Error('Canvas ID is not defined.')
      }
    },

    // Add a new shape
    addShape: obj => {
      // Make sure we know which canvas we're adding the shape to
      if (typeof obj.canvas === 'number' || canvases.length <= 1) {
        let canvas = typeof obj.canvas === 'number' ? obj.canvas : 0
        let animation = typeof obj.animation === 'number' ? obj.animation : 0
        // Make sure we're creating a valid shape
        if (typeof obj['shape'] === 'string') {
          obj.canvases = canvases
          obj.animations = canvases[canvas].animations
          switch (obj['shape']) {
            case 'circ':
              canvases[canvas].animations[animation].shapes.push(
                new Circle(obj)
              )
              break

            case 'rect':
              canvases[canvas].animations[animation].shapes.push(
                new Rectangle(obj)
              )
              break

            default:
              throw new Error('Provided shape not valid.')
          }
        } else {
          throw new Error(
            'Function incorrectly called. Object required with shape property (string).'
          )
        }
      } else {
        throw new Error('Canvas ID is not defined.')
      }
    },

    // Add a new image
    addImage: obj => {
      // Make sure we know which canvas we're adding the image to
      if (typeof obj.canvas === 'number' || canvases.length <= 1) {
        obj.canvases = canvases
        canvases[obj.canvas].animations[obj.animation].images.push(
          new CanvasImage(obj)
        )
      } else {
        throw new Error('Canvas ID is not defined.')
      }
    },

    // Remove all the shapes from the specified canvas
    clearShapes: (canvas, animation) => {
      canvases[canvas].animations[animation].shapes = []
    },

    // Remove all the images from the specified canvas
    clearImages: (canvas, animation) => {
      canvases[canvas].animations[animation].images = []
    },

    // Remove all the shapes, images and animations from the specified canvas
    clearCanvas: canvas => {
      canvases[canvas].animations = []
    },

    // Remove all shapes AND images from an animation
    clearAnimation: (canvas, animation) => {
      canvases[canvas].animations[animation].shapes = []
      canvases[canvas].animations[animation].images = []
    },

    // Run one or all of the canvases
    run: (canvas, animation) => {
      if (typeof canvas === 'number' || canvases.length <= 1) {
        if (typeof canvas !== 'number') canvas = 0
        window.cancelAnimationFrame(nextFrame)

        if (typeof animation === 'number') {
          canvases[canvas].animations[animation].play = true
        } else {
          for (let i = 0; i < canvases[canvas].animations.length; i++) {
            canvases[canvas].animations[i].play = true
          }
        }

        nextFrame = window.requestAnimationFrame(_draw)
      } else {
        throw new Error('Canvas ID is not defined.')
      }
    },

    // Stop one or all of the canvases
    stop: (canvas, animation) => {
      if (typeof canvas !== 'undefined') {
        if (typeof animation === 'number') {
          canvases[canvas].animations[animation].play = false
        } else {
          for (let i = 0; i < canvases.length; i++) {
            canvases[canvas].animations[i].play = false
          }

          window.cancelAnimationFrame(nextFrame)
        }
      } else {
        throw new Error('Canvas ID is not defined.')
      }
    },

    // Get the dimensions of one or all of the canvases
    getCanvasSize: i => {
      if (canvases.ctx !== 'undefined') {
        if (i) {
          return {
            width: canvases[i].ctx.canvas.width,
            height: canvases[i].ctx.canvas.height
          }
        } else {
          let sizes = []

          for (let j = 0; j < canvases.length; j++) {
            sizes.push({
              width: canvases[j].ctx.canvas.width,
              height: canvases[j].ctx.canvas.height
            })
          }

          if (sizes.length === 1) return sizes[0]
          return sizes
        }
      }
      throw new Error('Canvas must be set up before this function is called.')
    },

    // Get the current progress of an animation
    getCurrentProgress: (canvas, animation) => {
      return canvases[canvas].animations[animation].progress
    },

    // Return the canvases so they can be accessed publically
    canvases
  }
})()

export { CanvasPlus as default, Ease }
