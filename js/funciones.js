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

function Volver(){
    location.reload();
}

function AgregarOpcion() {
    let tableJquey = $('#tblOpciones').DataTable();
    let tr = document.createElement('tr');
    let tdOpcion = document.createElement('td');
    let tdActions = document.createElement('td');
    var nombreOpcion = $('[id$=txtOpcion]').val();
    
    if (!nombreOpcion) {
        Swal.fire({
            icon: 'error',
            title: 'Atención',
            text: 'Complete el nombre de la opción'
            })
        return;
    }

    tdActions.classList.add('text-center');

    let div = document.createElement('div');
    div.classList.add('btn-group');

    let buttonTrash = CreateButton('fa-trash');
    buttonTrash.setAttribute('onclick', 'RemoveRow(this.closest("tr")); return false;');
    buttonTrash.setAttribute('style', 'color: black;');

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

startAngle = 0;
options = [];
spinTimeout = null;

function llenarOpciones(){

    var table = document.getElementById('tblOpciones'),
    rows = table.getElementsByTagName('tr'),
    i, j, cells;
    for (i = 0, j = rows.length; i < j; ++i) {
        cells = rows[i].getElementsByTagName('td');
        if (!cells.length) {
            continue;
        }
        options.push(cells[0].innerHTML);
    }

    if(options.length <= 1){
    Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: 'Debe ingresar al menos 2 opciones'
        })
        options = [];
    }else{

    $('#modalCargaOpciones').modal('hide');
    var spinArcStart = 10;
    var spinTime = 0;
    var spinTimeTotal = 0;
    arc = Math.PI / (options.length / 2);
    var ctx;

    document.getElementById("spin").addEventListener("click", spin);
    drawRouletteWheel();
    }
}

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;

    red   = Math.sin(frequency*item+2+phase) * width + center;
    green = Math.sin(frequency*item+0+phase) * width + center;
    blue  = Math.sin(frequency*item+4+phase) * width + center;

    return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 0;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.font = 'bold 15px Helvetica, Arial';

        for(var i = 0; i < options.length; i++) {
            
            var angle = startAngle + i * arc;
            //ctx.fillStyle = colors[i];
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();

            ctx.shadowColor   = "rgb(220,220,220)";
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                            250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        } 

        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 2000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 20;
    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }

    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    var text = options[index];
    Swal.fire({
            imageUrl: 'https://i.pinimg.com/originals/4c/32/82/4c3282033866e22b7ceab02b84899b2a.gif',
            imageWidth: 300,
            imageHeight: 300,
            title: text,
            width: 600,
            padding: '3em',
            background: '#fff url(img/confeti.gif)'
            })
    //ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}