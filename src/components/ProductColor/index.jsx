import React, { forwardRef, useImperativeHandle, useState } from "react";

const ProductColor = ({ colors, defaultColor, onChange }, ref) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useImperativeHandle(ref, () => {
    return {
      value: selectedColor,
      reset: () => {
        setSelectedColor(defaultColor);
      },
    };
  });

  const _onColorChange = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color);
    onChange?.(color);
  };

  return (
    <div className="product-nav product-nav-dots">
      {colors?.map((color, index) => (
        <div
          key={index}
          onClick={(e) => _onColorChange(e, color)}
          className={`product-nav-item  ${
            selectedColor === color ? "active" : ""
          }`}
          // className={cn("product-nav-item", {
          //   active: selectedColor === color,
          // })}

          style={{
            background: `${color}`,
            // background: `#862269`,
          }}
          // style={{ background: "#FF0000" }}
        >
          <span className="sr-only">{color}</span>
        </div>
      ))}
    </div>
  );
};

export default forwardRef(ProductColor);
