/**
 * Nome do Componente: WelcomePage
 *
 * Descrição Detalhada:
 *   O componente funcional `WelcomePage` exibe uma mensagem de boas-vindas ao usuário
 *   e permite que ele edite seu endereço de e-mail. A página recupera o e-mail do 
 *   `localStorage` quando o componente é montado, permitindo que o usuário veja seu 
 *   e-mail atual ou um valor padrão caso nenhum e-mail esteja armazenado.
 *
 * Estrutura JSX:
 *   - O componente renderiza uma estrutura condicional onde, se o estado `editingEmail`
 *     estiver ativo, um campo de entrada (`input`) é exibido para que o usuário possa 
 *     editar seu e-mail. Caso contrário, um título (`h1`) é exibido, que, ao ser clicado, 
 *     ativa o modo de edição.
 *
 * Elementos Principais:
 *   - `useEffect`: Hook utilizado para executar um efeito colateral ao montar o componente,
 *     que busca o e-mail armazenado no `localStorage` e atualiza o estado `email`.
 *   - `handleInputChange`: Função de manipulador de eventos que atualiza o estado do e-mail
 *     com o valor inserido no campo de entrada.
 *   - Condicional para renderizar um campo de entrada ou um título baseado no estado 
 *     `editingEmail`.
 *
 * Estilos:
 *   - O componente não possui estilos aplicados diretamente, mas pode ser estilizado
 *     através de CSS externo, se necessário.
 *
 * Notas Importantes:
 *   - O valor do e-mail deve ser definido corretamente no `localStorage` em outras partes
 *     do aplicativo antes que este componente seja renderizado para que o e-mail seja
 *     exibido corretamente.
 *   - O estado `email` não está sendo atualizado quando o campo de entrada é editado; 
 *     para isso, seria necessário adicionar uma lógica para atualizar o `localStorage` 
 *     quando o usuário terminar a edição (por exemplo, com um botão de "Salvar").
 *
 */

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

    // Função handleInputChange para atualizar o estado do email com o valor inserido no campo de entrada
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
