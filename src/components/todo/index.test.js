import {render, fireEvent, screen} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Todo from './index';
const be = '/api/';
const title = 'todo test';

const server = setupServer(
  rest.post(be, (req, res, ctx) => {
    return res(ctx.json({data: {title}}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
})
afterAll(() => server.close());

test('add new list empty', async () => {
  render(<Todo be={be} getTodo={() => {}} />);
  fireEvent.click(screen.getByText(/New List/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Please fill/i);
});

test('add new list success', async () => {
  render(<Todo be={be} getTodo={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText(/What to do\?/i), {
    target: {value: title},
  });
  fireEvent.click(screen.getByText(/New List/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Add success/i);
});

test('add new list failure', async () => {
  server.use(
    rest.post(be, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({error: [{ status: 500 }]}))
    }),
  );
  render(<Todo be={be} getTodo={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText(/What to do\?/i), {
    target: {value: title},
  });
  fireEvent.click(screen.getByText(/New List/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Add failure/i);
});