import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePages from "./pages/user/HomePages.jsx";
import Layouts from "./components/layouts/Layouts.jsx";
import SubmitPage from "./pages/user/SubmitPage.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchPage from "./pages/user/SearchPage.jsx";
import NotFoundPage from "../src/pages/NotFoundPage.jsx";

import Index from "./pages/dasboard/index";
import AdminLoginPage from "./pages/dasboard/AdminLoginPage.jsx";
import LayoutAdmin from "./components/layouts/LayoutAdmin.jsx";
import AdminMiddleware from "./middleware/AdminMiddleware.jsx";
import AdminHomePage from "./pages/dasboard/AdminHomePage.jsx";
import LayoutDashboard from "./components/layouts/LayoutDashboard.jsx";
import UserAdminPage from "./pages/dasboard/UserAdminPage.jsx";
import MessageAdmin from "./pages/dasboard/MessageAdmin.jsx";
import LoginPage from "./pages/user/LoginPage.jsx";
import MainAuthPage from "./pages/user/MainAuthPage.jsx";
import DetailMessage from "./pages/user/DetailMessage.jsx";
import HistoryMessage from "./pages/user/HistoryMessage.jsx";
// import CommentPage from "./pages/user/CommentPage.jsx";

const AvatarComponent = lazy(() => import("./pages/user/CommentPage.jsx"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* <StrictMode> */}
      <Routes>
        <Route path="*" element={<NotFoundPage />} /> 
        <Route path="/login" element={<MainAuthPage />} />
        <Route path="/" element={<Layouts />}>
          <Route index element={<HomePages />} />
          <Route path="/Send" element={<SubmitPage />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/message/:id" element={<DetailMessage />} />
          <Route path="/History" element={<HistoryMessage />} />
          <Route path="/Comment" element={<AvatarComponent />} />
        </Route>
        <Route path="/v1">
          <Route element={<LayoutAdmin />}>
            <Route index element={<AdminLoginPage />} />
            <Route element={<AdminMiddleware />}>
              <Route element={<LayoutDashboard />}>
                <Route path="dashboard" element={<AdminHomePage />} />
                <Route path="user" element={<UserAdminPage />} />
                <Route path="message" element={<MessageAdmin />} />
              </Route>
            </Route>
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Route>
      </Routes>
      {/* </StrictMode> */}
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
