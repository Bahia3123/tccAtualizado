import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const pdfRef = useRef();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, { name: "", concentration: "" }] }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  const gerarPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('prescricao_podologica.pdf');
    });
  };

  const nomeSemPrefixo = formData.podiatristName.replace('Podóloga ', '');

  return (
    <div className="prescription-form">
      <h1>
        <input
          type="text"
          name="podiatristName"
          value={formData.podiatristName}
          onChange={handleInputChange}
          className="input-title"
        />
      </h1>

      <div className="section">
        <p>Solicito ao farmacêutico responsável, a manipulação da seguinte indicação terapêutica para</p>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          className="input-full"
        />
      </div>

      <h2>Para uso tópico</h2>

      <div className="ingredient-list">
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <span>•</span>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              placeholder="Nome do ingrediente"
              className="input-ingredient-name"
            />
            <input
              type="text"
              value={ingredient.concentration}
              onChange={(e) => handleIngredientChange(index, 'concentration', e.target.value)}
              placeholder="Concentração"
              className="input-ingredient-concentration"
            />
            <button onClick={() => removeIngredient(index)} className="btn-remove">Remover</button>
          </div>
        ))}
        <button onClick={addIngredient} className="btn-add">Adicionar Ingrediente</button>
      </div>

      <div className="section">
        <h3>Modo de usar:</h3>
        <textarea
          name="usageInstructions"
          value={formData.usageInstructions}
          onChange={handleInputChange}
          className="textarea-usage"
        />
      </div>

      <hr />

      <div className="row">
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="input-half"
        />
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input-half"
        />
      </div>

      <hr />

      <div className="signature-block">
        <h3>
          <input
            type="text"
            value={formData.podiatristName.split("Podóloga ")[1] || formData.podiatristName}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, podiatristName: `Podóloga ${e.target.value}` }))
            }
            className="input-signature"
          />
        </h3>

        <div className="contact-info">
          <p>Contato:</p>
          <input disabled
            type="text"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="Telefone"
          />
          <input
            type="text"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={formData.contact.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            placeholder="Instagram"
          />
          <input
            type="text"
            value={formData.contact.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            placeholder="Facebook"
          />
        </div>
      </div>

      <div className="button-group">
        <button className="btn-save" onClick={gerarPDF}>Salvar Prescrição</button>
        <button className="btn-print" onClick={() => window.print()}>Imprimir Prescrição</button>
      </div>

      {/* Layout Oculto para o PDF */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }} ref={pdfRef}>
        <div style={{ width: '210mm', padding: '20mm', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1>{formData.podiatristName}</h1>
          </div>

          <div>
            <p>Solicito ao farmacêutico responsável, a manipulação da seguinte indicação terapêutica para <strong>{formData.patientName}</strong>.</p>
            <h3>Para uso tópico</h3>
            <ul>
              {formData.ingredients.map((ing, index) => (
                <li key={index}>{ing.name} {ing.concentration}</li>
              ))}
            </ul>
            <p><strong>Modo de usar:</strong> {formData.usageInstructions}</p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <p>{formData.location}, {formData.date}</p>
            <p>__________________________</p>
            <p>{nomeSemPrefixo} - Podóloga</p>
          </div>

          <div style={{ marginTop: '30px', fontSize: '12px' }}>
            <p>Contato: {formData.contact.phone} | Email: {formData.contact.email}</p>
            <p>Instagram: {formData.contact.instagram} | Facebook: {formData.contact.facebook}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioPrescricaoPD;
