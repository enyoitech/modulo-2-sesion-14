import React, { FC } from 'react'

interface IProps{
    countTask: number
}

export const Navbar: FC<IProps> = ({countTask}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white">
        <div className="container-fluid">
            <span> Contador tareas {countTask | 0}</span>
        </div>
</nav>
  )
}
