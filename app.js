var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('./config/secret');

var app = express();
var routes = express.Router();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
app.use('/table', routes);

app.set('view engine', 'ejs');
app.set('secret', config.secret);

var mysql = require('mysql');
var databaseConfig = require('./config/secret.js');
var connection = mysql.createConnection({
    host: databaseConfig.db_host,
    user: databaseConfig.db_user,
    password: databaseConfig.db_password,
    database: databaseConfig.db_name
});

app.get('/auth', function (req, res) {
    res.render('pages/auth');
});

// 토큰 인증 미들웨어
routes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                res.redirect('/auth?login-please');
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.redirect('/auth?login-please');
    }
});

app.post('/auth', function (req, res) {
    var key = config.secret;
    var password = req.body.password;

    // 암호화
    var cipher = crypto.createCipher('aes192', key);
    cipher.update(password, 'utf8', 'base64');
    var cipheredPassword = cipher.final('base64');

    connection.query('SELECT * from auth', function (err, rows) {
        if (err) throw err;
        // TODO 예외처리

        // 패스워드 확인
        if (rows[0].password == cipheredPassword) {

            var token = jwt.sign(req.body, app.get('secret'), {
                expiresIn: '1h'
            });

            res.redirect('/table?token='+token);
        } else {
            res.redirect('/auth?fail');
        }

    });
});

app.get('/', function(req,res){
   res.render('pages/index')
});

app.get('/hp', function (req, res) {
    res.render('pages/hp')
});

app.post('/hp', function (req, res) {

    var hp = req.body.hp_input_1 + '-' + req.body.hp_input_2 + '-' + req.body.hp_input_3;

    connection.query('SELECT * FROM hps WHERE hp = \'' + hp + '\'', function (err, rows, fields) {

        if (err) {
            console.log('ERROR :: database select query error');
            console.log(err);
            res.redirect('/hp?fail');
        } else if (rows.length != 0) {
            console.log('FAIL :: hp (' + hp + ' ) is duplicated');
            res.redirect('/hp?duplication');
        } else {
            // 등록시간
            var date = new Date();
            var formatDate = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);

            // mysql INSERT 쿼리
            connection.query('INSERT INTO hps (hp, hp_regtime)' + ' VALUES (\'' + hp + '\',' + formatDate + ')',
                function (err, rows, fields) {
                    // 실패시
                    if (err) {
                        console.log('ERROR :: database insert query error');
                        console.log(err);
                        res.redirect('/hp?fail');
                    }

                    console.log('SUCCESS :: hp (' + hp + ' ) insert success');
                    res.redirect('/hp?success');
                });
        }

    });

});

app.get('/table', function (req, res) {
    connection.query('SELECT * from hps', function (err, rows) {
        if (err) throw err;
        // TODO 예외처리

        var data = rows;
        res.render('pages/table', {
            data: data
        });
    });

});


app.listen(3000, function () {
});
