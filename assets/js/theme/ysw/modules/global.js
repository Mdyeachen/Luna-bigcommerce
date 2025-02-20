import YSWDropdownController from './../controllers/dropdown-menu.controller';
import YSWMegaScrollMenuController from './../controllers/mega-scroll-menu.controller';

class YswGlobal {
    constructor(context) {
        this.context = context;
        this.init();
    }

    init() {
        YSWMegaScrollMenuController(this.context);
        YSWDropdownController();
    }
}

export default function YswGlobalFactory(context) {
    if (this instanceof YswGlobal) {
        this.context = context;
    } else {
        return new YswGlobal(context);
    }
}
