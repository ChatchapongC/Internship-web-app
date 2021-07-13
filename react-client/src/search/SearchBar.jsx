import React, { useState } from "react";
import "./SearchBar.scss";
import { FaSearch,  FaTimes } from "react-icons/fa";
import { Chip, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleInput = () => {

  }

  return (
    <div className="wrapper">
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="search keyword"
            value={wordEntered} onChange={handleFilter}/>
          <label htmlFor="" className="icon">
            {wordEntered? (
              <FaTimes id="clearBtn" onClick={clearInput} />
            ):(
              <FaSearch/>
            )}
          </label> 
        {filteredData.length != 0 && (
          <div className="dropdown-result">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div className="result-item" href={value.link} target="_blank">
                  <p>{value.country}</p>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
      {/* <div className="search-filter">
        <Autocomplete 
          multiple 
          id="tags-outlined" 
          options={data}
          getOptionLabel={(option) => option.title}
          defaultValue={[data[13]]}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="search filter"
              label="TODO : add CSS"
            />
          )}
        />
      </div> */}
    </div>
  );
}
export default SearchBar;


  