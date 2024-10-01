-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ADOPTABLE', 'ADOPTED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "age" INTEGER NOT NULL,
    "town" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" "STATUS" NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavCat" (
    "userId" INTEGER NOT NULL,
    "catId" INTEGER NOT NULL,

    CONSTRAINT "FavCat_pkey" PRIMARY KEY ("userId","catId")
);

-- CreateTable
CREATE TABLE "ReqAdopt" (
    "userId" INTEGER NOT NULL,
    "catId" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReqAdopt_pkey" PRIMARY KEY ("userId","catId")
);

-- CreateTable
CREATE TABLE "_CatToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_CatToUser_AB_unique" ON "_CatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CatToUser_B_index" ON "_CatToUser"("B");

-- AddForeignKey
ALTER TABLE "FavCat" ADD CONSTRAINT "FavCat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavCat" ADD CONSTRAINT "FavCat_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReqAdopt" ADD CONSTRAINT "ReqAdopt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReqAdopt" ADD CONSTRAINT "ReqAdopt_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatToUser" ADD CONSTRAINT "_CatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatToUser" ADD CONSTRAINT "_CatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
