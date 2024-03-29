import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInUp from "./components/SignInUp";
import Browse from "./components/Browse";

function App() {
  const appRouter = createBrowserRouter([
      {
          path: "/",
          element: <Body />,
          children: [
            {
              path: "/",
              element: <SignInUp />
            },
            {
              path: "/browse",
              element: <Browse />
            }
          ]
      }
  ])

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
