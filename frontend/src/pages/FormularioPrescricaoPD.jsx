import React, { useState } from 'react';
import '../componentes/css/FormularioPrescricaoPD.css';

const FormularioPrescricaoPD = () => {
  const [formData, setFormData] = useState({
    podiatristName: "Podóloga Cristiane Barbosa",
    patientName: "Davi Ricardo dos Santos Xavier",
    ingredients: [
      { name: "Hexatrate", concentration: "5%" },
      { name: "Cloridrato de alumínio", concentration: "10%" },
      { name: "Extrato de Própolis", concentration: "10%" },
      { name: "Extrato Glicólico de Manuka", concentration: "5%" },
      { name: "Extrato de Aloe Vera", concentration: "5%" },
      { name: "Álcool Etílico", concentration: "70% qsp 30 ml - spray" }
    ],
    usageInstructions: "De 2 a 3 vezes ao dia, borrifar nas áreas em tratamento e aguardar evaporação antes de calçar sapato fechado.",
    location: "Mogi Mirim",
    date: "13 de setembro de 2024",
    contact: {
      phone: "(19) 98985-0700",
      email: "cristianebarbosa.podologa@gmail.com",
      instagram: "@cb.podologia",
      facebook: "cb.podologia"
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", concentration: "" }]
    }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleNameOnlyChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      podiatristName: `Podóloga ${value}`
    }));
  };

  return (
    <div className="prescription-form">
      <div className="form-header">
        <input
          type="text"
          name="podiatristName"
          value={formData.podiatristName}
          onChange={handleInputChange}
          className="input-large"
        />
      </div>

      <div className="patient-section">
        <p>Solicito ao farmacêutico responsável, a manipulação da seguinte indicação terapêutica para:</p>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          className="input-medium"
        />
      </div>

      <h2 className="section-title">Para uso tópico</h2>

      <div className="ingredients-section">
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <span>•</span>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              placeholder="Nome do ingrediente"
              className="input-small"
            />
            <input
              type="text"
              value={ingredient.concentration}
              onChange={(e) => handleIngredientChange(index, 'concentration', e.target.value)}
              placeholder="Concentração"
              className="input-small"
            />
            <button type="button" onClick={() => removeIngredient(index)} className="remove-button">X</button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="add-ingredient-button">Adicionar Ingrediente</button>
      </div>

      <div className="usage-section">
        <h3 className="section-title">Modo de usar:</h3>
        <textarea
          name="usageInstructions"
          value={formData.usageInstructions}
          onChange={handleInputChange}
          className="textarea-large"
        />
      </div>

      <div className="divider"></div>

      <div className="location-date-section">
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="input-medium"
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input-medium"
        />
      </div>

      <div className="divider"></div>

      <div className="contact-section">
        <h3 className="section-title">
          <input
            type="text"
            value={formData.podiatristName.replace("Podóloga ", "")}
            onChange={handleNameOnlyChange}
            placeholder="Nome da Podóloga"
            className="input-medium"
          />
        </h3>

        <div className="contact-info">
          <input
            type="text"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="Telefone"
            className="input-medium"
          />
          <input
            type="text"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="Email"
            className="input-medium"
          />
          <input
            type="text"
            value={formData.contact.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            placeholder="Instagram"
            className="input-medium"
          />
          <input
            type="text"
            value={formData.contact.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            placeholder="Facebook"
            className="input-medium"
          />
        </div>
      </div>

      <div className="actions">
        <button type="button" onClick={() => console.log('Form data:', formData)} className="action-button">
          Salvar Prescrição
        </button>
        
      </div>
    </div>
  );
};

export default FormularioPrescricaoPD;
