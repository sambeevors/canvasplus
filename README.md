
# ez-canvas
A JavaScript library for creating animations simply within HTML5 canvas

Run `npm run build` to build

Usage
---

To get started, you first need to create a new canvas

```
EZCanvas.addCanvas({
  el: '#canvas', // string: Target a specific cavas element - defaults to first canvas on page
  size: [300, 150], // array: Size of canvas
  duration: 900, // int: Duration of animation
  easing: Ease.outQuad, // function: Easing function - defaults to linear
  loop: true // bool: Wether or not the animation should loop
})
```

Then simply add a shape

```
EZCanvas.addShape({
  canvas: 0, // int: Which canvas to add shape to - defaults to 0
  shape: 'circ', // string: Which type of shape to add (currently supports 'rect' and 'circ')
  position: {
    start: [111 + 100 + 150, 73 + 100 - 150],
    end: [111 + 10, 73 + 10]
  },
  rotation: {
    start: -270,
    end: 0
  },
  opacity: {
    start: 0,
    end: 1
  },
  r: 73, // number: Radius of the circle (Only required when shape is 'circ', if shape is 'rect', declare w and h instead)
  fill: '#04E7BD', // string: The fill colour of the shape (Supports keywords, rgb, hex, hsl)
  GCO: 'multiply' // string: Set the composite operation for the shape
(See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing/Example)
})
```

You can also add images to the animation in a similar way

```
EZCanvas.addImage({
  canvas: 0, // int: Which canvas to add shape to - defaults to 0
  src: 'example.jpg', // string: Path to the image
  w: 53.73, // number: Width of the image
  h: 75, // number: Height of the image
  position: {
    start: [150 - 26.865, 75 - 37.5]
    // end is not required if the shape / image is to remain stationery
  }
})
```