import {
  describe, expect, test,
} from '@jest/globals';
import { fetchingPhotos } from './uti';

describe('api module', () => {
  test('should fetch photos', async () => {
    const result = await fetchingPhotos();
    expect(result).toEqual(10);
  });
});
