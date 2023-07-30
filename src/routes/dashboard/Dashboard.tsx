import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-kanban';
import axiosInstance from '../../common/http';
import { useEffect, useState } from 'react';
import KanbanCard from '../../layout/components/KanbanCard';

const ExpenseCard = styled('div')(() => ({
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
}));

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [kanbanData, setKanbanDat] = useState();

  const getTasks = async () => {
    try {
      const response = await axiosInstance.get('/task/userTasks');
      let response_data = response.data;
      setTasks(response_data);
    } catch (e) {
      console.log(e);
    }
  };
  const flatenData = () => {
    let data = tasks.map((task) => ({
      id: task.id,
      key: task.task.status,
      title: task.task.name,
      priority: task.task.priority,
    }));
    return data;
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setKanbanDat(flatenData());
  }, [tasks]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* <Typography variant="h4" component="h1" align="center" gutterBottom>
          Expense Tracker Dashboard
        </Typography> */}

        <Grid container alignItems="flex-start">
          <Grid item xs={12} md={12} lg={12}>
           
            <KanbanComponent
              id="id" 
              keyField="key"
              dataSource={kanbanData}
              cardSettings={{
                headerField: 'Title',
                template: KanbanCard.bind(this),
                // selectionType: 'Multiple',
              }}
            >
              <ColumnsDirective>
                <ColumnDirective
                  headerText="Assigned"
                  keyField="Assigned"
                  template={KanbanCard.bind(this)}
                />
                <ColumnDirective
                  headerText="In Progress"
                  keyField="InProgress"
                  template={KanbanCard.bind(this)}
                />
                <ColumnDirective
                  headerText="Completed"
                  keyField="Close"
                  template={KanbanCard.bind(this)}
                />
              </ColumnsDirective>
            </KanbanComponent>
           
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
