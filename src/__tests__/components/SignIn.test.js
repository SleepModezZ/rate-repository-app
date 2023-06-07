import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../../components/SignIn/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const signInMock = jest.fn();
      // render the SignInContainer component, fill the text inputs and press the submit button
      render(<SignInContainer onSubmit={signInMock} />);
      fireEvent(screen.getByPlaceholderText('Username'), 'onChangeText', 'tester');
      fireEvent(screen.getByPlaceholderText('Password'), 'onChangeText', 'test');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(signInMock.mock.calls[0][0]).toEqual({
          username: 'tester',
          password: 'test',
        });
      });
    });
  });
});
