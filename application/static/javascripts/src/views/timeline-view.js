import {View} from 'backbone';
import {statusPanels} from '../templates';

const TimelineView = View.extend({
  initialize() {
    this.cacheElements();
    this.setupEventListeners(this.collection);
  },

  cacheElements() {
    this.$panelGroup = this.$('.panel-group');
  },

  setupEventListeners(collection) {
    this.listenTo(collection, 'request', this._onCollectionRequest);
    this.listenTo(collection, 'sync', this._onCollectionSync);
    this.listenTo(collection, 'error', this._onCollectionError);
  },

  _onCollectionRequest(...args) {
    this.$el.addClass('working');
  },

  _onCollectionSync(collection) {
    this.$panelGroup.html(statusPanels(collection));
    this.$el.removeClass('working initial-load');
  },

  _onCollectionError(...args) {
    this.$el.removeClass('working initial-load');
  },
});

export default TimelineView;
