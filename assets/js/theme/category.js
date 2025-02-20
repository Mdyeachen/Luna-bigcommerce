import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';

export default class Category extends CatalogPage {
    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        this.mainCategories();
        this.showCategories();
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    mainCategories() {
        const categories = $('.nav-cats');
        const currentPath = window.location.pathname;
        const currentOrigin = window.location.origin;

        if (categories.length) {
            categories.find('a').each((index, item) => {
                const currentItem = $(item)
                const parent = currentItem.parents('.nav-cats__level-item--1');
                const closest = currentItem.closest('.nav-cats__level--1');
                const href = currentItem.attr('href');
                const completeUrl = currentOrigin + currentPath;

                if (completeUrl === href) {
                    currentItem.addClass('is-active');
                    parent.addClass('is-active');
                    closest.addClass('is-sub-active');

                    if (!currentItem.next('.nav-cats__level--2').length && currentItem.parent('.nav-cats__level-item--1').length) {
                        closest.addClass('no-sub');
                    }
                }
            });
        }
    }

    showCategories() {
        const showCategories = $('.show-categories');

        if (showCategories.length) {
            showCategories.on('click', () => {
                showCategories.toggleClass('is-active');
                $('#faceted-search-container').toggleClass('is-active');
            })
        }
    }
}
