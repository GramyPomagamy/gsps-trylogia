import { klona } from 'klona/json';
import { get } from './util/nodecg';

let nodecg = get();
const mediaBoxAssets = nodecg.Replicant('assets:media-box');
const currentMediaBoxItem = nodecg.Replicant('mediaBoxItem');
const logoCycles = nodecg.Replicant('logoCycles', { defaultValue: [] });

let currentItemIndex = 0;
let imageTimeout: NodeJS.Timeout;

function showNextMediaBoxItem() {
  clearTimeout(imageTimeout);
  if (mediaBoxAssets.value && mediaBoxAssets.value.length > 0) {
    currentItemIndex = (currentItemIndex + 1) % mediaBoxAssets.value.length;
    const asset = mediaBoxAssets.value[currentItemIndex];
    if (asset && asset.ext) {
      imageTimeout = setTimeout(
        showNextMediaBoxItem,
        (logoCycles.value!.find((cycle) => cycle.name === asset.name)?.cycle || 10) * 1000
      );
      currentMediaBoxItem.value = {
        asset: klona(asset),
      };
      return;
    }
  } else {
    // if no assets found, try again in one second
    imageTimeout = setTimeout(showNextMediaBoxItem, 1000);
  }
}

nodecg.listenFor('mediaBox:showNextBreakItem', showNextMediaBoxItem);

// Set first item on layout bootup
setTimeout(() => {
  showNextMediaBoxItem();
}, 1000);
