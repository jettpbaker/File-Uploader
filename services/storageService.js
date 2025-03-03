import prisma from '../prisma/client.js'
import path from 'path'

export const addFile = async (file, userId) => {
  const name = path.parse(file.originalname).name
  const size = Math.max(file.size / 1024 / 1024, 1)

  await prisma.file.create({
    data: {
      name,
      size,
      location: file.path,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export const deleteFile = async (fileId) => {
  await prisma.file.delete({
    where: {
      id: fileId,
    },
  })
}

export const getFiles = async (userId) => {
  const files = await prisma.file.findMany({
    where: {
      ownerId: userId,
    },
  })
  return files
}

export const getFileById = async (fileId) => {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  })
  return file
}

// model File {
//   id        Int   @id @default(autoincrement())
//   name      String
//   location  String
//   createdAt DateTime @default(now())
//   owner      User     @relation(fields: [ownerId], references: [id])
//   ownerId    Int
//   folder     Folder?   @relation(fields: [folderId], references: [id])
//   folderId   Int?
// }
