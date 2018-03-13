

# ez-canvas
A JavaScript library for creating animations simply within HTML5 canvas

Table of Contents
---
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

Installation
---

Run `npm run build` to get started. This will install node dependencies and build using webpack.

Usage
---

To get started, you first need to import the repository and create a new canvas
```javascript
import { EZCanvas, Ease } from 'ezcanvas'
```
```javascript
EZCanvas.addCanvas({
  size: [300, 150],
  duration: 900,
  easing: Ease.outQuad,
  loop: true
})
```

Then simply add a shape

```javascript
EZCanvas.addShape({
  shape: 'circ'
  position: {
    start: [15, 15],
    end: [100, 100]
  }
})
```

You can also add images to the animation in a similar way

```javascript
EZCanvas.addImage({
  src: 'example.jpg',
  w: 20
  h: 75,
  position: {
    start: [25, 50]
  }
})
```

Contributing
---
Contributions are welcome!
Feel free to make a PR, this project still has a long way to go.

License
---
This package is covered by the [MIT License](https://opensource.org/licenses/MIT).