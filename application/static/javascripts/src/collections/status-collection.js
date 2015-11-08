import {Collection} from 'backbone';

const StatusCollection = Collection.extend({
  initialize() {
    this.on('reset', () =>
      console.log('STATUSES', this.toJSON())
    );
  }
});

export default StatusCollection;
