import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthGate } from './components/AuthGate';
import { AuthProvider } from './hooks/useAuth';
import { ToastProvider } from './hooks/useToast';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ToastProvider><AuthProvider><AuthGate><App /></AuthGate></AuthProvider></ToastProvider></React.StrictMode>);
