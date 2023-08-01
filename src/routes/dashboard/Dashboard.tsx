import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from '../../common/http';
import TaskCard from '../../layout/components/TaskCard';
import {
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const DashboardPage = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkill] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    // Process form data or send it to the server
    createTask(data);
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

  const startTask = async (taskId: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(`/task/${taskId}/start`);
      getTasks();
      let response_data = response.data;
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const endTask = async (taskId: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(`/task/${taskId}/end`);
      getTasks();
      let response_data = response.data;
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
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

  const createTask = async (data:any) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/task', data);
      let response_data = response.data;
      getTasks();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    getTasks();
    getSkills();
  }, []);

  return (
    <>
      <Box>
        <Grid container spacing={2} sx={{ margin: '0' }}>
          {/* <Grid item xs={3}>
            <Container maxWidth="sm">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    Create a Task
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Task name is required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Task Name"
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
                            <MenuItem value={'Low'}>Low</MenuItem>
                            <MenuItem value={'Medium'}>Medium</MenuItem>
                            <MenuItem value={'High'}>High</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
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
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </Grid> */}
          <Grid xs={12} container spacing={2}>
            {tasks != undefined ? (
              tasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard
                    taskId={task.id}
                    title={task.task?.name ?? ''}
                    priority={task.task?.priority ?? ''}
                    status={task.task?.status ?? ''}
                    assignee={task.professional.first_name}
                    startTask={startTask}
                    endTask={endTask}
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
