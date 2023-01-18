import { render } from "@testing-library/react";
import MessageBox from "../MessageBox";

test("<MessageBox/> component snapshot test", () => {
  const component = render(
    <MessageBox type="danger">yeye dey smell</MessageBox>
  );
  expect(component.container).toMatchSnapshot();
});
