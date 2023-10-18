import { myActionCreator } from '../actions'; // adjust the import to your file structure

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: 'ADD_TODO',
      text
    };
    expect(myActionCreator(text)).toEqual(expectedAction);
  });
});
