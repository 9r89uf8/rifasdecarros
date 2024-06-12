import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.mainTitle}>Rifas de Autos en USA</h1>
                <p style={styles.description}>
                    ¿Sueñas con tener un auto de lujo? Participa en nuestras rifas exclusivas y ten la oportunidad de ganar el auto de tus sueños.
                </p>
                <p style={styles.description}>
                    Si vives en los Estados Unidos, puedes ganar:
                </p>
                <h3 style={styles.prize}>Autos de Lujo Valorados en $80,000</h3>
                <p style={styles.description}>
                    Disponible solo para participantes que vivan en los EE. UU.
                </p>
                <Link href="/raffles" passHref>
                    <button style={styles.button}>Participa Ahora</button>
                </Link>
            </div>
            <div style={styles.content}>
                <h2 style={styles.sectionTitle}>¿Cómo Funciona?</h2>
                <p style={styles.text}>
                    Participar en nuestras rifas de autos es muy sencillo. Regístrate, compra un boleto y ¡listo! Cada boleto te da una oportunidad de ganar un auto de lujo. Los sorteos se realizan mensualmente y los ganadores se anuncian en nuestro sitio web y en nuestras redes sociales.
                </p>
                <h2 style={styles.sectionTitle}>¿Por Qué Participar?</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Oportunidad de ganar autos de lujo valorados en $80,000</li>
                    <li style={styles.listItem}>Sorteos mensuales con múltiples ganadores</li>
                    <li style={styles.listItem}>Apoyo a diversas causas benéficas</li>
                    <li style={styles.listItem}>Únete a una comunidad de entusiastas de los autos</li>
                </ul>
                <h2 style={styles.sectionTitle}>Testimonios</h2>
                <p style={styles.text}>
                    "¡Ganar un auto en la rifa fue un sueño hecho realidad! El proceso fue fácil y el equipo fue increíblemente servicial." - Juan Pérez
                </p>
                <p style={styles.text}>
                    "Nunca pensé que ganaría, pero ahora estoy conduciendo un auto de lujo nuevo. ¡Lo recomiendo altamente!" - María García
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
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
        marginBottom: '20px',
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
    content: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        width: '100%',
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#003366',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        marginBottom: '1.5rem',
    },
    listItem: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '0.5rem',
    },
};

export default HomePage;





