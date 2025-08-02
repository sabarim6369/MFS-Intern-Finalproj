import { connectDB } from '@/app/lib/db';
import Note from '@/app/Models/Note';

export async function POST(request) {
  try {
    const body = await request.json();
    const { class: className, subject, topic, date, teacherName = 'james',description  } = body;

    if (!className || !subject || !topic || !date||!description) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const newNote = new Note({
      class: className,
      subject,
      topic,
      date,
      teacherName,
      description
    });

    await newNote.save();

    return new Response(JSON.stringify({ message: 'Note added successfully', note: newNote }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error adding note:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, class: className, subject, topic, date, teacherName, userId,description } = body;
console.log(body)
    if (!id || !userId) {
      return new Response(
        JSON.stringify({ message: 'Note ID and User ID are required for update' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    await connectDB();

    const existingNote = await Note.findById(id);

    if (!existingNote) {
      return new Response(JSON.stringify({ message: 'Note not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (existingNote._id.toString() !== id) {
      return new Response(JSON.stringify({ message: 'Unauthorized: You do not own this note' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        ...(className && { class: className }),
        ...(subject && { subject }),
        ...(topic && { topic }),
        ...(date && { date }),
        ...(teacherName && { teacherName }),
        ...(description && {description})
      },
      { new: true }
    );

    return new Response(
      JSON.stringify({ message: 'Note updated successfully', note: updatedNote }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error updating note:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ message: 'Note ID is required for deletion' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return new Response(JSON.stringify({ message: 'Note not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Note deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting note:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
