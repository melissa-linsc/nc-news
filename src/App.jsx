import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Articles } from './components/Articles';
 
 export function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </>
  );
 }