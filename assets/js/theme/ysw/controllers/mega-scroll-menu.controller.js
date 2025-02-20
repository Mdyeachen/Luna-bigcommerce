export default function YSWMegaScrollMenuController(context) {
    if (!context.enabledScrollMenu) return;

    const $nav = $('.ysw-c-mega-nav');
    const $list = $('.ysw-c-mega-nav__list');
    const $item = $('.ysw-c-mega-nav__item');
    const $scrollButton = $('.ysw-c-mega-nav__button');
    const $scrollButtonLeft = $('.ysw-c-mega-nav__button--left');
    const $scrollButtonRight = $('.ysw-c-mega-nav__button--right');

    const showHiddenButtons = () => {
        const isMaxScroll = $list[0].scrollWidth <= $list[0].clientWidth;

        $scrollButton.each((index, button) => {
            $(button).attr('hidden', isMaxScroll);

            if (isMaxScroll) {
                $list.addClass('ysw-no-scroll');
            } else {
                $list.removeClass('ysw-no-scroll');
            }
        });
    };

    const setScrollButtonsState = () => {
        const clientWidth = $list[0].clientWidth;
        const scrollLeft = $list[0].scrollLeft;
        const scrollWidth = $list[0].scrollWidth;

        $scrollButtonLeft.attr('disabled', scrollLeft < 8);
        $scrollButtonRight.attr('disabled', scrollLeft > scrollWidth - clientWidth - 8);
    };

    const getItemWidthAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const getItemOuterWidth = () => {
        const itemWidthArr = [];

        $item.each((index, item) => {
            itemWidthArr.push($(item).outerWidth());
        });

        const avgWidth = getItemWidthAvg(itemWidthArr);

        return Math.ceil(avgWidth);
    };

    $scrollButtonLeft.on('click', () => {
        let scrollLeft = $list.scrollLeft();

        scrollLeft -= getItemOuterWidth();

        if (scrollLeft < 0) {
            scrollLeft = 0;
        }

        $list.scrollLeft(scrollLeft);
    });

    $scrollButtonRight.on('click', () => {
        const listWidth = $list[0].scrollWidth - $list[0].clientWidth;
        let scrollLeft = $list.scrollLeft();

        scrollLeft += getItemOuterWidth();

        const maxScrollLeft = ((listWidth - scrollLeft) / listWidth) * 100;

        if (maxScrollLeft < 5) {
            scrollLeft = listWidth;
        }

        $list.scrollLeft(scrollLeft);
    });

    try {
        new ResizeObserver(() => {
            showHiddenButtons();
            setScrollButtonsState();
        }).observe($list[0]);
    } catch (e) {
        console.error(e); // eslint-disable-line no-console
    }

    $list.on('scroll', () => {
        setScrollButtonsState();
    });

    showHiddenButtons();
    setScrollButtonsState();

    // Show navigation items on load.
    $nav.addClass('ysw-is-ready');
}
