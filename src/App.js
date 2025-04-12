import './App.css';
import Home from './features/home/home.jsx';
import './assets/main.css';
import Login from './features/auth/login/login.jsx';
import SignUp from './features/auth/signup/signup.jsx';
import { Route, Routes } from 'react-router-dom';
import MovieDetailPage from './features/film/MovieDetailPage.jsx';
import UserPage from './features/user/UserPage.jsx';
import EditUser from './features/user/EditUser.jsx';
import Admin from './features/admin/AdminPage.jsx';
import EditFilmPage from './features/admin/EditFilmPage.jsx';
import AddFilmPage from './features/admin/AddFilmPage.jsx';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/edit" element={<EditUser />} />

        {/* Bảo vệ route admin */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-film" element={<AddFilmPage />} />
          <Route path="/admin/edit-film/:id" element={<EditFilmPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
