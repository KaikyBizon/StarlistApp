import React, { useEffect, useState } from 'react';

function WelcomePage() {
    const [email, setEmail] = useState('');
    const [editingEmail, setEditingEmail] = useState(false);

    // Recupera o nome de usuário do localStorage quando o componente for montado
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setUsername(storedEmail);
        }
    }, []); // O segundo argumento [] garante que este efeito só será executado uma vez, após a montagem do componente

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
            {editingEmail ? (
                <input
                    type="text"
                    value={email}
                    onChange={handleInputChange}
                    autoFocus
                />
            ) : (
                <h1 onClick={() => setEditingEmail(true)}>
                    {email || 'Usuário'}
                </h1>
            )}
            <p>O login foi bem-sucedido.</p>
        </div>
    );
}

export default WelcomePage;
