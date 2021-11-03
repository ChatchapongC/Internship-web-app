import React, { useState } from "react";
import "./SearchBar.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import { filterJob } from "../../api/JobAPI";
import { useHistory } from "react-router-dom";

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const history = useHistory();

  const handleFilter = async (event) => {

    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = await filterJob(searchWord)
      .then(function (response) {
        return response
      })
      .catch(error => {
        return "";
      })


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

  const handleSubmit = () => {

  }
 
  return (
    <div className="wrapper">
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="search keyword"
            onChange={handleFilter} />
          <label htmlFor="" className="icon">

            <FaSearch onClick={handleSubmit} />

          </label>
          {filteredData.length !== 0 && (
            <div className="dropdown-result">
              {filteredData.map((value, key) => {
                return (
                  <div className="result-item"
                    href="#"
                    onClick={() => {
                      history.push(`/job-details/${value.id}`);
                    }} color="inherit" underline="none" target="_blank">
                    <p>{value.title}</p>
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


