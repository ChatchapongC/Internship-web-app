import React, { useState, useEffect } from "react";
import { makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {  TextField } from "@material-ui/core";
import dateFormat from "dateformat";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import DeleteIcon from '@material-ui/icons/Delete';
import { updateCompany, getCompany} from "../../api/CompanyAPI";
import Alert from "react-s-alert";
import LoadingIndicator from "../../common/LoadingIndicator";

const EditCompanyProfile = (props) => {

    const company = props.currentUser.company;
    const [loading, setLoading] = useState(true);
    const [companyUpdateRequest, setCompanyUpdateRequest] = useState({
        companyName: '',
        companyNameTH: '',
        address: '',
        telephoneNumber: '',
        contactEmail: '',
        contactPerson: '',
        typeOfBusiness: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompany();
            setLoading(false);
            setCompanyUpdateRequest(result);
            
        }
        fetchData();
    }, []);

    
    const useStyles = makeStyles((theme) => ({
        buttonbase: {
            margin: theme.spacing(1),
            width: "10%",
        },
        papernoone: {
            backgroundColor: "#d99cfd3d",
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
        },
        link: {
            display: "flex",
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        destyle: {
            margin: "auto",
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
        },
        paper2: {
            padding: theme.spacing(2),
            margin: "auto",
            maxWidth: "76%",
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
        },
        imgs: {
            margin: "auto",
            display: "block",
            maxWidth: "20%",
            maxHeight: "20%",
        },
        Headerpoint1: {
            direction: "rtl",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        radio1: {
            marginLeft: theme.spacing(5),
        },
        content: {
            justifyContent: "center",
            alignItems: "center",

        },
        legend: {
            marginLeft: theme.spacing(1),
        },
        text1: {
            //    marginLeft: theme.spacing(5),
            maxWidth: "100%",
        },
        textBox: {
            margin: theme.spacing(2),
            width: "40%"
        },
        addressBox: {
            margin: theme.spacing(2),
            width: "85%"
        },

    }));

    //Call style by name of class
    const classes = useStyles();

    const changeHandler = e => {
        setCompanyUpdateRequest({ ...companyUpdateRequest, [e.target.name]: e.target.value });
    };
    const handleUpdate = (e) => {
        updateCompany(companyUpdateRequest)
            .then(response => {
                Alert.success("You're successfully update your profile");
                window.location.reload();
            }).catch(error => {
                Alert.error((error && error.message) || ('something went wrong'));
            });
    }

   
    console.log(props.currentUser);

    if(loading){
        return  <LoadingIndicator/>;
    }
    return (
        <>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className={classes.destyle}>
                    <Paper className={classes.papernoone}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                color="inherit"
                                to="/"
                                className={classes.link}
                            >
                                <HomeIcon className={classes.icon} />
                                Home
                            </Link>
                            <Link
                                color="inherit"
                                href="/user/profile/me"
                                className={classes.link}
                            >
                                <WhatshotIcon className={classes.icon} />
                                My Company
                            </Link>
                            <Link
                                color="inherit"
                                href="/user/company/edit"
                                className={classes.link}
                            >
                                <WhatshotIcon className={classes.icon} />
                                Edit My Company
                            </Link>
                        </Breadcrumbs>
                    </Paper>
                    <br></br>
                    <Paper className={classes.paper}>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                {/* Welcom zone */}
                                <Typography gutterBottom variant="subtitle1" component="h2">
                                    Welcome company
                                </Typography>
                            </Grid>
                            <Grid item xs className={classes.Headerpoint1}>
                                <Typography gutterBottom variant="subtitle1" component="h2">
                                    Date-Time
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs>
                                {/* Welcom zone */}
                                <Typography gutterBottom variant="subtitle1" component="h2">
                                    <p>{company.companyName}</p>
                                </Typography>
                            </Grid>
                            <Grid item xs className={classes.Headerpoint1}>
                                <Typography gutterBottom variant="subtitle1" component="h2">
                                    {dateFormat(new Date(), "mmmm dd, yyyy | h:MM TT")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <br></br>

                    <Paper className={classes.paper2}>
                        <Grid container spacing={0}>
                            <Typography gutterBottom variant="h6" component="h2">
                                <b>Edit My Company</b>
                            </Typography>
                        </Grid>
                        <br />
                        <Grid container spacing={0} className={classes.content}>
                            <Grid item xs={6} >
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        id="companyName"
                                        name="companyName"
                                        label="Company name"
                                        defaultValue={company.companyName}
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                                <FormControl required className={classes.textBox}>
                                    <TextField
                                        id="CompanyNameTH"
                                        name="CompanyNameTH"
                                        label="Company name in Thai"
                                        defaultValue={company.companyNameTH}
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl required variant="outlined" className={classes.textBox}>
                                    <InputLabel htmlFor="typeOfBusiness">Type Of Business</InputLabel>
                                    <Select
                                        native
                                        onChange={changeHandler}
                                        name="typeOfBusiness"
                                        label="Type Of Business"
                                        inputProps={{
                                            id: 'typeOfBusiness',
                                        }}

                                    >
                                        <option value={company.typeOfBusiness}>{company.typeOfBusiness}</option>
                                        <option>-Not Specify-</option>
                                        <option>Accounting, bookkeeping and auditing activities; tax consultancy</option>
                                        <option>Advertising activities</option>
                                        <option>Agricultural</option>
                                        <option>Automobile Industry</option>
                                        <option>Chemical / Plastic Industry</option>
                                        <option>Commercial banks</option>
                                        <option>Computer/ IT</option>
                                        <option>Construction of non-residential buildings</option>
                                        <option>Construction of residential buildings</option>
                                        <option>Consulting</option>
                                        <option>Department Store</option>
                                        <option>Design/ Interior Design</option>
                                        <option>Education</option>
                                        <option>Electrical Industry</option>
                                        <option>Electronic Industry</option>
                                        <option>Energy</option>
                                        <option>Entertaining</option>
                                        <option>Finance</option>
                                        <option>Food &amp; Drink Industry</option>
                                        <option>Garment Industry</option>
                                        <option>Government / Non-profit</option>
                                        <option>Hospital activities (except specialized hospital activities)</option>
                                        <option>Hotel/ Resort/ Spa / Golf Club</option>
                                        <option>Import/Export</option>
                                        <option>Insurance</option>
                                        <option>Legal activities</option>
                                        <option>Logistics activities</option>
                                        <option>Manufacture and distributor.</option>
                                        <option>Manufacture of jewellery and bijouterie of precious stones and metals</option>
                                        <option>Medicine / Cosmetic / Medical Equipment</option>
                                        <option>Metals Industry</option>
                                        <option>Online media</option>
                                        <option>Operation of fitness centres</option>
                                        <option>Others</option>
                                        <option>Packaging Industry</option>
                                        <option>Paper Industry</option>
                                        <option>Public relations and communication management consultancy activities</option>
                                        <option>Publishing/ Printing</option>
                                        <option>Real Estate</option>
                                        <option>Recruitment</option>
                                        <option>Research and Development</option>
                                        <option>Retail</option>
                                        <option>Services</option>
                                        <option>Telecommunication</option>
                                        <option>Tour operator activities</option>
                                        <option>Trading/ Commerce</option>
                                        <option>Transportation</option>
                                        <option>Wholesale</option>
                                    </Select>
                                </FormControl>
        
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container spacing={0} className={classes.content}>

                            <Grid item xs={6}>

                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Telephone number"
                                        name="TelephoneNumber"
                                        id="Telephone"
                                        defaultValue={company.telephoneNumber}
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                                <FormControl required variant="outlined" className={classes.textBox}>
                                    <TextField
                                        label="Contact Email"
                                        name="contactEmail"
                                        id="email"
                                        defaultValue={company.contactEmail}
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl required variant="outlined" className={classes.addressBox}>
                                    <TextField
                                        multiline
                                        row={10}
                                        label="Address"
                                        id="address"
                                        name="address"
                                        defaultValue={company.address}
                                        variant="outlined"
                                        onChange={changeHandler}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} className={classes.content}>
                            <Button
                                size="large"
                                className={classes.buttonbase}
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleUpdate}
                            >
                                SAVE
                            </Button>

                            <Button
                                size="large"
                                className={classes.buttonbase}
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    Alert.success("You're successfully update your profile");
                                    window.location.reload();
                                }}
                            >
                                Cancel
                            </Button>

                        </Grid>
                    </Paper>
                    <br></br>
                </div>
            )}
        </>

    );
};
export default EditCompanyProfile;
