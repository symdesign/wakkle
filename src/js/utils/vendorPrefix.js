

function getPrefix( prefixes ) {

    var tmp = document.createElement('div'),
        result = '';
 
    for (var i = 0; i < prefixes.length; ++i) {
        result = typeof tmp.style[prefixes[i]] != 'undefined' ? prefixes[i] : null
    }

    return result;
 }


export var prefix = {
    transform:  getPrefix(['transform', 'msTransform', 'MozTransform', 'WebkitTransform', 'OTransform']),
    transition: getPrefix(['transition', 'msTransition', 'MozTransition', 'WebkitTransition', 'OTransition']),
    animation:  getPrefix(['animation', 'msAnimation', 'MozAnimation', 'WebkitAnimation', 'OAnimation']),
    clipPath:   getPrefix(['clipPath', 'WebkitClipPath']),
}
