'use client';

import Image from 'next/image';
import { GoogleGenAI, Modality } from '@google/genai';
import { useRef, useState } from 'react';

export default function Cardify() {
  const [image, setImage] = useState<File | null>(null);
  const [card, setCard] = useState<string | undefined>(undefined);
  const [base64Image, setBase64Image] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const client = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  return (
    <div className="min-h-[calc(100vh-9rem)] sm:min-h-[calc(100vh-11rem)] flex items-center justify-center p-8 sm:p-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-start md:items-start sm:w-xl">
        <span className="text-2xl font-bold">Cardify</span>
        <p className="text-lg">Upload a photo to get started.</p>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(event) => {
            setImage(event.target.files?.[0] || null);
            const reader = new FileReader();
            if (!event.target.files || event.target.files.length === 0) return;
            reader.readAsDataURL(event.target.files?.[0]);
            reader.onload = () => {
              setBase64Image(reader.result as string);
            };
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={async () => {
            if (!image) return;
            const response = await client.models.generateContent({
              model: 'gemini-2.0-flash-preview-image-generation',
              contents: [
                { text: 'Create a card from this image' },
                {
                  inlineData: {
                    mimeType: 'image/png',
                    data: base64Image.split(',')[1] || '',
                  },
                },
              ],
              config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
              },
            });
            const parts = response?.candidates?.[0]?.content?.parts;
            if (parts) {
              for (const part of parts) {
                if (part.text) {
                  console.log(part.text);
                } else if (part.inlineData) {
                  const imageData = part.inlineData.data;
                  setCard(imageData);
                }
              }
            }
          }}
        >
          Generate Card
        </button>
        {image && (
          <div className="mt-4">
            <Image
              width={300}
              height={300}
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
        {card && (
          <div className="mt-4">
            <Image
              width={300}
              height={300}
              src={`data:image/jpeg;base64,${card}`}
              alt="Generated Card"
              className="max-w-full h-auto rounded"
            />
          </div>
        )}
        <p className="text-sm text-gray-500">
          Note: This feature is experimental and may not work as expected.
        </p>
      </main>
    </div>
  );
}
