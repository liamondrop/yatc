import {Collection} from 'backbone';
import {StatusCollection} from '../../src/collections';

describe('StatusCollection', function() {
  it("should be an instance of a Collection", function() {
    const statuses = new StatusCollection();
    const actual = statuses instanceof Collection;
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
