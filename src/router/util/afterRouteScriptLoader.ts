import { Route } from 'vue-router';


function loadJS() {
    const vendorJS = document.createElement('script');
    vendorJS.setAttribute('src', '/compiled/js/compile_000.js');
    document.body.appendChild(vendorJS);

    document.body.addEventListener('mousewheel', (e) => {
        e.preventDefault();
    }, { passive: false });
}


function loadCSS() {
    const head = document.getElementsByTagName('head')[0];
    const cssnode = document.createElement('link');

    cssnode.type = 'text/css';
    cssnode.rel = 'stylesheet';
    cssnode.href = '/compiled/css/compile_000.css';

    head.appendChild(cssnode);
}


export default function(to: Route, from: Route) {
    loadJS();
    loadCSS();
}

