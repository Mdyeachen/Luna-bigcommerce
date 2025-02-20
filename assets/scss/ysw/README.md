# CSS Architecture

Let's keep all the CSS assets to this path.

If you want to add new CSS section, create the new file and be sure to add it to the list of folders in this path.

- `settings` global settings, variables and colors.
- `tools` global tools, functions and mixins.
- `fonts` font faces for custom typographies.
- `generic` base styles for the whole site, like html/body styles.
- `elements` base styles for the whole site, like font size, links and text.
- `components` small pieces of reusable code that can be used in multiple places.
- `layouts` larger modules that can be used in multiple places.
- `utilities` helper utility classes.
- `vendor` third party libraries.

Follow the guide created by Brad Frost: https://bradfrost.com/blog/post/css-architecture-for-design-systems/.

## Global namespace

All classes associated with the design system are prefixed with a global namespace, which is the Company Name followed by a hyphen:

```
.ysw-
```

## Class prefixes

`c-` for UI components, such as `.ysw-c-card` or `.ysw-c-header`.
`l-` for layout-related styles, such as `.ysw-l-grid__item` or `.ysw-l--two-column`.
`u-` for utilities, such as `.ysw-u-margin-bottom-double` or `.ysw-u-margin-bottom-double`.
`is-` and `has-` for specific states, such as `.ysw-is-active` or `.ysw-is-disabled`. These state-based classes would apply to.
`js-` for targeting JavaScript-specific functionality, such as `.js-modal-trigger`. No styles are bound to these classes; they’re reserved for behavior only. For most cases, these `js-` classes would toggle state-based classes to an element.

## BEM syntax

`Block` is the primary component block, such as `.ysw-c-card` or `.ysw-c-btn`.
`Element` is a child of the primary block, such as `.ysw-c-card__title`.
`Modifier` is a variation of a component style, such as `.ysw-c-alert--error`.
