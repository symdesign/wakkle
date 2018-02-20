
import css from './../scss/style.scss';

import * as wakkl from './components'; 
// alternatively you export wakkl here and initialize it
// in your DOM in the following way:

wakkl.init({
    grid: {
        xy: false,
        yz: false,
        xz: false
    }
});