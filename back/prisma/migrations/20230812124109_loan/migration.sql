/*
  Warnings:

  - You are about to drop the column `is_returned` on the `loan` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "loan_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'RETURNED');

-- AlterTable
ALTER TABLE "loan" DROP COLUMN "is_returned",
ADD COLUMN     "status" "loan_status" NOT NULL DEFAULT 'PENDING';
