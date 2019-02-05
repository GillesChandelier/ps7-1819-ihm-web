const   fs      = require('fs'),
        path    = require('path');

/**
 * Utility class loading and running the class from /event folder
 */
class Event {

    constructor() {
        this.startFolder = null;
    }

    /**
     * Add listener from the class in the event folder
     * Called once for each socket connection
    */
    load(socket, folderName) {
        if (!this.startFolder) this.startFolder = path.basename(folderName);

        fs.readdirSync(folderName).forEach((file) => {

            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);

            if (stat.isDirectory()) {
                //Recursively walk-through folders
                this.load(socket, fullName);
            } else if (file.toLowerCase().indexOf('.js')) {
                //Grab path to JavaScript file and use it to construct the route
                let dirs = path.dirname(fullName).split(path.sep);

                if (dirs[0].toLowerCase() === this.startFolder.toLowerCase()) {
                    dirs.splice(0, 1);
                }

                //Load the JavaScript file ("event") and pass the socket to it
                const eventClass = require('../' + fullName);
                const event = new eventClass(socket);
            }
        });
    }

}

module.exports = new Event();
