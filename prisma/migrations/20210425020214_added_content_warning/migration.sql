-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "suicidal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contentWarning" BOOLEAN NOT NULL DEFAULT false;
