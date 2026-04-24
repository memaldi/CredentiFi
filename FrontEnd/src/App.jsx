import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CursoPage from './pages/CursoPage';
import MainLayout from './components/MainLayout';
import PrerequisitesPage from './pages/PrerequisitesPage';
import ScrollToTop from './components/ScrollToTop';
import SecretaryLayout from './components/SecretaryLayout';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentPortalPage from './pages/StudentPortalPage';
import StudentLayout from './components/StudentLayout';
import SecretaryLoginPage from './pages/SecretaryLoginPage';
import StudentMicrocredentialPage from './pages/StudentMicrocredentialPage';
import QRPrerequisitesPage from './pages/QRPrerequisitesPage';
import QRInicioSesionPage from './pages/QRInicioSesionPage';
import QREmitirEducationalIDPage from './pages/QREmitir';
import ProtectedRoute from './components/ProtectedRouteSecretary';
import ProtectedRouteStudents from './components/ProtectedRouteStudents';
import { StudentProvider } from './components/StudentContext';
import SecretaryPage from './pages/SecretaryPage';
import SecretaryActas from './pages/SecretaryActas';
import { runtimeConfig } from './config/runtime';
import './styles/lumiere.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/curso' element={<ScrollToTop><CursoPage /></ScrollToTop>} />
        <Route path='/prerequisites' element={
        <ScrollToTop><PrerequisitesPage /></ScrollToTop>} />
      </Route>
      <Route path='/comparteCredenciales' element={<QRPrerequisitesPage />} />
      <Route path='/studentLogin' element={<StudentLoginPage />} />
      <Route path='/secretaryLogin' element={<SecretaryLoginPage />} />
      <Route path='/studentLogin/qr' element={<QRInicioSesionPage />} />
      <Route path='/microcredentials/solicitar' element={<QREmitirEducationalIDPage />}/>
      
      <Route element={<SecretaryLayout />}>
        <Route index path='/secretary' element={<ProtectedRoute><SecretaryPage /></ProtectedRoute>} />
        <Route path='/secretaryActas' element={<ProtectedRoute><SecretaryActas /></ProtectedRoute>} />
      </Route>

      <Route  element={<StudentLayout />}>
        <Route index path='/studentPortal' element={<ProtectedRouteStudents><StudentPortalPage /></ProtectedRouteStudents>} />
        <Route path='/microcredentials' element={<ProtectedRouteStudents><StudentMicrocredentialPage /></ProtectedRouteStudents>}/>
      </Route>      
    </>
      
  )
);

const App = () => {
  React.useEffect(() => {
    document.body.classList.remove('tenant-deusto', 'tenant-lumiere');
    document.body.classList.add(`tenant-${runtimeConfig.tenant}`);
  }, []);

  return (
    <>
      <StudentProvider>
        <RouterProvider router={router} />
      </StudentProvider>
      
    </>
  );
};
export default App;