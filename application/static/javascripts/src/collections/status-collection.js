import {isObject, isString} from 'underscore';
import {Collection} from 'backbone';

const StatusCollection = Collection.extend({
  urlRoot: '/statuses',

  url() {
    return `${this.urlRoot}/${this.props.screenName}`;
  },

  parse(data) {
    return data.statuses;
  },

  initialize(props) {
    if (!isObject(props) || !isString(props.screenName)) {
      throw "StatusCollection requires a screenName property to be passed at instantiation."
    }
    this.props = props;
  }
});

export default StatusCollection;
