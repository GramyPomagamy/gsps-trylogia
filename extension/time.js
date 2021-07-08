'use strict';

const nodecg = require('./util/nodecg-api-context').get();

const time = nodecg.Replicant('clock', { defaultValue: "00:00" });

function UpdateTime() {
    var date_ob = new Date();
    // current hours
    let hours = ('0'+date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ('0'+date_ob.getMinutes()).slice(-2);

    time.value = hours + ":" + minutes;
}

setInterval(UpdateTime, 500);