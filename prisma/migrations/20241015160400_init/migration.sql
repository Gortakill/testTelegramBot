/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `UserCountTry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCountTry_chatId_key" ON "UserCountTry"("chatId");
