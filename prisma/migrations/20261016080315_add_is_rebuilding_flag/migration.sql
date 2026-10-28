/*
  Warnings:

  - You are about to drop the column `clanId` on the `Surname` table. All the data in the column will be lost.
  - You are about to drop the column `clan_praise` on the `Surname` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `Surname` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Surname` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Surname` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Surname" DROP CONSTRAINT "Surname_clanId_fkey";

-- AlterTable
ALTER TABLE "Clan" ADD COLUMN     "history" TEXT,
ADD COLUMN     "originStory" TEXT;

-- AlterTable
ALTER TABLE "Surname" DROP COLUMN "clanId",
DROP COLUMN "clan_praise",
DROP COLUMN "surname",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClanSurname" (
    "id" SERIAL NOT NULL,
    "clanId" INTEGER NOT NULL,
    "surnameId" INTEGER NOT NULL,
    "clan_praise" TEXT NOT NULL,
    "sourceTitle" TEXT,
    "sourceUrl" TEXT,
    "verificationStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED',
    "isRebuilding" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClanSurname_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "contributorName" TEXT NOT NULL,
    "contributorEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedStory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "clanId" INTEGER,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "scheduledDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeaturedStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShareAnalytics" (
    "id" SERIAL NOT NULL,
    "clanId" INTEGER NOT NULL,
    "clanName" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" TEXT,
    "referrer" TEXT,

    CONSTRAINT "ShareAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClanImage" (
    "id" SERIAL NOT NULL,
    "clanId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedBy" INTEGER,

    CONSTRAINT "ClanImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClanSurname_clanId_surnameId_key" ON "ClanSurname"("clanId", "surnameId");

-- CreateIndex
CREATE INDEX "ShareAnalytics_clanId_idx" ON "ShareAnalytics"("clanId");

-- CreateIndex
CREATE INDEX "ShareAnalytics_platform_idx" ON "ShareAnalytics"("platform");

-- CreateIndex
CREATE INDEX "ShareAnalytics_sharedAt_idx" ON "ShareAnalytics"("sharedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ClanImage_clanId_isPrimary_key" ON "ClanImage"("clanId", "isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "Surname_name_key" ON "Surname"("name");

-- AddForeignKey
ALTER TABLE "ClanSurname" ADD CONSTRAINT "ClanSurname_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClanSurname" ADD CONSTRAINT "ClanSurname_surnameId_fkey" FOREIGN KEY ("surnameId") REFERENCES "Surname"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturedStory" ADD CONSTRAINT "FeaturedStory_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClanImage" ADD CONSTRAINT "ClanImage_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
