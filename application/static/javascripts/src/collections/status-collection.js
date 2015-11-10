import {isObject, isString, isEmpty, extend} from 'underscore';
import {Collection} from 'backbone';
import {StatusModel} from '../models';

const StatusCollection = Collection.extend({
  model: StatusModel,

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
  },

  // status lookup public api
  lookup(query) {
    if (isString(query) && query.length) {

      // filter the models in the collection based on their 'text' property
      const results = this.filter(_matcher(query, 'text'));

      // sort filtered results by relevance score
      return results.sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      });
    }
    
    // return all models if no query
    return this.models;
  }
});

// `_matcher` (private)
// 
// Callback to Collection.filter
// -----------------------------
// Checks whether a model matches a given query string
// and, if so, assigns a rudimentary relevance score
function _matcher(query, searchProp) {
  const regex = new RegExp(query, 'gi');
  
  // returns a closure back to Collection.filter to capture
  // the query string and model property to match against
  return function _matcherFilter(model) {

    // get the string to be searched
    const searchee = model.get(searchProp);
    
    // First, test that the query exists somewhere in the
    // string to be searched (searchee)
    if (regex.test(searchee)) {

      // Next, check the index of the first match
      // as well as the total number of matches
      const index = searchee.indexOf(query);
      const matches = searchee.match(regex);

      // Finally, divide the number of string matches by the
      // string position of the first match.
      // 
      // (add 1 to the index to avoid dividing by 0)
      model.score = matches.length / (index + 1);

      // since there is a match, return true to the filter func
      return true;
    }
  }
}

export default StatusCollection;
