/*
  Warnings:

  - Added the required column `username` to the `UserCountTry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCountTry" ADD COLUMN     "username" TEXT NOT NULL;
