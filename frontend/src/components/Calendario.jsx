

/**
 * Nome do Componente: Calendario
 *
 * Descrição Detalhada:
 *   Componente funcional React que renderiza um calendário interativo. Ele permite a navegação entre
 *   os meses e a seleção de dias, exibindo eventos associados a esses dias. O calendário utiliza 
 *   estados internos para controlar o mês atual, o ano atual e o dia selecionado.
 *
 * Observações Pertinentes:
 *   1. O calendário é populado com os dias do mês atual e as semanas são rotuladas com os dias da
 *      semana (Dom, Seg, Ter, etc.).
 *   2. A função fetchTarefas é chamada na montagem do componente para buscar tarefas do backend.
 *   3. A verificação de eventos é realizada com base em uma lista de eventos recebida como
 *      propriedade, e os dias com eventos são destacados.
 *   4. O formato de data usado para eventos é 'dd/mm/aaaa', e a função formatDate converte isso
 *      em objetos Date para comparação.
 *
 * Estrutura JSX:
 *   - Renderiza o cabeçalho do calendário com botões para navegar entre os meses.
 *   - Exibe os dias da semana e as células do calendário preenchidas com os dias do mês atual.
 *   - Cada dia do mês é clicável, permitindo a seleção e a chamada da função onSelectDate 
 *     com a data formatada correspondente ao dia selecionado.
 *
 * Parâmetros de Entrada:
 *   - events: Array de objetos - Lista de eventos a serem exibidos no calendário.
 *   - onSelectDate: Função - Callback chamada ao selecionar um dia, recebendo a data formatada.
 *
 */

import React, { useEffect, useState } from 'react';
import '../StylesPages/Calendario.css';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const Calendario = ({ onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]); // Estado para armazenar eventos

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Função fetchTarefas para buscar as tarefas de um usuário e atualizar o estado com os dados recebidos
  //
  // Alterado em 12/11/2024
  // Parâmetros de entrada:
  // - Nenhum
  // Retorno:
  // - Atualiza o estado com as tarefas recebidas do servidor e exibe os dados no console
  // Esta função realiza uma requisição HTTP para buscar as tarefas de um usuário específico. O ID do usuário é recuperado
  // do localStorage e enviado para o servidor no corpo da requisição. Caso a requisição seja bem-sucedida, as tarefas
  // são armazenadas no estado de eventos e exibidas no console. Em caso de erro, a função exibe uma mensagem de erro no console.
  const fetchTarefas = async () => {
    const usuarioId = localStorage.getItem('ID');
    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: "carregar_todas_tarefas", dados: { usuarioId } })
      });
      const resultado = (await resposta.json()).dados_tarefa;
      setEvents(resultado); // Armazena as tarefas no estado de eventos
      //console.log('resultado', resultado);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };


  // Efeito que busca as tarefas ao montar o componente, chamando a função fetchTarefas.
  useEffect(() => {
    fetchTarefas();
  }, []);


  // Função handlePrevMonth para alterar o mês atual para o mês anterior
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // Nenhum
  // Retorno:
  // Atualiza o estado do mês e do ano, ajustando para o mês anterior e limpando a seleção do dia
  // Esta função verifica se o mês atual é janeiro (0) e, se for, altera para dezembro (11) do ano anterior; 
  // caso contrário, apenas decrementa o mês atual. Além disso, limpa a seleção do dia ao mudar de mês.
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null); // Limpa a seleção ao mudar de mês
  };

  // Função handleNextMonth para alterar o mês atual para o próximo mês
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // Nenhum
  // Retorno:
  // Atualiza o estado do mês e do ano, ajustando para o próximo mês e limpando a seleção do dia
  // Esta função verifica se o mês atual é dezembro (11) e, se for, altera para janeiro (0) do próximo ano; 
  // caso contrário, apenas incrementa o mês atual. Além disso, limpa a seleção do dia ao mudar de mês.
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null); // Limpa a seleção ao mudar de mês
  };

  // Função formatDate para formatar uma string de data no formato 'YYYY-MM-DD' em um objeto Date
  //
  // Alterado em 12/11/2024
  // Parâmetros de entrada:
  // - dateString: uma string representando uma data no formato 'YYYY-MM-DD'
  // Retorno:
  // - Retorna um objeto Date com o ano, mês e dia extraídos da string dateString
  // Esta função divide a string de data na separação do hífen ('-'), converte cada parte para um número e cria
  // um objeto Date. O mês é subtraído em 1, pois em JavaScript os meses começam do índice 0 (janeiro é 0, fevereiro é 1, etc.).
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Cria uma data com o ano, mês e dia
  };

  // Função hasEvent para verificar se há um evento em um dia específico
  //
  // Alterado em 12/11/2024
  // Parâmetros de entrada:
  // - day: o dia do mês que será verificado para a presença de um evento
  // Retorno:
  // - Retorna um valor booleano (true ou false) indicando se existe um evento para o dia informado
  // Esta função verifica se algum evento na lista de eventos ocorre no dia específico. 
  // Para cada evento, a data é convertida para um objeto Date e comparada com o dia atual (com ano, mês e dia limpos).
  // A data do evento e a data atual são ajustadas para ignorar a hora e garantir que a comparação seja feita apenas
  // com o dia, mês e ano.

  const hasEvent = (day) => {
    return events.some(event => {
      if (!event) return false;

      const eventDate = formatDate(event); // Converte a data do evento para um objeto Date
      if (!eventDate) return false; // Ignora se a data do evento for inválida

      // Limpa a data de evento e a data atual para comparar apenas o dia, mês e ano
      const cleanedEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      const cleanedCurrentDate = new Date(currentYear, currentMonth, day + 1);

      // Verifica se a data do evento corresponde ao dia, mês e ano atual
      return cleanedEventDate.getTime() === cleanedCurrentDate.getTime();
    });
  };

  // Função handleDayClick para processar o clique em um dia específico no calendário
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // day - número - dia do mês que foi clicado
  // Retorno:
  // Atualiza o estado com o dia selecionado e chama a função onSelectDate com a data formatada
  // Esta função ignora cliques no mesmo dia, define o novo dia selecionado, 
  // e formata a data selecionada no formato 'aaaa-mm-dd' antes de passá-la para a função onSelectDate.
  const handleDayClick = (day) => {
    if (selectedDay === day) return; // Ignora cliques no mesmo dia

    setSelectedDay(day); // Define o novo dia selecionado
    const selectedDate = `${currentYear}-${currentMonth + 1}-${day + 1}`;
    onSelectDate(selectedDate);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2 className='calendario-mes'>{months[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week">
            {day}
          </div>
        ))}
        {[...Array(firstDayOfMonth).fill(null)].map((_, index) => (
          <div key={`empty-${index}`} className="empty-day"></div>
        ))}
        {[...Array(daysInMonth).keys()].map((day) => (
          <div
            key={day}
            className={`day ${selectedDay === day ? 'selected-day' : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <span className="day-number">{day + 1}</span>
            {hasEvent(day) && <span className="event-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;

