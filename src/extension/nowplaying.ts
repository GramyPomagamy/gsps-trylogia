'use strict';

import { get } from './util/nodecg';
import FoobarControl from './foobar';
import { songRep } from './util/replicants';

const nodecg = get();
const config = nodecg.bundleConfig.foobar;
const foobar = new FoobarControl(config.address!);

async function GetSong() {
  if (config.enabled) {
    songRep.value = await foobar.getSong();
  }
}

setInterval(GetSong, 3000);
