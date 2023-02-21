import { describe, expect, test } from '@jest/globals';
import fetch from 'jest-mock-fetch';
import * as API from './api';

describe('api module', () => {
  test('addProp should add bootcamp', async () => {
    /**
     * spying on the fetchUser method to check if it is called
     * by addProp
     * we're also mocking a return value from the fetchUser
     * method to check the value returned
     * from the addProp function at the end
     */
    jest.spyOn(API, 'fetchUser').mockReturnValueOnce(
      Promise.resolve({
        user: 'Ahsan',
      }),
    );
    /**
     * Spying on the generateImages method to check if
     * it is called by addProp
     */
    jest.spyOn(API, 'generateImages');
    // store the value returned from addProp
    const returnedValue = await API.addProp();
    // check if fetchUser was called
    expect(API.fetchUser).toHaveBeenCalled();
    /**
     * check if the returned value from addProp contains bootcamp
     */
    expect(returnedValue.bootcamp).toBe('javascript');
    expect(API.generateImages).toHaveBeenCalled();
  });
  test('fetchUser should get data from the API and return it', done => {
    /**
     * Calling the actual method expecting correct data
     * This function calls a real `fetch` call. but we mock the
     * `fetch` using `jest-mock-fetch` at the top of this file.
    */
    API.fetchUser().then(data => {
      expect(data).toEqual({
        user: 'Ahsan',
      });
      done();
    });
    /**
     * Expecting the mock `fetch` to be called with the API
    */
    expect(fetch).toHaveBeenCalledWith('https://randomuser.me/api');
    /**
    * Here is where we're mocking the response from the mock fetch.
    */
    fetch.mockResponse({
      json: () => ({
        user: 'Ahsan',
      }) as object,
    });
  });
});
