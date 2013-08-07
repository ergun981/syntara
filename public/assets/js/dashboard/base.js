$(document).ready(function()
{
    $(document).on('click', '.pagination a', function()
    {
        ajaxContent($(this).attr('href'), ".ajax-content");

        return false;
    });

    $(document).on('change', '.table tbody tr td input:checkbox', function()
    {
        var parent = $(this).parents('.table'); 
        if(parent.find("tbody tr td input:checkbox:checked").length >= 1)
        {
            $('#delete-item').css('display', 'inline-block');
        }
        else
        {
             $('#delete-item').hide();
        }
    });

    $(document).on('change', '.check-all', function()
    {
        var parent = $(this).parents('.table');
        if($(this).is(':checked'))
        {
            parent.find("tbody tr td input:checkbox").prop('checked', true);
            $('#delete-item').css('display', 'inline-block');
        }
        else
        {
            parent.find("tbody > tr > td > input:checkbox").prop("checked", false);
            $('#delete-item').hide();
        }
    });
});

var ajaxContent = function(url, content, options)
{
    $.ajax(
    {
        url: url,
        type: "get",
        datatype: "html",
        data: options
    })
    .done(function(data)
    {
        $(content).empty().html(data.html);
    });
};

var showStatusMessage = function(message, type)
{
    $('.status-message').remove();
    $('.label-danger').remove();
    
    var html = '<div class="row status-message">\n\
                        <div class="col-lg-12">\n\
                            <div class="alert alert-'+type+'">\n\
                                '+message+'\n\
                            </div>\n\
                        </div>\n\
                </div>';
            
    $(html).prependTo('#main-container').hide().fadeIn(900);
};

var showRegisterFormAjaxErrors = function(errors)
{
    $('.status-message').remove();
    $('.label-danger').remove();
    for(var errorType in errors)
    {
        for(var i in errors[errorType])
        {
            $('input[name="'+errorType+'"]').closest('.form-group').append('<span class="label label-danger error-'+errorType+'">'+errors[errorType][i]+'</span>');
        }
    }
};
