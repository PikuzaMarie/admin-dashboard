import { RouterProvider } from 'react-router-dom';

import { routes } from './pages/router';

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
