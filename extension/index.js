'use strict';

const nodecgApiContext = require('./util/nodecg-api-context');

module.exports = function (nodecg) {
    nodecgApiContext.set(nodecg);
    require('./time');
    require('./splits');
    require('./countdown');
    require('./socket');
}