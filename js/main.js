/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {



    // Application Constructor
    initialize: function() {
        $.support.cors = true;
        this.bindEvents();
        $($.find("[data-role='content']")).hide();
        $("#home").show();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener("backbutton", app.onBackButton, false);
        $(window).unbind("orientationchange");
        $( window ).on( "orientationchange",function(event){
            app.changeOrientation(event);
        });
        $( "div.box" ).on( 'swipeleft', this.swipeHandlerLeft );
        $( "div.box" ).on( 'swiperight', this.swipeHandlerRight );
        $( "div#main" ).on( 'swiperight', this.mainSwipeRight );
//        $( "div#camera" ).on( 'swipeleft', this.mainSwipeLeft );
        $( "div.box" ).on( 'taphold', this.tapHoldHandler );

//        $("div#back").on('swipeleft', this.goBack);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {


        document.addEventListener("backbutton", app.onBackButton, true);
        document.addEventListener("menubutton", app.onBackButton, true);
        navigator.accelerometer.getCurrentAcceleration(app.onSuccess, app.onError);

        //cordova.exec.overrideBackButton();
        navigator.notification.alert(
            'You are the winner!',  // message
            app.alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
       // alert("device Ready");
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        app.receivedEvent('deviceready');
        app.startWatch();
        app.startWatchCompass();



    },
    // start monitoring the state of the accelerometer
    startWatchCompass: function () {
        var options = { frequency: 500 };
        navigator.compass.watchHeading(app.onHeadingSuccess, app.onError, options);
    },

    // start monitoring the state of the accelerometer
    startWatch: function () {
        var options = { frequency: 500 };
        navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },

    // start monitoring the state of the accelerometer
    onHeadingSuccess: function (heading) {
        document.getElementById("heading").innerHTML = "You are Heading: " + heading.magneticHeading;

    },
    // onSuccess: Get a snapshot of the current acceleration
    //
    onSuccess: function (acceleration) {
//    alert('Acceleration X: ' + acceleration.x + '\n' +
//        'Acceleration Y: ' + acceleration.y + '\n' +
//        'Acceleration Z: ' + acceleration.z + '\n' +
//        'Timestamp: '      + acceleration.timestamp + '\n');

        document.getElementById("valueX").innerHTML = "X Cordinate: " + acceleration.x;
        document.getElementById("valueY").innerHTML = "Y Cordinate: " + acceleration.y;
        document.getElementById("valueZ").innerHTML = "Z Cordinate: " + acceleration.z;
        document.getElementById("timestamp").innerHTML = "Timestamp: " + acceleration.timestamp;
},

// onError: Failed to get the acceleration
//
    onError: function () {
        alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
},

    alertDismissed:function(){

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },


    callCamera:function(){
        $($.find("[data-role='content']")).hide();
        $("#camera").show();
    },
    callAccelerometer:function(){
        $($.find("[data-role='content']")).hide();
        $("#accelerometer").show();
    },
    callCompass:function(){
        $($.find("[data-role='content']")).hide();
        $("#compass").show();
    },

    // Gets the Device information on click of the button.
    callDevice:function(){

        navigator.notification.alert(
            '<<<<  ----- Device Information -------- >>>> <br/>'+
            'Device Name: '     + device.name     + '<br />' +
                'Device Cordova: '  + device.cordova + '<br />' +
                'Device Platform: ' + device.platform + '<br />' +
                'Device UUID: '     + device.uuid     + '<br />' +
                'Device Model: '    + device.model     + '<br />' +
                'Device Version: '  + device.version  + '<br />',  // message
            app.alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
        /*element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
            'Device Cordova: '  + device.cordova + '<br />' +
            'Device Platform: ' + device.platform + '<br />' +
            'Device UUID: '     + device.uuid     + '<br />' +
            'Device Model: '    + device.model     + '<br />' +
            'Device Version: '  + device.version  + '<br />';*/
    },
    getGeoLocation:function(){
        navigator.geolocation.getCurrentPosition(app.onGeoSuccess, app.onError);
    },
    onGeoSuccess:function(position){
        alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
    },

    changeOrientation:function(event){
        alert("Orientation of the device is : "+ event.orientation);

        $( "#orientation" ).text( "This device is in " + event.orientation + " mode!" );
    },
    submitForm:function(){
        alert("Form submitted!");
    },
    swipeHandlerLeft:function(event){
        $(event.target).removeClass("swipeRight");
        $(event.target).addClass("swipeLeft");
//        $.mobile.changePage("index.html");
        $("#camera").hide();
        $("#home").show();

    },
    swipeHandlerRight:function(event){
        $(event.target).removeClass("swipeLeft");
        $(event.target).addClass("swipeRight");
        $("#main").hide();
        $("#camera").show();
        //$.mobile.changePage("#camera");
        //alert("page changed");
    },
    mainSwipeRight:function(event){
        $("#main").hide();
        $("#camera").show();
    },
    mainSwipeLeft:function(event){
        $($.find("[data-role='content']")).hide();
        $("#main").show();
    },
    tapHoldHandler:function(event){
        $(event.target).removeClass("swipeLeft swipeRight");
        $(event.target).addClass("box");
    },
    goBack:function(){
        $.mobile.changePage("#main");
    },
    onBackButton:function(){
        console.log(navigator.app);
        confirm("Do you really want to Exit?");
       // navigator.app.exitApp();
        //navigator.app.exitApp();

    },

    // Called when a photo is successfully retrieved
    //
     onPhotoDataSuccess: function(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
},

// Called when a photo is successfully retrieved
    //
     onPhotoDataSuccess: function(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
},

// Called when a photo is successfully retrieved
//
 onPhotoURISuccess: function(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
},

// A button will call this function
//
 capturePhoto: function() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
},

// A button will call this function
//
 capturePhotoEdit: function() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
},

// A button will call this function
//
 getPhoto: function(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
},

// Called if something bad happens.
//
 onFail: function(message) {
    alert('Failed because: ' + message);
}





};
var pictureSource;
var destinationType;
