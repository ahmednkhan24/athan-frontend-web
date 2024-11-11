import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { RootState } from 'store';
import { LocationState } from 'store/location/locationSlice';

interface SalahTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Firstthird: string;
  Imsak: string;
  Lastthird: string;
  Midnight: string;
  Sunrise: string;
  Sunset: string;
}

async function getSalahTimes({ latitude, longitude }: LocationState) {
  const { data } = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&school=1`
  ).then((r) => r.json());
  return data.timings as SalahTimes;
}

const Times: React.FC = () => {
  const location = useSelector((state: RootState) => state.locationState);
  const { data: times, isLoading } = useQuery({
    queryKey: ['salahTimes'],
    queryFn: async () => getSalahTimes(location),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!times) {
    return <div>idk</div>;
  }

  return (
    <Container>
      {Object.entries(times).map(([name, time]) => (
        <div key={name}>
          {name} - {time}
        </div>
      ))}
    </Container>
  );
};

export default Times;
