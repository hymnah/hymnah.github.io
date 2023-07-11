class Cpopup {
    constructor(settings) {
        if (!settings.src instanceof HTMLButtonElement) {
            throw new Error('btn must be a valid HTML button');
        }

        this.settings = settings;
        this.src = this.settings.src;
        this.btn = this.settings.btn;
        this.bg = '';

        this.btn.onclick = () => {
            this.open();
        }
        this.init();
    }

    setBg = () => {
        let bg = '<div class="c-popup-box" style="background-color: #00000044; position: fixed; height: 100%; width: 100%; top: 0; z-index: 100; padding: 20px;"></div>';
        let temp = document.createElement('div');
        temp.innerHTML = bg;
        bg = temp.firstChild;
        eByTag('body')[0].appendChild(bg);
        this.bg = bg;
        this.bg.onclick = (e) => {
            if (!this.src.contains(e.target)) {
                this.close();
            }
        }
    }

    open = () => {
        this.setBg();
        this.src.style.display = 'block';
        this.bg.appendChild(this.src);
    }

    close = () => {
        this.bg.remove();
    }

    init = () => {
        let closes = this.src.querySelectorAll('.c-popup-close');
        closes.forEach((v, k) => {
            v.onclick = () => {
                this.close();
            }
        })
    }
}