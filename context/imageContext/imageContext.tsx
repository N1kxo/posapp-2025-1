import React, { createContext, useContext } from 'react';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/utils/SupabaseConfig';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

interface ImageContextType {
  uploadImage: (uri: string) => Promise<string | null>;
  deleteImage: (path: string) => Promise<boolean>;
  getImageUrl: (path: string) => string;
}

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const uploadImage = async (uri: string): Promise<string | null> => {
    try {
      const response = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const filename = `${Date.now()}.jpg`;
      const path = `menu-images/${filename}`;
      const fileExt = 'jpg';
      const contentType = `image/${fileExt}`;

      const { data, error } = await supabase.storage
        .from('menu-images')
        .upload(path, Buffer.from(response, 'base64'), {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      return path;
    } catch (err) {
      console.error('Upload failed:', err);
      return null;
    }
  };

  const deleteImage = async (path: string): Promise<boolean> => {
    const { error } = await supabase.storage
      .from('menu-images')
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  };

  const getImageUrl = (path: string): string => {
    return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-images/${path}`;
  };

  return (
    <ImageContext.Provider value={{ uploadImage, deleteImage, getImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook for easy access
export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};