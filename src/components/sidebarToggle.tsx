import { SidebarTrigger } from './ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function SidebarToggle() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent>
          <p>toggle sidebar (ctrl + b)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
