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

  it("should throw an error if the screenName is not passed at instantiation", function () {
    const statuses1 = () => new StatusCollection();
    const statuses2 = () => new StatusCollection({otherProp: 'other'});
    const statuses3 = () => new StatusCollection({screenName: 'twitter'});
    const expected = "StatusCollection requires a screenName property to be passed at instantiation."
    expect(statuses1).toThrow(expected);
    expect(statuses2).toThrow(expected);
    expect(statuses3).not.toThrow(expected);
  });

  it("should have a url like '/statuses/<screenName>'", function () {
    const screenName = 'twitter';
    const statuses = new StatusCollection({screenName});
    const actual = statuses.url();
    const expected = `/statuses/${screenName}`;
    expect(actual).toBe(expected);
  });

  it("should properly parse a JSON reponse into a collection of Models", function (done) {
    let statuses = new StatusCollection({screenName: 'twitter'});
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
          "text"
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
