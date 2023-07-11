HTMLElement.prototype.multifields = function (settings, addCallback, minCallback) {
    let thisObj = this;
    let multiFields = {
        addCtrl: settings.addCtrl,
        minCtrl: settings.minCtrl,
        refObj: thisObj,

        addFn: function () {
            let refObj = this.refObj;
            let insertAfter = this.insertAfter;
            let thisAddCtrl = this.addCtrl;

            document.addEventListener('click', function (e){
                const target = e.target.closest(thisAddCtrl); // Or any other selector.
                if (target) {
                    let objs = document.getElementsByClassName(refObj.classList[0]);
                    let obj = objs[objs.length - 1];
                    let cloneNode = obj.cloneNode(true);
                    insertAfter(obj, cloneNode);
                    addCallback(cloneNode);
                }
            });
        },

        minFn: function () {
            let thisMinCtrl = this.minCtrl;

            document.addEventListener('click', function (e){
                const target = e.target.closest(thisMinCtrl); // Or any other selector.
                if (target) {
                    minCallback();
                    target.closest('.multi-field-ref').remove();
                }
            });
        },

        insertAfter: function(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },

        multiply: function() {
            for (let i = 0; i < settings.count - 1; i++) {
                let refObj = this.refObj;
                this.insertAfter(refObj, refObj.cloneNode(true));
            }
        },

        init: function () {
            this.multiply();
            this.addFn();
            this.minFn();
        }
    }

    multiFields.init();
}

