const express       = require('express'),
    exphbs          = require('express-handlebars'),
    hbsHelpers      = require('handlebars-helpers'),
    hbsLayouts      = require('handlebars-layouts'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    path            = require('path'),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),

    router          = require('./utils/router'),
    event           = require('./utils/event'),
    database        = require('./utils/database'),

    app             = express(),
    http            = require('http').Server(app);
    io              = require('socket.io').listen(http);
    port            = 8081;

/**
 * Class lauching an instance of the Node.js server
 */
class Server {

  /**
   * Server setup
   */
    constructor() {
        this.initViewEngine();
        this.initExpressMiddleWare();
        this.initDatabaseMiddleWare();
        this.initRoutes();
        this.initSocket();
        this.start();
    }

    /**
     * Launch the server online
     */
    start() {
        http.listen(port, (err) => {
            console.log('[%s] Listening on http://localhost:%d', process.env.NODE_ENV, port);
        });
    }

    /**
     * Setup hbs wrapper for handlebar
     */
    initViewEngine() {
        const hbs = exphbs.create({
            extname: '.hbs',
            defaultLayout: 'master'
        });
        app.engine('hbs', hbs.engine);
        app.set('view engine', 'hbs');
        hbsLayouts.register(hbs.handlebars, {});
    }

    /**
     * Setup the server
     */
    initExpressMiddleWare() {
        app.use(favicon(__dirname + '/public/favicon.ico'));
        app.use(express.static(path.join(__dirname + '/public')));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());

        // Temporarly removed for developpement purpose
       /*
        app.use(csrf({ cookie: true }));

        app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });
        */

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    /**
     * Connect to mongodb database
     */
    initDatabaseMiddleWare() {
      if (process.platform === "win32") {
        require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        }).on("SIGINT", () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
      }

      process.on('SIGINT', () => {
          console.log('SIGINT: Closing MongoDB connection');
          database.close();
      });

      database.open(() => {});
    }

    /**
     * Load the controllers and set the default page
     */
    initRoutes() {
        router.load(app, './controllers');

        app.get('/', (req, res) => {
          res.sendFile(__dirname + '/public/index.html');
        });

        // redirect all others to the index (HTML5 history)
        app.all('/*', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
    }

    /**
     * Setup listening and loading of the socket
     */
    initSocket() {
      io.on('connection', function(socket) {
        console.log("*** User connected");

        event.load(socket, './event');
      });
    }
}

let server = new Server();
