import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';
const be = '/api/';
const title = 'todo test'

const server = setupServer(
  rest.get(be, (req, res, ctx) => {
    return res(ctx.json({data: [{id: 1, title}]}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
})
afterAll(() => server.close());

test('renders todo app element and list', async () => {
  render(<App be={be} />);
  const titleElement = screen.getByText(/Todo App/i);
  expect(titleElement).toBeInTheDocument();
  const listItem = await screen.findByText(title);
  expect(listItem).toBeInTheDocument();
});