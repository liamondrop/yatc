import {View} from 'backbone';
import {StatusView} from '../../../src/views';

describe('StatusView', function () {
  it("should be an instance of a View", function () {
    const statuses = new StatusView();
    const actual = statuses instanceof View;
    const expected = true;
    expect(actual).toBe(expected);
  });
});
