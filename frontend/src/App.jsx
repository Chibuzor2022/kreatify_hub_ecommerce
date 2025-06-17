import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './App.css'
import CartPage from './pages/CartPage';
import PlaceOrderPage from './pages/PlaceOrderPage'
import UserListPage from './pages/admin/UserListPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';





function App() {
  return (
    <Router>
<ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex flex-col justify-between">
        <Header/>
        <main className="flex-grow">
         <Routes>
            {/* unprocted routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search/:keyword" element={<Home/> } />
            
            {/*Other protected routes*/}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="placeorder" element={<ProtectedRoute><PlaceOrderPage /></ProtectedRoute>} />
            
            {/* Admin routes (protected) */}
       <Route path="/admin/dashboard"  element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>}/>
       <Route path="/admin/userlist"  element={<ProtectedAdminRoute><UserListPage /></ProtectedAdminRoute>}/>
       <Route path="/admin/productlist"  element={<ProtectedAdminRoute><ProductListPage /></ProtectedAdminRoute>}/>
       <Route path="/admin/product/:id/edit"  element={<ProtectedAdminRoute><ProductEditPage /></ProtectedAdminRoute>}/>
          </Routes>
          
           </main>
          <Footer/>
      </div>
        
    </Router>
  );
}
export default App;
