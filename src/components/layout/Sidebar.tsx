import { NavLink } from 'react-router-dom';
import FloatingMenu from './SidebarFloatingMenu';
import { SidebarGroup } from '../../types/components';

interface SidebarProps {
  navItems: SidebarGroup[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  {
    /*

  const handleClick = (index: number) => {
    setOpenPanels((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  }; */
  }

  return (
    <nav className={'sidebar'} aria-label="main navigation" id="sidebar">
      {navItems.map((item, index) => (
        <div className="sidebarEntry" key={index}>
          {/* add option to pass down icons for each item */}
          <NavLink to={item.path} className={'sidebarLink'}>
            {item.name}
          </NavLink>
          {item.subitems ? <FloatingMenu subitems={item.subitems} /> : null}
        </div>
      ))}
    </nav>
  );
}
