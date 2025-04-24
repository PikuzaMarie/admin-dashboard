import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants';
import { selectCurrentUserId } from './features/auth/authSlice';
import { useAppSelector } from './hooks';
import { AuthenticationPage } from './pages/Authentication';
import { CreateProductPage } from './pages/CreateProduct';
import { EditProductPage } from './pages/EditProduct';
import { HomePage } from './pages/Home';
import { ProductPage } from './pages/Product';
import { ProductsPage } from './pages/Products';
import { RootLayout } from './pages/RootLayout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userId = useAppSelector(selectCurrentUserId);

  if (userId === 0) {
    return <Navigate to={ROUTES.auth} replace />;
  }

  return <RootLayout>{children}</RootLayout>;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={ROUTES.auth} element={<AuthenticationPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path={ROUTES.home} element={<HomePage />} />
                  <Route path={ROUTES.products} element={<ProductsPage />} />
                  <Route
                    path={`${ROUTES.products}/:productId`}
                    element={<ProductPage />}
                  />
                  <Route
                    path={`${ROUTES.products}/:productId/edit`}
                    element={<EditProductPage />}
                  />
                  <Route
                    path={`${ROUTES.products}/new`}
                    element={<CreateProductPage />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
