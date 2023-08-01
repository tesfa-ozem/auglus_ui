import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/http';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

type Inputs = {
  email: string;
  password: string;
  user_name: string;
};
const SignUpForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: '2rem',
}));
const SignUpPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkill] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [newItem, setNewItem] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedSkill(value);
  };

  const handleAddSkill = () => {
    setIsAddingNewSkill(true);
  };

  const handleNewSkillInputChange = (event) => {
    const value = event.target.value;
    setNewSkill(value);

    // Enable "Add New Skill" button if the new skill input is not empty
    setIsAddingNewSkill(value.trim().length > 0);
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const createUser = async (d: Inputs) => {
    try {
      const variables = {
        email: d.email,
        password: d.password,
        user_name: d.user_name,
      };
      const response = await axiosInstance.post('/api/v1/users', variables);

      setUserId(response.data.id);
      setActiveStep(1);
    } catch (e: AxiosError) {
      setErrorMessage(`${e.response.statusText} - ${e.response.data.message}`);
      setActiveStep(1);
    }
  };

  const onSubmit = async (data) => {
    // Handle form submission, e.g., update user data in the backend

    console.log(data);
    try {
      const variables = {
        first_name: data.first_name,
        last_name: data.last_name,
        user_id: userId,
        skill_ids: data.skills,
      };
      const response = await axiosInstance.post('/professional', variables);
      navigate('/login');
    } catch (e) {
      console.log(e);
    } finally {
      setActiveStep(0);
    }
  };

  const getSkills = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/skill');
      let response_data = response.data;
      setSkills(response_data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const handleAddNewItem = async (event) => {
    event.preventDefault();
    try {
      if (newItem.trim() !== '') {
        let newSkills = newItem.split(',');
        setLoading(true);
        const response = await axiosInstance.post('/skill', newSkills);
        setLoading(false);
        setNewItem('');
        getSkills();
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Sign Up
          </Typography>
          {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>Step 1: Account Information</StepLabel>
              <StepContent>
                <SignUpForm onSubmit={handleSubmit(createUser)}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                  <TextField
                    id="user_name"
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('user_name', { required: true })}
                  />
                  {errors.user_name && <span>This field is required</span>}
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password', { required: true })}
                  />
                  {errors.password && <span>This field is required</span>}

                  <SubmitButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Next
                  </SubmitButton>
                  <Button onClick={() => navigate('/login')}>Sign in</Button>
                </SignUpForm>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Step 2: More Details</StepLabel>
              <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name="first_name"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="First Name" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="last_name"
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Last Name" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="skills-label">Skills</InputLabel>
                        <Controller
                          name="skills"
                          control={control}
                          defaultValue={[]}
                          render={({ field }) => (
                            <Select
                              {...field}
                              labelId="skills-label"
                              multiple
                              value={field.value}
                              onChange={(event) =>
                                field.onChange(event.target.value)
                              }
                            >
                              {skills.map((skill) => (
                                <MenuItem key={skill.id} value={skill.id}>
                                  {skill.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>

                      {selectedOption === '' && (
                        <TextField
                          label="Add new skills"
                          value={newItem}
                          onChange={(e) => setNewItem(e.target.value)}
                          fullWidth
                        />
                      )}
                      {selectedOption === '' && (
                        <button onClick={handleAddNewItem}>Add</button>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </StepContent>
            </Step>
          </Stepper>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUpPage;
