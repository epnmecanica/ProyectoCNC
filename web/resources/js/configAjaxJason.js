$(document).ready(function(){
    $('form').submit(function() {
         $.ajax({type: $(this).attr('method'),
             url: $(this).attr('action'),
             data: $(this).serialize(),
             dataType: 'xml',
             error: function(xhr, ajaxOptions, thrownError) {
                $('div').html('Error AJAX enviando el formulario.');
            },
            success: function(xml) {
                $('div').empty();;
                $(xml).find('contactos').each(function(){
                    $(this).find('contacto').each(function(){
                         $('div').append($(this).find('nombre').text() + ' ');
                         $('div').append($(this).find('apellidos').text() + ' ');
                         $('div').append($(this).find('edad').text() + ' ');
                         $('div').append($(this).find('direccion').text() + ' ');
                         $('div').append($(this).find('notas').text() + '<br/>');
                    });
                    return false;
                 });
            }
        })
        return false;
    });
});