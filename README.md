 
# <img src='https://user-images.githubusercontent.com/9745432/36901210-a3a6b572-1e26-11e8-9cc7-574773799228.png' width='110' alt='wakkle.js' title='wakkle.js'>

Project <a href='http://wakkle.co'>wakkle</a> is a rethink of how we can read, create and communicate information online. 

`wakkle.js` is the accompanying Javascript library that lets you display high-fidel — and — emotional photography inside the web-browser.


## Motivation

Our physical world where we can experience many sorts of information in a visceral and playful manner holds little resemblance to the digital world.

After all, <em>smart</em> devices are still governed by flat and two-dimensional imagery, whereas in reality we can touch and explore our surroundings and grasp spatial information through different lines of sight and the way how sight and sound change. 

You can say physical perception and screen based media hitherto contradicts each other. 

But if we follow the principle of Emotional Designe and start designing digital products for perception and emotion, we can create experiences that not only stand out of the crowd but stay in users' minds.


## Examples

How this can look like can be seen in an early prototype of `wakkle.js` titled <a href='http://wakkle.co/campus-dessau'>Campus Dessau</a>. The application guides you around the university campus of the Anhalt University of Applied Sciences in Germany with its famous <a href='https://www.bauhaus-dessau.de/en/history/bauhaus-dessau.html'>Bauhaus</a> on it.

But `wakkle.js` found also application in simpler setups e.g. just showing and linking multiple products of a <a href='http://kommod-nea.de'>fabric shop</a> (see images below).

