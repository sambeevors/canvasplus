export default class Animation {
  // Build an animation based of the passed parameters
  constructor (params = {
    // Size defaults to the size of the viewport
    size: [window.innerWidth, window.innerHeight],
    // Duration defaults to 1 second
    duration: 1000,
    // Easing defaults to linear (no easing)
    easing: t => {
      return t
    },
    // Looping defaults to false
    loop: false,
    // Canvas element defaults to the first canvas on the page
    el: 'canvas',
    // Resize defaults to false
    resize: false
  }) {
    this.duration = (typeof params.duration === 'number') ? params.duration : 1000
    this.easing = (typeof params.easing === 'function') ? params.easing : t => {
      return t
    }
    this.loop = (typeof params.loop === 'boolean') ? params.loop : false
    this.c = (typeof params.el === 'string') ? document.querySelector(params.el) : document.querySelector('canvas')
    this.ctx = this.c.getContext('2d')
    this.progress = 0
    this.shapes = []
    this.images = []
    this.startTime = null
    if (params.resize) {
      window.addEventListener('resize', () => {
        this.setSize(params.size)
      })
    }
    this.setSize(params.size)
  }

  // Set's the size of the canvas based on the resoloution of the client
  setSize (obj) {
    this.ctx.canvas.width = (typeof obj === 'object') ? obj[0] * window.devicePixelRatio : window.innerWidth * window.devicePixelRatio
    this.ctx.canvas.height = (typeof obj === 'object') ? obj[1] * window.devicePixelRatio : window.innerHeight * window.devicePixelRatio
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
}
