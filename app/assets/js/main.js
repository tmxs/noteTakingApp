import Bloodhound from 'bloodhound-js';

const $ = require('jquery');
global.$ = global.jQuery = $;

$(document).ready(function () {

    const firstNoteListItem = $('.note-item:first-child');
    const notebookDeleteButton = $('.notebooks .deleteBtn');
    const noteContent = $('.main-content .notes .note-container');

    $(firstNoteListItem).addClass('active').siblings().removeClass('active');

    $(".note-item").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $("#submitFirstPassword").click(function () {
        $("#secondPassword").removeClass('hidden');
    });

    $.ajax({
        url: $(firstNoteListItem).data('url'),
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function (xhr, textStatus, data) {
            $(noteContent).html(data['responseJSON'].response);
        }
    });

    $(".note-link").on("click", function (event) {
        const path = $(this).data('url');
        $.ajax({
            url: path,
            type: 'POST',
            dataType: 'json',
            async: true,
            success: function (xhr, textStatus, data) {
                $(noteContent).html(data['responseJSON'].response);
            }
        });
    });

    $(notebookDeleteButton).on('click', function (e) {
        const id = $(this).data('id');
        const deletePath = $(this).data('delete-path');
        if (confirm('WARNING! When deleting this notebook, all notes assigned to the notebook are also deleted!')) {
            $.ajax({
                url: deletePath,
                data: {
                    'noteId': id
                },
                type: 'POST',
                success: function (data, response) {
                    location.reload();
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert('It was not possible to delete the notebook.');
                }
            });
        }
    });

    const $input = $('input[data-toggle="tagsinput"]');
    if ($input.length) {
        const source = new Bloodhound({
            local: $input.data('tags'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            datumTokenizer: Bloodhound.tokenizers.whitespace
        });
        source.initialize();

        $input.tagsinput({
            trimValue: true,
            focusClass: 'focus',
            typeaheadjs: {
                name: 'tags',
                source: source.ttAdapter()
            }
        });
    }

});
