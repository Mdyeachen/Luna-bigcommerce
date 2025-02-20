const isCustomized = () => window.self !== window.top;

const ToggleElement = (element, toDo) => {
    if (!toDo) return element.classList.toggle('is-open');
    if (toDo === 'open') return element.classList.add('is-open');
    if (toDo === 'close') return element.classList.remove('is-open');
};

const focusEvent = (e, type) => {
    if (type === 'focus') {
        ToggleElement(e);
    }

    if (type === 'blur') {
        ToggleElement(e, 'close');
    }
};

export default function YSWDropdownController() {
    $('[data-ysw-dropdown]').each((index, item) => {
        const $item = $(item);
        const $dropdown = $(`#${$item.data('ysw-dropdown')}`);
        const $anchor = $item.find('.ysw-c-mega-nav__item-action');

        $dropdown.append('<div class="dropdown-backdrop" tabindex="0" style="position: absolute"></div>');
        const $triggerBackdrop = $dropdown.find('.dropdown-backdrop');

        $item.on('focus', focusEvent($item[0], 'focus'));
        $triggerBackdrop.on('focus', focusEvent($item[0], 'blur'));

        if (isCustomized()) {
            $anchor.on('click', (e) => {
                if (window.innerWidth < 801) {
                    e.preventDefault();
                    ToggleElement($item[0]);
                }
            });

            return;
        }

        $item.on({
            mouseenter() {
                if (window.innerWidth >= 801) {
                    ToggleElement($item[0], 'open');
                }
            },
            mouseleave() {
                if (window.innerWidth >= 801) {
                    ToggleElement($item[0], 'close');
                }
            },
        });

        $anchor.on('click', (e) => {
            if (window.innerWidth < 801) {
                e.preventDefault();
                ToggleElement($item[0]);
            }
        });
    });

    if (isCustomized()) {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('ysw-c-mega-nav__item')) e.preventDefault();

            if (window.innerWidth < 801) return;

            $('[data-ysw-dropdown]').removeClass('is-open');

            if (!e.target.closest('[data-ysw-dropdown]')) return;

            if (e.target.closest('[data-ysw-dropdown]')) {
                e.target.closest('[data-ysw-dropdown]').classList.toggle('is-open');
            }
        });
    }

    if (isCustomized() && window.innerWidth >= 801) {
        $('.ysw-c-mega-nav__item').addClass('ysw-c-mega-nav__item--customize');
        $('.ysw-c-mega-nav__item-action').addClass('ysw-c-mega-nav__item-action--customize');
        $('.ysw-c-mega-nav__sub-menu').addClass('ysw-c-mega-nav__sub-menu--customize');
    }

    const body = document.querySelector('body');
    const toggleBtn = document.querySelector('[data-mobile-menu-toggle="menu"]');
    const menu = document.getElementById('menu');

    if (!menu) return;

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('has-activeNavPages');
        toggleBtn.classList.toggle('is-open');
        menu.classList.toggle('is-open');
    });
}
