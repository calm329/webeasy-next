-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_userId_fkey";

-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "userId" DROP NOT NULL;
