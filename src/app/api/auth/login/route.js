import { connectDB } from '@/app/lib/db';
import User from '@/app/Models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey'; // Use env variable in production
const JWT_EXPIRES_IN = '1h'; // You can change the expiry as needed

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password required' }), { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    const userData = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return new Response(JSON.stringify({ message: 'Login successful', user: userData, token }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
       
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
