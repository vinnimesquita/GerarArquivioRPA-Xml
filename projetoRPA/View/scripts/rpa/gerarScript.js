$(document).ready(function () {
    $('#gerar').click(geraXML);
});

function geraXML() {
    var filialParam = parseInt($('#filial').val());
    var mesParam = parseInt($('#mes').val());
    var anoParam = parseInt($('#ano').val());
    var filialVal = $('#filial').val();
    var mesVal = $('#mes').val();
    var anoVal = $('#ano').val();
    const anoAtual = new Date().getFullYear();
    const mesAtual = new Date().getMonth() + 1;

    var campos = [];

    if (filialVal == 0) {
        campos.push('Filial');
    }

    if (mesVal == 0 ) {
        campos.push('Mês');
    }

    if (anoVal == 0) {
        campos.push('Ano');
    }

    if (campos.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'RPA Xml',
            text: 'Preencha o(s) campo(s): ' + campos.join(', ') + '!',
            confirmButtonColor: "#3A5693",

        })

       /* alert('Preencha o(s) campo(s): ' + campos.join(', ') + '!');*/
    }

    if (filialParam < 1 || filialParam > 4) {

        Swal.fire({
            icon: 'error',
            title: 'RPA Xml',
            text: "A filial deve ser entre 1 e 4 !",
            confirmButtonColor: "#3A5693",

        })
        limpaCampos();;
    }

    if (anoParam > anoAtual) {

        Swal.fire({
            icon: 'error',
            title: 'RPA Xml',
            text: "O ano deve ser menor ou igual a " + anoAtual + '!',
            confirmButtonColor: "#3A5693",

        })
        limpaCampos();;
    }

    if (mesParam > mesAtual) {

        Swal.fire({
            icon: 'error',
            title: 'RPA Xml',
            text: "O mês deve ser menor ou igual a " + mesAtual + '!',
            confirmButtonColor: "#3A5693",

        })
       
        limpaCampos()
    }
   
    else {

        $.ajax({
            type: "GET",
            url: 'https://localhost:7129/Rpa/GetRpa?mes=' + mesParam + '&ano=' + anoParam + '&filial=' + filialParam ,
            dataType: "text",
            success: function (xml) {
                /*console.log(xml);*/

                download(xml);
                limpaCampos();
            },
            error: function (response) {
                if (response.status == 404) {
                    Swal.fire({
                        icon: 'info',
                        title: 'RPA Xml',
                        text: "Nenhum registro encontrado !",
                        confirmButtonColor: "#3A5693",

                    })

                    limpaCampos()
                    return;
                }
             /*   alert("Ocorreu um erro inesperado durante o processamento.");*/
            }
        });
    }
}

function download(xml) {

    var a = document.createElement('a');
    var blob = new Blob([xml], { 'type': "text/xml" });
    a.href = window.URL.createObjectURL(blob);
    a.download = 'RPA';
    a.click();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Seu arquivo foi salvo !',
        showConfirmButton: false,
        timer: 1500
    })
    
}

function limpaCampos() {
    $('#filial').val('');
    $('#mes').val('');
    $('#ano').val('');
    
}


//function mostrarOnLoad() {
//    $.ajax({
//        type: "GET",
//        url: 'https://localhost:7129/Rpa/GetRpa?mes='+7+'&ano='+2022,
//        dataType: "text",
//        success: function (xml) {
//            var xmlDoc = null;
//            if (window.DOMParser) {
//                parser = new DOMParser();
//                xmlDoc = parser.parseFromString(xml, "text/xml");

//            }
//            else // Internet Explorer
//            {
//                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
//                xmlDoc.async = "false";
//                xmlDoc.loadXml(xml);

//                /*$("#IdXml").html(xml);*/
//            }
//            download(xmlDoc)
//            console.log(xmlDoc)
//            //document.open(xmlDoc);
//            //document.write(xmlDoc);
//            //document.close();

//        },
//        error: function () {
//            alert("Ocorreu um erro inesperado durante o processamento.");
//        }
//    });
//}
//function download(xmlDoc) {
    
//    var a = document.createElement('a');
//    var blob = new Blob([xmlDoc], { 'type': contentType });
//    a.href = window.URL.createObjectURL(blob);
//    a.download = teste;
//    a.click();
//}


//================================================================================================================
//$(document).ready(function () {
//    $('#gerar').click(xml);
//});



//function listarXML() {
//    console.log("entrou")
//    $.get('https://localhost:7129/Ppessoas/GetPpessoas?nome=+ "José Alves")
//    console.log("pegou LOCAL")
//        .done(function (resposta) {


//                console.log(resposta);




//        })
//        .fail(function (erro, mensagem, excecao) {
//            alert(mensagem + ': ' + excecao);
//        });
//    console.log("nao deu")
//}