class Flash {
    msg = '';
    type = '';

    constructor() {
        this.init();
    }

    addFlash = (msg, type = 'success') => {
        this.msg = msg;
        this.type = type;
        localStorage.setItem('flash', this.msg);
        localStorage.setItem('flash-type', this.type);
    }

    getMsg = () => {
        return localStorage.getItem('flash');
    }

    getType = () => {
        return localStorage.getItem('flash-type');
    }

    showFlash = () => {
        let flashE = '<div class="flash ' + this.getType() + '">' + this.getMsg() + '</div>';
        let temp = document.createElement('div');
        temp.innerHTML = flashE;
        flashE = temp.firstChild;
        document.getElementsByTagName('body')[0].prepend(flashE);
    }

    clear = () => {
        localStorage.removeItem('flash');
        localStorage.removeItem('flash-type');
    }

    init = () => {
        if (!!localStorage.getItem('flash')) {
            this.showFlash();
            this.clear();
        }
    }
}