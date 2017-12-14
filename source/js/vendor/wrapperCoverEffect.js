/*! THIS IS A MODIFICATION OF
 *
 *  imgCoverEffect (https://github.com/namniak/imgCoverEffect)
 *  Version:  0.2.1
 *
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 *  Copyright (c) 2014 Vadim Namniak
 */


function wrapperCoverEffect( wrapper, opts ) {

    opts.watchResize = (opts.watchResize !== false)

    if (typeof opts.watchResize !== 'boolean') {
        throw new Error('From wrapperCoverEffect(): "watchResize" property must be set to a Boolean when the option is specified.')
    }
    if (!wrapper.parentNode) {
        throw new Error('From wrapperCoverEffect(): passed HTML Element has no parent DOM element.')
    }

    var parent                = wrapper.parentNode
    var lastParentWidth       = 0
    var lastParentHeight      = 0
    var currParentWidth       = 0
    var currParentHeight      = 0
    var parentAspect          = 0
    var wrapperWidth          = 0
    var wrapperHeight         = 0
    var wrapperAspect         = opts.wrapperAspect || 3/2
    var backgroundPosition    = opts.backgroundPosition || 'center center'
        backgroundPosition    = backgroundPosition.match(/\w+/g)

    parent.style.overflow     = 'hidden'
    wrapper.style.position    = 'fixed' // lock position on iPad
    wrapper.style.top         = 0
    wrapper.style.left        = 0
    wrapper.style.transition = 'transform 1s ease'

    resizeWrapper()


    function resizeWrapper() {

        if (opts.watchResize === true) {
            requestAnimationFrame(resizeWrapper)
        }

        currParentWidth = parent.clientWidth
        currParentHeight = parent.clientHeight

        parentAspect = currParentWidth / currParentHeight


        if ((currParentWidth !== lastParentWidth) || (currParentHeight !== lastParentHeight)) {

            if (parentAspect >= wrapperAspect) {
                wrapperWidth = currParentWidth
                wrapperHeight = wrapperWidth / wrapperAspect
            } else {
                wrapperWidth = currParentHeight * wrapperAspect
                wrapperHeight = currParentHeight
            }

            lastParentWidth = currParentWidth
            lastParentHeight = currParentHeight

            wrapper.style.width = wrapperWidth + 'px'
            wrapper.style.height = wrapperHeight + 'px'


            if ( backgroundPosition[0] == 'center' ) {
                wrapper.style.left = (currParentWidth - wrapperWidth) / 2 + 'px'
            }
            if ( backgroundPosition[0] == 'right' ) {
                wrapper.style.left = (currParentWidth - wrapperWidth) + 'px'
            }
            if ( backgroundPosition[0] == 'left' ) {
                wrapper.style.left = '0'
            }

            if ( backgroundPosition[1] == 'center' ) {
                wrapper.style.top = (currParentHeight - wrapperHeight) / 2 + 'px'
            }
            if ( backgroundPosition[1] == 'bottom' ) {
                wrapper.style.top = (currParentHeight - wrapperHeight) + 'px'
            }
            if ( backgroundPosition[1] == 'top' ) {
                wrapper.style.top =  '0'
            }

        }
    }
}
