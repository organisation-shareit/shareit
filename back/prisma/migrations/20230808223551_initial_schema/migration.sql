-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" UUID NOT NULL,
    "lender_id" UUID NOT NULL,
    "borrower_id" UUID NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "expected_end_date" TIMESTAMP(3) NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_lender_id_fkey" FOREIGN KEY ("lender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_borrower_id_fkey" FOREIGN KEY ("borrower_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
