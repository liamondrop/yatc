import {bindAll, isEmpty} from 'underscore';
import {View} from 'backbone';

const UserLookupView = View.extend({
  initialize(options) {
    bindAll(this, '_onFormSubmit');
    this.options = options;
    this.cacheElements();
    this.setupEventListeners();
  },

  cacheElements() {
    this.$form = this.$('form');
    this.$input = this.$('[name="screen-name"]');
  },

  setupEventListeners() {
    this.$form.on('submit', this._onFormSubmit);
  },

  _onFormSubmit(e) {
    e.preventDefault();
    const {statusCollection} = this.options;
    const screenName = this.$input.val();

    try {
      statusCollection.setProp('screenName', screenName);
      statusCollection.fetch();
    } catch (ex) {
      console.log(ex)
    }
  }
});

export default UserLookupView;
