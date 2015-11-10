import {View} from 'backbone';
import {StatusCollection} from '../../../src/collections';
import {TimelineView} from '../../../src/views';

describe('TimelineView', function () {
  it("should be an instance of a View", function () {
    const tlv = new TimelineView({
      collection: new StatusCollection()
    });
    const actual = tlv instanceof View;
    const expected = true;
    expect(actual).toBe(expected);
  });
});
