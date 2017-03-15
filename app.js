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

    //TODO : 중복된 전화번호 거르기

    connection.query('SELECT * FROM hps WHERE hp = ' + hp, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else if (rows.length != 0) {
            res.send('<script type="text/javascript">alert("휴대폰 번호 중복.");</script>');
        } else {
            // 등록시간
            var date = new Date();
            var formatDate = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() + 1 ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);

            // mysql INSERT 쿼리
            connection.query('INSERT INTO hps (hp, hp_regtime)' + ' VALUES (\'' + hp + '\',' + formatDate + ')',
                function (err, rows, fields) {
                    // 실패시
                    if (err) {
                        // TODO 실패 알림 / index 페이지 리다이렉트
                        console.log(err);
                        res.send('<script type="text/javascript">alert("데이터베이스 추가 중 에러가 발생했습니다.");</script>');
                        // res.sendFile();
                    }


                    // TODO 성공시 성공 알림 / index 페이지 리다이렉트
                    res.send('<script type="text/javascript">alert("성공적으로 응모 완료.");</script>');

                    // res.sendFile('html/index.html', {root: __dirname});
                });
        }

    });

});


app.listen(3000, function () {
});
