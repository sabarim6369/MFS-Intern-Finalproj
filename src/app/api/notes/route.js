
import { connectDB } from '@/app/lib/db';
import Note from '@/app/Models/Note';

export async function GET() {
  try {
    await connectDB();

    const notes = await Note.find().sort({ date: -1 }); 
    return new Response(JSON.stringify({ notes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching notes:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
