import {View} from 'backbone';

const TimelineView = View.extend({
  initialize(options) {
    this.listenTo(options.statusCollection, 'all', (...args) => console.log(args))
  },

  render() {
    return this;
  }
});

export default TimelineView;
