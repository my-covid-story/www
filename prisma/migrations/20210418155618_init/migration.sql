-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "email" TEXT,
    "twitter" TEXT,
    "phone" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Story.postal_approved_index" ON "Story"("postal", "approved");
