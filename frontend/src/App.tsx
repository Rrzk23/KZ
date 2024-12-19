
import { CssBaseline} from '@mui/material';
import { ProviderWithContext } from './context/Context';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

function App() {

  return (
    <BrowserRouter>
      <ProviderWithContext>
        <CssBaseline />
        <Routes>
            <Route
              path = '/'
              element={<MainPage/>}
            />
            <Route
              path = '/login'
              element={<LoginPage/>}
              />
            <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </ProviderWithContext>
    </BrowserRouter>
  );
}

export default App;
