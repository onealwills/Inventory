import { render, screen, cleanup } from "@testing-library/react";
import { createTestStore } from "./createTestStore";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import PrivateRoute from "../PrivateRoute";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

// it("redirects unauthenticated users to SignIn", async () => {
//   const history = createMemoryHistory({ initialEntries: ["/Private"] });
//   const PrivateComponent = () => <>Private!</>;
//   const PublicComponent = () => <>Redirected!</>;
//   render(
//     <Router history={history}>
//       <Switch>
//         <PrivateRoute exact path="/Private" component={PrivateComponent} />
//         <Route exact path="/SignIn" component={PublicComponent} />
//       </Switch>
//     </Router>
//   );
//   expect(screen.queryByText("Private!")).not.toBeInTheDocument();
//   expect(screen.queryByText("Redirected!")).toBeInTheDocument();
//   expect(history.location.pathname).toBe("/SignIn");
// });

let store;
afterEach(cleanup);
describe("<privateRout/> with store test", () => {
  beforeEach(() => {
    store = createTestStore();
  });
  test("Your component with a full reducer flow", async () => {
    const history = createMemoryHistory({ initialEntries: ["/Private"] });
    const PrivateComponent = () => <>Private!</>;
    const PublicComponent = () => <>Redirected!</>;
    // Create a redux store
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/Private" component={PrivateComponent} />
            <Route exact path="/Signin" component={PublicComponent} />
          </Switch>
        </Router>
      </Provider>
    );

    expect(screen.queryByText("Private!")).not.toBeInTheDocument();
    expect(screen.queryByText("Redirected!")).toBeInTheDocument();
    expect(history.location.pathname).toBe("/signin");
  });
});
