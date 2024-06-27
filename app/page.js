import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.mainTitle}>
                    Rifas de Carros
                    <span style={styles.subtitle}>en Estados Unidos</span>
                </h1>
                <p style={styles.description}>
                    ¿Sueñas con conducir un auto de lujo? Participa en nuestras rifas exclusivas y haz realidad tu sueño de ganar un carro de alta gama.
                </p>
                <div style={styles.prizeSection}>
                    <h2 style={styles.prizeTitle}>Gana Autos de Lujo</h2>
                    <h3 style={styles.prize}>Valorados en $80,000</h3>
                    <p style={styles.prizeDescription}>
                        Exclusivo para residentes de los EE. UU. ¡No pierdas esta oportunidad única!
                    </p>
                </div>
                <Link href="/raffles" passHref>
                    <button style={styles.button}>Participa Ahora</button>
                </Link>
                <div style={styles.carImageContainer}>
                    <Image
                        src="/car.png"
                        alt="chevy silverado hd car"
                        width={600}
                        height={300}
                        layout="responsive"
                    />
                </div>
            </div>
            <div style={styles.content}>
                <h2 style={styles.sectionTitle}>Cómo Participar en Nuestras Rifas de Carros</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Regístrate en nuestra plataforma</li>
                    <li style={styles.listItem}>Elige tu rifa y compra tus boletos</li>
                    <li style={styles.listItem}>Espera el sorteo mensual en vivo</li>
                    <li style={styles.listItem}>¡Si ganas, recibe tu carro de lujo!</li>
                </ul>

                <h2 style={styles.sectionTitle}>Ventajas de Nuestras Rifas de Carro</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Oportunidad de ganar carros de lujo valorados en $80,000</li>
                    <li style={styles.listItem}>Sorteos mensuales con múltiples ganadores</li>
                    <li style={styles.listItem}>Proceso transparente y legalmente verificado</li>
                    <li style={styles.listItem}>Apoyo a diversas causas benéficas con cada participación</li>
                    <li style={styles.listItem}>Únete a una comunidad apasionada de entusiastas del automóvil</li>
                    <li style={styles.listItem}>Atención al cliente 24/7 en español e inglés</li>
                </ul>

                <h2 style={styles.sectionTitle}>Próximos Sorteos de Carros de Lujo</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}>15 de Julio: Mercedes-Benz S-Class 2024</li>
                    <li style={styles.listItem}>15 de Agosto: BMW X7 2024</li>
                    <li style={styles.listItem}>15 de Septiembre: Audi e-tron GT 2024</li>
                </ul>

                <h2 style={styles.sectionTitle}>Testimonios de Ganadores Felices</h2>
                <p style={styles.text}>
                    "Jamás imaginé que ganaría un auto de lujo. El proceso fue sencillo y transparente. ¡Ahora conduzco mi Mercedes de ensueño!" - Juan Pérez, ganador de Julio 2023
                </p>
                <p style={styles.text}>
                    "Participar en RifasDeCarros.com cambió mi vida. El equipo fue increíblemente servicial y ahora disfruto de mi nuevo BMW. ¡Gracias!" - María García, ganadora de Marzo 2024
                </p>

                <h2 style={styles.sectionTitle}>¿Listo para Cambiar tu Vida?</h2>
                <p style={styles.text}>
                    No dejes pasar esta oportunidad única de ganar el auto de tus sueños. ¡Participa ahora y sé nuestro próximo ganador!
                </p>
                <Link href="/raffles" passHref>
                    <button style={styles.button}>Ver Todos los Sorteos</button>
                </Link>
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
        background: 'linear-gradient(45deg, #1a5f7a, #051923)', // New background color
        color: 'white',
        position: 'relative',
        paddingBottom: '20px', // Reduced padding to keep image inside
        overflow: 'hidden', // This will keep the image inside
    },
    carImageContainer: {
        position: 'relative', // Changed from absolute to relative
        marginTop: '20px', // Add some space above the image
        width: '100%', // Ensure the container takes full width
        height: '200px', // Set a fixed height for the image container
    },
    mainTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: '#ffd700',
        marginBottom: '0.5rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        lineHeight: '1.2',
    },
    subtitle: {
        display: 'block',
        fontSize: '2.5rem',
        color: '#fff',
        marginTop: '0.5rem',
    },
    description: {
        fontSize: '1.25rem',
        color: '#fff',
        marginBottom: '1.5rem',
        maxWidth: '80%',
        margin: '0 auto 1.5rem',
    },
    prizeSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
    },
    prizeTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#ffd700',
        marginBottom: '0.5rem',
    },
    prize: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#ffd700',
        marginBottom: '1rem',
    },
    prizeDescription: {
        fontSize: '1.1rem',
        color: '#fff',
    },
    button: {
        fontSize: '1.25rem',
        padding: '0.75rem 2rem',
        background: 'linear-gradient(45deg, #ffd700, #ffa500)',
        color: '#003366',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
        borderBottom: '2px solid #0077b6',
        paddingBottom: '0.5rem',
    },
    text: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '1.5rem',
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
        marginBottom: '1.5rem',
    },
    listItem: {
        fontSize: '1.25rem',
        color: '#555',
        marginBottom: '0.5rem',
        position: 'relative',
        paddingLeft: '30px',
    },
};

// Add this to apply the checkmark to list items
const additionalStyles = `
    .${styles.listItem}::before {
        content: '✓';
        color: #0077b6;
        position: absolute;
        left: 0;
        font-weight: bold;
    }
`;

export default HomePage;





