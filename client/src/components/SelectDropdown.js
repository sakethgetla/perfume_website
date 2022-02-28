import React from "react";
import CreatableSelect from "react-select/creatable";

const SelectMulti = ({
  onChange,
  placeholder,
  selectOptions,
  openMenu,
  name,
  isMulti,
  indexOfNote,
}) => {
  const loadDefaultValue = indexOfNote > -1 ? true : false;
  console.log("selectOptions: ", selectOptions);
  console.log("indexOfNote: ", indexOfNote);

  const handleChange = (newValue, actionMeta) => {
    onChange(`${name}`, newValue);

    console.group("Value Changed");
    console.log("newValue: ", newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <CreatableSelect
      isMulti={isMulti ? true : false}
      menuIsOpen={openMenu}
      defaultValue={loadDefaultValue && selectOptions[indexOfNote]}
      placeholder={placeholder}
      defaultMenuIsOpen={openMenu}
      onChange={handleChange}
      options={selectOptions}
      styles={{ color: "black" }}
    />
  );
};

export default SelectMulti;
