import { ProgrammePermis, ModuleFormation, Quiz } from '../types';

export const PERMIS_B_PROGRAMME: ProgrammePermis = {
  "_id": "prog-permis-b",
  "_type": "programmePermis",
  "typePermis": "B",
  "titreProgramme": "Programme officiel complet Permis B (15 Modules)",
  "descriptionProgramme": "Programme officiel complet du Permis B structuré en 15 modules pédagogiques exhaustifs avec cours vidéo, leçons séquentielles, mini-quiz d’ancrage et évaluations finales certifiantes de 10 questions.",
  "modules": [
    "mod-1",
    "mod-2",
    "mod-3",
    "mod-4",
    "mod-5",
    "mod-6",
    "mod-7",
    "mod-8",
    "mod-9",
    "mod-10",
    "mod-11",
    "mod-12",
    "mod-13",
    "mod-14",
    "mod-15"
  ],
  "isActive": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z"
};

export const PERMIS_B_MODULES: ModuleFormation[] = [
  {
    "_id": "mod-1",
    "_type": "moduleFormation",
    "code": "MOD-001",
    "title": "Module 1 — Comprendre le véhicule",
    "summary": "Découverte des grandes parties d'un véhicule léger, du poste de conduite et de ses commandes, des voyants d'alerte et des systèmes de sécurité active et passive.",
    "learningObjectives": [
      "Identifier et nommer les parties principales de la carrosserie, du moteur et des essieux",
      "Maîtriser les réglages ergonomiques et les commandes du poste de conduite",
      "Comprendre la signification des témoins et voyants lumineux du tableau de bord",
      "Connaître les équipements de sécurité (ceintures, airbags, ABS, pneus, contrôle technique)"
    ],
    "ordre": 1,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=jnJH8szTGuM",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-1-1",
        "_type": "lecon",
        "title": "Leçon 1.1 — Les parties principales de la voiture",
        "ordre": 1,
        "description": "Découverte des grandes parties d’un véhicule léger : carrosserie, moteur, habitacle, coffre, essieux, roues, leurs fonctions et le vocabulaire utilisé.",
        "videoUrl": "https://www.youtube.com/watch?v=jnJH8szTGuM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-1-1",
            "questionText": "Où se situe généralement le moteur de la plupart des voitures légères ?",
            "options": [
              "Dans le coffre arrière",
              "Sous le capot avant",
              "Sous les sièges passagers",
              "Dans les portières"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le moteur est majoritairement placé sous le capot à l’avant du véhicule."
          },
          {
            "_id": "q-lec-1-1-2",
            "questionText": "Quelle est la fonction essentielle de la carrosserie moderne ?",
            "options": [
              "Rôle uniquement décoratif",
              "Protéger l’habitacle en absorbant l’énergie des chocs",
              "Augmenter le poids",
              "Conserver le moteur au froid"
            ],
            "correctOptionIndex": 1,
            "explanation": "La carrosserie absorbe l’énergie des impacts pour protéger les occupants."
          },
          {
            "_id": "q-lec-1-1-3",
            "questionText": "Comment appelle-t-on l’espace intérieur réservé aux passagers et au conducteur ?",
            "options": [
              "Le châssis",
              "L’habitacle",
              "Le compartiment moteur",
              "Le coffre"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’habitacle est l’espace de vie intérieur du véhicule."
          },
          {
            "_id": "q-lec-1-1-4",
            "questionText": "Que relie un essieu sur une voiture ?",
            "options": [
              "Le volant aux rétroviseurs",
              "Les roues opposées d’un même train",
              "Les phares à la batterie",
              "L’échappement"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’essieu supporte les roues opposées d’un même axe."
          },
          {
            "_id": "q-lec-1-1-5",
            "questionText": "Pourquoi connaître le vocabulaire des composants du véhicule ?",
            "options": [
              "Pour réduire l’assurance",
              "Pour réussir les vérifications de l’examen pratique",
              "Pour réparer le moteur soi-même",
              "Ce n’est pas utile"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ce vocabulaire est directement évalué lors des vérifications au permis."
          }
        ]
      },
      {
        "_id": "lec-1-2",
        "_type": "lecon",
        "title": "Leçon 1.2 — Le poste de conduite et les commandes",
        "ordre": 2,
        "description": "Volant, pédales, levier de vitesses, frein à main, clignotants, essuie-glaces et réglages avant départ.",
        "videoUrl": "https://www.youtube.com/watch?v=P9ZXwt5XvGk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-2-1",
            "questionText": "Dans quel ordre doit-on régler son poste de conduite ?",
            "options": [
              "Rétroviseurs, siège, ceinture",
              "Siège/dossier, rétroviseurs, volant puis ceinture",
              "Ceinture en premier, puis siège",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "On règle l’assise, puis les rétroviseurs et le volant, et enfin la ceinture."
          },
          {
            "_id": "q-lec-1-2-2",
            "questionText": "Quel pied actionne la pédale d’embrayage sur boîte mécanique ?",
            "options": [
              "Le pied gauche uniquement",
              "Le pied droit",
              "Les deux pieds",
              "La main droite"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le pied gauche est exclusivement réservé à l’embrayage."
          },
          {
            "_id": "q-lec-1-2-3",
            "questionText": "À quoi sert le frein de stationnement (frein à main) ?",
            "options": [
              "À ralentir en virage",
              "À maintenir le véhicule totalement immobilisé à l’arrêt",
              "À passer la marche arrière",
              "À freiner d’urgence"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il bloque mécaniquement les roues à l’arrêt ou au stationnement."
          },
          {
            "_id": "q-lec-1-2-4",
            "questionText": "Quelle est la position idéale des mains sur le volant ?",
            "options": [
              "À 12h00",
              "À 9h15 ou 10h10",
              "À 6h00",
              "Une seule main en haut"
            ],
            "correctOptionIndex": 1,
            "explanation": "La position 9h15 ou 10h10 assure précision et sécurité airbag."
          },
          {
            "_id": "q-lec-1-2-5",
            "questionText": "Comment régler son rétroviseur intérieur ?",
            "options": [
              "Pour voir son visage",
              "Pour cadrer toute la lunette arrière",
              "Vers le toit",
              "Vers le bas"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il doit cadrer l’intégralité de la vitre arrière sans bouger la tête."
          }
        ]
      },
      {
        "_id": "lec-1-3",
        "_type": "lecon",
        "title": "Leçon 1.3 — Tableau de bord, voyants et témoins",
        "ordre": 3,
        "description": "Voyants de feux, carburant, huile, température moteur, freins et batterie ; conduite à tenir selon l’alerte.",
        "videoUrl": "https://www.youtube.com/watch?v=4T35JP22iPA",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-3-1",
            "questionText": "Que signifie l’allumage d’un voyant de couleur ROUGE en roulant ?",
            "options": [
              "Information simple",
              "Danger grave : arrêt immédiat obligatoire en sécurité",
              "Feux de route allumés",
              "Rappel révision"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les voyants rouges imposent un arrêt immédiat pour éviter un accident ou une casse moteur."
          },
          {
            "_id": "q-lec-1-3-2",
            "questionText": "Quelle couleur indique un voyant d’avertissement ou de défaut non immédiat ?",
            "options": [
              "Rouge",
              "Orange / Jaune",
              "Bleu",
              "Blanc"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’orange signale une anomalie à faire vérifier rapidement sans arrêt d’urgence."
          },
          {
            "_id": "q-lec-1-3-3",
            "questionText": "Si le voyant rouge d’huile s’allume en circulation, vous devez :",
            "options": [
              "Accélérer",
              "Vous arrêter dès que possible en sécurité et couper le moteur",
              "Continuer le trajet",
              "Mettre la climatisation"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le manque de pression d’huile détruit le moteur en quelques secondes."
          },
          {
            "_id": "q-lec-1-3-4",
            "questionText": "De quelle couleur est le témoin des feux de route ?",
            "options": [
              "Vert",
              "Bleu",
              "Orange",
              "Rouge"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le témoin des feux de route (pleins phares) est toujours bleu."
          },
          {
            "_id": "q-lec-1-3-5",
            "questionText": "À quoi sert la jauge de température du liquide de refroidissement ?",
            "options": [
              "À mesurer l’air de l’habitacle",
              "À surveiller la température de fonctionnement du moteur",
              "À mesurer la vitesse",
              "À régler le chauffage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elle alerte en cas de surchauffe anormale du moteur."
          }
        ]
      },
      {
        "_id": "lec-1-4",
        "_type": "lecon",
        "title": "Leçon 1.4 — Systèmes de sécurité du véhicule",
        "ordre": 4,
        "description": "Ceintures, airbags, ABS, pneus, contrôle technique et vérifications avant de prendre la route.",
        "videoUrl": "https://www.youtube.com/watch?v=mRT5Jyu9lG0",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-4-1",
            "questionText": "Quel est le rôle principal du système ABS lors d’un freinage d’urgence ?",
            "options": [
              "Diviser la distance par deux",
              "Empêcher le blocage des roues pour garder le pouvoir directionnel",
              "Couper le moteur",
              "Accélérer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’ABS évite le blocage des roues et permet de continuer à diriger la voiture."
          },
          {
            "_id": "q-lec-1-4-2",
            "questionText": "Quelle est la profondeur minimale légale des sculptures d’un pneu ?",
            "options": [
              "0,5 mm",
              "1,6 mm",
              "3,0 mm",
              "4,0 mm"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite légale d’usure est de 1,6 mm sur toute la bande de roulement."
          },
          {
            "_id": "q-lec-1-4-3",
            "questionText": "Le port de la ceinture de sécurité est obligatoire pour :",
            "options": [
              "Le conducteur seul",
              "Les places avant",
              "Tous les occupants du véhicule",
              "Hors agglomération seulement"
            ],
            "correctOptionIndex": 2,
            "explanation": "La ceinture est obligatoire à toutes les places équipées."
          },
          {
            "_id": "q-lec-1-4-4",
            "questionText": "À quelle fréquence passe le contrôle technique d’une voiture de plus de 4 ans ?",
            "options": [
              "Tous les ans",
              "Tous les 2 ans",
              "Tous les 3 ans",
              "Tous les 5 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le contrôle technique périodique doit être renouvelé tous les 2 ans."
          },
          {
            "_id": "q-lec-1-4-5",
            "questionText": "L’airbag remplace-t-il la ceinture de sécurité ?",
            "options": [
              "Oui",
              "Non, c’est un complément indispensable à la ceinture",
              "Uniquement en ville",
              "Uniquement pour le passager"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’airbag fonctionne obligatoirement en symbiose avec la ceinture attachée."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-2",
    "_type": "moduleFormation",
    "code": "MOD-002",
    "title": "Module 2 — Règles générales de circulation",
    "summary": "Maîtrise du sens de circulation, du positionnement sur la chaussée, des changements de direction, des arrêts et stationnements, et du partage de la route.",
    "learningObjectives": [
      "Savoir se positionner sur la chaussée selon les voies et lignes",
      "Maîtriser les contrôles rétroviseurs et angles morts pour changer de direction",
      "Distinguer l'arrêt du stationnement et identifier les zones interdites",
      "Partager la route en sécurité avec les usagers vulnérables et poids lourds"
    ],
    "ordre": 2,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-2-1",
        "_type": "lecon",
        "title": "Leçon 2.1 — Sens de circulation et position sur la chaussée",
        "ordre": 1,
        "description": "Circulation à droite, lignes continues et discontinues, voies réservées, bande d’arrêt d’urgence et positionnement.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-1-1",
            "questionText": "De quel côté de la chaussée doit-on circuler en marche normale ?",
            "options": [
              "Au milieu",
              "Le plus près possible du bord droit",
              "À gauche",
              "Où on veut"
            ],
            "correctOptionIndex": 1,
            "explanation": "En France, la circulation s’effectue sur le côté droit de la route."
          },
          {
            "_id": "q-lec-2-1-2",
            "questionText": "Peut-on franchir une ligne blanche continue ?",
            "options": [
              "Oui pour aller plus vite",
              "Non, c’est strictement interdit sauf exceptions réglementaires",
              "Oui avec le clignotant",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Franchir une ligne continue est une infraction grave (3 points)."
          },
          {
            "_id": "q-lec-2-1-3",
            "questionText": "À quoi sert la bande d’arrêt d’urgence (BAU) ?",
            "options": [
              "À doubler les bouchons",
              "Strictement aux arrêts d’urgence en cas de panne ou malaise",
              "À téléphoner",
              "À faire une pause"
            ],
            "correctOptionIndex": 1,
            "explanation": "La BAU est exclusivement réservée aux urgences et aux secours."
          },
          {
            "_id": "q-lec-2-1-4",
            "questionText": "Sur autoroute à 3 voies, quelle voie occuper en trafic fluide ?",
            "options": [
              "La voie du milieu",
              "La voie de gauche",
              "La voie de droite",
              "Au choix"
            ],
            "correctOptionIndex": 2,
            "explanation": "On roule toujours sur la voie de droite hors manœuvre de dépassement."
          },
          {
            "_id": "q-lec-2-1-5",
            "questionText": "Peut-on circuler dans une voie réservée aux bus ?",
            "options": [
              "Oui pour tourner",
              "Non, c’est strictement interdit aux voitures",
              "Oui si on va vite",
              "Le week-end oui"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les couloirs de bus sont réservés aux transports collectifs autorisés."
          }
        ]
      },
      {
        "_id": "lec-2-2",
        "_type": "lecon",
        "title": "Leçon 2.2 — Changements de direction et insertion",
        "ordre": 2,
        "description": "Utilisation des clignotants, contrôles rétroviseurs/angles morts et insertion sur voie rapide.",
        "videoUrl": "https://www.youtube.com/watch?v=P9ZXwt5XvGk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-2-1",
            "questionText": "Avant de changer de direction, quelle est la première action ?",
            "options": [
              "Accélérer",
              "Contrôler rétroviseurs et angle mort",
              "Klaxonner",
              "Freiner"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’observation visuelle complète précède toujours le clignotant."
          },
          {
            "_id": "q-lec-2-2-2",
            "questionText": "Le clignotant donne-t-il la priorité ?",
            "options": [
              "Oui toujours",
              "Non, il avertit de l’intention sans donner la priorité",
              "Oui sur autoroute",
              "Oui en ville"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le clignotant prévient mais ne confère aucun droit de priorité."
          },
          {
            "_id": "q-lec-2-2-3",
            "questionText": "Qu’est-ce que l’angle mort ?",
            "options": [
              "Une route sombre",
              "Une zone masquée hors du champ des rétroviseurs",
              "Un virage serré",
              "L’arrière du véhicule"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est la zone invisible sans un coup d’œil direct par-dessus l’épaule."
          },
          {
            "_id": "q-lec-2-2-4",
            "questionText": "Sur une voie d’insertion, que doit-on faire ?",
            "options": [
              "S’arrêter au début",
              "Accélérer pour atteindre la vitesse du trafic et s’insérer",
              "Forcer le passage",
              "Rouler à 30 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La voie d’insertion sert à synchroniser sa vitesse pour s’intégrer fluidement."
          },
          {
            "_id": "q-lec-2-2-5",
            "questionText": "Pour tourner à gauche dans une rue à sens unique, on se place :",
            "options": [
              "À droite",
              "Le plus à gauche possible avant le carrefour",
              "Au milieu",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "En sens unique, on serre complètement à gauche pour tourner à gauche."
          }
        ]
      },
      {
        "_id": "lec-2-3",
        "_type": "lecon",
        "title": "Leçon 2.3 — Arrêt, stationnement et immobilisation",
        "ordre": 3,
        "description": "Différence entre arrêt et stationnement, zones interdites, règles pour ne pas gêner les usagers.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-3-1",
            "questionText": "Quelle est la définition légale d’un arrêt ?",
            "options": [
              "Une pause de 10 min",
              "Immobilisation temporaire avec conducteur à proximité pour monter/descendre ou charger",
              "Stationner moteur allumé",
              "Bloquer la route"
            ],
            "correctOptionIndex": 1,
            "explanation": "À l’arrêt, le conducteur reste au volant ou à portée pour déplacer la voiture."
          },
          {
            "_id": "q-lec-2-3-2",
            "questionText": "Le stationnement sur un passage piéton est :",
            "options": [
              "Autorisé 5 minutes",
              "Très gênant et dangereux (amende et fourrière)",
              "Gratuit",
              "Toléré la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est une infraction grave qui masque la visibilité des piétons."
          },
          {
            "_id": "q-lec-2-3-3",
            "questionText": "Une ligne jaune continue le long du trottoir indique :",
            "options": [
              "Stationnement gratuit",
              "Arrêt et stationnement strictement interdits",
              "Arrêt autorisé",
              "Réservé aux livraisons"
            ],
            "correctOptionIndex": 1,
            "explanation": "La ligne jaune continue prohibe tout arrêt et stationnement."
          },
          {
            "_id": "q-lec-2-3-4",
            "questionText": "Une ligne jaune discontinue en pointillés indique :",
            "options": [
              "Stationnement libre",
              "Arrêt autorisé, stationnement interdit",
              "Arrêt et stationnement interdits",
              "Parking payant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les pointillés jaunes autorisent l’arrêt rapide mais interdisent le stationnement."
          },
          {
            "_id": "q-lec-2-3-5",
            "questionText": "En stationnement en descente, comment braquer les roues ?",
            "options": [
              "Vers la chaussée",
              "Vers le trottoir",
              "Tout droit",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "Braquer vers le trottoir cale le véhicule en cas de défaillance du frein."
          }
        ]
      },
      {
        "_id": "lec-2-4",
        "_type": "lecon",
        "title": "Leçon 2.4 — Partage de la route avec les autres usagers",
        "ordre": 4,
        "description": "Cohabitation avec piétons, cyclistes, motocyclistes et poids lourds ; distances latérales et anticipation.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-4-1",
            "questionText": "Distance latérale minimale pour dépasser un cycliste en ville ?",
            "options": [
              "0,5 m",
              "1,0 m",
              "1,5 m",
              "2,0 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "En agglomération, l’écart minimal de sécurité est de 1 mètre."
          },
          {
            "_id": "q-lec-2-4-2",
            "questionText": "Face à un piéton engagé ou manifestant l’intention de traverser :",
            "options": [
              "Klaxonner",
              "Lui céder obligatoirement le passage",
              "Accélérer",
              "Passer à côté"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le piéton a la priorité absolue dès qu’il manifeste l’intention de traverser."
          },
          {
            "_id": "q-lec-2-4-3",
            "questionText": "Pourquoi redoubler de vigilance près des poids lourds ?",
            "options": [
              "Ils roulent trop vite",
              "Ils ont d’immenses angles morts autour de leur cabine",
              "Leurs freins sont faibles",
              "Ils n’ont pas de phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leurs grands angles morts masquent complètement les voitures et deux-roues."
          },
          {
            "_id": "q-lec-2-4-4",
            "questionText": "Qu’est-ce qu’un sas vélo devant un feu ?",
            "options": [
              "Un parking",
              "Une zone réservée aux cyclistes pour être vus et démarrer en sécurité",
              "Un passage piéton",
              "Une voie rapide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les automobilistes doivent s’arrêter avant la première ligne du sas vélo."
          },
          {
            "_id": "q-lec-2-4-5",
            "questionText": "Quelle attitude avoir envers les deux-roues motorisés ?",
            "options": [
              "Les bloquer",
              "Vérifier ses angles morts et faciliter leur passage",
              "Klaxonner",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les motards sont vulnérables : une vigilance accrue est indispensable."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-3",
    "_type": "moduleFormation",
    "code": "MOD-003",
    "title": "Module 3 — Signalisation routière",
    "summary": "Apprentissage des familles de panneaux (danger, interdiction, obligation, indication), des marquages au sol et des feux de circulation.",
    "learningObjectives": [
      "Identifier instantanément la forme et la couleur de chaque famille de panneaux",
      "Appliquer les règles associées aux panneaux de danger, interdiction et obligation",
      "Lire et suivre la signalisation d'indication, de direction et de localisation",
      "Comprendre la hiérarchie de la signalisation routière (agents, feux, panneaux, marquage)"
    ],
    "ordre": 3,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-3-1",
        "_type": "lecon",
        "title": "Leçon 3.1 — Panneaux de danger",
        "ordre": 1,
        "description": "Panneaux triangulaires à bord rouge : virages, chaussée glissante, rétrécissement et comportement adapté.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-1-1",
            "questionText": "À quelle distance est implanté un panneau de danger hors agglomération ?",
            "options": [
              "À 50 m",
              "À 150 m du danger",
              "À 500 m",
              "Au niveau du danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "Hors agglomération, la vitesse impose de signaler le danger 150 m en amont."
          },
          {
            "_id": "q-lec-3-1-2",
            "questionText": "Quelle est la forme caractéristique d’un panneau de danger ?",
            "options": [
              "Rond à bord rouge",
              "Triangulaire avec bordure rouge",
              "Carré à fond bleu",
              "Octogonal"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les signaux de danger sont triangulaires pointés vers le haut avec bordure rouge."
          },
          {
            "_id": "q-lec-3-1-3",
            "questionText": "Que faire à la vue d’un panneau de virage dangereux ?",
            "options": [
              "Accélérer",
              "Ralentir et adapter son allure avant d’aborder la courbe",
              "Klaxonner",
              "Allumer les feux de détresse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le ralentissement doit être opéré avant l’inscription dans le virage."
          },
          {
            "_id": "q-lec-3-1-4",
            "questionText": "À quelle distance est implanté un panneau de danger en ville ?",
            "options": [
              "À 15 m",
              "À 50 m",
              "À 150 m",
              "À 300 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "En agglomération, l’implantation standard est à 50 mètres du danger."
          },
          {
            "_id": "q-lec-3-1-5",
            "questionText": "Que signifie un panneau de danger à fond JAUNE ?",
            "options": [
              "Danger permanent",
              "Danger temporaire (travaux/chantier)",
              "Obligation",
              "Information"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le fond jaune caractérise les signaux temporaires de chantier."
          }
        ]
      },
      {
        "_id": "lec-3-2",
        "_type": "lecon",
        "title": "Leçon 3.2 — Panneaux d’interdiction et d’obligation",
        "ordre": 2,
        "description": "Panneaux rouges d’interdiction et bleus d’obligation : vitesses, dépassement et directions imposées.",
        "videoUrl": "https://www.youtube.com/watch?v=SkdobnZSqIE",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-2-1",
            "questionText": "À partir de quel endroit s’applique un panneau d’interdiction ?",
            "options": [
              "À 150 m",
              "Immédiatement à hauteur du panneau",
              "Le lendemain",
              "Au prochain virage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les interdictions prennent effet dès la hauteur du panneau."
          },
          {
            "_id": "q-lec-3-2-2",
            "questionText": "Quelle est la forme et couleur des panneaux d’obligation ?",
            "options": [
              "Carré vert",
              "Rond à fond bleu avec symbole blanc",
              "Triangulaire rouge",
              "Rectangle blanc"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les panneaux d’obligation sont ronds à fond bleu."
          },
          {
            "_id": "q-lec-3-2-3",
            "questionText": "Que signifie un panneau rond blanc barré d’une bande noire ?",
            "options": [
              "Interdiction",
              "Fin de toutes les interdictions précédemment notifiées",
              "Route barrée",
              "Péage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il indique la fin des prescriptions de vitesse et de dépassement."
          },
          {
            "_id": "q-lec-3-2-4",
            "questionText": "Un panneau rond bleu avec flèche à droite impose :",
            "options": [
              "Interdiction à droite",
              "Obligation de tourner à droite",
              "Impasse",
              "Sens unique"
            ],
            "correctOptionIndex": 1,
            "explanation": "La flèche blanche sur fond bleu oblige à emprunter la direction indiquée."
          },
          {
            "_id": "q-lec-3-2-5",
            "questionText": "Le panneau d’interdiction de dépasser (deux voitures rouge/noire) s’applique :",
            "options": [
              "Aux camions seulement",
              "À tous les véhicules à moteur de plus de 2 roues",
              "Aux vélos",
              "Aux piétons"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il interdit le dépassement de tous les véhicules à moteur à 3 ou 4 roues."
          }
        ]
      },
      {
        "_id": "lec-3-3",
        "_type": "lecon",
        "title": "Leçon 3.3 — Panneaux d’indication et de direction",
        "ordre": 3,
        "description": "Panneaux de services, informations et directions pour suivre un itinéraire.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-3-1",
            "questionText": "Quelle est la forme des panneaux d’indication ?",
            "options": [
              "Triangulaire",
              "Carrée ou rectangulaire",
              "Ronde",
              "Ovale"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les signaux d’indication sont carrés ou rectangulaires."
          },
          {
            "_id": "q-lec-3-3-2",
            "questionText": "Quelle est la couleur des panneaux autoroutiers en France ?",
            "options": [
              "Vert",
              "Bleu",
              "Jaune",
              "Blanc"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le bleu est la couleur exclusive du réseau autoroutier."
          },
          {
            "_id": "q-lec-3-3-3",
            "questionText": "Quelle couleur indique un itinéraire important hors autoroute ?",
            "options": [
              "Bleu",
              "Vert",
              "Blanc",
              "Marron"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le vert relie les grandes villes sur le réseau routier principal."
          },
          {
            "_id": "q-lec-3-3-4",
            "questionText": "Que signalent les panneaux à fond MARRON ?",
            "options": [
              "Des dangers",
              "Des sites d’intérêt touristique ou culturel",
              "Des interdictions",
              "Des hôpitaux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le fond marron est réservé à la signalisation touristique et historique."
          },
          {
            "_id": "q-lec-3-3-5",
            "questionText": "Un panneau carré bleu avec un pictogramme de lit indique :",
            "options": [
              "Une aire de jeux",
              "Un hôtel ou hébergement",
              "Une aire de repos",
              "Un hôpital"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est un signal de service indiquant un hôtel."
          }
        ]
      },
      {
        "_id": "lec-3-4",
        "_type": "lecon",
        "title": "Leçon 3.4 — Marquages au sol et feux de circulation",
        "ordre": 4,
        "description": "Lignes, zébras, passages piétons, flèches et feux tricolores ; hiérarchie de la signalisation.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-4-1",
            "questionText": "En cas de contradiction, quelle autorité prévaut absolument ?",
            "options": [
              "Les panneaux",
              "Les feux tricolores",
              "Les agents réglant la circulation",
              "Le marquage"
            ],
            "correctOptionIndex": 2,
            "explanation": "Les ordres des agents de police prévalent sur toute autre signalisation."
          },
          {
            "_id": "q-lec-3-4-2",
            "questionText": "Que faire à l’approche d’un feu jaune (orange) fixe ?",
            "options": [
              "Accélérer",
              "S’arrêter sauf en cas d’impossibilité de le faire en sécurité",
              "Klaxonner",
              "Faire demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’arrêt est obligatoire au feu orange fixe sauf danger immédiat à l’arrière."
          },
          {
            "_id": "q-lec-3-4-3",
            "questionText": "Que signifient des zébras au sol ?",
            "options": [
              "Stationnement rapide",
              "Zone strictement interdite à la circulation, l’arrêt et le stationnement",
              "Piste cyclable",
              "Passage piéton"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les zébras sont sanctuarisés : interdiction totale d’y pénétrer."
          },
          {
            "_id": "q-lec-3-4-4",
            "questionText": "Que signifie un feu jaune clignotant ?",
            "options": [
              "Feu en panne : respecter les panneaux sous le feu ou la priorité à droite",
              "Arrêt obligatoire",
              "Rouler à 90 km/h",
              "Passer sans regarder"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le clignotant jaune invite à la prudence et renvoie aux règles de priorité."
          },
          {
            "_id": "q-lec-3-4-5",
            "questionText": "Des flèches de rabattement au sol annoncent :",
            "options": [
              "Un virage",
              "L’imminence d’une ligne continue obligeant à se rabattre",
              "Une station-service",
              "Une sortie"
            ],
            "correctOptionIndex": 1,
            "explanation": "Trois flèches successives signalent la fermeture de la voie de dépassement."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-4",
    "_type": "moduleFormation",
    "code": "MOD-004",
    "title": "Module 4 — Feux et priorités",
    "summary": "Règles de priorité à droite, panneaux Stop et Cédez le passage, feux tricolores, véhicules prioritaires et cas particuliers.",
    "learningObjectives": [
      "Appliquer la règle de la priorité à droite en l'absence de signalisation",
      "Respecter l'arrêt absolu au Stop et l'obligation du Cédez le passage",
      "Maîtriser les feux tricolores, flèches directionnelles et feux clignotants",
      "Faciliter le passage des véhicules d'urgence prioritaires (SAMU, Police, Pompiers)"
    ],
    "ordre": 4,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-4-1",
        "_type": "lecon",
        "title": "Leçon 4.1 — La règle de la priorité à droite",
        "ordre": 1,
        "description": "Application de la priorité à droite en l’absence de signalisation et cas particuliers.",
        "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-1-1",
            "questionText": "Quand s’applique la règle de la priorité à droite ?",
            "options": [
              "Uniquement sur autoroute",
              "À toute intersection dépourvue de signalisation de priorité",
              "Quand le feu est vert",
              "Sur route prioritaire"
            ],
            "correctOptionIndex": 1,
            "explanation": "En l’absence de panneau ou de feu, la priorité à droite est la règle générale."
          },
          {
            "_id": "q-lec-4-1-2",
            "questionText": "Un véhicule sort d’une cour privée ou d’un chemin de terre :",
            "options": [
              "Il a la priorité à droite",
              "Il doit céder le passage à tous les usagers de la route",
              "Il passe en premier s’il va vite",
              "Il a priorité sur les piétons"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les sorties de propriétés privées et chemins de terre n’ont jamais la priorité à droite."
          },
          {
            "_id": "q-lec-4-1-3",
            "questionText": "À l’approche d’une priorité à droite sans visibilité, vous devez :",
            "options": [
              "Accélérer",
              "Ralentir et préparer le pied au-dessus du frein",
              "Klaxonner",
              "Allumer les feux de détresse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut ralentir et vérifier l’absence de véhicule arrivant sur votre droite."
          },
          {
            "_id": "q-lec-4-1-4",
            "questionText": "Dans une intersection à 4 branches toutes régies par la priorité à droite, qui passe ?",
            "options": [
              "Le plus gros véhicule",
              "La courtoisie et un signe mutuel débloquent la situation",
              "Le plus rapide",
              "Personne ne passe jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "La courtoisie et la communication visuelle permettent de débloquer l’intersection."
          },
          {
            "_id": "q-lec-4-1-5",
            "questionText": "Le panneau « Croix de Saint-André » (X rouge sur triangle) annonce :",
            "options": [
              "Un hôpital",
              "Une intersection où s’applique la priorité à droite",
              "Un passage piéton",
              "Une interdiction"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ce panneau triangulaire rappelle explicitement la priorité à droite à la prochaine intersection."
          }
        ]
      },
      {
        "_id": "lec-4-2",
        "_type": "lecon",
        "title": "Leçon 4.2 — Panneaux Stop et Cédez le passage",
        "ordre": 2,
        "description": "Arrêt obligatoire au Stop et obligation de céder le passage lorsqu’il y a lieu.",
        "videoUrl": "https://www.youtube.com/watch?v=KBTd5Vh-smw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-2-1",
            "questionText": "Face à un panneau STOP, où doit-on marquer l’arrêt ?",
            "options": [
              "Au niveau du panneau",
              "À la ligne blanche continue peinte au sol",
              "Au milieu du carrefour",
              "10 m avant"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’arrêt complet se fait au niveau de la ligne blanche transversale du Stop."
          },
          {
            "_id": "q-lec-4-2-2",
            "questionText": "Si la voie est totalement libre au panneau STOP, l’arrêt est-il obligatoire ?",
            "options": [
              "Non, un simple ralentissement suffit",
              "Oui, l’arrêt complet et net des roues est strictement obligatoire",
              "Seulement de nuit",
              "Seulement si un policier est présent"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le Stop impose un temps d’arrêt complet même en l’absence totale d’usager."
          },
          {
            "_id": "q-lec-4-2-3",
            "questionText": "À un Cédez le passage, si aucun véhicule n’arrive à droite ni à gauche :",
            "options": [
              "L’arrêt complet est obligatoire",
              "Je peux passer sans m’arrêter en ralentissant par prudence",
              "Je dois klaxonner",
              "Je fais demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Au Cédez le passage, l’arrêt n’est obligatoire que si un usager prioritaire approche."
          },
          {
            "_id": "q-lec-4-2-4",
            "questionText": "Le panneau carré jaune bordé de blanc indique :",
            "options": [
              "Une zone de travaux",
              "Une route à caractère prioritaire à toutes les intersections",
              "Une fin d’interdiction",
              "Un péage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il confère la priorité de passage sur tout l’itinéraire jusqu’au panneau barré."
          },
          {
            "_id": "q-lec-4-2-5",
            "questionText": "Quelle sanction encourt le non-respect d’un panneau STOP ?",
            "options": [
              "Une amende sans perte de point",
              "Une amende de 135 € et un retrait de 4 points sur le permis",
              "La prison ferme",
              "Aucune sanction"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorité au Stop est puni d’un retrait de 4 points."
          }
        ]
      },
      {
        "_id": "lec-4-3",
        "_type": "lecon",
        "title": "Leçon 4.3 — Priorités aux feux tricolores",
        "ordre": 3,
        "description": "Feu vert, orange, rouge, flèches directionnelles, feux clignotants et feux piétons.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-3-1",
            "questionText": "Au feu vert, pour tourner à gauche, à qui devez-vous céder le passage ?",
            "options": [
              "À personne",
              "Aux véhicules arrivant en face et aux piétons traversant la rue sécante",
              "Aux voitures derrière vous",
              "Aux bus uniquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "En tournant à gauche, on coupe la trajectoire des véhicules d’en face et des piétons engagés."
          },
          {
            "_id": "q-lec-4-3-2",
            "questionText": "Que permet une flèche verte directionnelle orientée vers la droite sous un feu rouge ?",
            "options": [
              "Tourner à droite immédiatement sans céder le passage",
              "Tourner à droite en cédant le passage aux piétons et véhicules prioritaires",
              "Aller tout droit",
              "Stationner"
            ],
            "correctOptionIndex": 1,
            "explanation": "La flèche clignotante ou fixe autorise à tourner dans la direction indiquée en cédant le passage."
          },
          {
            "_id": "q-lec-4-3-3",
            "questionText": "Si les feux sont éteints ou clignotent en jaune au milieu :",
            "options": [
              "J’applique la priorité des panneaux placés sur le poteau ou la priorité à droite",
              "Je passe à toute vitesse",
              "Je m’arrête 5 minutes",
              "Je fais demi-tour"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les panneaux sous les feux prennent le relais dès que les feux cessent de fonctionner."
          },
          {
            "_id": "q-lec-4-3-4",
            "questionText": "Le franchissement d’un feu rouge est sanctionné par :",
            "options": [
              "Retrait de 1 point",
              "Retrait de 4 points et 135 € d’amende",
              "Une simple lettre",
              "Un stage de 1 heure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Griller un feu rouge coûte 4 points sur le permis de conduire."
          },
          {
            "_id": "q-lec-4-3-5",
            "questionText": "Si la circulation est bloquée au-delà du carrefour alors que le feu est vert :",
            "options": [
              "Je m’engage quand même et je bloque l’intersection",
              "Je reste avant la ligne pour ne pas encombrer le carrefour",
              "Je klaxonne fort",
              "Je monte sur le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est interdit de s’engager dans une intersection si on risque d’y rester bloqué."
          }
        ]
      },
      {
        "_id": "lec-4-4",
        "_type": "lecon",
        "title": "Leçon 4.4 — Véhicules et situations prioritaires",
        "ordre": 4,
        "description": "Comportement envers les secours en intervention, bus et convois exceptionnels.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-4-1",
            "questionText": "Quels véhicules sont prioritaires avec gyrophare bleu et sirène deux-tons ?",
            "options": [
              "Les taxis et VTC",
              "Police, Gendarmerie, Pompiers, SAMU/SMUR et douanes",
              "Les camions poubelles",
              "Tous les bus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces services de secours et forces de l’ordre sont prioritaires en intervention."
          },
          {
            "_id": "q-lec-4-4-2",
            "questionText": "À l’approche d’un véhicule de secours avec avertisseurs sonores et lumineux activés, vous devez :",
            "options": [
              "Accélérer pour ne pas le gêner",
              "Ralentir, serrer à droite ou vous arrêter pour lui ouvrir la voie",
              "Conserver votre vitesse au milieu",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut faciliter immédiatement le passage des véhicules d’urgence."
          },
          {
            "_id": "q-lec-4-4-3",
            "questionText": "En agglomération, quelle est la règle envers un bus qui quitte son arrêt ?",
            "options": [
              "Je le double en klaxonnant",
              "Je ralentis et je lui facilite le départ",
              "Je lui coupe la route",
              "Le bus n’a aucun droit"
            ],
            "correctOptionIndex": 1,
            "explanation": "En ville, les usagers doivent faciliter l’insertion des bus quittant leur arrêt."
          },
          {
            "_id": "q-lec-4-4-4",
            "questionText": "Les ambulances privées avec feu bleu clignotant sans deux-tons sont :",
            "options": [
              "Prioritaires absolues",
              "Des véhicules d’intérêt général bénéficiant de facilité de passage (non prioritaires)",
              "Des véhicules interdits",
              "Des taxis"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elles bénéficient d’une facilité de passage mais n’ont pas la priorité absolue."
          },
          {
            "_id": "q-lec-4-4-5",
            "questionText": "Face à un convoi exceptionnel escorté :",
            "options": [
              "Je le double par la droite",
              "Je réduis ma vitesse et serre à droite pour faciliter son croisement",
              "Je m’arrête au milieu",
              "J’accélère"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les convois volumineux nécessitent un écart et une réduction de vitesse pour croiser en sécurité."
          }
        ]
      },
      {
        "_id": "lec-4-5",
        "_type": "lecon",
        "title": "Leçon 4.5 — Cas particuliers de priorité",
        "ordre": 5,
        "description": "Giratoires, sorties de propriété, passages piétons et traversées de pistes cyclables.",
        "videoUrl": "https://www.youtube.com/watch?v=KBTd5Vh-smw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-5-1",
            "questionText": "Sur un carrefour à sens giratoire (panneau rond avec 3 flèches + Cédez le passage) :",
            "options": [
              "La priorité est à ceux qui entrent",
              "La priorité est à ceux qui circulent déjà sur l’anneau",
              "Priorité au plus gros",
              "Priorité à droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur un rond-point giratoire moderne, les véhicules sur l’anneau sont prioritaires."
          },
          {
            "_id": "q-lec-4-5-2",
            "questionText": "En tournant à droite, je croise une piste cyclable parallèle :",
            "options": [
              "J’ai la priorité sur les vélos",
              "Je dois céder le passage aux cyclistes qui continuent tout droit",
              "Je klaxonne",
              "Les vélos doivent s’arrêter"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un véhicule qui change de direction doit céder le passage aux usagers circulant tout droit sur leur voie."
          },
          {
            "_id": "q-lec-4-5-3",
            "questionText": "Sur un rond-point classique SANS panneau de priorité (très rare) :",
            "options": [
              "Priorité à gauche",
              "La règle de la priorité à droite s’applique (ceux qui entrent sont prioritaires)",
              "Personne n’a la priorité",
              "Priorité aux bus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sans panneau Cédez le passage, le rond-point applique la priorité à droite."
          },
          {
            "_id": "q-lec-4-5-4",
            "questionText": "Qui a la priorité sur un passage à niveau sans barrière ?",
            "options": [
              "La voiture",
              "Le train dans tous les cas",
              "Le premier arrivé",
              "Le camion"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le train a toujours la priorité absolue en raison de sa distance de freinage."
          },
          {
            "_id": "q-lec-4-5-5",
            "questionText": "Un tramway circulant sur sa voie propre :",
            "options": [
              "Doit s’arrêter pour les voitures",
              "A toujours la priorité de passage",
              "Respecte la priorité à droite",
              "S’arrête aux passages piétons"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le tramway est prioritaire sur tous les autres usagers."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-5",
    "_type": "moduleFormation",
    "code": "MOD-005",
    "title": "Module 5 — Intersections et carrefours",
    "summary": "Circulation dans les carrefours à sens giratoire, carrefours à feux complexes, passages à niveau, zones de danger et communication.",
    "learningObjectives": [
      "Circuler avec assurance dans les carrefours à sens giratoire à voies multiples",
      "Comprendre la lecture des carrefours à feux complexes et tourne-à-gauche",
      "Connaître les règles de sécurité absolue aux passages à niveau",
      "Communiquer clairement avec clignotants et regard aux carrefours"
    ],
    "ordre": 5,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-5-1",
        "_type": "lecon",
        "title": "Leçon 5.1 — Circuler dans un giratoire",
        "ordre": 1,
        "description": "Entrée, circulation dans l’anneau, sortie et usage des clignotants.",
        "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-1-1",
            "questionText": "Pour aller tout droit dans un giratoire à 2 voies, quelle voie choisir ?",
            "options": [
              "La voie de gauche",
              "La voie de droite dès l’entrée",
              "Au milieu des deux",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "Pour aller à droite ou tout droit, on reste sur la voie de droite de l’anneau."
          },
          {
            "_id": "q-lec-5-1-2",
            "questionText": "Pour tourner à gauche ou faire demi-tour dans un giratoire :",
            "options": [
              "On peut se placer sur la voie de gauche de l’anneau avec clignotant gauche",
              "On reste obligatoirement à droite",
              "On roule à contresens",
              "On coupe au milieu"
            ],
            "correctOptionIndex": 0,
            "explanation": "On utilise la voie intérieure (gauche) avec clignotant gauche avant de se rabattre."
          },
          {
            "_id": "q-lec-5-1-3",
            "questionText": "Quand doit-on actionner le clignotant droit pour sortir du giratoire ?",
            "options": [
              "Dès l’entrée",
              "À hauteur de la sortie qui précède celle qu’on veut emprunter",
              "Après être sorti",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "On met le clignotant droit dès qu’on a dépassé la sortie précédant la sienne."
          },
          {
            "_id": "q-lec-5-1-4",
            "questionText": "Avant de se rabattre vers la droite pour sortir du giratoire, on doit :",
            "options": [
              "Accélérer sans regarder",
              "Contrôler le rétroviseur droit et l’angle mort droit",
              "Freiner fort",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut impérativement vérifier qu’aucun usager ne circule à notre droite."
          },
          {
            "_id": "q-lec-5-1-5",
            "questionText": "Si on a raté sa sortie dans un giratoire :",
            "options": [
              "On fait marche arrière",
              "On refait un tour complet de l’anneau en sécurité",
              "On s’arrête au milieu",
              "On coupe par l’îlot central"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il suffit de faire un tour supplémentaire pour se repositionner correctement."
          }
        ]
      },
      {
        "_id": "lec-5-2",
        "_type": "lecon",
        "title": "Leçon 5.2 — Carrefours à feux multiples et complexes",
        "ordre": 2,
        "description": "Lecture de plusieurs feux, tourne-à-gauche protégé, voies réservées et anticipation urbaine.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-2-1",
            "questionText": "Qu’est-ce qu’un feu de tourne-à-gauche direct ?",
            "options": [
              "Un feu pour les vélos",
              "Une flèche lumineuse verte garantissant la priorité sans trafic en face",
              "Un feu d’alerte",
              "Un feu piéton"
            ],
            "correctOptionIndex": 1,
            "explanation": "La flèche directionnelle verte assure que la voie d’en face est retenue au rouge."
          },
          {
            "_id": "q-lec-5-2-2",
            "questionText": "Comment s’effectue un croisement « à l’indonésienne » à un carrefour ?",
            "options": [
              "Par l’arrière",
              "Les véhicules tournant à gauche se croisent l’un devant l’autre",
              "En se contournant",
              "Par la droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le croisement à l’indonésienne permet de tourner à gauche face à face sans contournement."
          },
          {
            "_id": "q-lec-5-2-3",
            "questionText": "Quelle est la précaution majeure lors d’un croisement à l’indonésienne ?",
            "options": [
              "Accélérer",
              "Faire attention au véhicule masqué arrivant tout droit en face",
              "Klaxonner",
              "Fermer les yeux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le véhicule en face masque la vue sur les usagers arrivant tout droit derrière lui."
          },
          {
            "_id": "q-lec-5-2-4",
            "questionText": "Si plusieurs feux tricolores régissent différentes voies, quel feu regarder ?",
            "options": [
              "Le plus haut",
              "Celui situé au-dessus ou à droite de votre voie de circulation",
              "Le feu piéton",
              "N’importe lequel"
            ],
            "correctOptionIndex": 1,
            "explanation": "Chaque voie est gouvernée par le signal lumineux qui lui est affecté."
          },
          {
            "_id": "q-lec-5-2-5",
            "questionText": "À quoi servent les lignes d’effet des feux en pointillés ?",
            "options": [
              "À décorer",
              "À indiquer où s’arrêter pour laisser le champ de vision libre et activer les boucles de détection",
              "À stationner",
              "À doubler"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elles marquent l’emplacement précis d’arrêt avant le feu."
          }
        ]
      },
      {
        "_id": "lec-5-3",
        "_type": "lecon",
        "title": "Leçon 5.3 — Passages à niveau",
        "ordre": 3,
        "description": "Barrières, feux rouges clignotants, absence d’engagement si la sortie est bloquée et priorité absolue du train.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-3-1",
            "questionText": "Face à un feu rouge clignotant et une sonnerie à un passage à niveau :",
            "options": [
              "J’accélère pour passer avant les barrières",
              "L’arrêt absolu est obligatoire avant la barrière",
              "Je fais demi-tour sur la voie",
              "Je contourne les barrières"
            ],
            "correctOptionIndex": 1,
            "explanation": "Dès que le signal sonore et lumineux s’active, l’arrêt est immédiat et impératif."
          },
          {
            "_id": "q-lec-5-3-2",
            "questionText": "Si la circulation est dense au-delà du passage à niveau :",
            "options": [
              "Je m’engage sur les rails",
              "Je m’arrête avant le passage à niveau pour ne pas être coincé sur les voies",
              "Je klaxonne",
              "Je double la file"
            ],
            "correctOptionIndex": 1,
            "explanation": "On ne s’engage JAMAIS sur une voie ferrée sans certitude de pouvoir la quitter aussitôt."
          },
          {
            "_id": "q-lec-5-3-3",
            "questionText": "Si la voiture tombe en panne et se bloque sur les voies ferrées :",
            "options": [
              "Je reste dedans et j’attends",
              "Je fais évacuer immédiatement les passagers et j’utilise le téléphone d’urgence SNCF",
              "Je cherche à la réparer seul",
              "Je m’endors"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise en sécurité des personnes et l’alerte immédiate par la borne d’urgence sont vitales."
          },
          {
            "_id": "q-lec-5-3-4",
            "questionText": "Combien de temps faut-il à un train pour s’arrêter d’urgence ?",
            "options": [
              "10 mètres",
              "50 mètres",
              "800 à 1500 mètres selon sa vitesse",
              "5 secondes"
            ],
            "correctOptionIndex": 2,
            "explanation": "Un train lourd nécessite plus d’un kilomètre pour s’immobiliser."
          },
          {
            "_id": "q-lec-5-3-5",
            "questionText": "Franchir un passage à niveau fermé ou en fermeture est sanctionné par :",
            "options": [
              "Un avertissement",
              "135 € d’amende, 4 points en moins et suspension de permis",
              "10 € d’amende",
              "Rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est une faute d’une gravité exceptionnelle passible de suspension judiciaire."
          }
        ]
      },
      {
        "_id": "lec-5-4",
        "_type": "lecon",
        "title": "Leçon 5.4 — Intersections sans visibilité et zones de danger",
        "ordre": 4,
        "description": "Réduction de la vitesse, prudence accrue, progression progressive pour améliorer la visibilité.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-4-1",
            "questionText": "À une intersection sans visibilité à cause d’un mur ou d’une haie :",
            "options": [
              "Je passe vite",
              "J’avance à très faible allure pour voir et être vu progressivement",
              "Je klaxonne en continu",
              "Je ferme les yeux"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’avancée progressive permet d’élargir l’angle de vue sans danger."
          },
          {
            "_id": "q-lec-5-4-2",
            "questionText": "Que signale un miroir convexe placé à un carrefour sans visibilité ?",
            "options": [
              "Une caméra",
              "Il aide à détecter les usagers approchant mais ne dispense pas de céder le passage",
              "Un panneau Stop",
              "Une décoration"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le miroir est une aide visuelle mais ne donne aucune priorité."
          },
          {
            "_id": "q-lec-5-4-3",
            "questionText": "Dans une intersection étroite en ville, où regarder en premier ?",
            "options": [
              "Le téléphone",
              "Les trottoirs pour les piétons, puis les angles morts et la rue prioritaire",
              "Le ciel",
              "La radio"
            ],
            "correctOptionIndex": 1,
            "explanation": "La détection des piétons et cyclistes est primordiale en milieu urbain dense."
          },
          {
            "_id": "q-lec-5-4-4",
            "questionText": "Si un véhicule venant en face tourne à gauche en même temps que vous :",
            "options": [
              "Vous klaxonnez",
              "Vous adaptez votre trajectoire selon la configuration du carrefour",
              "Vous passez en force",
              "Vous reculez"
            ],
            "correctOptionIndex": 1,
            "explanation": "On adapte sa vitesse et sa trajectoire avec courtoisie."
          },
          {
            "_id": "q-lec-5-4-5",
            "questionText": "Quelle est la distance de visibilité minimale recommandée avant de s’engager ?",
            "options": [
              "5 mètres",
              "Suffisante pour voir arriver les usagers roulant à la vitesse maximale autorisée",
              "1 mètre",
              "Aucune"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut s’assurer que le temps de dégagement est compatible avec la vitesse de la voie."
          }
        ]
      },
      {
        "_id": "lec-5-5",
        "_type": "lecon",
        "title": "Leçon 5.5 — Communication et anticipation aux carrefours",
        "ordre": 5,
        "description": "Clignotants, observation des autres usagers, contact visuel et conduite courtoise.",
        "videoUrl": "https://www.youtube.com/watch?v=P9ZXwt5XvGk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-5-1",
            "questionText": "Pourquoi le contact visuel avec les autres usagers est-il crucial ?",
            "options": [
              "Pour les intimider",
              "Pour s’assurer qu’ils vous ont bien vu et ont compris votre intention",
              "Pour discuter",
              "Ce n’est pas utile"
            ],
            "correctOptionIndex": 1,
            "explanation": "Croiser le regard confirme la prise en compte mutuelle avant de s’engager."
          },
          {
            "_id": "q-lec-5-5-2",
            "questionText": "Oublier d’éteindre son clignotant après un changement de direction :",
            "options": [
              "Est sans danger",
              "Peut induire en erreur un usager qui risque de vous couper la route",
              "Fait économiser la batterie",
              "Est obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un clignotant laissé par erreur peut provoquer un accident grave par fausse interprétation."
          },
          {
            "_id": "q-lec-5-5-3",
            "questionText": "À l’approche d’un carrefour, quand doit-on débuter l’observation ?",
            "options": [
              "Au milieu de l’intersection",
              "Le plus tôt possible dès que l’intersection devient visible",
              "Après avoir tourné",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’anticipation précoce permet d’adapter son allure en toute sérénité."
          },
          {
            "_id": "q-lec-5-5-4",
            "questionText": "L’utilisation d’un appel de phares de jour sert à :",
            "options": [
              "Insulter un usager",
              "Avertir d’un danger immédiat ou signaler sa présence en sécurité",
              "Éblouir",
              "Rouler plus vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’appel de phare est un signal d’avertissement bref de sécurité."
          },
          {
            "_id": "q-lec-5-5-5",
            "questionText": "La courtoisie au volant consiste à :",
            "options": [
              "Céder son passage même quand cela crée un danger imprévu",
              "Faciliter l’insertion des autres usagers lorsque la sécurité le permet",
              "Ne jamais laisser passer personne",
              "Rouler au pas partout"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite apaisée et coopérative améliore la sécurité globale."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-6",
    "_type": "moduleFormation",
    "code": "MOD-006",
    "title": "Module 6 — Vitesse, freinage et distances",
    "summary": "Limitations de vitesse en France, calculs de distance de freinage et d'arrêt, distance de sécurité (2 secondes), effets de la vitesse sur le corps et adaptation.",
    "learningObjectives": [
      "Connaître toutes les limitations de vitesse selon le type de route, la météo et le permis probatoire",
      "Calculer et différencier distance de réaction, distance de freinage et distance d'arrêt",
      "Appliquer la règle des 2 secondes pour maintenir l'intervalle de sécurité",
      "Comprendre la réduction du champ visuel et l'énergie cinétique liée à la vitesse"
    ],
    "ordre": 6,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=_ANzCH4C4JM",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-6-1",
        "_type": "lecon",
        "title": "Leçon 6.1 — Limitations de vitesse en France",
        "ordre": 1,
        "description": "Vitesses autorisées selon la route, la météo, le permis probatoire et les situations particulières.",
        "videoUrl": "https://www.youtube.com/watch?v=_ANzCH4C4JM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-1-1",
            "questionText": "Quelle est la limitation générale de vitesse sur autoroute par temps sec (permis confirmé) ?",
            "options": [
              "110 km/h",
              "120 km/h",
              "130 km/h",
              "140 km/h"
            ],
            "correctOptionIndex": 2,
            "explanation": "Par temps sec, la vitesse maximale sur autoroute est de 130 km/h."
          },
          {
            "_id": "q-lec-6-1-2",
            "questionText": "Par temps de pluie, quelle est la vitesse maximale sur autoroute ?",
            "options": [
              "100 km/h",
              "110 km/h",
              "120 km/h",
              "130 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "En cas de pluie ou précipitations, la vitesse est réduite à 110 km/h sur autoroute."
          },
          {
            "_id": "q-lec-6-1-3",
            "questionText": "Pour un jeune conducteur en période probatoire, la vitesse sur autoroute par temps sec est de :",
            "options": [
              "110 km/h",
              "120 km/h",
              "130 km/h",
              "100 km/h"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les permis probatoires sont limités à 110 km/h sur autoroute."
          },
          {
            "_id": "q-lec-6-1-4",
            "questionText": "En agglomération, quelle est la limitation de vitesse par défaut ?",
            "options": [
              "30 km/h",
              "50 km/h",
              "70 km/h",
              "80 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse en ville est fixée à 50 km/h sauf signalisation contraire (ex: zone 30)."
          },
          {
            "_id": "q-lec-6-1-5",
            "questionText": "En cas de brouillard avec une visibilité inférieure à 50 mètres, la vitesse est limitée à :",
            "options": [
              "30 km/h",
              "50 km/h sur tout le réseau",
              "70 km/h",
              "80 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "Dès que la visibilité descend sous 50 m, la vitesse maximale est de 50 km/h partout."
          }
        ]
      },
      {
        "_id": "lec-6-2",
        "_type": "lecon",
        "title": "Leçon 6.2 — Distance de freinage et distance d’arrêt",
        "ordre": 2,
        "description": "Différence entre distance de réaction, distance de freinage et distance totale d’arrêt ; influence de la vitesse, de la météo et de la fatigue.",
        "videoUrl": "https://www.youtube.com/watch?v=lNR3X4rEaZE",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-2-1",
            "questionText": "La distance totale d’arrêt correspond à :",
            "options": [
              "Distance de freinage seule",
              "Distance parcourue pendant le temps de réaction + Distance de freinage",
              "Temps de réaction seul",
              "Longueur de la voiture"
            ],
            "correctOptionIndex": 1,
            "explanation": "Distance d’arrêt = Distance de réaction + Distance de freinage."
          },
          {
            "_id": "q-lec-6-2-2",
            "questionText": "Comment estimer rapidement la distance parcourue pendant le temps de réaction (1 seconde) ?",
            "options": [
              "Multiplier le chiffre des dizaines de la vitesse par 3",
              "Multiplier la vitesse par 10",
              "Diviser par 2",
              "Multiplier les dizaines par 6"
            ],
            "correctOptionIndex": 0,
            "explanation": "À 50 km/h : 5 x 3 = 15 mètres ; à 90 km/h : 9 x 3 = 27 mètres."
          },
          {
            "_id": "q-lec-6-2-3",
            "questionText": "Comment estimer la distance totale d’arrêt sur sol sec ?",
            "options": [
              "Dizaine multipliée par 3",
              "Dizaine multipliée par elle-même (au carré)",
              "Vitesse divisée par 10",
              "Dizaine multipliée par 6"
            ],
            "correctOptionIndex": 1,
            "explanation": "À 50 km/h : 5 x 5 = 25 m ; à 90 km/h : 9 x 9 = 81 m ; à 130 km/h : 13 x 13 = 169 m."
          },
          {
            "_id": "q-lec-6-2-4",
            "questionText": "Sur chaussée mouillée, que devient la distance de freinage par rapport au sec ?",
            "options": [
              "Elle est divisée par deux",
              "Elle est multipliée par deux",
              "Elle reste identique",
              "Elle est triplée"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’adhérence étant divisée par deux sur sol mouillé, le freinage est deux fois plus long."
          },
          {
            "_id": "q-lec-6-2-5",
            "questionText": "Quelle est la durée moyenne du temps de réaction d’un conducteur attentif en bonne santé ?",
            "options": [
              "0,1 seconde",
              "1 seconde environ",
              "3 secondes",
              "5 secondes"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le temps de réaction incompressible est en moyenne d’environ 1 seconde."
          }
        ]
      },
      {
        "_id": "lec-6-3",
        "_type": "lecon",
        "title": "Leçon 6.3 — Distance de sécurité entre véhicules",
        "ordre": 3,
        "description": "Règle des deux secondes, adaptation par mauvais temps et dangers du talonnage.",
        "videoUrl": "https://www.youtube.com/watch?v=_oLFumNga1c",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-3-1",
            "questionText": "Quel est l’intervalle de temps minimal de sécurité à respecter avec le véhicule qui précède ?",
            "options": [
              "0,5 seconde",
              "1 seconde",
              "2 secondes au moins",
              "5 secondes"
            ],
            "correctOptionIndex": 2,
            "explanation": "La règle des 2 secondes couvre 1 s de réaction + 1 s de marge de sécurité."
          },
          {
            "_id": "q-lec-6-3-2",
            "questionText": "Comment calculer la distance de sécurité minimale sur sol sec ?",
            "options": [
              "Dizaine multipliée par 3",
              "Dizaine de la vitesse multipliée par 6",
              "Vitesse au carré",
              "Longueur du véhicule"
            ],
            "correctOptionIndex": 1,
            "explanation": "À 50 km/h : 5 x 6 = 30 m ; à 90 km/h : 9 x 6 = 54 m ; à 130 km/h : 13 x 6 = 78 m."
          },
          {
            "_id": "q-lec-6-3-3",
            "questionText": "Sur autoroute, quel repère visuel garantit les 2 secondes de distance de sécurité ?",
            "options": [
              "Un trait de bande d’arrêt d’urgence",
              "Deux traits de la ligne de droite de bande d’arrêt d’urgence",
              "La borne kilométrique",
              "Les panneaux publicitaires"
            ],
            "correctOptionIndex": 1,
            "explanation": "« 1 trait = danger, 2 traits = sécurité » le long de la ligne de rive autoroutière."
          },
          {
            "_id": "q-lec-6-3-4",
            "questionText": "Si les conditions météorologiques sont dégradées (pluie, neige), la distance de sécurité doit être :",
            "options": [
              "Maintenue",
              "Doublée",
              "Diminuée",
              "Divisée par deux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Par mauvais temps, on augmente significativement l’intervalle pour parer au risque de glissade."
          },
          {
            "_id": "q-lec-6-3-5",
            "questionText": "Coller le véhicule qui précède (talonnage) est puni de :",
            "options": [
              "Une réprimande",
              "135 € d’amende et retrait de 3 points sur le permis",
              "Aucune sanction",
              "1 point"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le non-respect des distances de sécurité retire 3 points."
          }
        ]
      },
      {
        "_id": "lec-6-4",
        "_type": "lecon",
        "title": "Leçon 6.4 — Effets de la vitesse sur le corps et la conduite",
        "ordre": 4,
        "description": "Réduction du champ visuel, augmentation de la gravité des chocs et dangers de la vitesse excessive.",
        "videoUrl": "https://www.youtube.com/watch?v=_ANzCH4C4JM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-4-1",
            "questionText": "À mesure que la vitesse augmente, qu’arrive-t-il au champ visuel du conducteur ?",
            "options": [
              "Il s’élargit",
              "Il se rétrécit en « vision en tunnel »",
              "Il reste identique",
              "Il devient flou uniquement la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "À 130 km/h, le champ visuel se réduit à environ 30 degrés contre 180 degrés à l’arrêt."
          },
          {
            "_id": "q-lec-6-4-2",
            "questionText": "Si vous doublez votre vitesse (ex: passage de 50 à 100 km/h), l’énergie cinétique du choc est :",
            "options": [
              "Doublée",
              "Multipliée par 4",
              "Multipliée par 8",
              "Inchangée"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’énergie cinétique est proportionnelle au carré de la vitesse (E = 1/2 mv²)."
          },
          {
            "_id": "q-lec-6-4-3",
            "questionText": "Un choc frontal à 50 km/h sans ceinture équivaut à une chute de :",
            "options": [
              "1 mètre",
              "3 étages d’un immeuble (environ 10 mètres)",
              "10 étages",
              "Un trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’impact à 50 km/h correspond à une chute du 3ème étage d’un bâtiment."
          },
          {
            "_id": "q-lec-6-4-4",
            "questionText": "La vitesse excessive ou inadaptée est présente dans quelle proportion des accidents mortels ?",
            "options": [
              "Moins de 5%",
              "Près d’un accident mortel sur trois",
              "Uniquement la nuit",
              "100% des cas"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse est la 1ère ou 2ème cause principale de mortalité sur les routes françaises."
          },
          {
            "_id": "q-lec-6-4-5",
            "questionText": "La fatigue au volant combinée à la vitesse provoque :",
            "options": [
              "Une meilleure concentration",
              "Une augmentation drastique du temps de réaction et du risque d’endormissement",
              "Une réduction des distances",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse use l’attention du cerveau et accélère l’épuisement."
          }
        ]
      },
      {
        "_id": "lec-6-5",
        "_type": "lecon",
        "title": "Leçon 6.5 — Adapter sa vitesse aux circonstances",
        "ordre": 5,
        "description": "Adapter l’allure à la visibilité, à la circulation, aux écoles, à la chaussée et à la météo, même si la limite légale autorise une vitesse plus élevée.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-5-1",
            "questionText": "La vitesse maximale autorisée est-elle une vitesse obligatoire à atteindre en toutes circonstances ?",
            "options": [
              "Oui toujours",
              "Non, c’est un plafond limite, la vitesse doit être réduite dès que les conditions l’exigent",
              "Oui sur autoroute",
              "Oui en ligne droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse doit être modulée en permanence selon la météo, l’état de la route et les usagers."
          },
          {
            "_id": "q-lec-6-5-2",
            "questionText": "À l’approche d’une école aux heures d’entrée ou sortie de classe, vous devez :",
            "options": [
              "Rouler à 50 km/h",
              "Ralentir très fortement (20-30 km/h) et placer le pied au-dessus du frein",
              "Klaxonner pour faire ranger les enfants",
              "Accélérer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’imprévisibilité totale des enfants exige une allure au pas et une vigilance maximale."
          },
          {
            "_id": "q-lec-6-5-3",
            "questionText": "Sur une chaussée étroite avec des croisements difficiles :",
            "options": [
              "Maintenir sa vitesse",
              "Ralentir et préparer le croisement en serrant à droite",
              "Accélérer pour passer le premier",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’adaptation de l’allure prévient les accrochages latéraux."
          },
          {
            "_id": "q-lec-6-5-4",
            "questionText": "En cas de fort vent latéral sur un viaduc ou à la sortie d’un tunnel, vous devez :",
            "options": [
              "Augmenter la vitesse",
              "Ralentir et tenir fermement le volant à deux mains pour parer aux embardées",
              "Lâcher le volant",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Réduire l’allure limite l’impact des rafales sur la trajectoire."
          },
          {
            "_id": "q-lec-6-5-5",
            "questionText": "Conduire à une allure anormalement réduite sans motif valable créant un danger pour les autres :",
            "options": [
              "Est conseillé",
              "Est une infraction passible d’une amende forfaitaire",
              "Est obligatoire",
              "Est autorisé sur la voie de gauche"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une lenteur excessive et injustifiée sur voie rapide génère un risque d’accident par l’arrière."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-7",
    "_type": "moduleFormation",
    "code": "MOD-007",
    "title": "Module 7 — Croisement et dépassement",
    "summary": "Règles de croisement, conditions indispensables pour dépasser en toute sécurité, interdictions formelles, comportement quand on est dépassé et véhicules spéciaux.",
    "learningObjectives": [
      "Maîtriser les priorités de croisement en pente et sur chaussée rétrécie",
      "Vérifier les 5 conditions indispensables avant d'entamer un dépassement",
      "Connaître toutes les zones et situations où le dépassement est formellement interdit",
      "Appliquer les distances latérales obligatoires pour dépasser deux-roues et piétons"
    ],
    "ordre": 7,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-7-1",
        "_type": "lecon",
        "title": "Leçon 7.1 — Règles de croisement",
        "ordre": 1,
        "description": "Croisement sur routes étroites, gestion des obstacles, véhicules volumineux et règles de prudence.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-1-1",
            "questionText": "Sur route étroite avec un obstacle sur votre voie, qui doit s’arrêter ?",
            "options": [
              "Le véhicule venant en face",
              "Vous, car l’obstacle se trouve sur votre côté",
              "Le premier qui klaxonne",
              "Le plus rapide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Celui qui a l’obstacle sur sa voie doit céder le passage à l’usager arrivant en face."
          },
          {
            "_id": "q-lec-7-1-2",
            "questionText": "Sur une route de montagne en pente où le croisement est impossible entre deux voitures de même gabarit :",
            "options": [
              "Le véhicule montant recule",
              "Le véhicule descendant doit s’arrêter et reculer si nécessaire",
              "Les deux coupent le moteur",
              "Le plus lourd recule"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le véhicule qui descend recule car il est plus facile de redémarrer en descente qu’en montée."
          },
          {
            "_id": "q-lec-7-1-3",
            "questionText": "Entre un véhicule léger et un véhicule lourd (poids lourd/bus) en forte pente :",
            "options": [
              "Le camion recule toujours",
              "C’est toujours le véhicule léger qui recule, qu’il monte ou qu’il descende",
              "Le camion fait demi-tour",
              "Personne ne recule"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le véhicule le plus maniable (voiture) doit reculer face au poids lourd."
          },
          {
            "_id": "q-lec-7-1-4",
            "questionText": "La nuit lors du croisement d’un autre véhicule, vous devez :",
            "options": [
              "Garder les feux de route",
              "Passer en feux de croisement pour ne pas éblouir l’autre conducteur",
              "Éteindre les feux",
              "Allumer les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le passage en feux de croisement est obligatoire dès qu’on croise un autre véhicule."
          },
          {
            "_id": "q-lec-7-1-5",
            "questionText": "Où porter son regard lors du croisement de nuit pour ne pas être ébloui ?",
            "options": [
              "Directement dans les phares du véhicule d’en face",
              "Vers le bord droit de la chaussée (la ligne de rive)",
              "Vers le ciel",
              "Vers son rétroviseur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Fixer la ligne blanche de droite évite l’éblouissement tout en maintenant la trajectoire."
          }
        ]
      },
      {
        "_id": "lec-7-2",
        "_type": "lecon",
        "title": "Leçon 7.2 — Conditions pour dépasser en sécurité",
        "ordre": 2,
        "description": "Vérification de la visibilité, de la voie libre, des distances, de la vitesse et signalisation avec le clignotant.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-2-1",
            "questionText": "Combien de conditions indispensables doit-on vérifier avant d’entamer un dépassement ?",
            "options": [
              "Aucune",
              "Signalisation autorisée, visibilité suffisante, voie libre devant/derrière, réserve de vitesse, possibilité de se rabattre",
              "Avoir le clignotant allumé seul",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Toutes les conditions de sécurité visuelle, dynamique et réglementaire doivent être réunies."
          },
          {
            "_id": "q-lec-7-2-2",
            "questionText": "Pour dépasser en sécurité, quelle différence de vitesse minimale est recommandée avec le véhicule dépassé ?",
            "options": [
              "2 km/h",
              "Au moins 20 km/h de réserve sans dépasser la vitesse maximale autorisée",
              "50 km/h",
              "Aucune"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un différentiel d’environ 20 km/h permet un dépassement net et rapide."
          },
          {
            "_id": "q-lec-7-2-3",
            "questionText": "A-t-on le droit de dépasser la vitesse maximale autorisée pendant un dépassement ?",
            "options": [
              "Oui de 20 km/h",
              "Non, la vitesse maximale autorisée ne doit jamais être dépassée",
              "Oui sur autoroute",
              "Oui pour doubler un camion"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aucune dérogation de vitesse n’est accordée pour effectuer un dépassement."
          },
          {
            "_id": "q-lec-7-2-4",
            "questionText": "Dans le rétroviseur intérieur, à quel moment peut-on se rabattre après avoir doublé ?",
            "options": [
              "Dès qu’on a dépassé le pare-chocs",
              "Quand on aperçoit nettement les deux phares ou la face avant du véhicule doublé",
              "Après 1 kilomètre",
              "Immédiatement en braquant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Voir la face avant entière dans le miroir central garantit une distance de rabattement sûre."
          },
          {
            "_id": "q-lec-7-2-5",
            "questionText": "Doit-on maintenir le clignotant gauche pendant toute la durée où l’on est sur la voie de dépassement ?",
            "options": [
              "Non, on l’éteint aussitôt déporté",
              "Oui, sur chaussée à double sens on le laisse jusqu’au moment de se rabattre",
              "On met les feux de détresse",
              "Jamais de clignotant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur route à double sens, le clignotant gauche avertit que la manœuvre est en cours."
          }
        ]
      },
      {
        "_id": "lec-7-3",
        "_type": "lecon",
        "title": "Leçon 7.3 — Interdictions de dépassement",
        "ordre": 3,
        "description": "Interdiction sur ligne continue, sommet de côte, virage sans visibilité, passage à niveau et certaines intersections.",
        "videoUrl": "https://www.youtube.com/watch?v=FZF94If-Rsk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-3-1",
            "questionText": "Peut-on dépasser un véhicule à moteur en sommet de côte sur route à double sens à 2 voies ?",
            "options": [
              "Oui avec le clignotant",
              "Non, l’absence de visibilité vers l’avant rend le dépassement strictement interdit",
              "Oui la nuit",
              "Oui si on roule vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le manque de visibilité frontale interdit formellement de se déporter sur la voie opposée."
          },
          {
            "_id": "q-lec-7-3-2",
            "questionText": "À un passage à niveau sans barrière, le dépassement est :",
            "options": [
              "Autorisé pour les voitures",
              "Strictement interdit pour tout véhicule à moteur",
              "Autorisé à 30 km/h",
              "Conseillé"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est interdit de dépasser aux passages à niveau non protégés par des barrières."
          },
          {
            "_id": "q-lec-7-3-3",
            "questionText": "À une intersection où l’on doit céder le passage ou appliquer la priorité à droite :",
            "options": [
              "Le dépassement est interdit",
              "Le dépassement est autorisé",
              "On peut doubler par la droite",
              "Seulement les camions"
            ],
            "correctOptionIndex": 0,
            "explanation": "On ne peut dépasser à une intersection que si l’on bénéficie d’une priorité absolue signalée."
          },
          {
            "_id": "q-lec-7-3-4",
            "questionText": "À l’approche d’un passage piéton sans feu où des piétons s’engagent :",
            "options": [
              "On double le véhicule arrêté",
              "Il est strictement interdit de dépasser un véhicule qui ralentit ou s’arrête",
              "On klaxonne",
              "On accélère"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un véhicule arrêté devant un passage piéton masque un piéton en cours de traversée."
          },
          {
            "_id": "q-lec-7-3-5",
            "questionText": "Peut-on dépasser par la DROITE sur route ou autoroute ?",
            "options": [
              "Oui toujours",
              "Non, c’est strictement interdit sauf si le véhicule devant tourne à gauche ou en files ininterrompues",
              "Oui si la voie est libre",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le dépassement par la droite est une infraction grave passible d’une perte de 3 points."
          }
        ]
      },
      {
        "_id": "lec-7-4",
        "_type": "lecon",
        "title": "Leçon 7.4 — Être dépassé et laisser dépasser",
        "ordre": 4,
        "description": "Maintenir une allure stable, ne pas accélérer et faciliter la manœuvre d’un autre véhicule.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-4-1",
            "questionText": "Lorsqu’un véhicule commence à vous dépasser, quelle doit être votre réaction ?",
            "options": [
              "Accélérer pour ne pas vous laisser doubler",
              "Maintenir votre vitesse ou ralentir légèrement et serrer à droite",
              "Klaxonner",
              "Mettre le clignotant gauche"
            ],
            "correctOptionIndex": 1,
            "explanation": "La loi interdit formellement d’accélérer lorsqu’on est en train d’être dépassé."
          },
          {
            "_id": "q-lec-7-4-2",
            "questionText": "La nuit, lorsqu’un véhicule vous dépasse et arrive à votre hauteur :",
            "options": [
              "Vous éteignez vos phares",
              "Vous passez de feux de route en feux de croisement pour ne pas l’éblouir dans ses rétroviseurs",
              "Vous gardez les pleins phares",
              "Vous allumez l’antibrouillard"
            ],
            "correctOptionIndex": 1,
            "explanation": "On commute en feux de croisement dès que le véhicule arrive à notre hauteur."
          },
          {
            "_id": "q-lec-7-4-3",
            "questionText": "Si le conducteur qui vous dépasse se rabat en urgence face à un danger en face :",
            "options": [
              "Vous accélérez pour le bloquer",
              "Vous ralentissez immédiatement pour lui créer un espace de sécurité",
              "Vous klaxonnez sans bouger",
              "Vous le percutez"
            ],
            "correctOptionIndex": 1,
            "explanation": "La coopération et le ralentissement évitent une collision frontale mortelle."
          },
          {
            "_id": "q-lec-7-4-4",
            "questionText": "Accélérer lorsqu’on est en train d’être dépassé est sanctionné par :",
            "options": [
              "Une amende de 135 € et retrait de 2 points",
              "Rien du tout",
              "Un avertissement oral",
              "10 €"
            ],
            "correctOptionIndex": 0,
            "explanation": "C’est une infraction au code de la route punie d’un retrait de 2 points."
          },
          {
            "_id": "q-lec-7-4-5",
            "questionText": "Sur autoroute, si vous roulez sur la voie du milieu et qu’un véhicule arrive derrière vous :",
            "options": [
              "Vous restez au milieu",
              "Vous vous rabattez sur la voie de droite dès que possible",
              "Vous freinez fort",
              "Vous accélérez à 150 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "On doit libérer les voies de gauche et du milieu pour rouler à droite."
          }
        ]
      },
      {
        "_id": "lec-7-5",
        "_type": "lecon",
        "title": "Leçon 7.5 — Dépassement des véhicules spéciaux",
        "ordre": 5,
        "description": "Dépassement des cyclistes, motos, engins agricoles et convois en gardant une distance de sécurité suffisante (1m en ville, 1,5m hors agglo).",
        "videoUrl": "https://www.youtube.com/watch?v=7j0ZiEQy5aY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-5-1",
            "questionText": "Pour dépasser un cycliste, quelle distance latérale minimale devez-vous laisser ?",
            "options": [
              "0,5 m partout",
              "1 m en agglomération et 1,50 m hors agglomération",
              "2 m en ville",
              "0,2 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est l’écart réglementaire vital pour parer à un écart ou coup de vent."
          },
          {
            "_id": "q-lec-7-5-2",
            "questionText": "Est-il autorisé de chevaucher une ligne continue pour dépasser un cycliste sur route à double sens ?",
            "options": [
              "Non, jamais",
              "Oui, le chevauchement (sans franchissement total) est exceptionnellement autorisé si la visibilité est bonne",
              "Oui en virage aveugle",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le code autorise le chevauchement d’une ligne continue pour doubler un vélo en sécurité."
          },
          {
            "_id": "q-lec-7-5-3",
            "questionText": "Pour dépasser un engin agricole lent et large :",
            "options": [
              "On double sans visibilité",
              "On attend d’avoir une parfaite visibilité et un espace suffisant",
              "On le colle à 1 mètre",
              "On klaxonne fort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le gabarit des engins agricoles exige une visibilité dégagée sur une longue distance."
          },
          {
            "_id": "q-lec-7-5-4",
            "questionText": "Peut-on dépasser un chasse-neige en action de déneigement sur autoroute ?",
            "options": [
              "Oui par la droite",
              "Non, il est strictement interdit de dépasser un engin de service hivernal en action",
              "Oui à plus de 130 km/h",
              "Oui en le collant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le dépassement d’un chasse-neige en fonctionnement est interdit par la loi."
          },
          {
            "_id": "q-lec-7-5-5",
            "questionText": "Face à un convoi militaire ou exceptionnel :",
            "options": [
              "On s’insère au milieu du convoi",
              "On ne doit jamais couper ni s’intercaler dans un convoi organisé",
              "On les double tous d’un coup",
              "On les bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est formellement interdit de s’interposer dans une colonne militaire ou un convoi officiel."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-8",
    "_type": "moduleFormation",
    "code": "MOD-008",
    "title": "Module 8 — Autoroutes et voies rapides",
    "summary": "Insertion, circulation, choix des voies, distances à grande vitesse, aires de repos, sorties, voies rapides urbaines et procédure d'urgence en cas de panne.",
    "learningObjectives": [
      "Maîtriser l'insertion fluide et prioritaire sur autoroute",
      "Savoir se positionner sur les voies et respecter les distances à 130 km/h",
      "Anticiper les sorties, bifurcations et zones de péage",
      "Appliquer rigoureusement la procédure de sécurité en cas de panne sur autoroute (gilet, passagers, glissière)"
    ],
    "ordre": 8,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=C4lnJxLXX6s",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-8-1",
        "_type": "lecon",
        "title": "Leçon 8.1 — S’insérer et circuler sur autoroute",
        "ordre": 1,
        "description": "Bretelle et voie d’insertion, adaptation à la vitesse du trafic, positionnement sur les voies et usage de la voie de gauche pour dépasser.",
        "videoUrl": "https://www.youtube.com/watch?v=C4lnJxLXX6s",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-1-1",
            "questionText": "Sur une voie d’insertion, qui a la priorité ?",
            "options": [
              "Le véhicule qui entre",
              "Les véhicules circulant déjà sur l’autoroute",
              "Le plus rapide",
              "Priorité à droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "La voie d’insertion comporte un Cédez le passage : priorité au trafic autoroutier."
          },
          {
            "_id": "q-lec-8-1-2",
            "questionText": "Sur autoroute, quelle voie devez-vous occuper en circulation fluide ?",
            "options": [
              "La voie du milieu",
              "La voie de gauche",
              "La voie la plus à droite",
              "Celle que l’on préfère"
            ],
            "correctOptionIndex": 2,
            "explanation": "La circulation se fait toujours sur la voie de droite, les autres servant aux dépassements."
          },
          {
            "_id": "q-lec-8-1-3",
            "questionText": "A-t-on le droit de faire demi-tour ou marche arrière sur autoroute ?",
            "options": [
              "Oui au péage",
              "Non, c’est strictement interdit et puni d’un retrait de 4 points et suspension de permis",
              "Oui si on a raté la sortie",
              "Oui sur la BAU"
            ],
            "correctOptionIndex": 1,
            "explanation": "Faire demi-tour ou marche arrière sur autoroute est un comportement d’une dangerosité extrême."
          },
          {
            "_id": "q-lec-8-1-4",
            "questionText": "Quelle est la vitesse minimale obligatoire sur autoroute sur la voie la plus à gauche par temps sec et fluide ?",
            "options": [
              "60 km/h",
              "80 km/h",
              "100 km/h",
              "110 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur la voie la plus à gauche, il est interdit de rouler à moins de 80 km/h en conditions normales."
          },
          {
            "_id": "q-lec-8-1-5",
            "questionText": "Sur voie d’insertion, pour faciliter l’entrée d’un véhicule, un conducteur sur la voie de droite peut :",
            "options": [
              "Piler",
              "Se déporter sur la voie du milieu si elle est totalement libre en sécurité",
              "Klaxonner",
              "Accélérer fort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Changer de voie pour libérer la voie de droite est une excellente mesure de courtoisie."
          }
        ]
      },
      {
        "_id": "lec-8-2",
        "_type": "lecon",
        "title": "Leçon 8.2 — Files, distances et changement de voie sur autoroute",
        "ordre": 2,
        "description": "Distances de sécurité à vitesse élevée, vérification des angles morts et changement de voie progressif et signalé.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-2-1",
            "questionText": "À 130 km/h, quelle distance parcourt-on en 1 seule seconde de temps de réaction ?",
            "options": [
              "15 mètres",
              "26 mètres",
              "39 mètres environ",
              "80 mètres"
            ],
            "correctOptionIndex": 2,
            "explanation": "Formule : 13 x 3 = 39 mètres parcourus en un clin d’œil."
          },
          {
            "_id": "q-lec-8-2-2",
            "questionText": "Combien de mètres d’intervalle de sécurité doit-on laisser à 130 km/h sur autoroute ?",
            "options": [
              "30 mètres",
              "50 mètres",
              "Au moins 78 mètres (2 traits de bande d’arrêt d’urgence)",
              "150 mètres"
            ],
            "correctOptionIndex": 2,
            "explanation": "Formule : 13 x 6 = 78 mètres, matérialisés par 2 bandes blanches de BAU."
          },
          {
            "_id": "q-lec-8-2-3",
            "questionText": "Avant de changer de voie à 130 km/h, quelle est la règle ?",
            "options": [
              "Braquer vite",
              "Rétroviseurs central et gauche, coup d’œil angle mort, clignotant, puis déport progressif",
              "Klaxonner",
              "Freiner"
            ],
            "correctOptionIndex": 1,
            "explanation": "À vitesse élevée, toute manœuvre doit être souple et anticipée."
          },
          {
            "_id": "q-lec-8-2-4",
            "questionText": "En cas de ralentissement soudain ou bouchon sur autoroute, vous devez immédiatement :",
            "options": [
              "Faire demi-tour",
              "Allumer les feux de détresse pour avertir les véhicules qui vous suivent",
              "Rouler sur la BAU",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de détresse préviennent le risque de collision en chaîne par l’arrière."
          },
          {
            "_id": "q-lec-8-2-5",
            "questionText": "Le louvoiement ou zigzag d’une voie à l’autre dans les bouchons :",
            "options": [
              "Fait gagner 1 heure",
              "Est dangereux, interdit et ne fait gagner aucun temps significatif",
              "Est conseillé",
              "Est obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Changer constamment de file perturbe le trafic et augmente le risque d’accrochage."
          }
        ]
      },
      {
        "_id": "lec-8-3",
        "_type": "lecon",
        "title": "Leçon 8.3 — Aires de repos, sorties et signalisation autoroutière",
        "ordre": 3,
        "description": "Signalisation verte, aires de repos et de service, anticipation des sorties et placement suffisamment tôt à droite.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-3-1",
            "questionText": "Tous les combien de kilomètres trouve-t-on en moyenne une aire de repos sur autoroute ?",
            "options": [
              "Tous les 5 km",
              "Tous les 15 à 20 km environ",
              "Tous les 100 km",
              "Une seule par département"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les aires de repos sont réparties régulièrement pour permettre la pause des 2 heures."
          },
          {
            "_id": "q-lec-8-3-2",
            "questionText": "Pour emprunter une sortie d’autoroute, où doit-on commencer à freiner ?",
            "options": [
              "Sur la voie de droite de l’autoroute",
              "Uniquement une fois totalement engagé sur la voie de décélération",
              "Sur la voie de gauche",
              "Dans le virage serré"
            ],
            "correctOptionIndex": 1,
            "explanation": "On ne ralentit jamais sur les voies de circulation rapide : on freine sur la voie de sortie."
          },
          {
            "_id": "q-lec-8-3-3",
            "questionText": "Les panneaux d’annonce de bifurcation ou sortie sont placés à :",
            "options": [
              "10 mètres",
              "2000 m, 1000 m, 500 m et au niveau de la bretelle",
              "100 mètres seulement",
              "50 mètres"
            ],
            "correctOptionIndex": 1,
            "explanation": "La signalisation autoroutière est très en amont pour laisser le temps de se rabattre."
          },
          {
            "_id": "q-lec-8-3-4",
            "questionText": "À une gare de péage, les voies signalées par une flèche verte autorisent :",
            "options": [
              "Tous les véhicules pour paiement carte, espèces ou télépéage",
              "Uniquement les camions",
              "Uniquement le télépéage sans arrêt",
              "Les motos seulement"
            ],
            "correctOptionIndex": 0,
            "explanation": "La flèche verte indique que la voie est ouverte à tous les modes de paiement standard."
          },
          {
            "_id": "q-lec-8-3-5",
            "questionText": "Les voies de péage marquées d’un « t » orange réservent le passage à :",
            "options": [
              "Tous les véhicules",
              "Exclusivement aux abonnés au télépéage électronique",
              "Aux transports de fonds",
              "Aux taxis"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces voies sont réservées aux véhicules équipés d’un badge Liber-t actif."
          }
        ]
      },
      {
        "_id": "lec-8-4",
        "_type": "lecon",
        "title": "Leçon 8.4 — Conduite en cas de panne ou d’accident sur autoroute",
        "ordre": 4,
        "description": "Bande d’arrêt d’urgence, feux de détresse, gilet, sortie côté droit et mise à l’abri derrière la glissière.",
        "videoUrl": "https://www.youtube.com/watch?v=yEuJJut8Jmg",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-4-1",
            "questionText": "En cas de panne sur autoroute, quel est l’ordre chronologique vital à respecter ?",
            "options": [
              "Sortir à gauche, poser le triangle à 100 m, attendre dans la voiture",
              "Allumer feux de détresse, serrer sur la BAU, enfiler le gilet à bord, faire sortir tous les passagers par la droite et se réfugier derrière la glissière",
              "Pousser la voiture vers la sortie",
              "Téléphoner au volant"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise à l’abri immédiate de tous les passagers derrière la glissière de sécurité est vitale."
          },
          {
            "_id": "q-lec-8-4-2",
            "questionText": "Doit-on poser le triangle de présignalisation sur la chaussée d’une autoroute ?",
            "options": [
              "Oui obligatoirement à 150 m",
              "Non, sur autoroute la pose du triangle n’est pas obligatoire si elle met en danger la vie du conducteur",
              "Oui au milieu de la voie",
              "Oui sur le toit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Remonter l’autoroute à pied pour poser le triangle présente un risque mortel et n’est pas requis."
          },
          {
            "_id": "q-lec-8-4-3",
            "questionText": "Pour appeler les secours d’autoroute en cas d’accident ou panne, que privilégier ?",
            "options": [
              "Faire du stop",
              "Utiliser une borne d’appel d’urgence orange (tous les 2 km) ou l’application officielle SOS",
              "Appeler un ami",
              "Attendre le passage des gendarmes"
            ],
            "correctOptionIndex": 1,
            "explanation": "La borne d’urgence géolocalise instantanément votre position exacte pour les patrouilleurs."
          },
          {
            "_id": "q-lec-8-4-4",
            "questionText": "Quelle est la durée de vie moyenne d’un piéton sur la bande d’arrêt d’urgence d’une autoroute ?",
            "options": [
              "Plusieurs heures",
              "Moins de 20 minutes",
              "Une journée",
              "Aucun danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "La BAU est extrêmement dangereuse : il faut immédiatement passer derrière les glissières."
          },
          {
            "_id": "q-lec-8-4-5",
            "questionText": "Où doivent attendre les passagers pendant le dépannage sur autoroute ?",
            "options": [
              "Dans l’habitacle assis avec ceinture",
              "Debout sur la BAU",
              "Derrière la glissière de sécurité métallique ou sur le talus",
              "Au bord de la route"
            ],
            "correctOptionIndex": 2,
            "explanation": "Personne ne doit rester à l’intérieur du véhicule immobilisé sur la BAU."
          }
        ]
      },
      {
        "_id": "lec-8-5",
        "_type": "lecon",
        "title": "Leçon 8.5 — Voies rapides urbaines et périphériques",
        "ordre": 5,
        "description": "Particularités des voies rapides urbaines : insertions fréquentes, vitesse réglementée, demi-tour et arrêt interdits hors urgence.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-5-1",
            "questionText": "Quelle est la limitation de vitesse sur le boulevard périphérique parisien et de nombreuses rocades urbaines ?",
            "options": [
              "90 km/h",
              "70 km/h ou 80 km/h selon la signalisation locale",
              "130 km/h",
              "110 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les voies rapides urbaines ont des limitations abaissées (ex: 70 ou 80 km/h)."
          },
          {
            "_id": "q-lec-8-5-2",
            "questionText": "Sur le périphérique parisien historique, quelle est la particularité des voies d’insertion ?",
            "options": [
              "Les véhicules sur l’anneau sont prioritaires",
              "Les véhicules entrants bénéficient de la priorité à droite",
              "Priorité aux camions",
              "Feu vert permanent"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le périphérique parisien applique historiquement la priorité à droite aux bretelles d’accès."
          },
          {
            "_id": "q-lec-8-5-3",
            "questionText": "Sur une voie rapide urbaine à fort trafic, les changements fréquents de file :",
            "options": [
              "Font gagner beaucoup de temps",
              "Provoquent des ralentissements en accordéon et augmentent le risque d’accrochage",
              "Sont obligatoires",
              "Sont autorisés sans clignotant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Garder sa file stabilise la circulation et évite l’effet accordéon."
          },
          {
            "_id": "q-lec-8-5-4",
            "questionText": "Les deux-roues motorisés en circulation inter-files sur voies rapides urbaines :",
            "options": [
              "Doivent rouler à 130 km/h",
              "Peuvent circuler entre les 2 voies les plus à gauche à vitesse modérée (max 50 km/h) lorsque le trafic est congestionné",
              "Sont prioritaires sur tout",
              "N’ont aucun droit"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’expérimentation encadre l’inter-files entre les voies de gauche à 50 km/h max en cas d’embouteillage."
          },
          {
            "_id": "q-lec-8-5-5",
            "questionText": "En cas de panne sur voie rapide urbaine sans BAU :",
            "options": [
              "On abandonne la voiture au milieu",
              "On allume les feux de détresse, serre au maximum le trottoir/glissière et protège les occupants",
              "On fait marche arrière",
              "On klaxonne"
            ],
            "correctOptionIndex": 1,
            "explanation": "On sécurise au maximum le véhicule et on fait évacuer les passagers vers un lieu sûr."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-9",
    "_type": "moduleFormation",
    "code": "MOD-009",
    "title": "Module 9 — Conduite de nuit et météo difficile",
    "summary": "Conduite nocturne, utilisation optimale des feux, adhérence et aquaplaning sous la pluie, brouillard, neige, verglas et vent fort.",
    "learningObjectives": [
      "Maîtriser l'usage réglementaire de tous les feux (position, croisement, route, brouillard)",
      "Comprendre et prévenir le phénomène dangereux d'aquaplaning sous la pluie",
      "Conduire en sécurité par brouillard dense et respecter la règle des 50 km/h",
      "Adapter la conduite sur neige et verglas avec équipements spéciaux (chaînes, chaussettes, pneus hiver)"
    ],
    "ordre": 9,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-9-1",
        "_type": "lecon",
        "title": "Leçon 9.1 — Conduite de nuit et usage des feux",
        "ordre": 1,
        "description": "Feux de croisement et feux de route, prévention de l’éblouissement, visibilité réduite et vigilance accrue.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-1-1",
            "questionText": "La nuit sur route non éclairée sans aucun véhicule devant ni en face, vous roulez en :",
            "options": [
              "Feux de position seuls",
              "Feux de croisement",
              "Feux de route (pleins phares)",
              "Feux de détresse"
            ],
            "correctOptionIndex": 2,
            "explanation": "Les feux de route éclairent à au moins 100 mètres et sont requis hors agglomération sans gêne pour autrui."
          },
          {
            "_id": "q-lec-9-1-2",
            "questionText": "À quelle distance minimale éclairent les feux de croisement ?",
            "options": [
              "10 mètres",
              "30 mètres",
              "100 mètres",
              "200 mètres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de croisement éclairent à au moins 30 mètres vers l’avant sans éblouir."
          },
          {
            "_id": "q-lec-9-1-3",
            "questionText": "En agglomération bien éclairée la nuit, quels feux devez-vous utiliser ?",
            "options": [
              "Feux de route",
              "Feux de croisement",
              "Feux éteints",
              "Feux antibrouillard"
            ],
            "correctOptionIndex": 1,
            "explanation": "En ville éclairée, on circule en feux de croisement pour être vu et voir la chaussée."
          },
          {
            "_id": "q-lec-9-1-4",
            "questionText": "Dès que vous croisez ou suivez un autre véhicule de nuit, vous devez :",
            "options": [
              "Garder les feux de route",
              "Passer en feux de croisement",
              "Éteindre les feux",
              "Faire des appels de phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le passage en feux de croisement évite d’éblouir les autres conducteurs."
          },
          {
            "_id": "q-lec-9-1-5",
            "questionText": "Pour réduire l’éblouissement causé par un véhicule derrière vous, vous pouvez :",
            "options": [
              "Accélérer",
              "Basculer le rétroviseur intérieur en position nuit",
              "Fermer les yeux",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "La languette anti-éblouissement ou le miroir électrochrome atténue le reflet des phares."
          }
        ]
      },
      {
        "_id": "lec-9-2",
        "_type": "lecon",
        "title": "Leçon 9.2 — Conduite sous la pluie",
        "ordre": 2,
        "description": "Adhérence réduite, aquaplaning, essuie-glaces, feux, distances de freinage et réduction de vitesse.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-2-1",
            "questionText": "Quels feux allumer obligatoirement lorsqu’il pleut ?",
            "options": [
              "Feux de position seuls",
              "Feux de croisement (avec essuie-glaces)",
              "Feux de route",
              "Feux de brouillard arrière"
            ],
            "correctOptionIndex": 1,
            "explanation": "Dès qu’il pleut, les feux de croisement sont obligatoires pour être visible."
          },
          {
            "_id": "q-lec-9-2-2",
            "questionText": "Les feux de brouillard arrière sont-ils autorisés sous une forte pluie ?",
            "options": [
              "Oui toujours",
              "Non, c’est strictement interdit car ils éblouissent fortement les usagers qui suivent",
              "Oui sur autoroute",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de brouillard arrière sont interdits sous la pluie (réservés à brouillard et neige)."
          },
          {
            "_id": "q-lec-9-2-3",
            "questionText": "Qu’est-ce que le phénomène d’aquaplaning (ou aquaplanage) ?",
            "options": [
              "Un nettoyage automatique des pneus",
              "La perte totale de contact entre le pneu et la route à cause d’un film d’eau non évacué",
              "Un freinage puissant",
              "Une accélération soudaine"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le pneu flotte sur l’eau, entraînant la perte totale du contrôle directionnel et des freins."
          },
          {
            "_id": "q-lec-9-2-4",
            "questionText": "Que faire en cas d’amorce d’aquaplaning ?",
            "options": [
              "Freiner de toutes ses forces et tourner le volant",
              "Maintenir le volant droit, relâcher doucement l’accélérateur sans freiner brusquement",
              "Accélérer",
              "Tirer le frein à main"
            ],
            "correctOptionIndex": 1,
            "explanation": "On débraye ou relâche l’accélérateur en gardant les roues droites pour retrouver l’adhérence."
          },
          {
            "_id": "q-lec-9-2-5",
            "questionText": "Sous la pluie, la vitesse sur autoroute est réduite de 130 km/h à :",
            "options": [
              "120 km/h",
              "110 km/h",
              "100 km/h",
              "90 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse passe de 130 à 110 km/h sur autoroute par temps pluvieux."
          }
        ]
      },
      {
        "_id": "lec-9-3",
        "_type": "lecon",
        "title": "Leçon 9.3 — Conduite par brouillard",
        "ordre": 3,
        "description": "Réduction de l’allure, feux adaptés, interdiction pratique des feux de route à cause de la réverbération et distances accrues.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-3-1",
            "questionText": "Par temps de brouillard, pourquoi ne doit-on PAS allumer les feux de route ?",
            "options": [
              "Ils s’usent trop vite",
              "La lumière se reflète sur les gouttelettes d’eau en formant un « mur blanc » opaque et éblouissant",
              "Ils sont interdits le matin",
              "Ils chauffent trop"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de route créent un mur opaque éblouissant par réverbération sur le brouillard."
          },
          {
            "_id": "q-lec-9-3-2",
            "questionText": "Quels feux utiliser par temps de brouillard ?",
            "options": [
              "Feux de croisement et feux antibrouillard avant/arrière si le véhicule en est équipé",
              "Feux de position seuls",
              "Feux de route",
              "Feux de détresse seuls"
            ],
            "correctOptionIndex": 0,
            "explanation": "Feux de croisement complétés par les antibrouillards avant et arrière."
          },
          {
            "_id": "q-lec-9-3-3",
            "questionText": "Lorsque la visibilité est inférieure à 50 mètres par brouillard dense, la vitesse est limitée à :",
            "options": [
              "30 km/h",
              "50 km/h sur toutes les routes et autoroutes",
              "70 km/h",
              "90 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse maximale est de 50 km/h partout dès que la visibilité tombe sous 50 m."
          },
          {
            "_id": "q-lec-9-3-4",
            "questionText": "Quel repère visuel peut aider à maintenir sa trajectoire dans un brouillard épais ?",
            "options": [
              "Regarder le ciel",
              "La ligne de rive peinte sur le bord droit de la chaussée",
              "Le milieu de la route",
              "Les panneaux publicitaires"
            ],
            "correctOptionIndex": 1,
            "explanation": "La ligne blanche de droite guide le conducteur le long du bas-côté."
          },
          {
            "_id": "q-lec-9-3-5",
            "questionText": "Dès que l’on sort de la nappe de brouillard, quelle est l’obligation immédiate ?",
            "options": [
              "Accélérer à fond",
              "Éteindre immédiatement les feux de brouillard arrière pour ne pas éblouir",
              "Allumer les feux de détresse",
              "Couper le moteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux antibrouillard arrière doivent être éteints dès que le brouillard disparaît."
          }
        ]
      },
      {
        "_id": "lec-9-4",
        "_type": "lecon",
        "title": "Leçon 9.4 — Conduite sur neige et verglas",
        "ordre": 4,
        "description": "Équipements adaptés, conduite souple, anticipation, freinage progressif et augmentation importante des distances.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-4-1",
            "questionText": "Sur une chaussée enneigée ou verglacée, la distance de freinage peut être multipliée par :",
            "options": [
              "2",
              "Jusqu’à 4 ou 10 fois par rapport au sol sec",
              "Elle est divisée par 2",
              "Inchangée"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’absence d’adhérence allonge considérablement la distance d’arrêt."
          },
          {
            "_id": "q-lec-9-4-2",
            "questionText": "Quelle est la règle de conduite fondamentale sur neige ou verglas ?",
            "options": [
              "Conduite agressive",
              "Conduite ultra-souple : accélérations très progressives, frein moteur, gestes mesurés",
              "Freiner fort dans les virages",
              "Rouler en surrégime"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout geste brusque provoque un décrochage instantané du véhicule."
          },
          {
            "_id": "q-lec-9-4-3",
            "questionText": "Que signifie le panneau rond bleu B26 représentant un pneu avec des chaînes ?",
            "options": [
              "Pneus neige interdits",
              "Obligation de circuler avec des chaînes à neige sur au moins deux roues motrices",
              "Zone de ski",
              "Garage proche"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le panneau B26 rend obligatoire le port de chaînes ou chaussettes homologuées."
          },
          {
            "_id": "q-lec-9-4-4",
            "questionText": "En cas de démarrage sur neige ou verglas avec patinage des roues, on peut :",
            "options": [
              "Accélérer à fond en 1ère",
              "Démarrer en 2ème vitesse à très bas régime avec un filet de gaz",
              "Tirer le frein à main",
              "Couper le contact"
            ],
            "correctOptionIndex": 1,
            "explanation": "Démarrer en 2ème vitesse réduit le couple aux roues et limite le patinage."
          },
          {
            "_id": "q-lec-9-4-5",
            "questionText": "Par temps de neige, quels feux sont autorisés pour circuler ?",
            "options": [
              "Feux de croisement et feux de brouillard avant et arrière",
              "Feux de position seuls",
              "Feux de route en continu",
              "Feux de détresse"
            ],
            "correctOptionIndex": 0,
            "explanation": "La neige autorise l’usage des antibrouillards avant et arrière avec les feux de croisement."
          }
        ]
      },
      {
        "_id": "lec-9-5",
        "_type": "lecon",
        "title": "Leçon 9.5 — Vent fort et autres conditions difficiles",
        "ordre": 5,
        "description": "Risques de vent latéral sur les ponts et zones dégagées, écarts de trajectoire et décision de reporter un trajet en cas de conditions extrêmes.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-5-1",
            "questionText": "Sur un viaduc ou en sortant d’une zone boisée abritée par vent violent, le risque majeur est :",
            "options": [
              "Une panne de batterie",
              "Une violente embardée latérale de trajectoire pouvant déporter le véhicule",
              "L’aquaplaning",
              "L’éblouissement"
            ],
            "correctOptionIndex": 1,
            "explanation": "La bourrasque de vent latéral pousse brutalement le véhicule sur le côté."
          },
          {
            "_id": "q-lec-9-5-2",
            "questionText": "Face à un vent fort latéral, que devez-vous faire ?",
            "options": [
              "Accélérer pour couper le vent",
              "Réduire la vitesse, tenir fermement le volant à deux mains et anticiper les zones exposées",
              "Lâcher le volant",
              "Mettre les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "Réduire l’allure diminue la prise au vent et redonne du contrôle au conducteur."
          },
          {
            "_id": "q-lec-9-5-3",
            "questionText": "Que signale une manche à air sur le bord d’une voie rapide ?",
            "options": [
              "Un aéroport",
              "La présence d’une zone exposée à de forts vents latéraux ainsi que la force et direction du vent",
              "Une zone de repos",
              "Une station météo privée"
            ],
            "correctOptionIndex": 1,
            "explanation": "La manche à air indique l’intensité et le sens des rafales de vent."
          },
          {
            "_id": "q-lec-9-5-4",
            "questionText": "Quel type de véhicule est le plus vulnérable au vent violent ?",
            "options": [
              "Les voitures basses",
              "Les deux-roues, véhicules tractant une caravane, camping-cars et fourgons hauts",
              "Les poids lourds chargés",
              "Les trains"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur grande surface latérale ou leur équilibre précaire les rend très sensibles au vent."
          },
          {
            "_id": "q-lec-9-5-5",
            "questionText": "Si les conditions météo deviennent extrêmes (tempête, pluies torrentielles inondant la route) :",
            "options": [
              "Il faut rouler à 130 km/h pour arriver plus vite",
              "La meilleure décision de sécurité est de reporter son trajet ou de s’arrêter en lieu sûr",
              "Rouler sur la BAU",
              "Couper les phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Savoir renoncer à prendre la route est un comportement responsable fondamental."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-10",
    "_type": "moduleFormation",
    "code": "MOD-010",
    "title": "Module 10 — Alcool, drogues, fatigue et capacités",
    "summary": "Impacts de l'alcool et stupéfiants, pictogrammes médicaments, somnolence, téléphone au volant et aptitudes physiques à la conduite.",
    "learningObjectives": [
      "Connaître les seuils légaux d'alcoolémie (0,2 g/l en permis probatoire, 0,5 g/l en confirmé)",
      "Comprendre les effets des stupéfiants, drogues et mélanges avec l'alcool",
      "Identifier les pictogrammes de niveau de risque des médicaments (Niveaux 1, 2, 3)",
      "Reconnaître les signes précurseurs de somnolence et respecter la pause obligatoire de 2 heures"
    ],
    "ordre": 10,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-10-1",
        "_type": "lecon",
        "title": "Leçon 10.1 — Alcool et conduite",
        "ordre": 1,
        "description": "Seuils d’alcoolémie, baisse des réflexes et du jugement, risques, dépistage et sanctions.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-1-1",
            "questionText": "Quel est le taux maximal légal d’alcoolémie pour un jeune conducteur en permis probatoire ?",
            "options": [
              "0,0 g/l",
              "0,2 g/l de sang (soit 0,10 mg/l d’air expiré = 0 verre)",
              "0,5 g/l",
              "0,8 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite est de 0,2 g/l en permis probatoire, ce qui équivaut à tolérance zéro."
          },
          {
            "_id": "q-lec-10-1-2",
            "questionText": "Quel est le taux maximal autorisé pour un conducteur confirmé ?",
            "options": [
              "0,2 g/l",
              "0,5 g/l de sang (ou 0,25 mg/l d’air expiré)",
              "0,8 g/l",
              "1,0 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil contraventionnel débute à 0,5 g/l de sang."
          },
          {
            "_id": "q-lec-10-1-3",
            "questionText": "À partir de quel taux d’alcoolémie l’infraction devient-elle un DÉLIT pénal (tribunal correctionnel) ?",
            "options": [
              "0,5 g/l",
              "0,8 g/l de sang (ou 0,40 mg/l d’air)",
              "1,5 g/l",
              "2,0 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "Dès 0,8 g/l, il s’agit d’un délit passible de 2 ans de prison, 4500 € d’amende et 6 points."
          },
          {
            "_id": "q-lec-10-1-4",
            "questionText": "En moyenne, combien de temps faut-il à l’organisme pour éliminer un verre d’alcool standard ?",
            "options": [
              "15 minutes",
              "1 heure à 2 heures par verre",
              "5 minutes en buvant du café",
              "24 heures"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’alcool s’élimine au rythme moyen de 0,10 à 0,15 g/l par heure. Aucun remède miracle n’accélère l’élimination."
          },
          {
            "_id": "q-lec-10-1-5",
            "questionText": "Quels sont les premiers effets de l’alcool sur le comportement du conducteur ?",
            "options": [
              "Meilleurs réflexes",
              "Surestimation de ses capacités, euphorie, rétrécissement du champ visuel et temps de réaction allongé",
              "Vue parfaite",
              "Sommeil instantané"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’alcool désinhibe, fausse le jugement et ralentit les réflexes cérébraux."
          }
        ]
      },
      {
        "_id": "lec-10-2",
        "_type": "lecon",
        "title": "Leçon 10.2 — Drogues et médicaments",
        "ordre": 2,
        "description": "Effets des stupéfiants, dépistage, pictogrammes des médicaments et danger du mélange alcool-médicaments.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-2-1",
            "questionText": "La conduite après usage de stupéfiants (cannabis, cocaïne, etc.) est-elle tolérée ?",
            "options": [
              "Tolérance pour 1 joint",
              "Strictement interdite (tolérance zéro), dépistée par test salivaire et passible de 2 ans de prison et 6 points",
              "Autorisée le week-end",
              "Autorisée hors autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sous stupéfiants est un délit réprimé sévèrement dès la moindre trace."
          },
          {
            "_id": "q-lec-10-2-2",
            "questionText": "Que signifie un pictogramme de médicament représentant un triangle ROUGE avec une voiture (Niveau 3) ?",
            "options": [
              "Conduite autorisée",
              "Conduite formellement déconseillée / interdite pendant le traitement",
              "Prendre l’autoroute",
              "Aucun danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau 3 (rouge) interdit la conduite automobile pendant la durée du traitement."
          },
          {
            "_id": "q-lec-10-2-3",
            "questionText": "Le pictogramme JAUNE (Niveau 1) sur une boîte de médicaments indique :",
            "options": [
              "Danger mortel",
              "Soyez prudent, lisez attentivement la notice avant de prendre le volant",
              "Interdiction de conduire",
              "Prendre le volant vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau 1 appelle à la prudence et à la lecture de la notice."
          },
          {
            "_id": "q-lec-10-2-4",
            "questionText": "Le mélange alcool + médicaments ou stupéfiants a pour conséquence :",
            "options": [
              "D’annuler les effets",
              "De multiplier de façon exponentielle les risques d’accident et la somnolence",
              "D’améliorer la vision",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cocktail alcool-substances démultiplie les effets toxiques et destructeurs."
          },
          {
            "_id": "q-lec-10-2-5",
            "questionText": "Le cannabis altère les capacités du conducteur pendant combien de temps après la prise ?",
            "options": [
              "10 minutes",
              "Plusieurs heures voire plusieurs jours pour certaines facultés de réflexes",
              "Aucun effet",
              "1 minute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les principes actifs restent présents dans l’organisme et perturbent l’attention sur une longue durée."
          }
        ]
      },
      {
        "_id": "lec-10-3",
        "_type": "lecon",
        "title": "Leçon 10.3 — Fatigue et somnolence au volant",
        "ordre": 3,
        "description": "Signes de fatigue, danger de l’endormissement, pauses régulières et sieste courte.",
        "videoUrl": "https://www.youtube.com/watch?v=bpg9a-uvp8U",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-3-1",
            "questionText": "Tous les combien de temps est-il impératif de faire une pause lors d’un long trajet ?",
            "options": [
              "Toutes les 5 heures",
              "Toutes les 2 heures au moins, pendant 15 à 20 minutes",
              "Une seule pause à l’arrivée",
              "Tous les 1000 km"
            ],
            "correctOptionIndex": 1,
            "explanation": "La règle des 2 heures permet de reposer le système nerveux et les yeux."
          },
          {
            "_id": "q-lec-10-3-2",
            "questionText": "Quels sont les premiers signaux d’alerte de la fatigue au volant ?",
            "options": [
              "Bâillements répétés, paupières lourdes, picotements des yeux, raideur dans la nuque",
              "Une grande énergie",
              "Faim de sucre",
              "La radio trop forte"
            ],
            "correctOptionIndex": 0,
            "explanation": "Ces signes précurseurs imposent de s’arrêter immédiatement sur la prochaine aire."
          },
          {
            "_id": "q-lec-10-3-3",
            "questionText": "Quel est le seul moyen réellement efficace pour lutter contre une somnolence installée ?",
            "options": [
              "Ouvrir la fenêtre et monter la musique",
              "Boire 3 cafés",
              "S’arrêter pour faire une courte sieste de 15 à 20 minutes",
              "Manger du chewing-gum"
            ],
            "correctOptionIndex": 2,
            "explanation": "Seul le sommeil réel (micro-sieste) recharge les capacités de vigilance du cerveau."
          },
          {
            "_id": "q-lec-10-3-4",
            "questionText": "À quelle période de la journée le risque d’endormissement est-il statistiquement le plus élevé ?",
            "options": [
              "À midi",
              "Entre 2h et 6h du matin, et entre 13h et 16h (creux circadien)",
              "À 18h",
              "À 10h du matin"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces créneaux correspondent aux baisses physiologiques de la température corporelle."
          },
          {
            "_id": "q-lec-10-3-5",
            "questionText": "La somnolence au volant est la première cause de mortalité sur :",
            "options": [
              "Les routes de campagne",
              "Les autoroutes",
              "Les parkings",
              "Les ronds-points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur autoroute, 1 accident mortel sur 3 est dû à l’endormissement."
          }
        ]
      },
      {
        "_id": "lec-10-4",
        "_type": "lecon",
        "title": "Leçon 10.4 — Téléphone et distractions au volant",
        "ordre": 4,
        "description": "Téléphone tenu en main, GPS, écrans, passagers, attention détournée et sanctions.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-4-1",
            "questionText": "L’utilisation d’un téléphone tenu en main au volant est sanctionnée par :",
            "options": [
              "35 € sans point",
              "135 € d’amende et retrait de 3 points sur le permis",
              "1 point",
              "La confiscation de la voiture"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’usage du téléphone au volant retire 3 points et coûte 135 € d’amende forfaitaire."
          },
          {
            "_id": "q-lec-10-4-2",
            "questionText": "Le port d’oreillettes, écouteurs ou casques audio en conduisant (même pour téléphoner) est-il autorisé ?",
            "options": [
              "Oui si le son est bas",
              "Non, c’est strictement interdit pour tous les conducteurs (voitures, motos, vélos, trottinettes)",
              "Oui pour les motards",
              "Oui sur autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout dispositif dans l’oreille est interdit pour garantir l’audition des bruits extérieurs."
          },
          {
            "_id": "q-lec-10-4-3",
            "questionText": "Lire ou écrire un SMS en conduisant multiplie le risque d’accident par :",
            "options": [
              "2",
              "23 fois",
              "Aucune augmentation",
              "5 fois"
            ],
            "correctOptionIndex": 1,
            "explanation": "Quitter la route des yeux pendant 5 secondes à 90 km/h équivaut à 125 m à l’aveugle."
          },
          {
            "_id": "q-lec-10-4-4",
            "questionText": "Si vous commettez une infraction avec un téléphone en main (ex: oubli de clignotant ou refus de priorité) :",
            "options": [
              "Une amende simple",
              "Le permis peut être retenu et suspendu immédiatement sur le champ",
              "Rien",
              "Un avertissement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cumul téléphone + autre infraction entraîne la rétention immédiate du permis."
          },
          {
            "_id": "q-lec-10-4-5",
            "questionText": "Régler son GPS ou changer la playlist sur son écran tactile doit se faire :",
            "options": [
              "En roulant à 130 km/h",
              "À l’arrêt avant de démarrer ou lors d’une pause sécurisée",
              "En doublant",
              "Par la voix en criant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Toute manipulation d’écran en mouvement détourne l’attention visuelle et cognitive."
          }
        ]
      },
      {
        "_id": "lec-10-5",
        "_type": "lecon",
        "title": "Leçon 10.5 — État physique et aptitude à la conduite",
        "ordre": 5,
        "description": "Vision, audition, aptitude médicale, port des lunettes prescrites, effets du stress et de l’état émotionnel.",
        "videoUrl": "https://www.youtube.com/watch?v=bpg9a-uvp8U",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-5-1",
            "questionText": "Si la mention « 01 » (port obligatoire de verres correcteurs) figure sur votre permis :",
            "options": [
              "Les lunettes sont facultatives de jour",
              "Le port de lunettes ou lentilles de contact est strictement obligatoire au volant",
              "Seulement pour les personnes âgées",
              "Seulement la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Conduire sans ses verres correcteurs obligatoires constitue une infraction sanctionnée de 3 points."
          },
          {
            "_id": "q-lec-10-5-2",
            "questionText": "Une forte colère ou un état d’anxiété intense :",
            "options": [
              "Améliore la vitesse",
              "Augmente l’agressivité au volant, la prise de risque et diminue la vigilance",
              "Est sans effet",
              "Permet d’être plus attentif"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’état émotionnel altère considérablement la lucidité et la perception des risques."
          },
          {
            "_id": "q-lec-10-5-3",
            "questionText": "Quelle acuité visuelle minimale globale (avec correction éventuelle) est exigée pour le permis B ?",
            "options": [
              "2/10",
              "5/10 au moins pour l’ensemble des deux yeux",
              "10/10 obligatoire",
              "8/10"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil réglementaire minimal d’acuité visuelle est de 5/10."
          },
          {
            "_id": "q-lec-10-5-4",
            "questionText": "En cas de problème de santé grave (épilepsie, AVC, troubles visuels majeurs) :",
            "options": [
              "On continue à conduire",
              "On doit passer une visite médicale auprès de la commission préfectorale pour valider l’aptitude",
              "On n’en parle à personne",
              "On conduit uniquement le jour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Certaines affections imposent un contrôle médical officiel d’aptitude à la conduite."
          },
          {
            "_id": "q-lec-10-5-5",
            "questionText": "Avoir une paire de lunettes de secours dans la boîte à gants est :",
            "options": [
              "Interdit",
              "Fortement recommandé, notamment pour les porteurs de lentilles de contact",
              "Inutile",
              "Payant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une paire de lunettes de secours évite d’être bloqué en cas de perte de lentille."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-11",
    "_type": "moduleFormation",
    "code": "MOD-011",
    "title": "Module 11 — Usagers vulnérables",
    "summary": "Protection et cohabitation avec piétons, cyclistes (sas vélo, angles morts), motocyclistes, enfants et personnes à mobilité réduite.",
    "learningObjectives": [
      "Connaître les droits et la priorité absolue accordée aux piétons",
      "Appliquer les règles de sécurité avec les cyclistes (sas vélo, distances de dépassement)",
      "Identifier les risques spécifiques liés aux deux-roues motorisés",
      "Adopter un comportement ultra-prudent envers enfants, seniors et personnes à mobilité réduite"
    ],
    "ordre": 11,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-11-1",
        "_type": "lecon",
        "title": "Leçon 11.1 — Les piétons : droits et comportements à adopter",
        "ordre": 1,
        "description": "Priorité aux passages piétons, zones de rencontre, vigilance près des écoles et comportement en zones résidentielles.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-1-1",
            "questionText": "Quelle est la priorité d’un piéton engagé ou manifestant l’intention de traverser ?",
            "options": [
              "Priorité secondaire",
              "Priorité absolue : tout véhicule doit obligatoirement s’arrêter pour le laisser passer",
              "Uniquement s’il court",
              "Uniquement le jour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorité à un piéton est sanctionné d’un retrait de 6 points."
          },
          {
            "_id": "q-lec-11-1-2",
            "questionText": "Dans une « Zone de rencontre », quelle est la vitesse maximale et qui a la priorité ?",
            "options": [
              "30 km/h, priorité aux voitures",
              "20 km/h, priorité absolue aux piétons sur toute la chaussée",
              "50 km/h",
              "10 km/h réservé aux vélos"
            ],
            "correctOptionIndex": 1,
            "explanation": "En zone de rencontre, la vitesse est limitée à 20 km/h et les piétons sont prioritaires partout."
          },
          {
            "_id": "q-lec-11-1-3",
            "questionText": "À proximité d’un arrêt de bus ou tramway avec des voyageurs qui descendent :",
            "options": [
              "On accélère pour dépasser",
              "On ralentit fortement car des piétons peuvent surgir devant ou derrière le bus",
              "On klaxonne",
              "On ne fait rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les passagers descendant d’un transport collectif traversent souvent sans regarder."
          },
          {
            "_id": "q-lec-11-1-4",
            "questionText": "Dans une « Aire piétonne » :",
            "options": [
              "Les voitures peuvent rouler à 50 km/h",
              "Seuls les véhicules autorisés (livraisons, secours) peuvent rouler au pas (max 20 km/h)",
              "Le stationnement est libre",
              "Les vélos sont interdits"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’aire piétonne est réservée aux piétons, les véhicules autorisés y roulent à l’allure du pas."
          },
          {
            "_id": "q-lec-11-1-5",
            "questionText": "Quelle sanction risque un conducteur refusant la priorité à un piéton régulièrement engagé ?",
            "options": [
              "1 point",
              "135 € d’amende et retrait de 6 points avec suspension de permis possible",
              "Aucune sanction",
              "35 €"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorité piéton est l’une des infractions les plus sévèrement punies (6 points)."
          }
        ]
      },
      {
        "_id": "lec-11-2",
        "_type": "lecon",
        "title": "Leçon 11.2 — Cyclistes : cohabitation et zones réservées",
        "ordre": 2,
        "description": "Pistes cyclables, sas vélo, zones 30, angle mort, dépassement et ouverture sécurisée de portière.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-2-1",
            "questionText": "Quelle technique d’ouverture de portière évite de percuter un cycliste arrivant par l’arrière ?",
            "options": [
              "Ouvrir d’un coup sec",
              "L’ouverture « à la hollandaise » avec la main opposée pour forcer le buste à pivoter et vérifier l’angle mort",
              "Fermer les yeux",
              "Klaxonner avant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ouvrir avec la main droite (côté conducteur) oriente naturellement le regard vers l’arrière."
          },
          {
            "_id": "q-lec-11-2-2",
            "questionText": "Quelle distance latérale minimale devez-vous respecter pour doubler un cycliste ?",
            "options": [
              "0,5 m partout",
              "1 mètre en agglomération et 1,50 mètre hors agglomération",
              "2 mètres en ville",
              "0,2 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces distances protègent le cycliste des rafales et des déséquilibres."
          },
          {
            "_id": "q-lec-11-2-3",
            "questionText": "Dans une rue en « double sens cyclable » (zone 30 ou zone de rencontre) :",
            "options": [
              "Les vélos roulent à contresens de manière illégale",
              "Les cyclistes sont légalement autorisés à circuler dans les deux sens",
              "Les voitures sont prioritaires",
              "Les vélos doivent rouler sur le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "En zone 30, les rues à sens unique pour les voitures sont à double sens pour les cyclistes."
          },
          {
            "_id": "q-lec-11-2-4",
            "questionText": "Sur un sas vélo devant un feu rouge, les voitures doivent :",
            "options": [
              "S’arrêter au milieu du sas",
              "S’arrêter impérativement avant la première ligne pour laisser le sas libre aux vélos",
              "Stationner",
              "Accélérer"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sas vélo positionne les cyclistes en tête pour être vus et démarrer en sécurité."
          },
          {
            "_id": "q-lec-11-2-5",
            "questionText": "Avant de tourner à droite à une intersection, vous devez :",
            "options": [
              "Couper la route",
              "Contrôler votre rétroviseur droit et l’angle mort pour céder le passage à un cycliste longeant votre droite",
              "Accélérer",
              "Freiner sans regarder"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cycliste circulant tout droit sur la piste a la priorité sur le véhicule qui tourne."
          }
        ]
      },
      {
        "_id": "lec-11-3",
        "_type": "lecon",
        "title": "Leçon 11.3 — Motocyclistes et deux-roues motorisés",
        "ordre": 3,
        "description": "Visibilité réduite des deux-roues, vérification avant de tourner, distances de sécurité et risques aux intersections.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-3-1",
            "questionText": "Pourquoi les deux-roues motorisés sont-ils particulièrement difficiles à détecter ?",
            "options": [
              "Ils sont silencieux",
              "Leur silhouette étroite se dissimule facilement dans les angles morts et leur accélération est vive",
              "Ils ont des phares éteints",
              "Ils roulent sur les trottoirs"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur profil étroit masque leur présence dans les rétroviseurs et derrière les montants de vitre."
          },
          {
            "_id": "q-lec-11-3-2",
            "questionText": "En cas de chute d’un motard sur la chaussée, que ne devez-vous JAMAIS faire sauf urgence vitale ?",
            "options": [
              "Baliser la zone",
              "Lui retirer son casque",
              "Appeler le 15 ou 112",
              "Couper le contact de sa moto"
            ],
            "correctOptionIndex": 1,
            "explanation": "Retirer le casque risque de provoquer une paralysie ou lésion irréversible de la moelle épinière."
          },
          {
            "_id": "q-lec-11-3-3",
            "questionText": "Quelle est la principale cause d’accident mortel impliquant une voiture et une moto à une intersection ?",
            "options": [
              "Une panne de phare",
              "Le refus de priorité de la voiture qui n’a pas vu ou a mal estimé la vitesse de la moto qui arrivait",
              "Une chaussée sèche",
              "L’absence de casque"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’automobiliste estime mal la vitesse d’approche d’un deux-roues lors d’un tourne-à-gauche."
          },
          {
            "_id": "q-lec-11-3-4",
            "questionText": "Lorsque des motards circulent en inter-files sur voie rapide congestionnée, vous devez :",
            "options": [
              "Leur barrer la route",
              "Élargir l’espace en serrant sur le côté de votre voie pour leur faciliter le passage",
              "Klaxonner",
              "Ouvrir votre portière"
            ],
            "correctOptionIndex": 1,
            "explanation": "Faciliter le passage des deux-roues en inter-files est un geste de sécurité partagée."
          },
          {
            "_id": "q-lec-11-3-5",
            "questionText": "À quel équipement obligatoire doit être attentif un motocycliste ?",
            "options": [
              "Casque homologué attaché et gants certifiés",
              "Des lunettes de soleil seules",
              "Un short",
              "Une écharpe"
            ],
            "correctOptionIndex": 0,
            "explanation": "Casque et gants homologués sont les équipements minimaux strictement obligatoires par la loi."
          }
        ]
      },
      {
        "_id": "lec-11-4",
        "_type": "lecon",
        "title": "Leçon 11.4 — Enfants et personnes à mobilité réduite",
        "ordre": 4,
        "description": "Risques liés à l’imprévisibilité des enfants, zones scolaires, aires de jeux et vigilance envers les personnes à mobilité réduite.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-4-1",
            "questionText": "Pourquoi les jeunes enfants ont-ils un comportement à très haut risque près de la chaussée ?",
            "options": [
              "Ils connaissent le code",
              "Leur champ visuel est restreint, ils n’évaluent pas les distances et peuvent surgir brutalement après un ballon",
              "Ils courent vite",
              "Ils sont prudents"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur perception du danger est immature et leur comportement totalement imprévisible."
          },
          {
            "_id": "q-lec-11-4-2",
            "questionText": "Un piéton portant une canne blanche ou accompagné d’un chien-guide :",
            "options": [
              "Est une personne malvoyante ou non-voyante qui a la priorité absolue en toutes circonstances",
              "Doit céder le passage",
              "Doit courir",
              "Est interdit de traverser"
            ],
            "correctOptionIndex": 0,
            "explanation": "La canne blanche confère la priorité absolue au piéton malvoyant sur tout son parcours."
          },
          {
            "_id": "q-lec-11-4-3",
            "questionText": "À la vue d’un ballon qui roule sur la chaussée, quelle doit être votre réaction immédiate ?",
            "options": [
              "Accélérer pour passer dessus",
              "Freiner immédiatement et vous attendre à voir surgir un enfant derrière le ballon",
              "Klaxonner en gardant la même vitesse",
              "Ignorer le ballon"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un ballon roulant est le signe précurseur quasi certain de l’irruption d’un enfant."
          },
          {
            "_id": "q-lec-11-4-4",
            "questionText": "En présence d’une personne âgée ou à mobilité réduite traversant lentement sur un passage piéton :",
            "options": [
              "On klaxonne pour qu’elle se dépêche",
              "On patiente calmement sans mettre la pression ni donner de coups d’accélérateur",
              "On passe en la frôlant",
              "On la contourne par le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le respect du rythme des personnes vulnérables est une règle élémentaire de civisme et de loi."
          },
          {
            "_id": "q-lec-11-4-5",
            "questionText": "À l’approche d’un car scolaire à l’arrêt feux clignotants allumés :",
            "options": [
              "On double à 80 km/h",
              "On ralentit au pas en surveillant l’apparition d’enfants cachés par le bus",
              "On klaxonne",
              "On s’arrête 1 heure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les enfants peuvent traverser masqués par l’avant ou l’arrière du car scolaire."
          }
        ]
      },
      {
        "_id": "lec-11-5",
        "_type": "lecon",
        "title": "Leçon 11.5 — Bonnes pratiques générales envers les usagers vulnérables",
        "ordre": 5,
        "description": "Anticipation, courtoisie, réduction de vitesse, distances de sécurité et partage apaisé de la route.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-5-1",
            "questionText": "Dans la hiérarchie de la vulnérabilité routière, quel usager est le plus fragile et sans protection mécanique ?",
            "options": [
              "Le conducteur de SUV",
              "Le piéton",
              "Le camionneur",
              "Le motard avec gilet airbag"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le piéton absorbe directement 100% de l’énergie de l’impact lors d’un choc."
          },
          {
            "_id": "q-lec-11-5-2",
            "questionText": "Quelle est la chance de survie d’un piéton heurté par une voiture à 30 km/h par rapport à 50 km/h ?",
            "options": [
              "Identique",
              "Environ 90% de survie à 30 km/h contre seulement 20% à 50 km/h",
              "100% de mortalité à 30 km/h",
              "Aucune chance"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse de 30 km/h réduit drastiquement les risques de blessures mortelles."
          },
          {
            "_id": "q-lec-11-5-3",
            "questionText": "Le concept de « conducteur citoyen » et bienveillant repose sur :",
            "options": [
              "Faire valoir sa priorité quoi qu’il en coûte",
              "L’anticipation, la protection des plus faibles et le partage courtois de l’espace public",
              "Rouler le plus vite possible",
              "Ne jamais utiliser ses clignotants"
            ],
            "correctOptionIndex": 1,
            "explanation": "La sécurité routière collective dépend du comportement protecteur des conducteurs."
          },
          {
            "_id": "q-lec-11-5-4",
            "questionText": "En présence d’une flaque d’eau importante le long d’un trottoir où marchent des piétons :",
            "options": [
              "On accélère pour les éclabousser",
              "On ralentit pour ne pas projeter d’eau et ne pas risquer l’aquaplaning",
              "On klaxonne",
              "On ferme les vitres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le respect des piétons et la maîtrise du véhicule imposent une vitesse très réduite."
          },
          {
            "_id": "q-lec-11-5-5",
            "questionText": "Face à un utilisateur d’engin de déplacement personnel motorisé (trottinette électrique) :",
            "options": [
              "On le serre",
              "On applique les mêmes règles d’écart et de prudence qu’envers les cyclistes (1 m en ville, 1,5 m hors agglo)",
              "On le double sans regarder",
              "On le bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les trottinettes sont des usagers vulnérables nécessitant les mêmes distances de sécurité."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-12",
    "_type": "moduleFormation",
    "code": "MOD-012",
    "title": "Module 12 — Premiers secours et accident",
    "summary": "Procédure PAS (Protéger, Alerter, Secourir), numéros d'urgence (15, 17, 18, 112), gestes de premiers secours, constat amiable et sur-accidents.",
    "learningObjectives": [
      "Appliquer dans l'ordre strict la procédure vitale PAS (Protéger, Alerter, Secourir)",
      "Connaître par cœur les numéros d'urgence (15 SAMU, 17 Police, 18 Pompiers, 112 Europe, 114 Sourds)",
      "Maîtriser les gestes de premiers secours (PLS, massage cardiaque, utilisation du DAE)",
      "Rédiger correctement un constat amiable d'accident sans délit de fuite"
    ],
    "ordre": 12,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-12-1",
        "_type": "lecon",
        "title": "Leçon 12.1 — La procédure PAS : Protéger, Alerter, Secourir",
        "ordre": 1,
        "description": "Sécurisation d’une zone d’accident, prévention du sur-accident et ordre des actions à effectuer.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-1-1",
            "questionText": "Quel est l’ordre chronologique STRICT des actions à mener en arrivant le premier sur un accident ?",
            "options": [
              "Secourir, Alerter, Protéger",
              "Protéger la zone (P), Alerter les secours (A), Secourir les victimes (S)",
              "Alerter, Secourir, Protéger",
              "Prendre des photos"
            ],
            "correctOptionIndex": 1,
            "explanation": "La règle universelle est PAS : Protéger d’abord pour éviter le sur-accident, Alerter, puis Secourir."
          },
          {
            "_id": "q-lec-12-1-2",
            "questionText": "Comment PROTÉGER efficacement les lieux d’un accident sur route de campagne ?",
            "options": [
              "Courir sur la route",
              "Allumer feux de détresse, enfiler son gilet jaune, poser le triangle à au moins 30 m avant le virage/accident et faire baliser",
              "Allumer une cigarette",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le balisage visible prévient les autres usagers et évite une collision en chaîne."
          },
          {
            "_id": "q-lec-12-1-3",
            "questionText": "Pourquoi ne doit-on JAMAIS fumer ni approcher avec une flamme près d’un accident de la route ?",
            "options": [
              "C’est impoli",
              "Risque majeur d’incendie ou d’explosion dû aux vapeurs d’essence ou de carburant répandu",
              "Pour garder le calme",
              "C’est interdit la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les fuites de carburant ou de batterie peuvent s’enflammer instantanément."
          },
          {
            "_id": "q-lec-12-1-4",
            "questionText": "Doit-on couper le contact des véhicules accidentés si cela est accessible en sécurité ?",
            "options": [
              "Non, laisser tourner le moteur",
              "Oui, couper le contact et serrer le frein à main pour éliminer le risque d’étincelle et d’incendie",
              "Couper les câbles avec des ciseaux",
              "Enlever les pneus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Couper le contact neutralise les circuits électriques et coupe l’alimentation d’essence."
          },
          {
            "_id": "q-lec-12-1-5",
            "questionText": "Où placer les témoins non blessés et passagers valides ?",
            "options": [
              "Au milieu de la chaussée",
              "En lieu sûr, derrière les glissières de sécurité ou sur le bas-côté dégagé",
              "Dans les véhicules accidentés",
              "Sur le capot"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise à l’abri des personnes valides évite qu’elles ne soient fauchées."
          }
        ]
      },
      {
        "_id": "lec-12-2",
        "_type": "lecon",
        "title": "Leçon 12.2 — Alerter les secours efficacement",
        "ordre": 2,
        "description": "Numéros 15, 17, 18 et 112 ; informations essentielles à transmettre et comportement pendant l’appel.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-2-1",
            "questionText": "Quel est le numéro d’urgence européen gratuit et accessible partout depuis un mobile ?",
            "options": [
              "15",
              "18",
              "112",
              "911"
            ],
            "correctOptionIndex": 2,
            "explanation": "Le 112 est le numéro d’appel d’urgence universel dans toute l’Union européenne."
          },
          {
            "_id": "q-lec-12-2-2",
            "questionText": "Quel numéro direct compose-t-on pour joindre le SAMU (urgences médicales) en France ?",
            "options": [
              "15",
              "17",
              "18",
              "114"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le 15 relie directement au médecin régulateur du SAMU."
          },
          {
            "_id": "q-lec-12-2-3",
            "questionText": "Quel numéro d’urgence par SMS/écrit est réservé aux personnes sourdes ou malentendantes ?",
            "options": [
              "112",
              "114",
              "118",
              "15"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le 114 permet d’envoyer une alerte par SMS avec géolocalisation."
          },
          {
            "_id": "q-lec-12-2-4",
            "questionText": "Quelles informations indispensables devez-vous fournir aux secours lors de l’appel ?",
            "options": [
              "Votre avis politique",
              "Lieu précis de l’accident, nombre et état apparent des victimes, types de véhicules impliqués, risques particuliers (incendie, matières dangereuses)",
              "Le prix de la voiture",
              "Votre profession"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un message d’alerte clair et précis conditionne l’envoi des moyens de secours adaptés."
          },
          {
            "_id": "q-lec-12-2-5",
            "questionText": "Quand devez-vous raccrocher lors d’un appel d’urgence ?",
            "options": [
              "Dès que vous avez fini de parler",
              "Uniquement quand l’opérateur des secours vous dit expressément de raccrocher",
              "Au bout de 30 secondes",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’opérateur doit valider que toutes les informations nécessaires ont été transmises."
          }
        ]
      },
      {
        "_id": "lec-12-3",
        "_type": "lecon",
        "title": "Leçon 12.3 — Gestes de premiers secours de base",
        "ordre": 3,
        "description": "Vérification de la conscience et de la respiration, PLS, massage cardiaque, défibrillateur et non-déplacement d’un blessé sauf danger immédiat.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-3-1",
            "questionText": "Doit-on déplacer ou extraire une victime blessée de son véhicule ?",
            "options": [
              "Oui pour aller plus vite",
              "Non, JAMAIS, sauf en cas de DANGER IMMÉDIAT ET NON CONTRÔLABLE (véhicule en feu, noyade)",
              "Oui pour la poser sur le trottoir",
              "Toujours immédiatement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout déplacement risque d’aggraver des lésions de la colonne vertébrale."
          },
          {
            "_id": "q-lec-12-3-2",
            "questionText": "Si une victime est INCONSCIENTE mais RESPIRE normalement, quelle position adopter ?",
            "options": [
              "La mettre assise",
              "La placer en Position Latérale de Sécurité (PLS) pour libérer les voies aériennes et éviter l’étouffement",
              "La laisser sur le dos",
              "La mettre sur le ventre"
            ],
            "correctOptionIndex": 1,
            "explanation": "La PLS empêche l’étouffement par la langue ou des vomissements."
          },
          {
            "_id": "q-lec-12-3-3",
            "questionText": "Si la victime est inconsciente et NE RESPIRE PLUS, que faire immédiatement ?",
            "options": [
              "Attendre les secours sans rien faire",
              "Alerter le 15/112 et débuter immédiatement un massage cardiaque (30 compressions / 2 insufflations) avec DAE",
              "Lui donner à boire de l’eau",
              "Lui donner des gifles"
            ],
            "correctOptionIndex": 1,
            "explanation": "La réanimation cardio-pulmonaire immédiate maintient l’oxygénation du cerveau."
          },
          {
            "_id": "q-lec-12-3-4",
            "questionText": "Un Défibrillateur Automatisé Externe (DAE) peut-il être utilisé par une personne non médecin ?",
            "options": [
              "Non, réservé aux chirurgiens",
              "Oui, par TOUTE personne : l’appareil guide vocalement chaque étape et délivre le choc en autonomie si nécessaire",
              "Uniquement avec un diplôme d’État",
              "Interdit en public"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le DAE est conçu pour être utilisé par n’importe quel témoin en toute sécurité."
          },
          {
            "_id": "q-lec-12-3-5",
            "questionText": "Doit-on donner à boire ou à manger à une victime blessée d’accident de la route ?",
            "options": [
              "Oui, du soda",
              "Non, JAMAIS (risque d’étouffement et complication lors d’une anesthésie d’urgence)",
              "Oui, du café chaud",
              "Un verre d’eau sucrée"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ne jamais rien administrer par voie orale à un blessé."
          }
        ]
      },
      {
        "_id": "lec-12-4",
        "_type": "lecon",
        "title": "Leçon 12.4 — Que faire en cas d’accident matériel ou corporel",
        "ordre": 4,
        "description": "Constat amiable, échange d’informations, absence de délit de fuite et priorité au triptyque protéger-alerter-secourir s’il y a des victimes.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-4-1",
            "questionText": "Quitter les lieux d’un accident sans s’arrêter ni communiquer son identité constitue :",
            "options": [
              "Une simple incivilité",
              "Le DÉLIT DE FUITE, puni de 3 ans de prison, 75 000 € d’amende et retrait de 6 points",
              "Une contravention à 35 €",
              "Aucune faute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le délit de fuite est un crime lourdement réprimé par le code pénal."
          },
          {
            "_id": "q-lec-12-4-2",
            "questionText": "Le constat amiable automobile européen est :",
            "options": [
              "Un document de culpabilité pénale",
              "Un document amiable descriptif et contradictoire des faits servant aux assurances",
              "Un document facultatif sans valeur",
              "Un jugement de tribunal"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le constat retrace les circonstances matérielles pour la prise en charge assurantielle."
          },
          {
            "_id": "q-lec-12-4-3",
            "questionText": "Une fois le constat amiable signé par les deux conducteurs, peut-on modifier le recto ?",
            "options": [
              "Oui chez soi au stylo",
              "Non, aucune modification unilatérale n’est admise après signature",
              "Oui le lendemain",
              "Oui si on n’est plus d’accord"
            ],
            "correctOptionIndex": 1,
            "explanation": "La signature fige les déclarations communes de la face avant."
          },
          {
            "_id": "q-lec-12-4-4",
            "questionText": "En cas de désaccord avec l’autre conducteur sur les cases cochées du constat :",
            "options": [
              "On se bat",
              "On ne signe pas le constat ou on consigne expressément ses réserves dans la case « Mes observations »",
              "On déchire tout",
              "On accepte sans rien dire"
            ],
            "correctOptionIndex": 1,
            "explanation": "La case observations permet d’exprimer clairement son désaccord avant envoi."
          },
          {
            "_id": "q-lec-12-4-5",
            "questionText": "Dans quel délai légal doit-on envoyer le constat amiable à son assureur ?",
            "options": [
              "Dans les 24 heures",
              "Dans les 5 jours ouvrés suivant l’accident",
              "Dans le mois",
              "Aucun délai"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le délai réglementaire de déclaration de sinistre est de 5 jours ouvrés."
          }
        ]
      },
      {
        "_id": "lec-12-5",
        "_type": "lecon",
        "title": "Leçon 12.5 — Prévenir les sur-accidents",
        "ordre": 5,
        "description": "Feux de détresse, gilet, triangle lorsque cela est sans danger, protection des occupants et mise à l’abri.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-5-1",
            "questionText": "Qu’est-ce qu’un « sur-accident » ?",
            "options": [
              "Un accident avec deux vélos",
              "Un second accident provoqué par la collision de nouveaux véhicules avec les véhicules déjà accidentés ou les secours",
              "Un accident sans gravité",
              "Un accrochage de parking"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sur-accident est souvent bien plus meurtrier que l’accident initial."
          },
          {
            "_id": "q-lec-12-5-2",
            "questionText": "À quelle distance minimale doit-on placer le triangle de présignalisation sur route hors autoroute ?",
            "options": [
              "À 5 mètres",
              "À au moins 30 mètres en amont de l’accident (ou avant le virage/sommet de côte)",
              "À 1 kilomètre",
              "Sur le pare-brise"
            ],
            "correctOptionIndex": 1,
            "explanation": "30 mètres permet aux usagers qui arrivent d’avoir le temps de ralentir."
          },
          {
            "_id": "q-lec-12-5-3",
            "questionText": "La nuit sur route non éclairée, comment rendre le lieu d’accident visible ?",
            "options": [
              "Allumer les feux des véhicules en sécurité, utiliser des lampes torches et porter des gilets fluo",
              "Éteindre toutes les lumières",
              "Faire un feu de camp",
              "Klaxonner en continu"
            ],
            "correctOptionIndex": 0,
            "explanation": "La visibilité lumineuse est le premier rempart contre le sur-accident nocturne."
          },
          {
            "_id": "q-lec-12-5-4",
            "questionText": "Les passagers d’un véhicule immobilisé sur une route dangereuse doivent :",
            "options": [
              "Rester assis au chaud",
              "Sortir du côté opposé à la circulation et se mettre en sécurité sur le bas-côté dégagé",
              "Marcher sur la route",
              "Pousser la voiture immédiatement"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’évacuation côté droit protège les personnes des véhicules en approche."
          },
          {
            "_id": "q-lec-12-5-5",
            "questionText": "En présence de câbles électriques tombés sur la voiture accidentée :",
            "options": [
              "Faire sortir tout le monde en marchant",
              "Interdire à quiconque de toucher la carrosserie ou de sortir en attendant les secours qualifiés (risque d’électrocution)",
              "Couper les câbles à la main",
              "Verser de l’eau"
            ],
            "correctOptionIndex": 1,
            "explanation": "La carrosserie peut être sous tension électrique mortelle : il ne faut pas poser le pied à terre."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-13",
    "_type": "moduleFormation",
    "code": "MOD-013",
    "title": "Module 13 — Documents, assurance et responsabilité",
    "summary": "Documents de bord obligatoires, permis à points et période probatoire, infractions, délits, assurances et responsabilités civile/pénale.",
    "learningObjectives": [
      "Connaître tous les documents obligatoires à présenter lors d'un contrôle routier",
      "Comprendre le fonctionnement du capital de points et de la période probatoire",
      "Distinguer contraventions et délits routiers ainsi que leurs sanctions",
      "Maîtriser les garanties d'assurance automobile (Tiers, Tous risques) et les responsabilités"
    ],
    "ordre": 13,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-13-1",
        "_type": "lecon",
        "title": "Leçon 13.1 — Documents obligatoires à bord",
        "ordre": 1,
        "description": "Permis, certificat d’immatriculation, assurance et contrôle technique pour les véhicules concernés.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-1-1",
            "questionText": "Quels documents originaux et valides devez-vous être en mesure de présenter lors d’un contrôle routier ?",
            "options": [
              "Permis de conduire, certificat d’immatriculation (carte grise) et attestation d’assurance valide",
              "Le livret de famille",
              "Le contrat de travail",
              "La facture d’achat du véhicule"
            ],
            "correctOptionIndex": 0,
            "explanation": "Ces 3 pièces justificatives sont strictement obligatoires pour circuler."
          },
          {
            "_id": "q-lec-13-1-2",
            "questionText": "La vignette de contrôle technique sur le pare-brise prouve-t-elle à elle seule la validité du contrôle ?",
            "options": [
              "Oui",
              "Non, c’est le timbre collé sur le certificat d’immatriculation et le procès-verbal qui font foi juridiquement",
              "Oui pour les policiers",
              "Ce n’est pas obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le timbre sur la carte grise et le PV constituent la preuve légale officielle."
          },
          {
            "_id": "q-lec-13-1-3",
            "questionText": "En cas de non-présentation immédiate des papiers lors d’un contrôle, dans quel délai devez-vous les présenter au commissariat ?",
            "options": [
              "Dans les 24 heures",
              "Dans les 5 jours",
              "Dans le mois",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "Vous disposez d’un délai de 5 jours sous peine d’amende forfaitaire aggravée."
          },
          {
            "_id": "q-lec-13-1-4",
            "questionText": "Le certificat d’immatriculation (carte grise) doit être mis à jour à votre nouvelle adresse dans un délai de :",
            "options": [
              "1 semaine",
              "1 mois",
              "6 mois",
              "1 an"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout changement de domicile doit être déclaré sous 30 jours sur le site officiel."
          },
          {
            "_id": "q-lec-13-1-5",
            "questionText": "Circuler à bord d’un véhicule sans contrôle technique valide est passible de :",
            "options": [
              "Une amende de 135 € et immobilisation du véhicule",
              "Une simple lettre",
              "Prison ferme",
              "Rien"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le défaut de contrôle technique entraîne 135 € d’amende et la saisie de la carte grise."
          }
        ]
      },
      {
        "_id": "lec-13-2",
        "_type": "lecon",
        "title": "Leçon 13.2 — Le permis à points",
        "ordre": 2,
        "description": "Capital initial en période probatoire, retraits, récupération de points, invalidation à zéro point et stages de sensibilisation.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-2-1",
            "questionText": "Quel est le capital initial de points sur un permis probatoire (formation traditionnelle) ?",
            "options": [
              "6 points (avec gain de 2 points par an sans infraction pendant 3 ans)",
              "12 points direct",
              "8 points",
              "10 points"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le permis débute à 6 points et atteint 12 points au bout de 3 ans sans infraction (2 ans en conduite accompagnée)."
          },
          {
            "_id": "q-lec-13-2-2",
            "questionText": "En conduite accompagnée (AAC), en combien d’années sans infraction atteint-on les 12 points ?",
            "options": [
              "1 an",
              "2 ans (gain de 3 points par an)",
              "3 ans",
              "4 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’AAC permet de capitaliser 3 points par an et d’obtenir 12 points en 2 ans."
          },
          {
            "_id": "q-lec-13-2-3",
            "questionText": "Combien de points maximum peut-on perdre lors d’une seule infraction ?",
            "options": [
              "3 points",
              "6 points (ex: alcool, stupéfiants, refus de priorité piéton)",
              "8 points",
              "12 points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une infraction unique ne peut retirer plus de 6 points au maximum."
          },
          {
            "_id": "q-lec-13-2-4",
            "questionText": "En cas d’infractions simultanées commises en même temps, le cumul maximal de retrait est de :",
            "options": [
              "6 points",
              "8 points au maximum",
              "10 points",
              "12 points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cumul de retraits de points lors d’un même contrôle est plafonné à 8 points."
          },
          {
            "_id": "q-lec-13-2-5",
            "questionText": "Combien de points permet de récupérer un stage de sensibilisation à la sécurité routière ?",
            "options": [
              "2 points",
              "4 points (au maximum dans la limite de 12 points, 1 fois par an)",
              "6 points",
              "Tous les points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le stage de 2 jours permet de récupérer jusqu’à 4 points, une fois tous les ans."
          }
        ]
      },
      {
        "_id": "lec-13-3",
        "_type": "lecon",
        "title": "Leçon 13.3 — Infractions et sanctions",
        "ordre": 3,
        "description": "Contraventions, délits, amendes, suspension ou annulation de permis et gravité du délit de fuite.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-3-1",
            "questionText": "En droit routier français, quelles sont les deux grandes catégories d’infractions ?",
            "options": [
              "Les petites et les grandes fautes",
              "Les contraventions (classes 1 à 5) et les délits (jugés au tribunal correctionnel)",
              "Les fautes de jour et de nuit",
              "Les fautes de vitesse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les contraventions sont punies d’amendes forfaitaires, les délits de peines de prison et de tribunal."
          },
          {
            "_id": "q-lec-13-3-2",
            "questionText": "Conduire sans être titulaire du permis de conduire constitue :",
            "options": [
              "Une contravention",
              "Un DÉLIT puni de 1 an de prison, 15 000 € d’amende et confiscation du véhicule",
              "Une erreur tolérée",
              "Une amende de 35 €"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sans permis est un délit pénal lourd."
          },
          {
            "_id": "q-lec-13-3-3",
            "questionText": "Que risque un jeune conducteur qui perd 3 points ou plus en période probatoire lors d’une infraction ?",
            "options": [
              "Rien",
              "L’obligation d’effectuer un stage de sensibilisation dans les 4 mois (lettre 48N)",
              "La perte définitive du permis",
              "Une amende de 10 000 €"
            ],
            "correctOptionIndex": 1,
            "explanation": "La lettre 48N rend le stage obligatoire avec remboursement de l’amende."
          },
          {
            "_id": "q-lec-13-3-4",
            "questionText": "Lorsque le solde de points tombe à ZÉRO (lettre 48SI), le permis est :",
            "options": [
              "Suspendu 1 mois",
              "Invalidé pour solde nul : interdiction de conduire pendant 6 mois et obligation de repasser les épreuves",
              "Rechargé automatiquement",
              "Remplacé"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’invalidation 48SI oblige à restituer le permis en préfecture."
          },
          {
            "_id": "q-lec-13-3-5",
            "questionText": "Un grand excès de vitesse égal ou supérieur à 50 km/h au-dessus de la limite entraîne :",
            "options": [
              "Une amende simple",
              "Retrait de 6 points, rétention immédiate du permis, saisie du véhicule et suspension",
              "1 point en moins",
              "Rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est une infraction majeure de 5ème classe traitée avec sévérité judiciaire."
          }
        ]
      },
      {
        "_id": "lec-13-4",
        "_type": "lecon",
        "title": "Leçon 13.4 — Assurance automobile",
        "ordre": 4,
        "description": "Assurance obligatoire au tiers, garanties, assurance tous risques, franchise et déclaration d’un sinistre.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-4-1",
            "questionText": "Quelle est la seule garantie d’assurance légalement OBLIGATOIRE pour faire circuler un véhicule à moteur ?",
            "options": [
              "L’assurance Tous Risques",
              "L’assurance Responsabilité Civile (appelée assurance « au Tiers »)",
              "L’assurance vol et incendie",
              "L’assurance bris de glace"
            ],
            "correctOptionIndex": 1,
            "explanation": "La garantie responsabilité civile au tiers est le minimum obligatoire légal."
          },
          {
            "_id": "q-lec-13-4-2",
            "questionText": "Que couvre l’assurance Responsabilité Civile (au Tiers) ?",
            "options": [
              "Vos propres blessures et les dégâts sur votre voiture",
              "Les dommages matériels et corporels causés aux AUTRES personnes (passagers, piétons, autres véhicules)",
              "La panne moteur",
              "Le carburant"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’assurance au tiers indemnise exclusivement les victimes et tiers lésés par votre véhicule."
          },
          {
            "_id": "q-lec-13-4-3",
            "questionText": "Circuler sans aucune assurance automobile (défaut d’assurance) est :",
            "options": [
              "Toléré le week-end",
              "Un délit puni de 3 750 € d’amende, suspension/annulation de permis et confiscation du véhicule",
              "Une amende de 11 €",
              "Autorisé sur autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le défaut d’assurance est un délit grave. En cas d’accident, le conducteur responsable paie toute sa vie."
          },
          {
            "_id": "q-lec-13-4-4",
            "questionText": "Qu’est-ce que la « franchise » dans un contrat d’assurance auto ?",
            "options": [
              "Un bonus financier",
              "La somme restant obligatoirement à la charge de l’assuré lors du règlement d’un sinistre",
              "Le prix du contrôle technique",
              "Une taxe d’État"
            ],
            "correctOptionIndex": 1,
            "explanation": "La franchise est le montant non remboursé par l’assureur en cas de dommage."
          },
          {
            "_id": "q-lec-13-4-5",
            "questionText": "Comment évolue le coefficient de Bonus-Malus après une année complète sans accident responsable ?",
            "options": [
              "Il augmente de 25%",
              "Il est réduit de 5% (multiplié par 0,95)",
              "Il reste à 1",
              "Il double"
            ],
            "correctOptionIndex": 1,
            "explanation": "Chaque année sans sinistre responsable réduit la prime de 5% (coefficient x 0,95)."
          }
        ]
      },
      {
        "_id": "lec-13-5",
        "_type": "lecon",
        "title": "Leçon 13.5 — Responsabilité civile et pénale du conducteur",
        "ordre": 5,
        "description": "Indemnisation des dommages causés à autrui, sanctions pénales et responsabilité du conducteur en cas d’accident.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-5-1",
            "questionText": "Quelle est la différence entre responsabilité civile et responsabilité pénale ?",
            "options": [
              "Aucune",
              "La responsabilité civile répare et indemnise les dommages financiers causés aux victimes ; la responsabilité pénale punit les infractions devant la société (amende, prison)",
              "La pénale est pour les vélos",
              "La civile est pour les assurances privées"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le volet civil indemnise les préjudices, le volet pénal sanctionne la faute légale."
          },
          {
            "_id": "q-lec-13-5-2",
            "questionText": "L’assurance peut-elle se retourner contre le conducteur responsable d’un accident sous alcool ou stupéfiants ?",
            "options": [
              "Non jamais",
              "Oui, l’assureur peut résilier le contrat et exiger le remboursement total des sommes versées aux victimes (déchéance de garantie)",
              "L’assureur paie tout sans rien dire",
              "Uniquement pour les moins de 18 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sous emprise toxique entraîne la déchéance des garanties facultatives."
          },
          {
            "_id": "q-lec-13-5-3",
            "questionText": "Le propriétaire de la carte grise peut-il être tenu pécuniairement responsable d’un excès de vitesse commis avec son véhicule s’il ne dénonce pas le conducteur ?",
            "options": [
              "Non",
              "Oui, il est redevable de l’amende pécuniaire sauf s’il prouve le vol ou désigne l’auteur de l’infraction",
              "Uniquement s’il était passager",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le titulaire de la carte grise est présumé responsable du paiement des amendes radars."
          },
          {
            "_id": "q-lec-13-5-4",
            "questionText": "Causer involontairement la mort d’un usager de la route lors d’un accident avec circonstances aggravantes (alcool + vitesse) constitue :",
            "options": [
              "Un simple accident matériel",
              "Un homicide involontaire aggravé puni de jusqu’à 10 ans de prison et 150 000 € d’amende",
              "Une amende de classe 4",
              "Une faute civile sans prison"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est un délit criminellement grave jugé avec sévérité par les tribunaux."
          },
          {
            "_id": "q-lec-13-5-5",
            "questionText": "Peut-on assurer un véhicule au nom d’un tiers pour payer moins cher tout en étant le conducteur principal réel ?",
            "options": [
              "Oui c’est légal",
              "Non, c’est une fausse déclaration intentionnelle pouvant entraîner la nullité totale du contrat d’assurance",
              "Oui sur internet",
              "Oui en famille"
            ],
            "correctOptionIndex": 1,
            "explanation": "La fausse déclaration intentionnelle annule le contrat et supprime toute couverture en cas d’accident."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-14",
    "_type": "moduleFormation",
    "code": "MOD-014",
    "title": "Module 14 — Écoconduite et entretien",
    "summary": "Principes de l'écoconduite, gestion du régime moteur, pression des pneus, niveaux d'huile et liquide, vérifications de sécurité et mobilité verte.",
    "learningObjectives": [
      "Appliquer les principes d'une conduite souple, économique et écologique",
      "Optimiser les passages de vitesses et utiliser le frein moteur pour réduire la consommation",
      "Effectuer les contrôles réguliers de pression des pneus et niveaux sous le capot",
      "Préparer un long trajet en sécurité et limiter l'empreinte environnementale"
    ],
    "ordre": 14,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-14-1",
        "_type": "lecon",
        "title": "Leçon 14.1 — Principes de l’écoconduite",
        "ordre": 1,
        "description": "Anticipation, conduite souple, régime moteur adapté, réduction de la consommation et des émissions.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-1-1",
            "questionText": "Quel gain moyen de consommation de carburant permet une écoconduite bien appliquée ?",
            "options": [
              "Moins de 1%",
              "Entre 15% et 25% d’économie de carburant",
              "Aucune économie",
              "50%"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’écoconduite fait économiser jusqu’à 20 à 25% de carburant et réduit d’autant les émissions de CO2."
          },
          {
            "_id": "q-lec-14-1-2",
            "questionText": "Sur une voiture à essence, à quel régime moteur est-il recommandé de passer le rapport supérieur en écoconduite ?",
            "options": [
              "À 5000 tr/min",
              "Vers 2000 à 2500 tr/min maximum",
              "À 1000 tr/min",
              "En zone rouge"
            ],
            "correctOptionIndex": 1,
            "explanation": "Passer les rapports tôt (vers 2000 tr/min sur diesel, 2500 tr/min sur essence) évite le surrégime énergivore."
          },
          {
            "_id": "q-lec-14-1-3",
            "questionText": "Quelle est la règle d’or de l’écoconduite pour limiter les freinages et accélérations brusques ?",
            "options": [
              "Rouler vite",
              "L’anticipation du trafic et la fluidité des trajectoires en maintenant une bonne distance",
              "Accélérer fort puis piler",
              "Rouler au point mort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Anticiper les feux et ralentissements permet de laisser rouler le véhicule sur son élan."
          },
          {
            "_id": "q-lec-14-1-4",
            "questionText": "Lorsque vous relâchez totalement l’accélérateur avec une vitesse enclenchée (frein moteur), la consommation instantanée est de :",
            "options": [
              "10 litres/100 km",
              "0,0 litre/100 km (coupure totale d’injection)",
              "5 litres/100 km",
              "Maximale"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les moteurs modernes coupent totalement l’injection de carburant en décélération."
          },
          {
            "_id": "q-lec-14-1-5",
            "questionText": "Est-il conseillé de rouler au point mort (roue libre) pour économiser du carburant ?",
            "options": [
              "Oui c’est très efficace",
              "Non, c’est dangereux (perte de frein moteur et de contrôle) et cela consomme du carburant au ralenti",
              "Oui en descente",
              "Oui sur autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Au point mort, le moteur consomme du carburant pour maintenir le ralenti et on perd le frein moteur."
          }
        ]
      },
      {
        "_id": "lec-14-2",
        "_type": "lecon",
        "title": "Leçon 14.2 — Pression des pneus et entretien courant",
        "ordre": 2,
        "description": "Pression des pneus, niveaux d’huile et de refroidissement, usure des plaquettes et entretien préventif.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-2-1",
            "questionText": "À quelle fréquence doit-on vérifier la pression de ses pneumatiques ?",
            "options": [
              "Tous les ans",
              "Au moins une fois par mois et avant chaque long trajet, de préférence à froid",
              "Tous les 5 ans",
              "Uniquement au contrôle technique"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un contrôle mensuel des pressions prévient l’usure prématurée et l’éclatement."
          },
          {
            "_id": "q-lec-14-2-2",
            "questionText": "Quelles sont les conséquences directes d’un sous-gonflage des pneumatiques ?",
            "options": [
              "Une meilleure vitesse",
              "Surconsommation de carburant, échauffement excessif, risque d’éclatement et dégradation de la tenue de route",
              "Aucune conséquence",
              "Moins d’usure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un pneu sous-gonflé augmente la résistance au roulement et peut éclater sous l’effet de la chaleur."
          },
          {
            "_id": "q-lec-14-2-3",
            "questionText": "Où trouve-t-on les valeurs de pression préconisées par le constructeur pour son véhicule ?",
            "options": [
              "Sur le permis",
              "Sur l’étiquette collée dans la portière conducteur, dans la trappe à carburant ou le livret de bord",
              "Sur le tableau de bord",
              "Sur le pare-brise"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les pressions exactes sont indiquées sur la tranche de la portière ou dans la trappe à essence."
          },
          {
            "_id": "q-lec-14-2-4",
            "questionText": "Le niveau du liquide de frein doit se situer :",
            "options": [
              "En dessous du minimum",
              "Entre les repères MIN et MAX du bocal transparent",
              "Au-dessus du bouchon",
              "Bocal vide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau doit impérativement rester entre les repères MIN et MAX."
          },
          {
            "_id": "q-lec-14-2-5",
            "questionText": "Si le liquide de refroidissement est au niveau MIN, quel liquide ajouter moteur FROID ?",
            "options": [
              "De l’huile moteur",
              "Du liquide de refroidissement spécifique préconisé",
              "De l’eau savonneuse",
              "Du liquide de frein"
            ],
            "correctOptionIndex": 1,
            "explanation": "On complète avec du liquide de refroidissement adapté en veillant à ne jamais ouvrir le bocal à chaud."
          }
        ]
      },
      {
        "_id": "lec-14-3",
        "_type": "lecon",
        "title": "Leçon 14.3 — Vérifications avant un long trajet",
        "ordre": 3,
        "description": "Contrôle de l’état des pneus, des feux, des niveaux, des documents et du chargement avant un trajet important.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-3-1",
            "questionText": "Comment charger un coffre volumineux avant de partir en vacances ?",
            "options": [
              "Mettre les objets les plus lourds au fond du coffre contre les dossiers de sièges",
              "Poser les objets lourds sur la plage arrière",
              "Tout mettre sur le toit",
              "Sur le capot"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les charges lourdes au plancher abaissent le centre de gravité et ne risquent pas de voler vers l’avant."
          },
          {
            "_id": "q-lec-14-3-2",
            "questionText": "Des objets lourds posés librement sur la plage arrière représentent en cas de choc à 50 km/h :",
            "options": [
              "Aucun danger",
              "Des projectiles mortels capables de tuer les passagers avant lors d’une décélération brutale",
              "Un coussin de protection",
              "Une décoration"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un objet de quelques kilos devient une masse de plusieurs dizaines de kilos sous l’impact."
          },
          {
            "_id": "q-lec-14-3-3",
            "questionText": "Si vous transportez un coffre de toit ou des barres de toit chargées :",
            "options": [
              "La consommation diminue",
              "La consommation augmente de 10 à 20% à cause de la résistance aérodynamique",
              "La vitesse maximale est augmentée",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "La prise au vent augmente la traînée aérodynamique et la facture de carburant."
          },
          {
            "_id": "q-lec-14-3-4",
            "questionText": "Avant de partir chargé, devez-vous ajuster la hauteur des faisceaux de phares ?",
            "options": [
              "Non jamais",
              "Oui, baisser les phares avec la molette de réglage pour éviter d’éblouir à cause de l’affaissement de l’arrière",
              "Allumer les antibrouillards",
              "Mettre en feux de route"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le poids sur l’essieu arrière lève le nez de la voiture et fait pointer les phares vers le haut."
          },
          {
            "_id": "q-lec-14-3-5",
            "questionText": "Quelle est la vérification essentielle à faire sur les essuie-glaces avant un long voyage ?",
            "options": [
              "Vérifier l’absence de craquelures sur les balais et le niveau du réservoir de lave-glace",
              "Les peindre en noir",
              "Les démonter",
              "Les couper"
            ],
            "correctOptionIndex": 0,
            "explanation": "Des balais propres et un liquide lave-glace plein assurent une visibilité irréprochable."
          }
        ]
      },
      {
        "_id": "lec-14-4",
        "_type": "lecon",
        "title": "Leçon 14.4 — Pollution et mobilité responsable",
        "ordre": 4,
        "description": "Réduction des émissions, choix de mobilité, optimisation des déplacements et entretien du véhicule.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-4-1",
            "questionText": "Que certifie la vignette environnementale Crit’Air apposée sur le pare-brise ?",
            "options": [
              "Le paiement des taxes",
              "La classe environnementale du véhicule selon son niveau d’émission de polluants et son carburant",
              "L’assurance tous risques",
              "Le permis du conducteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vignette Crit’Air détermine les autorisations de circuler dans les Zones à Faibles Émissions (ZFE)."
          },
          {
            "_id": "q-lec-14-4-2",
            "questionText": "Lors d’un pic de pollution de l’air en ville, quelle mesure de conduite est souvent imposée ?",
            "options": [
              "Rouler en feux de route",
              "Abaissement de 20 km/h de la vitesse maximale autorisée et circulation différenciée",
              "Interdiction de freiner",
              "Augmentation de la vitesse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Réduire la vitesse de 20 km/h diminue directement les émissions de particules fines et d’oxydes d’azote."
          },
          {
            "_id": "q-lec-14-4-3",
            "questionText": "L’utilisation de la climatisation en continu dans l’habitacle entraîne :",
            "options": [
              "Une baisse de la consommation",
              "Une surconsommation de carburant pouvant atteindre 10 à 15% et des rejets supplémentaires",
              "Une panne de frein",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le compresseur de climatisation demande de l’énergie au moteur et augmente la consommation."
          },
          {
            "_id": "q-lec-14-4-4",
            "questionText": "Pour les trajets très courts du quotidien (moins de 2 km), quelle est l’alternative la plus responsable ?",
            "options": [
              "Prendre son gros 4x4",
              "Privilégier la marche à pied, le vélo ou les transports en commun",
              "Rouler moteur froid à fond",
              "Laisser tourner le moteur 10 min"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est sur les premiers kilomètres que le moteur froid pollue et consomme le plus."
          },
          {
            "_id": "q-lec-14-4-5",
            "questionText": "Le covoiturage régulier permet de :",
            "options": [
              "Multiplier les bouchons",
              "Diviser les frais de carburant, réduire le nombre de véhicules sur la route et diminuer la pollution globale",
              "Perdre des points",
              "Augmenter le risque de panne"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le partage des trajets allège le trafic et les émissions de gaz à effet de serre."
          }
        ]
      },
      {
        "_id": "lec-14-5",
        "_type": "lecon",
        "title": "Leçon 14.5 — Conduite économique en pratique",
        "ordre": 5,
        "description": "Accélération progressive, anticipation, frein moteur, limitation de la climatisation excessive et réduction des consommations inutiles.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-5-1",
            "questionText": "Pour démarrer et accélérer de façon éco-responsable, on doit :",
            "options": [
              "Faire crisser les pneus",
              "Monter doucement dans les tours et passer rapidement les rapports supérieurs sans pousser les régimes",
              "Rester en 1ère jusqu’à 50 km/h",
              "Accélérer à fond"
            ],
            "correctOptionIndex": 1,
            "explanation": "La montée en vitesse souple et le passage précoce des rapports sont au cœur de l’écoconduite."
          },
          {
            "_id": "q-lec-14-5-2",
            "questionText": "À l’arrêt prolongé (plus d’une minute à un passage à niveau ou dans un embouteillage statique) :",
            "options": [
              "Laisser tourner le moteur",
              "Couper le moteur manuellement ou laisser agir le système Start & Stop",
              "Donner des coups d’accélérateur",
              "Allumer la clim"
            ],
            "correctOptionIndex": 1,
            "explanation": "Couper le moteur dès 30 secondes d’arrêt élimine toute consommation et pollution inutile."
          },
          {
            "_id": "q-lec-14-5-3",
            "questionText": "Quelle est la conséquence de rouler vitres ouvertes à 130 km/h sur autoroute ?",
            "options": [
              "Aucun effet",
              "Forte surconsommation due à la dégradation aérodynamique par turbulence d’air",
              "Économie de carburant",
              "Refroidissement des pneus"
            ],
            "correctOptionIndex": 1,
            "explanation": "À vitesse élevée, l’aérodynamisme prime : les vitres ouvertes freinent le véhicule."
          },
          {
            "_id": "q-lec-14-5-4",
            "questionText": "L’utilisation du régulateur de vitesse sur autoroute par temps sec permet :",
            "options": [
              "De s’endormir",
              "De stabiliser sa vitesse et d’optimiser la consommation de carburant sur le plat",
              "De doubler par la droite",
              "De couper les freins"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une vitesse stable sans à-coups limite les surconsommations sur les longs trajets."
          },
          {
            "_id": "q-lec-14-5-5",
            "questionText": "Démonter les barres de toit ou porte-vélos lorsqu’on ne s’en sert pas :",
            "options": [
              "Est inutile",
              "Permet de supprimer la résistance à l’air inutile et d’économiser du carburant",
              "Est interdit",
              "Abîme le toit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Retirer les accessoires inutiles rétablit le profil aérodynamique d’origine du véhicule."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-15",
    "_type": "moduleFormation",
    "code": "MOD-015",
    "title": "Module 15 — Révisions et examens blancs",
    "summary": "Synthèse générale et examens blancs type ETG (Épreuve Théorique Générale) couvrant les 10 thèmes du Code de la Route.",
    "learningObjectives": [
      "Réviser l'ensemble des panneaux de danger, interdiction, obligation et indication",
      "Valider les priorités aux intersections et les règles de circulation complexes",
      "Maîtriser tous les calculs de distances d'arrêt, de freinage et de sécurité",
      "Réussir l'examen blanc final type ETG officiel de 40 questions avec un score supérieur à 35/40"
    ],
    "ordre": 15,
    "typePermis": "B",
    "programmePermis": {
      "_type": "reference",
      "_ref": "prog-permis-b"
    },
    "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
    "durationSeconds": 720,
    "tempsMinimumVisionnage": 576,
    "scoreMinimumQuiz": 80,
    "isActive": true,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "lecons": [
      {
        "_id": "lec-15-1",
        "_type": "lecon",
        "title": "Leçon 15.1 — Révision générale des panneaux",
        "ordre": 1,
        "description": "Révision des panneaux de danger, d’interdiction, d’obligation, d’indication, de direction et de priorité.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-1-1",
            "questionText": "Quelle est la signification d’un panneau triangulaire inversé pointant vers le bas ?",
            "options": [
              "Danger virage",
              "Cédez le passage à l’intersection",
              "Arrêt absolu",
              "Sens unique"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le triangle inversé est le signal universel du Cédez le passage."
          },
          {
            "_id": "q-lec-15-1-2",
            "questionText": "Un panneau carré bleu avec un pictogramme blanc d’autoroute annonce :",
            "options": [
              "Une piste cyclable",
              "L’entrée sur une section d’autoroute avec application des règles autoroutières",
              "La sortie d’autoroute",
              "Un péage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il marque le début de l’autoroute où les piétons, vélos et engins lents sont interdits."
          },
          {
            "_id": "q-lec-15-1-3",
            "questionText": "Que signifie un panneau rond blanc cerclé de rouge totalement vierge à l’intérieur ?",
            "options": [
              "Sens interdit",
              "Circulation interdite à tout véhicule dans les deux sens",
              "Stationnement interdit",
              "Fin d’interdiction"
            ],
            "correctOptionIndex": 1,
            "explanation": "C’est le signal d’accès interdit à tout véhicule dans les deux sens de circulation."
          },
          {
            "_id": "q-lec-15-1-4",
            "questionText": "Que signifie un panneau rond rouge avec une barre blanche horizontale ?",
            "options": [
              "Cédez le passage",
              "Sens interdit (interdiction de pénétrer dans ce sens)",
              "Route barrée",
              "Douane"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sens interdit prohibe l’entrée dans cette direction."
          },
          {
            "_id": "q-lec-15-1-5",
            "questionText": "Un panneau octogonal rouge portant le mot STOP impose :",
            "options": [
              "Un ralentissement",
              "Un temps d’arrêt complet et marqué des roues au niveau de la ligne continue",
              "De klaxonner",
              "De faire demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le Stop impose l’arrêt absolu inconditionnel."
          }
        ]
      },
      {
        "_id": "lec-15-2",
        "_type": "lecon",
        "title": "Leçon 15.2 — Révision générale des priorités et intersections",
        "ordre": 2,
        "description": "Priorité à droite, Stop, Cédez-le-passage, giratoires, feux et passages à niveau.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-2-1",
            "questionText": "En l’absence de tout panneau à un carrefour, qui passe en premier ?",
            "options": [
              "Le véhicule venant de gauche",
              "Le véhicule venant de droite (priorité à droite)",
              "Le plus rapide",
              "Le véhicule le plus lourd"
            ],
            "correctOptionIndex": 1,
            "explanation": "La règle par défaut est la priorité à droite."
          },
          {
            "_id": "q-lec-15-2-2",
            "questionText": "Au feu vert, je souhaite tourner à gauche. Qui est prioritaire ?",
            "options": [
              "Moi seul",
              "Les véhicules arrivant en face qui vont tout droit ou tournent à droite",
              "Les voitures derrière moi",
              "Personne"
            ],
            "correctOptionIndex": 1,
            "explanation": "En coupant la voie d’en face, on doit céder le passage aux usagers d’en face."
          },
          {
            "_id": "q-lec-15-2-3",
            "questionText": "Sur un rond-point à sens giratoire avec panneaux Cédez le passage aux entrées :",
            "options": [
              "Ceux qui entrent ont la priorité",
              "Les véhicules circulant sur l’anneau sont prioritaires",
              "Priorité à droite",
              "Priorité aux camions"
            ],
            "correctOptionIndex": 1,
            "explanation": "La priorité appartient aux usagers engagés dans l’anneau."
          },
          {
            "_id": "q-lec-15-2-4",
            "questionText": "Face à un feu rouge clignotant à un passage à niveau :",
            "options": [
              "Je passe vite",
              "L’arrêt immédiat et absolu est obligatoire",
              "Je klaxonne",
              "Je double"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le feu rouge clignotant interdit formellement de franchir la voie ferrée."
          },
          {
            "_id": "q-lec-15-2-5",
            "questionText": "Un véhicule de police approche avec gyrophare bleu et sirène deux-tons active :",
            "options": [
              "J’accélère",
              "Je lui cède le passage et facilite sa progression en serrant à droite",
              "Je garde ma vitesse",
              "Je le bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les véhicules de secours en intervention sont prioritaires absolus."
          }
        ]
      },
      {
        "_id": "lec-15-3",
        "_type": "lecon",
        "title": "Leçon 15.3 — Révision des distances, vitesses et risques",
        "ordre": 3,
        "description": "Distance d’arrêt, distance de sécurité, limitations, alcool, fatigue, téléphone et conditions difficiles.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-3-1",
            "questionText": "À 50 km/h sur sol sec, quelle est l’estimation de la distance totale d’arrêt ?",
            "options": [
              "15 mètres",
              "25 mètres (5 x 5)",
              "50 mètres",
              "100 mètres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Formule : 5 x 5 = 25 mètres d’arrêt total."
          },
          {
            "_id": "q-lec-15-3-2",
            "questionText": "Sur sol mouillé, que devient la distance de freinage ?",
            "options": [
              "Elle diminue",
              "Elle est multipliée par deux",
              "Elle est divisée par deux",
              "Inchangée"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’adhérence divisée par 2 double la distance de freinage."
          },
          {
            "_id": "q-lec-15-3-3",
            "questionText": "Quel est le taux légal maximal d’alcoolémie en permis probatoire ?",
            "options": [
              "0,0 g/l",
              "0,2 g/l de sang (tolérance zéro)",
              "0,5 g/l",
              "0,8 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil probatoire est de 0,2 g/l de sang."
          },
          {
            "_id": "q-lec-15-3-4",
            "questionText": "Quel est le temps moyen d’un intervalle de sécurité réglementaire entre 2 voitures ?",
            "options": [
              "0,5 s",
              "1 s",
              "2 secondes au moins",
              "5 s"
            ],
            "correctOptionIndex": 2,
            "explanation": "L’intervalle de sécurité doit être d’au moins 2 secondes."
          },
          {
            "_id": "q-lec-15-3-5",
            "questionText": "L’utilisation d’un smartphone tenu en main en conduisant retire :",
            "options": [
              "1 point",
              "2 points",
              "3 points et 135 € d’amende",
              "6 points"
            ],
            "correctOptionIndex": 2,
            "explanation": "Téléphoner au volant entraîne le retrait de 3 points."
          }
        ]
      },
      {
        "_id": "lec-15-4",
        "_type": "lecon",
        "title": "Leçon 15.4 — Révision mécanique, sécurité et environnement",
        "ordre": 4,
        "description": "Voyants, pneus, équipements, entretien, écoconduite et sécurité des passagers.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-4-1",
            "questionText": "L’allumage d’un voyant de couleur ROUGE en circulation exige :",
            "options": [
              "Un contrôle annuel",
              "Un arrêt immédiat et sécurisé du véhicule",
              "D’accélérer",
              "D’allumer les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le voyant rouge signale un danger critique imposant l’arrêt immédiat."
          },
          {
            "_id": "q-lec-15-4-2",
            "questionText": "Quelle est la profondeur minimale des rainures de pneus autorisée par la loi ?",
            "options": [
              "0,5 mm",
              "1,6 mm sur toute la bande de roulement",
              "3,0 mm",
              "5,0 mm"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite légale est de 1,6 mm."
          },
          {
            "_id": "q-lec-15-4-3",
            "questionText": "Le système ABS a pour fonction première de :",
            "options": [
              "Remplacer la ceinture",
              "Empêcher le blocage des roues pour garder le contrôle de direction lors d’un freinage fort",
              "Couper le moteur",
              "Accélérer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’ABS préserve la manœuvrabilité du véhicule pendant le freinage."
          },
          {
            "_id": "q-lec-15-4-4",
            "questionText": "Le port de la ceinture de sécurité est obligatoire :",
            "options": [
              "À l’avant seulement",
              "À toutes les places équipées d’une ceinture (avant et arrière)",
              "Uniquement sur autoroute",
              "Uniquement pour le conducteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tous les passagers doivent être attachés."
          },
          {
            "_id": "q-lec-15-4-5",
            "questionText": "L’écoconduite permet une économie moyenne de carburant de :",
            "options": [
              "1%",
              "5%",
              "15% à 25%",
              "50%"
            ],
            "correctOptionIndex": 2,
            "explanation": "Une conduite souple et anticipative économise jusqu’à 25% de carburant."
          }
        ]
      },
      {
        "_id": "lec-15-5",
        "_type": "lecon",
        "title": "Leçon 15.5 — Examen blanc final type ETG",
        "ordre": 5,
        "description": "Simulation finale de 40 questions couvrant les dix thématiques officielles du code de la route.",
        "videoUrl": "https://www.youtube.com/watch?v=vOEc9e1qq_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-5-1",
            "questionText": "Pour réussir l’examen officiel du Code de la Route (ETG), combien de fautes maximum sont tolérées sur 40 questions ?",
            "options": [
              "3 fautes",
              "5 fautes maximum (score minimal requis : 35/40)",
              "8 fautes",
              "10 fautes"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut obtenir au moins 35 bonnes réponses sur 40 pour être reçu à l’examen."
          },
          {
            "_id": "q-lec-15-5-2",
            "questionText": "Combien de thématiques officielles composent l’examen du Code de la route ?",
            "options": [
              "3 thèmes",
              "5 thèmes",
              "10 thématiques officielles (L, C, U, R, D, A, M, S, P, E)",
              "20 thèmes"
            ],
            "correctOptionIndex": 2,
            "explanation": "L’ETG couvre 10 familles officielles de réglementation et sécurité routière."
          },
          {
            "_id": "q-lec-15-5-3",
            "questionText": "Quelle est la première cause de mortalité sur les autoroutes françaises ?",
            "options": [
              "La pluie",
              "La somnolence et la fatigue au volant",
              "Les pannes d’essence",
              "Les animaux"
            ],
            "correctOptionIndex": 1,
            "explanation": "L’endormissement est le 1er facteur mortel sur autoroute."
          },
          {
            "_id": "q-lec-15-5-4",
            "questionText": "La distance de sécurité minimale à laisser en dépassant un cycliste hors agglomération est de :",
            "options": [
              "0,5 m",
              "1 m",
              "1,50 m",
              "2,5 m"
            ],
            "correctOptionIndex": 2,
            "explanation": "1,50 m hors ville, 1 m en agglomération."
          },
          {
            "_id": "q-lec-15-5-5",
            "questionText": "Le refus de priorité à un piéton engagé sur un passage clouté est sanctionné par :",
            "options": [
              "1 point",
              "2 points",
              "4 points",
              "6 points et suspension du permis"
            ],
            "correctOptionIndex": 3,
            "explanation": "Cette infraction majeure est punie du retrait maximal de 6 points."
          }
        ]
      }
    ]
  }
];

export const PERMIS_B_QUIZZES: Quiz[] = [
  {
    "_id": "quiz-mod-1",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 1 — Comprendre le véhicule",
    "module": {
      "_type": "reference",
      "_ref": "mod-1"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-1-1",
        "questionText": "Quelle est la profondeur minimale légale des rainures d’un pneumatique ?",
        "options": [
          "1,0 mm",
          "1,6 mm",
          "2,5 mm",
          "3,5 mm"
        ],
        "correctOptionIndex": 1,
        "explanation": "La loi impose au moins 1,6 mm de rainures sur toute la bande de roulement."
      },
      {
        "_id": "q-final-1-2",
        "questionText": "L’allumage d’un voyant rouge d’alerte en circulation nécessite :",
        "options": [
          "De continuer à vitesse modérée",
          "Un arrêt immédiat et sécurisé du véhicule",
          "D’accélérer jusqu’au garage",
          "D’allumer les feux"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le voyant rouge impose de s’arrêter dès que possible en sécurité."
      },
      {
        "_id": "q-final-1-3",
        "questionText": "Quelle est la mission principale du système ABS ?",
        "options": [
          "Réduire la vitesse en virage",
          "Maintenir le pouvoir directionnel en évitant le blocage des roues",
          "Remplacer les freins",
          "Recharger la batterie"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’ABS empêche les roues de se bloquer pour permettre l’évitement."
      },
      {
        "_id": "q-final-1-4",
        "questionText": "Pour une bonne installation au poste de conduite, que règle-t-on en dernier ?",
        "options": [
          "Le siège",
          "Les rétroviseurs",
          "Le volant",
          "La ceinture de sécurité"
        ],
        "correctOptionIndex": 3,
        "explanation": "La ceinture se boucle en dernier une fois tous les réglages terminés."
      },
      {
        "_id": "q-final-1-5",
        "questionText": "De quelle couleur est le témoin d’avertissement du niveau de carburant ?",
        "options": [
          "Rouge",
          "Orange / Jaune",
          "Vert",
          "Bleu"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le témoin de réserve est orange car il n’impose pas un arrêt d’urgence."
      },
      {
        "_id": "q-final-1-6",
        "questionText": "Quelle pression appliquer aux pneus avant un long trajet autoroutier ?",
        "options": [
          "Diminuer de 0,5 bar",
          "Laisser sous-gonflé",
          "Augmenter de 0,2 à 0,3 bar",
          "Aucun changement"
        ],
        "correctOptionIndex": 2,
        "explanation": "On augmente la pression de 0,2 à 0,3 bar pour éviter l’échauffement sur autoroute."
      },
      {
        "_id": "q-final-1-7",
        "questionText": "À quoi sert la commande d’essuie-glaces ?",
        "options": [
          "À refroidir les vitres",
          "À évacuer l’eau pour assurer une bonne visibilité",
          "À régler les phares",
          "À dégivrer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les essuie-glaces garantissent la visibilité par mauvais temps."
      },
      {
        "_id": "q-final-1-8",
        "questionText": "Sans ceinture attachée, l’airbag peut-il blesser grièvement l’occupant ?",
        "options": [
          "Non, jamais",
          "Oui, le choc direct avec le coussin en déploiement peut être très violent",
          "C’est sans danger",
          "L’airbag ne s’ouvre pas"
        ],
        "correctOptionIndex": 1,
        "explanation": "Sans retenue de ceinture, la projection contre l’airbag peut être mortelle."
      },
      {
        "_id": "q-final-1-9",
        "questionText": "Sur boîte manuelle, quand utilise-t-on la pédale d’embrayage ?",
        "options": [
          "Pour accélérer",
          "Pour passer les vitesses et s’arrêter sans caler",
          "Pour freiner fort",
          "En virage"
        ],
        "correctOptionIndex": 1,
        "explanation": "On débraye pour changer de rapport et lors de l’arrêt du véhicule."
      },
      {
        "_id": "q-final-1-10",
        "questionText": "Comment vérifier le niveau d’huile moteur à la jauge manuelle ?",
        "options": [
          "Moteur tournant en pente",
          "Moteur froid/arrêté sur sol horizontal",
          "À 90 km/h",
          "Ce n’est pas possible"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le contrôle s’effectue moteur coupé et froid, sur un sol parfaitement plat."
      }
    ]
  },
  {
    "_id": "quiz-mod-2",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 2 — Règles générales de circulation",
    "module": {
      "_type": "reference",
      "_ref": "mod-2"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-2-1",
        "questionText": "En marche normale sur route à plusieurs voies, où devez-vous rouler ?",
        "options": [
          "Au milieu",
          "Sur la voie la plus à droite",
          "À gauche",
          "Peu importe"
        ],
        "correctOptionIndex": 1,
        "explanation": "On circule sur la voie de droite, les autres servant aux dépassements."
      },
      {
        "_id": "q-final-2-2",
        "questionText": "Distance latérale minimale pour dépasser un vélo hors agglomération ?",
        "options": [
          "0,5 m",
          "1 m",
          "1,5 m",
          "2,5 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors agglomération, la vitesse exige un écart minimal de 1,50 m."
      },
      {
        "_id": "q-final-2-3",
        "questionText": "Une ligne jaune continue le long du trottoir interdit :",
        "options": [
          "Le stationnement seul",
          "L’arrêt et le stationnement",
          "Les vélos",
          "Le dépassement"
        ],
        "correctOptionIndex": 1,
        "explanation": "La ligne continue jaune interdit à la fois l’arrêt et le stationnement."
      },
      {
        "_id": "q-final-2-4",
        "questionText": "Avant de changer de voie, quelle est la chronologie obligatoire ?",
        "options": [
          "Clignotant puis braquer",
          "Rétroviseurs + angle mort, clignotant, puis manœuvre",
          "Freiner puis tourner",
          "Klaxonner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les contrôles visuels complets précèdent toujours le clignotant."
      },
      {
        "_id": "q-final-2-5",
        "questionText": "Peut-on s’arrêter sur la BAU pour passer un appel téléphonique ?",
        "options": [
          "Oui avec feux de détresse",
          "Non, c’est strictement interdit et très dangereux",
          "Oui si c’est urgent",
          "La nuit oui"
        ],
        "correctOptionIndex": 1,
        "explanation": "Seule une panne grave, un malaise ou accident justifie l’arrêt sur BAU."
      },
      {
        "_id": "q-final-2-6",
        "questionText": "Un piéton regarde la chaussée au bord du passage piéton :",
        "options": [
          "Je passe vite",
          "Je ralentis et je m’arrête pour le laisser traverser",
          "Je klaxonne",
          "Je l’ignore"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le conducteur doit s’arrêter pour laisser traverser le piéton."
      },
      {
        "_id": "q-final-2-7",
        "questionText": "Sur voie d’insertion, si aucun espace n’est disponible :",
        "options": [
          "Je force le passage",
          "Je roule sur la BAU",
          "Je ralentis/m’arrête au début en attendant un créneau",
          "Je fais demi-tour"
        ],
        "correctOptionIndex": 2,
        "explanation": "Il faut ralentir au début de la voie d’insertion pour pouvoir accélérer ensuite."
      },
      {
        "_id": "q-final-2-8",
        "questionText": "Stationner sur un emplacement réservé aux personnes handicapées sans carte :",
        "options": [
          "Est toléré 10 min",
          "Est une infraction passible de 135 € d’amende et fourrière",
          "Coûte 11 €",
          "Est gratuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "Ce stationnement gênant est puni d’une amende forfaitaire de 135 €."
      },
      {
        "_id": "q-final-2-9",
        "questionText": "Dans un virage à droite sans visibilité, pour bien se positionner, on doit :",
        "options": [
          "Couper à gauche",
          "Serrer à droite dans sa voie",
          "Rouler au milieu",
          "Accélérer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Serrer à droite élargit le champ de vision et protège des véhicules en face."
      },
      {
        "_id": "q-final-2-10",
        "questionText": "Quel est l’intérêt du coup d’œil direct dans l’angle mort ?",
        "options": [
          "Regarder les passagers",
          "Déceler un usager masqué dans l’angle invisible du rétroviseur",
          "Vérifier la vitre",
          "Régler le siège"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vision directe permet de voir ce que le rétroviseur ne reflète pas."
      }
    ]
  },
  {
    "_id": "quiz-mod-3",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 3 — Signalisation routière",
    "module": {
      "_type": "reference",
      "_ref": "mod-3"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-3-1",
        "questionText": "À quelle distance est placé un panneau de danger hors agglomération ?",
        "options": [
          "50 m",
          "100 m",
          "150 m",
          "200 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors agglomération, la distance réglementaire est de 150 mètres."
      },
      {
        "_id": "q-final-3-2",
        "questionText": "À partir de quel point s’applique une interdiction signalée par un panneau rond rouge ?",
        "options": [
          "À 150 m",
          "Dès la hauteur du panneau",
          "À la prochaine intersection",
          "Au prochain péage"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les prescriptions prennent effet immédiatement à la hauteur du panneau."
      },
      {
        "_id": "q-final-3-3",
        "questionText": "Quelle signalisation prévaut sur les feux tricolores ?",
        "options": [
          "Les panneaux sous les feux",
          "Les injonctions des forces de l’ordre",
          "Le marquage au sol",
          "La priorité à droite"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les agents de police ont l’autorité suprême sur la circulation."
      },
      {
        "_id": "q-final-3-4",
        "questionText": "Que devez-vous faire devant un feu rouge clignotant ?",
        "options": [
          "Passer avec prudence",
          "Arrêt absolu obligatoire",
          "Accélérer",
          "Klaxonner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le feu rouge clignotant impose un arrêt inconditionnel (ex: passage à niveau)."
      },
      {
        "_id": "q-final-3-5",
        "questionText": "Sur autoroute, quelle est la couleur des panneaux de direction ?",
        "options": [
          "Verte",
          "Bleue",
          "Blanche",
          "Jaune"
        ],
        "correctOptionIndex": 1,
        "explanation": "La signalisation autoroutière est exclusivement bleue en France."
      },
      {
        "_id": "q-final-3-6",
        "questionText": "Un panneau de danger à fond JAUNE indique :",
        "options": [
          "Un danger temporaire (travaux, déviation)",
          "Un danger permanent",
          "Une zone 30",
          "Une piste cyclable"
        ],
        "correctOptionIndex": 0,
        "explanation": "Le fond jaune signale une situation temporaire de chantier."
      },
      {
        "_id": "q-final-3-7",
        "questionText": "Une flèche au sol pointant vers la gauche dans votre voie vous oblige à :",
        "options": [
          "Tourner à gauche à l’intersection",
          "Aller tout droit",
          "Faire demi-tour",
          "Vous arrêter"
        ],
        "correctOptionIndex": 0,
        "explanation": "Les flèches de sélection obligent à suivre la direction indiquée."
      },
      {
        "_id": "q-final-3-8",
        "questionText": "Que faire à un feu orange fixe ?",
        "options": [
          "Accélérer pour passer",
          "S’arrêter sauf risque de choc arrière avéré",
          "Klaxonner",
          "Faire demi-tour"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le feu orange impose l’arrêt sauf risque de collision par l’arrière."
      },
      {
        "_id": "q-final-3-9",
        "questionText": "Un panneau rond bleu avec un vélo blanc signifie :",
        "options": [
          "Interdit aux vélos",
          "Piste cyclable obligatoire pour les cycles",
          "Parking vélo",
          "Location de vélos"
        ],
        "correctOptionIndex": 1,
        "explanation": "C’est une obligation imposée aux cyclistes."
      },
      {
        "_id": "q-final-3-10",
        "questionText": "Une ligne de rive continue à droite sur autoroute délimite :",
        "options": [
          "La voie rapide",
          "La bande d’arrêt d’urgence",
          "Un passage piéton",
          "Une piste cyclable"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elle sépare la chaussée de la bande d’arrêt d’urgence."
      }
    ]
  },
  {
    "_id": "quiz-mod-4",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 4 — Feux et priorités",
    "module": {
      "_type": "reference",
      "_ref": "mod-4"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-4-1",
        "questionText": "En l’absence totale de signalisation à une intersection, quelle règle s’applique ?",
        "options": [
          "Priorité à gauche",
          "Priorité à droite",
          "Priorité au plus rapide",
          "Priorité aux poids lourds"
        ],
        "correctOptionIndex": 1,
        "explanation": "La priorité à droite s’applique par défaut à tout carrefour sans panneau."
      },
      {
        "_id": "q-final-4-2",
        "questionText": "Où doit s’effectuer l’arrêt obligatoire d’un panneau STOP ?",
        "options": [
          "À la ligne continue au sol",
          "Au panneau",
          "Au milieu de la chaussée",
          "5 mètres avant"
        ],
        "correctOptionIndex": 0,
        "explanation": "L’arrêt doit se faire précisément à la limite de la ligne continue de stop."
      },
      {
        "_id": "q-final-4-3",
        "questionText": "Un véhicule prioritaire arrive derrière vous avec sirène deux-tons et gyrophare :",
        "options": [
          "Vous accélérez pour le semer",
          "Vous facilitez son passage en serrant à droite en sécurité",
          "Vous freinez en urgence au milieu",
          "Vous l’ignorez"
        ],
        "correctOptionIndex": 1,
        "explanation": "On facilite immédiatement son dégagement en serrant à droite."
      },
      {
        "_id": "q-final-4-4",
        "questionText": "Au feu vert, pour tourner à gauche, vous devez céder le passage :",
        "options": [
          "Aux voitures derrière vous",
          "Aux véhicules arrivant en face et piétons traversant",
          "À personne",
          "Aux avions"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tourner à gauche coupe l’axe des véhicules venant d’en face."
      },
      {
        "_id": "q-final-4-5",
        "questionText": "Sur un carrefour à sens giratoire conventionnel :",
        "options": [
          "Ceux qui entrent sont prioritaires",
          "Les usagers engagés sur l’anneau sont prioritaires",
          "Priorité à droite",
          "Priorité aux deux-roues"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les panneaux Cédez le passage donnent la priorité aux usagers de l’anneau."
      },
      {
        "_id": "q-final-4-6",
        "questionText": "Que faire face à un feu jaune clignotant en bas à la place du vert ?",
        "options": [
          "Arrêt absolu",
          "Passer avec prudence en respectant la signalisation de priorité",
          "Faire demi-tour",
          "Accélérer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le jaune clignotant appelle à la prudence et confirme la priorité de passage."
      },
      {
        "_id": "q-final-4-7",
        "questionText": "Combien de points retire le non-respect d’un panneau Stop ou feu rouge ?",
        "options": [
          "2 points",
          "3 points",
          "4 points",
          "6 points"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le refus de priorité à un feu rouge ou Stop retire 4 points."
      },
      {
        "_id": "q-final-4-8",
        "questionText": "Un véhicule débouchant d’un parking de supermarché :",
        "options": [
          "A la priorité à droite",
          "Doit céder le passage à tous les usagers de la voie publique",
          "Est prioritaire s’il a son clignotant",
          "Passe en premier"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les sorties de parkings et lieux privés n’ont jamais la priorité."
      },
      {
        "_id": "q-final-4-9",
        "questionText": "Face à un tramway arrivant à un croisement :",
        "options": [
          "Vous passez s’il est à gauche",
          "Le tramway a la priorité absolue",
          "Vous le doublez",
          "Il doit vous céder le passage"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le tramway est toujours prioritaire."
      },
      {
        "_id": "q-final-4-10",
        "questionText": "Si une intersection est encombrée alors que votre feu est vert :",
        "options": [
          "Vous avancez pour forcer le passage",
          "Vous vous arrêtez avant l’intersection pour ne pas la bloquer",
          "Vous klaxonnez",
          "Vous faites marche arrière"
        ],
        "correctOptionIndex": 1,
        "explanation": "On ne s’engage dans un carrefour que si la sortie est totalement dégagée."
      }
    ]
  },
  {
    "_id": "quiz-mod-5",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 5 — Intersections et carrefours",
    "module": {
      "_type": "reference",
      "_ref": "mod-5"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-5-1",
        "questionText": "Pour emprunter la première sortie à droite dans un rond-point :",
        "options": [
          "On reste au milieu",
          "On allume le clignotant droit dès l’entrée et on serre à droite",
          "On met le clignotant gauche",
          "On ne met rien"
        ],
        "correctOptionIndex": 1,
        "explanation": "Pour sortir à droite, le clignotant droit est activé avant l’entrée dans le giratoire."
      },
      {
        "_id": "q-final-5-2",
        "questionText": "Si la sonnerie retentit à un passage à niveau mais que les barrières sont encore levées :",
        "options": [
          "J’accélère pour passer",
          "L’arrêt absolu est obligatoire",
          "Je passe si la voie est libre",
          "Je klaxonne"
        ],
        "correctOptionIndex": 1,
        "explanation": "La sonnerie annonce la fermeture imminente : interdiction formelle de s’engager."
      },
      {
        "_id": "q-final-5-3",
        "questionText": "Dans un carrefour complexe avec feux fléchés, la flèche verte vers la gauche signifie :",
        "options": [
          "Je tourne à gauche en coupant un trafic prioritaire en face",
          "La voie d’en face est au rouge, le tourne-à-gauche est protégé",
          "Le feu est en panne",
          "Seuls les vélos peuvent tourner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Une flèche verte directionnelle garantit une traversée protégée."
      },
      {
        "_id": "q-final-5-4",
        "questionText": "Si vous êtes engagé sur un giratoire et qu’une voiture veut entrer :",
        "options": [
          "Elle a la priorité",
          "Vous avez la priorité de circulation sur l’anneau",
          "Vous devez piler",
          "Elle passe en premier"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les véhicules sur l’anneau sont prioritaires sur ceux qui entrent."
      },
      {
        "_id": "q-final-5-5",
        "questionText": "Que faire en cas de panne mécanique immobilisant la voiture sur une voie ferrée ?",
        "options": [
          "Pousser la voiture seul sans sortir les passagers",
          "Faire évacuer immédiatement les passagers et utiliser la borne d’urgence",
          "Attendre le train",
          "Téléphoner à un ami"
        ],
        "correctOptionIndex": 1,
        "explanation": "La priorité absolue est l’évacuation des occupants et l’alerte immédiate."
      },
      {
        "_id": "q-final-5-6",
        "questionText": "Dans un croisement à l’indonésienne, les voitures tournant à gauche se croisent :",
        "options": [
          "L’une derrière l’autre",
          "L’une devant l’autre face à face",
          "Par la droite",
          "En marche arrière"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elles passent l’une devant l’autre sans faire le tour du centre."
      },
      {
        "_id": "q-final-5-7",
        "questionText": "À quelle distance minimale d’un passage à niveau sans barrière doit-on s’arrêter ?",
        "options": [
          "À 1 mètre",
          "À la ligne Stop ou au moins 5 mètres du premier rail",
          "Sur les rails",
          "À 100 mètres"
        ],
        "correctOptionIndex": 1,
        "explanation": "On doit respecter une distance de sécurité d’au moins 5 mètres des rails."
      },
      {
        "_id": "q-final-5-8",
        "questionText": "L’angle mort droit lors de la sortie d’un giratoire permet de détecter :",
        "options": [
          "Un oiseau",
          "Un cycliste ou scooter circulant sur le bord droit de l’anneau",
          "Le panneau de sortie",
          "Le passager"
        ],
        "correctOptionIndex": 1,
        "explanation": "Un deux-roues peut se trouver le long de votre flanc droit lors de la sortie."
      },
      {
        "_id": "q-final-5-9",
        "questionText": "Un miroir de carrefour donne-t-il la priorité ?",
        "options": [
          "Oui toujours",
          "Non, c’est une aide visuelle sans modification des priorités",
          "Oui aux heures de pointe",
          "Uniquement aux camions"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le miroir ne confère aucune priorité légale."
      },
      {
        "_id": "q-final-5-10",
        "questionText": "La communication par le regard avec un piéton à une intersection permet de :",
        "options": [
          "Le forcer à courir",
          "Confirmer qu’il est vu et qu’il peut traverser en toute sécurité",
          "Lui faire peur",
          "Le saluer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le contact visuel garantit une compréhension mutuelle sécurisante."
      }
    ]
  },
  {
    "_id": "quiz-mod-6",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 6 — Vitesse, freinage et distances",
    "module": {
      "_type": "reference",
      "_ref": "mod-6"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-6-1",
        "questionText": "Quelle est la limitation de vitesse sur autoroute par temps de pluie (permis confirmé) ?",
        "options": [
          "130 km/h",
          "110 km/h",
          "100 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Par pluie, la vitesse sur autoroute passe de 130 à 110 km/h."
      },
      {
        "_id": "q-final-6-2",
        "questionText": "À 90 km/h sur sol sec, quelle est la distance parcourue pendant 1 seconde de réaction ?",
        "options": [
          "15 m",
          "27 m",
          "45 m",
          "81 m"
        ],
        "correctOptionIndex": 1,
        "explanation": "Formule : 9 x 3 = 27 mètres."
      },
      {
        "_id": "q-final-6-3",
        "questionText": "À 90 km/h sur sol sec, quelle est l’estimation de la distance totale d’arrêt ?",
        "options": [
          "27 m",
          "54 m",
          "81 m",
          "100 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Formule : 9 x 9 = 81 mètres."
      },
      {
        "_id": "q-final-6-4",
        "questionText": "Sur sol mouillé, par combien est multipliée la distance de freinage ?",
        "options": [
          "Par 1,2",
          "Par 2",
          "Par 4",
          "Par 10"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’adhérence divisée par 2 double la distance nécessaire pour freiner."
      },
      {
        "_id": "q-final-6-5",
        "questionText": "Combien de temps correspond au minimum légal de sécurité entre deux véhicules qui se suivent ?",
        "options": [
          "1 seconde",
          "2 secondes",
          "3 secondes",
          "5 secondes"
        ],
        "correctOptionIndex": 1,
        "explanation": "La règle réglementaire minimale est de 2 secondes."
      },
      {
        "_id": "q-final-6-6",
        "questionText": "Sur autoroute, pour respecter la distance de sécurité, on doit laisser visible entre soi et le précédent :",
        "options": [
          "1 ligne blanche de BAU",
          "2 traits de bande d’arrêt d’urgence",
          "10 mètres",
          "La plaque d’immatriculation"
        ],
        "correctOptionIndex": 1,
        "explanation": "« Deux traits = sécurité » est le repère officiel autoroutier."
      },
      {
        "_id": "q-final-6-7",
        "questionText": "Si la vitesse est multipliée par 3, l’énergie cinétique est multipliée par :",
        "options": [
          "3",
          "6",
          "9",
          "12"
        ],
        "correctOptionIndex": 2,
        "explanation": "L’énergie cinétique dépend du carré de la vitesse : 3² = 9."
      },
      {
        "_id": "q-final-6-8",
        "questionText": "En cas de brouillard réduisant la visibilité à moins de 50 m, la vitesse max est de :",
        "options": [
          "30 km/h",
          "50 km/h",
          "70 km/h",
          "80 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La limite légale est de 50 km/h sur toutes les routes et autoroutes."
      },
      {
        "_id": "q-final-6-9",
        "questionText": "Quelle sanction encourt le non-respect des distances de sécurité ?",
        "options": [
          "135 € et retrait de 3 points",
          "68 € sans retrait de point",
          "Prison ferme",
          "Suspension de 5 ans"
        ],
        "correctOptionIndex": 0,
        "explanation": "C’est une contravention de 4ème classe avec retrait de 3 points."
      },
      {
        "_id": "q-final-6-10",
        "questionText": "Pour un conducteur novice (permis probatoire), la vitesse sur route à 80 km/h est de :",
        "options": [
          "60 km/h",
          "70 km/h",
          "80 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 2,
        "explanation": "Sur les routes à double sens limitées à 80 km/h, la vitesse reste 80 km/h pour les jeunes conducteurs."
      }
    ]
  },
  {
    "_id": "quiz-mod-7",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 7 — Croisement et dépassement",
    "module": {
      "_type": "reference",
      "_ref": "mod-7"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-7-1",
        "questionText": "Quelle est la distance minimale pour dépasser un cycliste hors agglomération ?",
        "options": [
          "0,5 m",
          "1,0 m",
          "1,50 m",
          "2,5 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors ville, l’écart de sécurité obligatoire est de 1,50 mètre."
      },
      {
        "_id": "q-final-7-2",
        "questionText": "Sur une route en forte pente, qui doit reculer si deux voitures ne peuvent pas croiser ?",
        "options": [
          "Le véhicule qui monte",
          "Le véhicule qui descend",
          "Le plus rapide",
          "Le plus récent"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le véhicule descendant doit s’arrêter et reculer."
      },
      {
        "_id": "q-final-7-3",
        "questionText": "Est-il autorisé de dépasser par la droite sur autoroute ?",
        "options": [
          "Oui si la voie de droite est libre",
          "Non, c’est strictement interdit (3 points en moins)",
          "Oui si la voiture roule à 100 km/h",
          "Oui le week-end"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tout dépassement doit obligatoirement s’effectuer par la gauche."
      },
      {
        "_id": "q-final-7-4",
        "questionText": "Peut-on chevaucher une ligne continue pour dépasser un vélo avec bonne visibilité ?",
        "options": [
          "Non jamais",
          "Oui, le chevauchement de ligne est légalement autorisé pour dépasser un cycliste",
          "Uniquement en ville",
          "Uniquement pour les tracteurs"
        ],
        "correctOptionIndex": 1,
        "explanation": "La loi autorise le chevauchement de ligne continue pour protéger les cyclistes."
      },
      {
        "_id": "q-final-7-5",
        "questionText": "Quand un usager vous dépasse, vous devez :",
        "options": [
          "Accélérer",
          "Maintenir votre vitesse et serrer à droite",
          "Mettre vos feux de détresse",
          "Freiner brusquement"
        ],
        "correctOptionIndex": 1,
        "explanation": "Il est interdit d’accélérer quand on est dépassé."
      },
      {
        "_id": "q-final-7-6",
        "questionText": "Quand peut-on se rabattre en toute sécurité après un dépassement ?",
        "options": [
          "Dès qu’on a passé le pare-choc",
          "Dès que le véhicule dépassé apparaît en entier dans le rétroviseur intérieur",
          "Après 2 km",
          "Quand on veut"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vision de la face avant complète dans le rétroviseur central assure un intervalle suffisant."
      },
      {
        "_id": "q-final-7-7",
        "questionText": "Peut-on dépasser un chasse-neige qui sale ou déneige la chaussée ?",
        "options": [
          "Oui par la gauche",
          "Non, c’est strictement interdit par le code de la route",
          "Oui avec le clignotant",
          "Oui s’il roule à 30 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le dépassement des engins de service hivernal en intervention est prohibé."
      },
      {
        "_id": "q-final-7-8",
        "questionText": "À l’approche d’un sommet de côte sur route à 2 voies à double sens :",
        "options": [
          "Le dépassement est interdit",
          "Le dépassement est autorisé à 80 km/h",
          "On peut doubler les camions",
          "On accélère"
        ],
        "correctOptionIndex": 0,
        "explanation": "L’absence de visibilité frontale interdit tout dépassement."
      },
      {
        "_id": "q-final-7-9",
        "questionText": "Quel différentiel de vitesse est recommandé pour doubler un véhicule sans traîner ?",
        "options": [
          "2 km/h",
          "Au moins 20 km/h sans franchir la vitesse limite",
          "60 km/h",
          "Aucun"
        ],
        "correctOptionIndex": 1,
        "explanation": "Une réserve d’environ 20 km/h garantit une manœuvre brève et sûre."
      },
      {
        "_id": "q-final-7-10",
        "questionText": "Le franchissement d’une ligne continue pour un dépassement non autorisé coûte :",
        "options": [
          "1 point",
          "2 points",
          "3 points et 135 € d’amende",
          "6 points"
        ],
        "correctOptionIndex": 2,
        "explanation": "Franchir une ligne continue entraîne la perte de 3 points."
      }
    ]
  },
  {
    "_id": "quiz-mod-8",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 8 — Autoroutes et voies rapides",
    "module": {
      "_type": "reference",
      "_ref": "mod-8"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-8-1",
        "questionText": "Sur autoroute fluide, quelle voie doit-on emprunter en marche normale ?",
        "options": [
          "La voie du milieu",
          "La voie de gauche",
          "La voie la plus à droite",
          "Peu importe"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le code impose de circuler sur la voie de droite."
      },
      {
        "_id": "q-final-8-2",
        "questionText": "À 130 km/h sur autoroute, la distance de sécurité minimale est de :",
        "options": [
          "30 m",
          "50 m",
          "78 m (2 traits de BAU)",
          "150 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Deux traits de bande d’arrêt d’urgence représentent l’intervalle de sécurité légal."
      },
      {
        "_id": "q-final-8-3",
        "questionText": "En cas de panne sur autoroute, la première chose à faire avant de sortir est :",
        "options": [
          "Poser le triangle",
          "Allumer les feux de détresse et enfiler son gilet rétro-réfléchissant",
          "Téléphoner",
          "Ouvrir le capot"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le gilet doit être enfilé à l’intérieur avant de poser le pied dehors."
      },
      {
        "_id": "q-final-8-4",
        "questionText": "Où les passagers doivent-ils attendre les secours sur autoroute ?",
        "options": [
          "Dans la voiture",
          "Sur la bande d’arrêt d’urgence",
          "Derrière la glissière de sécurité",
          "Sur le toit"
        ],
        "correctOptionIndex": 2,
        "explanation": "Tout le monde doit se tenir à l’abri derrière la glissière métallique."
      },
      {
        "_id": "q-final-8-5",
        "questionText": "Où commence-t-on à ralentir pour quitter une autoroute ?",
        "options": [
          "Sur la voie de droite de l’autoroute",
          "Dès le début de la voie de décélération",
          "Au milieu de l’autoroute",
          "Dans le virage de sortie"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le freinage s’effectue exclusivement sur la voie de décélération."
      },
      {
        "_id": "q-final-8-6",
        "questionText": "Sur autoroute, faire marche arrière pour rattraper une sortie ratée est puni de :",
        "options": [
          "Rien du tout",
          "Amende, retrait de 4 points et suspension de permis",
          "1 point en moins",
          "10 €"
        ],
        "correctOptionIndex": 1,
        "explanation": "La manœuvre en marche arrière sur autoroute est passible de 4 points et suspension."
      },
      {
        "_id": "q-final-8-7",
        "questionText": "La vitesse minimale sur la voie de gauche sur autoroute en conditions normales est de :",
        "options": [
          "60 km/h",
          "80 km/h",
          "100 km/h",
          "110 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse minimale sur la voie de gauche est de 80 km/h."
      },
      {
        "_id": "q-final-8-8",
        "questionText": "Le triangle de présignalisation doit-il obligatoirement être posé sur autoroute ?",
        "options": [
          "Oui toujours à 100 m",
          "Non, si la manœuvre constitue un danger pour la vie du conducteur",
          "Oui au milieu des voies",
          "Oui sur la voie de gauche"
        ],
        "correctOptionIndex": 1,
        "explanation": "Sur autoroute, la sécurité prime : le triangle est facultatif s’il y a danger."
      },
      {
        "_id": "q-final-8-9",
        "questionText": "Quel moyen privilégier pour appeler les secours d’autoroute ?",
        "options": [
          "Les bornes d’appel d’urgence orange (tous les 2 km)",
          "Faire des signes avec les bras",
          "Klaxonner",
          "Courir vers le péage"
        ],
        "correctOptionIndex": 0,
        "explanation": "La borne d’urgence géolocalise immédiatement l’appel."
      },
      {
        "_id": "q-final-8-10",
        "questionText": "Quelle est la limitation de vitesse sur autoroute pour un jeune conducteur par temps sec ?",
        "options": [
          "100 km/h",
          "110 km/h",
          "120 km/h",
          "130 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les permis probatoires sont plafonnés à 110 km/h sur autoroute."
      }
    ]
  },
  {
    "_id": "quiz-mod-9",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 9 — Conduite de nuit et météo difficile",
    "module": {
      "_type": "reference",
      "_ref": "mod-9"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-9-1",
        "questionText": "Quels feux doit-on allumer par temps de pluie ?",
        "options": [
          "Feux de position seuls",
          "Feux de croisement",
          "Feux de brouillard arrière",
          "Feux de route"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les feux de croisement sont obligatoires dès l’apparition de la pluie."
      },
      {
        "_id": "q-final-9-2",
        "questionText": "L’utilisation des feux de brouillard arrière est STRICTEMENT INTERDITE :",
        "options": [
          "Par temps de neige",
          "Par temps de pluie (car ils éblouissent les usagers derrière)",
          "Par temps de brouillard",
          "La nuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’eau pulvérisée réfléchit la lumière intense des antibrouillards arrière et éblouit."
      },
      {
        "_id": "q-final-9-3",
        "questionText": "À quelle distance minimale doivent éclairer les feux de route (pleins phares) ?",
        "options": [
          "30 m",
          "50 m",
          "100 m",
          "200 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Les feux de route doivent projeter leur faisceau à au moins 100 mètres."
      },
      {
        "_id": "q-final-9-4",
        "questionText": "En présence d’une nappe de brouillard dense avec visibilité sous 50 m, la vitesse max est de :",
        "options": [
          "30 km/h",
          "50 km/h partout",
          "70 km/h",
          "80 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La limite absolue est de 50 km/h sur l’ensemble du réseau routier."
      },
      {
        "_id": "q-final-9-5",
        "questionText": "Pour limiter le risque d’aquaplaning sous forte pluie, on doit :",
        "options": [
          "Gonfler les pneus à 5 bars",
          "Réduire sa vitesse et s’assurer que les pneus ont des sculptures d’au moins 1,6 mm",
          "Freiner en continu",
          "Accélérer"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse modérée et de bonnes rainures évacuent l’eau sous le pneu."
      },
      {
        "_id": "q-final-9-6",
        "questionText": "Que faire immédiatement si le véhicule part en aquaplaning ?",
        "options": [
          "Piler sur le frein",
          "Garder les roues droites et décélérer sans geste brusque",
          "Tirer le frein à main",
          "Braquer d’un coup"
        ],
        "correctOptionIndex": 1,
        "explanation": "On soulage l’accélérateur en douceur pour reprendre contact avec le sol."
      },
      {
        "_id": "q-final-9-7",
        "questionText": "Le panneau B26 (pneu avec chaînes) rend obligatoire :",
        "options": [
          "Les pneus neufs",
          "Le montage de chaînes sur au moins deux roues motrices",
          "L’arrêt du véhicule",
          "La marche arrière"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les chaînes ou dispositifs antidérapants deviennent obligatoires."
      },
      {
        "_id": "q-final-9-8",
        "questionText": "Pourquoi les feux de route sont-ils inefficaces et dangereux dans le brouillard ?",
        "options": [
          "Ils n’éclairent rien",
          "Ils créent un mur blanc éblouissant par réverbération sur les gouttelettes",
          "Ils chauffent",
          "Ils éteignent le moteur"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le faisceau haut se réfléchit sur les micro-gouttes d’eau."
      },
      {
        "_id": "q-final-9-9",
        "questionText": "Face à un fort vent latéral en doublant un camion :",
        "options": [
          "On accélère",
          "On s’attend à une déviation lors du dépassement et à une rafale à la sortie du camion",
          "On klaxonne",
          "On freine fort"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le camion fait écran puis le vent réapparaît brutalement au niveau de la cabine."
      },
      {
        "_id": "q-final-9-10",
        "questionText": "La nuit en croisant un véhicule, quel repère regarder pour ne pas être ébloui ?",
        "options": [
          "Le ciel",
          "La ligne blanche continue ou le bord droit de la chaussée",
          "Les phares d’en face",
          "Le tableau de bord"
        ],
        "correctOptionIndex": 1,
        "explanation": "Guider son regard le long de la ligne de rive droite protège la rétine."
      }
    ]
  },
  {
    "_id": "quiz-mod-10",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 10 — Alcool, drogues, fatigue et capacités",
    "module": {
      "_type": "reference",
      "_ref": "mod-10"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-10-1",
        "questionText": "Quel est le taux d’alcoolémie maximal légal pour un conducteur en période probatoire ?",
        "options": [
          "0,0 g/l",
          "0,2 g/l de sang (tolérance zéro)",
          "0,5 g/l",
          "0,8 g/l"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le seuil probatoire est fixé à 0,2 g/l de sang."
      },
      {
        "_id": "q-final-10-2",
        "questionText": "À partir de quel taux d’alcool l’infraction devient-elle un délit pénal ?",
        "options": [
          "0,2 g/l",
          "0,5 g/l",
          "0,8 g/l de sang",
          "1,2 g/l"
        ],
        "correctOptionIndex": 2,
        "explanation": "Dès 0,8 g/l de sang, le tribunal correctionnel peut prononcer jusqu’à 2 ans de prison."
      },
      {
        "_id": "q-final-10-3",
        "questionText": "Un pictogramme triangulaire ROUGE (Niveau 3) sur une boîte de médicament signifie :",
        "options": [
          "Conduite prudente",
          "Attention pour les camions",
          "Conduite formellement déconseillée / interdite",
          "Aucun effet"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le niveau 3 interdit la conduite pendant le traitement."
      },
      {
        "_id": "q-final-10-4",
        "questionText": "Quel est le temps moyen d’élimination d’un verre d’alcool par le foie ?",
        "options": [
          "10 min",
          "1h à 2h par verre",
          "5h",
          "24h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le foie élimine environ 0,10 à 0,15 g/l par heure."
      },
      {
        "_id": "q-final-10-5",
        "questionText": "Le port d’oreillettes ou écouteurs au volant est sanctionné par :",
        "options": [
          "Rien",
          "135 € d’amende et retrait de 3 points",
          "10 €",
          "1 point"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tout écouteur dans l’oreille est strictement interdit."
      },
      {
        "_id": "q-final-10-6",
        "questionText": "Tous les combien de temps doit-on marquer une pause sur long trajet ?",
        "options": [
          "Toutes les 2 heures au moins",
          "Toutes les 4 heures",
          "Toutes les 6 heures",
          "À l’arrivée"
        ],
        "correctOptionIndex": 0,
        "explanation": "Une pause de 15 à 20 minutes s’impose toutes les 2 heures."
      },
      {
        "_id": "q-final-10-7",
        "questionText": "Quel est l’unique moyen de récupérer de la vigilance en cas de somnolence aiguë ?",
        "options": [
          "Café fort",
          "Ouvrir la vitre",
          "Une courte sieste de 15 à 20 minutes",
          "Chanter"
        ],
        "correctOptionIndex": 2,
        "explanation": "Seul le sommeil répare l’épuisement cérébral."
      },
      {
        "_id": "q-final-10-8",
        "questionText": "Conduire sous l’emprise de stupéfiants (cannabis, etc.) entraîne :",
        "options": [
          "Un simple avertissement",
          "Un délit avec retrait de 6 points, rétention de permis et peines de prison",
          "Une amende de 11 €",
          "Rien sans accident"
        ],
        "correctOptionIndex": 1,
        "explanation": "La tolérance zéro stupéfiants est sanctionnée par un délit lourd."
      },
      {
        "_id": "q-final-10-9",
        "questionText": "Lire un message sur son smartphone en conduisant multiplie le risque d’accident par :",
        "options": [
          "2",
          "5",
          "10",
          "23"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le risque d’accident est multiplié par 23 lors de la lecture d’un SMS."
      },
      {
        "_id": "q-final-10-10",
        "questionText": "Le champ visuel d’un conducteur alcoolisé :",
        "options": [
          "S’élargit",
          "Se rétrécit de façon notable",
          "Reste identique",
          "Devient multicolore"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’alcool réduit considérablement la vision périphérique."
      }
    ]
  },
  {
    "_id": "quiz-mod-11",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 11 — Usagers vulnérables",
    "module": {
      "_type": "reference",
      "_ref": "mod-11"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-11-1",
        "questionText": "Quel est le retrait de points pour un refus de priorité à un piéton sur un passage clouté ?",
        "options": [
          "2 points",
          "3 points",
          "4 points",
          "6 points et suspension possible"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le refus de priorité piéton est sanctionné par un retrait maximal de 6 points."
      },
      {
        "_id": "q-final-11-2",
        "questionText": "Quelle est la vitesse maximale autorisée dans une « Zone de rencontre » ?",
        "options": [
          "10 km/h",
          "20 km/h (priorité aux piétons)",
          "30 km/h",
          "50 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse est limitée à 20 km/h avec priorité absolue aux piétons."
      },
      {
        "_id": "q-final-11-3",
        "questionText": "Quelle est la distance minimale pour dépasser un cycliste en ville ?",
        "options": [
          "0,5 m",
          "1 mètre",
          "1,50 mètre",
          "2 mètres"
        ],
        "correctOptionIndex": 1,
        "explanation": "En agglomération, l’écart minimal de dépassement est de 1 mètre."
      },
      {
        "_id": "q-final-11-4",
        "questionText": "À quoi sert la technique d’ouverture de portière à la hollandaise (avec la main opposée) ?",
        "options": [
          "À ne pas salir la poignée",
          "À faire pivoter le haut du corps pour vérifier l’angle mort et éviter d’emporter un cycliste",
          "À fermer plus vite",
          "À faire du sport"
        ],
        "correctOptionIndex": 1,
        "explanation": "Cette manœuvre évite les accidents de portière avec les cyclistes."
      },
      {
        "_id": "q-final-11-5",
        "questionText": "Un piéton tenant une canne blanche dressée ou levée :",
        "options": [
          "Doit attendre votre passage",
          "A la priorité absolue en toute circonstance",
          "Est un policier",
          "Ne doit pas traverser"
        ],
        "correctOptionIndex": 1,
        "explanation": "La canne blanche signale une personne non-voyante prioritaire."
      },
      {
        "_id": "q-final-11-6",
        "questionText": "En cas d’accident corporel avec un motard au sol, doit-on lui enlever son casque ?",
        "options": [
          "Oui immédiatement",
          "Non, jamais (sauf arrêt respiratoire par secouriste formé)",
          "Oui pour lui parler",
          "Oui pour le rafraîchir"
        ],
        "correctOptionIndex": 1,
        "explanation": "Retirer le casque peut aggraver un traumatisme cervical fatal."
      },
      {
        "_id": "q-final-11-7",
        "questionText": "Quelle est la probabilité de survie d’un piéton percuté à 30 km/h ?",
        "options": [
          "Environ 20%",
          "Environ 50%",
          "Environ 90%",
          "0%"
        ],
        "correctOptionIndex": 2,
        "explanation": "À 30 km/h, 9 piétons sur 10 survivent à l’impact."
      },
      {
        "_id": "q-final-11-8",
        "questionText": "Où les voitures doivent-elles s’arrêter à un feu tricolore précédé d’un sas vélo ?",
        "options": [
          "Sur le sas vélo",
          "Avant la première ligne d’arrêt du sas vélo",
          "Au feu",
          "Sur le passage piéton"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le sas vélo doit être laissé libre pour les cyclistes."
      },
      {
        "_id": "q-final-11-9",
        "questionText": "Un ballon roule sur la route devant vous, que devez-vous anticiper ?",
        "options": [
          "Le vent",
          "L’irruption immédiate d’un enfant qui court après son ballon",
          "Rien",
          "Un chien"
        ],
        "correctOptionIndex": 1,
        "explanation": "Un enfant suit presque toujours son ballon sur la chaussée."
      },
      {
        "_id": "q-final-11-10",
        "questionText": "En zone 30, les rues à sens unique pour les voitures sont généralement :",
        "options": [
          "Interdites aux vélos",
          "À double sens de circulation pour les cyclistes (double sens cyclable)",
          "Réservées aux camions",
          "Fermées la nuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les double-sens cyclables sont la règle par défaut en zone 30."
      }
    ]
  },
  {
    "_id": "quiz-mod-12",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 12 — Premiers secours et accident",
    "module": {
      "_type": "reference",
      "_ref": "mod-12"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-12-1",
        "questionText": "Que signifie l’acronyme vital PAS lors d’un accident ?",
        "options": [
          "Partir, Appeler, Soigner",
          "Protéger, Alerter, Secourir",
          "Pousser, Aider, Stopper",
          "Prévenir, Attendre, Sauver"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’ordre officiel d’intervention est Protéger, Alerter, Secourir."
      },
      {
        "_id": "q-final-12-2",
        "questionText": "Quel est le numéro d’urgence européen unique gratuit ?",
        "options": [
          "15",
          "17",
          "18",
          "112"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le 112 fonctionne dans toute l’Union européenne."
      },
      {
        "_id": "q-final-12-3",
        "questionText": "Dans quel cas exceptionnel peut-on déplacer un blessé de la route ?",
        "options": [
          "S’il a froid",
          "Uniquement en présence d’un DANGER IMMÉDIAT ET NON CONTRÔLABLE (incendie, noyade)",
          "Pour le mettre dans son lit",
          "Pour libérer la route"
        ],
        "correctOptionIndex": 1,
        "explanation": "Seul un péril mortel imminent justifie un dégagement d’urgence."
      },
      {
        "_id": "q-final-12-4",
        "questionText": "Si une victime inconsciente respire normalement, on la place en :",
        "options": [
          "Position assise",
          "Position Latérale de Sécurité (PLS)",
          "Position debout",
          "Sur le dos les bras croisés"
        ],
        "correctOptionIndex": 1,
        "explanation": "La PLS maintient les voies respiratoires dégagées."
      },
      {
        "_id": "q-final-12-5",
        "questionText": "Le fait de ne pas s’arrêter après un accident que l’on a causé ou subi est qualifié de :",
        "options": [
          "Délit de fuite (3 ans de prison, 75000 € d’amende et 6 points)",
          "Refus d’obtempérer",
          "Simple erreur de parcours",
          "Infraction mineure"
        ],
        "correctOptionIndex": 0,
        "explanation": "C’est un délit de fuite sévèrement puni par la justice."
      },
      {
        "_id": "q-final-12-6",
        "questionText": "Quel numéro joindre pour une urgence médicale vitale directe (SAMU) ?",
        "options": [
          "15",
          "17",
          "18",
          "114"
        ],
        "correctOptionIndex": 0,
        "explanation": "Le 15 est le numéro direct du SAMU en France."
      },
      {
        "_id": "q-final-12-7",
        "questionText": "Combien de compressions thoraciques effectue-t-on avant 2 insufflations lors d’un massage cardiaque ?",
        "options": [
          "10",
          "15",
          "30 compressions",
          "50"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le rythme officiel de réanimation est de 30 compressions pour 2 insufflations."
      },
      {
        "_id": "q-final-12-8",
        "questionText": "À quelle distance minimale poser le triangle de présignalisation sur route ?",
        "options": [
          "5 mètres",
          "Au moins 30 mètres en amont",
          "100 mètres",
          "Sur le coffre"
        ],
        "correctOptionIndex": 1,
        "explanation": "30 mètres minimum pour laisser une distance de freinage aux autres usagers."
      },
      {
        "_id": "q-final-12-9",
        "questionText": "Dans quel délai doit-on faire parvenir un constat amiable à son assurance ?",
        "options": [
          "24 heures",
          "5 jours ouvrés",
          "15 jours",
          "1 mois"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le délai légal de transmission du constat est de 5 jours ouvrés."
      },
      {
        "_id": "q-final-12-10",
        "questionText": "Doit-on donner de l’eau à un blessé d’accident qui réclame à boire ?",
        "options": [
          "Oui un grand verre",
          "Non, jamais rien donner à boire ni à manger",
          "Oui avec du sucre",
          "Oui du café"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’ingestion de liquide peut compliquer les soins ou l’anesthésie d’urgence."
      }
    ]
  },
  {
    "_id": "quiz-mod-13",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 13 — Documents, assurance et responsabilité",
    "module": {
      "_type": "reference",
      "_ref": "mod-13"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-13-1",
        "questionText": "Quel document minimum d’assurance est légalement obligatoire pour circuler ?",
        "options": [
          "Tous risques",
          "Responsabilité civile (« au tiers »)",
          "Vol-incendie",
          "Assurance zéro franchise"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’assurance au tiers (responsabilité civile) est le minimum légal imposé."
      },
      {
        "_id": "q-final-13-2",
        "questionText": "Quel est le capital de départ sur un permis probatoire classique ?",
        "options": [
          "6 points",
          "8 points",
          "10 points",
          "12 points"
        ],
        "correctOptionIndex": 0,
        "explanation": "Le permis commence avec un capital probatoire de 6 points."
      },
      {
        "_id": "q-final-13-3",
        "questionText": "La non-présentation immédiate du permis lors d’un contrôle doit être régularisée sous :",
        "options": [
          "24 heures",
          "5 jours",
          "15 jours",
          "1 mois"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le conducteur dispose de 5 jours pour présenter ses papiers en gendarmerie."
      },
      {
        "_id": "q-final-13-4",
        "questionText": "Combien de points peut-on perdre au maximum lors d’une seule infraction ?",
        "options": [
          "3 points",
          "4 points",
          "6 points",
          "8 points"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le plafond de retrait pour une infraction unique est de 6 points."
      },
      {
        "_id": "q-final-13-5",
        "questionText": "Circuler sans être titulaire du permis de conduire est :",
        "options": [
          "Une contravention",
          "Un délit passible d’une peine de prison et d’une lourde amende",
          "Une faute mineure",
          "Autorisé avec un accompagnateur sans diplôme"
        ],
        "correctOptionIndex": 1,
        "explanation": "La conduite sans permis est un délit pénal."
      },
      {
        "_id": "q-final-13-6",
        "questionText": "En cas de changement d’adresse, la carte grise doit être modifiée dans un délai de :",
        "options": [
          "15 jours",
          "1 mois",
          "3 mois",
          "1 an"
        ],
        "correctOptionIndex": 1,
        "explanation": "La déclaration de changement de domicile doit se faire dans le mois."
      },
      {
        "_id": "q-final-13-7",
        "questionText": "Combien de points permet de récupérer un stage de sensibilisation de 2 jours ?",
        "options": [
          "2 points",
          "4 points au maximum",
          "6 points",
          "12 points"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le stage de sécurité routière permet d’obtenir 4 points."
      },
      {
        "_id": "q-final-13-8",
        "questionText": "L’assurance responsabilité civile au tiers indemnise :",
        "options": [
          "Les dégâts causés aux tiers et autres usagers",
          "La voiture du conducteur responsable",
          "Le vol du véhicule",
          "Les pannes mécaniques"
        ],
        "correctOptionIndex": 0,
        "explanation": "Elle prend en charge les dommages causés aux autres personnes."
      },
      {
        "_id": "q-final-13-9",
        "questionText": "Un conducteur responsable d’un accident avec 1,2 g/l d’alcool dans le sang :",
        "options": [
          "Est couvert à 100% par son assurance",
          "S’expose à la déchéance de garantie et au remboursement des frais",
          "Reçoit un bonus",
          "N’a aucune sanction"
        ],
        "correctOptionIndex": 1,
        "explanation": "L’alcool entraîne la déchéance des garanties contractuelles."
      },
      {
        "_id": "q-final-13-10",
        "questionText": "La lettre 48SI envoyée en recommandé par le Ministère de l’Intérieur notifie :",
        "options": [
          "L’obtention de 12 points",
          "L’invalidation du permis pour solde de points nul",
          "Une convocation à un stage",
          "Une réduction d’assurance"
        ],
        "correctOptionIndex": 1,
        "explanation": "La lettre 48SI acte l’invalidation et l’interdiction de conduire."
      }
    ]
  },
  {
    "_id": "quiz-mod-14",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 14 — Écoconduite et entretien",
    "module": {
      "_type": "reference",
      "_ref": "mod-14"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-14-1",
        "questionText": "L’écoconduite permet une économie moyenne de carburant de l’ordre de :",
        "options": [
          "1%",
          "5%",
          "15 à 25%",
          "50%"
        ],
        "correctOptionIndex": 2,
        "explanation": "L’écoconduite génère 15 à 25% d’économie de carburant."
      },
      {
        "_id": "q-final-14-2",
        "questionText": "À quel moment doit-on vérifier la pression des pneumatiques ?",
        "options": [
          "Tous les ans",
          "Au moins une fois par mois et à froid",
          "Tous les 5 ans",
          "Uniquement l’été"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vérification mensuelle à froid garantit la sécurité et l’économie."
      },
      {
        "_id": "q-final-14-3",
        "questionText": "Un pneu sous-gonflé entraîne :",
        "options": [
          "Une baisse de consommation",
          "Une surconsommation et un risque d’échauffement/éclatement",
          "Une meilleure adhérence",
          "Aucun effet"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le sous-gonflage augmente la résistance au roulement et le risque d’éclatement."
      },
      {
        "_id": "q-final-14-4",
        "questionText": "Lorsque l’on décélère avec une vitesse enclenchée (frein moteur), la consommation est de :",
        "options": [
          "0 litre / 100 km",
          "2 litres / 100 km",
          "5 litres / 100 km",
          "10 litres / 100 km"
        ],
        "correctOptionIndex": 0,
        "explanation": "L’injection est totalement coupée en décélération."
      },
      {
        "_id": "q-final-14-5",
        "questionText": "La vignette Crit’Air sert à :",
        "options": [
          "Payer les autoroutes",
          "Identifier la classe environnementale pour les ZFE et pics de pollution",
          "Contrôler la vitesse",
          "Remplacer la carte grise"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elle classe les véhicules selon leurs émissions polluantes."
      },
      {
        "_id": "q-final-14-6",
        "questionText": "Pour charger les bagages dans le coffre, où positionner les valises les plus lourdes ?",
        "options": [
          "Tout en haut sur la plage arrière",
          "Tout au fond au plancher contre les dossiers de sièges",
          "Sur le côté droit",
          "Sur le capot"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les masses lourdes au plancher stabilisent l’assiette du véhicule."
      },
      {
        "_id": "q-final-14-7",
        "questionText": "Sur autoroute à 130 km/h, rouler vitres grandes ouvertes :",
        "options": [
          "Économise la clim",
          "Augmente fortement la consommation par résistance aérodynamique",
          "Refroidit le moteur",
          "Est sans effet"
        ],
        "correctOptionIndex": 1,
        "explanation": "La traînée aérodynamique freine le véhicule et augmente la consommation."
      },
      {
        "_id": "q-final-14-8",
        "questionText": "L’usage excessif de la climatisation en voiture génère une surconsommation de :",
        "options": [
          "0%",
          "10 à 15%",
          "50%",
          "80%"
        ],
        "correctOptionIndex": 1,
        "explanation": "La climatisation sollicite le moteur et augmente la dépense d’énergie."
      },
      {
        "_id": "q-final-14-9",
        "questionText": "À quel régime moteur passer la vitesse supérieure en conduite souple (essence) ?",
        "options": [
          "À 2000-2500 tr/min",
          "À 4500 tr/min",
          "À 6000 tr/min",
          "À 1000 tr/min"
        ],
        "correctOptionIndex": 0,
        "explanation": "Passer les rapports entre 2000 et 2500 tr/min optimise le rendement."
      },
      {
        "_id": "q-final-14-10",
        "questionText": "Le système Start & Stop permet de :",
        "options": [
          "Accélérer plus fort",
          "Couper automatiquement le moteur à l’arrêt pour réduire pollution et consommation",
          "Couper les phares",
          "Freiner tout seul"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le Start & Stop coupe le moteur aux arrêts prolongés pour économiser l’énergie."
      }
    ]
  },
  {
    "_id": "quiz-mod-15",
    "_type": "quiz",
    "title": "Évaluation Finale — Module 15 — Révisions et examens blancs",
    "module": {
      "_type": "reference",
      "_ref": "mod-15"
    },
    "timerSeconds": 600,
    "scoreMinimum": 80,
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-01-01T00:00:00Z",
    "questions": [
      {
        "_id": "q-final-15-1",
        "questionText": "Pour être reçu à l’examen théorique général du permis B (ETG), le score minimal est de :",
        "options": [
          "30/40",
          "33/40",
          "35/40 (5 fautes maximum)",
          "38/40"
        ],
        "correctOptionIndex": 2,
        "explanation": "35 bonnes réponses sur 40 questions sont obligatoires pour décrocher le code."
      },
      {
        "_id": "q-final-15-2",
        "questionText": "Quelle est la vitesse maximale sur autoroute par temps de pluie (permis confirmé) ?",
        "options": [
          "130 km/h",
          "110 km/h",
          "100 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse sur autoroute est réduite à 110 km/h par temps pluvieux."
      },
      {
        "_id": "q-final-15-3",
        "questionText": "Quel est le taux légal maximal d’alcoolémie pour un jeune conducteur probatoire ?",
        "options": [
          "0,0 g/l",
          "0,2 g/l de sang (tolérance zéro)",
          "0,5 g/l",
          "0,8 g/l"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le seuil probatoire légal est de 0,2 g/l de sang."
      },
      {
        "_id": "q-final-15-4",
        "questionText": "Sur route sèche à 90 km/h, la distance totale d’arrêt est estimée à :",
        "options": [
          "27 m",
          "54 m",
          "81 m",
          "120 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Calcul théorique : 9 x 9 = 81 mètres."
      },
      {
        "_id": "q-final-15-5",
        "questionText": "La règle de sécurité des 2 secondes entre deux véhicules correspond à 130 km/h à :",
        "options": [
          "30 m",
          "50 m",
          "78 mètres (2 traits de BAU)",
          "150 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "13 x 6 = 78 mètres, soit deux bandes blanches de bande d’arrêt d’urgence."
      },
      {
        "_id": "q-final-15-6",
        "questionText": "Quelle est la première action vitale à mener en arrivant sur un accident ?",
        "options": [
          "Secourir",
          "Alerter",
          "Protéger les lieux pour éviter le sur-accident",
          "Prendre des photos"
        ],
        "correctOptionIndex": 2,
        "explanation": "P = Protéger est la première obligation absolue."
      },
      {
        "_id": "q-final-15-7",
        "questionText": "Le port de la ceinture de sécurité est obligatoire :",
        "options": [
          "Uniquement à l’avant",
          "À toutes les places équipées d’un véhicule",
          "Uniquement hors agglomération",
          "Pour le conducteur seul"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tous les passagers doivent boucler leur ceinture."
      },
      {
        "_id": "q-final-15-8",
        "questionText": "Quelle sanction encourt le non-respect d’un feu rouge ou d’un panneau Stop ?",
        "options": [
          "135 € et 1 point",
          "135 € et 4 points de retrait",
          "68 € sans point",
          "Prison ferme"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le refus de priorité au feu rouge ou Stop retire 4 points."
      },
      {
        "_id": "q-final-15-9",
        "questionText": "Dans une « Zone de rencontre », quelle est la vitesse maximale autorisée ?",
        "options": [
          "10 km/h",
          "20 km/h avec priorité absolue aux piétons",
          "30 km/h",
          "50 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse est plafonnée à 20 km/h avec piétons prioritaires sur toute la chaussée."
      },
      {
        "_id": "q-final-15-10",
        "questionText": "Les feux de brouillard arrière sont formellement INTERDITS :",
        "options": [
          "Par temps de brouillard",
          "Par temps de neige",
          "Par temps de pluie (pour cause d’éblouissement)",
          "La nuit"
        ],
        "correctOptionIndex": 2,
        "explanation": "La réverbération de la lumière dans l’eau de pluie éblouit dangereusement les usagers derrière."
      }
    ]
  }
];
