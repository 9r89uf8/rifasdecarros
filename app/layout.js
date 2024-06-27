// app/layout.jsx
import React from 'react';
import Navbar from "@/app/components/Navbar";
import FloatingNavbar from "@/app/components/FloatingNavbar";
import Notifications from "@/app/components/Notifications";
import './styles/globals.css';

function generateSchemaMarkup() {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "RifasDeCarros.com",
        "url": "https://www.rifasdecarros.com",
        "description": "Rifas de carros. Participa en rifas exclusivas de autos de lujo en Estados Unidos. Oportunidad de ganar vehículos valorados en $80,000.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.rifasdecarros.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return {
        __html: JSON.stringify(schemaData)
    };
}

const Layout = ({ children }) => {
    return (
        <html lang="es">
        <head>
            <title>Rifas de Carros en USA | Gana Autos de Lujo Valorados en $80,000 | RifasDeCarros.com</title>
            <meta name="description" content="Participa en rifas exclusivas de autos de lujo en Estados Unidos. Oportunidad de ganar vehículos valorados en $80,000. Sorteos mensuales, proceso sencillo. ¡Haz realidad tu sueño de conducir un auto de lujo!" />
            <meta name="keywords" content="rifas de autos, USA, ganar autos, rifas de autos de lujo, sorteos de autos, concursos de autos, autos $80,000, rifas exclusivas" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#003366" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.rifasdecarros.com/" />
            <meta property="og:title" content="Rifas de Carros en USA | Gana Autos de Lujo | RifasDeCarros.com" />
            <meta property="og:description" content="Participa en rifas exclusivas de autos de lujo en Estados Unidos. Oportunidad de ganar vehículos valorados en $80,000. ¡Haz realidad tu sueño!" />
            <meta property="og:image" content="https://www.rifasdecarros.com/og-image.jpg" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.rifasdecarros.com/" />
            <meta property="twitter:title" content="Rifas de Carros en USA | Gana Autos de Lujo | RifasDeCarros.com" />
            <meta property="twitter:description" content="Participa en rifas exclusivas de autos de lujo en Estados Unidos. Oportunidad de ganar vehículos valorados en $80,000. ¡Haz realidad tu sueño!" />
            <meta property="twitter:image" content="https://www.rifasdecarros.com/twitter-image.jpg" />

            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={generateSchemaMarkup()}
            />
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


