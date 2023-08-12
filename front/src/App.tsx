import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import customTheme from './theme';
import React from 'react';
import { AuthenticationPage } from './pages/AuthenticationPage/AuthenticationPage';
import { BasicLayout } from './components/layout/BasicLayout';
import { PageOneExample } from './pages/PageOneExample/PageOneExample';
import { PageTwoExample } from './pages/PageTwoExample/PageTwoExample';
import { WorkInProgressPage } from './pages/WorkInProgressPage/WorkInProgressPage';
import { DebugPage } from './pages/DebugPage/DebugPage';

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/" element={<Navigate to={'app'} replace />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/app/*" element={<BasicLayout />}>
          <Route path="*" element={<Navigate to={'page-one'} />} />
          <Route path="page-one" element={<PageOneExample />} />
          <Route path="page-two" element={<PageTwoExample />} />
          <Route path="random-page" element={<WorkInProgressPage title="Random page" />} />
          <Route path="debug" element={<DebugPage />} />
        </Route>
      </React.Fragment>,
    ),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <ChakraProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}

export default App;
