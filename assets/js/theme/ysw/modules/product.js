import YswStickyProductFactory from './../components/sticky-product';

/**
 * Add product functionalities to this class as methods.
 *
 * @since 1.0.0
 * @author YourStoreWizards
 */
class YswProduct {
    constructor(context) {
        this.context = context;
        this.init();
    }

    init() {
        YswStickyProductFactory();
        this.moveProductData();
        this.acordeon();

        $('body').on('click', '[data-reveal-close], .modal-close, .modal-background', () => {
            if ($('body').hasClass('has-activeModal')) {
                $('body').removeClass('has-activeModal');
            }
        });
    }

    moveProductData() {
        const productView = document.getElementById('product-view');
        const productData = document.querySelector('.product-data');
        const productDataDesktop = document.getElementById('product-data-desktop');

        window.addEventListener('resize', () => {
            if (window.innerWidth < 801) {
                productView.insertAdjacentElement('afterend', productData);
                return;
            }

            productDataDesktop.appendChild(productData);
        });

        if (window.innerWidth < 801) {
            productView.insertAdjacentElement('afterend', productData);

            return;
        }

        productDataDesktop.appendChild(productData);
    }

    acordeon() {
        const accordions = document.querySelectorAll('.ysw-c-accordion');

        if (!accordions.length) return;

        accordions.forEach((accordion) => {
            const accordionTitle = accordion.querySelector('.ysw-c-accordion__title');

            accordionTitle.addEventListener('click', () => {
                if (accordion.classList.contains('ysw-c-accordion--active')) {
                    accordion.classList.remove('ysw-c-accordion--active');

                    return;
                }

                accordionTitle.classList.toggle('ysw-c-accordion__title--active');
            });
        });
    }
}

export default function YswProductFactory(context) {
    if (this instanceof YswProduct) {
        this.context = context;
    } else {
        return new YswProduct(context);
    }
}
