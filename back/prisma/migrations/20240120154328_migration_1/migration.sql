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
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "town" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCat" (
    "userId" INTEGER NOT NULL,
    "catId" INTEGER NOT NULL,

    CONSTRAINT "UserCat_pkey" PRIMARY KEY ("userId","catId")
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
ALTER TABLE "UserCat" ADD CONSTRAINT "UserCat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCat" ADD CONSTRAINT "UserCat_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Cat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatToUser" ADD CONSTRAINT "_CatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatToUser" ADD CONSTRAINT "_CatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
