-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "PostalCodeToRiding" DROP CONSTRAINT "PostalCodeToRiding_postal_fkey";

-- DropForeignKey
ALTER TABLE "PostalCodeToRiding" DROP CONSTRAINT "PostalCodeToRiding_province_ridingId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_postal_fkey";

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_postal_fkey" FOREIGN KEY ("postal") REFERENCES "PostalCode"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalCodeToRiding" ADD CONSTRAINT "PostalCodeToRiding_postal_fkey" FOREIGN KEY ("postal") REFERENCES "PostalCode"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostalCodeToRiding" ADD CONSTRAINT "PostalCodeToRiding_province_ridingId_fkey" FOREIGN KEY ("province", "ridingId") REFERENCES "Riding"("province", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Account.provider_providerAccountId_unique" RENAME TO "Account_provider_providerAccountId_key";

-- RenameIndex
ALTER INDEX "Session.sessionToken_unique" RENAME TO "Session_sessionToken_key";

-- RenameIndex
ALTER INDEX "Story.postal_approved_index" RENAME TO "Story_postal_approved_idx";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "VerificationToken.identifier_token_unique" RENAME TO "VerificationToken_identifier_token_key";

-- RenameIndex
ALTER INDEX "VerificationToken.token_unique" RENAME TO "VerificationToken_token_key";
