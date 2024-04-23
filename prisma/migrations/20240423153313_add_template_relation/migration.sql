-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "templateId" TEXT NOT NULL DEFAULT 'clvcjnwok0000u7gr4l96imw8';

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
