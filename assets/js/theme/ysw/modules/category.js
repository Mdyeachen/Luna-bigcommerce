class YswCategory {
    constructor(context) {
        this.context = context;
        this.init();
    }

    init() {
        // Remove this if other methods are added to this class
    }
}

export default function YswCategoryFactory(context) {
    if (this instanceof YswCategory) {
        this.context = context;
    } else {
        return new YswCategory(context);
    }
}
