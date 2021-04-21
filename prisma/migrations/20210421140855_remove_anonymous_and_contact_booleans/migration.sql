/*
  Warnings:

  - You are about to drop the column `anonymous` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "anonymous",
DROP COLUMN "contact";
