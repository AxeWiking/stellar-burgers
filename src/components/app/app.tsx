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

function makeProtected(element: JSX.Element, passUnAuth: boolean = false) {
  return <ProtectedRoute passUnAuth={passUnAuth}>{element}</ProtectedRoute>;
}

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={makeProtected(<Login />, true)} />
        <Route path='/register' element={makeProtected(<Register />, true)} />
        <Route
          path='/forgot-password'
          element={makeProtected(<ForgotPassword />, true)}
        />
        <Route
          path='/reset-password'
          element={makeProtected(<ResetPassword />)}
        />
        <Route path='/profile' element={makeProtected(<Profile />)} />
        <Route
          path='/profile/orders'
          element={makeProtected(<ProfileOrders />)}
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
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
              <IngredientDetails />
            </Modal>
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
    </div>
  );
};

export default App;
