import { gql } from 'urql';

const EXPENSE_TOTALS = gql`
query(){
    expenseTotals(frequency:"monthly",period:2022){
          data{
              Id
              totalPaidIn
              totalPaidOut
          }
      }
  }
`;

export { EXPENSE_TOTALS };
