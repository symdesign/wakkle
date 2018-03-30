 
# <img src='https://user-images.githubusercontent.com/9745432/37833990-120f9c5e-2ead-11e8-8d9c-6708850f84cc.png' width='110' alt='wakkle.js' title='wakkle.js'>



## Introduction

Project <a href='http://wakkle.co'>wakkle</a> is a rethink of how we can read, create and communicate information online. 

`wakkle.js` is the accompanying Javascript library that lets you display high fidel —and— emotional photography inside the web-browser.


### Motivation

Our physical world where we can experience many sorts of information in a visceral and playful manner holds little resemblance to the digital world.

After all, <em>smart</em> devices are still governed by flat and two-dimensional imagery, whereas in reality we can touch and explore our surroundings and grasp spatial information through different lines of sight and the way how sight and sound change. 

You can say physical perception and screen based media hitherto contradicts each other. 

But if we follow the principle of Emotional Designe and start designing digital products for perception and emotion, we can create experiences that not only stand out of the crowd but stay in users' minds.


### Examples

How this can look like can be seen in an early prototype of `wakkle.js` titled <a href='http://wakkle.co/campus-dessau'>Campus Dessau</a>. The application guides you around the university campus of the Anhalt University of Applied Sciences in Germany with its famous <a href='https://www.bauhaus-dessau.de/en/history/bauhaus-dessau.html'>Bauhaus</a> on it.

But `wakkle.js` found also application in simpler setups e.g. just showing and linking multiple products of a <a href='http://kommod-nea.de'>fabric shop</a> (see images below).

