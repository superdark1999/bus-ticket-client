import { createAsyncThunk } from '@reduxjs/toolkit';

const baseRoute = '/auth';
const actions = {
  fetchUserById: '/fetchUserById',
};

Object.keys(actions).forEach((key) => {
  actions[key as keyof typeof actions] = baseRoute + actions[key as keyof typeof actions];
});

function later(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
export const fetchUserById = createAsyncThunk(actions.fetchUserById, async (userId: string) => {
  // const user = await UserAPI.getUserById({ userId });

  // fake promise
  await later(2000);

  const user = { id: userId, email: 'long@gmail.com', isAdmin: true };

  return user;
});
export default '';
