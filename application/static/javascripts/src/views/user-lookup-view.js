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
  },

  setupEventListeners(collection) {
    this.$form.on('submit', this._onFormSubmit);
    this.listenTo(collection, 'request', this._onCollectionRequest);
    this.listenTo(collection, 'sync error', this._onCollectionComplete);
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
  },

  _onCollectionComplete() {
    this.$el.removeClass('working');
    this.$input.prop('disabled', false);
    this.$button.prop('disabled', false);
  }
});

export default UserLookupView;
