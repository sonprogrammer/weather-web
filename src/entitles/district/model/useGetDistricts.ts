import { useQuery } from '@tanstack/react-query';
import { fetchDistricts } from '@/entitles/district/api/fetchDistricts';

export const useDistricts = () => {
  return useQuery({
    queryKey: ['districts'],
    queryFn: fetchDistricts,
    staleTime: 1000 * 60 * 60, 
  });
};