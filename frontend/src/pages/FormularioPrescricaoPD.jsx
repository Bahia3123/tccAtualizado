import React, { useState } from 'react';
import './FormularioPrescricaoPD.css';

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
    usageInstructions: "de 2 a 3 vezes ao dia, borrifar nas áreas em tratamento e aguardar evaporação antes de calçar sapato fechado",
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

  return (
    <div className="prescription-form" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          name="podiatristName"
          value={formData.podiatristName}
          onChange={handleInputChange}
          style={{ width: '100%', fontSize: '24px', textAlign: 'center', border: '1px solid #ddd', padding: '5px' }}
        />
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <p>Solicito ao farmacêutico responsável, a manipulação da seguinte indicação terapêutica para</p>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          style={{ width: '100%', border: '1px solid #ddd', padding: '5px' }}
        />
      </div>

      <h2 style={{ marginBottom: '10px' }}>Para uso tópico</h2>
      
      <div style={{ marginBottom: '20px' }}>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>•</span>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              style={{ flex: 2, marginRight: '10px', border: '1px solid #ddd', padding: '5px' }}
              placeholder="Nome do ingrediente"
            />
            <input
              type="text"
              value={ingredient.concentration}
              onChange={(e) => handleIngredientChange(index, 'concentration', e.target.value)}
              style={{ flex: 1, border: '1px solid #ddd', padding: '5px' }}
              placeholder="Concentração"
            />
            <button 
              onClick={() => removeIngredient(index)}
              style={{ marginLeft: '10px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}
            >
              Remover
            </button>
          </div>
        ))}
        <button 
          onClick={addIngredient}
          style={{ background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 15px', cursor: 'pointer', marginTop: '10px' }}
        >
          Adicionar Ingrediente
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Modo de usar:</h3>
        <textarea
          name="usageInstructions"
          value={formData.usageInstructions}
          onChange={handleInputChange}
          style={{ width: '100%', height: '80px', border: '1px solid #ddd', padding: '5px' }}
        />
      </div>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          style={{ width: '45%', border: '1px solid #ddd', padding: '5px' }}
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          style={{ width: '45%', border: '1px solid #ddd', padding: '5px' }}
        />
      </div>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ textAlign: 'center' }}>
        <h3>
          <input
            type="text"
            value={formData.podiatristName.split("Podóloga ")[1] || formData.podiatristName}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              podiatristName: `Podóloga ${e.target.value}`
            }))}
            style={{ width: '100%', textAlign: 'center', border: '1px solid #ddd', padding: '5px', fontWeight: 'bold' }}
          />
        </h3>
        
        <div style={{ margin: '15px 0' }}>
          <p>Contato:</p>
          <input
            type="text"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            style={{ width: '100%', marginBottom: '5px', border: '1px solid #ddd', padding: '5px' }}
            placeholder="Telefone"
          />
          <input
            type="text"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            style={{ width: '100%', marginBottom: '5px', border: '1px solid #ddd', padding: '5px' }}
            placeholder="Email"
          />
          <input
            type="text"
            value={formData.contact.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            style={{ width: '100%', marginBottom: '5px', border: '1px solid #ddd', padding: '5px' }}
            placeholder="Instagram"
          />
          <input
            type="text"
            value={formData.contact.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            style={{ width: '100%', border: '1px solid #ddd', padding: '5px' }}
            placeholder="Facebook"
          />
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button 
          style={{ 
            background: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            padding: '10px 20px', 
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
          onClick={() => console.log('Form data:', formData)}
        >
          Salvar Prescrição
        </button>
        <button 
          style={{ 
            background: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            padding: '10px 20px', 
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => window.print()}
        >
          Imprimir Prescrição
        </button>
      </div>
    </div>
  );
};

export default FormularioPrescricaoPD;