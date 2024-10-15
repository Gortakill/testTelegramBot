/*
  Warnings:

  - Added the required column `randomNumber` to the `UserCountTry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCountTry" ADD COLUMN     "randomNumber" INTEGER NOT NULL;
