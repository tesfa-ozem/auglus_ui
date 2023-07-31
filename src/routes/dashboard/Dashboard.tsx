import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from '../../common/http';
import TaskCard from '../../layout/components/TaskCard';
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const DashboardPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [skill, setSkill] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const existingSkills = ['React', 'JavaScript', 'HTML', 'CSS'];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Process form data or send it to the server
    console.log(data);
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/task/userTasks');
      let response_data = response.data;
      setTasks(response_data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const startTask = async (taskId:number) => {
    try{
      setLoading(true);
      const response = await axiosInstance.patch(`/task/${taskId}/start`);
      getTasks();
      let response_data = response.data;
      setLoading(false);
    } catch (e){
      setLoading(false);
      console.log(e);
    }
  }

  const endTask = async (taskId:number) => {
    try{
      setLoading(true);
      const response = await axiosInstance.patch(`/task/${taskId}/end`);
      getTasks();
      let response_data = response.data;
      setLoading(false);
    } catch (e){
      setLoading(false);
      console.log(e);
    }
  }
  
  useEffect(() => {
    getTasks();
  }, []);


  return (
    <>
      <Box>
        <Grid container spacing={2} alignContent='baseline'>
          <Grid item xs={3}>
            <Container maxWidth="sm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    Create a Task
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="Name"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Task name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Name"
                          error={Boolean(errors.name)}
                          helperText={errors.name && errors.name.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Priority</InputLabel>
                      <Controller
                        name="priority"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Select {...field}>
                            <MenuItem value={1}>Low</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>High</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="skills"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          multiple
                          freeSolo
                          options={existingSkills}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              label="Skills"
                              error={Boolean(errors.skills)}
                              helperText={
                                errors.skills && 'Please select or add skills'
                              }
                            />
                          )}
                          isOptionEqualToValue={(option, value) =>
                            option === value || existingSkills.includes(value)
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Grid>
          <Grid  xs={9} container spacing={2}>
            {tasks!=undefined ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard
                    taskId={task.id}
                    title={task.task.name}
                    priority={task.task.priority}
                    status={task.task.status}
                    assignee={task.professional.first_name}
                    startTask={startTask}
                    endTask={endTask }
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p>No tasks found.</p>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardPage;
