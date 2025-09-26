import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthRouter, UserRouter } from "./router";
import RoutesHandler from "./components/auth/RoutesHandler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_BASE_URL, REFRESH_TOKEN_API } from "./constants/API";
import { login } from "./features/auth/slice/userSlice";
import { AppDispatch, RootReducer } from "./store";
import { IResponse } from "./types/responseType";
import LoadingScreen from "./components/common/Loading";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken } = useSelector((state: RootReducer) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!accessToken) {
          const res: IResponse = await axios.get(
            `${BACKEND_BASE_URL}/api${REFRESH_TOKEN_API}`,
            { withCredentials: true }
          );
          dispatch(login(res.data.data));
        }
      } catch (err) {
        console.warn(err);
        // optional: only redirect if you're on protected route
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/auth/*" element={<RoutesHandler requiredRole="auth" />}>
            {AuthRouter.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route path="/*" element={<RoutesHandler requiredRole="user" />}>
            {UserRouter.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
