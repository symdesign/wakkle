
export var Markup = function( element ) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        listener,
        phi = element.meta.Phi,
        chi = element.meta.Chi;

    var objects = element.markup;

    this.init = function() {

        if ( !element.markup ) return;

        for ( var i = 0; i < objects.length; i++ ) {

            var object = objects[i];
            convertAttributes( object );

        }

        this.initialized = true;

    }

    this.update = function() {
        
        for ( var i = 0; i < objects.length; i++ ) {

            var object = objects[i];
            object.style.transform = 'rotateY( ' + ( that.q * (chi-phi) + phi ) + 'deg )';

        }
    }

    this.insert = function( attr ) {

        var object    = document.createElement('object'); // = where the controller is applied to
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

            var placement = document.createElement('div'), // = where the transformation attributes are applied to
                size      = childNode;                     // = where the size attribute is applied to

            // Parse attributes
            var id     = childNode.id    || '',
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

            placement.style.transformOrigin = 'center';
            placement.style.transform = ' translateX(' + -1 * ( parseInt(position.x) + origin.x ) + '%)'
                                      + ' translateY(' + -1 * ( parseInt(position.y) + origin.y ) + '%)'
                                      + ' translateZ(' + -1 * ( position.z / 100 * element.width ) + 'px)'
                                      + ' rotateX(' + rotation.x + 'deg)' 
                                      + ' rotateY(' + rotation.y + 'deg)'
                                      + ' rotateZ(' + rotation.z + 'deg)';
            size.style.width = width;
            size.style.height = height;

            object.appendChild( placement );
            placement.appendChild( size );

            Object.assign( object.style, {
                'position':         'absolute',
                'width':            '100%',
                'height':           '100%',
                'display':          'flex',
                'align-items':      'center',
                'justify-content':  'center',

            });
            Object.assign( placement.style, {
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

}

