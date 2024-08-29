import prisma from '../src/prisma';
import { users, products, categories } from './data.json';
export const seedCustomer = async () => {
  for (let i = 0; i < users.length; i++) {
    const data = {
      ...users[i],
      gender: users[i].gender as 'Pria' | 'Perempuan',
      role: users[i].role as 'Admin' | 'Customer',
      birth_date: new Date(users[i].birth_date),
    };
    await prisma.user.upsert({
      create: data,
      where: {
        id: users[i].id,
      },
      update: data,
    });
  }
};

export const seedCategories = async () => {
  for (let i = 0; i < categories.length; i++) {
    const data = categories[i];
    await prisma.category.upsert({
      create: data,
      where: {
        id: categories[i].id,
      },
      update: data,
    });
  }
};

export const seedProducts = async () => {
  for (let i = 0; i < products.length; i++) {
    const data = {
      ...products[i],
    };
    await prisma.product.upsert({
      create: data,
      where: {
        id: products[i].id,
      },
      update: data,
    });
  }
};

const main = async () => {
  await seedCustomer();
  await seedCategories();
  await seedProducts();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
