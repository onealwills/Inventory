import { render } from "@testing-library/react";
import LoadingBox from "../LoadingBox";

test("<LoadingBox/> snapshot test", () => {
  const component = render(<LoadingBox />);
  expect(component.container).toMatchSnapshot();
});
