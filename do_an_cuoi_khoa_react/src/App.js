import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Register from "./FirstPage/Register";
import Login from "./FirstPage/Login";

import Profile from "./components/Profile/Profile";
import { ProfileProvider } from "./ProfileContext";
import DefaultPage from "./components/DefaultLayout/DefaultPage";
import FriendList from "./components/FirstColumn/FriendList/FriendList";
import FriendRequestList from "./components/FirstColumn/FriendRequest/FriendRequestList";

// Component bảo vệ để kiểm tra trạng thái đăng nhập
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    // Đảm bảo chỉ có một BrowserRouter tại đây
    <>
      {" "}
      <ProfileProvider >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Trang DefaultPage được bảo vệ */}
          <Route
            path="/defaultPage"
            element={
              <ProtectedRoute>
                <DefaultPage />
              
              </ProtectedRoute>
            }
          />
           <Route path="/friends-list" element={<FriendList/>}/>
           <Route path="/friends-request-list"element={<FriendRequestList/>}/>
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </ProfileProvider>
    </>
  );
};

export default App;
