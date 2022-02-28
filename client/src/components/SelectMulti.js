import React from "react";
import CreatableSelect from "react-select/creatable";

// make same as cleanshot

const SelectMulti = ({
  onChange,
  placeholder,
  selectOptions,
  openMenu,
  name,
}) => {
  const handleChange = (newValue, actionMeta) => {
    onChange(`${name}`, newValue);

    console.group("Value Changed");
    console.log("newValue: ", newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <CreatableSelect
      isMulti
      menuIsOpen={openMenu}
      defaultMenuIsOpen={openMenu}
      onChange={handleChange}
      options={selectOptions}
      placeholder={placeholder}
    />
  );
};

export default SelectMulti;
