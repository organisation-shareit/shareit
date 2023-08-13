import { createItemId } from '@domain/item/aggregate/id';
import { Loan } from '@domain/loan/aggregate';
import { createLoanExpectedEndDate } from '@domain/loan/aggregate/expectedEndDate';
import { LoanId, createLoanId } from '@domain/loan/aggregate/id';
import { createLoanStartDate } from '@domain/loan/aggregate/startDate';
import { createLoanStatus } from '@domain/loan/aggregate/status';
import { LoanRepository } from '@domain/loan/repository';
import { createUserId } from '@domain/user/aggregate/id';
import { PrismaClient } from '@prisma/client';
import { TypeGuardError } from '@utils/typeguard-error';
import { err, ok } from 'neverthrow';

type Dependencies = {
  prismaClient: PrismaClient;
};

export function buildPostgresqlLoanRepository(dependencies: Dependencies): LoanRepository {
  const { prismaClient } = dependencies;

  async function saveLoan(input: { loan: Loan }): ReturnType<LoanRepository['saveLoan']> {
    try {
      const event = input.loan.lastEvent;

      switch (event.kind) {
        case 'LOAN_CREATED': {
          await prismaClient.loan.create({
            data: {
              id: input.loan.id,
              item_id: input.loan.itemId,
              shared_by_user_id: input.loan.sharedBy,
              shared_to_user_id: input.loan.sharedTo,
              status: input.loan.status,
              start_date: input.loan.startDate,
              expected_end_date: input.loan.expectedEndDate,
            },
          });
          return ok(undefined);
        }
        case 'LOAN_UPDATED': {
          await prismaClient.loan.update({
            where: {
              id: input.loan.id,
            },
            data: {
              id: input.loan.id,
              shared_by_user_id: input.loan.sharedBy,
              shared_to_user_id: input.loan.sharedTo,
              status: input.loan.status,
              start_date: input.loan.startDate,
              expected_end_date: input.loan.expectedEndDate,
            },
          });
          return ok(undefined);
        }
        default:
          throw new TypeGuardError(event, 'event not existing');
      }
    } catch (error) {
      return err({
        kind: 'cannotSaveLoan',
        loan: input.loan,
        error,
      });
    }
  }

  async function getLoanById(input: { loanId: LoanId }): ReturnType<LoanRepository['getLoanById']> {
    const loan = await prismaClient.loan.findUnique({
      where: {
        id: input.loanId,
      },
    });

    if (loan === null) {
      return err({
        kind: 'loanNotFound',
        loanId: input.loanId,
      });
    }

    return ok({
      id: createLoanId(loan.id),
      itemId: createItemId(loan.item_id),
      sharedBy: createUserId(loan.shared_by_user_id),
      sharedTo: createUserId(loan.shared_to_user_id),
      startDate: createLoanStartDate(loan.start_date),
      expectedEndDate: createLoanExpectedEndDate(loan.expected_end_date),
      status: createLoanStatus(loan.status),
    });
  }

  return {
    saveLoan,
    getLoanById,
  };
}
