import {StatusCollection} from './collections';
import {UserLookupView, TimelineView, StatusFilterView} from './views';

const app = {
  init() {
    this.statusCollection = new StatusCollection();

    this.userLookup = new UserLookupView({
      el: '#user-lookup',
      collection: this.statusCollection
    });
    
    this.timelineView = new TimelineView({
      el: '#timeline',
      collection: this.statusCollection
    });

    this.statusFilterView = new StatusFilterView({
      el: '#status-filter',
      collection: this.statusCollection,
      timelineView: this.timelineView
    });
    return this;
  }
};

window.app = app.init();
