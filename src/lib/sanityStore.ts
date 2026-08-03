import { createClient } from '@sanity/client';
import {
  User,
  AutoEcole,
  Eleve,
  ProgrammePermis,
  ModuleFormation,
  Quiz,
  ProgressionModule,
  LogActivite,
  Certificat,
  UserRole,
  ActionType,
  CertificatStatus,
  GlobalSettings,
} from '../types';

// Initial Seed Data for local datastore / fallback
const INITIAL_PROGRAMMES_PERMIS: ProgrammePermis[] = [];

// Sanity client configuration with user credentials
const sanityProjectId = process.env.SANITY_PROJECT_ID || (import.meta as any).env?.VITE_SANITY_PROJECT_ID || 'cchdhqvw';
const sanityDataset = process.env.SANITY_DATASET || (import.meta as any).env?.VITE_SANITY_DATASET || 'production';
const sanityToken = process.env.SANITY_API_TOKEN || (import.meta as any).env?.VITE_SANITY_API_TOKEN || 'skEGKHtehXGVW6vZV3vOQxxnJPuM2ySmjAvkYWI68CtKUgJOt5lOBLgtBeLKQhUNgtNgoPNpp6ewuJumw2t7PZdJdnBObPSh0Z886EQpZOsTkh6O9uc1ySmCt3MYP2XFzcDNlcwSkyPBSdarV6O6rxmXveGpkA5lb7mLFyOJ5TKZj00n6LRh';

export const liveSanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      token: sanityToken,
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  : null;

// Initial Seed Data for local datastore / fallback
const INITIAL_AUTO_ECOLES: AutoEcole[] = [];

