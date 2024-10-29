import { useState } from "react";
import Auth from "./components/Auth"
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";
import NotificationList from "./components/NotificationList";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {Link} from "react-router-dom"
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stackOverflowLogo from './assets/stack_overflow_logo.png'; 

function App() {
  const [token, setToken] = useState(null); // Token for authenticated user
   // To toggle between posts and notifications

  const handleLogout = () => {
    setToken(null);
  };




  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-350 to-red-400 flex items-center justify-center">
      <BrowserRouter>
        {!token ? (
          <Auth setToken={setToken} />
        ) : (
          <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
            <header className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <img src={stackOverflowLogo} alt="Stack Overflow Logo" className="h-32 w-32 mr-3" />
              </div>

              <div className="flex gap-4">
                <Link className="text-lg font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 transition duration-200" to="/">Home</Link>

                {/* Notification icon */}
                <Link to="/notifications" className="relative flex items-center">
                  <FontAwesomeIcon icon={faBell} className="text-gray-800 bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-200" />
                  {/* Optionally, add notification count badge */}
                  {/* <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span> */}
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                >
                  Logout
                </button>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<PostList token={token} />} />
              <Route path="/post/:postId" element={<SinglePost token={token} />} />
              <Route path="/notifications" element={<NotificationList token={token} />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;



