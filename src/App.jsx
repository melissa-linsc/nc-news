import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { Articles } from './components/Articles';
import { ArticlesById } from './components/ArticlesById';
import { Users } from './components/Users';
import { UserContext, UserProvider } from './components/UserProvider';
import { PageNotFound } from './components/PageNotFound';
import { Bookmark } from './components/Bookmark';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#DD3232'
    }
  },
});
 
 export function App() {

  const [bookmarked, setBookmarked] = useState([])
  const [page, setPage] = useState(1)

  return (
    <ThemeProvider theme={theme}>
    <UserProvider>
      <Header />
      <NavBar setPage={setPage}/>
      <Routes>
        <Route path="/" element={<Articles page={page} setPage={setPage}/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/topics/:topic" element={<Articles page={page} setPage={setPage}/>} />
        <Route path="/articles/:article_id" element={<ArticlesById bookmarked={bookmarked} setBookmarked={setBookmarked}/>} />
        <Route path="/users" element={<Users />} />
        <Route path="/bookmarked" element={<Bookmark bookmarked={bookmarked} setBookmarked={setBookmarked}/>} />
      </Routes>
    </UserProvider>
    </ThemeProvider>
  );
 }