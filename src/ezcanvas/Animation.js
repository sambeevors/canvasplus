class Animation {
  // Build an animation based on the passed parameters
  constructor (params = {
    // Defaults to the first canvas
    canvas: 0,
    // Duration defaults to 1 second
    duration: 1000,
    // Easing defaults to linear (no easing)
    easing: t => {
      return t
    },
    // Looping defaults to false
    loop: false
  }) {
    this.canvas = (typeof params.canvas === 'number') ? params.canvas : 0
    this.duration = (typeof params.duration === 'number') ? params.duration : 1000
    this.easing = (typeof params.easing === 'function') ? params.easing : t => {
      return t
    }
    this.loop = (typeof params.loop === 'boolean') ? params.loop : false
    this.progress = 0
    this.shapes = []
    this.images = []
    this.startTime = null
  }
}

class Canvas {
  // Construct a new canvas based on the passed parameters
  constructor (params = {
    // Size defaults to the size of the viewport
    size: [window.innerWidth, window.innerHeight],
    // Canvas element defaults to the first canvas on the page
    el: 'canvas',
    // Resize defaults to false
    resize: false
  }) {
    this.c = (typeof params.el === 'string') ? document.querySelector(params.el) : document.querySelector('canvas')
    this.ctx = this.c.getContext('2d')
    if (params.resize) {
      window.addEventListener('resize', () => {
        this.setSize(params.size)
      })
    }
    this.setSize(params.size)
  }

  // Set's the size of the canvas based on the resolution of the client
  setSize (obj) {
    this.ctx.canvas.width = (typeof obj === 'object') ? obj[0] * window.devicePixelRatio : window.innerWidth * window.devicePixelRatio
    this.ctx.canvas.height = (typeof obj === 'object') ? obj[1] * window.devicePixelRatio : window.innerHeight * window.devicePixelRatio
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
}

export { Canvas, Animation }