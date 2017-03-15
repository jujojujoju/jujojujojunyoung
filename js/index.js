/**
 * Created by junyoung on 2017. 3. 14..
 */


$(document).ready(function () {

    $('#hp_form').submit(function () {
        var isNum1  = /^\d+$/.test($('#hp_input_2').val());
        var isNum2 = /^\d+$/.test($('#hp_input_3').val());


        if (!isNum1 || !isNum2) {
            alert('입력 폼을 확인해 주세요');
            $('#hp_input_2').val('');
            $('#hp_input_3').val('');
            return false;
        } else {
            return true;
        }
    });
});