/*
  Warnings:

  - Added the required column `postal` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Story" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "email" TEXT,
    "twitter" TEXT,
    "phone" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Story" ("id", "createdAt", "updatedAt", "content", "email", "twitter", "phone", "approved", "viewCount") SELECT "id", "createdAt", "updatedAt", "content", "email", "twitter", "phone", "approved", "viewCount" FROM "Story";
DROP TABLE "Story";
ALTER TABLE "new_Story" RENAME TO "Story";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
