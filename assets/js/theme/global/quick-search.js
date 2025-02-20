import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import urlUtils from '../common/utils/url-utils';

export default function () {
    const TOP_STYLING = 'top: 49px;';
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchExpand = $('#quick-search-expand');
    const $searchQuery = $quickSearchForms.find('[data-search-quick]');
    const stencilDropDownExtendables = {
        hide: () => {
            $quickSearchExpand.attr('aria-expanded', false);
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            $quickSearchExpand.attr('aria-expanded', true);
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $('#quickSearch'), TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], .modal-background').length === 0) {
            stencilDropDown.hide($container);
        }
    };

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery) => {
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
        });
    }, 200);

    utils.hooks.on('search-quick', (event) => {
        const searchQuery = $(event.currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }

        doSearch(searchQuery);
    });

    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();

        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');

        if (searchQuery.length === 0) {
            return;
        }

        urlUtils.goToUrl(`${searchUrl}?search_query=${searchQuery}`);
        window.location.reload();
    });
    $(document).on('click', '[data-drop-down-close]', () => {
        $('.quick-search').empty();
    });
    $(document).on('click', '.button-close', () => {
        $('.button-collapse').sideNav('hide');
    });
    $(document).on('click', '.shipping-drop', () => {
        $('.shipping-drop').toggleClass('drop-hover-fix');
        $('#price-promise, #return-exchange, #online-support').hide();
        $('.price-drop, .exchange-drop, .support-drop').removeClass('drop-hover-fix');
        $('#free-shipping').slideToggle();
    });
    $(document).on('click', '.price-drop', () => {
        $('.price-drop').toggleClass('drop-hover-fix');
        $('#free-shipping, #return-exchange, #online-support').hide();
        $('.shipping-drop, .exchange-drop, .support-drop').removeClass('drop-hover-fix');
        $('#price-promise').slideToggle();
    });
    $(document).on('click', '.exchange-drop', () => {
        $('.exchange-drop').toggleClass('drop-hover-fix');
        $('#free-shipping, #price-promise, #online-support').hide();
        $('.shipping-drop, .price-drop, .support-drop').removeClass('drop-hover-fix');
        $('#return-exchange').slideToggle();
    });
    $(document).on('click', '.support-drop', () => {
        $('.support-drop').toggleClass('drop-hover-fix');
        $('#free-shipping, #price-promise, #return-exchange').hide();
        $('.shipping-drop, .price-drop, .exchange-drop').removeClass('drop-hover-fix');
        $('#online-support').slideToggle();
    });

    $(document).on('click', '.dropdown-button-search', () => {
        $('.main-nav-bar .fa-search').toggle();
        $('.main-nav-bar .fa-times').toggle();
        $('.dropdown-search').toggle();
    });

    $(document).on('change', '#resizing_select', () => {
        $('#width_tmp_option').html($('#resizing_select option:selected').text());
        $('#resizing_select').width($('#width_tmp_select').width());
    });

    $(document).on('change', '#sub-category', (e) => {
        const t = e.currentTarget;
        console.log(t);
        const url = $(t).find(':selected').data('sub-category-url');
        window.location.href = url;
    });

    $(document).on('click', '.drop-open', (e) => {
        const t = e.currentTarget;
        e.preventDefault();
        $('.drop-open').not(t).next('.pages-submenu').removeClass('show-sub-menu');
        $(t).next('.pages-submenu').toggleClass('show-sub-menu');
    });

    $(document).ready(function() {
        $(".dropdown-btn-search").click(function(e) {
            $("#dropdown-search-box").toggle();
            e.stopPropagation();
        });

        $(document).click(function(e) {
            if (!$(e.target).is('#dropdown-search-box, #dropdown-search-box *')) {
                $("#dropdown-search-box").hide();
            }
        });
    });

    $('ul.home-featured-tabs').on('toggled', function (event, tab) {
        $('.cat-back').toggle('show');
        $('.cat-title').toggle('hide');
    });

    $('.cat-back a').on('click',function(){
        $('ul.featured-tab-content.is-active').removeClass('is-active');
        $('ul.home-featured-tabs li.is-active').removeClass('is-active');
        $('ul.home-featured-tabs').attr('aria-hidden',false);
        $('.cat-back').toggle('hide');
        $('.cat-title').toggle('show');
    })

    $(document).on('click', '#trigger-overlay', (e) => {
        
        e.preventDefault();
        $('.overlay-shop').addClass('overlay-contentpush');
        $('.main-wrapper').addClass('wrapper-contentpush');
    });
    $(document).on('click', '.overlay-close', (e) => {
        e.preventDefault();
        $('.overlay-shop').removeClass('overlay-contentpush');
        $('.main-wrapper').removeClass('wrapper-contentpush');
    });

    function scrollEvent() {
        if (window.scrollY > 210) {
            $('.main-nav-bar').addClass('navbar-fixed');
            $('.navbar-custom').fadeIn();
        } else {
            $('.main-nav-bar').removeClass('navbar-fixed');
            $('.navbar-custom').hide();
        }
    }
    $(window).on('scroll', scrollEvent);
}
if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
    backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('btt-show');
        } else {
            $('#back-to-top').removeClass('btt-show');
        }
    };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}
var style_selected = $('.tab-process').length;
    if(style_selected){
       $(".pagi-next").click(function(){
        $('.tabs li.is-active').next().children('a').click();
       });
        $(".pagi-prev").click(function(){
            $('.tabs li.is-active').prev().children('a').click();
       });
    }
