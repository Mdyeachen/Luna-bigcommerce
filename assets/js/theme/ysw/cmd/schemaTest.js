/* eslint-disable no-console */
(() => {
    const clc = require('cli-color'); // eslint-disable-line
    const error = clc.red.bold;
    const warn = clc.yellow.bold;
    const success = clc.green.bold;

    const successPrint = (txt) => {
        console.log(`${success('Success:')} ${txt}`);
    };

    const warningPrint = (txt) => {
        console.log(`${warn('Warning:')} ${txt}`);
    };

    const errorPrint = (txt) => {
        console.log(`${error('Error:')} ${txt}`);
    };

    const failedPrint = (txt) => {
        throw new Error(`${error(txt)}`);
    };

    let err = false;

    const limitCharacters = 64;

    const config = require('./../../../../config.json');
    const schema = require('./../../../../schema.json');

    const keys = [];
    const inputTypes = [
        'heading',
        'color',
        'select',
        'font',
        'text',
        'checkbox',
        'imageDimension',
        'paragraph',
        'optimizedCheckout-image',
        'input',
        'sort',
    ];

    schema.forEach((group, i) => {
        if (!group.name) {
            errorPrint(`Group '${i}'-nth has no 'name'`);
            err = true;
        }

        if (!group.settings || !(group.settings instanceof Array)) {
            errorPrint(`Group '${group.name}' has no/invalid 'settings' key`);
            err = true;
        } else {
            group.settings.forEach((item, j) => {
                if (!item.type || inputTypes.indexOf(item.type) === -1) {
                    errorPrint(`Setting "${item.id}" in group "${group.name}" has no/invalid "type" ${item.type}`);
                    err = true;
                }

                if (!item.id && item.type !== 'heading' && item.type !== 'paragraph') {
                    errorPrint(`Setting '${item.id}' in group '${group.name}' has no 'id'`);
                    err = true;
                }

                if (item.id && !(item.id in config.settings)) {
                    errorPrint(`Setting '${item.id}' in group '${group.name}' has undefined 'id' in config.json`);
                    err = true;
                }

                if (item.id && keys.indexOf(item.id) > -1) {
                    errorPrint(`Setting '${item.id}' in group '${group.name}' has duplicated 'id'`);
                    err = true;
                }

                if (typeof item.label === 'undefined' && item.type !== 'heading' && item.type !== 'paragraph') {
                    warningPrint(`Setting '${item.id}' in group '${group.name}' has no 'label'`);
                    err = true;
                }

                if (!item.content && (item.type === 'heading' || item.type === 'paragraph')) {
                    warningPrint(`Heading item '${j}' in group '${group.name}' has no 'content'`);
                    err = true;
                }

                if ((!item.options || item.options.length === 0) && (item.type === 'select' || item.type === 'font')) {
                    errorPrint(`Setting '${item.id}' in group '${group.name}' has no 'options'`);
                    err = true;
                }

                if (item.options instanceof Array) {
                    const values = [];

                    item.options.forEach(option => {
                        if (!option.label) {
                            warningPrint(`Setting '${item.id}' in group '${group.name}' has no option label`);
                            err = true;
                        }

                        if (typeof option.value === 'undefined') {
                            warningPrint(`Setting '${item.id}' has no option value in schema`);
                            err = true;
                        }

                        if (values.indexOf(option.value) > -1) {
                            errorPrint(`Setting '${item.id}' has duplicated option value in schema`);
                            err = true;
                        }

                        values.push(option.value);
                    });

                    if (item.id in config.settings && values.indexOf(config.settings[item.id]) === -1) {
                        errorPrint(`Setting '${item.id}' has value not exist in schema`);
                        err = true;
                    }

                    config.variations.forEach(variation => {
                        if (item.id in variation.settings && values.indexOf(variation.settings[item.id]) === -1) {
                            errorPrint(`Setting '${item.id}' of variation '${variation.name}' has value not exist in schema`);
                            err = true;
                        }
                    });
                }

                if (item.type === 'text' && typeof config.settings[item.id] !== 'string') {
                    errorPrint(`Setting '${item.id}' in group '${group.name}' has value type is not string`);
                    err = true;
                }

                if (item.id) {
                    keys.push(item.id);
                }
            });
        }
    });

    for (const [key, value] of Object.entries(config.settings)) {
        if (typeof value === 'string' && value.length > limitCharacters) {
            warningPrint(`Setting '${key}' has length > ${limitCharacters} characters'`);
            err = true;
        }
    }

    config.variations.forEach(variation => {
        for (const [key, value] of Object.entries(config.settings)) {
            if (typeof value === 'string' && value.length > limitCharacters) {
                warningPrint(`Setting '${key}' of variation '${variation.name}' has length > ${limitCharacters} characters'`);
                err = true;
            }
        }
    });

    if (err) {
        failedPrint('Please check the schema.json and config.json to fix the problems.');
    } else {
        successPrint(`Validated ${keys.length} settings wihout errors.`);
    }
})();
