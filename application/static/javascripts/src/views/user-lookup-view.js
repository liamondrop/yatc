import {bindAll} from 'underscore';
import {View} from 'backbone';

const UserLookupView = View.extend({
  initialize() {
    bindAll(this, '_onFormSubmit');
    this.$form = this.$('form');
    this.$form.on('submit', this._onFormSubmit);
  },

  _onFormSubmit(e) {
    e.preventDefault();
    console.log('submit')
  }
});

export default UserLookupView;
