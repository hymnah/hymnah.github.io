import {get_data, write_data} from "../../core/_db.js";
import {app_init} from "../../core/_firebase_src.js";
import {get_by_id, get_date_now, _prototypes} from "../../core/_helper.js";
import {_popup, _popup_close} from "../../core/_popup.js";
import {_reset_form} from "../../core/_form.js";




app_init().then(() => {

    _prototypes();
    _popup();

    let addForm = get_by_id('add-form');

    addForm.on('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(addForm);
        let formObject = Object.fromEntries(formData.entries());

        write_data({
            // access: 'public',
            title: formObject.title,
            content: formObject.content,
            creationDate: get_date_now(),
        }, 'script');

        _popup_close();
        _reset_form();
    });



    get_data('script', function (data) {
        let _html = '';

        for (let i in data) {
            if (typeof data[i] !== 'undefined') {
                let _datus = data[i];

                _html += `<div class="col-2 p-10">
                            <div class="script-item p-20 pos-rel">
                                <div class="actions pos-abs t-10 r-15">
                                    <i class="fi fi-rr-menu-dots action-script"></i>
                                </div>
                               
                                <div class="edit-script">
                                    <div class="item-title">${_datus.title}</div>
                                    <div class="item-content m-t-10">${_datus.content}</div>
                                </div>
                                <div class="item-id" hidden>${i}</div>
                            </div>
                        </div>`;
            }
        }

        get_by_id('content-panel').innerHTML = _html;
    });


    document.body.on('click', '.edit-script', function () {
        let _parent = this.closest('.script-item');
        let _title = _parent.find('.item-title').innerHTML;
        let _content = _parent.find('.item-content').innerHTML;
        let _id = _parent.find('.item-id').innerHTML;

        get_by_id('edit-title').value = _title;
        get_by_id('edit-content').value = _content;
        get_by_id('edit-id').value = _id;
    });


    let editForm = get_by_id('edit-form');
    editForm.on('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(editForm);
        let formObject = Object.fromEntries(formData.entries());

        write_data({
            // access: 'public',
            title: formObject.title,
            content: formObject.content,
            creationDate: get_date_now(),
        }, 'script', formObject._id);

        _popup_close();
        _reset_form();
    });


    document.body.on('click', '.delete-script', function () {
        // let _parent = this.closest('.script-item');
        // let _id = _parent.find('.item-id').innerHTML;
        //
        // get_by_id('delete-id').value = _id;
    });

    document.body.on('click', '.action-script', function () {
        let _parent = this.closest('.script-item');
        let _id = _parent.find('.item-id').innerHTML;

        get_by_id('delete-id').value = _id;
    });

    let deleteForm = get_by_id('delete-form');
    deleteForm.on('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(deleteForm);
        let formObject = Object.fromEntries(formData.entries());

        write_data(null, 'script', formObject._id);

        _popup_close();
        _reset_form();
    });


    // const editor = CodeMirror.fromTextArea(document.getElementById("edit-content"), {
    //     mode: "javascript", // Change this to match your language
    //     lineNumbers: true,
    //     theme: "monokai" // You can use other themes like "monokai"
    // });
    //
    // setTimeout(() => editor.refresh(), 100);

});