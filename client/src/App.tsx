import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRouter } from "./router";

const App = () => {
  return (
    <main className="">
      <Suspense>
        <Routes>
          <Route path="/auth/*">
            {AuthRouter.map(({ Component, path }) => (
              <Route key={path} path={path} element={<Component />}></Route>
            ))}
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
