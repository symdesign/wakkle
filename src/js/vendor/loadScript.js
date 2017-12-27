function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Check if already embeded
    var scripts = document.getElementsByTagName('script');
    var exists = false;
    for (var i=0; i < scripts.length; i++) {
        src = scripts[i].getAttribute('src');
        if (src != null) {
            if ( src.search(url) > -1 ) {
                exists = true;
            }
        }
    }
    if (!exists) {
        // Fire the loading
        head.appendChild(script);
    }
}