import PageManager from './page-manager';

export default class Home extends PageManager {
    onReady() {
        this.titleSubString();
    }

    titleSubString() {
        $('.ch-info-back h3').each((i, elem) => {
            let textInH3 = $(elem).text();

            if (textInH3.length > 25) {
                textInH3 = `${textInH3.substring(0, 25)}...`;
            }

            $(elem).text(textInH3);
        });
    }
}
