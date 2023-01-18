import { render } from "@testing-library/react";
import CheckoutSteps from "../CheckoutSteps";

test("<CheckoutSteps/> component snapshot test", () => {
  const component = render(<CheckoutSteps step1 step2></CheckoutSteps>);
  expect(component.container).toMatchSnapshot();
});
