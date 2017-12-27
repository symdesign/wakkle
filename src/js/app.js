
import * as wakkl from './modules/wakkl';

// ToDo: Config that defines which functionalities / modules need to be required or excluded


var placeholders = wakkl.collect(),
    wakklArray = [];

for (var i = 0; i < placeholders.length; i++) {
    var placeholder = placeholders[i];
    wakklArray[i] = new wakkl.image(placeholder);
    wakklArray[i].init();
}

var controller = wakkl.controller.getInstance();

controller.UI();
controller.update(wakkl[0]); // TODO: update that wakkl which is currently in viewport
