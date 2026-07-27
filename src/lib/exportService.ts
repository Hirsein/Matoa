import jsPDF from 'jspdf';
import { Eleve } from '../types';

export const exportStudentsToCSV = (students: any[], filename = 'eleves_matoa.csv') => {
  if (!students || students.length === 0) {
    alert('Aucun élève à exporter.');
    return;
  }

  const headers = ['Code Élève', 'Nom', 'Email', 'Téléphone', 'Progression (%)', 'Période Début', 'Période Fin', 'Statut'];
  const rows = students.map((e) => {
    const user = e.user || {};
    const status = e.isBlocked
      ? 'Bloqué'
      : e.progressionGlobal >= 100
      ? 'Certifié'
      : 'Actif';
    return [
      e.codeEleveUnique || '',
      user.name || '',
      user.email || '',
      user.phone || '',
      `${e.progressionGlobal || 0}%`,
      e.dateDebutFormation || '',
      e.dateFinFormation || '',
      status,
    ];
  });

  // Include UTF-8 BOM for Microsoft Excel compatibility
  let csvContent = '\uFEFF';
  csvContent += headers.map((h) => `"${h}"`).join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportLogsToCSV = (logs: any[], filename = 'logs_activite_matoa.csv') => {
  if (!logs || logs.length === 0) {
    alert('Aucun log à exporter.');
    return;
  }

  const headers = ['ID', 'Date & Heure', 'Acteur', 'Rôle', 'Auto-École', "Type d'action", 'Description'];
  const rows = logs.map((log) => {
    const actor = typeof log.actorUser === 'object' ? log.actorUser?.name || log.actorUser?.email || 'N/A' : log.actorUser || 'N/A';
    const school = typeof log.autoEcole === 'object' ? log.autoEcole?.name || log.autoEcole?.codeAutoEcoleUnique || 'N/A' : log.autoEcole || 'N/A';
    const formattedDate = log.timestamp ? new Date(log.timestamp).toLocaleString('fr-FR') : 'N/A';

    return [
      log._id || '',
      formattedDate,
      actor,
      log.actorRole || '',
      school,
      log.typeAction || '',
      log.description || '',
    ];
  });

  let csvContent = '\uFEFF';
  csvContent += headers.map((h) => `"${h}"`).join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportLogsToJSON = (logs: any[], filename = 'logs_activite_matoa.json') => {
  if (!logs || logs.length === 0) {
    alert('Aucun log à exporter.');
    return;
  }

  const jsonContent = JSON.stringify(logs, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportDashboardStatsToPDF = (
  title: string,
  stats: any,
  students: any[] = [],
  filename = 'rapport_statistiques_matoa.pdf'
) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header Branding
    pdf.setFillColor(37, 99, 235); // Blue
    pdf.rect(0, 0, 210, 25, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text('MATOA SAAS AUTO-ÉCOLES', 14, 16);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR')}`, 140, 16);

    // Title Section
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(title.toUpperCase(), 14, 38);

    // Key Statistics Cards
    pdf.setFontSize(11);
    pdf.setTextColor(30, 41, 59);

    const startY = 48;
    const cardWidth = 88;
    const cardHeight = 22;

    // Stat 1: Total Students
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(14, startY, cardWidth, cardHeight, 3, 3, 'FD');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text('TOTAL ÉLÈVES INSCRITS', 18, startY + 7);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(String(stats?.totalStudents || 0), 18, startY + 16);

    // Stat 2: Active Students
    pdf.setFont('helvetica', 'normal');
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(108, startY, cardWidth, cardHeight, 3, 3, 'FD');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text('ÉLÈVES ACTIFS EN COURS', 112, startY + 7);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(16, 185, 129);
    pdf.text(String(stats?.activeStudents || 0), 112, startY + 16);

    // Stat 3: Avg Progress
    const startY2 = startY + cardHeight + 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(14, startY2, cardWidth, cardHeight, 3, 3, 'FD');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text('PROGRESSION MOYENNE', 18, startY2 + 7);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text(`${stats?.avgProgress || 0}%`, 18, startY2 + 16);

    // Stat 4: Completed/Certified
    pdf.setFont('helvetica', 'normal');
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(108, startY2, cardWidth, cardHeight, 3, 3, 'FD');
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text('ÉLÈVES CERTIFIÉS (100%)', 112, startY2 + 7);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(245, 158, 11);
    pdf.text(String(stats?.completedStudents || 0), 112, startY2 + 16);

    // Module completion breakdown
    let tableY = startY2 + cardHeight + 14;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('TAUX DE RÉUSSITE PAR MODULE THÉORIQUE', 14, tableY);

    tableY += 6;
    pdf.setFillColor(241, 245, 249);
    pdf.rect(14, tableY, 182, 8, 'F');
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);
    pdf.text('TITRE DU MODULE', 18, tableY + 5.5);
    pdf.text('RÉUSSITES', 130, tableY + 5.5);
    pdf.text('TAUX DE RÉUSSITE', 165, tableY + 5.5);

    tableY += 8;
    const modules = stats?.modulesCompletion || [];
    modules.forEach((m: any, idx: number) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(30, 41, 59);
      pdf.text(m.moduleTitle || `Module ${idx + 1}`, 18, tableY + 6);
      pdf.text(`${m.validatedCount || 0} / ${m.totalStudents || 0}`, 130, tableY + 6);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${m.completionRate || 0}%`, 165, tableY + 6);
      pdf.setDrawColor(241, 245, 249);
      pdf.line(14, tableY + 8, 196, tableY + 8);
      tableY += 8;
    });

    // Students list snippet
    if (students.length > 0) {
      tableY += 10;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(`LISTE DES ÉLÈVES (TOP ${Math.min(students.length, 12)})`, 14, tableY);

      tableY += 6;
      pdf.setFillColor(241, 245, 249);
      pdf.rect(14, tableY, 182, 8, 'F');
      pdf.setFontSize(8);
      pdf.setTextColor(71, 85, 105);
      pdf.text('CODE', 18, tableY + 5.5);
      pdf.text('NOM & PRÉNOM', 55, tableY + 5.5);
      pdf.text('EMAIL', 115, tableY + 5.5);
      pdf.text('PROGRESSION', 165, tableY + 5.5);

      tableY += 8;
      const topStudents = students.slice(0, 12);
      topStudents.forEach((st: any) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(30, 41, 59);
        pdf.text(st.codeEleveUnique || '', 18, tableY + 5.5);
        pdf.text(st.user?.name || st.name || '', 55, tableY + 5.5);
        pdf.text(st.user?.email || st.email || '', 115, tableY + 5.5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${st.progressionGlobal || 0}%`, 165, tableY + 5.5);
        pdf.setDrawColor(241, 245, 249);
        pdf.line(14, tableY + 7, 196, tableY + 7);
        tableY += 7;
      });
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating stats PDF:', error);
    alert('Erreur lors de la génération du rapport PDF.');
  }
};
