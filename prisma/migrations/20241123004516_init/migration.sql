/*
  Warnings:

  - You are about to drop the column `href` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uri` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "href",
DROP COLUMN "uri";

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");
