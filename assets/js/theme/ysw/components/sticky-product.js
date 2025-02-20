class YswStickyProduct {
    constructor(context) {
        this.context = context;
        this.productView = document.getElementById('product-view');
        this.footer = document.querySelector('.site-footer');
        this.template = document.getElementById('sticky-product-template');
        this.stickyProduct = null;
        this.product = {
            btnInc: document.querySelector('.product-options [data-action="inc"]'),
            btnDec: document.querySelector('.product-options [data-action="dec"]'),
            input: document.getElementById('qty[]'),
            action: document.getElementById('form-action-addToCart'),
        };
        this.stickyProductInputs = {
            btnInc: null,
            btnDec: null,
            input: null,
            action: null,
        };

        this.init();
    }

    init() {
        let flag = false;

        window.addEventListener('scroll', () => {
            if (flag) return;
            this.insertTemplate();
            this.getStickyProduct();
            this.setObservers();
            this.setEvents(this.product, this.stickyProductInputs);
            this.setEvents(this.stickyProductInputs, this.product, 'sticky');
            flag = true;
        });
    }

    insertTemplate() {
        const clone = this.template.content.cloneNode(true);
        document.body.appendChild(clone);
    }

    getStickyProduct() {
        this.stickyProduct = document.getElementById('sticky-product');
        this.stickyProductInputs.btnInc = this.stickyProduct.querySelector('[data-action="inc"]');
        this.stickyProductInputs.btnDec = this.stickyProduct.querySelector('[data-action="dec"]');
        this.stickyProductInputs.input = this.stickyProduct.querySelector('#stycky-product-quantity');
        this.stickyProductInputs.action = this.stickyProduct.querySelector('.form-action input');
    }

    obserFunc(entry, item, dataName, dataNames = []) {
        if (entry.isIntersecting) {
            item.classList.remove('is-active');
            item.setAttribute(`data-${dataName}`, true);
            return;
        }

        let isData = dataNames.map((data) => {
            return item.dataset[data] !== 'false';
        });

        if (isData.includes(false)) {
            item.classList.add('is-active');
        }

        item.setAttribute(`data-${dataName}`, false);
    }

    setObservers() {
        const productViewObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => this.obserFunc(entry, this.stickyProduct, 'observer-add-to-cart', ['observerAddToCart', 'observerFooter']));
        }, {
            threshold: [0, 0.50, 1],
            rootMargin: '-420px 0px -200px 0px'
        });

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => this.obserFunc(entry, this.stickyProduct, 'observer-footer', ['observerFooter', 'observerAddToCart']));
        }, { threshold: [0.30, 1] });

        productViewObserver.observe(this.productView);
        footerObserver.observe(this.footer);
    }

    setEvents(obj, target, type = 'normal') {
        obj.input.addEventListener('change', () => {
            target.input.value = obj.input.value;
        });

        obj.input.addEventListener('input', () => {
            target.input.value = obj.input.value;
        });

        obj.btnInc.addEventListener('click', () => {
            if (type !== 'sticky') {
                target.input.value = Number(obj.input.value) + 1;

                return
            }

            target.btnInc.click();
            obj.input.value = target.input.value;
        });

        obj.btnDec.addEventListener('click', () => {
            if (type !== 'sticky') {
                target.input.value = Number(obj.input.value) - 1 > 0 ? Number(obj.input.value) - 1 : 1;

                return
            }

            target.btnDec.click();
            obj.input .value = target.input.value ?? 1;
        });

        if (type !== 'sticky') return;

        obj.action.addEventListener('click', () => {
            target.action.click();
        });
    }
}

export default function YswStickyProductFactory(context) {
    if (this instanceof YswStickyProduct) {
        this.context = context;
    } else {
        return new YswStickyProduct(context);
    }
}
