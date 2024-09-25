/*
  Warnings:

  - You are about to drop the column `popularity` on the `Cat` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `Cat` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cat" DROP COLUMN "popularity",
DROP COLUMN "sex",
ADD COLUMN     "gender" "GENDER" NOT NULL;
