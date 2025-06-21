import React from "react";

const Select = ({ name, options = [], onChangeSomething, classname = "" }) => {
  return (
    <select
      name={name}
      id={name}
      className={`${classname} px-2 py-1 border text-sm  border-gray-300 rounded-md bg-white  focus:outline-none cursor-pointer`}
      defaultValue={options[0]}
      onChange={(e) => onChangeSomething(e.target.value)}
    >
      {options.map((option, i) => (
        <option
          key={i}
          value={option}
          className="text-zinc-800 font-semibold text-sm "
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
