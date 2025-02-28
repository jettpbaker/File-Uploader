import prisma from '../prisma/client.js'

export const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
  return user
}

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

export const createUser = async (username, hashedPassword) => {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    return user
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Username already exists')
    }
    throw error
  }
}
