import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.jsx'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import * as React from 'react';
import UseStatePage from '@/components/component/use-state.jsx';
import UseEffectPage from '@/components/component/use-effect.jsx';
import CurrencyConverter from '@/components/component/currency-converter';
import NotFound from '@/components/component/not-found';
import Home from '@/components/component/home';
import UseCallbackPage from '@/components/component/use-callback';
import UseMemoPage from '@/components/component/use-memo';
import UseContextPage from '@/components/component/use-context';
import { ThemeProvider } from './components/component/theme-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter basename="/react-demo">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home/>}/>
            <Route path="react-hooks" element={<Outlet />} >
              <Route path="use-state" element={<UseStatePage />} />
              <Route path="use-effect" element={<UseEffectPage />} />
              <Route path="use-memo" element={<UseMemoPage />} />
              <Route path="use-callback" element={<UseCallbackPage />} />
              <Route path="use-context" element={<UseContextPage />} />
            </Route>
            <Route path="apps" element={<Outlet />} >
              <Route path="currency-converter" element={<CurrencyConverter />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
