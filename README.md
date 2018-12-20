# canvasplus

[![GitHub issues](https://img.shields.io/github/issues/sambeevors/canvasplus.svg)](https://github.com/sambeevors/canvasplus/issues) [![GitHub stars](https://img.shields.io/github/stars/sambeevors/canvasplus.svg)](https://github.com/sambeevors/canvasplus/stargazers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

A JavaScript library for creating animations simply within HTML5 canvas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

Can be installed via npm or yarn

```shell
npm i @sambeevors/canvasplus
```

```shell
yarn add @sambeevors/canvasplus
```

## Usage

To get started, you first need to import `canvasplus` and create a new canvas

```javascript
import { CanvasPlus, Ease } from 'canvasplus'
```

```javascript
CanvasPlus.addCanvas({
  el: '#canvas',
  size: [300, 150]
})
```

Add an animation

```javascript
CanvasPlus.addAnimation({
  duration: 900,
  easing: Ease.outQuad,
  loop: true
})
```

Then simply add a shape

```javascript
CanvasPlus.addShape({
  shape: 'rect',
  w: 100,
  h: 100,
  position: {
    start: [0, 0],
    end: [300, 150]
  }
})
```

You can also add images to the animation in a similar way

```javascript
CanvasPlus.addImage({
  src: 'example.jpg',
  w: 50,
  h: 75,
  position: {
    start: [150, 150]
  }
})
```

Once you are ready you can start your animation

```javascript
CanvasPlus.run()
```

## Contributing

Contributions are welcome! There's so much I want to do with this project but struggle to find the time to do it. If there's any features you want me to add, open an issue or even have a go yourself! PRs are always welcome.

To get the project running locally, simply install dependencies with `yarn`.

## License

This package is covered by the [MIT License](https://opensource.org/licenses/MIT).
