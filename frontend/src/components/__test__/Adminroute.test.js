import { render, screen } from "@testing-library/react";
import { createTestStore } from "./createTestStore";
import { Router, Route, Switch } from "react-router-dom";
import { createMemoryHistory } from "history";
import AdminRoute from "../AdminRoute";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

let store;
describe("<AdminRoute>", () => {
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
            <AdminRoute exact path="/Private" component={PrivateComponent} />
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
