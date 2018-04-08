
import observeResize from 'simple-element-resize-detector';

export var Markup = function( wakkle ) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        arc = wakkle.meta.Arc,
        arcShift = wakkle.meta.ArcShift,
        fontSize;
    
    var markups,
        markup,
        markupAllChildren,
        markupChildren,
        markupChild,
        position,
        rotation;

    var q,
        DDD,
        dimensions = [];

    var markups = wakkle.markup;

    this.init = function() {

        if ( !wakkle.markup ) return;

        for ( var i = 0; i < markups.length; i++ ) {

            var markup = markups[i];
            markup.i = i;

            convertAttributes( markup );
            bindFontSizes( markup );

        }

        observeResize( wakkle.wrapper, () => {

            for ( var i = 0; i < markups.length; i++ ) {

                var markup = markups[i],
                    width  = markups[i].clientWidth,
                    height = markups[i].clientHeight;

                markup.style.perspective = getCSSPerspective( wakkle.meta.FOV, width, height );

                scaleFontSize( markup );

            }

            for ( var i = 0; i < dimensions.length; i++ ) {

                var DDD = dimensions[i];
                    
                position = {
                    x: DDD.getAttribute( 'x' ) || false,
                    y: DDD.getAttribute( 'y' ) || false,
                    z: DDD.getAttribute( 'z' ) || false,
                };
                
                rotation = {
                    x: DDD.getAttribute( 'rotation-x' ) || false,
                    y: DDD.getAttribute( 'rotation-y' ) || false,
                    z: DDD.getAttribute( 'rotation-z' ) || false,
                };

                DDD.style.transform = getCSSTransform( position.x, position.y, position.z, rotation.x, rotation.y, rotation.z );

            }


        });

        this.initialized = true;

    }

    this.update = function() {
        
        for ( var i = 0; i < markups.length; i++ ) {

            var q = markups[i].querySelector('.q');

            // Math.round(q * wakkle.sequence.length) * arc / wakkle.sequence.length 

            // stepped version:
            q.style.transform = 'rotateY(' + ( Math.round( that.q * (wakkle.sequence.length-1) ) * arc/wakkle.sequence.length + arcShift ) + 'deg)';

            // (too) smooth version:
            // q.style.transform = 'rotateY( ' + ( that.q * arc + arcShift ) + 'deg )';

        }
    }

    this.insert = function( attr ) {

        var markup      = document.createElement('wakkle-markup'); // = where the css perspective is applied to
        var markupChild = document.createElement('div');    // = where attributes are assigned to 

        markupChild.id       = attr.id || '';
        markupChild.class    = attr.className;

        attr.position = attr.position || {};

        markupChild.setAttribute('x', attr.position.x || 0);
        markupChild.setAttribute('y', attr.position.y || 0);
        markupChild.setAttribute('z', attr.position.z || 0);

        attr.rotation = attr.rotation || {};

        markupChild.setAttribute('rotation-x', attr.rotation.x || 0);
        markupChild.setAttribute('rotation-y', attr.rotation.y || 0);
        markupChild.setAttribute('rotation-z', attr.rotation.z || 0); 

        // Add markup to DOM and wakkle.markup HTMLCollection
        markup.appendChild( markupChild );
        wakkle.wrapper.appendChild( markup );

        // Translate 3D attributes into CSS
        convertAttributes( markup );
        
    };

    function convertAttributes( markup ) {

        Object.assign( markup.style, {
            'position':             'absolute',
            'top':                  '0',
            'right':                '0',
            'bottom':               '0',
            'left':                 '0',
            'perspective':          getCSSPerspective( wakkle.meta.FOV, wakkle.width, wakkle.height ),
            'perspective-origin':   ( wakkle.meta.OriginX || '50%' ) + ' ' + ( wakkle.meta.OriginY || '50%' )
        });

        q = document.createElement('div'); // = where the controller is applied to
        q.className = 'q';

        Object.assign( q.style, {
            'position':         'absolute',
            'top':              '0',
            'right':            '0',
            'bottom':           '0',
            'left':             '0',
            'display':          'flex',
            'align-items':      'center',
            'justify-content':  'center',
            'perspective':      'inherit',
            'transform-style':  'preserve-3d'
        });

        markupChildren = wakkle.markup[ markup.i ].querySelectorAll('wakkle-markup > *');

        for ( var i = 0; i < markupChildren.length; i++ ) {

            markupChild = markupChildren[i];
            markupChild.style.transformStyle = 'preserve-3d';

            q.appendChild( markupChild )

            // Parse transformation attributes
            position = {
                x: markupChild.getAttribute( 'x' ) || false,
                y: markupChild.getAttribute( 'y' ) || false,
                z: markupChild.getAttribute( 'z' ) || false,
            };
            
            rotation = {
                x: markupChild.getAttribute( 'rotation-x' ) || false,
                y: markupChild.getAttribute( 'rotation-y' ) || false,
                z: markupChild.getAttribute( 'rotation-z' ) || false,
            };

            var transform = getCSSTransform( position.x, position.y, position.z, rotation.x, rotation.y, rotation.z )

            if ( transform ) {

                DDD = document.createElement('div'); // = where the transformation attributes are applied to
                dimensions.push( DDD )
                
                DDD.className = '3D';
                Object.assign( DDD.style, {
                    'position':         'absolute',
                    'width':            '50%',
                    'height':           ( 50 * wakkle.width / wakkle.height ) + '%',
                    'display':          'flex',
                    'align-items':      'center',
                    'justify-content':  'center',
                    'transform-style':  'preserve-3d',
                    'transform-orign':  'center',
                    'transform' :       transform
                });

                DDD.setAttribute( 'x', position.x );
                DDD.setAttribute( 'y', position.y );
                DDD.setAttribute( 'z', position.z );
                DDD.setAttribute( 'rotation-x', rotation.x );
                DDD.setAttribute( 'rotation-y', rotation.y );
                DDD.setAttribute( 'rotation-z', rotation.z );

                markupChild.removeAttribute('x');
                markupChild.removeAttribute('y');
                markupChild.removeAttribute('z');
                markupChild.removeAttribute('rotation-x');
                markupChild.removeAttribute('rotation-y');
                markupChild.removeAttribute('rotation-z');

                markupChild.parentNode.appendChild( DDD )
                DDD.appendChild( markupChild );
                //wrap( DDD, markupChild )

            }

        }

        markup.appendChild( q );

    }

    function getCSSPerspective( fov, width, height) {
        if ( !fov || !width || !height ) return 0;
        return Math.pow( width/2*width/2 + height/2*height/2, 0.5 ) / Math.tan( (fov/2) * Math.PI / 180 ) + 'px';
    }

    function getCSSTransform( x, y, z, rotationX, rotationY, rotationZ) {
        var transform = ''

            transform += x ? ' translateX(' + (  1 * parseFloat( x ) + parseFloat( wakkle.meta.OriginX ) ) + '%)' : '';
            transform += y ? ' translateY(' + ( -1 * parseFloat( y ) + parseFloat( wakkle.meta.OriginY ) )+ '%)' : '';
            transform += z ? ' translateZ(' + (  1 * parseFloat( z ) / 100 * getCSSPerspective( wakkle.meta.FOV, wakkle.width, wakkle.height ).replace('px','') / 2 ) + 'px)' : '';

            transform += rotationX ? ' rotateX(' + parseFloat( rotationX ) + 'deg)' : '';
            transform += rotationY ? ' rotateY(' + parseFloat( rotationY ) + 'deg)' : '';
            transform += rotationZ ? ' rotateZ(' + parseFloat( rotationZ ) + 'deg)' : '';

        return transform;
    }

    function bindFontSizes( markup ) {

        var markupAllChildren  = markup.querySelectorAll('*'),
            fontSizes   = [];
        
        for ( var i = 0; i < markupAllChildren.length; i++ ) {
            fontSizes[i] = parseFloat(window.getComputedStyle( markupAllChildren[i], null).getPropertyValue('font-size'));
            markupAllChildren[i].setAttribute('data-naturalFontSize', fontSizes[i]);
        }

        scaleFontSize( markup );

    }

    function scaleFontSize( markup ) {
        var markupAllChildren = markup.querySelectorAll('*');

        for ( var i = 0; i < markupAllChildren.length; i++ ) {

            markupAllChildren[i].style.fontSize = markupAllChildren[i].getAttribute('data-naturalFontSize') * ( wakkle.clientWidth / wakkle.naturalWidth ) + 'px';

        }
    }

    function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

}