var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/html'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

var mysql = require('mysql');
var databaseConfig = require('./config/database.json');
var connection = mysql.createConnection({
    host: databaseConfig.db_host,
    user: databaseConfig.db_user,
    password: databaseConfig.db_password,
    database: databaseConfig.db_name
});


app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.post('/', function (req, res) {

    var hp = req.body.hp_input_1 + '-' + req.body.hp_input_2 + '-' + req.body.hp_input_3;

    connection.query('SELECT * FROM hps WHERE hp = \'' + hp + '\'', function (err, rows, fields) {

        if (err) {
            console.log('ERROR :: database select query error');
            console.log(err);
            res.redirect('/?fail');
        } else if (rows.length != 0) {
            console.log('FAIL :: hp (' + hp + ' ) is duplicated');
            res.redirect('/?duplication');
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
                        res.redirect('/?fail');
                    }

                    console.log('SUCCESS :: hp (' + hp + ' ) insert success');
                    res.redirect('/?success');
                });
        }

    });

});


app.listen(3000, function () {
});
