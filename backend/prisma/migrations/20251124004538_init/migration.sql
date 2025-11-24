/*
  Warnings:

  - The primary key for the `BlogPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HomepageContent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Lead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WeddingImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WeddingStory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_weddingStoryId_fkey";

-- DropForeignKey
ALTER TABLE "WeddingImage" DROP CONSTRAINT "WeddingImage_weddingStoryId_fkey";

-- DropIndex
DROP INDEX "BlogPost_publishedAt_idx";

-- DropIndex
DROP INDEX "Lead_createdAt_idx";

-- DropIndex
DROP INDEX "Lead_status_idx";

-- DropIndex
DROP INDEX "Review_weddingStoryId_idx";

-- DropIndex
DROP INDEX "WeddingStory_isFeatured_idx";

-- AlterTable
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HomepageContent" DROP CONSTRAINT "HomepageContent_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "HomepageContent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "Lead_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "weddingStoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WeddingImage" DROP CONSTRAINT "WeddingImage_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "weddingStoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WeddingImage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "WeddingStory" DROP CONSTRAINT "WeddingStory_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "WeddingStory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "WeddingImage" ADD CONSTRAINT "WeddingImage_weddingStoryId_fkey" FOREIGN KEY ("weddingStoryId") REFERENCES "WeddingStory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_weddingStoryId_fkey" FOREIGN KEY ("weddingStoryId") REFERENCES "WeddingStory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
