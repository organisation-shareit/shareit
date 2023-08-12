import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react';
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
import { MobileLayout } from './components/layout/MobileLayout';
import { WorkInProgressPage } from './pages/WorkInProgressPage/WorkInProgressPage';
import { DebugPage } from './pages/DebugPage/DebugPage';
import { WebLayout } from './components/layout/WebLayout';
import { ItemsPage } from './pages/ItemsPage/ItemsPage';
import { LoansPage } from './pages/LoansPage/LoansPage';
import { GroupsPage } from './pages/GroupsPage/GroupsPage';

function App() {
  const queryClient = new QueryClient();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route path="/" element={<Navigate to={'app'} replace />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/app/*" element={isMobile ? <MobileLayout /> : <WebLayout />}>
          <Route path="*" element={<Navigate to={'page-one'} />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="loans" element={<LoansPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="settings" element={<WorkInProgressPage title="Settings" />} />
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
