import {render, fireEvent, screen} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Subtask from './index';
const be = '/api/';
const title = 'step test';
const todo_id = 1;

const server = setupServer(
  rest.post(`${be}subtask`, (req, res, ctx) => {
    return res(ctx.json({data: {title, todo_id}}))
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
})
afterAll(() => server.close());

test('add new step empty', async () => {
  render(<Subtask be={be} getTodo={() => {}} todo_id={todo_id} />);
  fireEvent.click(screen.getByText(/New Step/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Please fill/i);
});

test('add new step success', async () => {
  render(<Subtask be={be} getTodo={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText(/What are the steps\?/i), {
    target: {value: title},
  });
  fireEvent.click(screen.getByText(/New Step/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Add success/i);
});

test('add new step failure', async () => {
  server.use(
    rest.post(`${be}subtask`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({error: [{ status: 500 }]}))
    }),
  );
  render(<Subtask be={be} getTodo={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText(/What are the steps\?/i), {
    target: {value: title},
  });
  fireEvent.click(screen.getByText(/New Step/i));
  const message = await screen.findByRole('alert');
  expect(message).toHaveTextContent(/Add failure/i);
});