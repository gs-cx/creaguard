export const runtime = 'edge';
import React from 'react';
import FaqSection from '../../components/FaqSection';

export default function QuestionsPage() {
  return (
    <main className="min-h-screen bg-black">
      <FaqSection />
    </main>
  );
}
