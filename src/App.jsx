import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Articles } from './components/Articles';
import { ArticlesById } from './components/ArticlesById';
import { Users } from './components/Users';
import { UserContext, UserProvider } from './components/UserProvider';
 
 export function App() {
  return (
    <UserProvider>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/topics/:topic" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticlesById />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </UserProvider>
  );
 }