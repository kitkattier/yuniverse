import React from "react";

/**
 * SearchBar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.width - The width of the search bar.
 * @param {string} [props.placeholder="Search for events or clubs"] - The placeholder text for the search bar.
 * @param {Function} props.onSearch - The callback function to be called when the search input changes.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
function SearchBar({
  width,
  placeholder = "Search for events or clubs",
  onSearch,
}) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <label
      className={`input input-bordered rounded-full flex items-center hover:w-96 w-64 ${width} duration-100 gap-2`}
    >
      <input
        type="text"
        className="grow"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}

export default SearchBar;
