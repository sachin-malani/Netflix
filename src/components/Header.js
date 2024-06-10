import logo from "../assets/logo.png";
import { auth } from "../utils/firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="flex items-center justify-between mx-4 w-full">
      <div>
        <img
          className="cursor-pointer"
          width="144"
          height="96"
          src={logo}
          alt="netflix"
        />
      </div>
      {user && (
        <div className="relative">
          <img
            className="rounded-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            src={user?.photoUrl}
            width="24"
            height="24"
            alt=""
            onMouseEnter={() => setIsDropDownVisible(true)}
            onMouseLeave={() => setIsDropDownVisible(false)}
          />
          {isDropDownVisible && (
            <div
              className={`absolute top-full right-0 w-48 bg-black bg-opacity-80 text-white p-2 z-10 transition-opacity duration-300 ease-in-out ${
                isDropDownVisible
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              onMouseEnter={() => setIsDropDownVisible(true)}
              onMouseLeave={() => setIsDropDownVisible(false)}
            >
              <button
                className="block w-full text-left px-2 py-2 hover:underline rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
