import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import {
  updateOneExperience,
  getOneExperience,
} from "../../store/experiences.js";
import "./ExpDetails.css";
import DeleteExperience from "./DeleteExp.js";
import ExpImages from "../images/FirstExpImage.js";
import "./NewExp.css";

const UpdateExp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { expId } = useParams();
  expId = parseInt(expId);

  useEffect(() => {
    dispatch(getOneExperience(expId));
  }, [dispatch]);

  const experience = useSelector((state) => state.experiences.oneExperience);
  // getters and setters for the form
  const presetHours = ["<2", "2-5", "All day"];
  const [lat, setLat] = useState(experience?.lat);
  const [lng, setLng] = useState(experience?.lng);
  const [city, setCity] = useState(experience?.city);
  const [title, setTitle] = useState(experience?.name);
  const [cost, setCost] = useState(experience?.price);
  const [expState, setExpState] = useState(experience?.state);
  const [durationSelect, setDurationSelect] = useState();
  const [address, setAddress] = useState(experience?.address);
  const [country, setCountry] = useState(experience?.country);
  const [validationErrors, setValidationErrors] = useState([]);
  const [estDuration, setEstDuration] = useState(experience?.est_duration);
  const [description, setDescription] = useState(experience?.description);

  const user = useSelector((state) => state.session.user);

  // form validations
  useEffect(() => {
    const errors = [];
    setValidationErrors(errors);
    setValidationErrors(errors);
  }, []);

  // set the user albums
  const updateDuration = (e) => setDurationSelect(e.target.value);

  // helper function for clearing the form
  const revert = () => {
    setTitle("");
    setDescription("");
    setAddress("");
    setCity("");
    setExpState();
    setCountry("");
    setCost();
    setEstDuration();
  };

  // handle submit onClick event
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;
    console.log(durationSelect);

    if (durationSelect === "<2") {
      console.log("<2 hours is true");
      payload = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        city: city,
        name: title,
        state: String(expState),
        price: cost,
        country: country,
        address: address,
        host_id: user.id,
        description: description,
        est_duration: 120,
      };
    }
    if (durationSelect === "2-5") {
      console.log("2-5 hours is true");
      payload = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        city: city,
        name: title,
        state: String(expState),
        price: cost,
        country: country,
        address: address,
        host_id: user.id,
        description: description,
        est_duration: 300,
      };
    }
    if (durationSelect === "All day") {
      console.log("all day hours is true");
      payload = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        city: city,
        name: title,
        state: String(expState),
        price: cost,
        country: country,
        address: address,
        host_id: user.id,
        description: description,
        est_duration: 0,
      };
    }
    console.log(payload);
    revert();
    let exp = await dispatch(updateOneExperience(expId, payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      }
    );
    if (exp) {
      if (validationErrors.length === 0) dispatch(getOneExperience(expId));
      return history.push(`/experiences/${expId}`);
    }
  };

  return (
    <>
      <br></br>
      <br></br>
      <div className="exp-datials">Edit experience details below</div>
      <div className="create-update-exp">
        <br></br>
        <form className="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={expState}
            onChange={(e) => setExpState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <input
            type="float"
            placeholder="Price"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <select
            required={true}
            onChange={updateDuration}
            value={durationSelect}
            placeholder="Estimated duration"
          >
            <option value="" disabled selected>
              Estimated duration (hrs)...
            </option>
            {presetHours.map((hr) => (
              <option key={hr}>{hr}</option>
            ))}
          </select>
          <ul className="errors">
            {validationErrors.length > 0 &&
              validationErrors.map((err) => (
                <div id="err" key={err}>
                  {err}
                </div>
              ))}
          </ul>
          <button
            className=""
            type="submit"
            disabled={!!validationErrors.length}
          >
            Submit
          </button>
        </form>
        <DeleteExperience />
        <div>
          <ExpImages preview={false} />
        </div>
      </div>
    </>
  );
};
export default UpdateExp;
