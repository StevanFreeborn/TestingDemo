import { RenderOptions, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContextProvider } from '../../src/context/UserContext';

function customRender(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions
) {
  render(<MemoryRouter>ui</MemoryRouter>, {
    wrapper: UserContextProvider,
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
