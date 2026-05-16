/*
  Warnings:

  - You are about to drop the `ClanName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ClanName";

-- CreateTable
CREATE TABLE "Clan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tribe" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surname" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "clan_praise" TEXT NOT NULL,
    "origin" TEXT,
    "language" TEXT,
    "clanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Surname_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clan_name_key" ON "Clan"("name");

-- AddForeignKey
ALTER TABLE "Surname" ADD CONSTRAINT "Surname_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
