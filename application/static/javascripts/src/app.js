import {StatusCollection} from './collections';
import {UserLookupView} from './views';

const app = {
  init() {
    this.statuses = new StatusCollection();
    this.userLookup = new UserLookupView({
      el: '#user-lookup',
      app: this
    });
    return this;
  }
};

window.app = app.init();
