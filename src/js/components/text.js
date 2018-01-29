
export var Text = function( element ) {

    this.initialized    = false;
    this.q              = 0.5;

    var that = this;

    this.init = function() {

        element.text = element.wrapper.getElementsByTagName('figcaption')[0];
        element.text.classList.add('text');

        if ( !element.text ) return;

        Object.assign(element.text.style, {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        });

        this.initialized = true;

    }
}