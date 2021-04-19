/*
  Warnings:

  - Added the required column `title` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anonymous` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "anonymous" BOOLEAN NOT NULL,
ADD COLUMN     "contact" BOOLEAN NOT NULL;
