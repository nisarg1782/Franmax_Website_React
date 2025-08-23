// src/components/Shared/ConnectMeModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "../utils/api";
import "./ConnectMePage.css"; // Keep your merged CSS here

const ConnectMeModal = ({ show, onClose, brandId, productId }) => {
  const id = brandId || productId; // Use whichever ID is passed

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    stateId: "",
    cityId: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch states
  useEffect(() => {
    let active = true;
    setLoadingStates(true);
    axios
      .get(getApiUrl("get-indian-states.php"))
      .then((res) => active && setStates(res.data || []))
      .catch((err) => console.error("Error fetching states:", err))
      .finally(() => active && setLoadingStates(false));
    return () => (active = false);
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!form.stateId) return;
    let active = true;
    setLoadingCities(true);
    axios
      .get(`${getApiUrl("get-cities.php")}?state_id=${form.stateId}`)
      .then((res) => {
        if (active) {
          setCities(res.data || []);
          updateForm("cityId", "");
        }
      })
      .catch((err) => console.error("Error fetching cities:", err))
      .finally(() => active && setLoadingCities(false));
    return () => (active = false);
  }, [form.stateId]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.contact.trim()) newErrors.contact = "Contact is required";
    if (!form.stateId) newErrors.stateId = "State is required";
    if (!form.cityId) newErrors.cityId = "City is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...form, brandId: brandId || null, productId: productId || null };
    console.log("Form Submitted:", payload);

    // axios.post(getApiUrl("submit-form.php"), payload) can be used later

    onClose(); // Close modal after submit
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Connect with Us</h2>
        <form onSubmit={handleSubmit} className="connect-form">
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className={errors.name ? "error-input" : ""}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Contact
            <input
              type="text"
              value={form.contact}
              onChange={(e) => updateForm("contact", e.target.value)}
              className={errors.contact ? "error-input" : ""}
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </label>

          <label>
            State
            <select
              value={form.stateId}
              onChange={(e) => updateForm("stateId", e.target.value)}
              disabled={loadingStates}
              className={errors.stateId ? "error-input" : ""}
            >
              <option value="">Select State</option>
              {loadingStates
                ? <option disabled>Loading...</option>
                : states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            {errors.stateId && <span className="error">{errors.stateId}</span>}
          </label>

          <label>
            City
            <select
              value={form.cityId}
              onChange={(e) => updateForm("cityId", e.target.value)}
              disabled={!form.stateId || loadingCities}
              className={errors.cityId ? "error-input" : ""}
            >
              <option value="">Select City</option>
              {loadingCities
                ? <option disabled>Loading...</option>
                : cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.cityId && <span className="error">{errors.cityId}</span>}
          </label>

          <label>
            Message
            <textarea
              value={form.message}
              onChange={(e) => updateForm("message", e.target.value)}
              className={errors.message ? "error-input" : ""}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </label>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ConnectMeModal;