![Image control through device orientation](https://user-images.githubusercontent.com/9745432/36902425-af3c2eb8-1e2a-11e8-8d23-0f32b7e2b76f.gif) | ![Image control through touch and drag](https://user-images.githubusercontent.com/9745432/36902427-af569672-1e2a-11e8-824a-e86b57cc69ec.gif)
:--------------------------------:|:-----------------------------:
<small>Device orientation</small> | <small>Touch and drag</small>




## Installation

1. Insert as many wakkle images as you like on your page <a href='https://www.w3schools.com/tags/tag_img.asp'>the same way as you would do it for static images</a>.
```html
<img src="images/{image-name}.wakkle">
``` 
 The only difference is to rename the original image file extension from e.g. `.jpg`, `.png`, `.gif` etc. to `.wakkle`. This allows the script to find the according images. 

 Alternatively you could also keep the original file extension and give your image the class name `wakkle`.
```html
<img src="images/{image-name}.jpg" class="wakkle">
```

2. Include the `wakkle.js` script somewhere on your page but before you initialize it.
```html
<script src="wakkle.min.js"></script>
```
3. Initialize `wakkle` at the very end of your page by calling its `init` function.
```html
<script>
    wakkle.init();
</script>
```

At this step, you can also pass options to `wakkle` if you like.
```html
<script>
    wakkle.init({
        ui: false
    });
</script>
```
More details about available options later.


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

First, at `{image-name}.wakkle` which is the **static image** which you have included into your HTML file in one of the previous steps.

Second, in the name of the **directory** which contains the wakkle image's assets.


### Static image

`{image-name}.wakkle` equals the image in the middle of the sequence. In case of a sequence of 30 images this means image `15.jpg` (30 images ÷ 2 = image number 15).

For better visibility you can replace the original file extension `.jpg` with `.wakkle`. Since the file's internal headers remain in tact the image can still be displayed by the browser and act as a fallback in case the browser cannot execute the `wakkle.js` properly.
 

### Assets directory

Make sure that the folder which includes the image's assets has the same name as your wakkle-image but without its file extension.

#### Sequence of images <small>**[required]**</small>

Even though the script handles any number of images, for best performance it is recommended to have a sequence of 30 images.

The naming should start at `1` and be padded with leading zero until it reaches the same amount of digits as the last image in the sequence. For example if the sequence contained 30 images, the first image would be `01.jpg`. If the sequence contained 100 images (not recommended!), the first image would be `001.jpg`.

The file extension can be any that is common on the web e.g. `.jpg`, `.gif`, `.png` etc.


#### meta.json <small>**[required]**</small>

`meta.json` contains important information about the sequence. It is optional when the same information is passed as attributes on the `img` HTML element. This can cause a lot of repetition and therefore, is not recommended.

```javascript
{
    "WAKKLE-dataset": {
        "Count":     30,
        "Phi":      -36,
        "Chi":       14,
        "FOV":       92.3
        "OriginX":   50,
        "OriginY":   55,
        "Sound":    "sound.mp3"
    }
}
```

<dl>
    <dt>Count</dt>
    <dd>asdf</dd>
    <dt>Count</dt>
    <dd>asdf</dd>
</dl>

- Count
- Phi
- Chi 
- FOV But the most important information is the `FOV` (= Field Of View) which is used to map generated element into the scene.
- 



If the photo's exif data gets stripped away through compression, it can contain this data as well. As you can see, it contains amongst other things information about the camera, the artist and the lens. 
 
Depending on the feature components (see below) you would like to use, you can include dataset attributes to the file as well.
```javascript
{

    // WAKKLE-dataset goes here
    // ...

    "XMP-exif": {

        ...

        "Make": "Canon",
        "Model": "Canon EOS 600D",
        "Artist": "Friedrich Schultheiss",
        "Lens": "11-16mm",
        "ApproximateFocusDistance": 4294967295,
        
        ...

        "FOV": "92.3 deg",
        "FocalLength35efl": "11.0 mm (35 mm equivalent: 17.3 mm)",
        "HyperfocalDistance": "1.27 m",
        "LensID": "Tokina AT-X 116 AF Pro DX 11-16mm f/2.8"
    },
}
```
 
I am currently working on a wizard that facilitates writing the `meta.json` file.


#### sound.mp3 <small>**[optional]**</small>

- an ambient sound file `sound.mp3` 


#### mask.svg <small>**[optional]**</small>

- and a mask file `mask.svg` which can be used to integrate generated content better into the three-dimensional scene 


## Options

- `grid`: (default: `false`) A grid on the xy plane in the scene
- `ui`: (default: `true`) Icons that allow switch between different controllers
- `fullscreen`: (default: `false`) Fullscreen button


## Controllers

`wakkle.js` includes different modes of control which allow an intuitive interaction on various device types.

It automatically detects available device sensors and lets access the according controller which feels most natural.


### Device orientation

On mobile, `device_orientation` is probably the most intuitive gesture, when thinking of the metaphor holding a picture in your hands. 

<img src='https://user-images.githubusercontent.com/9745432/36917593-9061167a-1e57-11e8-9d76-17471a03ed90.jpg' width='360' alt=''>

### Touch drag

`touch_drag` 



### Head move

`head_move` 

On desktop computers which don't have device orientation sensors but e.g. a front-camera, you can set the event listener to `head_move` which lets `wakkle.js` track your head movement and magically moves the image.

<img src='https://user-images.githubusercontent.com/9745432/36917595-909d0ee6-1e57-11e8-888b-b869e55cfd90.jpg' width='360' alt=''>


### Mouse move

`mouse_move` is a controller that usually works on any desktop computer; it is reactive to cursor movements.


### Mouse drag

`mouse_drag` 












## Feature components

### Image
This component requires the `count` dataset attribute which contains the length of the sequence. It can be set inside `meta.json` (recommended) or as html attribute.

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
Elements wrapped inside the object will be mapped automatically  to the user's interaction. In addition, they can be moved and rotated with attributes `x`, `y`, `z` and `rotation-x`, `rotation-y`and `rotation-z`.

### Vector
This feature is not yet supported but coming soon!
```html
<svg><!-- SVG goes here. --></svg>
```

### Masks
This feature is not yet supported but coming soon!


## Workflow



## How to contribute?


wakkle.js is created in the spare time by <a href="http://sym.design">Friedrich Schultheiß</a> and released under MIT licence.

Any help on the project is more than welcomed.
For any problem/question do not hesitate to open an issue.

If you like wakkle.js start using it and spread the word!

```
git clone https://github.com/symdesign/wakkle.git
```

```
npm install
```