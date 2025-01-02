"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FloatingPeacock, RunningCheetah } from './components/background-animations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Utensils, ShoppingBag, TreesIcon as Tree, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

const dateOptions = [
  { id: '1', date: 'Saturday, Jan 10, 2024' },
  { id: '2', date: 'Sunday, July 11, 2024' },
]

const timelineItems = [
  { id: '1', title: 'Mini Punjabi Dhaba', description: 'Savor authentic Punjabi flavors', icon: Utensils },
  { id: '2', title: 'Clothes Shopping', description: 'Explore local fashion boutiques', icon: ShoppingBag },
  { id: '3', title: 'Lalbagh Botanical Garden', description: 'Stroll through lush greenery', icon: Tree },
]

export default function RetroRSVPCard() {
  const [selectedDate, setSelectedDate] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!selectedDate) {
      setError('Please select a date before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedDate: selectedDate }),
      });

      // Debug response
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Try to get the response text first
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data;
      try {
        // Try to parse the response text as JSON
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        console.error('Raw response:', responseText);
        throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
      }

      if (response.ok) {
        setSuccess(true);
        setSelectedDate('');
      } else {
        setError(data.message || 'Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setError('Unable to submit RSVP. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-amber-100 overflow-hidden p-4">
      {/* Background Animations */}
      <FloatingPeacock className="absolute top-10 left-10 animate-float" />
      <FloatingPeacock className="absolute bottom-20 right-20 animate-float-reverse" />
      <FloatingPeacock className="absolute top-1/2 left-1/4 animate-float-slow" />
      <RunningCheetah className="absolute bottom-10 left-0 animate-run" />

      <div className="w-full max-w-md p-8 bg-orange-200 border-4 border-orange-500 rounded-lg shadow-lg relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-800 mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>RSVP</h1>
          <h2 className="text-2xl font-semibold text-orange-700">for a Retro Date in Basavanagudi</h2>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-100 text-green-800 border-green-200">
            <AlertDescription>Thank you for your RSVP! A confirmation email has been sent.</AlertDescription>
          </Alert>
        )}
        
        <div className="border-2 border-orange-500 border-dashed p-4 mb-6">
          <form onSubmit={handleSubmit}>
            <RadioGroup value={selectedDate} onValueChange={setSelectedDate} className="space-y-4">
              {dateOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <RadioGroupItem value={option.date} id={option.id} className="text-orange-500" />
                  <Label htmlFor={option.id} className="ml-2 text-lg text-orange-800">
                    {option.date}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button 
              type="submit" 
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP'}
            </Button>
          </form>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="timeline">
            <AccordionTrigger className="text-orange-800 hover:text-orange-600">
              View Date Timeline
            </AccordionTrigger>
            <AccordionContent>
              <ol className="relative border-l border-orange-500 ml-3">
                {timelineItems.map((item) => (
                  <li key={item.id} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-orange-300 rounded-full -left-4 ring-4 ring-orange-200">
                      <item.icon className="w-4 h-4 text-orange-700" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-orange-800">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-base font-normal text-orange-700">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="text-center text-orange-700 mt-6">
          <p>Come off my cutie❤️</p>
          <p className="mt-2">Location: Basavanagudi, Bangalore</p>
        </div>
        
        {/* Retro decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-orange-500"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-orange-500"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-orange-500"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-orange-500"></div>
      </div>
    </div>
  )
}