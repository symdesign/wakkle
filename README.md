 
# <img src='https://user-images.githubusercontent.com/9745432/36901209-a38c1bb8-1e26-11e8-9c1b-821023e79f57.png' srcset='https://user-images.githubusercontent.com/9745432/36901210-a3a6b572-1e26-11e8-9cc7-574773799228.png 2x' alt='wakkle.js'>

The project `wakkle` is a rethink of how we can read, create and communicate information online. `wakkle.js` is the accompanying Javascript library that lets you display high fidel <u>and</u> emotional photography inside the web-browser.

## The reason

Our physical world where we can experience many sorts of information in a visceral and playful manner holds little resemblance to the digital world.

After all, <em>"smart"</em> devices are still governed by flat and two-dimensional imagery, whereas in reality we can touch and explore our surroundings and grasp spatial information through different lines of sight and the way how sight and sound change. 

Physical perception and screen based media hitherto contradicts each other. By closing that gap we can create experiences that not only stand out of the crowd but stay in users' minds.


## Examples

Different modes of control allow an intuitive interaction on various devices.

![Image control through device orientation](https://user-images.githubusercontent.com/9745432/36902425-af3c2eb8-1e2a-11e8-8d23-0f32b7e2b76f.gif) | ![Image control through touch and drag](https://user-images.githubusercontent.com/9745432/36902427-af569672-1e2a-11e8-824a-e86b57cc69ec.gif)
:--------------------------------:|:-----------------------------:
<small>Device orientation</small> | <small>Touch and drag</small>


### Demo
See the project 'Campus Dessau'. It's a concatenation of multiple wakkles.


## Files
For wakkle.js to work, it needs a specific file structure inside your `images` directory.

```
images
├── [your-image].wakkle
└── [your-image]
    ├── 01.jpg
    ├── 02.jpg
    ├── ...
    ├── 29.jpg
    ├── 30.jpg
    ├── sound.mp3
    ├── mask.svg
    └── meta.json
```

As you can see, the image filename `[your-image]` is represented on two places. This is at `[your-image].wakkle` which is a two-dimensional preview and at `[your-image]` which is the directory that contains the wakkle image's assets. 
 
Assets are a sequence of three-dimensionally photographed subject and other files such as sound or the photos's meta data (e.g. exif).

`[your-image].wakkle` equals in this case `15.jpg` inside wakkle's assets folder. It is the mid of the sequence (30 images ÷ 2 = image number 15).

### [your-image].wakkle
For better visibility you can replace the original file extension `.jpg` with `.wakkle`. Since the file's internal headers remain in tact the image can still be displayed by the browser and act as a fallback in case the browser cannot execute the `wakkle.js` properly.
 
Make sure that the folder which includes the image's assets has the same name as your wakkle-image but without its file extension.

### meta.json
`meta.json` contains the exif data of any image of the sequence. As you can see, it contains amongst other things information about the camera, the artist and the lens. But the most important information is the `FOV` (= Field Of View) which is used to map generated element into the scene.
 
I am currently working on a wizard that facilitates writing the `meta.json` file.
 
Depending on the feature components (see below) you would like to use, you can include dataset attributes to the file as well.
```
{
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

    "WAKKLE-dataset": {
        "Count": 30,
        "Phi": -36,
        "Chi": 14,
        "OriginX": "50%",
        "OriginY": "55%",
        "Sound": "sound.mp3"
    }
}
```




## Installation
1. Insert as many wakkle images as you like into your page:
```html
<img src="images/[your-image].wakkle">
``` 
2. Include the script in your page:
```html
<script src="wakkle.min.js"></script>
```
3. Initialize wakkle at the very end of your page by calling:
```html
<script>
    var options = {}; // your options (instructions below)
    wakkle.init( options );
</script>
```


## Options

- `grid`: (default: `false`) A grid on the xy plane in the scene
- `ui`: (default: `true`) Icons that allow switch between different controllers
- `fullscreen`: (default: `false`) Fullscreen button


## Controllers

### Mouse move

### Mouse drag

### Device orientation

### Touch drag

### Head move



## Feature components

### Image
This component requires the `count` dataset attribute which contains the length of the sequence. It can be set inside `meta.json` (recommended) or as html attribute.

### Sound
This component requires the `sound` dataset attribute which contains the path to a sound file (relative to the image's asset folder). It can be set inside `meta.json` (recommended) or as html attribute.

### Markup
This component requires `phi` and `chi` dataset attribute or the `arc`'s angle value as well as rapping your image between `<wakkle-image>` and `</wakkle-image>`.
```html
<wakkle-image>
    <img src="images/[your-image].wakkle">
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