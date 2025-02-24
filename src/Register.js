import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { FormControl, InputLabel, useMediaQuery } from "@mui/material";
import DropBox from "./components/DropBox/DropBox";

import PasswordPolicyForm from "./PasswordPolicyForm";
import {
  Cancel,
  FeaturedPlayList,
  PermContactCalendar,
  PersonAdd,
  VerifiedUser,
  VerifiedUserRounded,
} from "@material-ui/icons";
import { Summarize } from "@mui/icons-material";
import Summary from "./Summary";
import { useDispatch, useSelector } from "react-redux";
import { addStepOne, clearAll, saveProfile } from "./features/profile/Profile.slice";
import AlertBox from "./components/Alert/AlertBox";
import {
  provinceList,
  getDistrictList,
  cityList,
} from "get-srilanka-districts-cities";
import DropBoxWithColor from "./components/DropBox/DropBoxWithColor";
import moment from "moment/moment";
import { useTheme } from "@mui/material";
import API from "./API";

const steps = ["Personal Details", "Profile Details", "Summary"];

const initialState = {
  fullName: "",
  address: "",
  country: "Sri Lanka",
  province: "",
  district: "",
  city: "",
  townArea: "",
  bornPlace: "",
  gender: "Male",
  dob: "",
  nic: "",

  mobile: 0,
  email: "",
  complexion: "fair",
  weight: 0,
  height: 0,
  hairColor: "black",
  eyeColor: "black",
  marriageStatus: "un-married", // "un-married"
  occupation: "",
  whatsapp: 0,
  aboutMe: "",
};

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { stepOne, isSaved, stepTwo , registerError , errorMsg , profilePicture} = useSelector((state) => state.profile);

  const [values, setValues] = useState(stepOne);
  const [dob, setDOB] = useState(stepOne.dob);
  const [provinces, setProvinceList] = useState(
    provinceList()[0].map((x) => ({ text: x, value: x }))
  );
  const [districts, setDistrictList] = useState([]);
  const [cityLists, setCityList] = useState([]);
  const msg =
    "According to Sri Lankan law, the legal age of majority is 18 years. Please note that certain rights and responsibilities may be applicable only to individuals who have reached this age";



    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    

  useEffect(() => {
    if (values.province && values.province !== "") {
      const city = cityList(values.province, values.district).map((y) =>
        y.map((l) => ({
          text: l,
          value: l,
        }))
      );
      console.log(city[0]);
      setCityList(city[0]);
    }
  }, [values.district]);
  useEffect(() => {
    if (values.province && values.province !== "") {
      const distr = getDistrictList(values.province).map((y) =>
        y.map((l) => ({
          text: l,
          value: l,
        }))
      );
      console.log(distr);
      setDistrictList(distr[0]);
    }
  }, [values.province]);

  const dispatch = useDispatch();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0) {
      // values.dob = dob;
      const today = moment();
      const age = today.diff(dob, "years");

      console.log("Age:", age);
      if (age <= 17) return alert(msg);
      // Display the calculated age
      const data = { ...values, dob, age };
      dispatch(addStepOne(data));
    }

    //final steps
    if (activeStep === 2) {

      

      

      if (!stepOne.fullName || stepOne.fullName === "")
        return alert("Full Name Cannot be empty, Please enter full name first");
      if (!stepOne.address || stepOne.address === "")
        return alert("Address Cannot be empty, Please enter address first");
      if (!stepOne.country || stepOne.country === "")
        return alert("Country Cannot be empty, Please enter Country first");
      if (!stepOne.province || stepOne.province === "")
        return alert("Province Cannot be empty, Please enter province first");
      if (!stepOne.district || stepOne.district === "")
        return alert("District Cannot be empty, Please enter District first");
      if (!stepOne.townArea || stepOne.townArea === "")
        return alert("Town/City Cannot be empty, Please enter Town/City first");
      if (!stepOne.bornPlace || stepOne.bornPlace === "")
        return alert(
          "Born Place Cannot be empty, Please enter Born Place first"
        );
      if (!stepOne.nic || stepOne.nic === "")
        return alert("NIC Cannot be empty, Please enter NIC first");
      if (!stepOne.gender || stepOne.gender === "")
        return alert("Gender Cannot be empty, Please enter Gender first");
      if (!stepOne.dob || stepOne.dob === "")
        return alert(
          "Date of Birth Cannot be empty, Please enter Date of Birth first"
        );

      const today = moment();
      const age = today.diff(dob, "years");

      if (age <= 17) return alert(msg);
      if (!stepOne.occupation || stepOne.occupation === "")
        return alert(
          "Occupation Cannot be empty, Please enter Occupation first"
        );
      if (!stepOne.occupationCountry || stepOne.occupationCountry === "")
        return alert(
          "Occupation Country Cannot be empty, Please enter Occupation Country first"
        );
      if (!stepOne.complexion || stepOne.complexion === "")
        return alert(
          "Complexion Cannot be empty, Please enter Complexion first"
        );
      if (!stepOne.hairColor || stepOne.hairColor === "")
        return alert(
          "Hair Color Cannot be empty, Please enter Hair Color first"
        );
      if (!stepOne.eyeColor || stepOne.eyeColor === "")
        return alert("EyeColor Cannot be empty, Please enter EyeColor first");
      if (!stepOne.height || stepOne.height === "")
        return alert("Height Cannot be empty, Please enter Height first");
      if (!stepOne.weight || stepOne.weight === "")
        return alert("Weight Cannot be empty, Please enter Weight first");
      if (!stepOne.marriageStatus || stepOne.marriageStatus === "")
        return alert(
          "Marriage Status Cannot be empty, Please enter Marriage Status first"
        );
      if (!stepOne.aboutMe || stepOne.aboutMe === "")
        return alert("AboutMe Cannot be empty, Please enter AboutMe first");

      //step 2
      if (!stepTwo.confirmPassword || stepTwo.confirmPassword === "")
        return alert("Password is not matched");
      if (!stepTwo.password || stepTwo.password === "")
        return alert("Password Cannot be empty, Please enter Password first");
      if (!stepTwo.mobile || stepTwo.mobile === "")
        return alert("Mobile Cannot be empty, Please enter Mobile first");
      if (!stepTwo.whatsapp || stepTwo.whatsapp === "")
        return alert("Whatsapp Cannot be empty, Please enter Whatsapp first");

        const email = stepTwo.email;
        const mobile = stepTwo.mobile;
        const whatsapp = stepTwo.whatsapp;

       
        let profilePicturesArray = [{
          profilePictureType: "Profile",
          profilePicture :    "https://st2.depositphotos.com/2101611/9885/v/450/depositphotos_98850502-stock-illustration-man-silhouette-icon-with-question.jpg",
        
        }]

        if(profilePicture !==null){
          const formData = new FormData();
          formData.append('image', profilePicture);
          await API.post('/uploadImage', formData ).then(x=> {
  
            profilePicturesArray =   [
              {
                profilePictureType: "Profile",
                profilePicture: x.data
              },
            ];
  
          })
        }

        const save_data =   {
          fullName:stepOne.fullName,
          address:stepOne.address,
          country:stepOne.country,
          province:stepOne.province,
          district:stepOne.district,
          city:stepOne.townArea,
          townArea:stepOne.townArea,
          bornPlace:stepOne.bornPlace,
          dob:stepOne.dob,
          gender:stepOne.gender,
          nic:stepOne.nic,
          age:stepOne.age,
          complexion:stepOne.complexion,
          weight:stepOne.weight,
          height:stepOne.height,
          hairColor:stepOne.hairColor,
          eyeColor:stepOne.eyeColor,
          marriageStatus:stepOne.marriageStatus,
          occupation:stepOne.occupation,
          occupationCountry:stepOne.occupationCountry,

          //step two
          mobile:stepTwo.mobile,
          email:stepTwo.email,
          password:stepTwo.password,
          whatsapp:stepTwo.whatsapp,

          
          //familyDetails:stepOne.familyDetails,
         // educationDetails:stepOne.educationDetails,
          profilePictures:profilePicturesArray,
         // expectations:stepOne.expectations,
         // providings:stepOne.providings,
         // documentPictures:stepOne.documentPictures,
         // dressCodes:stepOne.dressCodes,
          //brokers:stepOne.brokers,
          aboutMe:stepOne.aboutMe,
          contactDetails: [{ mobile }, { email }],
          socialMediaDetails: [{ whatsapp }],
          isWeddingFixed :false,
          profileActivation : true,
        };
        console.log({save_data})
        dispatch(saveProfile(save_data))
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);

    dispatch(clearAll());
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  if (isSaved) {
    return (
      <AlertBox message="Successfully registered for Find Soulmate Matrimonial App! You can now use our mobile app using the provided credentials. The login details have been sent to your email address." />
    );
  }

  if(registerError){
    return (
      <AlertBox message={errorMsg} type="Error" />
    );
  }

 

  return (
    <Box>
      
      <Stepper
        style={{ paddingRight: 60, paddingLeft: 60 }}
        activeStep={activeStep}
        orientation={isSmallScreen ? 'vertical' : 'horizontal'}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {
            style: {
              backgroundImage: "linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)",
              boxShadow: "0 4px 10px 0 rgba(0, 0, 0, .25)",
              borderRadius:20,
              padding:20,
              minHeight:50,
              minWidth:150,
              color:'white'
            },
          };
          
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          let icon = <VerifiedUser />;
          if (index === 1) {
            icon = <PermContactCalendar />;
          } else if (index === 2) {
            icon = <FeaturedPlayList />;
          } else {
            icon = <PersonAdd />;
          }

          let stepsIcon = [
            "Personal Details",
            "Profile Details",
            "Educational Details",
          ];
          return (
            <Step key={label} {...stepProps}>
              <StepLabel icon={icon} {...labelProps}>
              <Typography component={'span'} variant={isSmallScreen ? 'body2' : 'body1'}>
          {label}
        </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && !isSaved ? (
        <React.Fragment>
           <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            width:'100%',
            alignItems:'center',
            padding:120
           }}>
            <img src="https://icon-library.com/images/progress-icon-gif/progress-icon-gif-9.jpg" width={60}/>
            <p>please wait...</p>
           </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>

          {activeStep === 0 && (
            <Box sx={{ mt: 2 }}>
              <Grid   container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Full Name"
                    name={"fullName"}
                    value={values.fullName}
                    onChange={onChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={onChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    onChange={onChange}
                    name="country"
                    value={values.country}
                    labelText={"Country"}
                    items={[{ text: "Sri Lanka", value: "Sri Lanka" }]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    labelText={"Province"}
                    onChange={onChange}
                    name="province"
                    value={values.province}
                    items={provinces}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    labelText={"District"}
                    onChange={onChange}
                    name="district"
                    value={values.district}
                    items={districts}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    labelText={"Town/City"}
                    onChange={onChange}
                    name="townArea"
                    value={values.townArea}
                    items={cityLists}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="Born Place"
                    onChange={onChange}
                    name="bornPlace"
                    value={values.bornPlace}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="NIC"
                    onChange={onChange}
                    name="nic"
                    value={values.nic}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    labelText={"Gender"}
                    onChange={onChange}
                    name="gender"
                    value={values.gender}
                    items={[
                      { text: "Male", value: "Male" },
                      { text: "Female", value: "Female" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="Date of birth"
                      value={dayjs(values.dob)}
                      onChange={(d) => setDOB(d.toISOString())}
                      //onBlur={handleBlur}
                      name="dob"
                      // error={Boolean(touched.dob) && Boolean(errors.dob)}
                      // helperText={touched.dob && errors.dob}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="Occupation"
                    onChange={onChange}
                    name="occupation"
                    value={values.occupation}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="Occupation Country"
                    onChange={onChange}
                    name="occupationCountry"
                    value={values.occupationCountry}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <DropBoxWithColor
                    labelText="Skin Complexion"
                    onChange={onChange}
                    name="complexion"
                    value={values.complexion}
                    items={[
                      { text: "Fair", value: "fair", color: "#fdf4e6" },
                      { text: "Medium", value: "medium", color: "#f7debf" },
                      { text: "Warm", value: "warm", color: "#f6c293" },
                      { text: "Tan", value: "tan", color: "#d69157" },
                      { text: "Dark", value: "dark", color: "#d69157" },
                      { text: "Black", value: "black", color: "#000" },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <DropBoxWithColor
                    labelText="Hair Colour"
                    onChange={onChange}
                    name="hairColor"
                    value={values.hairColor}
                    items={[
                      { text: "White", value: "white", color: "#fff" },
                      { text: "Red", value: "red", color: "#FF0000" },
                      { text: "Blonde", value: "blonde", color: "#faf0be" },
                      { text: "Brown", value: "brown", color: "#964B00" },
                      { text: "Black", value: "black", color: "#000" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBoxWithColor
                    labelText="Eye Colour"
                    onChange={onChange}
                    name="eyeColor"
                    value={values.eyeColor}
                    items={[
                      { text: "Amber", value: "amber", color: "#FFBF00" },
                      { text: "Black", value: "black", color: "#000" },
                      { text: "Blue", value: "blue", color: "#0000FF" },
                      { text: "Brown", value: "brown", color: "#964B00" },
                      { text: "Green", value: "green", color: "#008000" },
                      { text: "Gray", value: "gray", color: "#808080" },
                      { text: "Hazel", value: "hazel", color: "#8A6E3C" },
                      { text: "Violet", value: "violet", color: "#8F00FF" },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="Height in (cm)"
                    onChange={onChange}
                    name="height"
                    type="number"
                    value={values.height}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <TextField
                    label="Weight in (kg)"
                    onChange={onChange}
                    name="weight"
                    type="number"
                    value={values.weight}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <DropBox
                    labelText={"Marriage Status"}
                    onChange={onChange}
                    name="marriageStatus"
                    value={values.marriageStatus}
                    items={[
                      { text: "Un-Married", value: "un-married" },
                      { text: "	Married", value: "married" },
                      { text: "	Divorced", value: "divorce" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="About Me"
                    onChange={onChange}
                    name="aboutMe"
                    value={values.aboutMe}
                    multiline
                    minRows={3}
                    maxRows={6}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 1 && <PasswordPolicyForm />}

          {activeStep === 2 && <Summary />}

          <div style={{ Height: 20 }}>
            <br />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
              margin: "10px",
              right: 60,
            }}
          >
            <Button
              color="primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button variant="contained" color="error" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}
