import {bindAll, isEmpty} from 'underscore';
import {View} from 'backbone';

const UserLookupView = View.extend({
  initialize() {
    bindAll(this, '_onFormSubmit');
    this.cacheElements();
    this.setupEventListeners(this.collection);
  },

  cacheElements() {
    this.$form = this.$('form');
    this.$input = this.$('input[name="screen-name"]');
    this.$button = this.$('button[type="submit"]');
    this.$lastUpdate = this.$('#last-update');
    this.$interval = this.$('#last-update > .interval');
    this.$event = this.$('#last-update > .event');
  },

  setupEventListeners(collection) {
    this.$form.on('submit', this._onFormSubmit);
    this.listenTo(collection, 'request', this._onCollectionRequest);
    this.listenTo(collection, 'sync error', this._onCollectionComplete);
    this.listenTo(collection, 'timer:start', this._onTimerStart);
    this.listenTo(collection, 'timer:increment', this._onTimerIncrement);
    this.listenTo(collection, 'timer:end', this._onTimerEnd);
  },

  teardownEventListeners() {
    this.$form.off();
  },

  _onFormSubmit(e) {
    e.preventDefault();
    const {collection} = this;
    const screenName = this.$input.val();
    try {
      collection.setProp('screenName', screenName);
      collection.fetch();
    } catch (ex) {
      console.log(ex)
    }
  },

  _onCollectionRequest() {
    this.$el.addClass('working');
    this.$input.prop('disabled', true);
    this.$button.prop('disabled', true);
    this.$lastUpdate.addClass('in');
    this.$event.text('Fetching').addClass('in');
  },

  _onCollectionComplete() {
    this.$el.removeClass('working');
    this.$input.prop('disabled', false);
    this.$button.prop('disabled', false);
    this.$event.text('Done');
  },

  _onTimerIncrement(delta) {
    const timeAgo = `${Math.round(delta / 1000)}s ago`;
    this.$event.text('Last updated');
    this.$interval.text(timeAgo).addClass('in');
  },

  _onTimerEnd(...args) {
    this.$interval.removeClass('in');
  },
});

export default UserLookupView;
