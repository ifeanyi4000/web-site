import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import Auth from './screens/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './screens/Dashboard';
import ForgotPassword from './screens/ForgotPassword';
import ChangePassword from './screens/ChangePassword';
import ProfileSetup from './screens/ProfileSetup';
import ProfileScreen from './screens/ProfileScreen';
import HelpCenter from './screens/HelpCenter';
import ManageFaq from './components/faq/ManageFaq';
import EditFaq from './screens/EditFaq';
import PrivacyScreen from './screens/PrivacyScreen';
import NotificationAdminScreen from './screens/NotificationAdminScreen';
import AppUsers from './screens/AppUsers';
import ArchivedOrders from './screens/ArchivedOrders';
import BroadCastMessage from './screens/BroadCastMessage';
import ViewPersonalProfileScreen from './screens/ViewPersonalProfileScreen';
import SeeAllTithesPaid from './screens/SeeAllTithesPaid';
import ProtectedRoutesAdmin from './components/routes/ProtectedRoutesAdmin';
import UserAnalysis from './screens/UserAnalysis';
import OrderAnalysis from './screens/OrderAnalysis';
import PrivacyPaymentScreen from './screens/PrivacyPaymentScreen';
import DocumentOfflineTithe from './screens/DocumentOfflineTithe';
import SeeAllOnlineTithesPaid from './screens/SeeAllOnlineTithesPaid';
import LiveProgramScreen from './screens/LiveProgramScreen';
import SermonScreen from './screens/SermonScreen';
import CreateSermon from './components/sermon/CreateSermon';
import EditSermon from './components/sermon/EditSermon';
import CreateProduct from './components/store/ProductCreate';
import StoreScreen from './screens/StoreScreen';
import EditProduct from './components/store/EditProduct';
import ProductPreview from './components/store/ProductPreview';
import OfferingScreen from './screens/OfferingScreen';
import CathedralOfferingScreen from './screens/CathedralOfferingScreen';
import OfferingAnalysis from './screens/OfferingAnalysis';
import SeedsAnalysis from './screens/SeedsAnalysis';
import DeliveryScreen from './screens/DeliveryScreen';
import SliderScreen from './screens/SliderScreen';
import StoreTransactions from './screens/StoreTransactions';
import OrderTableView from './components/storeOrder/OrderTableView';
import IncomeAnalyticsView from './components/storeOrder/chart/IncomeAnalyticsView';
import TaxAnalyticsView from './components/storeOrder/chart/TaxAnalyticsView';
import DeliveryFeeChart from './components/storeOrder/chart/DeliveryFeeChart';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/current-tithes" element={
          <ProtectedRoutesAdmin>
            <HomePage />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/auth" element={
          // <PrivateRoutes>
          <Auth />
          // </PrivateRoutes>

        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ChangePassword />} />
        <Route path="/profile-setup" element={
          <ProtectedRoutesAdmin>
            <ProfileSetup />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/" element={
          <ProtectedRoutesAdmin>
            <Dashboard />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/user-analysis-chart" element={
          <ProtectedRoutesAdmin>
            <UserAnalysis />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/order-analysis-chart" element={
          <ProtectedRoutesAdmin>
            <OrderAnalysis />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/profile" element={
          <ProtectedRoutesAdmin>
            <ProfileScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/help-center' element={
          <ProtectedRoutesAdmin>
            <HelpCenter />
          </ProtectedRoutesAdmin>
        } />
        <Route path="/manage-faq" element={
          <ProtectedRoutesAdmin>
            <ManageFaq />
          </ProtectedRoutesAdmin>
        }
        />
        <Route path='/edit-faq/:id' element={
          <ProtectedRoutesAdmin>
            <EditFaq />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/privacy' element={
          <ProtectedRoutesAdmin>
            <PrivacyScreen />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/payment-privacy' element={
          <ProtectedRoutesAdmin>
            <PrivacyPaymentScreen />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/notification' element={
          <ProtectedRoutesAdmin>
            <NotificationAdminScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/app-users' element={
          <ProtectedRoutesAdmin>
            <AppUsers />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/archived-tithes' element={
          <ProtectedRoutesAdmin>
            <ArchivedOrders />
          </ProtectedRoutesAdmin>

        } />
        <Route path="/broadcast" element={
          <ProtectedRoutesAdmin>
            <BroadCastMessage />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/view-profile/:id' element={
          <ProtectedRoutesAdmin>
            <ViewPersonalProfileScreen />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/all-tithe-paid/:id' element={
          <ProtectedRoutesAdmin>
            <SeeAllTithesPaid />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/all-tithe-paid-online/:id' element={
          <ProtectedRoutesAdmin>
            <SeeAllOnlineTithesPaid />
          </ProtectedRoutesAdmin>

        } />

        <Route path='/document-offline-tithers' element={
          <ProtectedRoutesAdmin>
            <DocumentOfflineTithe />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/live-program' element={
          <ProtectedRoutesAdmin>
            <LiveProgramScreen />
          </ProtectedRoutesAdmin>

        } />
        <Route path='/sermon' element={
          <ProtectedRoutesAdmin>
            <SermonScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/create-sermon' element={
          <ProtectedRoutesAdmin>
            <CreateSermon />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/edit-sermon/:id' element={
          <ProtectedRoutesAdmin>
            <EditSermon />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/store' element={
          <ProtectedRoutesAdmin>
            <StoreScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/create-product' element={
          <ProtectedRoutesAdmin>
            <CreateProduct />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/edit-product/:id' element={
          <ProtectedRoutesAdmin>
            <EditProduct />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/view-product/:id' element={
          <ProtectedRoutesAdmin>
            <ProductPreview />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/offering' element={
          <ProtectedRoutesAdmin>
            <OfferingScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/cathedral' element={
          <ProtectedRoutesAdmin>
            <CathedralOfferingScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/offering-analysis' element={
          <ProtectedRoutesAdmin>
            <OfferingAnalysis />
          </ProtectedRoutesAdmin>
        } />
    
         <Route path='/seeds-analysis' element={
          <ProtectedRoutesAdmin>
            <SeedsAnalysis />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/delivery' element={
          <ProtectedRoutesAdmin>
            <DeliveryScreen />
          </ProtectedRoutesAdmin>
        } />
        <Route path='/manage-slider' element={
          <ProtectedRoutesAdmin>
            <SliderScreen />
          </ProtectedRoutesAdmin>
        } />
         <Route path='/store-transaction-analysis' element={
          <ProtectedRoutesAdmin>
            <StoreTransactions />
          </ProtectedRoutesAdmin>
        } />
         <Route path='/store-order-table-view' element={
          <ProtectedRoutesAdmin>
            <OrderTableView />
          </ProtectedRoutesAdmin>
        } />
         <Route path='/store-order-income-view' element={
          <ProtectedRoutesAdmin>
            <IncomeAnalyticsView/>
          </ProtectedRoutesAdmin>
        } />
         <Route path='/store-order-tax-view' element={
          <ProtectedRoutesAdmin>
            <TaxAnalyticsView/>
          </ProtectedRoutesAdmin>
        } />
         <Route path='/store-order-fee-view' element={
          <ProtectedRoutesAdmin>
            <DeliveryFeeChart/>
          </ProtectedRoutesAdmin>
        } />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
