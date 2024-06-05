import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";

const InputNumberStyle = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

const QuantityInput = (
  {
    className,
    defaultValue,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaultValue ?? 1);

  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => setCurrentQuantity(defaultValue ?? 1),
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  const modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  const _onInputChange = (e) => {
    // const value = modifyValue(Number(e.target.value));

    setCurrentQuantity(
      e.target.value !== "" ? modifyValue(Number(e.target.value)) : ""
    );
  };

  const _onInputBlur = () => {
    if (currentQuantity === "") {
      setCurrentQuantity(defaultValue);
    }
  };

  const _onIncrease = () =>
    setCurrentQuantity(modifyValue(Number(currentQuantity) + Number(step)));

  const _onDecrease = () =>
    setCurrentQuantity(modifyValue(Number(currentQuantity) - Number(step)));

  return (
    <div className={className}>
      <div className="input-group input-spinner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            onClick={_onDecrease}
          >
            <i className="icon-minus" />
          </button>
        </div>
        <InputNumberStyle
          type="number"
          className="form-control"
          style={{ textAlign: "center" }}
          value={currentQuantity}
          onChange={_onInputChange}
          onBlur={_onInputBlur}
          max={max}
          min={min}
          {...inputProps}
        />
        <div className="input-group-append">
          <button
            className="btn btn-increment btn-spinner"
            style={{ minWidth: 26 }}
            type="button"
            onClick={_onIncrease}
            disabled={currentQuantity >= max}
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantityInput);
