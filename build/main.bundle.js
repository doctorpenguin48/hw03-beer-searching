(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//ES6
var obj;
var api;
var param;
var val;
var api_string = "";

setapi();

function setapi() {
    api = 'https://api.punkapi.com/v2/beers' + api_string;
    console.log(api);

    var getBeersInformation = function getBeersInformation() {
        return fetch(api);
    };

    getBeersInformation().then(function (response) {
        return response.json();
    }).catch(function (e) {
        return console.error('You failed');
    }).then(function (response) {
        obj = response;
        createTable();
    });
}

function createTable() {
    var txt = "<table border='1px' style='border-collapse: collapse; width: 100%'>";

    txt += "<tr style='background-color: #DDDDDD;'>";
    txt += "<th>" + "Image" + "</th>";
    txt += "<th>" + "Beer name" + "</th>";
    txt += "<th>" + "Description" + "</th>";
    txt += "<th>" + "First brewed" + "</th>";
    txt += "<th>" + "Tag line" + "</th>";
    txt += "<th>" + "Food pairing" + "</th>";
    txt += "<th>" + "Yeast" + "</th>";
    txt += "</tr>";

    for (var x = 0; x < obj.length; x++) {
        // console.log(obj[x]);
        txt += "<tr>";
        txt += "<td class='cell_padding'>" + "<img src='" + obj[x].image_url + "' style='width: 50px; padding: 10px' />" + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].name + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].description + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].first_brewed + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].tagline + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].food_pairing + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].ingredients.yeast + "</td>";
        txt += "</tr>";
    }

    txt += "</table>";
    document.getElementById("table_result").innerHTML = txt;
}

$(document).ready(function () {
    $(".btn_search").click(function () {
        onclick();
    });
});

function onclick() {
    var x = 0;
    var search_name = document.getElementById("beer_name").value;
    var search_food = document.getElementById("food").value;
    var search_brewed_before = document.getElementById("brewed").value;

    if (search_name == "" && search_food == "" && search_brewed_before == "") {
        api_string = "";
    } else {
        api_string = "";
        api_string += "?";

        if (search_name != "") {
            x = x + 1;
        }
        if (search_food != "") {
            x = x + 1;
        }
        if (search_brewed_before != "") {
            x = x + 1;
        }

        for (var i = 0; i < x; i++) {
            if (search_name != "") {
                param = "beer_name";
                val = search_name;
                search_name = "";
            } else if (search_food != "") {
                param = "food";
                val = search_food;
                search_food = "";
            } else if (search_brewed_before != "") {
                param = "brewed_before";
                val = search_brewed_before;
                search_brewed_before = "";
            }
            if (i == 0) {
                api_string += param + "=" + val;
            } else {
                api_string += "&" + param + "=" + val;
            }
            param = "";
            val = "";
        }
    }

    console.log(api_string);
    setapi();
}

},{}]},{},[1]);
