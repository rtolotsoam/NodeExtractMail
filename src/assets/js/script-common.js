$(function(){
	$('.dt-table').DataTable({
        responsive: true,
        //            "columnDefs": [ { "targets": [0], "orderable": false }],
        "oLanguage": {
            "sLengthMenu": '<select class="td-select form-control">' +
                '<option value="10">10</option>' +
                '<option value="20">20</option>' +
                '<option value="30">30</option>' +
                '<option value="40">40</option>' +
                '<option value="50">50</option>' +
                '<option value="-1">All</option>' +
                '</select>' + '<span class="r-label">Entries</span>'
        },
        "dom": '<"row" <"col-md-6"l><"col-md-6"f>><"row" <"col-md-12"<"td-content"rt>>><"row" <"col-md-6"i><"col-md-6"p>>'
    });
});