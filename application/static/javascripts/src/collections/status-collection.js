import {isObject, isString, isEmpty, extend} from 'underscore';
import {Collection} from 'backbone';

const StatusCollection = Collection.extend({
  url() {
    const {props} = this;
    if (!isObject(props) ||
        isEmpty(props.screenName) ||
        !isString(props.screenName)) {
      throw "StatusCollection requires a screenName property to be set before it can fetch"
    }
    return `/statuses/${props.screenName}`;
  },

  parse(data) {
    return data.statuses;
  },

  initialize() {
    this.props = {};
  },

  setProp(key, value) {
    this.props[key] = value;
  }
});

export default StatusCollection;
