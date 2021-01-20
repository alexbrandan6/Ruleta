$(document).ready(function() {
    $('#modalCargaOpciones').modal('show');

    $('#tblOpciones').dataTable({
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        }
    });
});

function AgregarOpcion() {
        let tableJquey = $('#tblOpciones').DataTable();
        let tr = document.createElement('tr');
        let tdOpcion = document.createElement('td');
        let tdActions = document.createElement('td');
        var nombreOpcion = $('[id$=txtOpcion]').val();
        
        if (!nombreOpcion) {
            alert('Complete los datos');
            return;
        }

        tdActions.classList.add('text-center');

        let div = document.createElement('div');
        div.classList.add('btn-group');

        let buttonTrash = CreateButton('fa-trash');
        buttonTrash.setAttribute('onclick', 'RemoveRow(this.closest("tr")); return false;');

        div.append(buttonTrash);
        tdActions.append(div);

        tdOpcion.textContent = nombreOpcion;

        tr.append(tdOpcion);
        tr.append(tdActions);

        tableJquey.row.add(tr).draw();

        $('[id$=txtOpcion]').val('');
    }

    const CreateButton = (faClass) => {
        let button = document.createElement('button');
        let i = document.createElement('i');
        i.classList.add('fas', faClass);
        button.setAttribute('onclick', 'return false;');
        button.classList.add('btn', 'btn-outline-light');
        button.append(i);
        return button;
    }

    const RemoveRow = (tr) => {
        let tableJquery = $('#tblOpciones').DataTable();
        tableJquery.row(tr).remove().draw();
    }