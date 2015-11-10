import {View} from 'backbone';
import {StatusCollection} from '../../../src/collections';
import {UserLookupView} from '../../../src/views';

describe('UserLookupView', function () {
  it("should be an instance of a View", function () {
    const view = new UserLookupView({
      collection: new StatusCollection()
    });
    const actual = view instanceof View;
    const expected = true;
    expect(actual).toBe(expected);
  });
});
