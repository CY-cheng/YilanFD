var myapp = {
    isDeviceSupported: false,
    isArchitectWorldLoaded: false,
    requiredFeatures: [ "image_tracking", "geo" ],
    arExperienceUrl: "www/mpoi/index.html",
    startupConfiguration:
    {
        "camera_position": "back"
    },
    
    // initialization
    initialize: function() {
        //this.bindEvents();
    },
    // set event
    bindEvents: function() {
        document.addEventListener('deviceready', myapp.onDeviceReady, false);
    },
    onDeviceReady: function() {

        myapp.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        // set a callback for android that is called once the back button was clicked.
        if ( cordova.platformId == "android" ) {
            myapp.wikitudePlugin.setBackButtonCallback(myapp.onBackButton);
        }

        myapp.wikitudePlugin.isDeviceSupported(
            myapp.onDeviceSupported,
            myapp.onDeviceNotSupported,
            myapp.requiredFeatures
        );
    },
    // run on AR supported Devices
    onDeviceSupported: function() {
        myapp.wikitudePlugin.loadARchitectWorld(
            myapp.onARExperienceLoadedSuccessful,
            myapp.onARExperienceLoadError,
            myapp.arExperienceUrl,
            myapp.requiredFeatures,
            myapp.startupConfiguration
        );
    },
    // if device isnt supported, show error
    onDeviceNotSupported: function(errorMessage) {
        alert(errorMessage);
    },
    // if AR hass been loaded successfully
    onARExperienceLoadedSuccessful: function(loadedURL) {
    },
    // if AR has not been loaded, show error message
    onARExperienceLoadError: function(errorMessage) {
        alert('Loading AR web view failed: ' + errorMessage);
    }
};

myapp.initialize();


