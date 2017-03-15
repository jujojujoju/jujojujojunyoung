$(document).ready(function () {

    var data = [{
        "id": "1",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "2",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "3",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "4",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "5",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "6",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "7",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }, {
        "id": "8",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    },{
        "id": "9",
        "hp": "010-7758-1837",
        "regtime": "2017101212"
    }];

    $(function () {
        $('#table').bootstrapTable({
            data: data,
            pagination: true
        });

        $(".mybtn-top").click(function () {
            $('#table').bootstrapTable('scrollTo', 0);
        });

        $(".mybtn-row").click(function () {
            var index = +$('.row-index').val(),
                top = 0;
            $('#table').find('tbody tr').each(function (i) {
                if (i < index) {
                    top += $(this).height();
                }
            });
            $('#table').bootstrapTable('scrollTo', top);
        });

        $(".mybtn-btm").click(function () {
            $('#table').bootstrapTable('scrollTo', 'bottom');
        });

    });

});