import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyButton from '../MyButton'; // adjust the import to your file structure

describe('MyButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyButton title="Press me" />);
    expect(getByText("Press me")).toBeDefined();
  });

  it('handles onPress', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<MyButton title="Press me" onPress={onPressMock} />);
    
    fireEvent.press(getByText("Press me"));
    expect(onPressMock).toHaveBeenCalled();
  });
});
