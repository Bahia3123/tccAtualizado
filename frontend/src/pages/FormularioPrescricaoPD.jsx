import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../componentes/css/FormularioPrescricaoPD.css';

const FormularioPrescricaoPD = () => {
  const [formData, setFormData] = useState({
    podiatristName: "Podóloga Cristiane Barbosa",
    patientName: "",
    ingredients: [
      { name: "Hexatrate", concentration: "5%" },
      { name: "Cloridrato de alumínio", concentration: "10%" },
      { name: "Extrato de Própolis", concentration: "10%" },
      { name: "Extrato Glicólico de Manuka", concentration: "5%" },
      { name: "Extrato de Aloe Vera", concentration: "5%" },
      { name: "Álcool Etílico", concentration: "70% qsp 30 ml - spray" },
    ],
    usageInstructions: "De 2 a 4 vezes por dia, borrifar nas areas em tratamento.",
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Cores verdes modernas
    const primaryColor = [34, 139, 34]; // Forest Green (verde principal)
    const secondaryColor = [220, 240, 220]; // Verde muito claro para linhas alternadas
    const black = [0, 0, 0];

    // Cabeçalho
    doc.setTextColor(...primaryColor);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("Prescrição Médica", pageWidth / 2, 25, { align: "center" });

    // Linha horizontal abaixo do título — fina e com cor verde suave
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(1);
    doc.line(20, 30, pageWidth - 20, 30);

    // Nome da podóloga e paciente - com margem e espaçamento elegante
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...black);
    doc.text(`Podóloga: ${formData.podiatristName}`, 20, 45);
    doc.text(`Paciente: ${formData.patientName || "-"}`, 20, 55);

    // Ingredientes título - verde e destacado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Ingredientes:", 20, 70);

    const ingredientsRows = formData.ingredients.map(ingredient => [
      ingredient.name || "-",
      ingredient.concentration || "-"
    ]);

    // Tabela de ingredientes com estilo moderno e clean
    doc.autoTable({
      head: [['Nome do Ingrediente', 'Concentração']],
      body: ingredientsRows,
      startY: 75,
      styles: {
        fontSize: 11,
        cellPadding: 4,
        textColor: [34, 34, 34],
        font: "helvetica"
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: { fillColor: secondaryColor },
      margin: { left: 20, right: 20 },
      theme: "striped",
    });

    // Modo de usar - título destacado com espaço confortável
    let yAfterTable = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Modo de Usar:", 20, yAfterTable);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...black);

    const splitUsage = doc.splitTextToSize(formData.usageInstructions || "-", pageWidth - 40);
    doc.text(splitUsage, 20, yAfterTable + 10);

    // Local e data
    let yAfterUsage = yAfterTable + 10 + splitUsage.length * 7 + 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Local e Data:", 20, yAfterUsage);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...black);
    doc.text(`Local: ${formData.location || "-"}`, 20, yAfterUsage + 10);
    doc.text(`Data: ${formData.date || "-"}`, 20, yAfterUsage + 20);

    // Informações de contato
    let yAfterLocDate = yAfterUsage + 45;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text("Informações de Contato:", 20, yAfterLocDate);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...black);
    doc.text(`Telefone: ${formData.contact.phone || "-"}`, 20, yAfterLocDate + 12);
    doc.text(`Email: ${formData.contact.email || "-"}`, 20, yAfterLocDate + 22);
    doc.text(`Instagram: ${formData.contact.instagram || "-"}`, 20, yAfterLocDate + 32);
    doc.text(`Facebook: ${formData.contact.facebook || "-"}`, 20, yAfterLocDate + 42);

    // Assinatura centralizada com linha fina e elegante
    let yAfterContact = yAfterLocDate + 70;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.7);
    const sigLineWidth = 90;
    const sigX = (pageWidth - sigLineWidth) / 2;
    doc.line(sigX, yAfterContact, sigX + sigLineWidth, yAfterContact);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    doc.text(formData.podiatristName, pageWidth / 2, yAfterContact + 12, { align: "center" });

    // Salvar PDF
    doc.save("prescricao_medica.pdf");
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
        <button type="button" onClick={generatePDF} className="action-button">
          Salvar
        </button>
      </div>
    </div>
  );
};

export default FormularioPrescricaoPD;