![Image control through device orientation](https://user-images.githubusercontent.com/9745432/36902425-af3c2eb8-1e2a-11e8-8d23-0f32b7e2b76f.gif) | ![Image control through touch and drag](https://user-images.githubusercontent.com/9745432/36902427-af569672-1e2a-11e8-824a-e86b57cc69ec.gif)
:--------------------------------:|:-----------------------------:
<small>Device orientation</small> | <small>Touch and drag</small>


## Table of contents

* [Installation](#installation)
* [Directory structure](#directory-structure)
    * [Static image](#static-image)
    * [Assets](#assets)
        * [Sequence of images](#sequence-of-images-required)
        * [Sound](#sound-optional)
        * [Mask](#mask-optional)
        * [Meta](#meta-optional)
* [Controllers](#controllers)
    * [Device orientation](#device-orientation)
    * [Touch drag](#touch-drag)
    * [Head move](#head-move)
    * [Mouse move](#mouse-move)
    * [Mouse drag](#mouse-drag)
* [Components](#components)
    * [Sound](#sound)
    * [Markup](#markup)
    * [Vector](#vector)
    * [Masks](#masks)
* [Options](#options)
* [Photo production workflow](#photo-production-workflow)
* [How to contribute?](#how-to-contribute)

## Installation

1. Insert as many wakkle images as you like on your page <a href='https://www.w3schools.com/tags/tag_img.asp'>the same way as you would do it for static, non-3D images</a>.

```html
<img src="images/{image-name}.wakkle">
``` 
><small>**Note:** The embedded image is static as well. The reason is to have a fallback in case something goes wrong in the browser. The only difference is that the original file extension is renamed from e.g. `.jpg`, `.png`, `.gif` to `.wakkle` which allows `wakkle.js` to find the according images and replace them with three-dimensional interactive images.</small>


2. Include the `wakkle.js` script on your page.

```html
<script src="wakkle.min.js"></script>
```

3. Initialize `wakkle` by calling its `init()` function.
```html
<script>
    wakkle.init();
</script>
```
><small>**Note:** The initialization requires the DOM to be ready. To make sure this is the case, I recommend initializing `wakkle` at the very end of the page.</small>


At this step, you can also pass your individual configuration to `wakkle` if you like. More details about available options later.
```html
<script>
    wakkle.init({
        ui: false
    });
</script>
```



## Directory structure
`wakkle.js` requires a specific file structure inside your `images` directory.

```
images
├── {image-name}.wakkle
└── {image-name}
    ├── 01.jpg
    ├── 02.jpg
    ├── ...
    ├── 29.jpg
    ├── 30.jpg
    ├── sound.mp3
    ├── mask.svg
    └── meta.json
```

As you can see, your `{image-name}` is represented on two places. 

First, at `{image-name}.wakkle` which is the **static image** that you have included into your HTML file in one of the previous steps.

Second, in the name of the **directory** which contains the wakkle image's assets.


### Static image

`{image-name}.wakkle` is the image that becomes embedded in the page. It equals the image in the middle of the sequence. In case of a <span title="(30 ÷ 2 = 15)">sequence of 30 images this means image `15.jpg`</span>.

For better differentiation it got a proper name and the original file extension is replaced with `.wakkle`. 

><small>**Note:** Since the file's internal headers remain in tact the image can still be displayed by the browser and act as a fallback in case the browser cannot execute `wakkle.js` properly.</small>
 

### Assets

#### Sequence of images <small>**[required]**</small>

Even though the script handles any number of images, for best performance it is recommended to have a sequence of 30 images. 

The naming starts at `1` and the number of digits has to stay consistent.

><small>**Example:** If the sequence contained 30 images, which means the highest number has 2 digits, the other images need to have 2 digits as well. This can be done by filling up the missing digits with leading zeros e.g. `01.jpg`. If the sequence contained 100 images (not recommended!), the first image would be `001.jpg`.</small>

The file extension can be any that is common on the web e.g. `.jpg`, `.gif`, `.png`.


#### Sound <small>**[optional]**</small>

`sound.mp3` is a stereo ambient sound file whose channels get re-mixed according to the users interaction.

#### Mask <small>**[optional]**</small>

`mask.svg` can be used to integrate generated content better into the three-dimensional scene.

#### Meta <small>**[optional]**</small>

`meta.json` holds necessary information if you want to add other features to the three-dimensional scene, such as spatial ambient sound or HTML elements.

```javascript
{
    "WAKKLE-dataset": {
        "FOV":       92.3
        "Arc":       50,
        "ArcShift": -36,
        "OriginX":   50,
        "OriginY":   55,
        "Sound":    "sound.mp3"
    }
}
```
- <small>**FOV**</small>
    
    `FOV` is the abbreviation for <a href="https://en.wikipedia.org/wiki/Field_of_view">Field Of View</a>. It is a number in degrees which provides `wakkle.js` details about the perspective which in turn makes it possible to map objects seamlesly into the scene.

    To find out this number, you can check camera and lens specifications or simply <a href="http://exifdata.com/">look into the EXIF data</a> of one of the images in the sequence. This conditions, though, that the photo's exif data hasn't got stripped away through e.g. image compression.

- <small>**Arc**</small>
    
    Imagine two lines: One from the first standpoint directing to the center of the scene and the other from the last standpoint directing to the center of the scene.
    `Arc` is the angle (in degrees) which results between those two lines.

- <small>**ArcShift**</small>

    `ArcShift` is an angle (in degrees) that shifts the Y rotation zero.

- <small>**OriginX**</small>

    `OriginX` describes the perspective's origin on the screen in percentage.

- <small>**OriginY**</small>

    `OriginY` describes the perspective's origin on the screen in percentage.

- <small>**Sound**</small>

    `Sound` contains the name of a (stereo) sound file which is located inside the image's asset folder.



## Controllers

`wakkle.js` includes different modes of control which allow an intuitive interaction on various device types.

It automatically detects available device sensors and lets access the according controller which feels most natural.


### Device orientation

On mobile, `device_orientation` is probably the most intuitive gesture, when thinking of the metaphor holding a picture in your hands. 

<img src='https://user-images.githubusercontent.com/9745432/36917593-9061167a-1e57-11e8-9d76-17471a03ed90.jpg' width='360' alt=''>

### Touch drag

Considering that all interactions on mobile happen via touch, `touch_drag` is the secondary control mode.



### Head move

`head_move` 

On desktop computers which don't have device orientation sensors but e.g. a front-camera, the controller can be set to `head_move`. In that case, `wakkle.js` will start tracking the user's head movement and magically moves the 3D scence.

<img src='https://user-images.githubusercontent.com/9745432/36917595-909d0ee6-1e57-11e8-888b-b869e55cfd90.jpg' width='360' alt=''>

><small>**Note:** This feature is based on <a href="https://github.com/auduno">Audun Mathias Øygard</a>'s  <a href="https://github.com/auduno/headtrackr">headtrackr</a> and requires this library to be located in the same directory.</small>



### Mouse move

`mouse_move` is a controller that usually works on any desktop computer. It reacts to cursor movements.


### Mouse drag

`mouse_drag` is a controller that usually works on any desktop computer. It reacts to a combination of left click and cursor movements.




## Components

### Sound
This component requires the `sound` dataset attribute which contains the path to a sound file (relative to the image's asset folder). It can be set inside `meta.json` (recommended) or as html attribute.

### Markup
This component requires `phi` and `chi` dataset attribute or the `arc`'s angle value as well as rapping your image between `<wakkle-image>` and `</wakkle-image>`.
```html
<wakkle-image>
    <img src="images/{image-name}.wakkle">
    <object><!-- HTML goes here. --></object>
</wakkle-image>
```
Elements wrapped inside `object` will be mapped automatically  to the user's interaction. In addition, they can be moved and rotated through attributes `x`, `y`, `z` and `rotation-x`, `rotation-y`and `rotation-z`.

### Vector
><small>**Note:** This feature is not yet supported but coming soon!</small>
```html
<svg><!-- SVG goes here. --></svg>
```

### Masks
><small>**Note:** This feature is not yet supported but coming soon!</small>




## Options

- `grid`: (default: `false`) A grid on the xy plane in the scene
- `ui`: (default: `true`) Icons that allow switch between different controllers
- `fullscreen`: (default: `false`) Fullscreen button


## Photo production workflow
The production workflow for three-dimensional and audio-visual photography is a bit more challenging than regular photography. But I have tested and collected a couple of workflows which I willwrite about soon.



## How to contribute?

`wakkle.js` is created in the spare time by <a href="http://sym.design">Friedrich Schultheiß</a> and released under MIT licence.

Any help on the project is more than welcomed.
For any problem/question do not hesitate to open an issue.

`wakkle.js` is based on Webpack. If you like to contribute to the code, just make a `git clone`, let `npm` install the dev dependencies and you are ready to go.

```
git clone https://github.com/symdesign/wakkle.git
```

```
npm install
```

**If you like the project, please spread the word!**
