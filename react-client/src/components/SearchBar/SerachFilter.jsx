import {
  Paper,
  Stack,
  Chip,
  Autocomplete,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@mui/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { getJobCategory, getJobLocation } from "../../api/JobAPI";
import LoadingIndicator from "../../common/LoadingIndicator";

export default function SearchFilter(props) {
  const [typeOfWork, setTypeOfWork] = useState([]);
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [isFilter, setIsFilter] = useState(false);

  const setJobFilter = props.setJobFilter;
  const jobFilter = props.jobFilter;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    searchBox: {
      padding: 20,
      textAlign: "left",
      flex: "1 0 auto",

      width: 300,
    },
  }));

  const classes = useStyles();

  const changeHandler = (e) => {

    let value = e.target.value;
    if (value == ""){
      value = null;
    }

    setJobFilter({ ...jobFilter, [e.target.name]: value });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };


  return (
    <Paper className={classes.searchBox}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Job Type</FormLabel>
        <RadioGroup
          defaultValue="Internship"
          name="jobType"
        >
          <FormControlLabel
            value="Internship"
            control={<Radio />}
            label="Internship"
            onChange={changeHandler}
          />
          <FormControlLabel
            value="part-time"
            control={<Radio />}
            label="Part-Time"
            onChange={changeHandler}
          />
          <FormControlLabel
            value="Co-op Education"
            control={<Radio />}
            label="Co-op Education"
            onChange={changeHandler}
          />
          
        </RadioGroup>

        <Stack spacing={2} sx={{ width: 255 }}>
          <TextField
            name="jobCategory"
            label="Job categories"
            placeholder="Select Job Category"
            onChange={changeHandler}
          />
        </Stack>

        {/* <Stack spacing={2} sx={{ width: 255 }}>
          <TextField
          
            name="companyName"
            label="Company Name"
            placeholder="Company Name"
            onChange={changeHandler}
          />
        </Stack> */}
        <Stack spacing={2} sx={{ width: 255 }}>
          <TextField
           
            name="location"
            label="Location"
            placeholder="location"
            onChange={changeHandler}
          />
        </Stack>
        {/* <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="BTS/MRT"
          labelPlacement="end"
          onChange={changeHandler}
        /> */}

      </FormControl>
    </Paper>
  );
}

