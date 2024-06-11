import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const JoinMe = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const email = 'mathieuhoyer@gmail.com';

  const sendEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div>
        <p className="text-center">This will open your default email client with the subject and message prefilled.</p>
        <p className="text-center">If you doesn't configurate it yet, you can send on:</p>
        <p className="text-center select-all mb-10">{email}</p>
        <h1 className="text-4xl mb-4 text-center">Contact me</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail();
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="text-lg">Subject :</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-0 text-white"
            />
          </label>
          <label className="block">
            <span className="text-lg">Message :</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full h-20 rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-0 text-white"
            />
          </label>
          <Button type="submit">Open mail</Button>
        </form>
      </div>
    </div>
  );
};
