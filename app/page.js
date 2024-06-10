import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Quinielas Liga MX - Gana Dinero Real Jugando Quinielas de Fútbol Mexicano',
    description: 'Participa en las mejores quinielas de la Liga MX y gana hasta 65,000 pesos. ¡Únete a la comunidad de aficionados al fútbol mexicano y gana premios en efectivo!',
};

const HomePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.mainTitle}>Quinielas Liga MX</h1>
                <h2 style={styles.subtitle}>2024-2025</h2>
                <p style={styles.description}>
                    ¿Te gusta el fútbol o eres bueno adivinando los ganadores de los partidos de la liga mx?
                </p>
                <p style={styles.description}>
                    Si vives en Estado Unidos puedes ganar:
                </p>
                <h3 style={styles.prize}>8,000 mil dólares</h3>
                <p style={styles.description}>
                    Si vives en México puedes ganar:
                </p>
                <h3 style={styles.prize}>120,000 mil pesos</h3>
                <p style={styles.description}>
                    Disponible solo para jugadores en Estados Unidos y México.
                </p>
                <Link href="/quinielas" passHref>
                    <button style={styles.button}>Juega Ahora</button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        padding: '20px',
    },
    header: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
    },
    mainTitle: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    description: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    prize: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#0077b6',
        marginBottom: '1.5rem',
    },
    button: {
        fontSize: '1.25rem',
        padding: '0.75rem 2rem',
        background: 'linear-gradient(45deg, #0077b6, #023e8a)',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    },
};

export default HomePage;



