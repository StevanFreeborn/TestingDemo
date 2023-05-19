import { render, screen } from '@testing-library/react';
import App from '../src/App';
import {
  UserContextProvider,
  useUserContext,
} from '../src/context/UserContext';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../src/context/UserContext', () => ({
  ...jest.requireActual('../src/context/UserContext'),
  useUserContext: jest.fn(() => ({
    userState: null,
    dispatchUserAction: jest.fn(),
  })),
}));

const mockedUseUserContext = jest.mocked(useUserContext);

it('renders learn react link', () => {
  render(
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
  const helloWorldHeading = screen.getByText(/Hello World/i);
  expect(helloWorldHeading).toBeInTheDocument();
  expect(mockedUseUserContext).toBeCalled();
});
