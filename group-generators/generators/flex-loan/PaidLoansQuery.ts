import { gql } from "graphql-request";

interface Loan {
    id: string;
    collateralTargetAddress: string;
    collateralTargetTokenId: string;
    amount: string;
    liquidatedAmount: string;
    duration: string;
    interestRate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export type PaidLoansData = {
    loans: Loan[]
}

export const PAID_LOANS_QUERY = gql`
    query {
        loans(where: { status: "PAID" }) {
            id
            collateralTargetAddress
            collateralTargetTokenId
            amount
            liquidatedAmount
            duration
            interestRate
            status
            createdAt
            updatedAt
        }
    }
`
