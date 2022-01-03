-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "locationId" INTEGER;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "fsa" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "locality" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "geocodingData" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location.fsa_unique" ON "Location"("fsa");

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
