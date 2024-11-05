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

const Calendario = ({ events, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null); // Estado para o dia selecionado

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Função fetchTarefas para buscar todas as tarefas do usuário no backend
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // Nenhum
  // Retorno:
  // Realiza uma requisição POST para obter as tarefas do usuário e trata possíveis erros durante a busca
  // Esta função utiliza o ID do usuário armazenado no localStorage, envia uma requisição em formato JSON e, em caso de sucesso, recebe as tarefas do backend; 
  // se houver um erro, registra a mensagem de erro no console.
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
      console.log(resultado)

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

  // Função formatDate para converter uma string de data no formato 'dd/mm/aaaa' em um objeto Date
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // dateString - string - data no formato 'dd/mm/aaaa'
  // Retorno:
  // Retorna um objeto Date correspondente à data fornecida ou uma data inválida se os valores não forem válidos
  // Esta função divide a string de data em dia, mês e ano, converte os valores para números, 
  // e cria um novo objeto Date utilizando esses valores; se qualquer parte da data estiver ausente, retorna uma data inválida (NaN).
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
    return new Date(NaN);
  };

  // Função hasEvent para verificar se um determinado dia possui eventos associados
  // 
  // Alterado em 
  // Parâmetros de entrada:
  // day - número - dia do mês a ser verificado
  // Retorno:
  // Retorna um booleano indicando se existem eventos para o dia especificado
  // Esta função verifica se algum evento na lista de eventos ocorre no dia informado, 
  // convertendo a data do evento para um objeto Date; se a data for válida, compara o dia, mês e ano 
  // para determinar se há um evento correspondente ao dia fornecido.
  const hasEvent = (day) => {
    return events.some(event => {
      const eventDate = formatDate(event.data);
      if (isNaN(eventDate.getTime())) {
        return false;
      }
      return (
        eventDate.getDate() === day + 1 &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
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
