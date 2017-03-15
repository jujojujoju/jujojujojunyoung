<html>

<head>
    <title>게시판</title>


    <!-- Jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <!-- Bootstrap -->
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <!-- Latest compiled and minified JavaScript -->

    <!--bootstrap-table-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">

    <!-- index CSS file import -->
    <link rel="stylesheet" type="text/css" href="global.css">
    <link rel="stylesheet" type="text/css" href="table.css">

    <!-- javscript import -->
    <script src="table.js"></script>


</head>

<body>

<div class="form-inline">
    <button type="button"
            class="btn btn-default mybtn-top">
        Scroll to top
    </button>
    <button type="button"
            class="btn btn-default mybtn-row">
        Scroll to row index:
    </button>
    <input type="number"
           class="form-control row-index"
           value="3" min="0">
    <button type="button"
            class="btn btn-default mybtn-btm">
        Scroll to bottom
    </button>
</div>

<div style="padding: 10px; ">
    <br>
    <table id="table" data-search="true" data-show-columns="true" data-pagination="true" data-height="250">
        <thead>
        <tr>
            <th data-field="stargazers_count" data-sortable="true">Stars</th>
            <th data-field="name" data-sortable="true" width="200">Name</th>
            <th data-field="forks_count" data-sortable="true">Forks</th>
            <th data-field="description" data-sortable="true">Description</th>
        </tr>
        </thead>
    </table>
</div>

</body>

</html>