const i18next = require('i18next');
const langs = require('./langs');

const i18n = (req) => {
    let lang = req.headers['accept-language'];

    lang = langs.hasOwnProperty(lang) ? lang : 'en-US';

    i18next.init({
        lng: lang,
        debug: false,
        resources: {
            [lang]: {
                translation: langs[lang]
            }
        }
    });
    return i18next;
}

module.exports = i18n;