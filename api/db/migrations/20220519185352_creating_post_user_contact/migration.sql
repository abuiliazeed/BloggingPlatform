/*
  Warnings:

  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Post` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Contact` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_User" (
    "id" SERIAL4 NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
DROP INDEX "User_email_key";
INSERT INTO "_prisma_new_User" ("email","hashedPassword","id","name","resetToken","resetTokenExpiresAt","salt") SELECT "email","hashedPassword","id","name","resetToken","resetTokenExpiresAt","salt" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "_prisma_new_Post" (
    "id" SERIAL4 NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Post" ("body","createdAt","id","title") SELECT "body","createdAt","id","title" FROM "Post";
DROP TABLE "Post" CASCADE;
ALTER TABLE "_prisma_new_Post" RENAME TO "Post";
CREATE TABLE "_prisma_new_Contact" (
    "id" SERIAL4 NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Contact" ("createdAt","email","id","message","name") SELECT "createdAt","email","id","message","name" FROM "Contact";
DROP TABLE "Contact" CASCADE;
ALTER TABLE "_prisma_new_Contact" RENAME TO "Contact";
