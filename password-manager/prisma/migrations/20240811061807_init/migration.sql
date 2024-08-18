-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WebsiteUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "WebsiteUser_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WebsiteDefault" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WebsitePassword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hashedPassword" TEXT NOT NULL,
    "websiteType" TEXT NOT NULL,
    "websiteId" INTEGER,
    "customWebsiteId" INTEGER,
    CONSTRAINT "WebsitePassword_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "WebsiteDefault" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WebsitePassword_customWebsiteId_fkey" FOREIGN KEY ("customWebsiteId") REFERENCES "WebsiteUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
