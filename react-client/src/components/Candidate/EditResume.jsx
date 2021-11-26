import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { FormControl, TextField, Typography, Grid, Button } from '@material-ui/core';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import {
    updateResume,
    getResume,
    getEducation,
    updateEducation,
    getEducationById,
    createEducation,
    deleteEducation,
    createSkill,
    updateSkill,
    getSkill,
    deleteSkill,
    createExperience,
    updateExperience,
    deleteExperience,
    getExperience,
    createLanguage,
    updateLanguage,
    deleteLanguage,
    getLanguage
}
    from '../../api/CandidateAPI';
import Moment from 'moment';
import Alert from "react-s-alert";
import { InputLabel, Paper, Select, Tooltip, IconButton, Fade, Collapse, Divider, FormHelperText } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineOppositeContent, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

Moment.locale('th');


function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    content: {
        padding: theme.spacing(1),
        margin: 5
    },

    formContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonbase: {
        margin: theme.spacing(1),
    },
    addSkill: {
        marginRight: 100
    },
    

}));


export default function EditResume(props) {
    const classes = useStyles();
    const setChecked = props.setChecked;


    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState([]);
    const [education, setEducation] = useState([]);
    const [expand, setExpand] = useState(false);

    const [resumeRequest, setResumeRequest] = useState({
        shortDescription: '',
        positionTitle: '',
    })


    useEffect(() => {
        const fetchData = async () => {
            const resumeResult = await getResume();
            setResume(resumeResult);
            setResumeRequest(resumeResult);
            setLoading(false);
        }

        fetchData();

    }, []);

    const changeHandler = e => {
        setResumeRequest({ ...resumeRequest, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        updateResume(resumeRequest)
            .then(response => {
                Alert.success("You're successfully update your resume");
                window.location.reload(false);
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }



    if (loading) {
        return (
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect" height={118} />
            </div>
        )
    }
    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <Grid container justifyContent='center'>
                    
                    <FormControl fullWidth >
                    <form onSubmit={handleUpdate}>
                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            POSITION TITLE
                        </Typography>
                        <FormControl required fullWidth variant="outlined" className={classes.textBox}>
                            <TextField
                                id="position"
                                name="positionTitle"
                                label="Position Title"
                                defaultValue={resume.positionTitle}
                                variant="outlined"
                                onChange={changeHandler}
                                required
                            />
                        

                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            PROFILE
                        </Typography>
                        <TextField
                            id="profile"
                            name="shortDescription"
                            label="Profile Description"
                            defaultValue={resume.shortDescription}
                            variant="outlined"
                            onChange={changeHandler}
                            multiline
                            rows={4}
                            required
                        />
                        </FormControl>

                        <br/>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveAltRoundedIcon />}
                            type="submit"
                            className={classes.buttonbase}
                            >
                            UPDATE RESUME
                        </Button>
                        </form>
                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            EDUCATION
                        </Typography>

                        <EducationDetails resume={resume} />

                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            SKILLS
                        </Typography>

                        <SkillForm setChecked={setChecked} />

                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            EXPERIENCE
                        </Typography>

                        <ExperienceForm />

                        <Typography variant="h5" component="div" color="textPrimary" className={classes.content}>
                            LANGUAGE
                        </Typography>

                        <LanguageForm />

                    </FormControl>
                    <br />

                    
                </Grid>


            )}

        </>

    );
}

