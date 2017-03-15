/**
 * Created by junyoung on 2017. 3. 14..
 */


// 성공시 / 전화번호 중복 시 / 에러 발생 시
var queryParam = decodeURIComponent(window.location.search.substring(1));
if (queryParam == 'success') {
    alert('성공적으로 등록하였습니다.');
} else if (queryParam == 'duplication') {
    alert('전화번호가 중복됩니다.');
} else if (queryParam == 'fail') {
    alert('데이터베이스 에러가 발생했습니다.')
}

$(document).ready(function () {

    $('#hp_form').submit(function () {

        // TODO 로딩아닌데 로딩인척하기

        var isNum1 = /^\d+$/.test($('#hp_input_2').val());
        var isNum2 = /^\d+$/.test($('#hp_input_3').val());

        if (!isNum1 || !isNum2) {
            alert('전화번호 형식에 맞게 입력해 주세요!');
            $('#hp_input_2').val('');
            $('#hp_input_3').val('');
            return false;
        } else {
            return true;
        }
    });
});