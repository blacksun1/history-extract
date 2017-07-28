'use strict';

const fetch = require('node-fetch');
const {Promise} = require('bluebird');
const jmespath = require('jmespath');


const historyHub = {
    thing: 'http://data.history.sa.gov.au/sahistoryhub/thing'
};

Promise.resolve(fetch(historyHub.thing))
    .then((res) => res.text())
    .then((body) => JSON.parse(body))
    .then((body) => jmespath.search(body, `
        features[?geometry].{
            title: properties.TITLE,
            description: properties.DESCRIPTION,
            url: properties.MORE_INFORMATION,
            latLong: geometry.coordinates
        }`))
    .tap((body) => console.log(JSON.stringify(body, null, 2)))
    .tap((body) => console.log(`Number of items: ${body.length}`))
    .catch(console.error);
