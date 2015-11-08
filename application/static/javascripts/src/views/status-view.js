import _ from 'underscore';
import {View} from 'backbone';
import templateStr from '../templates/panel-body.html';

const StatusView = View.extend({
  className: 'panel panel-default',

  template: _.template(templateStr),

  render() {
    this.$el.html(this.template({text: 'SOME TEXT'}));
    return this;
  }
});

export default StatusView;
