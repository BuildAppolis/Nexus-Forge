import { PrismaClient, Role } from '@prisma/client'
import { faker } from '@faker-js/faker'
import crypto from 'crypto'

const prisma = new PrismaClient()

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
}

function generateShortId(length: number): string {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

export const seed = async () => {
  const hashedPassword = hashPassword('password123')

  // Define roles
  const roles = ['BASIC', 'PREMIUM', 'MODERATOR', 'ADMIN'] as Role[]

  // Create users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async (_, index) => {
      // Assign roles based on index to ensure we have at least one of each role
      const role = roles[index % roles.length]

      return prisma.user.create({
        data: {
          id: generateShortId(21),
          email: faker.internet.email(),
          emailVerified: faker.datatype.boolean(),
          hashedPassword,
          avatar: faker.image.avatar(),
          role: role,
          discordId: faker.datatype.boolean() ? faker.string.alphanumeric(18) : null,
          stripeCustomerId: faker.datatype.boolean() ? `cus_${faker.string.alphanumeric(14)}` : null,
          stripePriceId: faker.datatype.boolean() ? `price_${faker.string.alphanumeric(14)}` : null,
          stripeSubscriptionId: faker.datatype.boolean() ? `sub_${faker.string.alphanumeric(14)}` : null,
          stripeCurrentPeriodEnd: faker.datatype.boolean() ? faker.date.future() : null,
        },
      })
    })
  )

  // Create posts
  await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const user = faker.helpers.arrayElement(users)
      return prisma.post.create({
        data: {
          id: generateShortId(15),
          userId: user.id,
          title: faker.lorem.sentence().slice(0, 255),
          excerpt: faker.lorem.paragraph().slice(0, 255),
          content: faker.lorem.paragraphs(),
          status: faker.helpers.arrayElement(['published', 'draft']),
          tags: faker.lorem.words(3).slice(0, 255)
        },
      })
    })
  )

  console.log('Seed data inserted successfully.')

  await prisma.$disconnect()
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})