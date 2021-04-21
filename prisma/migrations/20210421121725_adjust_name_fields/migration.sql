/*
  Warnings:

  - You are about to drop the column `name` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "name",
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "displayName" TEXT;
