import { RouterProvider } from 'react-router-dom';

import { fetchUsers } from './features/users/usersSlice';
import { useAppDispatch } from './hooks';
import { routes } from './pages/router';

function App() {
  const dispatch = useAppDispatch();
  dispatch(fetchUsers());

  return <RouterProvider router={routes} />;
}

export default App;
