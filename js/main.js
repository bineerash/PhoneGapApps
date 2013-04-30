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
        $("#camera").hide();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(window).unbind("orientationchange");
        $( window ).on( "orientationchange",function(event){
            app.changeOrientation(event);
        });
        $( "div.box" ).on( 'swipeleft', this.swipeHandlerLeft );
        $( "div.box" ).on( 'swiperight', this.swipeHandlerRight );
        $( "div.box" ).on( 'taphold', this.tapHoldHandler );
//        $("div#back").on('swipeleft', this.goBack);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert("device Ready");
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        app.receivedEvent('deviceready');
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
        $("#main").show();

    },
    swipeHandlerRight:function(event){
        $(event.target).removeClass("swipeLeft");
        $(event.target).addClass("swipeRight");
        $("#main").hide();
        $("#camera").show();
        //$.mobile.changePage("#camera");
        //alert("page changed");
    },
    tapHoldHandler:function(event){
        $(event.target).removeClass("swipeLeft swipeRight");
        $(event.target).addClass("box");
    },
    goBack:function(){
        $.mobile.changePage("#main");
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
