import { Result, err, ok } from 'neverthrow';
import { type ItemRepository } from '@domain/item/repository';
import * as LoanActions from '@domain/loan/actions';
import { type Logger } from '@utils/logger';
import { UserRepository } from '@domain/user/repository';
import { LoanRepository } from '@domain/loan/repository';
import { LoanId } from '@domain/loan/aggregate/id';
import { CannotSaveLoanError } from '@domain/loan/repository/errors';
import { DateUtils } from '@utils/date';
import { createLoanStartDate } from '@domain/loan/aggregate/startDate';
import { createLoanExpectedEndDate } from '@domain/loan/aggregate/expectedEndDate';
import { LendItemCommand } from './lendItemCommand';

type Dependencies = {
  itemRepository: ItemRepository;
  userRepository: UserRepository;
  loanRepository: LoanRepository;
  dateUtils: DateUtils;
  logger: Logger;
};

export type LendItemCommandHandlerResult = Promise<
  Result<
    {
      kind: 'loanSaved';
      loanId: LoanId;
    },
    | CannotSaveLoanError
    | { kind: 'sharedByIsNotTheOwner'; ownerId: string }
    | { kind: 'cannotShareItemToYourself'; ownerId: string }
    | { kind: 'itemDoesNotExist'; itemId: string }
    | { kind: 'ownerDoesNotExist'; ownerId: string }
    | { kind: 'borrowerDoesNotExist'; borrowerId: string }
  >
>;

export type LendItemCommandHandler = (input: LendItemCommand) => LendItemCommandHandlerResult;

export function buildLendItemCommandHandler(dependencies: Dependencies): LendItemCommandHandler {
  const { itemRepository, dateUtils } = dependencies;

  return async function lendItemCommandHandler(
    command: LendItemCommand,
  ): LendItemCommandHandlerResult {
    const { payload } = command;

    const itemResult = await itemRepository.getItemById({ itemId: payload.itemId });
    if (itemResult.isErr()) {
      return err({ kind: 'itemDoesNotExist', itemId: payload.itemId });
    }

    const owner = await dependencies.userRepository.getUserById({ userId: payload.sharedBy });
    if (owner.isErr()) {
      return err({ kind: 'ownerDoesNotExist', ownerId: payload.sharedBy });
    }

    if (itemResult.value.ownerId !== payload.sharedBy) {
      return err({ kind: 'sharedByIsNotTheOwner', ownerId: payload.sharedBy });
    }

    if (itemResult.value.ownerId === payload.sharedTo) {
      return err({ kind: 'cannotShareItemToYourself', ownerId: payload.sharedTo });
    }

    const borrower = await dependencies.userRepository.getUserById({ userId: payload.sharedTo });
    if (borrower.isErr()) {
      return err({ kind: 'borrowerDoesNotExist', borrowerId: payload.sharedTo });
    }

    const loan = LoanActions.createAcceptedLoan({
      id: payload.id,
      itemId: payload.itemId,
      sharedBy: payload.sharedBy,
      sharedTo: payload.sharedTo,
      startDate: createLoanStartDate(dateUtils.now()),
      expectedEndDate: createLoanExpectedEndDate(dateUtils.inFifteenDays()),
    });

    const saveLoanResult = await dependencies.loanRepository.saveLoan({ loan });

    if (saveLoanResult.isErr()) {
      return err({
        kind: 'cannotSaveLoan',
        loan,
        error: saveLoanResult.error,
      });
    }

    return ok({
      kind: 'loanSaved',
      loanId: loan.id,
    });
  };
}
