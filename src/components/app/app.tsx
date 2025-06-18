import { ReactElement, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  AppHeader,
  ProtectedRoute,
  Modal,
  OrderModal,
  OrderInfo,
  IngredientDetails
} from '@components';
import {
  NotFound404,
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import styles from './app.module.css';
import '../../index.css';

function makeProtected(
  element: ReactElement,
  { onlyUnAuth, wallpaper }: { onlyUnAuth?: boolean; wallpaper?: boolean } = {}
) {
  return (
    <ProtectedRoute onlyUnAuth={onlyUnAuth} wallpaper={wallpaper}>
      {element}
    </ProtectedRoute>
  );
}

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <>
        <Routes>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route
            path='/ingredients/:id'
            element={<ConstructorPage wallpaper />}
          />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<Feed wallpaper />} />
          <Route
            path='/login'
            element={makeProtected(<Login />, { onlyUnAuth: true })}
          />
          <Route
            path='/register'
            element={makeProtected(<Register />, { onlyUnAuth: true })}
          />
          <Route
            path='/forgot-password'
            element={makeProtected(<ForgotPassword />, { onlyUnAuth: true })}
          />
          <Route
            path='/reset-password'
            element={makeProtected(<ResetPassword />, { onlyUnAuth: true })}
          />
          <Route path='/profile' element={makeProtected(<Profile />)} />
          <Route
            path='/profile/orders'
            element={makeProtected(<ProfileOrders />)}
          />
          <Route
            path='/profile/orders/:number'
            element={makeProtected(<ProfileOrders wallpaper />, {
              wallpaper: true
            })}
          />
        </Routes>
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <OrderModal onClose={() => navigate('/feed')}>
                <OrderInfo />
              </OrderModal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={makeProtected(
              <OrderModal onClose={() => navigate('/profile/orders')}>
                <OrderInfo />
              </OrderModal>
            )}
          />
        </Routes>
      </>
    </div>
  );
};

export default App;
