import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .Accordion-root': {
    boarder: 'None',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  padding: '24px 0',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : 'rgba(255, 255, 255, .03)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiAccordionDetails-root': {
    boarderTop: 'None',
  },
}));

const AccodionHeader = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto',
  fontWeight: '300',
  fontSize: '24px !important',
  lineHeight: '32px',
  color: '#1D1E1C',
  margin: '0px',
}));
export default function CustomizedAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <AccodionHeader>Expense Tracking</AccodionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Set hourly or fixed fee budgets for each project. Track and monitor
            as projects progress. Get instant alerts when budgets are reached.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <AccodionHeader>Invoice & Payments</AccodionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Generate and send invoices for tracked time in 2 clicks. Let clients
            pay directly from the invoice. Automated follow-up and reminders.
            Integrates with Xero and QuickBooks.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <AccodionHeader>Reporting</AccodionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Create instant reports across projects. Budgets, time spent on tasks
            and projects, team capacity, expenses, and more. Drill down into
            details.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <AccodionHeader>Budget Monitoring</AccodionHeader>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Set hourly or fixed fee budgets for each project. Track and monitor
            as projects progress. Get instant alerts when budgets are reached.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
