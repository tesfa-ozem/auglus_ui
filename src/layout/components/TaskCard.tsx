import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  styled,
} from "@mui/material";

// Define custom styles for the status chip using MUI's styled API
const StatusChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.warning.main),
  backgroundColor: theme.palette.warning.main,
}));

const TaskCard = ({ taskId,title, priority, status, assignee, startTask, endTask}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {/* <Typography sx={{ mt: 1 }} color="text.secondary">
          Skills Required:
        </Typography> */}
        {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {skillsRequired.map((skill) => (
            <Chip key={skill} label={skill} color="primary" sx={{ m: 0.5 }} />
          ))}
        </Box> */}
        <Typography sx={{ mt: 1 }} color="text.secondary">
          Priority: {priority}
        </Typography>
        <Box sx={{ mt: 2,display: "flex", justifyContent: "space-between", }}>
          
          {status=="Completed"&&<Chip color="success" label={status} />}
          {status=="Assigned"&&<Chip color="info" label={status} />}
          {assignee&&<Typography variant="h5" component="div">{assignee}</Typography>}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" disabled={status!="Assigned"} color="success" onClick={()=>startTask(taskId)}>
            Start
          </Button>
          <Button variant="contained" disabled={status!="In progess"} color="error" onClick={()=>endTask(taskId)}>
            End
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
