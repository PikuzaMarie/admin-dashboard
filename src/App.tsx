import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RootLayout } from './components/RootLayout';
import { ROUTES } from './constants';
import { AuthenticationPage } from './features/auth/AuthenticationPage';
import { selectCurrentUserId } from './features/auth/authSlice';
import { CreateProductPage } from './features/products/CreateProductPage';
import { EditProductPage } from './features/products/EditProductPage';
import { ProductPage } from './features/products/ProductPage';
import { ProductsPage } from './features/products/ProductsPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAppSelector } from './withTypes';

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
                  <Route path="*" element={<NotFoundPage />} />
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
