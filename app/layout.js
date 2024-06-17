// app/layout.jsx
import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import './styles/globals.css';

const Layout = ({ children }) => {
  return (
      <html lang="es">
      <head>
          <title>Rifas de carros en USA - Gana Autos de Lujo con Nuestras Rifas Exclusivas</title>
          <meta name="description" content="Participa en nuestras rifas de carros en los Estados Unidos y gana autos de lujo. ¡Únete ahora y ten la oportunidad de conducir el auto de tus sueños!" />
          <meta name="keywords" content="rifas de autos, USA, ganar autos, rifas de autos de lujo, sorteos de autos, concursos de autos" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#000000" />
      </head>
      <body>

        <Navbar/>
        <Notifications />
        <main style={{ paddingBottom: '90px' }}>{children}</main>
        <FloatingNavbar/>
      </body>
      </html>
  );
};

export default Layout;

