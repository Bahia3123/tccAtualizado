import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from "../assets/img/logo-curape.png";
import '../componentes/css/FormularioPrescricaoPD.css';

const FormularioPrescricaoPD = () => {
  const [formData, setFormData] = useState({
    podiatristName: "",
    categoriaName: "Podóloga",
    nccName: "",
    patientName: "",
    ingredients: [],
    usageInstructions: "",
    location: "",
    date: "",
    contact: {
      phone: "",
      email: "",
      instagram: "",
      facebook: ""
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
      podiatristName: ` ${value}`
    }));
  };

  const generatePDF = () => {
  const doc = new jsPDF('p', 'pt', 'A5');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 40;
  let y = 60;

  const black = [0, 0, 0];
  const gray = [100, 100, 100];
  
  const logoWidth = 40; 
  const logoHeight = 40; 
  const logoX = margin;
  const logoY = 30;
  
  doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...black);
  const textX = logoX + logoWidth + 10; 
  const textY = logoY + (logoHeight / 2) + 5; 
  doc.text("CuraPé", textX, textY);
  
  y = logoY + logoHeight + 20; 
  doc.setLineWidth(0.5);
  doc.setDrawColor(...gray);
  doc.line(margin, y, pageWidth - margin, y);
  y += 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...black);
  doc.text("Indicação Terapêutica Manipulada", pageWidth / 2, y, { align: "center" });
  y += 6;

  y += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(...gray);
  doc.line(margin, y, pageWidth - margin, y);

  y += 30;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Paciente:  ${formData.patientName || "_________________________"}`, margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
doc.setFontSize(9);

doc.text("Solicito ao farmacêutico responsável, a manipulação da seguinte indicação terapêutica", margin, y);
y += 10; 
doc.text("para o paciente acima:", margin, y);
y += 30; 

doc.setFont("helvetica", "bold");
doc.text("Indicação terapêutica:", margin, y);
y += 15; 

  doc.setFont("helvetica", "bold");
  formData.ingredients.forEach((ingredient) => {
    doc.text(`• ${ingredient.name || "-"} - ${ingredient.concentration || "-"}`, margin + 10, y);
    y += 20;
  });

  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Modo de usar:", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  const usageLines = doc.splitTextToSize(formData.usageInstructions || "-", pageWidth - margin * 2);
  doc.text(usageLines, margin, y);
  y += usageLines.length * 15;

  y += 30;
  doc.setFont("helvetica", "bold");
  doc.text("Local e data:", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.text(`Local: ${formData.location || "________________"}`, margin, y);
  y += 20;
  doc.text(`Data: ${formData.date || "____/____/______"}`, margin, y);
  y += 40;


const lineWidth = 200;
const xStart = (pageWidth - lineWidth) / 2;
doc.line(xStart, y, xStart + lineWidth, y);
y += 15; 
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text(` ${formData.podiatristName || "_________________________"}`, pageWidth / 2, y, { align: "center" });
y += 15; 


doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text(` ${formData.categoriaName || "_________________________"}`, pageWidth / 2, y, { align: "center" });
y += 15; 

doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text(` ${formData.nccName || "_________________________"}`, pageWidth / 2, y, { align: "center" });
y += 15; 

  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Contato:", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9)
  doc.text(`Telefone: ${formData.contact.phone || "-"}`, margin, y);
  y += 15;
  doc.text(`Email: ${formData.contact.email || "-"}`, margin, y);
  y += 15;
  doc.text(`Instagram: ${formData.contact.instagram || "-"}`, margin, y);
  y += 15;
  doc.text(`Facebook: ${formData.contact.facebook || "-"}`, margin, y);

  doc.save("receituario_podologico.pdf");
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
          placeholder='Nome profissional'
        />
        <input 
          type="text"
          name="nccName"
          value={formData.nccName}
          onChange={handleInputChange}
          className="input-large"
          placeholder='N° concelho de classe'
        />
        
        <input disabled
          type="text"
          name="categoriaName"
          value={formData.categoriaName}
          onChange={handleInputChange}
          className="input-large"
          placeholder="Categoria profissional"
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
          placeholder='Nome do paciente'

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
              placeholder="Medicamento"
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
        <button type="button" onClick={addIngredient} className="add-ingredient-button">Adicionar Medicamento</button>
      </div>

      <div className="usage-section">
        <h3 className="section-title">Modo de usar:</h3>
        <textarea
          name="usageInstructions"
          value={formData.usageInstructions}
          onChange={handleInputChange}
          className="textarea-large"
          placeholder='Descreva o modo de usar'

        />
      </div>

      <div className="divider"></div>

      <div className="location-date-section">
        <input abileted
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="input-medium"
          placeholder='Local de atendimento'

        />
        <input abileted
          type="text"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input-medium"
          placeholder='Data'

        />
      </div>

      <div className="divider"></div>

      <div className="contact-section">
        <h3 className="section-title">
          <input abileted
            type="text"
            value={formData.podiatristName.replace("Podóloga ", "")}
            onChange={handleNameOnlyChange}
            placeholder="Nome da Podóloga"
            className="input-medium"
          />
        </h3>

        <div className="contact-info">
          <input abileted
            type="text"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="Telefone"
            className="input-medium"
          />
          <input abileted
            type="text"
            value={formData.contact.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="Email"
            className="input-medium"
          />
          <input abileted
            type="text"
            value={formData.contact.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            placeholder="Instagram"
            className="input-medium"
          />
          <input abileted
            type="text"
            value={formData.contact.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            placeholder="Facebook"
            className="input-medium"
          />
        </div>
      </div>

      <div className="actions">
        <button type="button" onClick={generatePDF} className="action-button">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default FormularioPrescricaoPD;
