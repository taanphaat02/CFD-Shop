import React, { forwardRef } from "react";

const InputM = (
  { label, required, error, renderInput = undefined, name = "", ...restProps },
  ref
) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...restProps, error, ref }) || (
        <input
          ref={ref}
          className={`form-control ${!!error ? "input-error" : ""}`}
          name={name}
          id={name}
          {...restProps}
        />
      )}
      {error && (
        <p className="form-error" style={{ minHeight: 23 }}>
          {error || ""}
        </p>
      )}
    </div>
  );
};

export const Input = forwardRef(InputM);
