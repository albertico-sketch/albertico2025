import { NavLink } from 'react-router-dom'

const NavButton = ({ children, to, ...props }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const base = 'text-center transition-colors text-base block px-4 py-2 dark:text-white'
        const mobile = 'w-full rounded-md'
        const desktop = 'md:w-auto md:rounded-full'

        const inactive = 'hover:bg-accent hover:text-white'
        const active = 'font-bold text-primary md:bg-primary md:text-primary-foreground md:font-normal md:text-base'

        return `${base} ${mobile} ${desktop} ${isActive ? active : inactive}`
      }}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export const NavItems = ({ onNavItemClick }) => (
  <ul className="flex flex-col md:flex-row items-center justify-center gap-2 w-full">
    <li className="w-full md:w-auto flex justify-center">
      <NavButton to="/" onClick={onNavItemClick}>
        Inicio
      </NavButton>
    </li>
    <li className="w-full md:w-auto flex justify-center">
      <NavButton to="/servicios" onClick={onNavItemClick}>
        Servicios
      </NavButton>
    </li>
    <li className="w-full md:w-auto flex justify-center">
      <NavButton to="/mascotas" onClick={onNavItemClick}>
        Mascotas
      </NavButton>
    </li>
    <li className="w-full md:w-auto flex justify-center">
      <NavButton to="/citas" onClick={onNavItemClick}>
        Citas
      </NavButton>
    </li>
  </ul>
)