const INITIAL_USERS: User[] = [
  {
    _id: 'user-super-admin',
    _type: 'user',
    name: 'Matoa Super Admin',
    email: 'matoa@gmail.com',
    phone: '01 00 00 00 00',
    role: UserRole.SUPER_ADMIN,
    passwordHash: 'qlac485!',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

const INITIAL_ELEVES: Eleve[] = [];

const INITIAL_MODULES: ModuleFormation[] = [
  {
    _id: 'mod-1',
    _type: 'moduleFormation',
    code: 'MOD-001',
    title: 'Module 1 : Signalisation et Panneaux de Signalisation',
    summary: 'Ce module pose les bases fondamentales de la signalisation routière en France. L\'élève y apprend à identifier instantanément les formes, les couleurs et la typologie de chaque panneau. À la fin de ce module, l\'élève sera capable d\'anticiper les dangers, de respecter les interdictions et d\'exécuter les obligations de conduite.',
    learningObjectives: [
      'Reconnaître les formes (triangulaire, rond, carré) et les couleurs des panneaux',
      'Distinguer les panneaux de danger, d\'interdiction, d\'obligation et d\'indication',
      'Identifier la distance d\'implantation des panneaux en et hors agglomération',
      'Analyser les panonceaux complémentaires sous les panneaux principaux',
    ],
    ordre: 1,
    typePermis: 'B',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-b' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 410,
    tempsMinimumVisionnage: 328, // 80%
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Formes et couleurs de la signalisation',
        ordre: 1,
        description: 'Chaque panneau est un code visuel instantané. La forme indique la nature du message : le triangle annonce un danger, le cercle ordonne (interdiction en bordure rouge ou obligation en fond bleu), le carré ou rectangle informe. La couleur renforce la préavisabilité (jaune = temporaire, blanc = permanent).',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        durationSeconds: 120,
        tempsMinimumVisionnageSeconds: 96,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quelle est la signification d\'un panneau de forme triangulaire ?',
            options: ['Interdiction', 'Danger potentiel', 'Obligation', 'Information'],
            correctOptionIndex: 1,
            explanation: 'Les panneaux triangulaires annoncent toujours un danger.',
          },
          {
            questionText: 'Un panneau à fond jaune indique :',
            options: ['Une obligation permanente', 'Une signalisation temporaire de chantier', 'Une zone touristique', 'Une interdiction de nuit'],
            correctOptionIndex: 1,
            explanation: 'Le jaune est réservé aux signalisations temporaires (chantiers, déviations).',
          },
          {
            questionText: 'Quelle est la couleur principale d\'un panneau d\'obligation ?',
            options: ['Fond blanc et bordure rouge', 'Fond bleu', 'Fond jaune', 'Fond vert'],
            correctOptionIndex: 1,
            explanation: 'Les panneaux d\'obligation sont circulaires à fond bleu.',
          },
          {
            questionText: 'Un symbole sur fond carré bleu indique :',
            options: ['Une obligation', 'Une interdiction', 'Une indication ou un service', 'Un danger imminent'],
            correctOptionIndex: 2,
            explanation: 'Les panneaux carrés ou rectangulaires bleus apportent une information ou indication.',
          },
          {
            questionText: 'Que signifie un panneau circulaire avec un liseré rouge et barré en rouge ?',
            options: ['Fin d\'interdiction', 'Interdiction stricte', 'Fin de zone de stationnement', 'Obligation d\'arrêt'],
            correctOptionIndex: 0,
            explanation: 'Un panneau circulaire blanc avec une barre noire oblique ou fin de zone signale la fin d\'interdiction.',
          },
        ],
      },
      {
        _id: 'lec-1-2',
        _type: 'lecon',
        title: 'Leçon 2 : Panneaux de danger et distances d\'implantation',
        ordre: 2,
        description: 'Les panneaux de danger sont placés en avance pour permettre d\'adapter sa vitesse. En agglomération, ils sont positionnés à environ 50 mètres du danger. Hors agglomération, ils sont implantés à environ 150 mètres. Les panonceaux d\'étendue indiquent la longueur sur laquelle s\'applique le danger.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        durationSeconds: 150,
        tempsMinimumVisionnageSeconds: 120,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'À quelle distance d\'un danger un panneau est-il placé hors agglomération ?',
            options: ['50 mètres', '100 mètres', '150 mètres', '300 mètres'],
            correctOptionIndex: 2,
            explanation: 'Hors agglomération, le panneau est implanté à 150 mètres du danger.',
          },
          {
            questionText: 'À quelle distance d\'un danger un panneau est-il implanté en agglomération ?',
            options: ['Environ 50 mètres', 'Environ 150 mètres', 'Au niveau exact du danger', 'À 200 mètres'],
            correctOptionIndex: 0,
            explanation: 'En agglomération, le panneau est implanté à 50 mètres du danger.',
          },
          {
            questionText: 'Que signifie un panonceau avec deux flèches verticales entourant un chiffre (ex: 500 m) ?',
            options: ['Le danger commence dans 500m', 'Le danger s\'étend sur une longueur de 500m', 'Vitesse limitée à 50 km/h', 'Hauteur limitée à 5m'],
            correctOptionIndex: 1,
            explanation: 'Les flèches latérales indiquent l\'étendue (longueur de la zone dangereuse).',
          },
          {
            questionText: 'Sans flèches, un panonceau portant l\'inscription "200 m" indique :',
            options: ['Le danger s\'étend sur 200m', 'Le danger se situe à 200 mètres du panneau', 'Une zone de rencontre sur 200m', 'Une voie réservée'],
            correctOptionIndex: 1,
            explanation: 'Sans flèches, le panonceau indique la distance restante avant le début du danger.',
          },
          {
            questionText: 'Le panneau de danger "Chaussée rétrécie" temporaire est de couleur :',
            options: ['Blanche', 'Jaune', 'Bleue', 'Rouge'],
            correctOptionIndex: 1,
            explanation: 'Tous les panneaux de danger temporaires ont un fond jaune.',
          },
        ],
      },
      {
        _id: 'lec-1-3',
        _type: 'lecon',
        title: 'Leçon 3 : Interdictions, obligations et panonceaux',
        ordre: 3,
        description: 'Les panneaux ronds à bordure rouge interdisent à partir du panneau jusqu\'à la prochaine intersection ou panneau de fin. Les panneaux ronds bleus imposent une obligation (ex: voie vélos, vitesse minimale). Les panonceaux précisent à qui s\'adresse le panneau ou la distance exacte.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        durationSeconds: 140,
        tempsMinimumVisionnageSeconds: 112,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Où commence l\'effet d\'un panneau d\'interdiction ?',
            options: ['150 mètres après le panneau', 'À la hauteur exacte du panneau', 'À la prochaine intersection', 'À la fin de la rue'],
            correctOptionIndex: 1,
            explanation: 'Un panneau d\'interdiction prend effet immédiatement à sa hauteur.',
          },
          {
            questionText: 'Jusqu\'où s\'applique une interdiction signalée par un panneau rond rouge ?',
            options: ['Sur 1 km', 'Jusqu\'à la prochaine intersection ou panneau de fin', 'Pendant 5 minutes', 'Sur toute la commune'],
            correctOptionIndex: 1,
            explanation: 'L\'interdiction s\'arrête à la prochaine intersection rencontrée ou au panneau de fin d\'interdiction.',
          },
          {
            questionText: 'Que signifie un panneau rond bleu indiquant "30" ?',
            options: ['Vitesse maximale 30 km/h', 'Vitesse minimale obligatoire 30 km/h', 'Fin de zone 30', 'Conseil de rouler à 30 km/h'],
            correctOptionIndex: 1,
            explanation: 'Un panneau rond bleu avec un nombre impose une vitesse minimale obligatoire.',
          },
          {
            questionText: 'Un panonceau représentant un camion sous un panneau d\'interdiction signifie :',
            options: ['L\'interdiction concerne tous les usagers', 'L\'interdiction s\'applique uniquement aux poids lourds/transports de marchandises', 'Interdiction aux voitures', 'Stationnement réservé aux camions'],
            correctOptionIndex: 1,
            explanation: 'Le panonceau catégorie cible spécifiquement les véhicules de transport de marchandises.',
          },
          {
            questionText: 'Le panneau B0 (cercle rouge à fond blanc vide) signifie :',
            options: ['Circulation interdite à tout véhicule dans les deux sens', 'Sens interdit', 'Voie réservée aux piétons', 'Stationnement interdit'],
            correctOptionIndex: 0,
            explanation: 'Le panneau B0 interdit la circulation à tous les véhicules dans les deux sens.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-2',
    _type: 'moduleFormation',
    code: 'MOD-002',
    title: 'Module 2 : Priorités de Passage et Règles d\'Intersection',
    summary: 'Les intersections constituent les zones les plus critiques en matière de sécurité routière. Ce module passe en revue la règle fondamentale de la priorité à droite, le fonctionnement des panneaux STOP et Céder le Passage, ainsi que les carrefours à sens giratoire. À la fin de ce module, l\'élève saura franchir tout type d\'intersection en sécurité.',
    learningObjectives: [
      'Appliquer la règle de la priorité à droite en l\'absence de panneau',
      'Distinguer l\'obligation d\'arrêt absolu du STOP du Céder le Passage',
      'Maîtriser les règles d\'insertion et de placement dans un carrefour giratoire',
      'Anticiper la présence des véhicules prioritaires à gyrophares bleus',
    ],
    ordre: 2,
    typePermis: 'B',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-b' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : La règle fondamentale de la priorité à droite',
        ordre: 1,
        description: 'Sans signalisation spécifique, la priorité à droite s\'applique à toutes les intersections. Il faut ralentir, observer l\'angle mort à droite et être en mesure de s\'arrêter si un véhicule survient. La priorité à droite s\'applique également dans les parkings et voies privées ouvertes à la circulation.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
        durationSeconds: 160,
        tempsMinimumVisionnageSeconds: 128,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'En l\'absence de marquage au sol ou panneau, qui passe en premier ?',
            options: ['Le véhicule arrivant à gauche', 'Le véhicule arrivant à droite', 'Le plus gros véhicule', 'Le plus rapide'],
            correctOptionIndex: 1,
            explanation: 'En l\'absence de signalisation, la priorité appartient au véhicule de droite.',
          },
          {
            questionText: 'Qui a la priorité lors de la rencontre entre un véhicule sortant d\'un parking et un usager sur la voie ?',
            options: ['Le véhicule sortant du parking', 'L\'usager circulant déjà sur la voie publique', 'Chacun son tour', 'Le plus rapide'],
            correctOptionIndex: 1,
            explanation: 'Un usager s\'intégrant depuis une propriété privée ou parking doit céder la priorité à tous.',
          },
          {
            questionText: 'Un véhicule tournant à gauche dans une intersection sans panneau spécifique doit :',
            options: ['Passer en premier', 'Céder la priorité aux véhicules arrivant en face', 'S\'arrêter au milieu 10 secondes', 'Accélérer'],
            correctOptionIndex: 1,
            explanation: 'En tournant à gauche, on coupe la trajectoire des usagers venant en face qui sont prioritaires.',
          },
          {
            questionText: 'Que signifie une ligne transversale discontinue peinte au sol à une intersection ?',
            options: ['Ligne d\'arrêt du STOP', 'Ligne d\'effet d\'un Céder le Passage', 'Zone piétonne', 'Emplacement de stationnement'],
            correctOptionIndex: 1,
            explanation: 'La ligne discontinue transversale marque l\'endroit où céder le passage si un véhicule arrive.',
          },
          {
            questionText: 'Si deux véhicules se croisent sur une route de montagne étroite de même largeur, qui doit s\'arrêter ?',
            options: ['Le véhicule descendant', 'Le véhicule montant', 'Le véhicule le plus lourd', 'Le premier qui klaxonne'],
            correctOptionIndex: 0,
            explanation: 'Le véhicule descendant doit s\'arrêter pour faciliter la manœuvre du véhicule montant.',
          },
        ],
      },
      {
        _id: 'lec-2-2',
        _type: 'lecon',
        title: 'Leçon 2 : STOP, Céder le Passage et marquages au sol',
        ordre: 2,
        description: 'Au panneau STOP, l\'arrêt complet des roues est obligatoire à la ligne de retrait, même si la voie est totalement libre. Au Céder le Passage, l\'arrêt n\'est pas obligatoire s\'il n\'y a personne, mais il faut céder le passage à gauche et à droite.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Devez-vous vous arrêter complètement au Céder le Passage si la voie est libre ?',
            options: ['Oui, au moins 3 secondes', 'Non, si aucun usager n\'arrive', 'Oui, si un piéton attend', 'Non, la nuit seulement'],
            correctOptionIndex: 1,
            explanation: 'Au Céder le Passage, l\'arrêt n\'est obligatoire que si la voie prioritaire est occupée.',
          },
          {
            questionText: 'Où doit être effectué l\'arrêt complet obligatoire d\'un panneau STOP ?',
            options: ['Au niveau du panneau STOP', 'À la ligne blanche continue de marquage au sol', 'Au milieu de la chaussée', '5 mètres avant le panneau'],
            correctOptionIndex: 1,
            explanation: 'L\'arrêt doit se faire à la ligne d\'arrêt peinte au sol.',
          },
          {
            questionText: 'Quelle est la sanction en cas de non-respect de l\'arrêt absolu au STOP ?',
            options: ['Aucune sanction', 'Amende et retrait de 4 points sur le permis', 'Suspension directe de 3 ans', 'Simple rappel à la loi'],
            correctOptionIndex: 1,
            explanation: 'Griller un STOP constitue une infraction grave sanctionnée par un retrait de 4 points.',
          },
          {
            questionText: 'Un panneau octogonal rouge comportant l\'inscription "STOP" vous impose :',
            options: ['Un ralentissement fort', 'L\'immobilisation totale du véhicule', 'De laisser passer la gauche uniquement', 'Une priorité absolue'],
            correctOptionIndex: 1,
            explanation: 'Le STOP exige l\'arrêt complet des roues.',
          },
          {
            questionText: 'Que signale un triangle jaune bordé de rouge pointant vers le bas ?',
            options: ['Danger à 150m', 'Céder le passage à l\'intersection', 'Priorité ponctuelle', 'Sens interdit'],
            correctOptionIndex: 1,
            explanation: 'Le triangle sur la pointe est le panneau Céder le passage.',
          },
        ],
      },
      {
        _id: 'lec-2-3',
        _type: 'lecon',
        title: 'Leçon 3 : Carrefours à sens giratoire et ronds-points',
        ordre: 3,
        description: 'En France, sur un carrefour à sens giratoire, les usagers déjà engagés sur l\'anneau sont prioritaires (présence de panneaux Céder le Passage à l\'entrée). Pour tourner à droite ou aller en face, placez-vous sur la voie de droite.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        durationSeconds: 200,
        tempsMinimumVisionnageSeconds: 160,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Dans un carrefour à sens giratoire avec panneaux Céder le Passage, qui est prioritaire ?',
            options: ['Les véhicules qui entrent', 'Les véhicules déjà engagés sur l\'anneau', 'Les tramways uniquement', 'Les véhicules venant de droite'],
            correctOptionIndex: 1,
            explanation: 'Les usagers circulant sur l\'anneau du carrefour giratoire ont la priorité.',
          },
          {
            questionText: 'Avant d\'entrer dans un carrefour giratoire pour aller tout droit, quel clignotant devez-vous mettre ?',
            options: ['Clignotant gauche', 'Clignotant droit', 'Aucun clignotant à l\'entrée', 'Les feux de détresse'],
            correctOptionIndex: 2,
            explanation: 'On n\'allume pas de clignotant à l\'entrée si l\'on va en face; on met le clignotant droit avant d\'en sortir.',
          },
          {
            questionText: 'Pour prendre la dernière sortie à gauche dans un giratoire à 2 voies, sur quelle voie vous insérez-vous ?',
            options: ['Voie de droite obligatoire', 'Voie de gauche si elle est libre', 'Bande d\'arrêt d\'urgence', 'Trottoir central'],
            correctOptionIndex: 1,
            explanation: 'Pour tourner à gauche, il est recommandé d\'emprunter la voie intérieure (gauche).',
          },
          {
            questionText: 'Quel indicateur de changement de direction est obligatoire avant de sortir d\'un giratoire ?',
            options: ['Clignotant gauche', 'Clignotant droit', 'Appel de phares', 'Aucun'],
            correctOptionIndex: 1,
            explanation: 'Il faut obligatoirement allumer le clignotant droit avant de quitter l\'anneau.',
          },
          {
            questionText: 'Quelle est la différence entre un rond-point traditionnel et un carrefour giratoire ?',
            options: ['Aucune', 'Au rond-point sans panneau, la priorité est à droite', 'Le carrefour giratoire est carré', 'Le rond-point est réservé aux bus'],
            correctOptionIndex: 1,
            explanation: 'Dans un rond-point sans panneau (ex: Étoile à Paris), la règle de la priorité à droite s\'applique.',
          },
        ],
      },
    ],
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    _id: 'mod-3',
    _type: 'moduleFormation',
    code: 'MOD-003',
    title: 'Module 3 : Vitesse, Distances de Sécurité et Éco-Conduite',
    summary: 'Adapter sa vitesse et maintenir une distance de sécurité suffisante sont les deux facteurs majeurs pour éviter les collisions. Ce module explique le calcul de la distance d\'arrêt, l\'impact de la vitesse sur la distance de freinage et les principes d\'une conduite économique et écologique.',
    learningObjectives: [
      'Calculer la distance parcourue pendant le temps de réaction',
      'Évaluer la distance de freinage selon l\'état de la chaussée (sèche / mouillée)',
      'Calculer la distance de sécurité minimale (règle des 2 secondes)',
      'Mettre en pratique les règles d\'éco-conduite pour réduire sa consommation',
    ],
    ordre: 3,
    typePermis: 'B',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-b' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    durationSeconds: 320,
    tempsMinimumVisionnage: 256,
    scoreMinimumQuiz: 70,
    isActive: true,
    lecons: [
      {
        _id: 'lec-3-1',
        _type: 'lecon',
        title: 'Leçon 1 : Temps de réaction et distance d\'arrêt',
        ordre: 1,
        description: 'Le temps de réaction moyen d\'un conducteur vigilant est d\'environ 1 seconde. Durant cette seconde, la voiture parcourt une distance égale à la dizaine de la vitesse multipliée par 3 (ex: à 50 km/h -> 5 x 3 = 15 mètres). La distance de freinage varie avec le carré de la vitesse !',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
        durationSeconds: 150,
        tempsMinimumVisionnageSeconds: 120,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'À 90 km/h, quelle distance parcourt-on environ pendant 1 seconde de temps de réaction ?',
            options: ['15 mètres', '27 mètres', '45 mètres', '90 mètres'],
            correctOptionIndex: 1,
            explanation: 'Astuce : 9 x 3 = 27 mètres parcourus en 1 seconde à 90 km/h.',
          },
          {
            questionText: 'Quels facteurs augmentent le temps de réaction du conducteur ?',
            options: ['La fatigue, l\'alcool et la distraction par téléphone', 'La pluie et le sol mouillé', 'L\'usure des pneumatiques', 'Une voiture plus puissante'],
            correctOptionIndex: 0,
            explanation: 'Le temps de réaction est lié exclusivement à l\'état physique et attentionnel du conducteur.',
          },
          {
            questionText: 'Comment calcule-t-on approximativement la distance d\'arrêt totale sur sol sec à 50 km/h ?',
            options: ['Multiplier la dizaine par 3', 'Multiplier le chiffre des dizaines par lui-même (5 x 5 = 25m)', 'Diviser la vitesse par 2', 'Compter 10 mètres'],
            correctOptionIndex: 1,
            explanation: 'Sur sol sec, distance d\'arrêt ≈ (dizaine de vitesse)² -> 5 x 5 = 25 mètres.',
          },
          {
            questionText: 'Si vous téléphoner au volant (même en kit mains libres), par combien est multiplié le risque d\'accident ?',
            options: ['Par 1,5', 'Par 3', 'Par 10', 'Il ne change pas'],
            correctOptionIndex: 1,
            explanation: 'L\'usage du téléphone au volant multiplie par 3 le risque d\'accident.',
          },
          {
            questionText: 'Quel est le taux d\'alcoolémie légal maximal pour un jeune conducteur en permis probatoire ?',
            options: ['0,2 g/l de sang (0,10 mg/l d\'air expiré)', '0,5 g/l de sang', '0,8 g/l de sang', '1,0 g/l de sang'],
            correctOptionIndex: 0,
            explanation: 'La limite pour les permis probatoires est fixée à 0,2 g/l de sang (tolérance zéro verre).',
          },
        ],
      },
      {
        _id: 'lec-3-2',
        _type: 'lecon',
        title: 'Leçon 2 : Distances de sécurité et conditions météo',
        ordre: 2,
        description: 'La distance de sécurité minimale correspond à la distance parcourue pendant 2 secondes (dizaine de la vitesse x 6). Sur chaussée mouillée, la distance de freinage est multipliée par 2 !',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        durationSeconds: 170,
        tempsMinimumVisionnageSeconds: 136,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Sur chaussée mouillée, la distance de freinage est :',
            options: ['Identique', 'Doublée', 'Triplée', 'Divisée par deux'],
            correctOptionIndex: 1,
            explanation: 'L\'adhérence réduite sur sol mouillée double la distance de freinage.',
          },
          {
            questionText: 'Comment évalue-t-on l\'intervalle de sécurité minimal avec le véhicule qui précède ?',
            options: ['En comptant 2 secondes ("une seconde... deux secondes")', 'En laissant 5 mètres de distance', 'En regardant les rétroviseurs', 'En klaxonnant'],
            correctOptionIndex: 0,
            explanation: 'Compter 2 secondes permet de garantir le temps de réaction et une marge de sécurité.',
          },
          {
            questionText: 'Sur autoroute, comment repère-t-on visuellement la bonne distance de sécurité sur sol sec ?',
            options: ['Laisser au moins 2 bandes blanches de la ligne de droite', 'Conserver 10 mètres', 'Rester collé au pare-choc', 'Utiliser les feux de détresse'],
            correctOptionIndex: 0,
            explanation: 'Sur autoroute, laisser 2 bandes de la ligne de rive droite garantit la distance légale.',
          },
          {
            questionText: 'En cas de verglas, par combien peut être multipliée la distance de freinage ?',
            options: ['Par 2', 'Par 4', 'Par 10', 'Par 100'],
            correctOptionIndex: 2,
            explanation: 'Sur du verglas, l\'adhérence est quasi nulle et la distance de freinage est multipliée par 10.',
          },
          {
            questionText: 'En présence d\'un fort vent latéral, vous devez :',
            options: ['Accélérer pour traverser la zone rapidement', 'Réduire la vitesse et tenir fermement le volant', 'Mettre le point mort', 'Freiner brusquement sur le pont'],
            correctOptionIndex: 1,
            explanation: 'Réduire la vitesse diminue la prise au vent et permet de corriger la trajectoire.',
          },
        ],
      },
    ],
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
  // --- MODULES PERMIS A (MOTO) ---
  {
    _id: 'mod-m-1',
    _type: 'moduleFormation',
    code: 'MOD-M01',
    title: 'Module Moto 1 : Équipements, Trajectoires & Sécurité Moto',
    summary: 'Ce module est spécifiquement conçu pour les candidats au Permis Moto (A/A2). Il traite des équipements obligatoires, de la trajectoire de sécurité en virage et de la lisibilité de la route à deux-roues.',
    learningObjectives: [
      'Connaître la réglementation sur les équipements de protection individuelle (EPI)',
      'Maîtriser la trajectoire de sécurité en courbe (extérieur, point de corde, sortie)',
      'Détecter les pièges de la chaussée (plaques d\'égout, bandes blanches mouillées, gravillons)',
      'Comprendre l\'effet gyroscopique et le contre-braquage',
    ],
    ordre: 1,
    typePermis: 'A',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-a' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    durationSeconds: 380,
    tempsMinimumVisionnage: 304,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-m-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Équipements de protection obligatoire et passive',
        ordre: 1,
        description: 'À moto, la carrosserie c\'est le motard. Le casque attaché homologué ECE 22.06 et les gants certifiés CE sont obligatoires.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quels équipements sont légalement obligatoires à moto en France ?',
            options: ['Casque homologué uniquement', 'Casque homologué et gants certifiés CE', 'Casque, gants et gilet airbag', 'Casque et blouson en cuir'],
            correctOptionIndex: 1,
            explanation: 'En France, le casque attaché et les gants certifiés CE sont les deux équipements légalement obligatoires.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-m-2',
    _type: 'moduleFormation',
    code: 'MOD-M02',
    title: 'Module Moto 2 : Épreuve Théorique Moto (ETM) & Dangers Spécifiques',
    summary: 'Préparation à l\'ETM (Code Moto). Analyse du freinage d\'urgence avec/sans ABS et des risques d\'invisibilité.',
    learningObjectives: [
      'Appliquer les règles de la circulation inter-files (CIF) légalisée',
      'Doser le freinage avant/arrière et comprendre le transfert de masse',
    ],
    ordre: 2,
    typePermis: 'A',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-a' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
    durationSeconds: 420,
    tempsMinimumVisionnage: 336,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-m-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Répartition du freinage et adhérence',
        ordre: 1,
        description: 'Le frein avant fournit environ 70% de la puissance de freinage à moto grâce au transfert de charge vers l\'avant.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoybreaks.mp4',
        durationSeconds: 210,
        tempsMinimumVisionnageSeconds: 168,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  // --- MODULES PERMIS C (POIDS LOURD) ---
  {
    _id: 'mod-c-1',
    _type: 'moduleFormation',
    code: 'MOD-C01',
    title: 'Module Poids Lourd 1 : Réglementation Sociale & Temps de Conduite (RSE)',
    summary: 'Formation spécifique au transport de marchandises (Permis C). Maîtrise des temps de conduite journaliers (9h max) et des pauses obligatoires.',
    learningObjectives: [
      'Connaître les limites légales de conduite journalière et hebdomadaire',
      'Gérer les pauses obligatoires (45 min toutes les 4h30)',
    ],
    ordre: 1,
    typePermis: 'C',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-c' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    durationSeconds: 450,
    tempsMinimumVisionnage: 360,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-c-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Règles de conduite et de repos RSE',
        ordre: 1,
        description: 'Un conducteur poids lourd doit interrompre sa conduite au plus tard après 4h30 par une pause d\'au moins 45 minutes.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        durationSeconds: 220,
        tempsMinimumVisionnageSeconds: 176,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quelle est la durée maximale de conduite continue autorisée pour un Poids Lourd avant une pause ?',
            options: ['3 heures', '4 heures et 30 minutes', '6 heures', '8 heures'],
            correctOptionIndex: 1,
            explanation: 'La RSE impose une pause de 45 min après maximum 4h30 de conduite.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-c-2',
    _type: 'moduleFormation',
    code: 'MOD-C02',
    title: 'Module Poids Lourd 2 : Gabarit, Inertie & Sécurité du Chargement',
    summary: 'Angles morts massifs des camions, balayages en virage, répartition des charges sur les essieux.',
    learningObjectives: [
      'Calculer les déports arrière et balayages en manœuvre',
      'Vérifier l\'arrimage et le centrage du chargement',
    ],
    ordre: 2,
    typePermis: 'C',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-c' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    durationSeconds: 400,
    tempsMinimumVisionnage: 320,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-c-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Balayage et déport dans les virages serrés',
        ordre: 1,
        description: 'L\'empattement long des poids lourds provoque un balayage arrière important.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        durationSeconds: 200,
        tempsMinimumVisionnageSeconds: 160,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  // --- MODULES PERMIS D (BUS) ---
  {
    _id: 'mod-d-1',
    _type: 'moduleFormation',
    code: 'MOD-D01',
    title: 'Module Bus 1 : Sécurité des Passagers & Évacuation d\'Urgence',
    summary: 'Formation théorique Permis D dédiée aux véhicules de transport en commun de personnes. Sécurité à bord et consignes d\'évacuation.',
    learningObjectives: [
      'Gérer la sécurité et le confort des passagers',
      'Appliquer les procédures d\'évacuation rapide en cas d\'urgence',
    ],
    ordre: 1,
    typePermis: 'D',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-d' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
    durationSeconds: 390,
    tempsMinimumVisionnage: 312,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: 'lec-d-1-1',
        _type: 'lecon',
        title: 'Leçon 1 : Prise en charge des usagers et procédures d\'urgence',
        ordre: 1,
        description: 'Le conducteur de bus est responsable de la sécurité de tous les voyageurs transportés.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
        durationSeconds: 190,
        tempsMinimumVisionnageSeconds: 152,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'En cas d\'urgence à bord d\'un autocar, quelle est la priorité absolue ?',
            options: ['Tenter d\'éteindre le feu seul', 'Évacuer immédiatement tous les passagers', 'Appeler son entreprise', 'Continuer jusqu\'à la gare'],
            correctOptionIndex: 1,
            explanation: 'Immobiliser le véhicule et faire évacuer les passagers sans délai.',
          },
        ],
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'mod-d-2',
    _type: 'moduleFormation',
    code: 'MOD-D02',
    title: 'Module Bus 2 : Voies Réservées & Priorité aux Arrêts de Bus',
    summary: 'Règles spécifiques concernant l\'utilisation des voies de bus et le départ des arrêts en agglomération.',
    learningObjectives: [
      'Comprendre la priorité de réinsertion des bus quittant un arrêt en agglomération',
    ],
    ordre: 2,
    typePermis: 'D',
    programmePermis: { _type: 'reference', _ref: 'prog-permis-d' },
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    durationSeconds: 360,
    tempsMinimumVisionnage: 288,
    scoreMinimumQuiz: 75,
    isActive: true,
    lecons: [
      {
        _id: 'lec-d-2-1',
        _type: 'lecon',
        title: 'Leçon 1 : Signalisation et priorité de sortie d\'arrêt',
        ordre: 1,
        description: 'En agglomération, les automobilistes doivent ralentir et céder le passage au bus indiquant son intention de quitter son arrêt.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        durationSeconds: 180,
        tempsMinimumVisionnageSeconds: 144,
        hasInlineQuiz: false,
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

const INITIAL_QUIZZES: Quiz[] = [
  {
    _id: 'quiz-mod-1',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-1' },
    timerSeconds: 600, // 10 min
    questions: [
      {
        questionText: '1. Un panneau triangulaire bordé de rouge indique :',
        options: ['Une interdiction stricte', 'Un danger potentiel à venir', 'Une obligation absolue', 'Une simple indication touristique'],
        correctOptionIndex: 1,
        explanation: 'Les panneaux triangulaires à fond blanc et bordure rouge annoncent un danger.',
      },
      {
        questionText: '2. À quelle distance d\'un danger en agglomération un panneau de danger est-il implanté ?',
        options: ['Environ 150 mètres', 'Environ 50 mètres', 'Au niveau exact du danger', 'À 300 mètres'],
        correctOptionIndex: 1,
        explanation: 'En agglomération, la vitesse étant plus réduite, les panneaux sont placés à ~50m.',
      },
      {
        questionText: '3. Que signifie un panneau rond bleu avec un symbole de vélo ?',
        options: ['Piste ou bande obligatoire pour les cycles', 'Interdiction aux vélos', 'Stationnement vélo réservé', 'Fin de voie verte'],
        correctOptionIndex: 0,
        explanation: 'Un panneau rond bleu indique une obligation, ici la voie obligatoire pour cycles.',
      },
      {
        questionText: '4. À quelle vitesse maximale devez-vous rouler en ville en agglomération standard ?',
        options: ['30 km/h', '50 km/h', '70 km/h', '80 km/h'],
        correctOptionIndex: 1,
        explanation: 'Sauf indication contraire ou zone 30, la vitesse maximale autorisée en agglomération est de 50 km/h.',
      },
      {
        questionText: '5. Un panneau rond bordé de rouge avec un fond blanc signifie :',
        options: ['Une interdiction', 'Une fin d\'obligation', 'Un danger imminent', 'Une direction conseillée'],
        correctOptionIndex: 0,
        explanation: 'Les panneaux ronds à bordure rouge sont des panneaux d\'interdiction.',
      },
      {
        questionText: '6. Un panneau rectangulaire à fond bleu comportant une lettre "P" blanche indique :',
        options: ['Un péage', 'Un parking / zone de stationnement', 'Une priorité', 'Un poste de secours'],
        correctOptionIndex: 1,
        explanation: 'La lettre P sur fond bleu annonce un espace de stationnement.',
      },
      {
        questionText: '7. Un panneau circulaire à fond blanc barré d\'un trait noir désigne :',
        options: ['Fin de toutes les interdictions précédemment signalées', 'Fin d\'autoroute', 'Fin de priorité', 'Interdiction de dépasser'],
        correctOptionIndex: 0,
        explanation: 'Ce panneau signale la fin de toutes les prescriptions d\'interdiction locales.',
      },
      {
        questionText: '8. Un panneau de danger surmonté d\'un symbole de deux personnes annonce :',
        options: ['Une zone piétonne', 'Un endroit fréquenté par les enfants (école, terrain de jeu)', 'Un passage piéton à 150m', 'Une zone de rencontre'],
        correctOptionIndex: 1,
        explanation: 'Le symbole de deux enfants signale un risque particulier lié à la présence d\'enfants.',
      },
      {
        questionText: '9. Un panneau d\'obligation circulaire bleu avec l\'inscription "50" vous impose de :',
        options: ['Rouler au maximum à 50 km/h', 'Rouler au minimum à 50 km/h si la sécurité le permet', 'S\'arrêter dans 50 mètres', 'Changer de vitesse'],
        correctOptionIndex: 1,
        explanation: 'Le panneau B14 d\'obligation bleue fixe une vitesse minimale obligatoire.',
      },
      {
        questionText: '10. Que signifie une balise blanche à chapeau rouge située au bord de la chaussée ?',
        options: ['Un virage dangereux', 'L\'intersection avec une voie secondaire', 'Le déneigement en cours', 'Une zone de travaux'],
        correctOptionIndex: 1,
        explanation: 'Les balises d\'intersection J3 sont blanches avec un anneau supérieur rouge.',
      },
    ],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    _id: 'quiz-mod-2',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-2' },
    timerSeconds: 600,
    questions: [
      {
        questionText: '1. En l\'absence de toute signalisation à une intersection, quelle règle s\'applique ?',
        options: ['Priorité au véhicule roulant le plus vite', 'Priorité absolue à gauche', 'Priorité à droite', 'Premier arrivé, premier servi'],
        correctOptionIndex: 2,
        explanation: 'Sans signalisation spécifique, la priorité à droite s\'applique obligatoirement.',
      },
      {
        questionText: '2. Face à un panneau "Céder le passage", devez-vous impérativement marquer un temps d\'arrêt ?',
        options: ['Oui, toujours au moins 3 secondes', 'Non, uniquement si des usagers arrivent sur la voie prioritaire', 'Oui, sauf la nuit', 'Non, les vélos ont la priorité'],
        correctOptionIndex: 1,
        explanation: 'Contrairement au Stop, le marquer de l\'arrêt n\'est pas obligatoire s\'il n\'y a personne.',
      },
      {
        questionText: '3. Qui a la priorité dans un carrefour à sens giratoire en France ?',
        options: ['Les véhicules entrant dans le giratoire', 'Les véhicules déjà engagés dans l\'anneau', 'Les poids lourds uniquement', 'Le véhicule venant de la voie la plus à droite'],
        correctOptionIndex: 1,
        explanation: 'Les usagers engagés sur l\'anneau du carrefour giratoire sont prioritaires.',
      },
      {
        questionText: '4. Au panneau STOP, où devez-vous marquer l\'arrêt complet des roues ?',
        options: ['À la hauteur du panneau STOP', 'À la ligne blanche continue de retrait s\'il y en a une', 'Au milieu du carrefour', 'Seulement s\'il y a un autre véhicule'],
        correctOptionIndex: 1,
        explanation: 'L\'arrêt au STOP doit être effectué à la ligne de marquage au sol de retrait.',
      },
      {
        questionText: '5. Devant un véhicule de secours (ambulance/pompiers) avec feux bleus et sirène 2 tons, vous devez :',
        options: ['Conserver votre trajectoire et accélérer', 'Faciliter le passage en vous serrant ou vous arrêtant dès que possible', 'Piler sur place immédiatement', 'Les dépasser rapidement'],
        correctOptionIndex: 1,
        explanation: 'Vous devez céder le passage et faciliter la progression des véhicules d\'urgence prioritaires.',
      },
      {
        questionText: '6. Si un feu tricolore clignote au jaune au milieu du carrefour, vous devez :',
        options: ['S\'arrêter obligatoirement', 'Passer sans ralentir', 'Franchir avec prudence en appliquant les panneaux ou la priorité à droite', 'Attendre le vert'],
        correctOptionIndex: 2,
        explanation: 'Un feu jaune clignotant invite à la prudence et remet en vigueur la règle des panneaux sous le feu ou la priorité à droite.',
      },
      {
        questionText: '7. Un agent de la circulation qui vous présente son dos signifie :',
        options: ['Autorisation de passer', 'Interdiction absolue de passer (équivalent au feu rouge)', 'Ralentir', 'Priorité à droite'],
        correctOptionIndex: 1,
        explanation: 'Le dos ou la poitrine de l\'agent vous fait face = arrêt obligatoire.',
      },
      {
        questionText: '8. Sur un carrefour à sens giratoire à 2 voies, pour tourner à gauche, vous vous placez sur :',
        options: ['La voie de droite uniquement', 'La voie de gauche dès l\'entrée si la voie est libre', 'La bande d\'arrêt d\'urgence', 'Au milieu à cheval sur les lignes'],
        correctOptionIndex: 1,
        explanation: 'Pour emprunter la moitié gauche du giratoire, vous pouvez serrer la voie de gauche.',
      },
      {
        questionText: '9. Un véhicule sortant d\'un parking privé ou d\'un garage doit :',
        options: ['Passer en priorité', 'Céder le passage à tous les usagers de la chaussée publique', 'Klaxonner et s\'engager', 'Accélérer'],
        correctOptionIndex: 1,
        explanation: 'Sortir d\'un chemin privé ou garage impose de céder la priorité à tous.',
      },
      {
        questionText: '10. Si vous êtes engagé dans un carrefour encombré alors que le feu passe au vert, vous devez :',
        options: ['S\'engager quand même', 'Attendre avant d\'entrer que le carrefour soit dégagé pour ne pas le bloquer', 'Rétrograder en 1ère et piler', 'Utiliser le klaxon'],
        correctOptionIndex: 1,
        explanation: 'Il est interdit de s\'engager dans une intersection si l\'on risque d\'y être immobilisé et de bloquer la circulation.',
      },
    ],
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    _id: 'quiz-mod-3',
    _type: 'quiz',
    module: { _type: 'reference', _ref: 'mod-3' },
    timerSeconds: 600,
    questions: [
      {
        questionText: '1. Quelle est la formule approximative pour évaluer la distance de sécurité minimale sur autoroute à 130 km/h ?',
        options: ['Multiplier le chiffre des dizaines par 2', 'Multiplier le chiffre des dizaines par 6 (ex: 13 x 6 = 78 mètres)', 'Multiplier la vitesse par 3', 'Compter 1 seconde entre deux véhicules'],
        correctOptionIndex: 1,
        explanation: 'Distance de sécurité en mètres ≈ (chiffre des dizaines de la vitesse) × 6, soit ~78m à 130 km/h.',
      },
      {
        questionText: '2. En cas de pluie sur autoroute, la vitesse maximale autorisée passe de 130 km/h à :',
        options: ['120 km/h', '110 km/h', '100 km/h', '90 km/h'],
        correctOptionIndex: 1,
        explanation: 'Par temps de pluie, la vitesse limite sur autoroute s\'abaisse à 110 km/h.',
      },
      {
        questionText: '3. L\'éco-conduite permet de réduire sa consommation de carburant de :',
        options: ['1 à 2 %', 'Jusqu\'à 15 à 20 %', '50 %', 'Elle n\'a aucun impact'],
        correctOptionIndex: 1,
        explanation: 'Une conduite souple et anticipative réduit la consommation et l\'usure de 15 à 20%.',
      },
      {
        questionText: '4. Pendant le temps de réaction (moyen 1 sec), à 50 km/h vous parcourez environ :',
        options: ['5 mètres', '15 mètres', '25 mètres', '50 mètres'],
        correctOptionIndex: 1,
        explanation: 'Multipliez la dizaine de la vitesse par 3 : 5 x 3 = 15 mètres.',
      },
      {
        questionText: '5. Quelle est la distance de freinage sur sol mouillé par rapport à un sol sec ?',
        options: ['Identique', 'Doublée (multipliée par 2)', 'Divisée par 2', 'Triplée'],
        correctOptionIndex: 1,
        explanation: 'L\'eau réduit l\'adhérence des pneumatiques et double la distance de freinage.',
      },
      {
        questionText: '6. Si vous doublez votre vitesse (passer de 50 km/h à 100 km/h), votre distance de freinage est :',
        options: ['Doublée', 'Triplée', 'Quadruplée (multipliée par 4)', 'Identique'],
        correctOptionIndex: 2,
        explanation: 'La distance de freinage varie avec le carré de la vitesse : vitesse x2 = freinage x4 !',
      },
      {
        questionText: '7. Quel intervalle de temps devez-vous toujours maintenir avec le véhicule qui vous précède ?',
        options: ['Au moins 0,5 seconde', 'Au moins 1 seconde', 'Au moins 2 secondes', 'Au moins 5 secondes'],
        correctOptionIndex: 2,
        explanation: 'La loi impose un intervalle de sécurité d\'au moins 2 secondes.',
      },
      {
        questionText: '8. Quelle attitude favorise l\'éco-conduite en ville ?',
        options: ['Pousser les rapports de vitesse au rupteur', 'Anticiper les ralentissements et utiliser le frein moteur', 'Accélérer fortement avant le feu rouge', 'Rouler au point mort dans les descentes'],
        correctOptionIndex: 1,
        explanation: 'Anticiper évite les freinages brusques et relances énergivores.',
      },
      {
        questionText: '9. Un sous-gonflage des pneumatiques de 0,5 bar provoque :',
        options: ['Une baisse de consommation', 'Une surconsommation de carburant et un risque d\'éclatement', 'Une meilleure tenue de route', 'Aucun effet'],
        correctOptionIndex: 1,
        explanation: 'Des pneus sous-gonflés augmentent la résistance au roulement et la consommation de carburant.',
      },
      {
        questionText: '10. En présence d\'un brouillard épais réduisant la visibilité à moins de 50 mètres, la vitesse est limitée à :',
        options: ['80 km/h', '70 km/h', '50 km/h sur tout le réseau (y compris autoroute)', '30 km/h'],
        correctOptionIndex: 2,
        explanation: 'Lorsque la visibilité est inférieure à 50 mètres, la vitesse maximale est limitée à 50 km/h sur l\'ensemble des routes.',
      },
    ],
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
];

const INITIAL_PROGRESSIONS: ProgressionModule[] = [];

const INITIAL_LOGS: LogActivite[] = [];

const INITIAL_CERTIFICATS: Certificat[] = [];

const INITIAL_SETTINGS: GlobalSettings = {
  defaultMinWatchPercentage: 80,
  defaultMinQuizScore: 70,
  allowMultipleSessions: false,
  maintenanceMode: false,
};

// In-Memory Data Store class
class InMemorySanityStore {
  public autoEcoles: AutoEcole[] = [];
  public users: User[] = [
    {
      _id: 'user-super-admin',
      _type: 'user',
      name: 'Matoa Super Admin',
      email: 'matoa@gmail.com',
      phone: '01 00 00 00 00',
      role: UserRole.SUPER_ADMIN,
      passwordHash: 'qlac485!',
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
  ];
  public eleves: Eleve[] = [];
  public programmesPermis: ProgrammePermis[] = [];
  public modules: ModuleFormation[] = [];
  public quizzes: Quiz[] = [];
  public progressions: ProgressionModule[] = [];
  public logs: LogActivite[] = [];
  public certificats: Certificat[] = [];
  public settings: GlobalSettings = { ...INITIAL_SETTINGS };

  public clearDemoData() {
    this.autoEcoles = [];
    this.eleves = [];
    this.programmesPermis = [];
    this.modules = [];
    this.quizzes = [];
    this.progressions = [];
    this.logs = [];
    this.certificats = [];
  }

  // Helper to resolve autoEcole reference or object
  public getAutoEcoleById(idOrRef: string | any): AutoEcole | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.autoEcoles.find((ae) => ae._id === refId);
  }

  // Helper to resolve user reference
  public getUserById(idOrRef: string | any): User | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.users.find((u) => u._id === refId);
  }

  // Helper to resolve eleve reference
  public getEleveById(idOrRef: string | any): Eleve | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.eleves.find((el) => el._id === refId);
  }

  // Helper to resolve programmePermis reference
  public getProgrammePermisById(idOrRef: string | any): ProgrammePermis | undefined {
    if (!idOrRef) return undefined;
    const refId = typeof idOrRef === 'string' ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.programmesPermis.find((p) => p._id === refId);
  }

  // Get modules filtered for a student's assigned program or permit type
  public getModulesForEleve(eleveId: string): ModuleFormation[] {
    const eleve = this.getEleveById(eleveId);
    if (!eleve) return this.modules.filter((m) => m.isActive);

    const progId = eleve.programmePermis
      ? typeof eleve.programmePermis === 'string'
        ? eleve.programmePermis
        : (eleve.programmePermis as any)._ref || (eleve.programmePermis as any)._id
      : null;

    if (progId) {
      const prog = this.getProgrammePermisById(progId);
      if (prog && prog.modules && prog.modules.length > 0) {
        const moduleIds = prog.modules.map((m: any) => (typeof m === 'string' ? m : m._ref || m._id));
        const matched = this.modules.filter((m) => moduleIds.includes(m._id) && m.isActive);
        if (matched.length > 0) {
          return matched.sort((a, b) => a.ordre - b.ordre);
        }
      }
    }

    // Fallback filter by typePermis
    const typeP = eleve.typePermis || 'B';
    const filteredByType = this.modules.filter(
      (m) =>
        m.isActive &&
        (m.typePermis === typeP ||
          !m.typePermis ||
          (m.programmePermis &&
            (typeof m.programmePermis === 'string'
              ? this.getProgrammePermisById(m.programmePermis)?.typePermis === typeP
              : (m.programmePermis as any).typePermis === typeP)))
    );

    if (filteredByType.length > 0) {
      return filteredByType.sort((a, b) => a.ordre - b.ordre);
    }

    // Ultimate fallback: return active modules sorted
    return this.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
  }

  // Helper for safe weak references in Sanity mutations
  private toWeakRef(refObjOrId: any) {
    if (!refObjOrId) return undefined;
    const refId = typeof refObjOrId === 'string' ? refObjOrId : refObjOrId._ref || refObjOrId._id;
    if (!refId) return undefined;
    return { _type: 'reference', _ref: refId, _weak: true };
  }

  // Add Log Entry
  public addLog(
    actorUser: User | string,
    typeAction: ActionType,
    description: string,
    autoEcoleId?: string
  ): LogActivite {
    const userObj = typeof actorUser === 'string' ? this.getUserById(actorUser) : actorUser;
    const aeId = autoEcoleId || (userObj?.autoEcole ? (typeof userObj.autoEcole === 'string' ? userObj.autoEcole : (userObj.autoEcole as any)._ref || (userObj.autoEcole as any)._id) : undefined);

    const newLog: LogActivite = {
      _id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      _type: 'logActivite',
      actorUser: userObj ? { _type: 'reference', _ref: userObj._id } : { _type: 'reference', _ref: 'system' },
      actorName: userObj?.name || 'Système',
      actorRole: userObj?.role || UserRole.SUPER_ADMIN,
      autoEcole: aeId ? { _type: 'reference', _ref: aeId } : undefined,
      typeAction,
      description,
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(newLog);
    this.syncLogToSanity(newLog);
    return newLog;
  }

  // Sanity Mutations Sync
  public async syncAutoEcoleToSanity(ae: AutoEcole) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: ae._id,
        _type: 'autoEcole',
        name: ae.name,
        codeAutoEcoleUnique: ae.codeAutoEcoleUnique,
        adresse: ae.adresse,
        contact: ae.contact,
        logo: ae.logo,
        slogan: ae.slogan,
        couleursTheme: ae.couleursTheme,
        isActive: ae.isActive,
        createdAt: ae.createdAt,
        updatedAt: ae.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (autoEcole):', err);
    }
  }

  public async syncLogToSanity(log: LogActivite) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: log._id,
        _type: 'logActivite',
        actorUser: this.toWeakRef(log.actorUser),
        actorName: log.actorName,
        actorRole: log.actorRole,
        autoEcole: this.toWeakRef(log.autoEcole),
        typeAction: log.typeAction,
        description: log.description,
        timestamp: log.timestamp,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (logActivite):', err);
    }
  }

  public async syncUserToSanity(user: User) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: 'user',
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (user):', err);
    }
  }

  public async deleteSanityDocument(docId: string) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.delete(docId);
    } catch (err) {
      console.warn('Sanity delete warning:', err);
    }
  }

  public async syncProgrammePermisToSanity(prog: ProgrammePermis) {
    if (!liveSanityClient) return;
    try {
      const moduleRefs = (prog.modules || []).map((m: any) => this.toWeakRef(m)).filter(Boolean);
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: 'programmePermis',
        typePermis: prog.typePermis,
        titreProgramme: prog.titreProgramme,
        descriptionProgramme: prog.descriptionProgramme,
        modules: moduleRefs,
        isActive: prog.isActive,
        createdAt: prog.createdAt,
        updatedAt: prog.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (programmePermis):', err);
    }
  }

  public async syncEleveToSanity(eleve: Eleve, user: User) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: 'user',
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      await liveSanityClient.createOrReplace({
        _id: eleve._id,
        _type: 'eleve',
        user: this.toWeakRef(eleve.user),
        autoEcole: this.toWeakRef(eleve.autoEcole),
        codeEleveUnique: eleve.codeEleveUnique,
        typePermis: eleve.typePermis,
        programmePermis: this.toWeakRef(eleve.programmePermis),
        dateDebutFormation: eleve.dateDebutFormation,
        dateFinFormation: eleve.dateFinFormation,
        isBlocked: eleve.isBlocked,
        formationActive: eleve.formationActive,
        progressionGlobal: eleve.progressionGlobal,
        createdAt: eleve.createdAt,
        updatedAt: eleve.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (eleve/user):', err);
    }
  }

  public async syncProgressionToSanity(prog: ProgressionModule) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: 'progressionModule',
        eleve: this.toWeakRef(prog.eleve),
        module: this.toWeakRef(prog.module),
        videoWatchTimeSeconds: prog.videoWatchTimeSeconds,
        hasCompletedVideo: prog.hasCompletedVideo,
        quizScore: prog.quizScore,
        quizAttemptCount: prog.quizAttemptCount,
        isModuleValidated: prog.isModuleValidated,
        lastActivityAt: prog.lastActivityAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (progression):', err);
    }
  }

  public async syncModuleToSanity(mod: ModuleFormation) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: mod._id,
        _type: 'moduleFormation',
        code: mod.code,
        title: mod.title,
        summary: mod.summary,
        learningObjectives: mod.learningObjectives,
        ordre: mod.ordre,
        videoUrl: mod.videoUrl,
        durationSeconds: mod.durationSeconds,
        tempsMinimumVisionnage: mod.tempsMinimumVisionnage,
        scoreMinimumQuiz: mod.scoreMinimumQuiz,
        typePermis: mod.typePermis,
        programmePermis: this.toWeakRef(mod.programmePermis),
        isActive: mod.isActive,
        lecons: mod.lecons,
        createdAt: mod.createdAt,
        updatedAt: mod.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (moduleFormation):', err);
    }
  }

  public async syncQuizToSanity(quiz: Quiz) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: quiz._id,
        _type: 'quiz',
        title: quiz.title,
        module: this.toWeakRef(quiz.module),
        timerSeconds: quiz.timerSeconds,
        scoreMinimum: quiz.scoreMinimum,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (quiz):', err);
    }
  }

  public async syncCertificatToSanity(cert: Certificat) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: cert._id,
        _type: 'certificat',
        eleve: this.toWeakRef(cert.eleve),
        autoEcole: this.toWeakRef(cert.autoEcole),
        dateEmission: cert.dateEmission,
        certificateCode: cert.certificateCode,
        status: cert.status,
        createdAt: cert.createdAt,
      });
    } catch (err) {
      console.warn('Sanity mutation sync warning (certificat):', err);
    }
  }

  public async purgeDemoElevesFromSanity() {
    if (!liveSanityClient) return;
    try {
      const demoIds = [
        'ae-001', 'ae-002', 'user-ae-001', 'user-ae-002',
        'eleve-001', 'eleve-002', 'eleve-003', 'eleve-004',
        'user-eleve-1', 'user-eleve-2', 'user-eleve-3', 'user-eleve-4',
        'prog-001-mod-1', 'prog-001-mod-2', 'prog-001-mod-3',
        'prog-002-mod-1', 'prog-002-mod-2', 'prog-002-mod-3',
        'cert-001'
      ];
      for (const id of demoIds) {
        try {
          await liveSanityClient.delete(id);
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.warn('Nettoyage démo warning:', err);
    }
  }

  public async seedInitialDatasetToSanity() {
    if (!liveSanityClient) return;
    console.log('🌱 Seeding default initial data into Sanity Cloud...');
    if (this.autoEcoles.length === 0) this.autoEcoles = [...INITIAL_AUTO_ECOLES];
    if (this.users.length <= 1) this.users = [...INITIAL_USERS];
    if (this.eleves.length === 0) this.eleves = [...INITIAL_ELEVES];
    if (this.programmesPermis.length === 0) this.programmesPermis = [...INITIAL_PROGRAMMES_PERMIS];
    if (this.modules.length === 0) this.modules = [...INITIAL_MODULES];
    if (this.quizzes.length === 0) this.quizzes = [...INITIAL_QUIZZES];
    if (this.progressions.length === 0) this.progressions = [...INITIAL_PROGRESSIONS];
    if (this.logs.length === 0) this.logs = [...INITIAL_LOGS];
    if (this.certificats.length === 0) this.certificats = [...INITIAL_CERTIFICATS];

    try {
      for (const ae of this.autoEcoles) await this.syncAutoEcoleToSanity(ae);
      for (const u of this.users) await this.syncUserToSanity(u);
      for (const prog of this.programmesPermis) await this.syncProgrammePermisToSanity(prog);
      for (const m of this.modules) await this.syncModuleToSanity(m);
      for (const q of this.quizzes) await this.syncQuizToSanity(q);
      for (const e of this.eleves) {
        const u = this.users.find((usr) => usr._id === (typeof e.user === 'string' ? e.user : (e.user as any)._ref || (e.user as any)._id));
        if (u) await this.syncEleveToSanity(e, u);
      }
      for (const pr of this.progressions) await this.syncProgressionToSanity(pr);
      for (const c of this.certificats) await this.syncCertificatToSanity(c);
      for (const l of this.logs) await this.syncLogToSanity(l);
      console.log('✅ Seeding Sanity Cloud complet !');
    } catch (err) {
      console.warn('Erreur durant le seeding Sanity Cloud:', err);
    }
  }

  public async loadFromSanity() {
    // Clean up demo student records from Sanity Cloud
    await this.purgeDemoElevesFromSanity();

    if (!liveSanityClient) return;
    try {
      console.log('🔄 Sync avec Sanity Cloud (project ID: cchdhqvw)...');
      const [
        remoteAutoEcoles,
        remoteUsers,
        remoteEleves,
        remoteProgrammes,
        remoteModules,
        remoteQuizzes,
        remoteProgressions,
        remoteLogs,
        remoteCertificats
      ] = await Promise.all([
        liveSanityClient.fetch<AutoEcole[]>(`*[_type == "autoEcole"]`),
        liveSanityClient.fetch<User[]>(`*[_type == "user"]`),
        liveSanityClient.fetch<Eleve[]>(`*[_type == "eleve"]`),
        liveSanityClient.fetch<ProgrammePermis[]>(`*[_type == "programmePermis"]`),
        liveSanityClient.fetch<ModuleFormation[]>(`*[_type == "moduleFormation"]`),
        liveSanityClient.fetch<Quiz[]>(`*[_type == "quiz"]`),
        liveSanityClient.fetch<ProgressionModule[]>(`*[_type == "progressionModule"]`),
        liveSanityClient.fetch<LogActivite[]>(`*[_type == "logActivite"]`),
        liveSanityClient.fetch<Certificat[]>(`*[_type == "certificat"]`),
      ]);

      if (remoteAutoEcoles && remoteAutoEcoles.length > 0) {
        this.autoEcoles = remoteAutoEcoles.filter(
          (ae) =>
            ae._id !== 'ae-001' &&
            ae._id !== 'ae-002' &&
            ae.codeAutoEcoleUnique !== 'MATOA-AE-001' &&
            ae.codeAutoEcoleUnique !== 'MATOA-AE-002' &&
            !ae.name?.includes('Conduite Passion') &&
            !ae.name?.includes('Permis Zen')
        );
      } else {
        this.autoEcoles = [];
      }

      // Filter out demo student users, demo auto-école admins, and demo eleves
      const isDemoId = (id: string) =>
        id.startsWith('eleve-00') ||
        id.startsWith('user-eleve-') ||
        id === 'ae-001' || id === 'ae-002' ||
        id === 'user-ae-001' || id === 'user-ae-002' ||
        ['eleve-001', 'eleve-002', 'eleve-003', 'eleve-004', 'user-eleve-1', 'user-eleve-2', 'user-eleve-3', 'user-eleve-4'].includes(id);

      if (remoteUsers && remoteUsers.length > 0) {
        this.users = remoteUsers.filter(
          (u) =>
            !isDemoId(u._id) &&
            u.email !== 'contact@conduitepassion.fr' &&
            u.email !== 'admin@permiszen.fr'
        );
      } else {
        this.users = [...INITIAL_USERS];
      }

      if (remoteEleves && remoteEleves.length > 0) {
        this.eleves = remoteEleves.filter((e) => !isDemoId(e._id));
      } else {
        this.eleves = [];
      }

      if (remoteProgrammes && remoteProgrammes.length > 0) this.programmesPermis = remoteProgrammes;
      if (remoteModules && remoteModules.length > 0) this.modules = remoteModules;
      if (remoteQuizzes && remoteQuizzes.length > 0) this.quizzes = remoteQuizzes;

      if (remoteProgressions && remoteProgressions.length > 0) {
        this.progressions = remoteProgressions.filter((pr) => {
          const elId = typeof pr.eleve === 'string' ? pr.eleve : (pr.eleve as any)?._ref || (pr.eleve as any)?._id;
          return elId && !isDemoId(elId) && !pr._id.startsWith('prog-00');
        });
      } else {
        this.progressions = [];
      }

      if (remoteLogs && remoteLogs.length > 0) this.logs = remoteLogs;

      if (remoteCertificats && remoteCertificats.length > 0) {
        this.certificats = remoteCertificats.filter((c) => {
          const elId = typeof c.eleve === 'string' ? c.eleve : (c.eleve as any)?._ref || (c.eleve as any)?._id;
          return elId && !isDemoId(elId) && c._id !== 'cert-001';
        });
      } else {
        this.certificats = [];
      }

      // Always ensure Super Admin user exists with matoa@gmail.com / qlac485!
      let superAdmin = this.users.find((u) => u.role === UserRole.SUPER_ADMIN);
      if (!superAdmin) {
        superAdmin = {
          _id: 'user-super-admin',
          _type: 'user',
          name: 'Matoa Super Admin',
          email: 'matoa@gmail.com',
          phone: '01 00 00 00 00',
          role: UserRole.SUPER_ADMIN,
          passwordHash: 'qlac485!',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.users.unshift(superAdmin);
        await this.syncUserToSanity(superAdmin);
      } else {
        superAdmin.email = 'matoa@gmail.com';
        superAdmin.passwordHash = 'qlac485!';
        await this.syncUserToSanity(superAdmin);
      }

      // If remote dataset is empty, seed initial data into Sanity Cloud
      if (!remoteAutoEcoles || remoteAutoEcoles.length === 0 || !remoteModules || remoteModules.length === 0) {
        await this.seedInitialDatasetToSanity();
      }

      console.log(`✅ Sanity Synchronisé ! (${this.autoEcoles.length} auto-écoles, ${this.users.length} utilisateurs, ${this.eleves.length} élèves, ${this.modules.length} modules)`);
    } catch (err) {
      console.warn('⚠️ Avertissement lors de la synchronisation Sanity:', err);
    }
  }
}

export const inMemoryStore = new InMemorySanityStore();
