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

  const fetchTarefas = async () => {
    const usuarioId = localStorage.getItem('ID');

    try {
      const resposta = await fetch('http://10.135.60.24:8085/receber-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acao: "carregar_todas_tarefas", dados: {usuarioId} })
      });
      const resultado = await resposta.json();

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null); // Limpa a seleção ao mudar de mês
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null); // Limpa a seleção ao mudar de mês
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
    return new Date(NaN);
  };

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
