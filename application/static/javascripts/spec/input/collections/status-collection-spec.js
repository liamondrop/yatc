import {Collection} from 'backbone';
import {StatusCollection} from '../../../src/collections';

describe('StatusCollection', function () {
  it("should be an instance of a Collection", function () {
    const screenName = 'twitter';
    const statuses = new StatusCollection({screenName});
    const actual = statuses instanceof Collection;
    const expected = true;
    expect(actual).toBe(expected);
  });

  describe('setProp', function () {
    beforeEach(function() {
      this.statuses = new StatusCollection();
    });

    it("should have an empty property object to start", function () {
      const actual   = this.statuses.props;
      const expected = {};
      expect(actual).toEqual(expected);
    });

    it("should add a property with with the first argument equal to the key and the second argument equal to the value", function () {
      const testProp = 'testProp';
      this.statuses.setProp(testProp, testProp);
      const actual   = this.statuses.props;
      const expected = {testProp};
      expect(actual).toEqual(expected);
    });
  });

  it("should throw an exception if no screenName property is set", function () {
    const statuses = new StatusCollection();
    const actual   = () => statuses.url();
    const expected = 'StatusCollection requires a screenName property to be set before it can fetch';
    expect(actual).toThrow(expected);
  });
  
  it("should have a url like '/statuses/<screenName>' after screenName prop is set", function () {
    const screenName = 'twitter';
    const statuses = new StatusCollection();

    statuses.setProp('screenName', screenName);

    const actual = statuses.url();
    const expected = `/statuses/${screenName}`;
    expect(actual).toBe(expected);
  });

  it("should properly parse a JSON reponse into a collection of Models", function (done) {
    let statuses = new StatusCollection();
    statuses.setProp('screenName', 'twitter');
    statuses.on('sync', collection => {
      const model = collection.at(0);
      if (collection.length > 0) {
        const actual = model.keys();
        const expected = [
          "created_at",
          "id",
          "name",
          "profile_image_url",
          "retweet_count",
          "screen_name",
          "text",
          "created_at_local",
          "parsed_text"
        ];
        expect(actual).toEqual(expected);
      } else {
        expect(model).toBeUndefined();
      }
      done();
    });
    statuses.fetch();
  });
});
