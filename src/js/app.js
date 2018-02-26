
import './../scss/style.scss';

import 'document-register-element';

import * as wakkl from './components'; 
// alternatively you export wakkl here and initialize it
// in your DOM in the following way:

wakkl.init({
    grid: false,
    ui: true
});