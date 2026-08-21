export async function parseJsonResponse<T = any>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type') || '';
  
  if (!contentType.includes('application/json')) {
    const text = await res.text().catch(() => '');
    const cleanText = text.replace(/<[^>]*>/g, '').trim();
    if (!res.ok) {
      throw new Error(`Erreur ${res.status}: ${cleanText.slice(0, 100) || res.statusText || 'Réponse serveur non valide'}`);
    }
    throw new Error('Réponse serveur invalide (format non-JSON).');
  }

  const data = await res.json().catch(() => {
    throw new Error(`Erreur ${res.status}: Impossible de lire la réponse JSON du serveur.`);
  });

  if (!res.ok) {
    throw new Error(data.error || data.message || `Erreur ${res.status}: Requête échouée`);
  }

  return data as T;
}
