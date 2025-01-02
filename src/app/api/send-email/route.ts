import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Remove edge runtime - use default Node.js runtime instead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { selectedDate } = body;

    if (!selectedDate) {
      return NextResponse.json(
        { message: 'Please select a date.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'hegdealok0@gmail.com',
      subject: 'RSVP Confirmation',
      text: `You have successfully RSVP'd for the date: ${selectedDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1>RSVP Confirmation</h1>
          <p>Thank you for your RSVP!</p>
          <p><strong>Date Selected:</strong> ${selectedDate}</p>
          <p><strong>Location:</strong> Basavanagudi, Bangalore</p>
          <p> See you there my cutu patootu gucchu mucchu, wear something hot, but like traditional</p>
          <p>NOT TOO HOT, I might just take you home then <3 </p>

        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP confirmation email sent!' 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process RSVP' 
    }, { 
      status: 500 
    });
  }
}