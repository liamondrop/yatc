import {bindAll} from 'underscore';
import {View} from 'backbone';
import {statusPanels} from '../templates';

const StatusFilterView = View.extend({
  initialize(options) {
    bindAll(this, '_onInputKeyup');
    this.cacheElements();
    this.setupEventListeners(this.collection);
    this.timelineView = options.timelineView;
  },

  cacheElements() {
    this.$input = this.$('input[name="status-filter"]');
    this.$result = this.$('#filter-count > .result');
    this.$total = this.$('#filter-count > .total');
  },

  setupEventListeners(collection) {
    this.$input.on('keyup', this._onInputKeyup);
    this.listenTo(collection, 'request', this._onCollectionRequest);
    this.listenTo(collection, 'sync error', this._onCollectionComplete);
  },

  _onInputKeyup(e) {
    const filtered = this.collection.lookup(e.target.value);
    this.timelineView.$panelGroup.html(statusPanels(filtered));
    this.$result.text(filtered.length);
  },

  _onCollectionRequest() {
    this.$input.prop('disabled', true);
  },

  _onCollectionComplete(collection) {
    this.$input.prop('disabled', false);
    this.$result.text(collection.length);
    this.$total.text(collection.length);
  }
});

export default StatusFilterView;
