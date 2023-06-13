import { set } from './util/nodecg';
import { BundleNodecgInstance as NodeCG } from 'src/types/nodecg';

export default (nodecg: NodeCG) => {
  set(nodecg);
  require('./countdown');
  require('./socket');
  require('./splits');
  require('./timer');
};
