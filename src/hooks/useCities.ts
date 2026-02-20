import { useState, useEffect } from 'react';
import { City } from '@/types/city';
import { getCities } from '@/services/cityService';
import { log } from 'console';

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        setIsLoading(true);
        const data = await getCities();
        setCities(data);
        console.log("fetch cities:", data);
        
      } catch (err) {
        setError('خطا در بارگذاری لیست شهرها');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  return { cities, isLoading, error };
};