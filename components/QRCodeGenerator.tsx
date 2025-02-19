"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator({ url, name }: { url: string; name: string }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-lg font-bold text-white">{name}</h2>
      <QRCodeCanvas value={url} size={150} bgColor="#ffffff" fgColor="#000000" />
      <a href={url} target="_blank" className="text-blue-400 underline mt-2">Otwórz link</a>
    </div>
  );
}
