import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#131826',
            color: '#E7E9F3',
            border: '1px solid rgba(255,255,255,0.08)',
          },
          success: { iconTheme: { primary: '#22D3C7', secondary: '#0B0E17' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#0B0E17' } },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
