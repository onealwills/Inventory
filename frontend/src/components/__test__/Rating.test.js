import { render } from "@testing-library/react";
import Rating from "../Rating";

const rating = {
  rating: 3.5,
  numReviews: 5,
  caption: "whatever",
};

test("<Rating/> component Snapshot", () => {
  const component = render(<Rating rating={rating} caption=""></Rating>);
  expect(component.container).toMatchSnapshot();
});