const EducationDetails = (props) => {

    const resume = props.resume;
    const sortedResume = [...resume.educations].sort((a, b) => a.id < b.id ? 1 : -1)
    const [checked, setChecked] = useState(false);
    const [add, setAdd] = useState(false);

    

    const handleChange = (i) => {
        console.log("change");
        setChecked(checked === i ? -1 : i);
    };

    const handleClickAdd = () => {
        setAdd((prev) => !prev)
    }

    const handleDelete = (id) => {
        deleteEducation(id)
            .then(response => {
                Alert.success("You're successfully delete");
                window.location.reload(false);
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }

    return (
        <>
            <Timeline>
                {sortedResume.map((e, index) => {
                    return (
                        <>
                            <TimelineItem>
                                <TimelineOppositeContent style={{ flex: 0.4 }}>
                                    <Typography key={index} variant='body2' color='textSecondary'>
                                        {Moment(e.fromDate).format('MMMM DD,yyyy')} - {Moment(e.toDate).format('MMMM DD,yyyy')}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    {e.institute}
                                    <Typography variant='body2' color='textSecondary'>
                                        {e.curriculum} - GPA : {e.gpa}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {e.description}
                                    </Typography>
                                </TimelineContent>
                                <Tooltip arrow title="Edit" placement="top">
                                    <IconButton
                                        style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                        onClick={() => handleChange(e)}
                                        aria-expanded={checked === e}
                                    >
                                        <EditRoundedIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip arrow title="Delete" placement="top">
                                    <IconButton
                                        style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                        onClick={() => handleDelete(e.id)}
                                        aria-expanded={checked === e}
                                    >
                                        <DeleteRoundedIcon />
                                    </IconButton>
                                </Tooltip>

                            </TimelineItem>
                            <Collapse in={checked === e}>
                                <EducationForm educationId={e.id} setChecked={setChecked} index={index}/>
                            </Collapse>
                        </>
                    )
                })}

            </Timeline>
            <Grid container justifyContent='flex-end'>
                <Tooltip arrow title="Add Education" placement="top">
                    <IconButton
                        style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                        onClick={handleClickAdd}
                    >
                        <AddCircleRoundedIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Collapse in={add}>
                <EducationForm setChecked={setChecked} />
            </Collapse>
        </>
    )
}

function EducationForm(props) {

    const id = props.educationId;
    const classes = useStyles();
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const forceUpdate = useForceUpdate();
    const index = props.index;
    const [educationLevelError, setEducationLevelError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [instituteError, setInstituteError] = useState(false);
    const [curriculumError, setCurriculumError] = useState(false);
    const [gpaError, setGpaError] = useState(false);

    const [educationRequest, setEducationRequest] = useState({
        educationLevel: '',
        fromDate: '',
        toDate: '',
        institute: '',
        curriculum: '',
        gpa: '',
        description: ''

    })


    const changeHandler = e => {
        if(e.target.name === "educationLevel"){
            if(e.target.value === ""){
                setEducationLevelError(true);
            }
            else{
                setEducationLevelError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        else if(e.target.name === "fromDate"){
            if(e.target.value === ""){
                setFromDateError(true);
            }
            else{
                setFromDateError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        else if (e.target.name === "toDate"){
            if(e.target.value === ""){
                setToDateError(true);
            }
            else{
                setToDateError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        else if (e.target.name === "institute"){
            if(e.target.value === ""){
                setInstituteError(true);
            }
            else{
                setInstituteError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        else if (e.target.name === "curriculum"){
            if(e.target.value === ""){
                setCurriculumError(true);
            }
            else{
                setCurriculumError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        else if (e.target.name === "gpa"){
            if(e.target.value === ""){
                setGpaError(true);
            }
            else{
                setGpaError(false);
                setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });
            }
        }
        setEducationRequest({ ...educationRequest, [e.target.name]: e.target.value });       
    };

    const dateChangeHandler = (e) => {
        let newArr = [{...educationRequest}];
        setEducationRequest({
            ...educationRequest, "fromDate" : e
        })
        console.log(educationRequest.fromDate)
        // newArr[index] = e.target.value;
        // setEducationRequest(newArr);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
      

        if(educationLevelError || educationRequest.educationLevel == ""){
            setEducationLevelError(true);
        }

        else if(fromDateError || educationRequest.fromDate == ""){
            setFromDateError(true);
        }

        else if(toDateError || educationRequest.toDate == ""){
            setToDateError(true);
        }

        else if(instituteError || educationRequest.institute == ""){
            setInstituteError(true);
        }

        else if(curriculumError || educationRequest.curriculum == ""){
            setCurriculumError(true);
        }

        else if(gpaError || educationRequest.gpa == ""){
            setGpaError(true);
        }
        else {

            props.setChecked(false);
            updateEducation(educationRequest, id)
                .then(response => {
                    Alert.success("You're successfully update your education");
                    window.location.reload(false);
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });

        }

       
    }

    const handleCreate = (e) => {
        
        if(educationLevelError || educationRequest.educationLevel == ""){
            setEducationLevelError(true);
        }

        else if(fromDateError || educationRequest.fromDate == ""){
            setFromDateError(true);
        }

        else if(toDateError || educationRequest.toDate == ""){
            setToDateError(true);
        }

        else if(instituteError || educationRequest.institute == ""){
            setInstituteError(true);
        }

        else if(curriculumError || educationRequest.curriculum == ""){
            setCurriculumError(true);
        }

        else if(gpaError || educationRequest.gpa == ""){
            setGpaError(true);
        }
        else {
            props.setChecked(false);
            createEducation(educationRequest)
                .then(response => {
                    Alert.success("You're successfully create new education");
                    window.location.reload();
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }   
      
    }

    const fetchData = async () => {
        const educationResult = await getEducationById(id);
        setEducation(educationResult);
        setEducationRequest(educationResult);
        setLoading(false);
    }
   

    useEffect(() => {
        if (id) {
            fetchData();
        }

    }, []);

    useEffect(() => {
        if (!id) {
            setLoading(false);
        }
    }, []);


    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <>
                    <FormControl fullWidth required>
                        <Grid container spacing={1} className={classes.formContent}>
                            <Grid item xs={6}>
                                <FormControl required className={classes.textBox}>
                                    <InputLabel required htmlFor="outlined-educationLevel">Education Level</InputLabel>
                                    <Select
                                        native
                                        onChange={changeHandler}
                                        name="educationLevel"
                                        label="Education Level"
                                        inputProps={{
                                            id: 'outlined-educationLevel',
                                        }}
                                        error = {educationLevelError}
                                    >
                                        {education && (
                                            <option value={education.educationLevel}>{education.educationLevel}</option>
                                        )}
                                        <option>-Not Specify-</option>
                                        <option>Senior High School Under</option>
                                        <option>Senior High School</option>
                                        <option>Vocational</option>
                                        <option>High Vocational</option>
                                        <option>Bachelor's Degree</option>
                                        <option>Master's Degree</option>
                                        <option>Doctor's Degree</option>
                                    </Select>
                                    {educationLevelError && (
                                        <FormHelperText error> Please select this field </FormHelperText>
                                    )}
                                </FormControl>
                                <br/>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                <TextField
                                    fullWidth
                                    id="institute"
                                    name="institute"
                                    label="Institute"
                                    defaultValue={
                                        education && (
                                            education.institute
                                        )
                                    }
                                    variant="outlined"
                                    onChange={changeHandler}
                                    required
                                    hidden
                                    error = {instituteError}
                                    helperText = {instituteError ? "Please input this field" : ""}
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        format="dd-mm-yy"
                                        name="fromDate"
                                        id="fromDate"
                                        label="From date"
                                        variant="outlined"
                                        type="date"
                                        defaultValue={
                                            education && (
                                                education.fromDate
                                            )
                                        }
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={changeHandler}
                                        required
                                        error = {fromDateError}
                                        helperText = {fromDateError ? "Please select the date" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        format="dd-mm-yy"
                                        name="toDate"
                                        id="toDate"
                                        label="To date"
                                        variant="outlined"
                                        type="date"
                                        defaultValue={
                                            education && (
                                                education.toDate
                                            )
                                        }
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={changeHandler}
                                        required
                                        error = {toDateError}
                                        helperText = {toDateError ? "Please select the date" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        fullWidth
                                        id="curriculum"
                                        name="curriculum"
                                        label="Curriculum"
                                        defaultValue={
                                            education && (
                                                education.curriculum
                                            )
                                        }
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                        error = {curriculumError}
                                        helperText = {curriculumError ? "Please input this field" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        id="gpa"
                                        name="gpa"
                                        label="GPA"
                                        defaultValue={
                                            education && (
                                                education.gpa
                                            )
                                        }
                                        type="number"
                                        inputProps={{step: "0.01", lang:"en-US"}}
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                        error = {gpaError}
                                        helperText = {gpaError ? "Please input this field" : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox} fullWidth>
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        fullWidth
                                        defaultValue={
                                            education && (
                                                education.description
                                            )
                                        }
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <br/>
                    
                        <Grid container justifyContent='flex-end'>
                            {id ? (
                                <Button
                                    size="medium"
                                    className={classes.buttonbase}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveAltRoundedIcon />}
                                    onClick={handleUpdate}
                                >
                                    UPDATE
                                </Button>

                            ) : (
                                <Button
                                    size="medium"
                                    className={classes.buttonbase}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveAltRoundedIcon />}
                                    onClick={handleCreate}
                                >
                                    SAVE
                                </Button>


                            )}

                        </Grid>
                    </FormControl >
                </>
            )}
        </>
    )

}

function SkillForm(props) {

    const classes = useStyles();
    const [skill, setSkill] = useState([]);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);
    const [skillError, setSkillError] = useState(false);

    const setChecked = props.setChecked;

    const [skillRequest, setSkillRequest] = useState({
        skillName: "",
    })

    const changeHandler = (e) => {
        if(e.target.value === ""){
            setSkillError(true);
        }
        else{
            setSkillError(false);
            setSkillRequest({ ...skillRequest, [e.target.name]: e.target.value });
        }
        
    };

    const handleClickAdd = () => {
        setAdd((prev) => !prev)
    }

    const handleCreate = (e) => {
        if(skillError || skillRequest.skillName === "" || skillRequest.skillName === undefined){
            setSkillError(true);
        }
        else{
            setAdd(false);
            createSkill(skillRequest)
            .then(response => {
                Alert.success("You're successfully create new skill");
                window.location.reload();
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
        }
        
    }

    const handleUpdate = (e) => {
        if(skillError || skillRequest.skillName === "" || skillRequest.skillName === undefined){
            setSkillError(true);
        }
        else{
            setAdd(false);
            updateSkill(skillRequest, e.id)
                .then(response => {
                    Alert.success("You're successfully update your skill");
                    window.location.reload(false);
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }
    }

    const handleDelete = (e) => {
        deleteSkill(e.id)
            .then(response => {
                Alert.success("You're successfully delete");
                window.location.reload(false);
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }



    useEffect(() => {
        const fetchData = async () => {
            const skillResult = await getSkill();
            setSkill(skillResult);
            setSkillRequest(skillResult);
            setLoading(false);
        }
        fetchData();


    }, []);

    const skills = skill.map((s) => s);

    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <>
                    {skills.map((s, index) => {
                        return (
                                <FormControl fullWidth required >                                                                                                                                       
                                    <Grid container spacing={1} className={classes.formContent}>
                                        <>
                                            <Grid item xs={6} key={index}>
                                                <TextField
                                                    fullWidth
                                                    id="skill"
                                                    name="skillName"
                                                    label="Type Of Skill"
                                                    defaultValue={s.skillName}
                                                    variant="outlined"
                                                    onChange={changeHandler}
                                                    error = {skillError}
                                                    helperText = {skillError ? "Please input this field" : ""}
                                                />
                                            </Grid>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<SaveAltRoundedIcon />}
                                                onClick={() => handleUpdate(s)}
                                            >
                                                UPDATE
                                            </Button>
                                            <Tooltip arrow title="Delete" placement="top">
                                                <IconButton
                                                    style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                                    onClick={() => handleDelete(s)}
                                                >
                                                    <DeleteRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>

                                    </Grid>
                                    <br />
                                </FormControl >
                                                                                                                                                                                         
                        )
                    })}

                    <Grid container justifyContent='flex-end'>
                        <Tooltip arrow title="Add Skill" placement="top">
                            <IconButton
                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={handleClickAdd}

                            >
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Collapse in={add}>
                        
                        <FormControl fullWidth required>
                            <Grid container spacing={1} className={classes.formContent}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="skill"
                                        name="skillName"
                                        label="Type Of Skill"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                        error={skillError}
                                        helperText={skillError ? "Please fill the skill name" : ""}
                                    />
                                </Grid>

                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveAltRoundedIcon />}
                                    onClick={handleCreate}
                                >
                                    SAVE
                                </Button>
                            </Grid>
                            <br />
                        </FormControl >
                        
                    </Collapse>


                </>
            )}
        </>
    )
}

function ExperienceForm(props) {

    const classes = useStyles();
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);

    const [companyNameError, setCompanyNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [typeOfWorkError, setTypeOfWorkError] = useState(false);

    const [experienceRequest, setExperienceRequest] = useState({
        companyName:'',
        fromDate: '',
        toDate: '',
        description: '',
        typeOfWork: ''
    })

    const changeHandler = e => {

        if(e.target.name === "companyName"){
            if(e.target.value === ""){
                setCompanyNameError(true);
            }
            else{
                setCompanyNameError(false);
                setExperienceRequest({ ...experienceRequest, [e.target.name]: e.target.value });
            }
        }
        else if(e.target.name === "fromDate"){
            if(e.target.value === ""){
                setFromDateError(true);
            }
            else{
                setFromDateError(false);
                setExperienceRequest({ ...experienceRequest, [e.target.name]: e.target.value });
            }
        }
        else if(e.target.name === "toDate"){
            if(e.target.value === ""){
                setToDateError(true);
            }
            else{
                setToDateError(false);
                setExperienceRequest({ ...experienceRequest, [e.target.name]: e.target.value });
            }
        }
        else if(e.target.name === "typeOfWork"){
            if(e.target.value === ""){
                setTypeOfWorkError(true);
            }
            else{
                setTypeOfWorkError(false);
                setExperienceRequest({ ...experienceRequest, [e.target.name]: e.target.value });
            }
        }
        setExperienceRequest({ ...experienceRequest, [e.target.name]: e.target.value });
    };

    const handleClickAdd = () => {
        setAdd((prev) => !prev)
    }

    const handleCreate = (e) => {

        if (companyNameError || experienceRequest.companyName == "" || experienceRequest.companyName === undefined){
            setCompanyNameError(true);
        }
        else if (fromDateError || experienceRequest.fromDate == "" || experienceRequest.fromDate === undefined){
            setFromDateError(true);
        }
        else if (toDateError || experienceRequest.toDate == "" || experienceRequest.toDate === undefined){
            setToDateError(true);
        }
        else if (typeOfWorkError || experienceRequest.typeOfWork == "" || experienceRequest.typeOfWork === undefined){
            setTypeOfWorkError(true);
        }
        else {
            setAdd(false);
            createExperience(experienceRequest)
            .then(response => {
                Alert.success("You're successfully create new experience");
                window.location.reload();
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });

        }  
    }

    const handleUpdate = (e) => {

        if (companyNameError || experienceRequest.companyName == "" || experienceRequest.companyName === undefined){
            setCompanyNameError(true);
        }
        else if (fromDateError || experienceRequest.fromDate == "" || experienceRequest.fromDate === undefined){
            setFromDateError(true);
        }
        else if (toDateError || experienceRequest.toDate == "" || experienceRequest.toDate === undefined){
            setToDateError(true);
        }
        else if (typeOfWorkError || experienceRequest.typeOfWork == "" || experienceRequest.typeOfWork === undefined){
            setTypeOfWorkError(true);
        }
        else {
            setAdd(false);
            updateExperience(experienceRequest, e.id)
                .then(response => {
                    Alert.success("You're successfully update your experience");
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }
       
    }

    const handleDelete = (e) => {
        deleteExperience(e.id)
            .then(response => {
                Alert.success("You're successfully delete");
                window.location.reload();
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }



    useEffect(() => {
        const fetchData = async () => {
            const experienceResult = await getExperience();
            setExperience(experienceResult);
            setExperienceRequest(experienceResult);
            setLoading(false);
        }
        fetchData();
    }, []);

    



    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <>
                    {experience.map((e, index) => {
                        return (
                            <FormControl fullWidth required >
                                <Grid container spacing={1} className={classes.formContent}>

                                    <Grid item xs={6} key={index}>
                                        <FormControl required className={classes.textBox}>
                                            <TextField
                                                fullWidth
                                                id="companyName"
                                                name="companyName"
                                                label="Organization Name"
                                                defaultValue={e.companyName}
                                                variant="outlined"
                                                onChange={changeHandler}
                                                required
                                                error={companyNameError}
                                                helperText={companyNameError ? "Please input this field" : ""}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                    <FormControl required className={classes.textBox}>
                                    <InputLabel required htmlFor="outlined-educationLevel">Type Of Work</InputLabel>
                                        <Select
                                            native
                                            onChange={changeHandler}
                                            name="typeOfWork"
                                            label="Type Of Work"
                                            defaultValue={e.typeOfWork}
                                            inputProps={{
                                                id: 'gender-required',
                                            }}
                                            required
                                            error={typeOfWorkError}

                                        >
                                            <option value={e.typeOfWork}>{e.typeOfWork}</option>
                                            <option>Internship</option>
                                            <option >Co-op Education</option>
                                            <option >Part-Time</option>
                                            <option>Full-Time</option>
                                        </Select>
                                        {typeOfWorkError && (
                                            <FormHelperText error> Please select this field </FormHelperText>
                                        )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <FormControl required className={classes.textBox}>
                                        <TextField
                                            format="dd-mm-yy"
                                            name="fromDate"
                                            id="formDate"
                                            label="From date"
                                            variant="outlined"
                                            type="date"
                                            defaultValue={e.fromDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={changeHandler}
                                            required
                                            error={fromDateError}
                                            helperText={fromDateError ? "Please select this field" : ""}

                                        />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} >
                                    <FormControl required className={classes.textBox}>
                                        <TextField
                                            format="dd-mm-yy"
                                            name="toDate"
                                            id="toDate"
                                            label="To date"
                                            variant="outlined"
                                            type="date"
                                            defaultValue={e.toDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={changeHandler}
                                            required
                                            error={toDateError}
                                            helperText={toDateError ? "Please select this field" : ""}
                                        />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} key={index}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            name="description"
                                            label="Description"
                                            defaultValue={e.description}
                                            variant="outlined"
                                            onChange={changeHandler}
                                        />
                                    </Grid>

                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveAltRoundedIcon />}
                                        onClick={() => handleUpdate(e)}
                                    >
                                        UPDATE
                                    </Button>
                                    <Tooltip arrow title="Delete" placement="top">
                                        <IconButton
                                            style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                            onClick={() => handleDelete(e)}
                                        >
                                            <DeleteRoundedIcon />
                                        </IconButton>
                                    </Tooltip>

                                </Grid>
                                <br />
                            </FormControl >
                        )
                    })}

                    <Grid container justifyContent='flex-end'>
                        <Tooltip arrow title="Add Experience" placement="top">
                            <IconButton
                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={handleClickAdd}

                            >
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Collapse in={add}>
                        <FormControl fullWidth required >
                            <Grid container spacing={1} className={classes.formContent}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="companyName"
                                        name="companyName"
                                        label="Organization Name"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        required
                                        error={companyNameError}
                                        helperText={companyNameError ? "Please input this field" : ""}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required variant="outlined" className={classes.textBox}>

                                        <Select
                                            native
                                            onChange={changeHandler}
                                            name="typeOfWork"
                                            label="Type Of Work"

                                            inputProps={{
                                                id: 'gender-required',
                                            }}
                                            required
                                            error = {typeOfWorkError}
                                        >
                                            <option> -- Type of Work -- </option>
                                            <option>Internship</option>
                                            <option >Co-op Education</option>
                                            <option >Part-Time</option>
                                            <option>Full-Time</option>
                                        </Select>
                                        {typeOfWorkError && (
                                            <FormHelperText error> Please select this field </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} >
                                    <FormControl required className={classes.textBox}>
                                        <TextField
                                            format="dd-mm-yy"
                                            name="fromDate"
                                            id="fromDate"
                                            label="From date"
                                            variant="outlined"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={changeHandler}
                                            required
                                            error={fromDateError}
                                            helperText={fromDateError ? "Please select this field" : ""}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} >
                                    <FormControl required className={classes.textBox}>
                                        <TextField
                                            format="dd-mm-yy"
                                            name="toDate"
                                            id="birthDate"
                                            label="To date"
                                            variant="outlined"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={changeHandler}
                                            required
                                            error={toDateError}
                                            helperText={toDateError ? "Please select this field" : ""}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Description"
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </Grid>
                                <br />

                            </Grid>
                            <br />
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveAltRoundedIcon />}
                                onClick={handleCreate}
                            >
                                SAVE
                            </Button>
                            <br />
                        </FormControl >
                    </Collapse>


                </>
            )
            }
        </>
    )

}

function LanguageForm(props) {
    const classes = useStyles();
    const [language, setLanguage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);

    const [languageNameError, setLanguageNameError] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [languageRequest, setLanguageRequest] = useState({
        languageName: '',
        level: ''
    })

    const changeHandler = (e) => {
        if (e.target.name === "languageName"){
            if(e.target.value === ""){
                setLanguageNameError(true);
            }
            else{
                setLanguageNameError(false);
                setLanguageRequest({ ...languageRequest, [e.target.name]: e.target.value });
            }
        }
        else if (e.target.name == "level"){
            if(e.target.value === ""){
                setLevelError(true);
            }
            else {
                setLanguageRequest({ ...languageRequest, [e.target.name]: e.target.value });
            }
        }
        setLanguageRequest({ ...languageRequest, [e.target.name]: e.target.value });
    };

    const handleClickAdd = () => {
        setAdd((prev) => !prev)
    }

    const handleCreate = (e) => {

        if(languageRequest.languageName == "" || languageNameError || languageRequest.languageName === undefined){
            setLanguageNameError(true);
        }

        else if (languageRequest.level == "" || levelError || languageRequest.level === undefined){
            setLevelError(true);
        }
        else {
            setAdd(false);
            createLanguage(languageRequest)
                .then(response => {
                    Alert.success("You're successfully create new language");
                    window.location.reload();
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }
    }

    const handleUpdate = (e) => {
        if(languageRequest.languageName == "" || languageNameError){
            setLanguageNameError(true);
        }

        else if (languageRequest.level == "" || levelError){
            setLevelError(true);
        }
        else {
            setAdd(false);
            updateLanguage(languageRequest, e.id)
                .then(response => {
                    Alert.success("You're successfully update your language");
                    window.location.reload(false);
                }).catch(error => {
                    Alert.error((error && error.message) || ('something went wrong'));
                });
        }
    }

    const handleDelete = (e) => {
        deleteLanguage(e.id)
            .then(response => {
                Alert.success("You're successfully delete");
                window.location.reload(false);
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }



    useEffect(() => {
        const fetchData = async () => {
            const languageResult = await getLanguage();
            setLanguage(languageResult);
            setLanguageRequest(languageResult);
            setLoading(false);
        }
        fetchData();

    }, []);

    const languages = language.map((s) => s);

    if (loading) {
        return (
            <div>
                <Skeleton variant="text" />
                <Skeleton variant="rect" height={118} />
            </div>
        )
    }

    return (
        <>
            {loading ? (
                <div>
                    <Skeleton variant="text" />
                    <Skeleton variant="rect" height={118} />
                </div>
            ) : (
                <>
                    {language.map((l, index) => {
                        return (
                        
                            <FormControl fullWidth required key={l} >
                                <Grid container spacing={1} className={classes.formContent} >
                                    <>
                                        <Grid item xs={6} >
                                            <TextField
                                                fullWidth
                                                id="language"
                                                name="languageName"
                                                label="Language"
                                                defaultValue={l.languageName}
                                                variant="outlined"
                                                onChange={changeHandler}
                                                error={languageNameError}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl required variant="outlined" className={classes.textBox}>

                                                <Select
                                                    native
                                                    onChange={changeHandler}
                                                    name="level"
                                                    label="Level"
                                                    defaultValue={l.level}
                                                    inputProps={{
                                                        id: 'level-required',
                                                    }}
                                                    error={levelError}
                                                    required

                                                >
                                                    <option value={l.level}>{l.level}</option>
                                                    <option>Elementary proficiency</option>
                                                    <option >Limited / professional working proficiency</option>
                                                    <option >Native or bilingual</option>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveAltRoundedIcon />}
                                            onClick={() => handleUpdate(l)}
                                        >
                                            UPDATE
                                        </Button>
                                        <Tooltip arrow title="Delete" placement="top">
                                            <IconButton
                                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                                onClick={() => handleDelete(l)}
                                            >
                                                <DeleteRoundedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>

                                </Grid>
                                <br />
                            </FormControl >
                        )
                    })}

                    <Grid container justifyContent='flex-end'>
                        <Tooltip arrow title="Add Language" placement="top">
                            <IconButton
                                style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={handleClickAdd}

                            >
                                <AddCircleRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Collapse in={add}>
                        <FormControl fullWidth required >
                            <Grid container spacing={1} className={classes.formContent}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="language"
                                        name="languageName"
                                        label="Language"
                                        variant="outlined"
                                        onChange={changeHandler}
                                        error = {languageNameError}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl required variant="outlined" className={classes.textBox}>

                                        <Select
                                            native
                                            onChange={changeHandler}
                                            name="level"
                                            label="Level"
                                            error = {levelError}
                                            required
                                            inputProps={{
                                                id: 'level',
                                            }}

                                        >
                                            <option >-- Level --</option>
                                            <option>Elementary proficiency</option>
                                            <option >Limited / professional working proficiency</option>
                                            <option >Native or bilingual</option>

                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Button
                                    size="small"

                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveAltRoundedIcon />}
                                    onClick={handleCreate}
                                >
                                    SAVE
                                </Button>
                            </Grid>
                            <br />
                        </FormControl >
                    </Collapse>


                </>
            )}
        </>
    )
}