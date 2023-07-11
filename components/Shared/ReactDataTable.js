import React from 'react';
import $ from 'jquery';
import JSZip from 'jszip';
import 'datatables.net-dt';
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-buttons-dt'
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';

function ReactDataTable(props) {
    React.useEffect(() => {
        const { columns, data, isExportTrue, isPagingTrue, isSearching, emptyTableMessage } = props;
        $(document).ready(function () {
            let tableOptions = {
                destroy: true,
                data: data,
                columns: columns,
                paging: isPagingTrue ? true : false,
                searching: isSearching ? true : false,
                language: {
                    emptyTable: emptyTableMessage,
                    paginate: {
                        next: '<img src="/images/left.svg" style="transform:scaleX(-1)" />', 
                        previous: '<img src="/images/left.svg" />' 
                    }
                }
            };

            if (isExportTrue) {
                tableOptions['dom'] = 'Bfrtip';
                tableOptions['buttons'] = [
                    { extend: 'csv', text: 'Export Excel or CSV' }
                ];
            }

            $('#react_datatable').DataTable(tableOptions);

            window.JSZip = JSZip;
        });
    }, [props]);
    return (
        <table id="react_datatable" className="display"></table>
    );
}

export default ReactDataTable;