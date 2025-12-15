import QRCode from "qrcode";
import { put } from "@vercel/blob";

/**
 * Generate QR Code string yang unik
 * Format: ITEM-{timestamp}-{randomId}
 */
export function generateQRCodeString(): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ITEM-${timestamp}-${randomId}`;
}

/**
 * Generate QR Code image sebagai PNG buffer
 */
export async function generateQRCodeImage(content: string): Promise<Buffer> {
  const buffer = await QRCode.toBuffer(content, {
    type: "png",
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
  return buffer;
}

/**
 * Upload QR Code image ke Vercel Blob Storage
 * @returns URL gambar QR yang sudah diupload
 */
export async function uploadQRCodeToBlob(
  qrCode: string,
  imageBuffer: Buffer,
): Promise<string> {
  const fileName = `qr-codes/${qrCode}.png`;

  const blob = await put(fileName, imageBuffer, {
    access: "public",
    contentType: "image/png",
  });

  return blob.url;
}

/**
 * Generate QR code image dan upload ke Vercel Blob
 * @param qrCode - String konten QR code
 * @returns URL gambar QR dari Vercel Blob
 */
export async function createAndUploadQRCode(qrCode: string): Promise<string> {
  const imageBuffer = await generateQRCodeImage(qrCode);
  const url = await uploadQRCodeToBlob(qrCode, imageBuffer);
  return url;
}
