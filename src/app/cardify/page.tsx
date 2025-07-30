'use client';

import Image from 'next/image';
import { GoogleGenAI, Modality } from '@google/genai';
import { useRef, useState } from 'react';
import Upload from '@/components/Upload';
import { types } from '@/utils/constants';

export default function Cardify() {
  const [image, setImage] = useState<File | null>(null);
  const [card, setCard] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [base64Image, setBase64Image] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);
  const client = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const buildPrompt = () => {
    return {
      text: `Using the image provided, generate a unique card inspired by the Pokémon Trading Card Game with similar art styles. Make sure that all text on the card is in plain English and is readable by humans. The card should be visually appealing and suitable for a trading card game.${
        type ? ` The type of the card is ${type}.` : ''
      }${
        description
          ? ` Use the following description provided to generate the card: ${description}.`
          : ''
      }`,
    };
  };

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] || null);
    const reader = new FileReader();
    if (!event.target.files || event.target.files.length === 0) return;
    reader.readAsDataURL(event.target.files?.[0]);
    reader.onload = () => {
      setBase64Image(reader.result as string);
    };
  };

  const onGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setCard(undefined);
    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: [
        {
          text: buildPrompt().text,
        },
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
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          setCard(imageData);
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="items-center justify-items-center p-8">
      <main className="flex flex-col gap-[32px] items-center sm:items-start sm:w-4xl">
        <h1 className="text-2xl font-bold">Cardify</h1>
        <span className="text-lg">
          Turn a photo into a unique card inspired by popular trading card
          games! Start by uploading an image, then optionally provide a typing
          and a short description to help generate the card. Finally, click the
          Generate Card button to create a card based on the uploaded image.
        </span>
        {image ? (
          <div className="flex items-center justify-center min-h-64 p-4 border rounded w-full">
            <Image
              className="max-w-full h-auto rounded"
              width={300}
              height={300}
              src={URL.createObjectURL(image)}
              alt="Uploaded"
            />
          </div>
        ) : (
          <Upload id="dropzone-file" uploadRef={fileRef} onUpload={onUpload} />
        )}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between w-full">
          <div className="flex-1">
            <label htmlFor="types" className="block mb-2 font-medium">
              Select a type:
            </label>
            <select
              id="types"
              className="border rounded-lg block w-full p-4 appearance-none"
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type || 'Undecided (Pick for me)'}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-3">
            <label htmlFor="description" className="block mb-2 font-medium">
              Enter a description:
            </label>
            <input
              id="description"
              className="border rounded-lg block w-full p-4 appearance-none"
              type="text"
              placeholder="Optional"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full justify-center items-center sm:flex-row sm:gap-20">
          <button
            className="rounded-full sm:rounded p-4 border border-[var(--foreground)] hover:border-fuchsia-500 disabled:border-gray-500 hover:cursor-pointer disabled:cursor-not-allowed"
            onClick={onGenerate}
            disabled={!image || loading}
          >
            Generate!
          </button>
        </div>
        <div className="flex items-center w-full min-h-64 justify-center p-4 border rounded">
          {card ? (
            <Image
              className="max-w-full h-auto rounded"
              width={300}
              height={300}
              src={`data:image/jpeg;base64,${card}`}
              alt="Generated Card"
            />
          ) : (
            <span>
              {loading
                ? 'Generating your image. This could take up to a minute...'
                : 'Your image will be displayed here after generation.'}
            </span>
          )}
        </div>
        <p className="text-sm">
          Note: This is an experimental feature, generated images may not always
          match expectations. Your uploaded and generated photos are in no way
          stored, saved, or kept for any other purposes.
        </p>
      </main>
    </div>
  );
}
