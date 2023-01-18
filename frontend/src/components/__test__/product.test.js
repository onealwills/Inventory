import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "../Product";

const stockKeeper = {
  _id: "2222222222222222",
  stockKeeper: { name: "john", warehouse: "Block A4, shop 12" },
};
const product = {
  _id: "1111111111111111",
  image: "/images/2009 Honda CRV drier.jpg",
  type: "Ac/drier",
  make: "Honda",
  model: "CRV",
  year: "2009",
  stockQty: 50,
  price: 12000,
  stockKeeper: stockKeeper,
};

test("<Product/> component snapshot", () => {
  const component = render(
    <MemoryRouter>
      <Product key={product._id} product={product} />
    </MemoryRouter>
  );
  expect(component.container).toMatchSnapshot();
});
