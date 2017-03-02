/*
* @Author: Ali
* @Date:   2017-03-02 12:38:34
* @Last Modified by:   Ali
* @Last Modified time: 2017-03-02 14:57:30
*/

(function() {
    'use strict';

    angular.module('employerdic', ['ui.router'])
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    });
})();