import { CssBaseline } from '@mui/material';
import { ProviderWithContext } from './context/Context';
import { HashRouter , Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage'; 

function App() {
  return (
    <HashRouter >
      <ProviderWithContext>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProviderWithContext>
    </HashRouter >
  );
}

export default App;

