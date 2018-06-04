// We use CanvasImage because Image is a global object
export default class CanvasImage {
  // Build an animation based of the passed parameters
  constructor(params) {
    // GCO defaults to source-over (normal)
    this.GCO = typeof params.GCO === 'string' ? params.GCO : 'source-over'
    // Creates a new image
    this.image = new window.Image()
    // Width and height default to whatever the dimensions of the passed image are
    this.w = typeof params.w === 'number' ? params.w : this.image.width
    this.h = typeof params.h === 'number' ? params.h : this.image.height
    // Check if image has loaded
    this.loaded = false
    this.image.onLoad = () => {
      this.loaded = true
    }
    // If no image src is set, put a placeholder in it's place
    this.image.src =
      typeof params.src === 'string'
        ? params.src
        : 'http://placehold.it/500x500?text=Image+Must+Be+A+String'
    this.canvases = params.canvases
    this.canvas = typeof params.canvas === 'number' ? params.canvas : 0
    this.animations = params.animations
    this.animation = typeof params.animation === 'number' ? params.animation : 0

    // Start position must be specified, end position defaults to start
    if (
      (typeof params.position.start === 'object' &&
        typeof params.position.end === 'object') ||
      typeof params.position.end === 'undefined'
    ) {
      this.pos = {
        start: params.position.start,
        end:
          typeof params.position.end === 'object'
            ? params.position.end
            : params.position.start
      }
      this.fill = typeof params.fill === 'string' ? params.fill : '#000000'
    } else {
      throw new Error(
        'New shapes require a starting position (array: [startX, startY])'
      )
    }

    // Rotation defaults to none
    this.rot = {
      start: 0,
      end: 0
    }

    // End rotation defaults to start
    if (typeof params.rotation === 'object') {
      if (
        (typeof params.rotation.start === 'number' &&
          typeof params.rotation.end === 'number') ||
        typeof params.rotation.end === 'undefined'
      ) {
        this.rot = {
          start: params.rotation.start,
          end:
            typeof params.rotation.end === 'number'
              ? params.rotation.end
              : params.rotation.start
        }
      }
    }

    // Scale defaults to none
    this.scale = {
      start: 1,
      end: 1
    }

    // End scale defaults to start
    if (typeof params.scale === 'object') {
      if (
        (typeof params.scale.start === 'number' &&
          typeof params.scale.end === 'number') ||
        typeof params.scale.end === 'undefined'
      ) {
        this.scale = {
          start: params.scale.start,
          end:
            typeof params.scale.end === 'number'
              ? params.scale.end
              : params.scale.start
        }
      }
    }

    // Opacity defaults to 1
    this.opacity = {
      start: 1,
      end: 1
    }

    // End opacity defaults to start
    if (typeof params.opacity === 'object') {
      if (
        (typeof params.opacity.start === 'number' &&
          typeof params.opacity.end === 'number') ||
        typeof params.opacity.end === 'undefined'
      ) {
        this.opacity = {
          start: params.opacity.start,
          end:
            typeof params.opacity.end === 'number'
              ? params.opacity.end
              : params.opacity.start
        }
      }
    }
  }

  // Work out current position based on progress
  currentPosition(p) {
    const x =
      this.pos.start[0] +
      (this.pos.end[0] - this.pos.start[0]) *
        this.animations[this.animation].easing(p)
    const y =
      this.pos.start[1] +
      (this.pos.end[1] - this.pos.start[1]) *
        this.animations[this.animation].easing(p)
    return [x, y]
  }

  // Work out current rotation based on progress
  currentRotation(p) {
    return (
      this.rot.start +
      (this.rot.end - this.rot.start) *
        this.animations[this.animation].easing(p)
    )
  }

  // Work out current scale based on progress
  currentScale(p) {
    let w = this.w * this.scale.start
    let h = this.h * this.scale.start

    if (this.scale.start !== this.scale.end) {
      w =
        this.w +
        this.w *
          ((this.scale.start + (this.scale.end - this.scale.start)) *
            this.animations[this.animation].easing(p) -
            this.animations[this.animation].easing(p))
      h =
        this.h +
        this.h *
          ((this.scale.start + (this.scale.end - this.scale.start)) *
            this.animations[this.animation].easing(p) -
            this.animations[this.animation].easing(p))
    }

    return [w, h]
  }

  // Work out current opacity based on progress
  currentOpacity(p) {
    return (
      this.opacity.start +
      (this.opacity.end - this.opacity.start) *
        this.animations[this.animation].easing(p)
    )
  }
}
