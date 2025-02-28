import prisma from '../prisma/client.js'
import path from 'path'

export const addFile = async (file, userId) => {
  const name = path.parse(file.originalname).name

  await prisma.file.create({
    data: {
      name,
      location: file.path,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  })
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
