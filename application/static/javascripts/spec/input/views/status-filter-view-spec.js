import {View} from 'backbone';
import {StatusCollection} from '../../../src/collections';
import {StatusFilterView} from '../../../src/views';

describe('TimelineView', function () {
  it("should be an instance of a View", function () {
    const view = new StatusFilterView({
      collection: new StatusCollection()
    });
    const actual = view instanceof View;
    const expected = true;
    expect(actual).toBe(expected);
  });
});
