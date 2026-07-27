import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Certificat, AutoEcole, Eleve, User } from '../types';

export interface GeneratePdfOptions {
  elementId?: string;
  certificat: Certificat | null;
  eleve: Eleve;
  user: User | { name: string; email: string };
  autoEcole: AutoEcole | null;
}

export const generateCertificatePDF = async ({
  elementId = 'certificate-render-node',
  certificat,
  eleve,
  user,
  autoEcole,
}: GeneratePdfOptions): Promise<boolean> => {
  try {
    const certElement = document.getElementById(elementId);

    if (certElement) {
      // High resolution html2canvas export
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `Certificat_Matoa_${eleve.codeEleveUnique || 'eleve'}.pdf`;
      pdf.save(fileName);
      return true;
    } else {
      // Fallback programmatically styled PDF generation with Auto-École Branding Colors
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const primaryColor = autoEcole?.couleursTheme?.primaryColor || '#2563eb';
      const secondaryColor = autoEcole?.couleursTheme?.secondaryColor || '#059669';

      // Outer Decorative Border
      pdf.setLineWidth(2);
      pdf.setDrawColor(37, 99, 235);
      pdf.rect(10, 10, 277, 190);

      pdf.setLineWidth(0.5);
      pdf.setDrawColor(217, 119, 6);
      pdf.rect(13, 13, 271, 184);

      // Header Brand
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text('PLATAFORME MATOA', 148.5, 30, { align: 'center' });

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text('Attestation Officielle de Réussite Théorique du Code de la Route', 148.5, 38, { align: 'center' });

      // Auto-École Name Header
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.text(`Établissement : ${autoEcole?.name || 'Auto-École Agrée'}`, 148.5, 52, { align: 'center' });

      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(180, 83, 9); // Gold Accent
      pdf.text('CERTIFICAT DE FIN DE FORMATION', 148.5, 75, { align: 'center' });

      // Body text
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(51, 65, 85);
      pdf.text('Le présent document certifie que l\'élève :', 148.5, 92, { align: 'center' });

      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(user.name.toUpperCase(), 148.5, 108, { align: 'center' });

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Code Élève Unique : ${eleve.codeEleveUnique} | Email : ${user.email}`, 148.5, 116, { align: 'center' });

      // Validation Text
      pdf.setFontSize(11);
      pdf.setTextColor(30, 41, 59);
      const textLine1 = `A suivi et validé avec succès 100% des modules théoriques de sécurité routière`;
      const textLine2 = `dispensés par ${autoEcole?.name || 'l\'Auto-École'} conformément aux règles réglementaires.`;
      pdf.text(textLine1, 148.5, 132, { align: 'center' });
      pdf.text(textLine2, 148.5, 140, { align: 'center' });

      // Footer Signatures & Date
      const emissionDate = certificat?.dateEmission
        ? new Date(certificat.dateEmission).toLocaleDateString('fr-FR')
        : new Date().toLocaleDateString('fr-FR');

      const certCode = certificat?.certificateCode || `CERT-2026-MATOA-${Math.floor(10000 + Math.random() * 90000)}`;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Date d'Émission : ${emissionDate}`, 30, 170);
      pdf.text(`Code Vérification : ${certCode}`, 30, 178);

      pdf.setFontSize(10);
      pdf.text('Cachet Numérique de Validation', 210, 170);
      pdf.text('Matoa SaaS Certification Engine', 210, 178);

      pdf.save(`Certificat_Matoa_${eleve.codeEleveUnique || 'eleve'}.pdf`);
      return true;
    }
  } catch (error) {
    console.error('Error generating PDF Certificate:', error);
    return false;
  }
};
