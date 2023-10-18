import myReducer from '../reducers'; // adjust the import to your file structure

describe('insert reducer functionality here reducer', () => {
  it('should handle ADD_TODO', () => {
    expect(
      myReducer([], {
        type: 'ADD_TODO',
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false
      }
    ]);

    // ... more tests for different cases
  });
});
