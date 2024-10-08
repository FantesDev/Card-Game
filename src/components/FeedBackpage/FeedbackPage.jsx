import React, { useState } from 'react';
import './FeedbackPage.css';

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', feedback: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <h2 className='title'>Feedback</h2>
      <p className='sobre'>
        Este projeto foi desenvolvido como parte de uma disciplina do curso de Análise e Desenvolvimento de Sistemas (ADS). É um projeto básico, mas que pode ser melhorado em várias áreas.
      </p>
      <div className="form-container">
        {submitted ? (
          <p className="submission-message">Sua mensagem foi enviada com sucesso!</p>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Como podemos melhorar?"
                required
              />
            </div>
            <button type="submit" className="form-submit-btn">Enviar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
