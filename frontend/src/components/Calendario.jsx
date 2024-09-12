import React, { useState } from 'react';
import '../StylesPages/Calendario.css';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const Calendario = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Função para normalizar as datas no formato dd,mm,yyyy
  const formatDate = (dateString) => {
    // Divida a string da data em partes usando '/' como delimitador
    const [day, month, year] = dateString.split('/').map(Number);
  
    // Verifica se a data tem três partes e todas são números
    if (day && month && year) {
      // Ajusta o mês para ser zero-indexed e cria a data
      return new Date(year, month - 1, day);
    }
  
    // Se a data não for válida, retorna um objeto de data inválido
    return new Date(NaN);
  };
  
  

  const hasEvent = (day) => {
    console.log('Verificando dia:', day + 1);  // Adiciona log para depuração
  
    return events.some(event => {
      const eventDate = formatDate(event.data);  // Converte a data do evento
      console.log('Data do evento formatada:', eventDate);  // Log para verificar a data formatada
  
      // Verifica se a data formatada é válida
      if (isNaN(eventDate.getTime())) {
        console.error('Data do evento inválida:', event.data);
        return false;
      }
  
      return (
        eventDate.getDate() === day + 1 &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
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
          <div key={day} className="day">
            <span className="day-number">{day + 1}</span>
            {hasEvent(day) && <span className="event-dot"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
