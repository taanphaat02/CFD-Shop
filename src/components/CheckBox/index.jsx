import React from "react";

const CheckBox = ({ id, label, checked, onChange }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="custom-control-input"
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
