import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressPage(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("userinfo>>>", userInfo);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  console.log("shipping address>>>", shippingAddress);

  const [lat, setLat] = useState(shippingAddress ? shippingAddress.lat : "");
  const [lng, setLng] = useState(shippingAddress ? shippingAddress.lng : "");
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [name, setName] = useState(shippingAddress ? shippingAddress.name : "");
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "You did not set your location on map. Continue?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          name,
          address,
          city,
          country,
          postalCode,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        name,
        address,
        city,
        country,
        postalCode,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };

  return (
    <div>
      <CheckoutSteps steps1 steps2></CheckoutSteps>
      <form className="form-shipping" onSubmit={submitHandler}>
        <h3>Shipping address here, werey!</h3>
        <div className="row">
          <label className="name-label">Name</label>
          <input
            type="text"
            placeholder="Enter your name werey!"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="address-label">Address</label>
          <input
            type="text"
            placeholder="Enter your Address werey!"
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="city-label">City</label>
          <input
            type="text"
            placeholder="Enter City"
            id="city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="name-label">PostalCode</label>
          <input
            type="text"
            placeholder="Postalcode"
            id="postalcode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div className="row">
          <label className="name-label">country</label>
          <input
            type="text"
            placeholder="country"
            id="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>
        <div>
          <label />
          <button className="continue-btn" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
