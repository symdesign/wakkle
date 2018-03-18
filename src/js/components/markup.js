
import observeResize from 'simple-element-resize-detector';

export var Markup = function( element ) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        listener,
        phi = element.meta.Phi,
        chi = element.meta.Chi,
        fontSize;

    var objects = element.markup;

    this.init = function() {

        if ( !element.markup ) return;

        for ( var i = 0; i < objects.length; i++ ) {

            var object = objects[i];
            convertAttributes( object );
            bindFontSizes( object );

        }

        observeResize( element.wrapper, () => {

            for ( var i = 0; i < objects.length; i++ ) {

                var object = objects[i],
                    width  = objects[i].clientWidth,
                    height = objects[i].clientHeight;

                object.style.perspective = getCSSPerspective( element.meta.FOV, width, height );

                scaleFontSize( object );

            }

        });

        this.initialized = true;

    }

    this.update = function() {
        
        for ( var i = 0; i < objects.length; i++ ) {

            var q = objects[i].querySelector('.q');
            q.style.transform = 'rotateY( ' + ( that.q * (chi-phi) + phi ) + 'deg )';

        }
    }

    this.insert = function( attr ) {

        var object    = document.createElement('object'); // = where the css perspective is applied to
        var childNode = document.createElement('div');    // = where attributes are assigned to 

        childNode.id       = attr.id || '';
        childNode.class    = attr.className;

        attr.position = attr.position || {};

        childNode.setAttribute('x', attr.position.x || 0);
        childNode.setAttribute('y', attr.position.y || 0);
        childNode.setAttribute('z', attr.position.z || 0);

        attr.rotation = attr.rotation || {};

        childNode.setAttribute('rotation-x', attr.rotation.x || 0);
        childNode.setAttribute('rotation-y', attr.rotation.y || 0);
        childNode.setAttribute('rotation-z', attr.rotation.z || 0); 

        childNode.setAttribute('width', attr.width || 0),
        childNode.setAttribute('height', attr.height || 0); 

        // Add object to DOM and element.markup HTMLCollection
        object.appendChild( childNode );
        element.wrapper.appendChild( object );

        // Translate 3D attributes into CSS
        convertAttributes( object );
        
    };

    function convertAttributes( object ) {

        for ( var j = 0; j < object.children.length; j++ ) {

            var childNode = object.children[j];

            var q    = document.createElement('div'), // = where the controller is applied to
                xyz  = document.createElement('div'), // = where the transformation attributes are applied to
                size = childNode;                     // = where the size attribute is applied to

            q.className = 'q';

            // Parse attributes
            var id     = childNode.id   || '',
            className = childNode.class || '',
            
            position = {
                x: childNode.getAttribute( 'x' ) || 0,
                y: childNode.getAttribute( 'y' ) || 0,
                z: childNode.getAttribute( 'z' ) || 0,
            },
            rotation = {
                x: childNode.getAttribute( 'rotation-x' ) || 0,
                y: childNode.getAttribute( 'rotation-y' ) || 0,
                z: childNode.getAttribute( 'rotation-z' ) || 0,
            },

            width   = childNode.getAttribute( 'width' )   || 'auto',
            height  = childNode.getAttribute( 'height' )  || 'auto';

            origin = {
                x: ( 50 - parseFloat( element.meta.OriginX ) ) * 2,
                y: ( 50 - parseFloat( element.meta.OriginY ) ) * 2
            }
            

            // Translate attributes to CSS
            childNode.id        = id;
            childNode.className = className;

            xyz.style.transformOrigin = 'center';
            xyz.style.transform = ' translateX(' + -1 * ( parseInt(position.x) + origin.x ) + '%)'
                                      + ' translateY(' + -1 * ( parseInt(position.y) + origin.y ) + '%)'
                                      + ' translateZ(' + -1 * ( position.z / 100 * element.width ) + 'px)'
                                      + ' rotateX(' + rotation.x + 'deg)' 
                                      + ' rotateY(' + rotation.y + 'deg)'
                                      + ' rotateZ(' + rotation.z + 'deg)';
            size.style.width = width;
            size.style.height = height;

            object.appendChild( q );
            q.appendChild( xyz );
            xyz.appendChild( size );


            Object.assign( object.style, {
                'position':             'absolute',
                'top':                  '0',
                'right':                '0',
                'bottom':               '0',
                'left':                 '0',
                'perspective':          getCSSPerspective( element.meta.FOV, element.width, element.height ),
                'perspective-origin':   ( element.meta.OriginX || '50%' ) + ' ' + ( element.meta.OriginY || '50%' )
            });
            Object.assign( q.style, {
                'position':         'absolute',
                'top':              '0',
                'right':            '0',
                'bottom':           '0',
                'left':             '0',
                'display':          'flex',
                'align-items':      'center',
                'justify-content':  'center',
            });
            Object.assign( xyz.style, {
                'position':         'absolute',
                'width':            '50%',
                'height':           ( 50 * element.width / element.height ) + '%',
                'display':          'flex',
                'align-items':      'center',
                'justify-content':  'center'
            });
            Object.assign( size.style, {
                'position':         'absolute'
            });
        }
    }

    function getCSSPerspective( fov, width, height) {
        if ( !fov || !width || !height ) return 0;
        return Math.pow( width/2*width/2 + height/2*height/2, 0.5 ) / Math.tan( (fov/2) * Math.PI / 180 ) + 'px';
    }

    function bindFontSizes( object ) {

        var childNodes  = object.querySelectorAll('*'),
            fontSizes   = [];
        
        for ( var i = 0; i < childNodes.length; i++ ) {
            fontSizes[i] = parseFloat(window.getComputedStyle( childNodes[i], null).getPropertyValue('font-size'));
            childNodes[i].setAttribute('data-naturalFontSize', fontSizes[i]);
        }

        scaleFontSize( object );

    }

    function scaleFontSize( object ) {
        var childNodes = object.querySelectorAll('*');

        for ( var i = 0; i < childNodes.length; i++ ) {

            childNodes[i].style.fontSize = childNodes[i].getAttribute('data-naturalFontSize') * ( element.clientWidth / element.naturalWidth ) + 'px';

        }
    }

}