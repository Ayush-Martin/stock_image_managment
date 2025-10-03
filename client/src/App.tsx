import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthRouter, UserRouter } from "./router";
import RoutesHandler from "./components/auth/RoutesHandler";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/auth/slice/userSlice";
import { AppDispatch, RootReducer } from "./store";
import LoadingScreen from "./components/common/Loading";
import { getRefreshApi } from "./api/auth.api";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken } = useSelector((state: RootReducer) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (!accessToken) {
          const res = await getRefreshApi();
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
          <Route path="/*" element={<RoutesHandler requiredRole="user" />}>
            {UserRouter.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route path="/auth/*" element={<RoutesHandler requiredRole="auth" />}>
            {AuthRouter.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
