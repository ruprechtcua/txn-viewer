'use strict';

requirejs.config({
    baseUrl: 'app',
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min',
        moment: '../node_modules/moment/min/moment.min'
    }
});

requirejs(['app', 'jquery'], function(App, $) {
    //Create App instance and execute input.txt
    App.run('app/input.txt');
});