/**
 * @jest-environment jsdom
 */

let dummy = require('./dummy.js')

describe("Jest default test", () => {
  test('check if dummy.js exists', () => {
    console.log(dummy)
  });
})