/*
  Warnings:

  - Added the required column `item_id` to the `loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "item_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
