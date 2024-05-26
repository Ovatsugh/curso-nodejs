import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Navbar from './components/Layouts/Navbar';
import Footer from './components/Layouts/Footer';
import Container from './components/Layouts/Container';
import Message from './components/Layouts/Message';

// Pages
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register';
import Home from './components/Home';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/Mypets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';
import MyAdoptions from './components/pages/Pet/MyAdoptions';

//context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message/>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets/mypets" element={<MyPets />} />
          <Route path="/pet/add" element={<AddPet />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/pet/edit/:id" element={<EditPet />} />
          <Route path="/pets/myadoptions" element={<MyAdoptions />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
