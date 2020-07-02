var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
    session({
        secret: 'dsds68s63525ds7a8101ee95dddsb7028d6422dss857',
        resave: false,
        saveUninitialized: false,
        name: 'memory',
        maxAge: null
    })
);

app.put('/credential', 
    require('./controllers/credential.js')
);

app.post('/message', 
    require('./controllers/message.js')
);

app.get('/message/id/:id', 
    require('./controllers/message_id.js')
);

app.get('/message/tag/:tag', 
    require('./controllers/message_tag.js')
);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(2020, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("PRUEBA running on %s:%s", host, port)
});
