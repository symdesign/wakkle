
export var Grid = function( enable ) {

    this.xy = {};
    this.yz = {};
    this.xz = {};

    var width = 50,
        height = 50,
        stroke = 'red',
        strokeWidth = '1px';

    if ( enable.xy ) {
        this.xy = {
            className:  'grid grid-xy',
            width:  width,
            height: height,
            position: {
                x: 0,
                y: height,
                z: 0
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    }
    if ( enable.yz ) {
        this.yz = {
            className:  'grid grid-yz',
            width:  50,
            height: 50,
            position: {
                x: 0,
                y: height,
                z: 0
            },
            rotation: {
                x: 0,
                y: 90,
                z: 0
            }
        };
    }
    if ( enable.xz ) {
        this.xz = {
            className:  'grid grid-xz',
            width:  50,
            height: 50,
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            rotation: {
                x: 90,
                y: 0,
                z: 0
            }
        };
    }

    var style = document.createElement('style');
    style.innerHTML = '.grid {' 
                    +   'width: 100%;'
                    +   'height: 100%;'
                    +   'background-size:  10px 10px;'
                    +   'background-image: linear-gradient(  0deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent ),'
                    +   '                  linear-gradient( 90deg, ' + stroke + ' ' + strokeWidth + ', transparent ' + strokeWidth + ', transparent );'
                    + '}';

    document.head.appendChild(style);
}