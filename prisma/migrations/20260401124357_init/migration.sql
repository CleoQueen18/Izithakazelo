-- CreateTable
CREATE TABLE "ClanName" (
    "id" SERIAL NOT NULL,
    "surname" TEXT NOT NULL,
    "clan_praise" TEXT NOT NULL,
    "origin" TEXT,
    "language" TEXT,
    "submittedBy" INTEGER,

    CONSTRAINT "ClanName_pkey" PRIMARY KEY ("id")
);
