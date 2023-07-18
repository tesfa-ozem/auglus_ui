import { gql } from '@apollo/client';

const EXPENSE_TOTALS = gql`
  query ($frequency: String!, $period: Int!) {
    expenseTotals(frequency: $frequency, period: $period) {
      data {
        Id
        totalPaidIn
        totalPaidOut
      }
    }
  }
`;

export { EXPENSE_TOTALS };
