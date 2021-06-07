-- CreateEnum
CREATE TYPE "Province" AS ENUM ('NL', 'NS', 'PE', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'NU', 'NT', 'YT');

-- CreateEnum
CREATE TYPE "PostalCodeType" AS ENUM ('rural', 'urban');

-- CreateTable
CREATE TABLE "PostalCode" (
    "code" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "type" "PostalCodeType" NOT NULL,
    "hotspot" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Riding" (
    "province" "Province" NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "population" INTEGER,
    "area" INTEGER,
    "url" TEXT,
    "mppName" TEXT NOT NULL,
    "mppDesignation" TEXT NOT NULL,
    "mppFirstName" TEXT NOT NULL,
    "mppLastName" TEXT NOT NULL,
    "mppEmail" TEXT NOT NULL,
    "mppPhone" TEXT,
    "mppParty" TEXT,
    "mppUrl" TEXT,

    PRIMARY KEY ("province","id")
);

-- CreateTable
CREATE TABLE "PostalCodeToRiding" (
    "postal" TEXT NOT NULL,
    "province" "Province" NOT NULL,
    "ridingId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("postal","province","ridingId")
);

-- AddForeignKey
ALTER TABLE "PostalCodeToRiding" ADD FOREIGN KEY ("postal") REFERENCES "PostalCode"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalCodeToRiding" ADD FOREIGN KEY ("province", "ridingId") REFERENCES "Riding"("province", "id") ON DELETE CASCADE ON UPDATE CASCADE;
