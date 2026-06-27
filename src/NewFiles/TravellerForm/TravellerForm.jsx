import React, { useState } from "react";
import "./TravellerForm.css";

const TravellerForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    wheelchair: false,
    search: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.firstName)) {
      newErrors.firstName = "Only alphabets are allowed";
    }

    // Last Name
    if (
      formData.lastName &&
      !/^[A-Za-z ]+$/.test(formData.lastName)
    ) {
      newErrors.lastName = "Only alphabets are allowed";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    // Mobile
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Invalid Email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Traveller Details Submitted Successfully!");

      console.log(formData);
    }
  };

  return (
    <div className="traveller-container">

      <h2>Traveller Details</h2>      <div className="traveller-header">
        <span>ADULT (12 yrs+)</span>
        <span>1/1 Added</span>
      </div>

      <div className="adult-box">
        <input type="checkbox" checked readOnly />
        <label>Adult 1</label>
      </div>

      <input
        type="text"
        name="search"
        className="search-box"
        placeholder="Search travellers from My Traveller List"
        value={formData.search}
        onChange={handleChange}
      />

      <div className="warning-box">
        <strong>Important:</strong> If the traveller's passport does not include
        a last name, please leave the Last Name field empty while providing
        traveller details.
      </div>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="input-group">
            <label>First & Middle Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="First & Middle Name"
              value={formData.firstName}
              onChange={handleChange}
            />

            {errors.firstName && (
              <small className="error">
                {errors.firstName}
              </small>
            )}
          </div>

          <div className="input-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />

            {errors.lastName && (
              <small className="error">
                {errors.lastName}
              </small>
            )}
          </div>

        </div>

        <div className="gender-section">

          <label>Gender</label>

          <div className="gender-buttons">

            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>

          </div>

          {errors.gender && (
            <small className="error">
              {errors.gender}
            </small>
          )}

        </div>

        <div className="checkbox">

          <label>

            <input
              type="checkbox"
              name="wheelchair"
              checked={formData.wheelchair}
              onChange={handleChange}
            />

            I require wheelchair assistance (Optional)

          </label>

        </div>

        <hr className="divider" />

        <h2 className="contact-heading">
          Contact Details
        </h2>

        <p className="contact-text">
          The flyer must have access to the mobile number submitted below for
          mandatory travel updates.
        </p>        <div className="contact-row">

          <div className="country-code">
            🇮🇳 +91
          </div>

          <div className="contact-input">

            <label>Flyer's Primary Mobile Number</label>

            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
            />

            {errors.mobile && (
              <small className="error">
                {errors.mobile}
              </small>
            )}

          </div>

          <div className="contact-input">

            <label>Email ID</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small className="error">
                {errors.email}
              </small>
            )}

          </div>

        </div>

        <div className="add-contact">
          + Add another contact
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Continue Booking
        </button>

      </form>

    </div>
  );
};

export default TravellerForm;