
export const file_extension     = 'wakkle';         // your-image.wakkle
export const tagname            = 'wakkle-image';   // <wakkle-image> Note: the tagname needs to contain a dash
export const class_prefix       = 'wakkle-';        // .wakkle-sound-button, etc.
export const meta_key           = 'WAKKLE-dataset'; 

export const head_move = {
    name: 'head_move',
    icon: {
        selector: '#icon-head-move',
    },
    lib:  'js/headtrackr.min.js',
}

export const mouse_move = {
    name: 'mouse_move',
    icon: {
        selector: '#icon-mouse-move',
    },
}

export const mouse_drag = {
    name: 'mouse_drag',
    icon: {
        selector: '#icon-mouse-drag',
    },
}

export const touch_drag = {
    name: 'touch_drag',
    icon: {
        selector: '#icon-touch-drag',
    },
}

export const device_orientation = {
    name: 'device_orientation',
    icon: {
        selector: '#icon-device-orientation',
    },
}