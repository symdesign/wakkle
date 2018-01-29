
export var Grid = function( element ) {
    
    var that = this,
        listener,
        phi = -36,
        chi = 14,
        helper;

    this.q = 0.5;


    this.init = function() {
        
        function cssPerspective( fov, width, height) {
            return Math.pow( width/2*width/2 + height/2*height/2, 0.5 ) / Math.tan( (fov/2) * Math.PI / 180 );
        }

        var fov = 90; // value in 'degrees'; if value in 'radians' simply multiply it with Math.PI
        var perspective = cssPerspective( fov, element.width, element.height );

        var perspectiveOriginX = '',
            perspectiveOriginY = '';
     
        Object.assign( element.wrapper.style, {
            'perspective': perspective + 'px',
            'width': '100%',
            'height': '0',
            'padding-bottom': ( element.height / element.width * 100 ) + '%'
        })


        helper = {
            XY: {
                type: 'grid',
                width: 30,
                height: 10,
                position: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            },
            /*
            XZ: {
                type: 'grid',
                width: 20,
                height: 10,
                position: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                rotation: {
                    x: 90,
                    y: 0,
                    z: 0
                }
            },*/
            /*
            ZY: {
                type: 'grid',
                width: 20,
                height: 10,
                position: {
                    x: 0,
                    y: -5,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 90,
                    z: 0
                }
            },*/
            /*
            perspectiveOrigin: {
                type: 'dot',
                width: 2,
                height: 2,
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
            */
        }

        Object.keys( helper ).forEach(function( key ) {

            var size = {},
                position = {},
                rotation = {},
                stroke = {},
                color;
            
            size.unit       = '%';
            position.unit   = '%';
            rotation.unit   = 'deg';

            stroke.size = '1px';
            color = 'red';

            position.x = helper[key].position.x + position.unit;
            position.y = helper[key].position.y + position.unit;
            position.z = helper[key].position.z  / 100 * helper[key].width + 'px';

            rotation.x = helper[key].rotation.x + rotation.unit;
            rotation.y = helper[key].rotation.y + rotation.unit;
            rotation.z = helper[key].rotation.z + rotation.unit;

            helper[key].element = document.createElement('div');
            Object.assign( helper[key].element.style, {

                'position': 'absolute',
                'top':      '50%', // perspectiveOriginY
                'left':     '50%', // perspectiveOriginX

                'width':        helper[key].width + size.unit,
                'margin-left':  (-helper[key].width/2) + size.unit,
                'height':       size.unit == '%' ? helper[key].height / 100 * element.height + 'px' : helper[key].height + size.unit,
                'margin-top':   size.unit == '%' ? helper[key].height / 100 * element.height / 2 + 'px' : (-helper[key].height/2) + size.unit,

                'transform': 'translate3D(' + position.x + ',' + position.y + ',' + position.z + ') '
                           + 'rotateX( ' + rotation.x + ') rotateY(' + rotation.y + ') rotateZ(' + rotation.z + ') ',

                'transform-style': 'preserve-3d'

            });

            if (helper[key].type == 'dot') {
                Object.assign( helper[key].element.style, { 
                    'border-radius': '100%',
                    'background-color': color
                });
            }

            if (helper[key].type == 'grid') {

                var hlength = Math.round(helper[key].width * 0.4);
                var vlength = Math.round(helper[key].height * 0.4);
                
                helper[key].element.style.position = 'relative'

                for ( var i = 0; i < hlength; i++ ) {

                    var line  = document.createElement('div');

                    Object.assign( line.style, { 
                        'position': 'absolute',
                        'left': '0',
                        'top': i * Math.round(helper[key].width) + size.unit,
                        'width': '100%',
                        'height': '1px',
                        'background-color': color
                    });

                    helper[key].element.appendChild( line );
                }

                for ( var i = 0; i < vlength; i++ ) {

                    var line  = document.createElement('div');

                    Object.assign( line.style, { 
                        'position': 'absolute',
                        'top': '0',
                        'left': i * Math.round(helper[key].height) + size.unit,
                        'height': '100%',
                        'width': '1px',
                        'background-color': color
                    });

                    helper[key].element.appendChild( line );
                }
            }

            element.wrapper.appendChild( helper[key].element );
            

        });

        listen()
    }

    
    function listen() {
        
        var rotation = that.q * (chi-phi) + phi;

        Object.keys( helper ).forEach(function( key ) {
            var size = {},
                position = {},
                rotation = {},
                stroke = {},
                color;
            
            size.unit       = '%';
            position.unit   = '%';
            rotation.unit   = 'deg';

            position.x = helper[key].position.x + position.unit;
            position.y = helper[key].position.y + position.unit;
            position.z = helper[key].position.z / 100 * helper[key].width + 'px';

            rotation.x = helper[key].rotation.x + rotation.unit;
            rotation.y = helper[key].rotation.y + that.q * (chi-phi) + phi + rotation.unit;
            rotation.z = helper[key].rotation.z + rotation.unit;

            helper[key].element.style.transform = 'translate3D(' + position.x + ',' + position.y + ',' + position.z + ') rotateX(' + rotation.x + ') rotateY(' + rotation.y + ') rotateZ(' + rotation.z + ') '

        });

       
        
        // q = 0 -> rotation = phi ... 
        // q = 0.5 -> rotation = 0 ... 0.5 * ()
        // q = 1 -> rotation = chi

        listener = window.requestAnimationFrame(listen);
    }



}