import { createClient } from '@sanity/client';
import { PERMIS_B_PROGRAMME, PERMIS_B_MODULES, PERMIS_B_QUIZZES } from '../src/lib/permisBData';

const sanityProjectId = 'cchdhqvw';
const sanityDataset = 'production';
const sanityToken = 'skEGKHtehXGVW6vZV3vOQxxnJPuM2ySmjAvkYWI68CtKUgJOt5lOBLgtBeLKQhUNgtNgoPNpp6ewuJumw2t7PZdJdnBObPSh0Z886EQpZOsTkh6O9uc1ySmCt3MYP2XFzcDNlcwSkyPBSdarV6O6rxmXveGpkA5lb7mLFyOJ5TKZj00n6LRh';

const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  token: sanityToken,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function safeDelete(id: string, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await client.delete(id);
      return;
    } catch (e: any) {
      if (attempt === retries) console.warn(`⚠️ Échec suppression ${id}:`, e.message);
      else await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function safeCreateOrReplace(doc: any, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await client.createOrReplace(doc);
      return;
    } catch (e: any) {
      if (attempt === retries) throw e;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
}

async function runSeed() {
  console.log('🚀 Démarrage de la purge et synchronisation de Sanity Cloud avec le nouveau programme Permis B (15 modules)...');

  // 1. Purge
  try {
    const existingMods = await client.fetch<any[]>('*[_type == "moduleFormation"]');
    console.log(`Trouvé ${existingMods.length} modules existants sur Sanity.`);
    for (const m of existingMods) {
      await safeDelete(m._id);
    }

    const existingQuizzes = await client.fetch<any[]>('*[_type == "quiz"]');
    console.log(`Trouvé ${existingQuizzes.length} quiz existants sur Sanity.`);
    for (const q of existingQuizzes) {
      await safeDelete(q._id);
    }

    const existingProgs = await client.fetch<any[]>('*[_type == "programmePermis"]');
    console.log(`Trouvé ${existingProgs.length} programmes existants sur Sanity.`);
    for (const p of existingProgs) {
      await safeDelete(p._id);
    }
  } catch (err) {
    console.error('Erreur lors de la purge :', err);
  }

  // 2. Upload Programme
  console.log('📦 Upload du Programme Permis B...');
  await safeCreateOrReplace(PERMIS_B_PROGRAMME);

  // 3. Upload 15 Modules
  console.log(`📦 Upload des ${PERMIS_B_MODULES.length} modules et leurs leçons...`);
  for (const mod of PERMIS_B_MODULES) {
    console.log(`  -> Module ${mod.ordre} : ${mod.title} (${mod.lecons.length} leçons)`);
    await safeCreateOrReplace({
      ...mod,
      programmePermis: { _type: 'reference', _ref: 'prog-permis-b', _weak: true },
    });
  }

  // 4. Upload 15 Quizzes
  console.log(`📦 Upload des ${PERMIS_B_QUIZZES.length} quiz finaux...`);
  for (const qz of PERMIS_B_QUIZZES) {
    console.log(`  -> Quiz : ${qz.title} (${qz.questions.length} questions)`);
    const modRef =
      qz.module && (qz.module as any)._ref
        ? (qz.module as any)._ref
        : `mod-${qz._id.replace('quiz-mod-', '')}`;
    await safeCreateOrReplace({
      ...qz,
      module: { _type: 'reference', _ref: modRef, _weak: true },
    });
  }

  console.log('🎉 TOUS LES 15 MODULES, LEÇONS ET QUIZ SONT PARFAITEMENT SYNCHRONISÉS SUR SANITY CLOUD !');
}

runSeed().catch((err) => {
  console.error('Erreur globale seed Sanity :', err);
});
