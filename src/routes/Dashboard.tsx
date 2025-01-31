import { Center } from '@mantine/core';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const handleClick = async () => {
    try {
      console.log('hi!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center w="100%" h="100%">
      <Button>this works?</Button>
      <Button variant="destructive">fuck</Button>
    </Center>
  );
}
