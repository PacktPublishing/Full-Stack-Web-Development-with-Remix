import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { db } from '~/modules/db.server';

type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({ name, email, password }: UserRegistrationData): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedName = name.trim();

  const existingUser = await db.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existingUser) {
    throw new Error(`A user with the email ${email} already exists.`);
  }

  try {
    return db.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create user.');
  }
}

type UserLoginData = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: UserLoginData): Promise<User> {
  const sanitizedEmail = email.trim().toLowerCase();

  const user = await db.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (!user) {
    throw new Error(`No user found for email: ${email}.`);
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error('Invalid password.');
  }

  return user;
}
