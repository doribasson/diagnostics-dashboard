import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary/GlobalErrorBoundary";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./styles/globals.scss";

const Info = lazy(() => import("./pages/Info/Info"));
const Notifications = lazy(() => import("./pages/Notifications/Notifications"));
const Files = lazy(() => import("./pages/Files/Files"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Logout = lazy(() => import("./pages/Logout/Logout"));

function App() {
  return (
    <GlobalErrorBoundary>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/info" element={<Info />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/files" element={<Files />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </GlobalErrorBoundary>
  );
}

export default App;
