import { connectDB } from '@/app/lib/db';
import User from '@/app/Models/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { role, fullName, email, password } = await request.json();

    if (!role || !fullName || !email || !password) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ message: 'Email already registered' }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: 'Signup successful' }), { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
