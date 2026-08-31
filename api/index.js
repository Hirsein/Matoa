// src/serverApp.ts
import express from "express";

// src/lib/sanityStore.ts
import { createClient } from "@sanity/client";

// src/lib/permisBData.ts
var PERMIS_B_PROGRAMME = {
  "_id": "prog-permis-b",
  "_type": "programmePermis",
  "typePermis": "B",
  "titreProgramme": "Programme officiel complet Permis B (15 Modules)",
  "descriptionProgramme": "Programme officiel complet du Permis B structur\xE9 en 15 modules p\xE9dagogiques exhaustifs avec cours vid\xE9o, le\xE7ons s\xE9quentielles, mini-quiz d\u2019ancrage et \xE9valuations finales certifiantes de 10 questions.",
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
var PERMIS_B_MODULES = [
  {
    "_id": "mod-1",
    "_type": "moduleFormation",
    "code": "MOD-001",
    "title": "Module 1 \u2014 Comprendre le v\xE9hicule",
    "summary": "D\xE9couverte des grandes parties d'un v\xE9hicule l\xE9ger, du poste de conduite et de ses commandes, des voyants d'alerte et des syst\xE8mes de s\xE9curit\xE9 active et passive.",
    "learningObjectives": [
      "Identifier et nommer les parties principales de la carrosserie, du moteur et des essieux",
      "Ma\xEEtriser les r\xE9glages ergonomiques et les commandes du poste de conduite",
      "Comprendre la signification des t\xE9moins et voyants lumineux du tableau de bord",
      "Conna\xEEtre les \xE9quipements de s\xE9curit\xE9 (ceintures, airbags, ABS, pneus, contr\xF4le technique)"
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
        "title": "Le\xE7on 1.1 \u2014 Les parties principales de la voiture",
        "ordre": 1,
        "description": "D\xE9couverte des grandes parties d\u2019un v\xE9hicule l\xE9ger : carrosserie, moteur, habitacle, coffre, essieux, roues, leurs fonctions et le vocabulaire utilis\xE9.",
        "videoUrl": "https://www.youtube.com/watch?v=jnJH8szTGuM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-1-1",
            "questionText": "O\xF9 se situe g\xE9n\xE9ralement le moteur de la plupart des voitures l\xE9g\xE8res ?",
            "options": [
              "Dans le coffre arri\xE8re",
              "Sous le capot avant",
              "Sous les si\xE8ges passagers",
              "Dans les porti\xE8res"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le moteur est majoritairement plac\xE9 sous le capot \xE0 l\u2019avant du v\xE9hicule."
          },
          {
            "_id": "q-lec-1-1-2",
            "questionText": "Quelle est la fonction essentielle de la carrosserie moderne ?",
            "options": [
              "R\xF4le uniquement d\xE9coratif",
              "Prot\xE9ger l\u2019habitacle en absorbant l\u2019\xE9nergie des chocs",
              "Augmenter le poids",
              "Conserver le moteur au froid"
            ],
            "correctOptionIndex": 1,
            "explanation": "La carrosserie absorbe l\u2019\xE9nergie des impacts pour prot\xE9ger les occupants."
          },
          {
            "_id": "q-lec-1-1-3",
            "questionText": "Comment appelle-t-on l\u2019espace int\xE9rieur r\xE9serv\xE9 aux passagers et au conducteur ?",
            "options": [
              "Le ch\xE2ssis",
              "L\u2019habitacle",
              "Le compartiment moteur",
              "Le coffre"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019habitacle est l\u2019espace de vie int\xE9rieur du v\xE9hicule."
          },
          {
            "_id": "q-lec-1-1-4",
            "questionText": "Que relie un essieu sur une voiture ?",
            "options": [
              "Le volant aux r\xE9troviseurs",
              "Les roues oppos\xE9es d\u2019un m\xEAme train",
              "Les phares \xE0 la batterie",
              "L\u2019\xE9chappement"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019essieu supporte les roues oppos\xE9es d\u2019un m\xEAme axe."
          },
          {
            "_id": "q-lec-1-1-5",
            "questionText": "Pourquoi conna\xEEtre le vocabulaire des composants du v\xE9hicule ?",
            "options": [
              "Pour r\xE9duire l\u2019assurance",
              "Pour r\xE9ussir les v\xE9rifications de l\u2019examen pratique",
              "Pour r\xE9parer le moteur soi-m\xEAme",
              "Ce n\u2019est pas utile"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ce vocabulaire est directement \xE9valu\xE9 lors des v\xE9rifications au permis."
          }
        ]
      },
      {
        "_id": "lec-1-2",
        "_type": "lecon",
        "title": "Le\xE7on 1.2 \u2014 Le poste de conduite et les commandes",
        "ordre": 2,
        "description": "Volant, p\xE9dales, levier de vitesses, frein \xE0 main, clignotants, essuie-glaces et r\xE9glages avant d\xE9part.",
        "videoUrl": "https://www.youtube.com/watch?v=P9ZXwt5XvGk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-2-1",
            "questionText": "Dans quel ordre doit-on r\xE9gler son poste de conduite ?",
            "options": [
              "R\xE9troviseurs, si\xE8ge, ceinture",
              "Si\xE8ge/dossier, r\xE9troviseurs, volant puis ceinture",
              "Ceinture en premier, puis si\xE8ge",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "On r\xE8gle l\u2019assise, puis les r\xE9troviseurs et le volant, et enfin la ceinture."
          },
          {
            "_id": "q-lec-1-2-2",
            "questionText": "Quel pied actionne la p\xE9dale d\u2019embrayage sur bo\xEEte m\xE9canique ?",
            "options": [
              "Le pied gauche uniquement",
              "Le pied droit",
              "Les deux pieds",
              "La main droite"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le pied gauche est exclusivement r\xE9serv\xE9 \xE0 l\u2019embrayage."
          },
          {
            "_id": "q-lec-1-2-3",
            "questionText": "\xC0 quoi sert le frein de stationnement (frein \xE0 main) ?",
            "options": [
              "\xC0 ralentir en virage",
              "\xC0 maintenir le v\xE9hicule totalement immobilis\xE9 \xE0 l\u2019arr\xEAt",
              "\xC0 passer la marche arri\xE8re",
              "\xC0 freiner d\u2019urgence"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il bloque m\xE9caniquement les roues \xE0 l\u2019arr\xEAt ou au stationnement."
          },
          {
            "_id": "q-lec-1-2-4",
            "questionText": "Quelle est la position id\xE9ale des mains sur le volant ?",
            "options": [
              "\xC0 12h00",
              "\xC0 9h15 ou 10h10",
              "\xC0 6h00",
              "Une seule main en haut"
            ],
            "correctOptionIndex": 1,
            "explanation": "La position 9h15 ou 10h10 assure pr\xE9cision et s\xE9curit\xE9 airbag."
          },
          {
            "_id": "q-lec-1-2-5",
            "questionText": "Comment r\xE9gler son r\xE9troviseur int\xE9rieur ?",
            "options": [
              "Pour voir son visage",
              "Pour cadrer toute la lunette arri\xE8re",
              "Vers le toit",
              "Vers le bas"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il doit cadrer l\u2019int\xE9gralit\xE9 de la vitre arri\xE8re sans bouger la t\xEAte."
          }
        ]
      },
      {
        "_id": "lec-1-3",
        "_type": "lecon",
        "title": "Le\xE7on 1.3 \u2014 Tableau de bord, voyants et t\xE9moins",
        "ordre": 3,
        "description": "Voyants de feux, carburant, huile, temp\xE9rature moteur, freins et batterie ; conduite \xE0 tenir selon l\u2019alerte.",
        "videoUrl": "https://www.youtube.com/watch?v=4T35JP22iPA",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-3-1",
            "questionText": "Que signifie l\u2019allumage d\u2019un voyant de couleur ROUGE en roulant ?",
            "options": [
              "Information simple",
              "Danger grave : arr\xEAt imm\xE9diat obligatoire en s\xE9curit\xE9",
              "Feux de route allum\xE9s",
              "Rappel r\xE9vision"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les voyants rouges imposent un arr\xEAt imm\xE9diat pour \xE9viter un accident ou une casse moteur."
          },
          {
            "_id": "q-lec-1-3-2",
            "questionText": "Quelle couleur indique un voyant d\u2019avertissement ou de d\xE9faut non imm\xE9diat ?",
            "options": [
              "Rouge",
              "Orange / Jaune",
              "Bleu",
              "Blanc"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019orange signale une anomalie \xE0 faire v\xE9rifier rapidement sans arr\xEAt d\u2019urgence."
          },
          {
            "_id": "q-lec-1-3-3",
            "questionText": "Si le voyant rouge d\u2019huile s\u2019allume en circulation, vous devez :",
            "options": [
              "Acc\xE9l\xE9rer",
              "Vous arr\xEAter d\xE8s que possible en s\xE9curit\xE9 et couper le moteur",
              "Continuer le trajet",
              "Mettre la climatisation"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le manque de pression d\u2019huile d\xE9truit le moteur en quelques secondes."
          },
          {
            "_id": "q-lec-1-3-4",
            "questionText": "De quelle couleur est le t\xE9moin des feux de route ?",
            "options": [
              "Vert",
              "Bleu",
              "Orange",
              "Rouge"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le t\xE9moin des feux de route (pleins phares) est toujours bleu."
          },
          {
            "_id": "q-lec-1-3-5",
            "questionText": "\xC0 quoi sert la jauge de temp\xE9rature du liquide de refroidissement ?",
            "options": [
              "\xC0 mesurer l\u2019air de l\u2019habitacle",
              "\xC0 surveiller la temp\xE9rature de fonctionnement du moteur",
              "\xC0 mesurer la vitesse",
              "\xC0 r\xE9gler le chauffage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elle alerte en cas de surchauffe anormale du moteur."
          }
        ]
      },
      {
        "_id": "lec-1-4",
        "_type": "lecon",
        "title": "Le\xE7on 1.4 \u2014 Syst\xE8mes de s\xE9curit\xE9 du v\xE9hicule",
        "ordre": 4,
        "description": "Ceintures, airbags, ABS, pneus, contr\xF4le technique et v\xE9rifications avant de prendre la route.",
        "videoUrl": "https://www.youtube.com/watch?v=mRT5Jyu9lG0",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-1-4-1",
            "questionText": "Quel est le r\xF4le principal du syst\xE8me ABS lors d\u2019un freinage d\u2019urgence ?",
            "options": [
              "Diviser la distance par deux",
              "Emp\xEAcher le blocage des roues pour garder le pouvoir directionnel",
              "Couper le moteur",
              "Acc\xE9l\xE9rer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019ABS \xE9vite le blocage des roues et permet de continuer \xE0 diriger la voiture."
          },
          {
            "_id": "q-lec-1-4-2",
            "questionText": "Quelle est la profondeur minimale l\xE9gale des sculptures d\u2019un pneu ?",
            "options": [
              "0,5 mm",
              "1,6 mm",
              "3,0 mm",
              "4,0 mm"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite l\xE9gale d\u2019usure est de 1,6 mm sur toute la bande de roulement."
          },
          {
            "_id": "q-lec-1-4-3",
            "questionText": "Le port de la ceinture de s\xE9curit\xE9 est obligatoire pour :",
            "options": [
              "Le conducteur seul",
              "Les places avant",
              "Tous les occupants du v\xE9hicule",
              "Hors agglom\xE9ration seulement"
            ],
            "correctOptionIndex": 2,
            "explanation": "La ceinture est obligatoire \xE0 toutes les places \xE9quip\xE9es."
          },
          {
            "_id": "q-lec-1-4-4",
            "questionText": "\xC0 quelle fr\xE9quence passe le contr\xF4le technique d\u2019une voiture de plus de 4 ans ?",
            "options": [
              "Tous les ans",
              "Tous les 2 ans",
              "Tous les 3 ans",
              "Tous les 5 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le contr\xF4le technique p\xE9riodique doit \xEAtre renouvel\xE9 tous les 2 ans."
          },
          {
            "_id": "q-lec-1-4-5",
            "questionText": "L\u2019airbag remplace-t-il la ceinture de s\xE9curit\xE9 ?",
            "options": [
              "Oui",
              "Non, c\u2019est un compl\xE9ment indispensable \xE0 la ceinture",
              "Uniquement en ville",
              "Uniquement pour le passager"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019airbag fonctionne obligatoirement en symbiose avec la ceinture attach\xE9e."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-2",
    "_type": "moduleFormation",
    "code": "MOD-002",
    "title": "Module 2 \u2014 R\xE8gles g\xE9n\xE9rales de circulation",
    "summary": "Ma\xEEtrise du sens de circulation, du positionnement sur la chauss\xE9e, des changements de direction, des arr\xEAts et stationnements, et du partage de la route.",
    "learningObjectives": [
      "Savoir se positionner sur la chauss\xE9e selon les voies et lignes",
      "Ma\xEEtriser les contr\xF4les r\xE9troviseurs et angles morts pour changer de direction",
      "Distinguer l'arr\xEAt du stationnement et identifier les zones interdites",
      "Partager la route en s\xE9curit\xE9 avec les usagers vuln\xE9rables et poids lourds"
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
        "title": "Le\xE7on 2.1 \u2014 Sens de circulation et position sur la chauss\xE9e",
        "ordre": 1,
        "description": "Circulation \xE0 droite, lignes continues et discontinues, voies r\xE9serv\xE9es, bande d\u2019arr\xEAt d\u2019urgence et positionnement.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-1-1",
            "questionText": "De quel c\xF4t\xE9 de la chauss\xE9e doit-on circuler en marche normale ?",
            "options": [
              "Au milieu",
              "Le plus pr\xE8s possible du bord droit",
              "\xC0 gauche",
              "O\xF9 on veut"
            ],
            "correctOptionIndex": 1,
            "explanation": "En France, la circulation s\u2019effectue sur le c\xF4t\xE9 droit de la route."
          },
          {
            "_id": "q-lec-2-1-2",
            "questionText": "Peut-on franchir une ligne blanche continue ?",
            "options": [
              "Oui pour aller plus vite",
              "Non, c\u2019est strictement interdit sauf exceptions r\xE9glementaires",
              "Oui avec le clignotant",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Franchir une ligne continue est une infraction grave (3 points)."
          },
          {
            "_id": "q-lec-2-1-3",
            "questionText": "\xC0 quoi sert la bande d\u2019arr\xEAt d\u2019urgence (BAU) ?",
            "options": [
              "\xC0 doubler les bouchons",
              "Strictement aux arr\xEAts d\u2019urgence en cas de panne ou malaise",
              "\xC0 t\xE9l\xE9phoner",
              "\xC0 faire une pause"
            ],
            "correctOptionIndex": 1,
            "explanation": "La BAU est exclusivement r\xE9serv\xE9e aux urgences et aux secours."
          },
          {
            "_id": "q-lec-2-1-4",
            "questionText": "Sur autoroute \xE0 3 voies, quelle voie occuper en trafic fluide ?",
            "options": [
              "La voie du milieu",
              "La voie de gauche",
              "La voie de droite",
              "Au choix"
            ],
            "correctOptionIndex": 2,
            "explanation": "On roule toujours sur la voie de droite hors man\u0153uvre de d\xE9passement."
          },
          {
            "_id": "q-lec-2-1-5",
            "questionText": "Peut-on circuler dans une voie r\xE9serv\xE9e aux bus ?",
            "options": [
              "Oui pour tourner",
              "Non, c\u2019est strictement interdit aux voitures",
              "Oui si on va vite",
              "Le week-end oui"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les couloirs de bus sont r\xE9serv\xE9s aux transports collectifs autoris\xE9s."
          }
        ]
      },
      {
        "_id": "lec-2-2",
        "_type": "lecon",
        "title": "Le\xE7on 2.2 \u2014 Changements de direction et insertion",
        "ordre": 2,
        "description": "Utilisation des clignotants, contr\xF4les r\xE9troviseurs/angles morts et insertion sur voie rapide.",
        "videoUrl": "https://www.youtube.com/watch?v=P9ZXwt5XvGk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-2-1",
            "questionText": "Avant de changer de direction, quelle est la premi\xE8re action ?",
            "options": [
              "Acc\xE9l\xE9rer",
              "Contr\xF4ler r\xE9troviseurs et angle mort",
              "Klaxonner",
              "Freiner"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019observation visuelle compl\xE8te pr\xE9c\xE8de toujours le clignotant."
          },
          {
            "_id": "q-lec-2-2-2",
            "questionText": "Le clignotant donne-t-il la priorit\xE9 ?",
            "options": [
              "Oui toujours",
              "Non, il avertit de l\u2019intention sans donner la priorit\xE9",
              "Oui sur autoroute",
              "Oui en ville"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le clignotant pr\xE9vient mais ne conf\xE8re aucun droit de priorit\xE9."
          },
          {
            "_id": "q-lec-2-2-3",
            "questionText": "Qu\u2019est-ce que l\u2019angle mort ?",
            "options": [
              "Une route sombre",
              "Une zone masqu\xE9e hors du champ des r\xE9troviseurs",
              "Un virage serr\xE9",
              "L\u2019arri\xE8re du v\xE9hicule"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est la zone invisible sans un coup d\u2019\u0153il direct par-dessus l\u2019\xE9paule."
          },
          {
            "_id": "q-lec-2-2-4",
            "questionText": "Sur une voie d\u2019insertion, que doit-on faire ?",
            "options": [
              "S\u2019arr\xEAter au d\xE9but",
              "Acc\xE9l\xE9rer pour atteindre la vitesse du trafic et s\u2019ins\xE9rer",
              "Forcer le passage",
              "Rouler \xE0 30 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La voie d\u2019insertion sert \xE0 synchroniser sa vitesse pour s\u2019int\xE9grer fluidement."
          },
          {
            "_id": "q-lec-2-2-5",
            "questionText": "Pour tourner \xE0 gauche dans une rue \xE0 sens unique, on se place :",
            "options": [
              "\xC0 droite",
              "Le plus \xE0 gauche possible avant le carrefour",
              "Au milieu",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "En sens unique, on serre compl\xE8tement \xE0 gauche pour tourner \xE0 gauche."
          }
        ]
      },
      {
        "_id": "lec-2-3",
        "_type": "lecon",
        "title": "Le\xE7on 2.3 \u2014 Arr\xEAt, stationnement et immobilisation",
        "ordre": 3,
        "description": "Diff\xE9rence entre arr\xEAt et stationnement, zones interdites, r\xE8gles pour ne pas g\xEAner les usagers.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-3-1",
            "questionText": "Quelle est la d\xE9finition l\xE9gale d\u2019un arr\xEAt ?",
            "options": [
              "Une pause de 10 min",
              "Immobilisation temporaire avec conducteur \xE0 proximit\xE9 pour monter/descendre ou charger",
              "Stationner moteur allum\xE9",
              "Bloquer la route"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 l\u2019arr\xEAt, le conducteur reste au volant ou \xE0 port\xE9e pour d\xE9placer la voiture."
          },
          {
            "_id": "q-lec-2-3-2",
            "questionText": "Le stationnement sur un passage pi\xE9ton est :",
            "options": [
              "Autoris\xE9 5 minutes",
              "Tr\xE8s g\xEAnant et dangereux (amende et fourri\xE8re)",
              "Gratuit",
              "Tol\xE9r\xE9 la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est une infraction grave qui masque la visibilit\xE9 des pi\xE9tons."
          },
          {
            "_id": "q-lec-2-3-3",
            "questionText": "Une ligne jaune continue le long du trottoir indique :",
            "options": [
              "Stationnement gratuit",
              "Arr\xEAt et stationnement strictement interdits",
              "Arr\xEAt autoris\xE9",
              "R\xE9serv\xE9 aux livraisons"
            ],
            "correctOptionIndex": 1,
            "explanation": "La ligne jaune continue prohibe tout arr\xEAt et stationnement."
          },
          {
            "_id": "q-lec-2-3-4",
            "questionText": "Une ligne jaune discontinue en pointill\xE9s indique :",
            "options": [
              "Stationnement libre",
              "Arr\xEAt autoris\xE9, stationnement interdit",
              "Arr\xEAt et stationnement interdits",
              "Parking payant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les pointill\xE9s jaunes autorisent l\u2019arr\xEAt rapide mais interdisent le stationnement."
          },
          {
            "_id": "q-lec-2-3-5",
            "questionText": "En stationnement en descente, comment braquer les roues ?",
            "options": [
              "Vers la chauss\xE9e",
              "Vers le trottoir",
              "Tout droit",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "Braquer vers le trottoir cale le v\xE9hicule en cas de d\xE9faillance du frein."
          }
        ]
      },
      {
        "_id": "lec-2-4",
        "_type": "lecon",
        "title": "Le\xE7on 2.4 \u2014 Partage de la route avec les autres usagers",
        "ordre": 4,
        "description": "Cohabitation avec pi\xE9tons, cyclistes, motocyclistes et poids lourds ; distances lat\xE9rales et anticipation.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-2-4-1",
            "questionText": "Distance lat\xE9rale minimale pour d\xE9passer un cycliste en ville ?",
            "options": [
              "0,5 m",
              "1,0 m",
              "1,5 m",
              "2,0 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "En agglom\xE9ration, l\u2019\xE9cart minimal de s\xE9curit\xE9 est de 1 m\xE8tre."
          },
          {
            "_id": "q-lec-2-4-2",
            "questionText": "Face \xE0 un pi\xE9ton engag\xE9 ou manifestant l\u2019intention de traverser :",
            "options": [
              "Klaxonner",
              "Lui c\xE9der obligatoirement le passage",
              "Acc\xE9l\xE9rer",
              "Passer \xE0 c\xF4t\xE9"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le pi\xE9ton a la priorit\xE9 absolue d\xE8s qu\u2019il manifeste l\u2019intention de traverser."
          },
          {
            "_id": "q-lec-2-4-3",
            "questionText": "Pourquoi redoubler de vigilance pr\xE8s des poids lourds ?",
            "options": [
              "Ils roulent trop vite",
              "Ils ont d\u2019immenses angles morts autour de leur cabine",
              "Leurs freins sont faibles",
              "Ils n\u2019ont pas de phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leurs grands angles morts masquent compl\xE8tement les voitures et deux-roues."
          },
          {
            "_id": "q-lec-2-4-4",
            "questionText": "Qu\u2019est-ce qu\u2019un sas v\xE9lo devant un feu ?",
            "options": [
              "Un parking",
              "Une zone r\xE9serv\xE9e aux cyclistes pour \xEAtre vus et d\xE9marrer en s\xE9curit\xE9",
              "Un passage pi\xE9ton",
              "Une voie rapide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les automobilistes doivent s\u2019arr\xEAter avant la premi\xE8re ligne du sas v\xE9lo."
          },
          {
            "_id": "q-lec-2-4-5",
            "questionText": "Quelle attitude avoir envers les deux-roues motoris\xE9s ?",
            "options": [
              "Les bloquer",
              "V\xE9rifier ses angles morts et faciliter leur passage",
              "Klaxonner",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les motards sont vuln\xE9rables : une vigilance accrue est indispensable."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-3",
    "_type": "moduleFormation",
    "code": "MOD-003",
    "title": "Module 3 \u2014 Signalisation routi\xE8re",
    "summary": "Apprentissage des familles de panneaux (danger, interdiction, obligation, indication), des marquages au sol et des feux de circulation.",
    "learningObjectives": [
      "Identifier instantan\xE9ment la forme et la couleur de chaque famille de panneaux",
      "Appliquer les r\xE8gles associ\xE9es aux panneaux de danger, interdiction et obligation",
      "Lire et suivre la signalisation d'indication, de direction et de localisation",
      "Comprendre la hi\xE9rarchie de la signalisation routi\xE8re (agents, feux, panneaux, marquage)"
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
        "title": "Le\xE7on 3.1 \u2014 Panneaux de danger",
        "ordre": 1,
        "description": "Panneaux triangulaires \xE0 bord rouge : virages, chauss\xE9e glissante, r\xE9tr\xE9cissement et comportement adapt\xE9.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-1-1",
            "questionText": "\xC0 quelle distance est implant\xE9 un panneau de danger hors agglom\xE9ration ?",
            "options": [
              "\xC0 50 m",
              "\xC0 150 m du danger",
              "\xC0 500 m",
              "Au niveau du danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "Hors agglom\xE9ration, la vitesse impose de signaler le danger 150 m en amont."
          },
          {
            "_id": "q-lec-3-1-2",
            "questionText": "Quelle est la forme caract\xE9ristique d\u2019un panneau de danger ?",
            "options": [
              "Rond \xE0 bord rouge",
              "Triangulaire avec bordure rouge",
              "Carr\xE9 \xE0 fond bleu",
              "Octogonal"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les signaux de danger sont triangulaires point\xE9s vers le haut avec bordure rouge."
          },
          {
            "_id": "q-lec-3-1-3",
            "questionText": "Que faire \xE0 la vue d\u2019un panneau de virage dangereux ?",
            "options": [
              "Acc\xE9l\xE9rer",
              "Ralentir et adapter son allure avant d\u2019aborder la courbe",
              "Klaxonner",
              "Allumer les feux de d\xE9tresse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le ralentissement doit \xEAtre op\xE9r\xE9 avant l\u2019inscription dans le virage."
          },
          {
            "_id": "q-lec-3-1-4",
            "questionText": "\xC0 quelle distance est implant\xE9 un panneau de danger en ville ?",
            "options": [
              "\xC0 15 m",
              "\xC0 50 m",
              "\xC0 150 m",
              "\xC0 300 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "En agglom\xE9ration, l\u2019implantation standard est \xE0 50 m\xE8tres du danger."
          },
          {
            "_id": "q-lec-3-1-5",
            "questionText": "Que signifie un panneau de danger \xE0 fond JAUNE ?",
            "options": [
              "Danger permanent",
              "Danger temporaire (travaux/chantier)",
              "Obligation",
              "Information"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le fond jaune caract\xE9rise les signaux temporaires de chantier."
          }
        ]
      },
      {
        "_id": "lec-3-2",
        "_type": "lecon",
        "title": "Le\xE7on 3.2 \u2014 Panneaux d\u2019interdiction et d\u2019obligation",
        "ordre": 2,
        "description": "Panneaux rouges d\u2019interdiction et bleus d\u2019obligation : vitesses, d\xE9passement et directions impos\xE9es.",
        "videoUrl": "https://www.youtube.com/watch?v=SkdobnZSqIE",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-2-1",
            "questionText": "\xC0 partir de quel endroit s\u2019applique un panneau d\u2019interdiction ?",
            "options": [
              "\xC0 150 m",
              "Imm\xE9diatement \xE0 hauteur du panneau",
              "Le lendemain",
              "Au prochain virage"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les interdictions prennent effet d\xE8s la hauteur du panneau."
          },
          {
            "_id": "q-lec-3-2-2",
            "questionText": "Quelle est la forme et couleur des panneaux d\u2019obligation ?",
            "options": [
              "Carr\xE9 vert",
              "Rond \xE0 fond bleu avec symbole blanc",
              "Triangulaire rouge",
              "Rectangle blanc"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les panneaux d\u2019obligation sont ronds \xE0 fond bleu."
          },
          {
            "_id": "q-lec-3-2-3",
            "questionText": "Que signifie un panneau rond blanc barr\xE9 d\u2019une bande noire ?",
            "options": [
              "Interdiction",
              "Fin de toutes les interdictions pr\xE9c\xE9demment notifi\xE9es",
              "Route barr\xE9e",
              "P\xE9age"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il indique la fin des prescriptions de vitesse et de d\xE9passement."
          },
          {
            "_id": "q-lec-3-2-4",
            "questionText": "Un panneau rond bleu avec fl\xE8che \xE0 droite impose :",
            "options": [
              "Interdiction \xE0 droite",
              "Obligation de tourner \xE0 droite",
              "Impasse",
              "Sens unique"
            ],
            "correctOptionIndex": 1,
            "explanation": "La fl\xE8che blanche sur fond bleu oblige \xE0 emprunter la direction indiqu\xE9e."
          },
          {
            "_id": "q-lec-3-2-5",
            "questionText": "Le panneau d\u2019interdiction de d\xE9passer (deux voitures rouge/noire) s\u2019applique :",
            "options": [
              "Aux camions seulement",
              "\xC0 tous les v\xE9hicules \xE0 moteur de plus de 2 roues",
              "Aux v\xE9los",
              "Aux pi\xE9tons"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il interdit le d\xE9passement de tous les v\xE9hicules \xE0 moteur \xE0 3 ou 4 roues."
          }
        ]
      },
      {
        "_id": "lec-3-3",
        "_type": "lecon",
        "title": "Le\xE7on 3.3 \u2014 Panneaux d\u2019indication et de direction",
        "ordre": 3,
        "description": "Panneaux de services, informations et directions pour suivre un itin\xE9raire.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-3-1",
            "questionText": "Quelle est la forme des panneaux d\u2019indication ?",
            "options": [
              "Triangulaire",
              "Carr\xE9e ou rectangulaire",
              "Ronde",
              "Ovale"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les signaux d\u2019indication sont carr\xE9s ou rectangulaires."
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
            "explanation": "Le bleu est la couleur exclusive du r\xE9seau autoroutier."
          },
          {
            "_id": "q-lec-3-3-3",
            "questionText": "Quelle couleur indique un itin\xE9raire important hors autoroute ?",
            "options": [
              "Bleu",
              "Vert",
              "Blanc",
              "Marron"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le vert relie les grandes villes sur le r\xE9seau routier principal."
          },
          {
            "_id": "q-lec-3-3-4",
            "questionText": "Que signalent les panneaux \xE0 fond MARRON ?",
            "options": [
              "Des dangers",
              "Des sites d\u2019int\xE9r\xEAt touristique ou culturel",
              "Des interdictions",
              "Des h\xF4pitaux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le fond marron est r\xE9serv\xE9 \xE0 la signalisation touristique et historique."
          },
          {
            "_id": "q-lec-3-3-5",
            "questionText": "Un panneau carr\xE9 bleu avec un pictogramme de lit indique :",
            "options": [
              "Une aire de jeux",
              "Un h\xF4tel ou h\xE9bergement",
              "Une aire de repos",
              "Un h\xF4pital"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est un signal de service indiquant un h\xF4tel."
          }
        ]
      },
      {
        "_id": "lec-3-4",
        "_type": "lecon",
        "title": "Le\xE7on 3.4 \u2014 Marquages au sol et feux de circulation",
        "ordre": 4,
        "description": "Lignes, z\xE9bras, passages pi\xE9tons, fl\xE8ches et feux tricolores ; hi\xE9rarchie de la signalisation.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-3-4-1",
            "questionText": "En cas de contradiction, quelle autorit\xE9 pr\xE9vaut absolument ?",
            "options": [
              "Les panneaux",
              "Les feux tricolores",
              "Les agents r\xE9glant la circulation",
              "Le marquage"
            ],
            "correctOptionIndex": 2,
            "explanation": "Les ordres des agents de police pr\xE9valent sur toute autre signalisation."
          },
          {
            "_id": "q-lec-3-4-2",
            "questionText": "Que faire \xE0 l\u2019approche d\u2019un feu jaune (orange) fixe ?",
            "options": [
              "Acc\xE9l\xE9rer",
              "S\u2019arr\xEAter sauf en cas d\u2019impossibilit\xE9 de le faire en s\xE9curit\xE9",
              "Klaxonner",
              "Faire demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019arr\xEAt est obligatoire au feu orange fixe sauf danger imm\xE9diat \xE0 l\u2019arri\xE8re."
          },
          {
            "_id": "q-lec-3-4-3",
            "questionText": "Que signifient des z\xE9bras au sol ?",
            "options": [
              "Stationnement rapide",
              "Zone strictement interdite \xE0 la circulation, l\u2019arr\xEAt et le stationnement",
              "Piste cyclable",
              "Passage pi\xE9ton"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les z\xE9bras sont sanctuaris\xE9s : interdiction totale d\u2019y p\xE9n\xE9trer."
          },
          {
            "_id": "q-lec-3-4-4",
            "questionText": "Que signifie un feu jaune clignotant ?",
            "options": [
              "Feu en panne : respecter les panneaux sous le feu ou la priorit\xE9 \xE0 droite",
              "Arr\xEAt obligatoire",
              "Rouler \xE0 90 km/h",
              "Passer sans regarder"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le clignotant jaune invite \xE0 la prudence et renvoie aux r\xE8gles de priorit\xE9."
          },
          {
            "_id": "q-lec-3-4-5",
            "questionText": "Des fl\xE8ches de rabattement au sol annoncent :",
            "options": [
              "Un virage",
              "L\u2019imminence d\u2019une ligne continue obligeant \xE0 se rabattre",
              "Une station-service",
              "Une sortie"
            ],
            "correctOptionIndex": 1,
            "explanation": "Trois fl\xE8ches successives signalent la fermeture de la voie de d\xE9passement."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-4",
    "_type": "moduleFormation",
    "code": "MOD-004",
    "title": "Module 4 \u2014 Feux et priorit\xE9s",
    "summary": "R\xE8gles de priorit\xE9 \xE0 droite, panneaux Stop et C\xE9dez le passage, feux tricolores, v\xE9hicules prioritaires et cas particuliers.",
    "learningObjectives": [
      "Appliquer la r\xE8gle de la priorit\xE9 \xE0 droite en l'absence de signalisation",
      "Respecter l'arr\xEAt absolu au Stop et l'obligation du C\xE9dez le passage",
      "Ma\xEEtriser les feux tricolores, fl\xE8ches directionnelles et feux clignotants",
      "Faciliter le passage des v\xE9hicules d'urgence prioritaires (SAMU, Police, Pompiers)"
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
        "title": "Le\xE7on 4.1 \u2014 La r\xE8gle de la priorit\xE9 \xE0 droite",
        "ordre": 1,
        "description": "Application de la priorit\xE9 \xE0 droite en l\u2019absence de signalisation et cas particuliers.",
        "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-1-1",
            "questionText": "Quand s\u2019applique la r\xE8gle de la priorit\xE9 \xE0 droite ?",
            "options": [
              "Uniquement sur autoroute",
              "\xC0 toute intersection d\xE9pourvue de signalisation de priorit\xE9",
              "Quand le feu est vert",
              "Sur route prioritaire"
            ],
            "correctOptionIndex": 1,
            "explanation": "En l\u2019absence de panneau ou de feu, la priorit\xE9 \xE0 droite est la r\xE8gle g\xE9n\xE9rale."
          },
          {
            "_id": "q-lec-4-1-2",
            "questionText": "Un v\xE9hicule sort d\u2019une cour priv\xE9e ou d\u2019un chemin de terre :",
            "options": [
              "Il a la priorit\xE9 \xE0 droite",
              "Il doit c\xE9der le passage \xE0 tous les usagers de la route",
              "Il passe en premier s\u2019il va vite",
              "Il a priorit\xE9 sur les pi\xE9tons"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les sorties de propri\xE9t\xE9s priv\xE9es et chemins de terre n\u2019ont jamais la priorit\xE9 \xE0 droite."
          },
          {
            "_id": "q-lec-4-1-3",
            "questionText": "\xC0 l\u2019approche d\u2019une priorit\xE9 \xE0 droite sans visibilit\xE9, vous devez :",
            "options": [
              "Acc\xE9l\xE9rer",
              "Ralentir et pr\xE9parer le pied au-dessus du frein",
              "Klaxonner",
              "Allumer les feux de d\xE9tresse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut ralentir et v\xE9rifier l\u2019absence de v\xE9hicule arrivant sur votre droite."
          },
          {
            "_id": "q-lec-4-1-4",
            "questionText": "Dans une intersection \xE0 4 branches toutes r\xE9gies par la priorit\xE9 \xE0 droite, qui passe ?",
            "options": [
              "Le plus gros v\xE9hicule",
              "La courtoisie et un signe mutuel d\xE9bloquent la situation",
              "Le plus rapide",
              "Personne ne passe jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "La courtoisie et la communication visuelle permettent de d\xE9bloquer l\u2019intersection."
          },
          {
            "_id": "q-lec-4-1-5",
            "questionText": "Le panneau \xAB Croix de Saint-Andr\xE9 \xBB (X rouge sur triangle) annonce :",
            "options": [
              "Un h\xF4pital",
              "Une intersection o\xF9 s\u2019applique la priorit\xE9 \xE0 droite",
              "Un passage pi\xE9ton",
              "Une interdiction"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ce panneau triangulaire rappelle explicitement la priorit\xE9 \xE0 droite \xE0 la prochaine intersection."
          }
        ]
      },
      {
        "_id": "lec-4-2",
        "_type": "lecon",
        "title": "Le\xE7on 4.2 \u2014 Panneaux Stop et C\xE9dez le passage",
        "ordre": 2,
        "description": "Arr\xEAt obligatoire au Stop et obligation de c\xE9der le passage lorsqu\u2019il y a lieu.",
        "videoUrl": "https://www.youtube.com/watch?v=KBTd5Vh-smw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-2-1",
            "questionText": "Face \xE0 un panneau STOP, o\xF9 doit-on marquer l\u2019arr\xEAt ?",
            "options": [
              "Au niveau du panneau",
              "\xC0 la ligne blanche continue peinte au sol",
              "Au milieu du carrefour",
              "10 m avant"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019arr\xEAt complet se fait au niveau de la ligne blanche transversale du Stop."
          },
          {
            "_id": "q-lec-4-2-2",
            "questionText": "Si la voie est totalement libre au panneau STOP, l\u2019arr\xEAt est-il obligatoire ?",
            "options": [
              "Non, un simple ralentissement suffit",
              "Oui, l\u2019arr\xEAt complet et net des roues est strictement obligatoire",
              "Seulement de nuit",
              "Seulement si un policier est pr\xE9sent"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le Stop impose un temps d\u2019arr\xEAt complet m\xEAme en l\u2019absence totale d\u2019usager."
          },
          {
            "_id": "q-lec-4-2-3",
            "questionText": "\xC0 un C\xE9dez le passage, si aucun v\xE9hicule n\u2019arrive \xE0 droite ni \xE0 gauche :",
            "options": [
              "L\u2019arr\xEAt complet est obligatoire",
              "Je peux passer sans m\u2019arr\xEAter en ralentissant par prudence",
              "Je dois klaxonner",
              "Je fais demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Au C\xE9dez le passage, l\u2019arr\xEAt n\u2019est obligatoire que si un usager prioritaire approche."
          },
          {
            "_id": "q-lec-4-2-4",
            "questionText": "Le panneau carr\xE9 jaune bord\xE9 de blanc indique :",
            "options": [
              "Une zone de travaux",
              "Une route \xE0 caract\xE8re prioritaire \xE0 toutes les intersections",
              "Une fin d\u2019interdiction",
              "Un p\xE9age"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il conf\xE8re la priorit\xE9 de passage sur tout l\u2019itin\xE9raire jusqu\u2019au panneau barr\xE9."
          },
          {
            "_id": "q-lec-4-2-5",
            "questionText": "Quelle sanction encourt le non-respect d\u2019un panneau STOP ?",
            "options": [
              "Une amende sans perte de point",
              "Une amende de 135 \u20AC et un retrait de 4 points sur le permis",
              "La prison ferme",
              "Aucune sanction"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorit\xE9 au Stop est puni d\u2019un retrait de 4 points."
          }
        ]
      },
      {
        "_id": "lec-4-3",
        "_type": "lecon",
        "title": "Le\xE7on 4.3 \u2014 Priorit\xE9s aux feux tricolores",
        "ordre": 3,
        "description": "Feu vert, orange, rouge, fl\xE8ches directionnelles, feux clignotants et feux pi\xE9tons.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-3-1",
            "questionText": "Au feu vert, pour tourner \xE0 gauche, \xE0 qui devez-vous c\xE9der le passage ?",
            "options": [
              "\xC0 personne",
              "Aux v\xE9hicules arrivant en face et aux pi\xE9tons traversant la rue s\xE9cante",
              "Aux voitures derri\xE8re vous",
              "Aux bus uniquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "En tournant \xE0 gauche, on coupe la trajectoire des v\xE9hicules d\u2019en face et des pi\xE9tons engag\xE9s."
          },
          {
            "_id": "q-lec-4-3-2",
            "questionText": "Que permet une fl\xE8che verte directionnelle orient\xE9e vers la droite sous un feu rouge ?",
            "options": [
              "Tourner \xE0 droite imm\xE9diatement sans c\xE9der le passage",
              "Tourner \xE0 droite en c\xE9dant le passage aux pi\xE9tons et v\xE9hicules prioritaires",
              "Aller tout droit",
              "Stationner"
            ],
            "correctOptionIndex": 1,
            "explanation": "La fl\xE8che clignotante ou fixe autorise \xE0 tourner dans la direction indiqu\xE9e en c\xE9dant le passage."
          },
          {
            "_id": "q-lec-4-3-3",
            "questionText": "Si les feux sont \xE9teints ou clignotent en jaune au milieu :",
            "options": [
              "J\u2019applique la priorit\xE9 des panneaux plac\xE9s sur le poteau ou la priorit\xE9 \xE0 droite",
              "Je passe \xE0 toute vitesse",
              "Je m\u2019arr\xEAte 5 minutes",
              "Je fais demi-tour"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les panneaux sous les feux prennent le relais d\xE8s que les feux cessent de fonctionner."
          },
          {
            "_id": "q-lec-4-3-4",
            "questionText": "Le franchissement d\u2019un feu rouge est sanctionn\xE9 par :",
            "options": [
              "Retrait de 1 point",
              "Retrait de 4 points et 135 \u20AC d\u2019amende",
              "Une simple lettre",
              "Un stage de 1 heure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Griller un feu rouge co\xFBte 4 points sur le permis de conduire."
          },
          {
            "_id": "q-lec-4-3-5",
            "questionText": "Si la circulation est bloqu\xE9e au-del\xE0 du carrefour alors que le feu est vert :",
            "options": [
              "Je m\u2019engage quand m\xEAme et je bloque l\u2019intersection",
              "Je reste avant la ligne pour ne pas encombrer le carrefour",
              "Je klaxonne fort",
              "Je monte sur le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est interdit de s\u2019engager dans une intersection si on risque d\u2019y rester bloqu\xE9."
          }
        ]
      },
      {
        "_id": "lec-4-4",
        "_type": "lecon",
        "title": "Le\xE7on 4.4 \u2014 V\xE9hicules et situations prioritaires",
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
            "questionText": "Quels v\xE9hicules sont prioritaires avec gyrophare bleu et sir\xE8ne deux-tons ?",
            "options": [
              "Les taxis et VTC",
              "Police, Gendarmerie, Pompiers, SAMU/SMUR et douanes",
              "Les camions poubelles",
              "Tous les bus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces services de secours et forces de l\u2019ordre sont prioritaires en intervention."
          },
          {
            "_id": "q-lec-4-4-2",
            "questionText": "\xC0 l\u2019approche d\u2019un v\xE9hicule de secours avec avertisseurs sonores et lumineux activ\xE9s, vous devez :",
            "options": [
              "Acc\xE9l\xE9rer pour ne pas le g\xEAner",
              "Ralentir, serrer \xE0 droite ou vous arr\xEAter pour lui ouvrir la voie",
              "Conserver votre vitesse au milieu",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut faciliter imm\xE9diatement le passage des v\xE9hicules d\u2019urgence."
          },
          {
            "_id": "q-lec-4-4-3",
            "questionText": "En agglom\xE9ration, quelle est la r\xE8gle envers un bus qui quitte son arr\xEAt ?",
            "options": [
              "Je le double en klaxonnant",
              "Je ralentis et je lui facilite le d\xE9part",
              "Je lui coupe la route",
              "Le bus n\u2019a aucun droit"
            ],
            "correctOptionIndex": 1,
            "explanation": "En ville, les usagers doivent faciliter l\u2019insertion des bus quittant leur arr\xEAt."
          },
          {
            "_id": "q-lec-4-4-4",
            "questionText": "Les ambulances priv\xE9es avec feu bleu clignotant sans deux-tons sont :",
            "options": [
              "Prioritaires absolues",
              "Des v\xE9hicules d\u2019int\xE9r\xEAt g\xE9n\xE9ral b\xE9n\xE9ficiant de facilit\xE9 de passage (non prioritaires)",
              "Des v\xE9hicules interdits",
              "Des taxis"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elles b\xE9n\xE9ficient d\u2019une facilit\xE9 de passage mais n\u2019ont pas la priorit\xE9 absolue."
          },
          {
            "_id": "q-lec-4-4-5",
            "questionText": "Face \xE0 un convoi exceptionnel escort\xE9 :",
            "options": [
              "Je le double par la droite",
              "Je r\xE9duis ma vitesse et serre \xE0 droite pour faciliter son croisement",
              "Je m\u2019arr\xEAte au milieu",
              "J\u2019acc\xE9l\xE8re"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les convois volumineux n\xE9cessitent un \xE9cart et une r\xE9duction de vitesse pour croiser en s\xE9curit\xE9."
          }
        ]
      },
      {
        "_id": "lec-4-5",
        "_type": "lecon",
        "title": "Le\xE7on 4.5 \u2014 Cas particuliers de priorit\xE9",
        "ordre": 5,
        "description": "Giratoires, sorties de propri\xE9t\xE9, passages pi\xE9tons et travers\xE9es de pistes cyclables.",
        "videoUrl": "https://www.youtube.com/watch?v=KBTd5Vh-smw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-4-5-1",
            "questionText": "Sur un carrefour \xE0 sens giratoire (panneau rond avec 3 fl\xE8ches + C\xE9dez le passage) :",
            "options": [
              "La priorit\xE9 est \xE0 ceux qui entrent",
              "La priorit\xE9 est \xE0 ceux qui circulent d\xE9j\xE0 sur l\u2019anneau",
              "Priorit\xE9 au plus gros",
              "Priorit\xE9 \xE0 droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur un rond-point giratoire moderne, les v\xE9hicules sur l\u2019anneau sont prioritaires."
          },
          {
            "_id": "q-lec-4-5-2",
            "questionText": "En tournant \xE0 droite, je croise une piste cyclable parall\xE8le :",
            "options": [
              "J\u2019ai la priorit\xE9 sur les v\xE9los",
              "Je dois c\xE9der le passage aux cyclistes qui continuent tout droit",
              "Je klaxonne",
              "Les v\xE9los doivent s\u2019arr\xEAter"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un v\xE9hicule qui change de direction doit c\xE9der le passage aux usagers circulant tout droit sur leur voie."
          },
          {
            "_id": "q-lec-4-5-3",
            "questionText": "Sur un rond-point classique SANS panneau de priorit\xE9 (tr\xE8s rare) :",
            "options": [
              "Priorit\xE9 \xE0 gauche",
              "La r\xE8gle de la priorit\xE9 \xE0 droite s\u2019applique (ceux qui entrent sont prioritaires)",
              "Personne n\u2019a la priorit\xE9",
              "Priorit\xE9 aux bus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sans panneau C\xE9dez le passage, le rond-point applique la priorit\xE9 \xE0 droite."
          },
          {
            "_id": "q-lec-4-5-4",
            "questionText": "Qui a la priorit\xE9 sur un passage \xE0 niveau sans barri\xE8re ?",
            "options": [
              "La voiture",
              "Le train dans tous les cas",
              "Le premier arriv\xE9",
              "Le camion"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le train a toujours la priorit\xE9 absolue en raison de sa distance de freinage."
          },
          {
            "_id": "q-lec-4-5-5",
            "questionText": "Un tramway circulant sur sa voie propre :",
            "options": [
              "Doit s\u2019arr\xEAter pour les voitures",
              "A toujours la priorit\xE9 de passage",
              "Respecte la priorit\xE9 \xE0 droite",
              "S\u2019arr\xEAte aux passages pi\xE9tons"
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
    "title": "Module 5 \u2014 Intersections et carrefours",
    "summary": "Circulation dans les carrefours \xE0 sens giratoire, carrefours \xE0 feux complexes, passages \xE0 niveau, zones de danger et communication.",
    "learningObjectives": [
      "Circuler avec assurance dans les carrefours \xE0 sens giratoire \xE0 voies multiples",
      "Comprendre la lecture des carrefours \xE0 feux complexes et tourne-\xE0-gauche",
      "Conna\xEEtre les r\xE8gles de s\xE9curit\xE9 absolue aux passages \xE0 niveau",
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
        "title": "Le\xE7on 5.1 \u2014 Circuler dans un giratoire",
        "ordre": 1,
        "description": "Entr\xE9e, circulation dans l\u2019anneau, sortie et usage des clignotants.",
        "videoUrl": "https://www.youtube.com/watch?v=dzvWPuT3aLw",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-1-1",
            "questionText": "Pour aller tout droit dans un giratoire \xE0 2 voies, quelle voie choisir ?",
            "options": [
              "La voie de gauche",
              "La voie de droite d\xE8s l\u2019entr\xE9e",
              "Au milieu des deux",
              "Peu importe"
            ],
            "correctOptionIndex": 1,
            "explanation": "Pour aller \xE0 droite ou tout droit, on reste sur la voie de droite de l\u2019anneau."
          },
          {
            "_id": "q-lec-5-1-2",
            "questionText": "Pour tourner \xE0 gauche ou faire demi-tour dans un giratoire :",
            "options": [
              "On peut se placer sur la voie de gauche de l\u2019anneau avec clignotant gauche",
              "On reste obligatoirement \xE0 droite",
              "On roule \xE0 contresens",
              "On coupe au milieu"
            ],
            "correctOptionIndex": 0,
            "explanation": "On utilise la voie int\xE9rieure (gauche) avec clignotant gauche avant de se rabattre."
          },
          {
            "_id": "q-lec-5-1-3",
            "questionText": "Quand doit-on actionner le clignotant droit pour sortir du giratoire ?",
            "options": [
              "D\xE8s l\u2019entr\xE9e",
              "\xC0 hauteur de la sortie qui pr\xE9c\xE8de celle qu\u2019on veut emprunter",
              "Apr\xE8s \xEAtre sorti",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "On met le clignotant droit d\xE8s qu\u2019on a d\xE9pass\xE9 la sortie pr\xE9c\xE9dant la sienne."
          },
          {
            "_id": "q-lec-5-1-4",
            "questionText": "Avant de se rabattre vers la droite pour sortir du giratoire, on doit :",
            "options": [
              "Acc\xE9l\xE9rer sans regarder",
              "Contr\xF4ler le r\xE9troviseur droit et l\u2019angle mort droit",
              "Freiner fort",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut imp\xE9rativement v\xE9rifier qu\u2019aucun usager ne circule \xE0 notre droite."
          },
          {
            "_id": "q-lec-5-1-5",
            "questionText": "Si on a rat\xE9 sa sortie dans un giratoire :",
            "options": [
              "On fait marche arri\xE8re",
              "On refait un tour complet de l\u2019anneau en s\xE9curit\xE9",
              "On s\u2019arr\xEAte au milieu",
              "On coupe par l\u2019\xEElot central"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il suffit de faire un tour suppl\xE9mentaire pour se repositionner correctement."
          }
        ]
      },
      {
        "_id": "lec-5-2",
        "_type": "lecon",
        "title": "Le\xE7on 5.2 \u2014 Carrefours \xE0 feux multiples et complexes",
        "ordre": 2,
        "description": "Lecture de plusieurs feux, tourne-\xE0-gauche prot\xE9g\xE9, voies r\xE9serv\xE9es et anticipation urbaine.",
        "videoUrl": "https://www.youtube.com/watch?v=vsP_Zn-GM_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-2-1",
            "questionText": "Qu\u2019est-ce qu\u2019un feu de tourne-\xE0-gauche direct ?",
            "options": [
              "Un feu pour les v\xE9los",
              "Une fl\xE8che lumineuse verte garantissant la priorit\xE9 sans trafic en face",
              "Un feu d\u2019alerte",
              "Un feu pi\xE9ton"
            ],
            "correctOptionIndex": 1,
            "explanation": "La fl\xE8che directionnelle verte assure que la voie d\u2019en face est retenue au rouge."
          },
          {
            "_id": "q-lec-5-2-2",
            "questionText": "Comment s\u2019effectue un croisement \xAB \xE0 l\u2019indon\xE9sienne \xBB \xE0 un carrefour ?",
            "options": [
              "Par l\u2019arri\xE8re",
              "Les v\xE9hicules tournant \xE0 gauche se croisent l\u2019un devant l\u2019autre",
              "En se contournant",
              "Par la droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le croisement \xE0 l\u2019indon\xE9sienne permet de tourner \xE0 gauche face \xE0 face sans contournement."
          },
          {
            "_id": "q-lec-5-2-3",
            "questionText": "Quelle est la pr\xE9caution majeure lors d\u2019un croisement \xE0 l\u2019indon\xE9sienne ?",
            "options": [
              "Acc\xE9l\xE9rer",
              "Faire attention au v\xE9hicule masqu\xE9 arrivant tout droit en face",
              "Klaxonner",
              "Fermer les yeux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le v\xE9hicule en face masque la vue sur les usagers arrivant tout droit derri\xE8re lui."
          },
          {
            "_id": "q-lec-5-2-4",
            "questionText": "Si plusieurs feux tricolores r\xE9gissent diff\xE9rentes voies, quel feu regarder ?",
            "options": [
              "Le plus haut",
              "Celui situ\xE9 au-dessus ou \xE0 droite de votre voie de circulation",
              "Le feu pi\xE9ton",
              "N\u2019importe lequel"
            ],
            "correctOptionIndex": 1,
            "explanation": "Chaque voie est gouvern\xE9e par le signal lumineux qui lui est affect\xE9."
          },
          {
            "_id": "q-lec-5-2-5",
            "questionText": "\xC0 quoi servent les lignes d\u2019effet des feux en pointill\xE9s ?",
            "options": [
              "\xC0 d\xE9corer",
              "\xC0 indiquer o\xF9 s\u2019arr\xEAter pour laisser le champ de vision libre et activer les boucles de d\xE9tection",
              "\xC0 stationner",
              "\xC0 doubler"
            ],
            "correctOptionIndex": 1,
            "explanation": "Elles marquent l\u2019emplacement pr\xE9cis d\u2019arr\xEAt avant le feu."
          }
        ]
      },
      {
        "_id": "lec-5-3",
        "_type": "lecon",
        "title": "Le\xE7on 5.3 \u2014 Passages \xE0 niveau",
        "ordre": 3,
        "description": "Barri\xE8res, feux rouges clignotants, absence d\u2019engagement si la sortie est bloqu\xE9e et priorit\xE9 absolue du train.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-3-1",
            "questionText": "Face \xE0 un feu rouge clignotant et une sonnerie \xE0 un passage \xE0 niveau :",
            "options": [
              "J\u2019acc\xE9l\xE8re pour passer avant les barri\xE8res",
              "L\u2019arr\xEAt absolu est obligatoire avant la barri\xE8re",
              "Je fais demi-tour sur la voie",
              "Je contourne les barri\xE8res"
            ],
            "correctOptionIndex": 1,
            "explanation": "D\xE8s que le signal sonore et lumineux s\u2019active, l\u2019arr\xEAt est imm\xE9diat et imp\xE9ratif."
          },
          {
            "_id": "q-lec-5-3-2",
            "questionText": "Si la circulation est dense au-del\xE0 du passage \xE0 niveau :",
            "options": [
              "Je m\u2019engage sur les rails",
              "Je m\u2019arr\xEAte avant le passage \xE0 niveau pour ne pas \xEAtre coinc\xE9 sur les voies",
              "Je klaxonne",
              "Je double la file"
            ],
            "correctOptionIndex": 1,
            "explanation": "On ne s\u2019engage JAMAIS sur une voie ferr\xE9e sans certitude de pouvoir la quitter aussit\xF4t."
          },
          {
            "_id": "q-lec-5-3-3",
            "questionText": "Si la voiture tombe en panne et se bloque sur les voies ferr\xE9es :",
            "options": [
              "Je reste dedans et j\u2019attends",
              "Je fais \xE9vacuer imm\xE9diatement les passagers et j\u2019utilise le t\xE9l\xE9phone d\u2019urgence SNCF",
              "Je cherche \xE0 la r\xE9parer seul",
              "Je m\u2019endors"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise en s\xE9curit\xE9 des personnes et l\u2019alerte imm\xE9diate par la borne d\u2019urgence sont vitales."
          },
          {
            "_id": "q-lec-5-3-4",
            "questionText": "Combien de temps faut-il \xE0 un train pour s\u2019arr\xEAter d\u2019urgence ?",
            "options": [
              "10 m\xE8tres",
              "50 m\xE8tres",
              "800 \xE0 1500 m\xE8tres selon sa vitesse",
              "5 secondes"
            ],
            "correctOptionIndex": 2,
            "explanation": "Un train lourd n\xE9cessite plus d\u2019un kilom\xE8tre pour s\u2019immobiliser."
          },
          {
            "_id": "q-lec-5-3-5",
            "questionText": "Franchir un passage \xE0 niveau ferm\xE9 ou en fermeture est sanctionn\xE9 par :",
            "options": [
              "Un avertissement",
              "135 \u20AC d\u2019amende, 4 points en moins et suspension de permis",
              "10 \u20AC d\u2019amende",
              "Rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est une faute d\u2019une gravit\xE9 exceptionnelle passible de suspension judiciaire."
          }
        ]
      },
      {
        "_id": "lec-5-4",
        "_type": "lecon",
        "title": "Le\xE7on 5.4 \u2014 Intersections sans visibilit\xE9 et zones de danger",
        "ordre": 4,
        "description": "R\xE9duction de la vitesse, prudence accrue, progression progressive pour am\xE9liorer la visibilit\xE9.",
        "videoUrl": "https://www.youtube.com/watch?v=7NVFko6lwKY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-5-4-1",
            "questionText": "\xC0 une intersection sans visibilit\xE9 \xE0 cause d\u2019un mur ou d\u2019une haie :",
            "options": [
              "Je passe vite",
              "J\u2019avance \xE0 tr\xE8s faible allure pour voir et \xEAtre vu progressivement",
              "Je klaxonne en continu",
              "Je ferme les yeux"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019avanc\xE9e progressive permet d\u2019\xE9largir l\u2019angle de vue sans danger."
          },
          {
            "_id": "q-lec-5-4-2",
            "questionText": "Que signale un miroir convexe plac\xE9 \xE0 un carrefour sans visibilit\xE9 ?",
            "options": [
              "Une cam\xE9ra",
              "Il aide \xE0 d\xE9tecter les usagers approchant mais ne dispense pas de c\xE9der le passage",
              "Un panneau Stop",
              "Une d\xE9coration"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le miroir est une aide visuelle mais ne donne aucune priorit\xE9."
          },
          {
            "_id": "q-lec-5-4-3",
            "questionText": "Dans une intersection \xE9troite en ville, o\xF9 regarder en premier ?",
            "options": [
              "Le t\xE9l\xE9phone",
              "Les trottoirs pour les pi\xE9tons, puis les angles morts et la rue prioritaire",
              "Le ciel",
              "La radio"
            ],
            "correctOptionIndex": 1,
            "explanation": "La d\xE9tection des pi\xE9tons et cyclistes est primordiale en milieu urbain dense."
          },
          {
            "_id": "q-lec-5-4-4",
            "questionText": "Si un v\xE9hicule venant en face tourne \xE0 gauche en m\xEAme temps que vous :",
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
            "questionText": "Quelle est la distance de visibilit\xE9 minimale recommand\xE9e avant de s\u2019engager ?",
            "options": [
              "5 m\xE8tres",
              "Suffisante pour voir arriver les usagers roulant \xE0 la vitesse maximale autoris\xE9e",
              "1 m\xE8tre",
              "Aucune"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut s\u2019assurer que le temps de d\xE9gagement est compatible avec la vitesse de la voie."
          }
        ]
      },
      {
        "_id": "lec-5-5",
        "_type": "lecon",
        "title": "Le\xE7on 5.5 \u2014 Communication et anticipation aux carrefours",
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
              "Pour s\u2019assurer qu\u2019ils vous ont bien vu et ont compris votre intention",
              "Pour discuter",
              "Ce n\u2019est pas utile"
            ],
            "correctOptionIndex": 1,
            "explanation": "Croiser le regard confirme la prise en compte mutuelle avant de s\u2019engager."
          },
          {
            "_id": "q-lec-5-5-2",
            "questionText": "Oublier d\u2019\xE9teindre son clignotant apr\xE8s un changement de direction :",
            "options": [
              "Est sans danger",
              "Peut induire en erreur un usager qui risque de vous couper la route",
              "Fait \xE9conomiser la batterie",
              "Est obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un clignotant laiss\xE9 par erreur peut provoquer un accident grave par fausse interpr\xE9tation."
          },
          {
            "_id": "q-lec-5-5-3",
            "questionText": "\xC0 l\u2019approche d\u2019un carrefour, quand doit-on d\xE9buter l\u2019observation ?",
            "options": [
              "Au milieu de l\u2019intersection",
              "Le plus t\xF4t possible d\xE8s que l\u2019intersection devient visible",
              "Apr\xE8s avoir tourn\xE9",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019anticipation pr\xE9coce permet d\u2019adapter son allure en toute s\xE9r\xE9nit\xE9."
          },
          {
            "_id": "q-lec-5-5-4",
            "questionText": "L\u2019utilisation d\u2019un appel de phares de jour sert \xE0 :",
            "options": [
              "Insulter un usager",
              "Avertir d\u2019un danger imm\xE9diat ou signaler sa pr\xE9sence en s\xE9curit\xE9",
              "\xC9blouir",
              "Rouler plus vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019appel de phare est un signal d\u2019avertissement bref de s\xE9curit\xE9."
          },
          {
            "_id": "q-lec-5-5-5",
            "questionText": "La courtoisie au volant consiste \xE0 :",
            "options": [
              "C\xE9der son passage m\xEAme quand cela cr\xE9e un danger impr\xE9vu",
              "Faciliter l\u2019insertion des autres usagers lorsque la s\xE9curit\xE9 le permet",
              "Ne jamais laisser passer personne",
              "Rouler au pas partout"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite apais\xE9e et coop\xE9rative am\xE9liore la s\xE9curit\xE9 globale."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-6",
    "_type": "moduleFormation",
    "code": "MOD-006",
    "title": "Module 6 \u2014 Vitesse, freinage et distances",
    "summary": "Limitations de vitesse en France, calculs de distance de freinage et d'arr\xEAt, distance de s\xE9curit\xE9 (2 secondes), effets de la vitesse sur le corps et adaptation.",
    "learningObjectives": [
      "Conna\xEEtre toutes les limitations de vitesse selon le type de route, la m\xE9t\xE9o et le permis probatoire",
      "Calculer et diff\xE9rencier distance de r\xE9action, distance de freinage et distance d'arr\xEAt",
      "Appliquer la r\xE8gle des 2 secondes pour maintenir l'intervalle de s\xE9curit\xE9",
      "Comprendre la r\xE9duction du champ visuel et l'\xE9nergie cin\xE9tique li\xE9e \xE0 la vitesse"
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
        "title": "Le\xE7on 6.1 \u2014 Limitations de vitesse en France",
        "ordre": 1,
        "description": "Vitesses autoris\xE9es selon la route, la m\xE9t\xE9o, le permis probatoire et les situations particuli\xE8res.",
        "videoUrl": "https://www.youtube.com/watch?v=_ANzCH4C4JM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-1-1",
            "questionText": "Quelle est la limitation g\xE9n\xE9rale de vitesse sur autoroute par temps sec (permis confirm\xE9) ?",
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
            "explanation": "En cas de pluie ou pr\xE9cipitations, la vitesse est r\xE9duite \xE0 110 km/h sur autoroute."
          },
          {
            "_id": "q-lec-6-1-3",
            "questionText": "Pour un jeune conducteur en p\xE9riode probatoire, la vitesse sur autoroute par temps sec est de :",
            "options": [
              "110 km/h",
              "120 km/h",
              "130 km/h",
              "100 km/h"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les permis probatoires sont limit\xE9s \xE0 110 km/h sur autoroute."
          },
          {
            "_id": "q-lec-6-1-4",
            "questionText": "En agglom\xE9ration, quelle est la limitation de vitesse par d\xE9faut ?",
            "options": [
              "30 km/h",
              "50 km/h",
              "70 km/h",
              "80 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse en ville est fix\xE9e \xE0 50 km/h sauf signalisation contraire (ex: zone 30)."
          },
          {
            "_id": "q-lec-6-1-5",
            "questionText": "En cas de brouillard avec une visibilit\xE9 inf\xE9rieure \xE0 50 m\xE8tres, la vitesse est limit\xE9e \xE0 :",
            "options": [
              "30 km/h",
              "50 km/h sur tout le r\xE9seau",
              "70 km/h",
              "80 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "D\xE8s que la visibilit\xE9 descend sous 50 m, la vitesse maximale est de 50 km/h partout."
          }
        ]
      },
      {
        "_id": "lec-6-2",
        "_type": "lecon",
        "title": "Le\xE7on 6.2 \u2014 Distance de freinage et distance d\u2019arr\xEAt",
        "ordre": 2,
        "description": "Diff\xE9rence entre distance de r\xE9action, distance de freinage et distance totale d\u2019arr\xEAt ; influence de la vitesse, de la m\xE9t\xE9o et de la fatigue.",
        "videoUrl": "https://www.youtube.com/watch?v=lNR3X4rEaZE",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-2-1",
            "questionText": "La distance totale d\u2019arr\xEAt correspond \xE0 :",
            "options": [
              "Distance de freinage seule",
              "Distance parcourue pendant le temps de r\xE9action + Distance de freinage",
              "Temps de r\xE9action seul",
              "Longueur de la voiture"
            ],
            "correctOptionIndex": 1,
            "explanation": "Distance d\u2019arr\xEAt = Distance de r\xE9action + Distance de freinage."
          },
          {
            "_id": "q-lec-6-2-2",
            "questionText": "Comment estimer rapidement la distance parcourue pendant le temps de r\xE9action (1 seconde) ?",
            "options": [
              "Multiplier le chiffre des dizaines de la vitesse par 3",
              "Multiplier la vitesse par 10",
              "Diviser par 2",
              "Multiplier les dizaines par 6"
            ],
            "correctOptionIndex": 0,
            "explanation": "\xC0 50 km/h : 5 x 3 = 15 m\xE8tres ; \xE0 90 km/h : 9 x 3 = 27 m\xE8tres."
          },
          {
            "_id": "q-lec-6-2-3",
            "questionText": "Comment estimer la distance totale d\u2019arr\xEAt sur sol sec ?",
            "options": [
              "Dizaine multipli\xE9e par 3",
              "Dizaine multipli\xE9e par elle-m\xEAme (au carr\xE9)",
              "Vitesse divis\xE9e par 10",
              "Dizaine multipli\xE9e par 6"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 50 km/h : 5 x 5 = 25 m ; \xE0 90 km/h : 9 x 9 = 81 m ; \xE0 130 km/h : 13 x 13 = 169 m."
          },
          {
            "_id": "q-lec-6-2-4",
            "questionText": "Sur chauss\xE9e mouill\xE9e, que devient la distance de freinage par rapport au sec ?",
            "options": [
              "Elle est divis\xE9e par deux",
              "Elle est multipli\xE9e par deux",
              "Elle reste identique",
              "Elle est tripl\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019adh\xE9rence \xE9tant divis\xE9e par deux sur sol mouill\xE9, le freinage est deux fois plus long."
          },
          {
            "_id": "q-lec-6-2-5",
            "questionText": "Quelle est la dur\xE9e moyenne du temps de r\xE9action d\u2019un conducteur attentif en bonne sant\xE9 ?",
            "options": [
              "0,1 seconde",
              "1 seconde environ",
              "3 secondes",
              "5 secondes"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le temps de r\xE9action incompressible est en moyenne d\u2019environ 1 seconde."
          }
        ]
      },
      {
        "_id": "lec-6-3",
        "_type": "lecon",
        "title": "Le\xE7on 6.3 \u2014 Distance de s\xE9curit\xE9 entre v\xE9hicules",
        "ordre": 3,
        "description": "R\xE8gle des deux secondes, adaptation par mauvais temps et dangers du talonnage.",
        "videoUrl": "https://www.youtube.com/watch?v=_oLFumNga1c",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-3-1",
            "questionText": "Quel est l\u2019intervalle de temps minimal de s\xE9curit\xE9 \xE0 respecter avec le v\xE9hicule qui pr\xE9c\xE8de ?",
            "options": [
              "0,5 seconde",
              "1 seconde",
              "2 secondes au moins",
              "5 secondes"
            ],
            "correctOptionIndex": 2,
            "explanation": "La r\xE8gle des 2 secondes couvre 1 s de r\xE9action + 1 s de marge de s\xE9curit\xE9."
          },
          {
            "_id": "q-lec-6-3-2",
            "questionText": "Comment calculer la distance de s\xE9curit\xE9 minimale sur sol sec ?",
            "options": [
              "Dizaine multipli\xE9e par 3",
              "Dizaine de la vitesse multipli\xE9e par 6",
              "Vitesse au carr\xE9",
              "Longueur du v\xE9hicule"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 50 km/h : 5 x 6 = 30 m ; \xE0 90 km/h : 9 x 6 = 54 m ; \xE0 130 km/h : 13 x 6 = 78 m."
          },
          {
            "_id": "q-lec-6-3-3",
            "questionText": "Sur autoroute, quel rep\xE8re visuel garantit les 2 secondes de distance de s\xE9curit\xE9 ?",
            "options": [
              "Un trait de bande d\u2019arr\xEAt d\u2019urgence",
              "Deux traits de la ligne de droite de bande d\u2019arr\xEAt d\u2019urgence",
              "La borne kilom\xE9trique",
              "Les panneaux publicitaires"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xAB 1 trait = danger, 2 traits = s\xE9curit\xE9 \xBB le long de la ligne de rive autorouti\xE8re."
          },
          {
            "_id": "q-lec-6-3-4",
            "questionText": "Si les conditions m\xE9t\xE9orologiques sont d\xE9grad\xE9es (pluie, neige), la distance de s\xE9curit\xE9 doit \xEAtre :",
            "options": [
              "Maintenue",
              "Doubl\xE9e",
              "Diminu\xE9e",
              "Divis\xE9e par deux"
            ],
            "correctOptionIndex": 1,
            "explanation": "Par mauvais temps, on augmente significativement l\u2019intervalle pour parer au risque de glissade."
          },
          {
            "_id": "q-lec-6-3-5",
            "questionText": "Coller le v\xE9hicule qui pr\xE9c\xE8de (talonnage) est puni de :",
            "options": [
              "Une r\xE9primande",
              "135 \u20AC d\u2019amende et retrait de 3 points sur le permis",
              "Aucune sanction",
              "1 point"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le non-respect des distances de s\xE9curit\xE9 retire 3 points."
          }
        ]
      },
      {
        "_id": "lec-6-4",
        "_type": "lecon",
        "title": "Le\xE7on 6.4 \u2014 Effets de la vitesse sur le corps et la conduite",
        "ordre": 4,
        "description": "R\xE9duction du champ visuel, augmentation de la gravit\xE9 des chocs et dangers de la vitesse excessive.",
        "videoUrl": "https://www.youtube.com/watch?v=_ANzCH4C4JM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-4-1",
            "questionText": "\xC0 mesure que la vitesse augmente, qu\u2019arrive-t-il au champ visuel du conducteur ?",
            "options": [
              "Il s\u2019\xE9largit",
              "Il se r\xE9tr\xE9cit en \xAB vision en tunnel \xBB",
              "Il reste identique",
              "Il devient flou uniquement la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 130 km/h, le champ visuel se r\xE9duit \xE0 environ 30 degr\xE9s contre 180 degr\xE9s \xE0 l\u2019arr\xEAt."
          },
          {
            "_id": "q-lec-6-4-2",
            "questionText": "Si vous doublez votre vitesse (ex: passage de 50 \xE0 100 km/h), l\u2019\xE9nergie cin\xE9tique du choc est :",
            "options": [
              "Doubl\xE9e",
              "Multipli\xE9e par 4",
              "Multipli\xE9e par 8",
              "Inchang\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019\xE9nergie cin\xE9tique est proportionnelle au carr\xE9 de la vitesse (E = 1/2 mv\xB2)."
          },
          {
            "_id": "q-lec-6-4-3",
            "questionText": "Un choc frontal \xE0 50 km/h sans ceinture \xE9quivaut \xE0 une chute de :",
            "options": [
              "1 m\xE8tre",
              "3 \xE9tages d\u2019un immeuble (environ 10 m\xE8tres)",
              "10 \xE9tages",
              "Un trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019impact \xE0 50 km/h correspond \xE0 une chute du 3\xE8me \xE9tage d\u2019un b\xE2timent."
          },
          {
            "_id": "q-lec-6-4-4",
            "questionText": "La vitesse excessive ou inadapt\xE9e est pr\xE9sente dans quelle proportion des accidents mortels ?",
            "options": [
              "Moins de 5%",
              "Pr\xE8s d\u2019un accident mortel sur trois",
              "Uniquement la nuit",
              "100% des cas"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse est la 1\xE8re ou 2\xE8me cause principale de mortalit\xE9 sur les routes fran\xE7aises."
          },
          {
            "_id": "q-lec-6-4-5",
            "questionText": "La fatigue au volant combin\xE9e \xE0 la vitesse provoque :",
            "options": [
              "Une meilleure concentration",
              "Une augmentation drastique du temps de r\xE9action et du risque d\u2019endormissement",
              "Une r\xE9duction des distances",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse use l\u2019attention du cerveau et acc\xE9l\xE8re l\u2019\xE9puisement."
          }
        ]
      },
      {
        "_id": "lec-6-5",
        "_type": "lecon",
        "title": "Le\xE7on 6.5 \u2014 Adapter sa vitesse aux circonstances",
        "ordre": 5,
        "description": "Adapter l\u2019allure \xE0 la visibilit\xE9, \xE0 la circulation, aux \xE9coles, \xE0 la chauss\xE9e et \xE0 la m\xE9t\xE9o, m\xEAme si la limite l\xE9gale autorise une vitesse plus \xE9lev\xE9e.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-6-5-1",
            "questionText": "La vitesse maximale autoris\xE9e est-elle une vitesse obligatoire \xE0 atteindre en toutes circonstances ?",
            "options": [
              "Oui toujours",
              "Non, c\u2019est un plafond limite, la vitesse doit \xEAtre r\xE9duite d\xE8s que les conditions l\u2019exigent",
              "Oui sur autoroute",
              "Oui en ligne droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse doit \xEAtre modul\xE9e en permanence selon la m\xE9t\xE9o, l\u2019\xE9tat de la route et les usagers."
          },
          {
            "_id": "q-lec-6-5-2",
            "questionText": "\xC0 l\u2019approche d\u2019une \xE9cole aux heures d\u2019entr\xE9e ou sortie de classe, vous devez :",
            "options": [
              "Rouler \xE0 50 km/h",
              "Ralentir tr\xE8s fortement (20-30 km/h) et placer le pied au-dessus du frein",
              "Klaxonner pour faire ranger les enfants",
              "Acc\xE9l\xE9rer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019impr\xE9visibilit\xE9 totale des enfants exige une allure au pas et une vigilance maximale."
          },
          {
            "_id": "q-lec-6-5-3",
            "questionText": "Sur une chauss\xE9e \xE9troite avec des croisements difficiles :",
            "options": [
              "Maintenir sa vitesse",
              "Ralentir et pr\xE9parer le croisement en serrant \xE0 droite",
              "Acc\xE9l\xE9rer pour passer le premier",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019adaptation de l\u2019allure pr\xE9vient les accrochages lat\xE9raux."
          },
          {
            "_id": "q-lec-6-5-4",
            "questionText": "En cas de fort vent lat\xE9ral sur un viaduc ou \xE0 la sortie d\u2019un tunnel, vous devez :",
            "options": [
              "Augmenter la vitesse",
              "Ralentir et tenir fermement le volant \xE0 deux mains pour parer aux embard\xE9es",
              "L\xE2cher le volant",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "R\xE9duire l\u2019allure limite l\u2019impact des rafales sur la trajectoire."
          },
          {
            "_id": "q-lec-6-5-5",
            "questionText": "Conduire \xE0 une allure anormalement r\xE9duite sans motif valable cr\xE9ant un danger pour les autres :",
            "options": [
              "Est conseill\xE9",
              "Est une infraction passible d\u2019une amende forfaitaire",
              "Est obligatoire",
              "Est autoris\xE9 sur la voie de gauche"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une lenteur excessive et injustifi\xE9e sur voie rapide g\xE9n\xE8re un risque d\u2019accident par l\u2019arri\xE8re."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-7",
    "_type": "moduleFormation",
    "code": "MOD-007",
    "title": "Module 7 \u2014 Croisement et d\xE9passement",
    "summary": "R\xE8gles de croisement, conditions indispensables pour d\xE9passer en toute s\xE9curit\xE9, interdictions formelles, comportement quand on est d\xE9pass\xE9 et v\xE9hicules sp\xE9ciaux.",
    "learningObjectives": [
      "Ma\xEEtriser les priorit\xE9s de croisement en pente et sur chauss\xE9e r\xE9tr\xE9cie",
      "V\xE9rifier les 5 conditions indispensables avant d'entamer un d\xE9passement",
      "Conna\xEEtre toutes les zones et situations o\xF9 le d\xE9passement est formellement interdit",
      "Appliquer les distances lat\xE9rales obligatoires pour d\xE9passer deux-roues et pi\xE9tons"
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
        "title": "Le\xE7on 7.1 \u2014 R\xE8gles de croisement",
        "ordre": 1,
        "description": "Croisement sur routes \xE9troites, gestion des obstacles, v\xE9hicules volumineux et r\xE8gles de prudence.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-1-1",
            "questionText": "Sur route \xE9troite avec un obstacle sur votre voie, qui doit s\u2019arr\xEAter ?",
            "options": [
              "Le v\xE9hicule venant en face",
              "Vous, car l\u2019obstacle se trouve sur votre c\xF4t\xE9",
              "Le premier qui klaxonne",
              "Le plus rapide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Celui qui a l\u2019obstacle sur sa voie doit c\xE9der le passage \xE0 l\u2019usager arrivant en face."
          },
          {
            "_id": "q-lec-7-1-2",
            "questionText": "Sur une route de montagne en pente o\xF9 le croisement est impossible entre deux voitures de m\xEAme gabarit :",
            "options": [
              "Le v\xE9hicule montant recule",
              "Le v\xE9hicule descendant doit s\u2019arr\xEAter et reculer si n\xE9cessaire",
              "Les deux coupent le moteur",
              "Le plus lourd recule"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le v\xE9hicule qui descend recule car il est plus facile de red\xE9marrer en descente qu\u2019en mont\xE9e."
          },
          {
            "_id": "q-lec-7-1-3",
            "questionText": "Entre un v\xE9hicule l\xE9ger et un v\xE9hicule lourd (poids lourd/bus) en forte pente :",
            "options": [
              "Le camion recule toujours",
              "C\u2019est toujours le v\xE9hicule l\xE9ger qui recule, qu\u2019il monte ou qu\u2019il descende",
              "Le camion fait demi-tour",
              "Personne ne recule"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le v\xE9hicule le plus maniable (voiture) doit reculer face au poids lourd."
          },
          {
            "_id": "q-lec-7-1-4",
            "questionText": "La nuit lors du croisement d\u2019un autre v\xE9hicule, vous devez :",
            "options": [
              "Garder les feux de route",
              "Passer en feux de croisement pour ne pas \xE9blouir l\u2019autre conducteur",
              "\xC9teindre les feux",
              "Allumer les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le passage en feux de croisement est obligatoire d\xE8s qu\u2019on croise un autre v\xE9hicule."
          },
          {
            "_id": "q-lec-7-1-5",
            "questionText": "O\xF9 porter son regard lors du croisement de nuit pour ne pas \xEAtre \xE9bloui ?",
            "options": [
              "Directement dans les phares du v\xE9hicule d\u2019en face",
              "Vers le bord droit de la chauss\xE9e (la ligne de rive)",
              "Vers le ciel",
              "Vers son r\xE9troviseur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Fixer la ligne blanche de droite \xE9vite l\u2019\xE9blouissement tout en maintenant la trajectoire."
          }
        ]
      },
      {
        "_id": "lec-7-2",
        "_type": "lecon",
        "title": "Le\xE7on 7.2 \u2014 Conditions pour d\xE9passer en s\xE9curit\xE9",
        "ordre": 2,
        "description": "V\xE9rification de la visibilit\xE9, de la voie libre, des distances, de la vitesse et signalisation avec le clignotant.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-2-1",
            "questionText": "Combien de conditions indispensables doit-on v\xE9rifier avant d\u2019entamer un d\xE9passement ?",
            "options": [
              "Aucune",
              "Signalisation autoris\xE9e, visibilit\xE9 suffisante, voie libre devant/derri\xE8re, r\xE9serve de vitesse, possibilit\xE9 de se rabattre",
              "Avoir le clignotant allum\xE9 seul",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Toutes les conditions de s\xE9curit\xE9 visuelle, dynamique et r\xE9glementaire doivent \xEAtre r\xE9unies."
          },
          {
            "_id": "q-lec-7-2-2",
            "questionText": "Pour d\xE9passer en s\xE9curit\xE9, quelle diff\xE9rence de vitesse minimale est recommand\xE9e avec le v\xE9hicule d\xE9pass\xE9 ?",
            "options": [
              "2 km/h",
              "Au moins 20 km/h de r\xE9serve sans d\xE9passer la vitesse maximale autoris\xE9e",
              "50 km/h",
              "Aucune"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un diff\xE9rentiel d\u2019environ 20 km/h permet un d\xE9passement net et rapide."
          },
          {
            "_id": "q-lec-7-2-3",
            "questionText": "A-t-on le droit de d\xE9passer la vitesse maximale autoris\xE9e pendant un d\xE9passement ?",
            "options": [
              "Oui de 20 km/h",
              "Non, la vitesse maximale autoris\xE9e ne doit jamais \xEAtre d\xE9pass\xE9e",
              "Oui sur autoroute",
              "Oui pour doubler un camion"
            ],
            "correctOptionIndex": 1,
            "explanation": "Aucune d\xE9rogation de vitesse n\u2019est accord\xE9e pour effectuer un d\xE9passement."
          },
          {
            "_id": "q-lec-7-2-4",
            "questionText": "Dans le r\xE9troviseur int\xE9rieur, \xE0 quel moment peut-on se rabattre apr\xE8s avoir doubl\xE9 ?",
            "options": [
              "D\xE8s qu\u2019on a d\xE9pass\xE9 le pare-chocs",
              "Quand on aper\xE7oit nettement les deux phares ou la face avant du v\xE9hicule doubl\xE9",
              "Apr\xE8s 1 kilom\xE8tre",
              "Imm\xE9diatement en braquant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Voir la face avant enti\xE8re dans le miroir central garantit une distance de rabattement s\xFBre."
          },
          {
            "_id": "q-lec-7-2-5",
            "questionText": "Doit-on maintenir le clignotant gauche pendant toute la dur\xE9e o\xF9 l\u2019on est sur la voie de d\xE9passement ?",
            "options": [
              "Non, on l\u2019\xE9teint aussit\xF4t d\xE9port\xE9",
              "Oui, sur chauss\xE9e \xE0 double sens on le laisse jusqu\u2019au moment de se rabattre",
              "On met les feux de d\xE9tresse",
              "Jamais de clignotant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur route \xE0 double sens, le clignotant gauche avertit que la man\u0153uvre est en cours."
          }
        ]
      },
      {
        "_id": "lec-7-3",
        "_type": "lecon",
        "title": "Le\xE7on 7.3 \u2014 Interdictions de d\xE9passement",
        "ordre": 3,
        "description": "Interdiction sur ligne continue, sommet de c\xF4te, virage sans visibilit\xE9, passage \xE0 niveau et certaines intersections.",
        "videoUrl": "https://www.youtube.com/watch?v=FZF94If-Rsk",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-3-1",
            "questionText": "Peut-on d\xE9passer un v\xE9hicule \xE0 moteur en sommet de c\xF4te sur route \xE0 double sens \xE0 2 voies ?",
            "options": [
              "Oui avec le clignotant",
              "Non, l\u2019absence de visibilit\xE9 vers l\u2019avant rend le d\xE9passement strictement interdit",
              "Oui la nuit",
              "Oui si on roule vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le manque de visibilit\xE9 frontale interdit formellement de se d\xE9porter sur la voie oppos\xE9e."
          },
          {
            "_id": "q-lec-7-3-2",
            "questionText": "\xC0 un passage \xE0 niveau sans barri\xE8re, le d\xE9passement est :",
            "options": [
              "Autoris\xE9 pour les voitures",
              "Strictement interdit pour tout v\xE9hicule \xE0 moteur",
              "Autoris\xE9 \xE0 30 km/h",
              "Conseill\xE9"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est interdit de d\xE9passer aux passages \xE0 niveau non prot\xE9g\xE9s par des barri\xE8res."
          },
          {
            "_id": "q-lec-7-3-3",
            "questionText": "\xC0 une intersection o\xF9 l\u2019on doit c\xE9der le passage ou appliquer la priorit\xE9 \xE0 droite :",
            "options": [
              "Le d\xE9passement est interdit",
              "Le d\xE9passement est autoris\xE9",
              "On peut doubler par la droite",
              "Seulement les camions"
            ],
            "correctOptionIndex": 0,
            "explanation": "On ne peut d\xE9passer \xE0 une intersection que si l\u2019on b\xE9n\xE9ficie d\u2019une priorit\xE9 absolue signal\xE9e."
          },
          {
            "_id": "q-lec-7-3-4",
            "questionText": "\xC0 l\u2019approche d\u2019un passage pi\xE9ton sans feu o\xF9 des pi\xE9tons s\u2019engagent :",
            "options": [
              "On double le v\xE9hicule arr\xEAt\xE9",
              "Il est strictement interdit de d\xE9passer un v\xE9hicule qui ralentit ou s\u2019arr\xEAte",
              "On klaxonne",
              "On acc\xE9l\xE8re"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un v\xE9hicule arr\xEAt\xE9 devant un passage pi\xE9ton masque un pi\xE9ton en cours de travers\xE9e."
          },
          {
            "_id": "q-lec-7-3-5",
            "questionText": "Peut-on d\xE9passer par la DROITE sur route ou autoroute ?",
            "options": [
              "Oui toujours",
              "Non, c\u2019est strictement interdit sauf si le v\xE9hicule devant tourne \xE0 gauche ou en files ininterrompues",
              "Oui si la voie est libre",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le d\xE9passement par la droite est une infraction grave passible d\u2019une perte de 3 points."
          }
        ]
      },
      {
        "_id": "lec-7-4",
        "_type": "lecon",
        "title": "Le\xE7on 7.4 \u2014 \xCAtre d\xE9pass\xE9 et laisser d\xE9passer",
        "ordre": 4,
        "description": "Maintenir une allure stable, ne pas acc\xE9l\xE9rer et faciliter la man\u0153uvre d\u2019un autre v\xE9hicule.",
        "videoUrl": "https://www.youtube.com/watch?v=3NsXYxLakZM",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-4-1",
            "questionText": "Lorsqu\u2019un v\xE9hicule commence \xE0 vous d\xE9passer, quelle doit \xEAtre votre r\xE9action ?",
            "options": [
              "Acc\xE9l\xE9rer pour ne pas vous laisser doubler",
              "Maintenir votre vitesse ou ralentir l\xE9g\xE8rement et serrer \xE0 droite",
              "Klaxonner",
              "Mettre le clignotant gauche"
            ],
            "correctOptionIndex": 1,
            "explanation": "La loi interdit formellement d\u2019acc\xE9l\xE9rer lorsqu\u2019on est en train d\u2019\xEAtre d\xE9pass\xE9."
          },
          {
            "_id": "q-lec-7-4-2",
            "questionText": "La nuit, lorsqu\u2019un v\xE9hicule vous d\xE9passe et arrive \xE0 votre hauteur :",
            "options": [
              "Vous \xE9teignez vos phares",
              "Vous passez de feux de route en feux de croisement pour ne pas l\u2019\xE9blouir dans ses r\xE9troviseurs",
              "Vous gardez les pleins phares",
              "Vous allumez l\u2019antibrouillard"
            ],
            "correctOptionIndex": 1,
            "explanation": "On commute en feux de croisement d\xE8s que le v\xE9hicule arrive \xE0 notre hauteur."
          },
          {
            "_id": "q-lec-7-4-3",
            "questionText": "Si le conducteur qui vous d\xE9passe se rabat en urgence face \xE0 un danger en face :",
            "options": [
              "Vous acc\xE9l\xE9rez pour le bloquer",
              "Vous ralentissez imm\xE9diatement pour lui cr\xE9er un espace de s\xE9curit\xE9",
              "Vous klaxonnez sans bouger",
              "Vous le percutez"
            ],
            "correctOptionIndex": 1,
            "explanation": "La coop\xE9ration et le ralentissement \xE9vitent une collision frontale mortelle."
          },
          {
            "_id": "q-lec-7-4-4",
            "questionText": "Acc\xE9l\xE9rer lorsqu\u2019on est en train d\u2019\xEAtre d\xE9pass\xE9 est sanctionn\xE9 par :",
            "options": [
              "Une amende de 135 \u20AC et retrait de 2 points",
              "Rien du tout",
              "Un avertissement oral",
              "10 \u20AC"
            ],
            "correctOptionIndex": 0,
            "explanation": "C\u2019est une infraction au code de la route punie d\u2019un retrait de 2 points."
          },
          {
            "_id": "q-lec-7-4-5",
            "questionText": "Sur autoroute, si vous roulez sur la voie du milieu et qu\u2019un v\xE9hicule arrive derri\xE8re vous :",
            "options": [
              "Vous restez au milieu",
              "Vous vous rabattez sur la voie de droite d\xE8s que possible",
              "Vous freinez fort",
              "Vous acc\xE9l\xE9rez \xE0 150 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "On doit lib\xE9rer les voies de gauche et du milieu pour rouler \xE0 droite."
          }
        ]
      },
      {
        "_id": "lec-7-5",
        "_type": "lecon",
        "title": "Le\xE7on 7.5 \u2014 D\xE9passement des v\xE9hicules sp\xE9ciaux",
        "ordre": 5,
        "description": "D\xE9passement des cyclistes, motos, engins agricoles et convois en gardant une distance de s\xE9curit\xE9 suffisante (1m en ville, 1,5m hors agglo).",
        "videoUrl": "https://www.youtube.com/watch?v=7j0ZiEQy5aY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-7-5-1",
            "questionText": "Pour d\xE9passer un cycliste, quelle distance lat\xE9rale minimale devez-vous laisser ?",
            "options": [
              "0,5 m partout",
              "1 m en agglom\xE9ration et 1,50 m hors agglom\xE9ration",
              "2 m en ville",
              "0,2 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est l\u2019\xE9cart r\xE9glementaire vital pour parer \xE0 un \xE9cart ou coup de vent."
          },
          {
            "_id": "q-lec-7-5-2",
            "questionText": "Est-il autoris\xE9 de chevaucher une ligne continue pour d\xE9passer un cycliste sur route \xE0 double sens ?",
            "options": [
              "Non, jamais",
              "Oui, le chevauchement (sans franchissement total) est exceptionnellement autoris\xE9 si la visibilit\xE9 est bonne",
              "Oui en virage aveugle",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le code autorise le chevauchement d\u2019une ligne continue pour doubler un v\xE9lo en s\xE9curit\xE9."
          },
          {
            "_id": "q-lec-7-5-3",
            "questionText": "Pour d\xE9passer un engin agricole lent et large :",
            "options": [
              "On double sans visibilit\xE9",
              "On attend d\u2019avoir une parfaite visibilit\xE9 et un espace suffisant",
              "On le colle \xE0 1 m\xE8tre",
              "On klaxonne fort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le gabarit des engins agricoles exige une visibilit\xE9 d\xE9gag\xE9e sur une longue distance."
          },
          {
            "_id": "q-lec-7-5-4",
            "questionText": "Peut-on d\xE9passer un chasse-neige en action de d\xE9neigement sur autoroute ?",
            "options": [
              "Oui par la droite",
              "Non, il est strictement interdit de d\xE9passer un engin de service hivernal en action",
              "Oui \xE0 plus de 130 km/h",
              "Oui en le collant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le d\xE9passement d\u2019un chasse-neige en fonctionnement est interdit par la loi."
          },
          {
            "_id": "q-lec-7-5-5",
            "questionText": "Face \xE0 un convoi militaire ou exceptionnel :",
            "options": [
              "On s\u2019ins\xE8re au milieu du convoi",
              "On ne doit jamais couper ni s\u2019intercaler dans un convoi organis\xE9",
              "On les double tous d\u2019un coup",
              "On les bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il est formellement interdit de s\u2019interposer dans une colonne militaire ou un convoi officiel."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-8",
    "_type": "moduleFormation",
    "code": "MOD-008",
    "title": "Module 8 \u2014 Autoroutes et voies rapides",
    "summary": "Insertion, circulation, choix des voies, distances \xE0 grande vitesse, aires de repos, sorties, voies rapides urbaines et proc\xE9dure d'urgence en cas de panne.",
    "learningObjectives": [
      "Ma\xEEtriser l'insertion fluide et prioritaire sur autoroute",
      "Savoir se positionner sur les voies et respecter les distances \xE0 130 km/h",
      "Anticiper les sorties, bifurcations et zones de p\xE9age",
      "Appliquer rigoureusement la proc\xE9dure de s\xE9curit\xE9 en cas de panne sur autoroute (gilet, passagers, glissi\xE8re)"
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
        "title": "Le\xE7on 8.1 \u2014 S\u2019ins\xE9rer et circuler sur autoroute",
        "ordre": 1,
        "description": "Bretelle et voie d\u2019insertion, adaptation \xE0 la vitesse du trafic, positionnement sur les voies et usage de la voie de gauche pour d\xE9passer.",
        "videoUrl": "https://www.youtube.com/watch?v=C4lnJxLXX6s",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-1-1",
            "questionText": "Sur une voie d\u2019insertion, qui a la priorit\xE9 ?",
            "options": [
              "Le v\xE9hicule qui entre",
              "Les v\xE9hicules circulant d\xE9j\xE0 sur l\u2019autoroute",
              "Le plus rapide",
              "Priorit\xE9 \xE0 droite"
            ],
            "correctOptionIndex": 1,
            "explanation": "La voie d\u2019insertion comporte un C\xE9dez le passage : priorit\xE9 au trafic autoroutier."
          },
          {
            "_id": "q-lec-8-1-2",
            "questionText": "Sur autoroute, quelle voie devez-vous occuper en circulation fluide ?",
            "options": [
              "La voie du milieu",
              "La voie de gauche",
              "La voie la plus \xE0 droite",
              "Celle que l\u2019on pr\xE9f\xE8re"
            ],
            "correctOptionIndex": 2,
            "explanation": "La circulation se fait toujours sur la voie de droite, les autres servant aux d\xE9passements."
          },
          {
            "_id": "q-lec-8-1-3",
            "questionText": "A-t-on le droit de faire demi-tour ou marche arri\xE8re sur autoroute ?",
            "options": [
              "Oui au p\xE9age",
              "Non, c\u2019est strictement interdit et puni d\u2019un retrait de 4 points et suspension de permis",
              "Oui si on a rat\xE9 la sortie",
              "Oui sur la BAU"
            ],
            "correctOptionIndex": 1,
            "explanation": "Faire demi-tour ou marche arri\xE8re sur autoroute est un comportement d\u2019une dangerosit\xE9 extr\xEAme."
          },
          {
            "_id": "q-lec-8-1-4",
            "questionText": "Quelle est la vitesse minimale obligatoire sur autoroute sur la voie la plus \xE0 gauche par temps sec et fluide ?",
            "options": [
              "60 km/h",
              "80 km/h",
              "100 km/h",
              "110 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur la voie la plus \xE0 gauche, il est interdit de rouler \xE0 moins de 80 km/h en conditions normales."
          },
          {
            "_id": "q-lec-8-1-5",
            "questionText": "Sur voie d\u2019insertion, pour faciliter l\u2019entr\xE9e d\u2019un v\xE9hicule, un conducteur sur la voie de droite peut :",
            "options": [
              "Piler",
              "Se d\xE9porter sur la voie du milieu si elle est totalement libre en s\xE9curit\xE9",
              "Klaxonner",
              "Acc\xE9l\xE9rer fort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Changer de voie pour lib\xE9rer la voie de droite est une excellente mesure de courtoisie."
          }
        ]
      },
      {
        "_id": "lec-8-2",
        "_type": "lecon",
        "title": "Le\xE7on 8.2 \u2014 Files, distances et changement de voie sur autoroute",
        "ordre": 2,
        "description": "Distances de s\xE9curit\xE9 \xE0 vitesse \xE9lev\xE9e, v\xE9rification des angles morts et changement de voie progressif et signal\xE9.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-2-1",
            "questionText": "\xC0 130 km/h, quelle distance parcourt-on en 1 seule seconde de temps de r\xE9action ?",
            "options": [
              "15 m\xE8tres",
              "26 m\xE8tres",
              "39 m\xE8tres environ",
              "80 m\xE8tres"
            ],
            "correctOptionIndex": 2,
            "explanation": "Formule : 13 x 3 = 39 m\xE8tres parcourus en un clin d\u2019\u0153il."
          },
          {
            "_id": "q-lec-8-2-2",
            "questionText": "Combien de m\xE8tres d\u2019intervalle de s\xE9curit\xE9 doit-on laisser \xE0 130 km/h sur autoroute ?",
            "options": [
              "30 m\xE8tres",
              "50 m\xE8tres",
              "Au moins 78 m\xE8tres (2 traits de bande d\u2019arr\xEAt d\u2019urgence)",
              "150 m\xE8tres"
            ],
            "correctOptionIndex": 2,
            "explanation": "Formule : 13 x 6 = 78 m\xE8tres, mat\xE9rialis\xE9s par 2 bandes blanches de BAU."
          },
          {
            "_id": "q-lec-8-2-3",
            "questionText": "Avant de changer de voie \xE0 130 km/h, quelle est la r\xE8gle ?",
            "options": [
              "Braquer vite",
              "R\xE9troviseurs central et gauche, coup d\u2019\u0153il angle mort, clignotant, puis d\xE9port progressif",
              "Klaxonner",
              "Freiner"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 vitesse \xE9lev\xE9e, toute man\u0153uvre doit \xEAtre souple et anticip\xE9e."
          },
          {
            "_id": "q-lec-8-2-4",
            "questionText": "En cas de ralentissement soudain ou bouchon sur autoroute, vous devez imm\xE9diatement :",
            "options": [
              "Faire demi-tour",
              "Allumer les feux de d\xE9tresse pour avertir les v\xE9hicules qui vous suivent",
              "Rouler sur la BAU",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de d\xE9tresse pr\xE9viennent le risque de collision en cha\xEEne par l\u2019arri\xE8re."
          },
          {
            "_id": "q-lec-8-2-5",
            "questionText": "Le louvoiement ou zigzag d\u2019une voie \xE0 l\u2019autre dans les bouchons :",
            "options": [
              "Fait gagner 1 heure",
              "Est dangereux, interdit et ne fait gagner aucun temps significatif",
              "Est conseill\xE9",
              "Est obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Changer constamment de file perturbe le trafic et augmente le risque d\u2019accrochage."
          }
        ]
      },
      {
        "_id": "lec-8-3",
        "_type": "lecon",
        "title": "Le\xE7on 8.3 \u2014 Aires de repos, sorties et signalisation autorouti\xE8re",
        "ordre": 3,
        "description": "Signalisation verte, aires de repos et de service, anticipation des sorties et placement suffisamment t\xF4t \xE0 droite.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-3-1",
            "questionText": "Tous les combien de kilom\xE8tres trouve-t-on en moyenne une aire de repos sur autoroute ?",
            "options": [
              "Tous les 5 km",
              "Tous les 15 \xE0 20 km environ",
              "Tous les 100 km",
              "Une seule par d\xE9partement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les aires de repos sont r\xE9parties r\xE9guli\xE8rement pour permettre la pause des 2 heures."
          },
          {
            "_id": "q-lec-8-3-2",
            "questionText": "Pour emprunter une sortie d\u2019autoroute, o\xF9 doit-on commencer \xE0 freiner ?",
            "options": [
              "Sur la voie de droite de l\u2019autoroute",
              "Uniquement une fois totalement engag\xE9 sur la voie de d\xE9c\xE9l\xE9ration",
              "Sur la voie de gauche",
              "Dans le virage serr\xE9"
            ],
            "correctOptionIndex": 1,
            "explanation": "On ne ralentit jamais sur les voies de circulation rapide : on freine sur la voie de sortie."
          },
          {
            "_id": "q-lec-8-3-3",
            "questionText": "Les panneaux d\u2019annonce de bifurcation ou sortie sont plac\xE9s \xE0 :",
            "options": [
              "10 m\xE8tres",
              "2000 m, 1000 m, 500 m et au niveau de la bretelle",
              "100 m\xE8tres seulement",
              "50 m\xE8tres"
            ],
            "correctOptionIndex": 1,
            "explanation": "La signalisation autorouti\xE8re est tr\xE8s en amont pour laisser le temps de se rabattre."
          },
          {
            "_id": "q-lec-8-3-4",
            "questionText": "\xC0 une gare de p\xE9age, les voies signal\xE9es par une fl\xE8che verte autorisent :",
            "options": [
              "Tous les v\xE9hicules pour paiement carte, esp\xE8ces ou t\xE9l\xE9p\xE9age",
              "Uniquement les camions",
              "Uniquement le t\xE9l\xE9p\xE9age sans arr\xEAt",
              "Les motos seulement"
            ],
            "correctOptionIndex": 0,
            "explanation": "La fl\xE8che verte indique que la voie est ouverte \xE0 tous les modes de paiement standard."
          },
          {
            "_id": "q-lec-8-3-5",
            "questionText": "Les voies de p\xE9age marqu\xE9es d\u2019un \xAB t \xBB orange r\xE9servent le passage \xE0 :",
            "options": [
              "Tous les v\xE9hicules",
              "Exclusivement aux abonn\xE9s au t\xE9l\xE9p\xE9age \xE9lectronique",
              "Aux transports de fonds",
              "Aux taxis"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces voies sont r\xE9serv\xE9es aux v\xE9hicules \xE9quip\xE9s d\u2019un badge Liber-t actif."
          }
        ]
      },
      {
        "_id": "lec-8-4",
        "_type": "lecon",
        "title": "Le\xE7on 8.4 \u2014 Conduite en cas de panne ou d\u2019accident sur autoroute",
        "ordre": 4,
        "description": "Bande d\u2019arr\xEAt d\u2019urgence, feux de d\xE9tresse, gilet, sortie c\xF4t\xE9 droit et mise \xE0 l\u2019abri derri\xE8re la glissi\xE8re.",
        "videoUrl": "https://www.youtube.com/watch?v=yEuJJut8Jmg",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-4-1",
            "questionText": "En cas de panne sur autoroute, quel est l\u2019ordre chronologique vital \xE0 respecter ?",
            "options": [
              "Sortir \xE0 gauche, poser le triangle \xE0 100 m, attendre dans la voiture",
              "Allumer feux de d\xE9tresse, serrer sur la BAU, enfiler le gilet \xE0 bord, faire sortir tous les passagers par la droite et se r\xE9fugier derri\xE8re la glissi\xE8re",
              "Pousser la voiture vers la sortie",
              "T\xE9l\xE9phoner au volant"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise \xE0 l\u2019abri imm\xE9diate de tous les passagers derri\xE8re la glissi\xE8re de s\xE9curit\xE9 est vitale."
          },
          {
            "_id": "q-lec-8-4-2",
            "questionText": "Doit-on poser le triangle de pr\xE9signalisation sur la chauss\xE9e d\u2019une autoroute ?",
            "options": [
              "Oui obligatoirement \xE0 150 m",
              "Non, sur autoroute la pose du triangle n\u2019est pas obligatoire si elle met en danger la vie du conducteur",
              "Oui au milieu de la voie",
              "Oui sur le toit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Remonter l\u2019autoroute \xE0 pied pour poser le triangle pr\xE9sente un risque mortel et n\u2019est pas requis."
          },
          {
            "_id": "q-lec-8-4-3",
            "questionText": "Pour appeler les secours d\u2019autoroute en cas d\u2019accident ou panne, que privil\xE9gier ?",
            "options": [
              "Faire du stop",
              "Utiliser une borne d\u2019appel d\u2019urgence orange (tous les 2 km) ou l\u2019application officielle SOS",
              "Appeler un ami",
              "Attendre le passage des gendarmes"
            ],
            "correctOptionIndex": 1,
            "explanation": "La borne d\u2019urgence g\xE9olocalise instantan\xE9ment votre position exacte pour les patrouilleurs."
          },
          {
            "_id": "q-lec-8-4-4",
            "questionText": "Quelle est la dur\xE9e de vie moyenne d\u2019un pi\xE9ton sur la bande d\u2019arr\xEAt d\u2019urgence d\u2019une autoroute ?",
            "options": [
              "Plusieurs heures",
              "Moins de 20 minutes",
              "Une journ\xE9e",
              "Aucun danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "La BAU est extr\xEAmement dangereuse : il faut imm\xE9diatement passer derri\xE8re les glissi\xE8res."
          },
          {
            "_id": "q-lec-8-4-5",
            "questionText": "O\xF9 doivent attendre les passagers pendant le d\xE9pannage sur autoroute ?",
            "options": [
              "Dans l\u2019habitacle assis avec ceinture",
              "Debout sur la BAU",
              "Derri\xE8re la glissi\xE8re de s\xE9curit\xE9 m\xE9tallique ou sur le talus",
              "Au bord de la route"
            ],
            "correctOptionIndex": 2,
            "explanation": "Personne ne doit rester \xE0 l\u2019int\xE9rieur du v\xE9hicule immobilis\xE9 sur la BAU."
          }
        ]
      },
      {
        "_id": "lec-8-5",
        "_type": "lecon",
        "title": "Le\xE7on 8.5 \u2014 Voies rapides urbaines et p\xE9riph\xE9riques",
        "ordre": 5,
        "description": "Particularit\xE9s des voies rapides urbaines : insertions fr\xE9quentes, vitesse r\xE9glement\xE9e, demi-tour et arr\xEAt interdits hors urgence.",
        "videoUrl": "https://www.youtube.com/watch?v=pS_OLzKKimY",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-8-5-1",
            "questionText": "Quelle est la limitation de vitesse sur le boulevard p\xE9riph\xE9rique parisien et de nombreuses rocades urbaines ?",
            "options": [
              "90 km/h",
              "70 km/h ou 80 km/h selon la signalisation locale",
              "130 km/h",
              "110 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les voies rapides urbaines ont des limitations abaiss\xE9es (ex: 70 ou 80 km/h)."
          },
          {
            "_id": "q-lec-8-5-2",
            "questionText": "Sur le p\xE9riph\xE9rique parisien historique, quelle est la particularit\xE9 des voies d\u2019insertion ?",
            "options": [
              "Les v\xE9hicules sur l\u2019anneau sont prioritaires",
              "Les v\xE9hicules entrants b\xE9n\xE9ficient de la priorit\xE9 \xE0 droite",
              "Priorit\xE9 aux camions",
              "Feu vert permanent"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le p\xE9riph\xE9rique parisien applique historiquement la priorit\xE9 \xE0 droite aux bretelles d\u2019acc\xE8s."
          },
          {
            "_id": "q-lec-8-5-3",
            "questionText": "Sur une voie rapide urbaine \xE0 fort trafic, les changements fr\xE9quents de file :",
            "options": [
              "Font gagner beaucoup de temps",
              "Provoquent des ralentissements en accord\xE9on et augmentent le risque d\u2019accrochage",
              "Sont obligatoires",
              "Sont autoris\xE9s sans clignotant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Garder sa file stabilise la circulation et \xE9vite l\u2019effet accord\xE9on."
          },
          {
            "_id": "q-lec-8-5-4",
            "questionText": "Les deux-roues motoris\xE9s en circulation inter-files sur voies rapides urbaines :",
            "options": [
              "Doivent rouler \xE0 130 km/h",
              "Peuvent circuler entre les 2 voies les plus \xE0 gauche \xE0 vitesse mod\xE9r\xE9e (max 50 km/h) lorsque le trafic est congestionn\xE9",
              "Sont prioritaires sur tout",
              "N\u2019ont aucun droit"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019exp\xE9rimentation encadre l\u2019inter-files entre les voies de gauche \xE0 50 km/h max en cas d\u2019embouteillage."
          },
          {
            "_id": "q-lec-8-5-5",
            "questionText": "En cas de panne sur voie rapide urbaine sans BAU :",
            "options": [
              "On abandonne la voiture au milieu",
              "On allume les feux de d\xE9tresse, serre au maximum le trottoir/glissi\xE8re et prot\xE8ge les occupants",
              "On fait marche arri\xE8re",
              "On klaxonne"
            ],
            "correctOptionIndex": 1,
            "explanation": "On s\xE9curise au maximum le v\xE9hicule et on fait \xE9vacuer les passagers vers un lieu s\xFBr."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-9",
    "_type": "moduleFormation",
    "code": "MOD-009",
    "title": "Module 9 \u2014 Conduite de nuit et m\xE9t\xE9o difficile",
    "summary": "Conduite nocturne, utilisation optimale des feux, adh\xE9rence et aquaplaning sous la pluie, brouillard, neige, verglas et vent fort.",
    "learningObjectives": [
      "Ma\xEEtriser l'usage r\xE9glementaire de tous les feux (position, croisement, route, brouillard)",
      "Comprendre et pr\xE9venir le ph\xE9nom\xE8ne dangereux d'aquaplaning sous la pluie",
      "Conduire en s\xE9curit\xE9 par brouillard dense et respecter la r\xE8gle des 50 km/h",
      "Adapter la conduite sur neige et verglas avec \xE9quipements sp\xE9ciaux (cha\xEEnes, chaussettes, pneus hiver)"
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
        "title": "Le\xE7on 9.1 \u2014 Conduite de nuit et usage des feux",
        "ordre": 1,
        "description": "Feux de croisement et feux de route, pr\xE9vention de l\u2019\xE9blouissement, visibilit\xE9 r\xE9duite et vigilance accrue.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-1-1",
            "questionText": "La nuit sur route non \xE9clair\xE9e sans aucun v\xE9hicule devant ni en face, vous roulez en :",
            "options": [
              "Feux de position seuls",
              "Feux de croisement",
              "Feux de route (pleins phares)",
              "Feux de d\xE9tresse"
            ],
            "correctOptionIndex": 2,
            "explanation": "Les feux de route \xE9clairent \xE0 au moins 100 m\xE8tres et sont requis hors agglom\xE9ration sans g\xEAne pour autrui."
          },
          {
            "_id": "q-lec-9-1-2",
            "questionText": "\xC0 quelle distance minimale \xE9clairent les feux de croisement ?",
            "options": [
              "10 m\xE8tres",
              "30 m\xE8tres",
              "100 m\xE8tres",
              "200 m\xE8tres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de croisement \xE9clairent \xE0 au moins 30 m\xE8tres vers l\u2019avant sans \xE9blouir."
          },
          {
            "_id": "q-lec-9-1-3",
            "questionText": "En agglom\xE9ration bien \xE9clair\xE9e la nuit, quels feux devez-vous utiliser ?",
            "options": [
              "Feux de route",
              "Feux de croisement",
              "Feux \xE9teints",
              "Feux antibrouillard"
            ],
            "correctOptionIndex": 1,
            "explanation": "En ville \xE9clair\xE9e, on circule en feux de croisement pour \xEAtre vu et voir la chauss\xE9e."
          },
          {
            "_id": "q-lec-9-1-4",
            "questionText": "D\xE8s que vous croisez ou suivez un autre v\xE9hicule de nuit, vous devez :",
            "options": [
              "Garder les feux de route",
              "Passer en feux de croisement",
              "\xC9teindre les feux",
              "Faire des appels de phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le passage en feux de croisement \xE9vite d\u2019\xE9blouir les autres conducteurs."
          },
          {
            "_id": "q-lec-9-1-5",
            "questionText": "Pour r\xE9duire l\u2019\xE9blouissement caus\xE9 par un v\xE9hicule derri\xE8re vous, vous pouvez :",
            "options": [
              "Acc\xE9l\xE9rer",
              "Basculer le r\xE9troviseur int\xE9rieur en position nuit",
              "Fermer les yeux",
              "Freiner brusquement"
            ],
            "correctOptionIndex": 1,
            "explanation": "La languette anti-\xE9blouissement ou le miroir \xE9lectrochrome att\xE9nue le reflet des phares."
          }
        ]
      },
      {
        "_id": "lec-9-2",
        "_type": "lecon",
        "title": "Le\xE7on 9.2 \u2014 Conduite sous la pluie",
        "ordre": 2,
        "description": "Adh\xE9rence r\xE9duite, aquaplaning, essuie-glaces, feux, distances de freinage et r\xE9duction de vitesse.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-2-1",
            "questionText": "Quels feux allumer obligatoirement lorsqu\u2019il pleut ?",
            "options": [
              "Feux de position seuls",
              "Feux de croisement (avec essuie-glaces)",
              "Feux de route",
              "Feux de brouillard arri\xE8re"
            ],
            "correctOptionIndex": 1,
            "explanation": "D\xE8s qu\u2019il pleut, les feux de croisement sont obligatoires pour \xEAtre visible."
          },
          {
            "_id": "q-lec-9-2-2",
            "questionText": "Les feux de brouillard arri\xE8re sont-ils autoris\xE9s sous une forte pluie ?",
            "options": [
              "Oui toujours",
              "Non, c\u2019est strictement interdit car ils \xE9blouissent fortement les usagers qui suivent",
              "Oui sur autoroute",
              "Oui la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de brouillard arri\xE8re sont interdits sous la pluie (r\xE9serv\xE9s \xE0 brouillard et neige)."
          },
          {
            "_id": "q-lec-9-2-3",
            "questionText": "Qu\u2019est-ce que le ph\xE9nom\xE8ne d\u2019aquaplaning (ou aquaplanage) ?",
            "options": [
              "Un nettoyage automatique des pneus",
              "La perte totale de contact entre le pneu et la route \xE0 cause d\u2019un film d\u2019eau non \xE9vacu\xE9",
              "Un freinage puissant",
              "Une acc\xE9l\xE9ration soudaine"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le pneu flotte sur l\u2019eau, entra\xEEnant la perte totale du contr\xF4le directionnel et des freins."
          },
          {
            "_id": "q-lec-9-2-4",
            "questionText": "Que faire en cas d\u2019amorce d\u2019aquaplaning ?",
            "options": [
              "Freiner de toutes ses forces et tourner le volant",
              "Maintenir le volant droit, rel\xE2cher doucement l\u2019acc\xE9l\xE9rateur sans freiner brusquement",
              "Acc\xE9l\xE9rer",
              "Tirer le frein \xE0 main"
            ],
            "correctOptionIndex": 1,
            "explanation": "On d\xE9braye ou rel\xE2che l\u2019acc\xE9l\xE9rateur en gardant les roues droites pour retrouver l\u2019adh\xE9rence."
          },
          {
            "_id": "q-lec-9-2-5",
            "questionText": "Sous la pluie, la vitesse sur autoroute est r\xE9duite de 130 km/h \xE0 :",
            "options": [
              "120 km/h",
              "110 km/h",
              "100 km/h",
              "90 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse passe de 130 \xE0 110 km/h sur autoroute par temps pluvieux."
          }
        ]
      },
      {
        "_id": "lec-9-3",
        "_type": "lecon",
        "title": "Le\xE7on 9.3 \u2014 Conduite par brouillard",
        "ordre": 3,
        "description": "R\xE9duction de l\u2019allure, feux adapt\xE9s, interdiction pratique des feux de route \xE0 cause de la r\xE9verb\xE9ration et distances accrues.",
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
              "Ils s\u2019usent trop vite",
              "La lumi\xE8re se refl\xE8te sur les gouttelettes d\u2019eau en formant un \xAB mur blanc \xBB opaque et \xE9blouissant",
              "Ils sont interdits le matin",
              "Ils chauffent trop"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux de route cr\xE9ent un mur opaque \xE9blouissant par r\xE9verb\xE9ration sur le brouillard."
          },
          {
            "_id": "q-lec-9-3-2",
            "questionText": "Quels feux utiliser par temps de brouillard ?",
            "options": [
              "Feux de croisement et feux antibrouillard avant/arri\xE8re si le v\xE9hicule en est \xE9quip\xE9",
              "Feux de position seuls",
              "Feux de route",
              "Feux de d\xE9tresse seuls"
            ],
            "correctOptionIndex": 0,
            "explanation": "Feux de croisement compl\xE9t\xE9s par les antibrouillards avant et arri\xE8re."
          },
          {
            "_id": "q-lec-9-3-3",
            "questionText": "Lorsque la visibilit\xE9 est inf\xE9rieure \xE0 50 m\xE8tres par brouillard dense, la vitesse est limit\xE9e \xE0 :",
            "options": [
              "30 km/h",
              "50 km/h sur toutes les routes et autoroutes",
              "70 km/h",
              "90 km/h"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse maximale est de 50 km/h partout d\xE8s que la visibilit\xE9 tombe sous 50 m."
          },
          {
            "_id": "q-lec-9-3-4",
            "questionText": "Quel rep\xE8re visuel peut aider \xE0 maintenir sa trajectoire dans un brouillard \xE9pais ?",
            "options": [
              "Regarder le ciel",
              "La ligne de rive peinte sur le bord droit de la chauss\xE9e",
              "Le milieu de la route",
              "Les panneaux publicitaires"
            ],
            "correctOptionIndex": 1,
            "explanation": "La ligne blanche de droite guide le conducteur le long du bas-c\xF4t\xE9."
          },
          {
            "_id": "q-lec-9-3-5",
            "questionText": "D\xE8s que l\u2019on sort de la nappe de brouillard, quelle est l\u2019obligation imm\xE9diate ?",
            "options": [
              "Acc\xE9l\xE9rer \xE0 fond",
              "\xC9teindre imm\xE9diatement les feux de brouillard arri\xE8re pour ne pas \xE9blouir",
              "Allumer les feux de d\xE9tresse",
              "Couper le moteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les feux antibrouillard arri\xE8re doivent \xEAtre \xE9teints d\xE8s que le brouillard dispara\xEEt."
          }
        ]
      },
      {
        "_id": "lec-9-4",
        "_type": "lecon",
        "title": "Le\xE7on 9.4 \u2014 Conduite sur neige et verglas",
        "ordre": 4,
        "description": "\xC9quipements adapt\xE9s, conduite souple, anticipation, freinage progressif et augmentation importante des distances.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-4-1",
            "questionText": "Sur une chauss\xE9e enneig\xE9e ou verglac\xE9e, la distance de freinage peut \xEAtre multipli\xE9e par :",
            "options": [
              "2",
              "Jusqu\u2019\xE0 4 ou 10 fois par rapport au sol sec",
              "Elle est divis\xE9e par 2",
              "Inchang\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019absence d\u2019adh\xE9rence allonge consid\xE9rablement la distance d\u2019arr\xEAt."
          },
          {
            "_id": "q-lec-9-4-2",
            "questionText": "Quelle est la r\xE8gle de conduite fondamentale sur neige ou verglas ?",
            "options": [
              "Conduite agressive",
              "Conduite ultra-souple : acc\xE9l\xE9rations tr\xE8s progressives, frein moteur, gestes mesur\xE9s",
              "Freiner fort dans les virages",
              "Rouler en surr\xE9gime"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout geste brusque provoque un d\xE9crochage instantan\xE9 du v\xE9hicule."
          },
          {
            "_id": "q-lec-9-4-3",
            "questionText": "Que signifie le panneau rond bleu B26 repr\xE9sentant un pneu avec des cha\xEEnes ?",
            "options": [
              "Pneus neige interdits",
              "Obligation de circuler avec des cha\xEEnes \xE0 neige sur au moins deux roues motrices",
              "Zone de ski",
              "Garage proche"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le panneau B26 rend obligatoire le port de cha\xEEnes ou chaussettes homologu\xE9es."
          },
          {
            "_id": "q-lec-9-4-4",
            "questionText": "En cas de d\xE9marrage sur neige ou verglas avec patinage des roues, on peut :",
            "options": [
              "Acc\xE9l\xE9rer \xE0 fond en 1\xE8re",
              "D\xE9marrer en 2\xE8me vitesse \xE0 tr\xE8s bas r\xE9gime avec un filet de gaz",
              "Tirer le frein \xE0 main",
              "Couper le contact"
            ],
            "correctOptionIndex": 1,
            "explanation": "D\xE9marrer en 2\xE8me vitesse r\xE9duit le couple aux roues et limite le patinage."
          },
          {
            "_id": "q-lec-9-4-5",
            "questionText": "Par temps de neige, quels feux sont autoris\xE9s pour circuler ?",
            "options": [
              "Feux de croisement et feux de brouillard avant et arri\xE8re",
              "Feux de position seuls",
              "Feux de route en continu",
              "Feux de d\xE9tresse"
            ],
            "correctOptionIndex": 0,
            "explanation": "La neige autorise l\u2019usage des antibrouillards avant et arri\xE8re avec les feux de croisement."
          }
        ]
      },
      {
        "_id": "lec-9-5",
        "_type": "lecon",
        "title": "Le\xE7on 9.5 \u2014 Vent fort et autres conditions difficiles",
        "ordre": 5,
        "description": "Risques de vent lat\xE9ral sur les ponts et zones d\xE9gag\xE9es, \xE9carts de trajectoire et d\xE9cision de reporter un trajet en cas de conditions extr\xEAmes.",
        "videoUrl": "https://www.youtube.com/watch?v=cHlvKr08BDs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-9-5-1",
            "questionText": "Sur un viaduc ou en sortant d\u2019une zone bois\xE9e abrit\xE9e par vent violent, le risque majeur est :",
            "options": [
              "Une panne de batterie",
              "Une violente embard\xE9e lat\xE9rale de trajectoire pouvant d\xE9porter le v\xE9hicule",
              "L\u2019aquaplaning",
              "L\u2019\xE9blouissement"
            ],
            "correctOptionIndex": 1,
            "explanation": "La bourrasque de vent lat\xE9ral pousse brutalement le v\xE9hicule sur le c\xF4t\xE9."
          },
          {
            "_id": "q-lec-9-5-2",
            "questionText": "Face \xE0 un vent fort lat\xE9ral, que devez-vous faire ?",
            "options": [
              "Acc\xE9l\xE9rer pour couper le vent",
              "R\xE9duire la vitesse, tenir fermement le volant \xE0 deux mains et anticiper les zones expos\xE9es",
              "L\xE2cher le volant",
              "Mettre les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "R\xE9duire l\u2019allure diminue la prise au vent et redonne du contr\xF4le au conducteur."
          },
          {
            "_id": "q-lec-9-5-3",
            "questionText": "Que signale une manche \xE0 air sur le bord d\u2019une voie rapide ?",
            "options": [
              "Un a\xE9roport",
              "La pr\xE9sence d\u2019une zone expos\xE9e \xE0 de forts vents lat\xE9raux ainsi que la force et direction du vent",
              "Une zone de repos",
              "Une station m\xE9t\xE9o priv\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "La manche \xE0 air indique l\u2019intensit\xE9 et le sens des rafales de vent."
          },
          {
            "_id": "q-lec-9-5-4",
            "questionText": "Quel type de v\xE9hicule est le plus vuln\xE9rable au vent violent ?",
            "options": [
              "Les voitures basses",
              "Les deux-roues, v\xE9hicules tractant une caravane, camping-cars et fourgons hauts",
              "Les poids lourds charg\xE9s",
              "Les trains"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur grande surface lat\xE9rale ou leur \xE9quilibre pr\xE9caire les rend tr\xE8s sensibles au vent."
          },
          {
            "_id": "q-lec-9-5-5",
            "questionText": "Si les conditions m\xE9t\xE9o deviennent extr\xEAmes (temp\xEAte, pluies torrentielles inondant la route) :",
            "options": [
              "Il faut rouler \xE0 130 km/h pour arriver plus vite",
              "La meilleure d\xE9cision de s\xE9curit\xE9 est de reporter son trajet ou de s\u2019arr\xEAter en lieu s\xFBr",
              "Rouler sur la BAU",
              "Couper les phares"
            ],
            "correctOptionIndex": 1,
            "explanation": "Savoir renoncer \xE0 prendre la route est un comportement responsable fondamental."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-10",
    "_type": "moduleFormation",
    "code": "MOD-010",
    "title": "Module 10 \u2014 Alcool, drogues, fatigue et capacit\xE9s",
    "summary": "Impacts de l'alcool et stup\xE9fiants, pictogrammes m\xE9dicaments, somnolence, t\xE9l\xE9phone au volant et aptitudes physiques \xE0 la conduite.",
    "learningObjectives": [
      "Conna\xEEtre les seuils l\xE9gaux d'alcool\xE9mie (0,2 g/l en permis probatoire, 0,5 g/l en confirm\xE9)",
      "Comprendre les effets des stup\xE9fiants, drogues et m\xE9langes avec l'alcool",
      "Identifier les pictogrammes de niveau de risque des m\xE9dicaments (Niveaux 1, 2, 3)",
      "Reconna\xEEtre les signes pr\xE9curseurs de somnolence et respecter la pause obligatoire de 2 heures"
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
        "title": "Le\xE7on 10.1 \u2014 Alcool et conduite",
        "ordre": 1,
        "description": "Seuils d\u2019alcool\xE9mie, baisse des r\xE9flexes et du jugement, risques, d\xE9pistage et sanctions.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-1-1",
            "questionText": "Quel est le taux maximal l\xE9gal d\u2019alcool\xE9mie pour un jeune conducteur en permis probatoire ?",
            "options": [
              "0,0 g/l",
              "0,2 g/l de sang (soit 0,10 mg/l d\u2019air expir\xE9 = 0 verre)",
              "0,5 g/l",
              "0,8 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite est de 0,2 g/l en permis probatoire, ce qui \xE9quivaut \xE0 tol\xE9rance z\xE9ro."
          },
          {
            "_id": "q-lec-10-1-2",
            "questionText": "Quel est le taux maximal autoris\xE9 pour un conducteur confirm\xE9 ?",
            "options": [
              "0,2 g/l",
              "0,5 g/l de sang (ou 0,25 mg/l d\u2019air expir\xE9)",
              "0,8 g/l",
              "1,0 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil contraventionnel d\xE9bute \xE0 0,5 g/l de sang."
          },
          {
            "_id": "q-lec-10-1-3",
            "questionText": "\xC0 partir de quel taux d\u2019alcool\xE9mie l\u2019infraction devient-elle un D\xC9LIT p\xE9nal (tribunal correctionnel) ?",
            "options": [
              "0,5 g/l",
              "0,8 g/l de sang (ou 0,40 mg/l d\u2019air)",
              "1,5 g/l",
              "2,0 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "D\xE8s 0,8 g/l, il s\u2019agit d\u2019un d\xE9lit passible de 2 ans de prison, 4500 \u20AC d\u2019amende et 6 points."
          },
          {
            "_id": "q-lec-10-1-4",
            "questionText": "En moyenne, combien de temps faut-il \xE0 l\u2019organisme pour \xE9liminer un verre d\u2019alcool standard ?",
            "options": [
              "15 minutes",
              "1 heure \xE0 2 heures par verre",
              "5 minutes en buvant du caf\xE9",
              "24 heures"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019alcool s\u2019\xE9limine au rythme moyen de 0,10 \xE0 0,15 g/l par heure. Aucun rem\xE8de miracle n\u2019acc\xE9l\xE8re l\u2019\xE9limination."
          },
          {
            "_id": "q-lec-10-1-5",
            "questionText": "Quels sont les premiers effets de l\u2019alcool sur le comportement du conducteur ?",
            "options": [
              "Meilleurs r\xE9flexes",
              "Surestimation de ses capacit\xE9s, euphorie, r\xE9tr\xE9cissement du champ visuel et temps de r\xE9action allong\xE9",
              "Vue parfaite",
              "Sommeil instantan\xE9"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019alcool d\xE9sinhibe, fausse le jugement et ralentit les r\xE9flexes c\xE9r\xE9braux."
          }
        ]
      },
      {
        "_id": "lec-10-2",
        "_type": "lecon",
        "title": "Le\xE7on 10.2 \u2014 Drogues et m\xE9dicaments",
        "ordre": 2,
        "description": "Effets des stup\xE9fiants, d\xE9pistage, pictogrammes des m\xE9dicaments et danger du m\xE9lange alcool-m\xE9dicaments.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-2-1",
            "questionText": "La conduite apr\xE8s usage de stup\xE9fiants (cannabis, coca\xEFne, etc.) est-elle tol\xE9r\xE9e ?",
            "options": [
              "Tol\xE9rance pour 1 joint",
              "Strictement interdite (tol\xE9rance z\xE9ro), d\xE9pist\xE9e par test salivaire et passible de 2 ans de prison et 6 points",
              "Autoris\xE9e le week-end",
              "Autoris\xE9e hors autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sous stup\xE9fiants est un d\xE9lit r\xE9prim\xE9 s\xE9v\xE8rement d\xE8s la moindre trace."
          },
          {
            "_id": "q-lec-10-2-2",
            "questionText": "Que signifie un pictogramme de m\xE9dicament repr\xE9sentant un triangle ROUGE avec une voiture (Niveau 3) ?",
            "options": [
              "Conduite autoris\xE9e",
              "Conduite formellement d\xE9conseill\xE9e / interdite pendant le traitement",
              "Prendre l\u2019autoroute",
              "Aucun danger"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau 3 (rouge) interdit la conduite automobile pendant la dur\xE9e du traitement."
          },
          {
            "_id": "q-lec-10-2-3",
            "questionText": "Le pictogramme JAUNE (Niveau 1) sur une bo\xEEte de m\xE9dicaments indique :",
            "options": [
              "Danger mortel",
              "Soyez prudent, lisez attentivement la notice avant de prendre le volant",
              "Interdiction de conduire",
              "Prendre le volant vite"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau 1 appelle \xE0 la prudence et \xE0 la lecture de la notice."
          },
          {
            "_id": "q-lec-10-2-4",
            "questionText": "Le m\xE9lange alcool + m\xE9dicaments ou stup\xE9fiants a pour cons\xE9quence :",
            "options": [
              "D\u2019annuler les effets",
              "De multiplier de fa\xE7on exponentielle les risques d\u2019accident et la somnolence",
              "D\u2019am\xE9liorer la vision",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cocktail alcool-substances d\xE9multiplie les effets toxiques et destructeurs."
          },
          {
            "_id": "q-lec-10-2-5",
            "questionText": "Le cannabis alt\xE8re les capacit\xE9s du conducteur pendant combien de temps apr\xE8s la prise ?",
            "options": [
              "10 minutes",
              "Plusieurs heures voire plusieurs jours pour certaines facult\xE9s de r\xE9flexes",
              "Aucun effet",
              "1 minute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les principes actifs restent pr\xE9sents dans l\u2019organisme et perturbent l\u2019attention sur une longue dur\xE9e."
          }
        ]
      },
      {
        "_id": "lec-10-3",
        "_type": "lecon",
        "title": "Le\xE7on 10.3 \u2014 Fatigue et somnolence au volant",
        "ordre": 3,
        "description": "Signes de fatigue, danger de l\u2019endormissement, pauses r\xE9guli\xE8res et sieste courte.",
        "videoUrl": "https://www.youtube.com/watch?v=bpg9a-uvp8U",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-3-1",
            "questionText": "Tous les combien de temps est-il imp\xE9ratif de faire une pause lors d\u2019un long trajet ?",
            "options": [
              "Toutes les 5 heures",
              "Toutes les 2 heures au moins, pendant 15 \xE0 20 minutes",
              "Une seule pause \xE0 l\u2019arriv\xE9e",
              "Tous les 1000 km"
            ],
            "correctOptionIndex": 1,
            "explanation": "La r\xE8gle des 2 heures permet de reposer le syst\xE8me nerveux et les yeux."
          },
          {
            "_id": "q-lec-10-3-2",
            "questionText": "Quels sont les premiers signaux d\u2019alerte de la fatigue au volant ?",
            "options": [
              "B\xE2illements r\xE9p\xE9t\xE9s, paupi\xE8res lourdes, picotements des yeux, raideur dans la nuque",
              "Une grande \xE9nergie",
              "Faim de sucre",
              "La radio trop forte"
            ],
            "correctOptionIndex": 0,
            "explanation": "Ces signes pr\xE9curseurs imposent de s\u2019arr\xEAter imm\xE9diatement sur la prochaine aire."
          },
          {
            "_id": "q-lec-10-3-3",
            "questionText": "Quel est le seul moyen r\xE9ellement efficace pour lutter contre une somnolence install\xE9e ?",
            "options": [
              "Ouvrir la fen\xEAtre et monter la musique",
              "Boire 3 caf\xE9s",
              "S\u2019arr\xEAter pour faire une courte sieste de 15 \xE0 20 minutes",
              "Manger du chewing-gum"
            ],
            "correctOptionIndex": 2,
            "explanation": "Seul le sommeil r\xE9el (micro-sieste) recharge les capacit\xE9s de vigilance du cerveau."
          },
          {
            "_id": "q-lec-10-3-4",
            "questionText": "\xC0 quelle p\xE9riode de la journ\xE9e le risque d\u2019endormissement est-il statistiquement le plus \xE9lev\xE9 ?",
            "options": [
              "\xC0 midi",
              "Entre 2h et 6h du matin, et entre 13h et 16h (creux circadien)",
              "\xC0 18h",
              "\xC0 10h du matin"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces cr\xE9neaux correspondent aux baisses physiologiques de la temp\xE9rature corporelle."
          },
          {
            "_id": "q-lec-10-3-5",
            "questionText": "La somnolence au volant est la premi\xE8re cause de mortalit\xE9 sur :",
            "options": [
              "Les routes de campagne",
              "Les autoroutes",
              "Les parkings",
              "Les ronds-points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Sur autoroute, 1 accident mortel sur 3 est d\xFB \xE0 l\u2019endormissement."
          }
        ]
      },
      {
        "_id": "lec-10-4",
        "_type": "lecon",
        "title": "Le\xE7on 10.4 \u2014 T\xE9l\xE9phone et distractions au volant",
        "ordre": 4,
        "description": "T\xE9l\xE9phone tenu en main, GPS, \xE9crans, passagers, attention d\xE9tourn\xE9e et sanctions.",
        "videoUrl": "https://www.youtube.com/watch?v=16HL4VTbHf8",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-4-1",
            "questionText": "L\u2019utilisation d\u2019un t\xE9l\xE9phone tenu en main au volant est sanctionn\xE9e par :",
            "options": [
              "35 \u20AC sans point",
              "135 \u20AC d\u2019amende et retrait de 3 points sur le permis",
              "1 point",
              "La confiscation de la voiture"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019usage du t\xE9l\xE9phone au volant retire 3 points et co\xFBte 135 \u20AC d\u2019amende forfaitaire."
          },
          {
            "_id": "q-lec-10-4-2",
            "questionText": "Le port d\u2019oreillettes, \xE9couteurs ou casques audio en conduisant (m\xEAme pour t\xE9l\xE9phoner) est-il autoris\xE9 ?",
            "options": [
              "Oui si le son est bas",
              "Non, c\u2019est strictement interdit pour tous les conducteurs (voitures, motos, v\xE9los, trottinettes)",
              "Oui pour les motards",
              "Oui sur autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout dispositif dans l\u2019oreille est interdit pour garantir l\u2019audition des bruits ext\xE9rieurs."
          },
          {
            "_id": "q-lec-10-4-3",
            "questionText": "Lire ou \xE9crire un SMS en conduisant multiplie le risque d\u2019accident par :",
            "options": [
              "2",
              "23 fois",
              "Aucune augmentation",
              "5 fois"
            ],
            "correctOptionIndex": 1,
            "explanation": "Quitter la route des yeux pendant 5 secondes \xE0 90 km/h \xE9quivaut \xE0 125 m \xE0 l\u2019aveugle."
          },
          {
            "_id": "q-lec-10-4-4",
            "questionText": "Si vous commettez une infraction avec un t\xE9l\xE9phone en main (ex: oubli de clignotant ou refus de priorit\xE9) :",
            "options": [
              "Une amende simple",
              "Le permis peut \xEAtre retenu et suspendu imm\xE9diatement sur le champ",
              "Rien",
              "Un avertissement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cumul t\xE9l\xE9phone + autre infraction entra\xEEne la r\xE9tention imm\xE9diate du permis."
          },
          {
            "_id": "q-lec-10-4-5",
            "questionText": "R\xE9gler son GPS ou changer la playlist sur son \xE9cran tactile doit se faire :",
            "options": [
              "En roulant \xE0 130 km/h",
              "\xC0 l\u2019arr\xEAt avant de d\xE9marrer ou lors d\u2019une pause s\xE9curis\xE9e",
              "En doublant",
              "Par la voix en criant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Toute manipulation d\u2019\xE9cran en mouvement d\xE9tourne l\u2019attention visuelle et cognitive."
          }
        ]
      },
      {
        "_id": "lec-10-5",
        "_type": "lecon",
        "title": "Le\xE7on 10.5 \u2014 \xC9tat physique et aptitude \xE0 la conduite",
        "ordre": 5,
        "description": "Vision, audition, aptitude m\xE9dicale, port des lunettes prescrites, effets du stress et de l\u2019\xE9tat \xE9motionnel.",
        "videoUrl": "https://www.youtube.com/watch?v=bpg9a-uvp8U",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-10-5-1",
            "questionText": "Si la mention \xAB 01 \xBB (port obligatoire de verres correcteurs) figure sur votre permis :",
            "options": [
              "Les lunettes sont facultatives de jour",
              "Le port de lunettes ou lentilles de contact est strictement obligatoire au volant",
              "Seulement pour les personnes \xE2g\xE9es",
              "Seulement la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Conduire sans ses verres correcteurs obligatoires constitue une infraction sanctionn\xE9e de 3 points."
          },
          {
            "_id": "q-lec-10-5-2",
            "questionText": "Une forte col\xE8re ou un \xE9tat d\u2019anxi\xE9t\xE9 intense :",
            "options": [
              "Am\xE9liore la vitesse",
              "Augmente l\u2019agressivit\xE9 au volant, la prise de risque et diminue la vigilance",
              "Est sans effet",
              "Permet d\u2019\xEAtre plus attentif"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019\xE9tat \xE9motionnel alt\xE8re consid\xE9rablement la lucidit\xE9 et la perception des risques."
          },
          {
            "_id": "q-lec-10-5-3",
            "questionText": "Quelle acuit\xE9 visuelle minimale globale (avec correction \xE9ventuelle) est exig\xE9e pour le permis B ?",
            "options": [
              "2/10",
              "5/10 au moins pour l\u2019ensemble des deux yeux",
              "10/10 obligatoire",
              "8/10"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil r\xE9glementaire minimal d\u2019acuit\xE9 visuelle est de 5/10."
          },
          {
            "_id": "q-lec-10-5-4",
            "questionText": "En cas de probl\xE8me de sant\xE9 grave (\xE9pilepsie, AVC, troubles visuels majeurs) :",
            "options": [
              "On continue \xE0 conduire",
              "On doit passer une visite m\xE9dicale aupr\xE8s de la commission pr\xE9fectorale pour valider l\u2019aptitude",
              "On n\u2019en parle \xE0 personne",
              "On conduit uniquement le jour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Certaines affections imposent un contr\xF4le m\xE9dical officiel d\u2019aptitude \xE0 la conduite."
          },
          {
            "_id": "q-lec-10-5-5",
            "questionText": "Avoir une paire de lunettes de secours dans la bo\xEEte \xE0 gants est :",
            "options": [
              "Interdit",
              "Fortement recommand\xE9, notamment pour les porteurs de lentilles de contact",
              "Inutile",
              "Payant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une paire de lunettes de secours \xE9vite d\u2019\xEAtre bloqu\xE9 en cas de perte de lentille."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-11",
    "_type": "moduleFormation",
    "code": "MOD-011",
    "title": "Module 11 \u2014 Usagers vuln\xE9rables",
    "summary": "Protection et cohabitation avec pi\xE9tons, cyclistes (sas v\xE9lo, angles morts), motocyclistes, enfants et personnes \xE0 mobilit\xE9 r\xE9duite.",
    "learningObjectives": [
      "Conna\xEEtre les droits et la priorit\xE9 absolue accord\xE9e aux pi\xE9tons",
      "Appliquer les r\xE8gles de s\xE9curit\xE9 avec les cyclistes (sas v\xE9lo, distances de d\xE9passement)",
      "Identifier les risques sp\xE9cifiques li\xE9s aux deux-roues motoris\xE9s",
      "Adopter un comportement ultra-prudent envers enfants, seniors et personnes \xE0 mobilit\xE9 r\xE9duite"
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
        "title": "Le\xE7on 11.1 \u2014 Les pi\xE9tons : droits et comportements \xE0 adopter",
        "ordre": 1,
        "description": "Priorit\xE9 aux passages pi\xE9tons, zones de rencontre, vigilance pr\xE8s des \xE9coles et comportement en zones r\xE9sidentielles.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-1-1",
            "questionText": "Quelle est la priorit\xE9 d\u2019un pi\xE9ton engag\xE9 ou manifestant l\u2019intention de traverser ?",
            "options": [
              "Priorit\xE9 secondaire",
              "Priorit\xE9 absolue : tout v\xE9hicule doit obligatoirement s\u2019arr\xEAter pour le laisser passer",
              "Uniquement s\u2019il court",
              "Uniquement le jour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorit\xE9 \xE0 un pi\xE9ton est sanctionn\xE9 d\u2019un retrait de 6 points."
          },
          {
            "_id": "q-lec-11-1-2",
            "questionText": "Dans une \xAB Zone de rencontre \xBB, quelle est la vitesse maximale et qui a la priorit\xE9 ?",
            "options": [
              "30 km/h, priorit\xE9 aux voitures",
              "20 km/h, priorit\xE9 absolue aux pi\xE9tons sur toute la chauss\xE9e",
              "50 km/h",
              "10 km/h r\xE9serv\xE9 aux v\xE9los"
            ],
            "correctOptionIndex": 1,
            "explanation": "En zone de rencontre, la vitesse est limit\xE9e \xE0 20 km/h et les pi\xE9tons sont prioritaires partout."
          },
          {
            "_id": "q-lec-11-1-3",
            "questionText": "\xC0 proximit\xE9 d\u2019un arr\xEAt de bus ou tramway avec des voyageurs qui descendent :",
            "options": [
              "On acc\xE9l\xE8re pour d\xE9passer",
              "On ralentit fortement car des pi\xE9tons peuvent surgir devant ou derri\xE8re le bus",
              "On klaxonne",
              "On ne fait rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les passagers descendant d\u2019un transport collectif traversent souvent sans regarder."
          },
          {
            "_id": "q-lec-11-1-4",
            "questionText": "Dans une \xAB Aire pi\xE9tonne \xBB :",
            "options": [
              "Les voitures peuvent rouler \xE0 50 km/h",
              "Seuls les v\xE9hicules autoris\xE9s (livraisons, secours) peuvent rouler au pas (max 20 km/h)",
              "Le stationnement est libre",
              "Les v\xE9los sont interdits"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019aire pi\xE9tonne est r\xE9serv\xE9e aux pi\xE9tons, les v\xE9hicules autoris\xE9s y roulent \xE0 l\u2019allure du pas."
          },
          {
            "_id": "q-lec-11-1-5",
            "questionText": "Quelle sanction risque un conducteur refusant la priorit\xE9 \xE0 un pi\xE9ton r\xE9guli\xE8rement engag\xE9 ?",
            "options": [
              "1 point",
              "135 \u20AC d\u2019amende et retrait de 6 points avec suspension de permis possible",
              "Aucune sanction",
              "35 \u20AC"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le refus de priorit\xE9 pi\xE9ton est l\u2019une des infractions les plus s\xE9v\xE8rement punies (6 points)."
          }
        ]
      },
      {
        "_id": "lec-11-2",
        "_type": "lecon",
        "title": "Le\xE7on 11.2 \u2014 Cyclistes : cohabitation et zones r\xE9serv\xE9es",
        "ordre": 2,
        "description": "Pistes cyclables, sas v\xE9lo, zones 30, angle mort, d\xE9passement et ouverture s\xE9curis\xE9e de porti\xE8re.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-2-1",
            "questionText": "Quelle technique d\u2019ouverture de porti\xE8re \xE9vite de percuter un cycliste arrivant par l\u2019arri\xE8re ?",
            "options": [
              "Ouvrir d\u2019un coup sec",
              "L\u2019ouverture \xAB \xE0 la hollandaise \xBB avec la main oppos\xE9e pour forcer le buste \xE0 pivoter et v\xE9rifier l\u2019angle mort",
              "Fermer les yeux",
              "Klaxonner avant"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ouvrir avec la main droite (c\xF4t\xE9 conducteur) oriente naturellement le regard vers l\u2019arri\xE8re."
          },
          {
            "_id": "q-lec-11-2-2",
            "questionText": "Quelle distance lat\xE9rale minimale devez-vous respecter pour doubler un cycliste ?",
            "options": [
              "0,5 m partout",
              "1 m\xE8tre en agglom\xE9ration et 1,50 m\xE8tre hors agglom\xE9ration",
              "2 m\xE8tres en ville",
              "0,2 m"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ces distances prot\xE8gent le cycliste des rafales et des d\xE9s\xE9quilibres."
          },
          {
            "_id": "q-lec-11-2-3",
            "questionText": "Dans une rue en \xAB double sens cyclable \xBB (zone 30 ou zone de rencontre) :",
            "options": [
              "Les v\xE9los roulent \xE0 contresens de mani\xE8re ill\xE9gale",
              "Les cyclistes sont l\xE9galement autoris\xE9s \xE0 circuler dans les deux sens",
              "Les voitures sont prioritaires",
              "Les v\xE9los doivent rouler sur le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "En zone 30, les rues \xE0 sens unique pour les voitures sont \xE0 double sens pour les cyclistes."
          },
          {
            "_id": "q-lec-11-2-4",
            "questionText": "Sur un sas v\xE9lo devant un feu rouge, les voitures doivent :",
            "options": [
              "S\u2019arr\xEAter au milieu du sas",
              "S\u2019arr\xEAter imp\xE9rativement avant la premi\xE8re ligne pour laisser le sas libre aux v\xE9los",
              "Stationner",
              "Acc\xE9l\xE9rer"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sas v\xE9lo positionne les cyclistes en t\xEAte pour \xEAtre vus et d\xE9marrer en s\xE9curit\xE9."
          },
          {
            "_id": "q-lec-11-2-5",
            "questionText": "Avant de tourner \xE0 droite \xE0 une intersection, vous devez :",
            "options": [
              "Couper la route",
              "Contr\xF4ler votre r\xE9troviseur droit et l\u2019angle mort pour c\xE9der le passage \xE0 un cycliste longeant votre droite",
              "Acc\xE9l\xE9rer",
              "Freiner sans regarder"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cycliste circulant tout droit sur la piste a la priorit\xE9 sur le v\xE9hicule qui tourne."
          }
        ]
      },
      {
        "_id": "lec-11-3",
        "_type": "lecon",
        "title": "Le\xE7on 11.3 \u2014 Motocyclistes et deux-roues motoris\xE9s",
        "ordre": 3,
        "description": "Visibilit\xE9 r\xE9duite des deux-roues, v\xE9rification avant de tourner, distances de s\xE9curit\xE9 et risques aux intersections.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-3-1",
            "questionText": "Pourquoi les deux-roues motoris\xE9s sont-ils particuli\xE8rement difficiles \xE0 d\xE9tecter ?",
            "options": [
              "Ils sont silencieux",
              "Leur silhouette \xE9troite se dissimule facilement dans les angles morts et leur acc\xE9l\xE9ration est vive",
              "Ils ont des phares \xE9teints",
              "Ils roulent sur les trottoirs"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur profil \xE9troit masque leur pr\xE9sence dans les r\xE9troviseurs et derri\xE8re les montants de vitre."
          },
          {
            "_id": "q-lec-11-3-2",
            "questionText": "En cas de chute d\u2019un motard sur la chauss\xE9e, que ne devez-vous JAMAIS faire sauf urgence vitale ?",
            "options": [
              "Baliser la zone",
              "Lui retirer son casque",
              "Appeler le 15 ou 112",
              "Couper le contact de sa moto"
            ],
            "correctOptionIndex": 1,
            "explanation": "Retirer le casque risque de provoquer une paralysie ou l\xE9sion irr\xE9versible de la moelle \xE9pini\xE8re."
          },
          {
            "_id": "q-lec-11-3-3",
            "questionText": "Quelle est la principale cause d\u2019accident mortel impliquant une voiture et une moto \xE0 une intersection ?",
            "options": [
              "Une panne de phare",
              "Le refus de priorit\xE9 de la voiture qui n\u2019a pas vu ou a mal estim\xE9 la vitesse de la moto qui arrivait",
              "Une chauss\xE9e s\xE8che",
              "L\u2019absence de casque"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019automobiliste estime mal la vitesse d\u2019approche d\u2019un deux-roues lors d\u2019un tourne-\xE0-gauche."
          },
          {
            "_id": "q-lec-11-3-4",
            "questionText": "Lorsque des motards circulent en inter-files sur voie rapide congestionn\xE9e, vous devez :",
            "options": [
              "Leur barrer la route",
              "\xC9largir l\u2019espace en serrant sur le c\xF4t\xE9 de votre voie pour leur faciliter le passage",
              "Klaxonner",
              "Ouvrir votre porti\xE8re"
            ],
            "correctOptionIndex": 1,
            "explanation": "Faciliter le passage des deux-roues en inter-files est un geste de s\xE9curit\xE9 partag\xE9e."
          },
          {
            "_id": "q-lec-11-3-5",
            "questionText": "\xC0 quel \xE9quipement obligatoire doit \xEAtre attentif un motocycliste ?",
            "options": [
              "Casque homologu\xE9 attach\xE9 et gants certifi\xE9s",
              "Des lunettes de soleil seules",
              "Un short",
              "Une \xE9charpe"
            ],
            "correctOptionIndex": 0,
            "explanation": "Casque et gants homologu\xE9s sont les \xE9quipements minimaux strictement obligatoires par la loi."
          }
        ]
      },
      {
        "_id": "lec-11-4",
        "_type": "lecon",
        "title": "Le\xE7on 11.4 \u2014 Enfants et personnes \xE0 mobilit\xE9 r\xE9duite",
        "ordre": 4,
        "description": "Risques li\xE9s \xE0 l\u2019impr\xE9visibilit\xE9 des enfants, zones scolaires, aires de jeux et vigilance envers les personnes \xE0 mobilit\xE9 r\xE9duite.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-4-1",
            "questionText": "Pourquoi les jeunes enfants ont-ils un comportement \xE0 tr\xE8s haut risque pr\xE8s de la chauss\xE9e ?",
            "options": [
              "Ils connaissent le code",
              "Leur champ visuel est restreint, ils n\u2019\xE9valuent pas les distances et peuvent surgir brutalement apr\xE8s un ballon",
              "Ils courent vite",
              "Ils sont prudents"
            ],
            "correctOptionIndex": 1,
            "explanation": "Leur perception du danger est immature et leur comportement totalement impr\xE9visible."
          },
          {
            "_id": "q-lec-11-4-2",
            "questionText": "Un pi\xE9ton portant une canne blanche ou accompagn\xE9 d\u2019un chien-guide :",
            "options": [
              "Est une personne malvoyante ou non-voyante qui a la priorit\xE9 absolue en toutes circonstances",
              "Doit c\xE9der le passage",
              "Doit courir",
              "Est interdit de traverser"
            ],
            "correctOptionIndex": 0,
            "explanation": "La canne blanche conf\xE8re la priorit\xE9 absolue au pi\xE9ton malvoyant sur tout son parcours."
          },
          {
            "_id": "q-lec-11-4-3",
            "questionText": "\xC0 la vue d\u2019un ballon qui roule sur la chauss\xE9e, quelle doit \xEAtre votre r\xE9action imm\xE9diate ?",
            "options": [
              "Acc\xE9l\xE9rer pour passer dessus",
              "Freiner imm\xE9diatement et vous attendre \xE0 voir surgir un enfant derri\xE8re le ballon",
              "Klaxonner en gardant la m\xEAme vitesse",
              "Ignorer le ballon"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un ballon roulant est le signe pr\xE9curseur quasi certain de l\u2019irruption d\u2019un enfant."
          },
          {
            "_id": "q-lec-11-4-4",
            "questionText": "En pr\xE9sence d\u2019une personne \xE2g\xE9e ou \xE0 mobilit\xE9 r\xE9duite traversant lentement sur un passage pi\xE9ton :",
            "options": [
              "On klaxonne pour qu\u2019elle se d\xE9p\xEAche",
              "On patiente calmement sans mettre la pression ni donner de coups d\u2019acc\xE9l\xE9rateur",
              "On passe en la fr\xF4lant",
              "On la contourne par le trottoir"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le respect du rythme des personnes vuln\xE9rables est une r\xE8gle \xE9l\xE9mentaire de civisme et de loi."
          },
          {
            "_id": "q-lec-11-4-5",
            "questionText": "\xC0 l\u2019approche d\u2019un car scolaire \xE0 l\u2019arr\xEAt feux clignotants allum\xE9s :",
            "options": [
              "On double \xE0 80 km/h",
              "On ralentit au pas en surveillant l\u2019apparition d\u2019enfants cach\xE9s par le bus",
              "On klaxonne",
              "On s\u2019arr\xEAte 1 heure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les enfants peuvent traverser masqu\xE9s par l\u2019avant ou l\u2019arri\xE8re du car scolaire."
          }
        ]
      },
      {
        "_id": "lec-11-5",
        "_type": "lecon",
        "title": "Le\xE7on 11.5 \u2014 Bonnes pratiques g\xE9n\xE9rales envers les usagers vuln\xE9rables",
        "ordre": 5,
        "description": "Anticipation, courtoisie, r\xE9duction de vitesse, distances de s\xE9curit\xE9 et partage apais\xE9 de la route.",
        "videoUrl": "https://www.youtube.com/watch?v=EPL8PQweWlc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-11-5-1",
            "questionText": "Dans la hi\xE9rarchie de la vuln\xE9rabilit\xE9 routi\xE8re, quel usager est le plus fragile et sans protection m\xE9canique ?",
            "options": [
              "Le conducteur de SUV",
              "Le pi\xE9ton",
              "Le camionneur",
              "Le motard avec gilet airbag"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le pi\xE9ton absorbe directement 100% de l\u2019\xE9nergie de l\u2019impact lors d\u2019un choc."
          },
          {
            "_id": "q-lec-11-5-2",
            "questionText": "Quelle est la chance de survie d\u2019un pi\xE9ton heurt\xE9 par une voiture \xE0 30 km/h par rapport \xE0 50 km/h ?",
            "options": [
              "Identique",
              "Environ 90% de survie \xE0 30 km/h contre seulement 20% \xE0 50 km/h",
              "100% de mortalit\xE9 \xE0 30 km/h",
              "Aucune chance"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vitesse de 30 km/h r\xE9duit drastiquement les risques de blessures mortelles."
          },
          {
            "_id": "q-lec-11-5-3",
            "questionText": "Le concept de \xAB conducteur citoyen \xBB et bienveillant repose sur :",
            "options": [
              "Faire valoir sa priorit\xE9 quoi qu\u2019il en co\xFBte",
              "L\u2019anticipation, la protection des plus faibles et le partage courtois de l\u2019espace public",
              "Rouler le plus vite possible",
              "Ne jamais utiliser ses clignotants"
            ],
            "correctOptionIndex": 1,
            "explanation": "La s\xE9curit\xE9 routi\xE8re collective d\xE9pend du comportement protecteur des conducteurs."
          },
          {
            "_id": "q-lec-11-5-4",
            "questionText": "En pr\xE9sence d\u2019une flaque d\u2019eau importante le long d\u2019un trottoir o\xF9 marchent des pi\xE9tons :",
            "options": [
              "On acc\xE9l\xE8re pour les \xE9clabousser",
              "On ralentit pour ne pas projeter d\u2019eau et ne pas risquer l\u2019aquaplaning",
              "On klaxonne",
              "On ferme les vitres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le respect des pi\xE9tons et la ma\xEEtrise du v\xE9hicule imposent une vitesse tr\xE8s r\xE9duite."
          },
          {
            "_id": "q-lec-11-5-5",
            "questionText": "Face \xE0 un utilisateur d\u2019engin de d\xE9placement personnel motoris\xE9 (trottinette \xE9lectrique) :",
            "options": [
              "On le serre",
              "On applique les m\xEAmes r\xE8gles d\u2019\xE9cart et de prudence qu\u2019envers les cyclistes (1 m en ville, 1,5 m hors agglo)",
              "On le double sans regarder",
              "On le bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les trottinettes sont des usagers vuln\xE9rables n\xE9cessitant les m\xEAmes distances de s\xE9curit\xE9."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-12",
    "_type": "moduleFormation",
    "code": "MOD-012",
    "title": "Module 12 \u2014 Premiers secours et accident",
    "summary": "Proc\xE9dure PAS (Prot\xE9ger, Alerter, Secourir), num\xE9ros d'urgence (15, 17, 18, 112), gestes de premiers secours, constat amiable et sur-accidents.",
    "learningObjectives": [
      "Appliquer dans l'ordre strict la proc\xE9dure vitale PAS (Prot\xE9ger, Alerter, Secourir)",
      "Conna\xEEtre par c\u0153ur les num\xE9ros d'urgence (15 SAMU, 17 Police, 18 Pompiers, 112 Europe, 114 Sourds)",
      "Ma\xEEtriser les gestes de premiers secours (PLS, massage cardiaque, utilisation du DAE)",
      "R\xE9diger correctement un constat amiable d'accident sans d\xE9lit de fuite"
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
        "title": "Le\xE7on 12.1 \u2014 La proc\xE9dure PAS : Prot\xE9ger, Alerter, Secourir",
        "ordre": 1,
        "description": "S\xE9curisation d\u2019une zone d\u2019accident, pr\xE9vention du sur-accident et ordre des actions \xE0 effectuer.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-1-1",
            "questionText": "Quel est l\u2019ordre chronologique STRICT des actions \xE0 mener en arrivant le premier sur un accident ?",
            "options": [
              "Secourir, Alerter, Prot\xE9ger",
              "Prot\xE9ger la zone (P), Alerter les secours (A), Secourir les victimes (S)",
              "Alerter, Secourir, Prot\xE9ger",
              "Prendre des photos"
            ],
            "correctOptionIndex": 1,
            "explanation": "La r\xE8gle universelle est PAS : Prot\xE9ger d\u2019abord pour \xE9viter le sur-accident, Alerter, puis Secourir."
          },
          {
            "_id": "q-lec-12-1-2",
            "questionText": "Comment PROT\xC9GER efficacement les lieux d\u2019un accident sur route de campagne ?",
            "options": [
              "Courir sur la route",
              "Allumer feux de d\xE9tresse, enfiler son gilet jaune, poser le triangle \xE0 au moins 30 m avant le virage/accident et faire baliser",
              "Allumer une cigarette",
              "Klaxonner"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le balisage visible pr\xE9vient les autres usagers et \xE9vite une collision en cha\xEEne."
          },
          {
            "_id": "q-lec-12-1-3",
            "questionText": "Pourquoi ne doit-on JAMAIS fumer ni approcher avec une flamme pr\xE8s d\u2019un accident de la route ?",
            "options": [
              "C\u2019est impoli",
              "Risque majeur d\u2019incendie ou d\u2019explosion d\xFB aux vapeurs d\u2019essence ou de carburant r\xE9pandu",
              "Pour garder le calme",
              "C\u2019est interdit la nuit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les fuites de carburant ou de batterie peuvent s\u2019enflammer instantan\xE9ment."
          },
          {
            "_id": "q-lec-12-1-4",
            "questionText": "Doit-on couper le contact des v\xE9hicules accident\xE9s si cela est accessible en s\xE9curit\xE9 ?",
            "options": [
              "Non, laisser tourner le moteur",
              "Oui, couper le contact et serrer le frein \xE0 main pour \xE9liminer le risque d\u2019\xE9tincelle et d\u2019incendie",
              "Couper les c\xE2bles avec des ciseaux",
              "Enlever les pneus"
            ],
            "correctOptionIndex": 1,
            "explanation": "Couper le contact neutralise les circuits \xE9lectriques et coupe l\u2019alimentation d\u2019essence."
          },
          {
            "_id": "q-lec-12-1-5",
            "questionText": "O\xF9 placer les t\xE9moins non bless\xE9s et passagers valides ?",
            "options": [
              "Au milieu de la chauss\xE9e",
              "En lieu s\xFBr, derri\xE8re les glissi\xE8res de s\xE9curit\xE9 ou sur le bas-c\xF4t\xE9 d\xE9gag\xE9",
              "Dans les v\xE9hicules accident\xE9s",
              "Sur le capot"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mise \xE0 l\u2019abri des personnes valides \xE9vite qu\u2019elles ne soient fauch\xE9es."
          }
        ]
      },
      {
        "_id": "lec-12-2",
        "_type": "lecon",
        "title": "Le\xE7on 12.2 \u2014 Alerter les secours efficacement",
        "ordre": 2,
        "description": "Num\xE9ros 15, 17, 18 et 112 ; informations essentielles \xE0 transmettre et comportement pendant l\u2019appel.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-2-1",
            "questionText": "Quel est le num\xE9ro d\u2019urgence europ\xE9en gratuit et accessible partout depuis un mobile ?",
            "options": [
              "15",
              "18",
              "112",
              "911"
            ],
            "correctOptionIndex": 2,
            "explanation": "Le 112 est le num\xE9ro d\u2019appel d\u2019urgence universel dans toute l\u2019Union europ\xE9enne."
          },
          {
            "_id": "q-lec-12-2-2",
            "questionText": "Quel num\xE9ro direct compose-t-on pour joindre le SAMU (urgences m\xE9dicales) en France ?",
            "options": [
              "15",
              "17",
              "18",
              "114"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le 15 relie directement au m\xE9decin r\xE9gulateur du SAMU."
          },
          {
            "_id": "q-lec-12-2-3",
            "questionText": "Quel num\xE9ro d\u2019urgence par SMS/\xE9crit est r\xE9serv\xE9 aux personnes sourdes ou malentendantes ?",
            "options": [
              "112",
              "114",
              "118",
              "15"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le 114 permet d\u2019envoyer une alerte par SMS avec g\xE9olocalisation."
          },
          {
            "_id": "q-lec-12-2-4",
            "questionText": "Quelles informations indispensables devez-vous fournir aux secours lors de l\u2019appel ?",
            "options": [
              "Votre avis politique",
              "Lieu pr\xE9cis de l\u2019accident, nombre et \xE9tat apparent des victimes, types de v\xE9hicules impliqu\xE9s, risques particuliers (incendie, mati\xE8res dangereuses)",
              "Le prix de la voiture",
              "Votre profession"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un message d\u2019alerte clair et pr\xE9cis conditionne l\u2019envoi des moyens de secours adapt\xE9s."
          },
          {
            "_id": "q-lec-12-2-5",
            "questionText": "Quand devez-vous raccrocher lors d\u2019un appel d\u2019urgence ?",
            "options": [
              "D\xE8s que vous avez fini de parler",
              "Uniquement quand l\u2019op\xE9rateur des secours vous dit express\xE9ment de raccrocher",
              "Au bout de 30 secondes",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019op\xE9rateur doit valider que toutes les informations n\xE9cessaires ont \xE9t\xE9 transmises."
          }
        ]
      },
      {
        "_id": "lec-12-3",
        "_type": "lecon",
        "title": "Le\xE7on 12.3 \u2014 Gestes de premiers secours de base",
        "ordre": 3,
        "description": "V\xE9rification de la conscience et de la respiration, PLS, massage cardiaque, d\xE9fibrillateur et non-d\xE9placement d\u2019un bless\xE9 sauf danger imm\xE9diat.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-3-1",
            "questionText": "Doit-on d\xE9placer ou extraire une victime bless\xE9e de son v\xE9hicule ?",
            "options": [
              "Oui pour aller plus vite",
              "Non, JAMAIS, sauf en cas de DANGER IMM\xC9DIAT ET NON CONTR\xD4LABLE (v\xE9hicule en feu, noyade)",
              "Oui pour la poser sur le trottoir",
              "Toujours imm\xE9diatement"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout d\xE9placement risque d\u2019aggraver des l\xE9sions de la colonne vert\xE9brale."
          },
          {
            "_id": "q-lec-12-3-2",
            "questionText": "Si une victime est INCONSCIENTE mais RESPIRE normalement, quelle position adopter ?",
            "options": [
              "La mettre assise",
              "La placer en Position Lat\xE9rale de S\xE9curit\xE9 (PLS) pour lib\xE9rer les voies a\xE9riennes et \xE9viter l\u2019\xE9touffement",
              "La laisser sur le dos",
              "La mettre sur le ventre"
            ],
            "correctOptionIndex": 1,
            "explanation": "La PLS emp\xEAche l\u2019\xE9touffement par la langue ou des vomissements."
          },
          {
            "_id": "q-lec-12-3-3",
            "questionText": "Si la victime est inconsciente et NE RESPIRE PLUS, que faire imm\xE9diatement ?",
            "options": [
              "Attendre les secours sans rien faire",
              "Alerter le 15/112 et d\xE9buter imm\xE9diatement un massage cardiaque (30 compressions / 2 insufflations) avec DAE",
              "Lui donner \xE0 boire de l\u2019eau",
              "Lui donner des gifles"
            ],
            "correctOptionIndex": 1,
            "explanation": "La r\xE9animation cardio-pulmonaire imm\xE9diate maintient l\u2019oxyg\xE9nation du cerveau."
          },
          {
            "_id": "q-lec-12-3-4",
            "questionText": "Un D\xE9fibrillateur Automatis\xE9 Externe (DAE) peut-il \xEAtre utilis\xE9 par une personne non m\xE9decin ?",
            "options": [
              "Non, r\xE9serv\xE9 aux chirurgiens",
              "Oui, par TOUTE personne : l\u2019appareil guide vocalement chaque \xE9tape et d\xE9livre le choc en autonomie si n\xE9cessaire",
              "Uniquement avec un dipl\xF4me d\u2019\xC9tat",
              "Interdit en public"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le DAE est con\xE7u pour \xEAtre utilis\xE9 par n\u2019importe quel t\xE9moin en toute s\xE9curit\xE9."
          },
          {
            "_id": "q-lec-12-3-5",
            "questionText": "Doit-on donner \xE0 boire ou \xE0 manger \xE0 une victime bless\xE9e d\u2019accident de la route ?",
            "options": [
              "Oui, du soda",
              "Non, JAMAIS (risque d\u2019\xE9touffement et complication lors d\u2019une anesth\xE9sie d\u2019urgence)",
              "Oui, du caf\xE9 chaud",
              "Un verre d\u2019eau sucr\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "Ne jamais rien administrer par voie orale \xE0 un bless\xE9."
          }
        ]
      },
      {
        "_id": "lec-12-4",
        "_type": "lecon",
        "title": "Le\xE7on 12.4 \u2014 Que faire en cas d\u2019accident mat\xE9riel ou corporel",
        "ordre": 4,
        "description": "Constat amiable, \xE9change d\u2019informations, absence de d\xE9lit de fuite et priorit\xE9 au triptyque prot\xE9ger-alerter-secourir s\u2019il y a des victimes.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-4-1",
            "questionText": "Quitter les lieux d\u2019un accident sans s\u2019arr\xEAter ni communiquer son identit\xE9 constitue :",
            "options": [
              "Une simple incivilit\xE9",
              "Le D\xC9LIT DE FUITE, puni de 3 ans de prison, 75 000 \u20AC d\u2019amende et retrait de 6 points",
              "Une contravention \xE0 35 \u20AC",
              "Aucune faute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le d\xE9lit de fuite est un crime lourdement r\xE9prim\xE9 par le code p\xE9nal."
          },
          {
            "_id": "q-lec-12-4-2",
            "questionText": "Le constat amiable automobile europ\xE9en est :",
            "options": [
              "Un document de culpabilit\xE9 p\xE9nale",
              "Un document amiable descriptif et contradictoire des faits servant aux assurances",
              "Un document facultatif sans valeur",
              "Un jugement de tribunal"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le constat retrace les circonstances mat\xE9rielles pour la prise en charge assurantielle."
          },
          {
            "_id": "q-lec-12-4-3",
            "questionText": "Une fois le constat amiable sign\xE9 par les deux conducteurs, peut-on modifier le recto ?",
            "options": [
              "Oui chez soi au stylo",
              "Non, aucune modification unilat\xE9rale n\u2019est admise apr\xE8s signature",
              "Oui le lendemain",
              "Oui si on n\u2019est plus d\u2019accord"
            ],
            "correctOptionIndex": 1,
            "explanation": "La signature fige les d\xE9clarations communes de la face avant."
          },
          {
            "_id": "q-lec-12-4-4",
            "questionText": "En cas de d\xE9saccord avec l\u2019autre conducteur sur les cases coch\xE9es du constat :",
            "options": [
              "On se bat",
              "On ne signe pas le constat ou on consigne express\xE9ment ses r\xE9serves dans la case \xAB Mes observations \xBB",
              "On d\xE9chire tout",
              "On accepte sans rien dire"
            ],
            "correctOptionIndex": 1,
            "explanation": "La case observations permet d\u2019exprimer clairement son d\xE9saccord avant envoi."
          },
          {
            "_id": "q-lec-12-4-5",
            "questionText": "Dans quel d\xE9lai l\xE9gal doit-on envoyer le constat amiable \xE0 son assureur ?",
            "options": [
              "Dans les 24 heures",
              "Dans les 5 jours ouvr\xE9s suivant l\u2019accident",
              "Dans le mois",
              "Aucun d\xE9lai"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le d\xE9lai r\xE9glementaire de d\xE9claration de sinistre est de 5 jours ouvr\xE9s."
          }
        ]
      },
      {
        "_id": "lec-12-5",
        "_type": "lecon",
        "title": "Le\xE7on 12.5 \u2014 Pr\xE9venir les sur-accidents",
        "ordre": 5,
        "description": "Feux de d\xE9tresse, gilet, triangle lorsque cela est sans danger, protection des occupants et mise \xE0 l\u2019abri.",
        "videoUrl": "https://www.youtube.com/watch?v=VcOPgmOW3Zc",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-12-5-1",
            "questionText": "Qu\u2019est-ce qu\u2019un \xAB sur-accident \xBB ?",
            "options": [
              "Un accident avec deux v\xE9los",
              "Un second accident provoqu\xE9 par la collision de nouveaux v\xE9hicules avec les v\xE9hicules d\xE9j\xE0 accident\xE9s ou les secours",
              "Un accident sans gravit\xE9",
              "Un accrochage de parking"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sur-accident est souvent bien plus meurtrier que l\u2019accident initial."
          },
          {
            "_id": "q-lec-12-5-2",
            "questionText": "\xC0 quelle distance minimale doit-on placer le triangle de pr\xE9signalisation sur route hors autoroute ?",
            "options": [
              "\xC0 5 m\xE8tres",
              "\xC0 au moins 30 m\xE8tres en amont de l\u2019accident (ou avant le virage/sommet de c\xF4te)",
              "\xC0 1 kilom\xE8tre",
              "Sur le pare-brise"
            ],
            "correctOptionIndex": 1,
            "explanation": "30 m\xE8tres permet aux usagers qui arrivent d\u2019avoir le temps de ralentir."
          },
          {
            "_id": "q-lec-12-5-3",
            "questionText": "La nuit sur route non \xE9clair\xE9e, comment rendre le lieu d\u2019accident visible ?",
            "options": [
              "Allumer les feux des v\xE9hicules en s\xE9curit\xE9, utiliser des lampes torches et porter des gilets fluo",
              "\xC9teindre toutes les lumi\xE8res",
              "Faire un feu de camp",
              "Klaxonner en continu"
            ],
            "correctOptionIndex": 0,
            "explanation": "La visibilit\xE9 lumineuse est le premier rempart contre le sur-accident nocturne."
          },
          {
            "_id": "q-lec-12-5-4",
            "questionText": "Les passagers d\u2019un v\xE9hicule immobilis\xE9 sur une route dangereuse doivent :",
            "options": [
              "Rester assis au chaud",
              "Sortir du c\xF4t\xE9 oppos\xE9 \xE0 la circulation et se mettre en s\xE9curit\xE9 sur le bas-c\xF4t\xE9 d\xE9gag\xE9",
              "Marcher sur la route",
              "Pousser la voiture imm\xE9diatement"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019\xE9vacuation c\xF4t\xE9 droit prot\xE8ge les personnes des v\xE9hicules en approche."
          },
          {
            "_id": "q-lec-12-5-5",
            "questionText": "En pr\xE9sence de c\xE2bles \xE9lectriques tomb\xE9s sur la voiture accident\xE9e :",
            "options": [
              "Faire sortir tout le monde en marchant",
              "Interdire \xE0 quiconque de toucher la carrosserie ou de sortir en attendant les secours qualifi\xE9s (risque d\u2019\xE9lectrocution)",
              "Couper les c\xE2bles \xE0 la main",
              "Verser de l\u2019eau"
            ],
            "correctOptionIndex": 1,
            "explanation": "La carrosserie peut \xEAtre sous tension \xE9lectrique mortelle : il ne faut pas poser le pied \xE0 terre."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-13",
    "_type": "moduleFormation",
    "code": "MOD-013",
    "title": "Module 13 \u2014 Documents, assurance et responsabilit\xE9",
    "summary": "Documents de bord obligatoires, permis \xE0 points et p\xE9riode probatoire, infractions, d\xE9lits, assurances et responsabilit\xE9s civile/p\xE9nale.",
    "learningObjectives": [
      "Conna\xEEtre tous les documents obligatoires \xE0 pr\xE9senter lors d'un contr\xF4le routier",
      "Comprendre le fonctionnement du capital de points et de la p\xE9riode probatoire",
      "Distinguer contraventions et d\xE9lits routiers ainsi que leurs sanctions",
      "Ma\xEEtriser les garanties d'assurance automobile (Tiers, Tous risques) et les responsabilit\xE9s"
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
        "title": "Le\xE7on 13.1 \u2014 Documents obligatoires \xE0 bord",
        "ordre": 1,
        "description": "Permis, certificat d\u2019immatriculation, assurance et contr\xF4le technique pour les v\xE9hicules concern\xE9s.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-1-1",
            "questionText": "Quels documents originaux et valides devez-vous \xEAtre en mesure de pr\xE9senter lors d\u2019un contr\xF4le routier ?",
            "options": [
              "Permis de conduire, certificat d\u2019immatriculation (carte grise) et attestation d\u2019assurance valide",
              "Le livret de famille",
              "Le contrat de travail",
              "La facture d\u2019achat du v\xE9hicule"
            ],
            "correctOptionIndex": 0,
            "explanation": "Ces 3 pi\xE8ces justificatives sont strictement obligatoires pour circuler."
          },
          {
            "_id": "q-lec-13-1-2",
            "questionText": "La vignette de contr\xF4le technique sur le pare-brise prouve-t-elle \xE0 elle seule la validit\xE9 du contr\xF4le ?",
            "options": [
              "Oui",
              "Non, c\u2019est le timbre coll\xE9 sur le certificat d\u2019immatriculation et le proc\xE8s-verbal qui font foi juridiquement",
              "Oui pour les policiers",
              "Ce n\u2019est pas obligatoire"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le timbre sur la carte grise et le PV constituent la preuve l\xE9gale officielle."
          },
          {
            "_id": "q-lec-13-1-3",
            "questionText": "En cas de non-pr\xE9sentation imm\xE9diate des papiers lors d\u2019un contr\xF4le, dans quel d\xE9lai devez-vous les pr\xE9senter au commissariat ?",
            "options": [
              "Dans les 24 heures",
              "Dans les 5 jours",
              "Dans le mois",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "Vous disposez d\u2019un d\xE9lai de 5 jours sous peine d\u2019amende forfaitaire aggrav\xE9e."
          },
          {
            "_id": "q-lec-13-1-4",
            "questionText": "Le certificat d\u2019immatriculation (carte grise) doit \xEAtre mis \xE0 jour \xE0 votre nouvelle adresse dans un d\xE9lai de :",
            "options": [
              "1 semaine",
              "1 mois",
              "6 mois",
              "1 an"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tout changement de domicile doit \xEAtre d\xE9clar\xE9 sous 30 jours sur le site officiel."
          },
          {
            "_id": "q-lec-13-1-5",
            "questionText": "Circuler \xE0 bord d\u2019un v\xE9hicule sans contr\xF4le technique valide est passible de :",
            "options": [
              "Une amende de 135 \u20AC et immobilisation du v\xE9hicule",
              "Une simple lettre",
              "Prison ferme",
              "Rien"
            ],
            "correctOptionIndex": 0,
            "explanation": "Le d\xE9faut de contr\xF4le technique entra\xEEne 135 \u20AC d\u2019amende et la saisie de la carte grise."
          }
        ]
      },
      {
        "_id": "lec-13-2",
        "_type": "lecon",
        "title": "Le\xE7on 13.2 \u2014 Le permis \xE0 points",
        "ordre": 2,
        "description": "Capital initial en p\xE9riode probatoire, retraits, r\xE9cup\xE9ration de points, invalidation \xE0 z\xE9ro point et stages de sensibilisation.",
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
            "explanation": "Le permis d\xE9bute \xE0 6 points et atteint 12 points au bout de 3 ans sans infraction (2 ans en conduite accompagn\xE9e)."
          },
          {
            "_id": "q-lec-13-2-2",
            "questionText": "En conduite accompagn\xE9e (AAC), en combien d\u2019ann\xE9es sans infraction atteint-on les 12 points ?",
            "options": [
              "1 an",
              "2 ans (gain de 3 points par an)",
              "3 ans",
              "4 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019AAC permet de capitaliser 3 points par an et d\u2019obtenir 12 points en 2 ans."
          },
          {
            "_id": "q-lec-13-2-3",
            "questionText": "Combien de points maximum peut-on perdre lors d\u2019une seule infraction ?",
            "options": [
              "3 points",
              "6 points (ex: alcool, stup\xE9fiants, refus de priorit\xE9 pi\xE9ton)",
              "8 points",
              "12 points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une infraction unique ne peut retirer plus de 6 points au maximum."
          },
          {
            "_id": "q-lec-13-2-4",
            "questionText": "En cas d\u2019infractions simultan\xE9es commises en m\xEAme temps, le cumul maximal de retrait est de :",
            "options": [
              "6 points",
              "8 points au maximum",
              "10 points",
              "12 points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le cumul de retraits de points lors d\u2019un m\xEAme contr\xF4le est plafonn\xE9 \xE0 8 points."
          },
          {
            "_id": "q-lec-13-2-5",
            "questionText": "Combien de points permet de r\xE9cup\xE9rer un stage de sensibilisation \xE0 la s\xE9curit\xE9 routi\xE8re ?",
            "options": [
              "2 points",
              "4 points (au maximum dans la limite de 12 points, 1 fois par an)",
              "6 points",
              "Tous les points"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le stage de 2 jours permet de r\xE9cup\xE9rer jusqu\u2019\xE0 4 points, une fois tous les ans."
          }
        ]
      },
      {
        "_id": "lec-13-3",
        "_type": "lecon",
        "title": "Le\xE7on 13.3 \u2014 Infractions et sanctions",
        "ordre": 3,
        "description": "Contraventions, d\xE9lits, amendes, suspension ou annulation de permis et gravit\xE9 du d\xE9lit de fuite.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-3-1",
            "questionText": "En droit routier fran\xE7ais, quelles sont les deux grandes cat\xE9gories d\u2019infractions ?",
            "options": [
              "Les petites et les grandes fautes",
              "Les contraventions (classes 1 \xE0 5) et les d\xE9lits (jug\xE9s au tribunal correctionnel)",
              "Les fautes de jour et de nuit",
              "Les fautes de vitesse"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les contraventions sont punies d\u2019amendes forfaitaires, les d\xE9lits de peines de prison et de tribunal."
          },
          {
            "_id": "q-lec-13-3-2",
            "questionText": "Conduire sans \xEAtre titulaire du permis de conduire constitue :",
            "options": [
              "Une contravention",
              "Un D\xC9LIT puni de 1 an de prison, 15 000 \u20AC d\u2019amende et confiscation du v\xE9hicule",
              "Une erreur tol\xE9r\xE9e",
              "Une amende de 35 \u20AC"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sans permis est un d\xE9lit p\xE9nal lourd."
          },
          {
            "_id": "q-lec-13-3-3",
            "questionText": "Que risque un jeune conducteur qui perd 3 points ou plus en p\xE9riode probatoire lors d\u2019une infraction ?",
            "options": [
              "Rien",
              "L\u2019obligation d\u2019effectuer un stage de sensibilisation dans les 4 mois (lettre 48N)",
              "La perte d\xE9finitive du permis",
              "Une amende de 10 000 \u20AC"
            ],
            "correctOptionIndex": 1,
            "explanation": "La lettre 48N rend le stage obligatoire avec remboursement de l\u2019amende."
          },
          {
            "_id": "q-lec-13-3-4",
            "questionText": "Lorsque le solde de points tombe \xE0 Z\xC9RO (lettre 48SI), le permis est :",
            "options": [
              "Suspendu 1 mois",
              "Invalid\xE9 pour solde nul : interdiction de conduire pendant 6 mois et obligation de repasser les \xE9preuves",
              "Recharg\xE9 automatiquement",
              "Remplac\xE9"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019invalidation 48SI oblige \xE0 restituer le permis en pr\xE9fecture."
          },
          {
            "_id": "q-lec-13-3-5",
            "questionText": "Un grand exc\xE8s de vitesse \xE9gal ou sup\xE9rieur \xE0 50 km/h au-dessus de la limite entra\xEEne :",
            "options": [
              "Une amende simple",
              "Retrait de 6 points, r\xE9tention imm\xE9diate du permis, saisie du v\xE9hicule et suspension",
              "1 point en moins",
              "Rien"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est une infraction majeure de 5\xE8me classe trait\xE9e avec s\xE9v\xE9rit\xE9 judiciaire."
          }
        ]
      },
      {
        "_id": "lec-13-4",
        "_type": "lecon",
        "title": "Le\xE7on 13.4 \u2014 Assurance automobile",
        "ordre": 4,
        "description": "Assurance obligatoire au tiers, garanties, assurance tous risques, franchise et d\xE9claration d\u2019un sinistre.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-4-1",
            "questionText": "Quelle est la seule garantie d\u2019assurance l\xE9galement OBLIGATOIRE pour faire circuler un v\xE9hicule \xE0 moteur ?",
            "options": [
              "L\u2019assurance Tous Risques",
              "L\u2019assurance Responsabilit\xE9 Civile (appel\xE9e assurance \xAB au Tiers \xBB)",
              "L\u2019assurance vol et incendie",
              "L\u2019assurance bris de glace"
            ],
            "correctOptionIndex": 1,
            "explanation": "La garantie responsabilit\xE9 civile au tiers est le minimum obligatoire l\xE9gal."
          },
          {
            "_id": "q-lec-13-4-2",
            "questionText": "Que couvre l\u2019assurance Responsabilit\xE9 Civile (au Tiers) ?",
            "options": [
              "Vos propres blessures et les d\xE9g\xE2ts sur votre voiture",
              "Les dommages mat\xE9riels et corporels caus\xE9s aux AUTRES personnes (passagers, pi\xE9tons, autres v\xE9hicules)",
              "La panne moteur",
              "Le carburant"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019assurance au tiers indemnise exclusivement les victimes et tiers l\xE9s\xE9s par votre v\xE9hicule."
          },
          {
            "_id": "q-lec-13-4-3",
            "questionText": "Circuler sans aucune assurance automobile (d\xE9faut d\u2019assurance) est :",
            "options": [
              "Tol\xE9r\xE9 le week-end",
              "Un d\xE9lit puni de 3 750 \u20AC d\u2019amende, suspension/annulation de permis et confiscation du v\xE9hicule",
              "Une amende de 11 \u20AC",
              "Autoris\xE9 sur autoroute"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le d\xE9faut d\u2019assurance est un d\xE9lit grave. En cas d\u2019accident, le conducteur responsable paie toute sa vie."
          },
          {
            "_id": "q-lec-13-4-4",
            "questionText": "Qu\u2019est-ce que la \xAB franchise \xBB dans un contrat d\u2019assurance auto ?",
            "options": [
              "Un bonus financier",
              "La somme restant obligatoirement \xE0 la charge de l\u2019assur\xE9 lors du r\xE8glement d\u2019un sinistre",
              "Le prix du contr\xF4le technique",
              "Une taxe d\u2019\xC9tat"
            ],
            "correctOptionIndex": 1,
            "explanation": "La franchise est le montant non rembours\xE9 par l\u2019assureur en cas de dommage."
          },
          {
            "_id": "q-lec-13-4-5",
            "questionText": "Comment \xE9volue le coefficient de Bonus-Malus apr\xE8s une ann\xE9e compl\xE8te sans accident responsable ?",
            "options": [
              "Il augmente de 25%",
              "Il est r\xE9duit de 5% (multipli\xE9 par 0,95)",
              "Il reste \xE0 1",
              "Il double"
            ],
            "correctOptionIndex": 1,
            "explanation": "Chaque ann\xE9e sans sinistre responsable r\xE9duit la prime de 5% (coefficient x 0,95)."
          }
        ]
      },
      {
        "_id": "lec-13-5",
        "_type": "lecon",
        "title": "Le\xE7on 13.5 \u2014 Responsabilit\xE9 civile et p\xE9nale du conducteur",
        "ordre": 5,
        "description": "Indemnisation des dommages caus\xE9s \xE0 autrui, sanctions p\xE9nales et responsabilit\xE9 du conducteur en cas d\u2019accident.",
        "videoUrl": "https://www.youtube.com/watch?v=GbIYOi387iI",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-13-5-1",
            "questionText": "Quelle est la diff\xE9rence entre responsabilit\xE9 civile et responsabilit\xE9 p\xE9nale ?",
            "options": [
              "Aucune",
              "La responsabilit\xE9 civile r\xE9pare et indemnise les dommages financiers caus\xE9s aux victimes ; la responsabilit\xE9 p\xE9nale punit les infractions devant la soci\xE9t\xE9 (amende, prison)",
              "La p\xE9nale est pour les v\xE9los",
              "La civile est pour les assurances priv\xE9es"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le volet civil indemnise les pr\xE9judices, le volet p\xE9nal sanctionne la faute l\xE9gale."
          },
          {
            "_id": "q-lec-13-5-2",
            "questionText": "L\u2019assurance peut-elle se retourner contre le conducteur responsable d\u2019un accident sous alcool ou stup\xE9fiants ?",
            "options": [
              "Non jamais",
              "Oui, l\u2019assureur peut r\xE9silier le contrat et exiger le remboursement total des sommes vers\xE9es aux victimes (d\xE9ch\xE9ance de garantie)",
              "L\u2019assureur paie tout sans rien dire",
              "Uniquement pour les moins de 18 ans"
            ],
            "correctOptionIndex": 1,
            "explanation": "La conduite sous emprise toxique entra\xEEne la d\xE9ch\xE9ance des garanties facultatives."
          },
          {
            "_id": "q-lec-13-5-3",
            "questionText": "Le propri\xE9taire de la carte grise peut-il \xEAtre tenu p\xE9cuniairement responsable d\u2019un exc\xE8s de vitesse commis avec son v\xE9hicule s\u2019il ne d\xE9nonce pas le conducteur ?",
            "options": [
              "Non",
              "Oui, il est redevable de l\u2019amende p\xE9cuniaire sauf s\u2019il prouve le vol ou d\xE9signe l\u2019auteur de l\u2019infraction",
              "Uniquement s\u2019il \xE9tait passager",
              "Jamais"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le titulaire de la carte grise est pr\xE9sum\xE9 responsable du paiement des amendes radars."
          },
          {
            "_id": "q-lec-13-5-4",
            "questionText": "Causer involontairement la mort d\u2019un usager de la route lors d\u2019un accident avec circonstances aggravantes (alcool + vitesse) constitue :",
            "options": [
              "Un simple accident mat\xE9riel",
              "Un homicide involontaire aggrav\xE9 puni de jusqu\u2019\xE0 10 ans de prison et 150 000 \u20AC d\u2019amende",
              "Une amende de classe 4",
              "Une faute civile sans prison"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est un d\xE9lit criminellement grave jug\xE9 avec s\xE9v\xE9rit\xE9 par les tribunaux."
          },
          {
            "_id": "q-lec-13-5-5",
            "questionText": "Peut-on assurer un v\xE9hicule au nom d\u2019un tiers pour payer moins cher tout en \xE9tant le conducteur principal r\xE9el ?",
            "options": [
              "Oui c\u2019est l\xE9gal",
              "Non, c\u2019est une fausse d\xE9claration intentionnelle pouvant entra\xEEner la nullit\xE9 totale du contrat d\u2019assurance",
              "Oui sur internet",
              "Oui en famille"
            ],
            "correctOptionIndex": 1,
            "explanation": "La fausse d\xE9claration intentionnelle annule le contrat et supprime toute couverture en cas d\u2019accident."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-14",
    "_type": "moduleFormation",
    "code": "MOD-014",
    "title": "Module 14 \u2014 \xC9coconduite et entretien",
    "summary": "Principes de l'\xE9coconduite, gestion du r\xE9gime moteur, pression des pneus, niveaux d'huile et liquide, v\xE9rifications de s\xE9curit\xE9 et mobilit\xE9 verte.",
    "learningObjectives": [
      "Appliquer les principes d'une conduite souple, \xE9conomique et \xE9cologique",
      "Optimiser les passages de vitesses et utiliser le frein moteur pour r\xE9duire la consommation",
      "Effectuer les contr\xF4les r\xE9guliers de pression des pneus et niveaux sous le capot",
      "Pr\xE9parer un long trajet en s\xE9curit\xE9 et limiter l'empreinte environnementale"
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
        "title": "Le\xE7on 14.1 \u2014 Principes de l\u2019\xE9coconduite",
        "ordre": 1,
        "description": "Anticipation, conduite souple, r\xE9gime moteur adapt\xE9, r\xE9duction de la consommation et des \xE9missions.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-1-1",
            "questionText": "Quel gain moyen de consommation de carburant permet une \xE9coconduite bien appliqu\xE9e ?",
            "options": [
              "Moins de 1%",
              "Entre 15% et 25% d\u2019\xE9conomie de carburant",
              "Aucune \xE9conomie",
              "50%"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019\xE9coconduite fait \xE9conomiser jusqu\u2019\xE0 20 \xE0 25% de carburant et r\xE9duit d\u2019autant les \xE9missions de CO2."
          },
          {
            "_id": "q-lec-14-1-2",
            "questionText": "Sur une voiture \xE0 essence, \xE0 quel r\xE9gime moteur est-il recommand\xE9 de passer le rapport sup\xE9rieur en \xE9coconduite ?",
            "options": [
              "\xC0 5000 tr/min",
              "Vers 2000 \xE0 2500 tr/min maximum",
              "\xC0 1000 tr/min",
              "En zone rouge"
            ],
            "correctOptionIndex": 1,
            "explanation": "Passer les rapports t\xF4t (vers 2000 tr/min sur diesel, 2500 tr/min sur essence) \xE9vite le surr\xE9gime \xE9nergivore."
          },
          {
            "_id": "q-lec-14-1-3",
            "questionText": "Quelle est la r\xE8gle d\u2019or de l\u2019\xE9coconduite pour limiter les freinages et acc\xE9l\xE9rations brusques ?",
            "options": [
              "Rouler vite",
              "L\u2019anticipation du trafic et la fluidit\xE9 des trajectoires en maintenant une bonne distance",
              "Acc\xE9l\xE9rer fort puis piler",
              "Rouler au point mort"
            ],
            "correctOptionIndex": 1,
            "explanation": "Anticiper les feux et ralentissements permet de laisser rouler le v\xE9hicule sur son \xE9lan."
          },
          {
            "_id": "q-lec-14-1-4",
            "questionText": "Lorsque vous rel\xE2chez totalement l\u2019acc\xE9l\xE9rateur avec une vitesse enclench\xE9e (frein moteur), la consommation instantan\xE9e est de :",
            "options": [
              "10 litres/100 km",
              "0,0 litre/100 km (coupure totale d\u2019injection)",
              "5 litres/100 km",
              "Maximale"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les moteurs modernes coupent totalement l\u2019injection de carburant en d\xE9c\xE9l\xE9ration."
          },
          {
            "_id": "q-lec-14-1-5",
            "questionText": "Est-il conseill\xE9 de rouler au point mort (roue libre) pour \xE9conomiser du carburant ?",
            "options": [
              "Oui c\u2019est tr\xE8s efficace",
              "Non, c\u2019est dangereux (perte de frein moteur et de contr\xF4le) et cela consomme du carburant au ralenti",
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
        "title": "Le\xE7on 14.2 \u2014 Pression des pneus et entretien courant",
        "ordre": 2,
        "description": "Pression des pneus, niveaux d\u2019huile et de refroidissement, usure des plaquettes et entretien pr\xE9ventif.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-2-1",
            "questionText": "\xC0 quelle fr\xE9quence doit-on v\xE9rifier la pression de ses pneumatiques ?",
            "options": [
              "Tous les ans",
              "Au moins une fois par mois et avant chaque long trajet, de pr\xE9f\xE9rence \xE0 froid",
              "Tous les 5 ans",
              "Uniquement au contr\xF4le technique"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un contr\xF4le mensuel des pressions pr\xE9vient l\u2019usure pr\xE9matur\xE9e et l\u2019\xE9clatement."
          },
          {
            "_id": "q-lec-14-2-2",
            "questionText": "Quelles sont les cons\xE9quences directes d\u2019un sous-gonflage des pneumatiques ?",
            "options": [
              "Une meilleure vitesse",
              "Surconsommation de carburant, \xE9chauffement excessif, risque d\u2019\xE9clatement et d\xE9gradation de la tenue de route",
              "Aucune cons\xE9quence",
              "Moins d\u2019usure"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un pneu sous-gonfl\xE9 augmente la r\xE9sistance au roulement et peut \xE9clater sous l\u2019effet de la chaleur."
          },
          {
            "_id": "q-lec-14-2-3",
            "questionText": "O\xF9 trouve-t-on les valeurs de pression pr\xE9conis\xE9es par le constructeur pour son v\xE9hicule ?",
            "options": [
              "Sur le permis",
              "Sur l\u2019\xE9tiquette coll\xE9e dans la porti\xE8re conducteur, dans la trappe \xE0 carburant ou le livret de bord",
              "Sur le tableau de bord",
              "Sur le pare-brise"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les pressions exactes sont indiqu\xE9es sur la tranche de la porti\xE8re ou dans la trappe \xE0 essence."
          },
          {
            "_id": "q-lec-14-2-4",
            "questionText": "Le niveau du liquide de frein doit se situer :",
            "options": [
              "En dessous du minimum",
              "Entre les rep\xE8res MIN et MAX du bocal transparent",
              "Au-dessus du bouchon",
              "Bocal vide"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le niveau doit imp\xE9rativement rester entre les rep\xE8res MIN et MAX."
          },
          {
            "_id": "q-lec-14-2-5",
            "questionText": "Si le liquide de refroidissement est au niveau MIN, quel liquide ajouter moteur FROID ?",
            "options": [
              "De l\u2019huile moteur",
              "Du liquide de refroidissement sp\xE9cifique pr\xE9conis\xE9",
              "De l\u2019eau savonneuse",
              "Du liquide de frein"
            ],
            "correctOptionIndex": 1,
            "explanation": "On compl\xE8te avec du liquide de refroidissement adapt\xE9 en veillant \xE0 ne jamais ouvrir le bocal \xE0 chaud."
          }
        ]
      },
      {
        "_id": "lec-14-3",
        "_type": "lecon",
        "title": "Le\xE7on 14.3 \u2014 V\xE9rifications avant un long trajet",
        "ordre": 3,
        "description": "Contr\xF4le de l\u2019\xE9tat des pneus, des feux, des niveaux, des documents et du chargement avant un trajet important.",
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
              "Mettre les objets les plus lourds au fond du coffre contre les dossiers de si\xE8ges",
              "Poser les objets lourds sur la plage arri\xE8re",
              "Tout mettre sur le toit",
              "Sur le capot"
            ],
            "correctOptionIndex": 0,
            "explanation": "Les charges lourdes au plancher abaissent le centre de gravit\xE9 et ne risquent pas de voler vers l\u2019avant."
          },
          {
            "_id": "q-lec-14-3-2",
            "questionText": "Des objets lourds pos\xE9s librement sur la plage arri\xE8re repr\xE9sentent en cas de choc \xE0 50 km/h :",
            "options": [
              "Aucun danger",
              "Des projectiles mortels capables de tuer les passagers avant lors d\u2019une d\xE9c\xE9l\xE9ration brutale",
              "Un coussin de protection",
              "Une d\xE9coration"
            ],
            "correctOptionIndex": 1,
            "explanation": "Un objet de quelques kilos devient une masse de plusieurs dizaines de kilos sous l\u2019impact."
          },
          {
            "_id": "q-lec-14-3-3",
            "questionText": "Si vous transportez un coffre de toit ou des barres de toit charg\xE9es :",
            "options": [
              "La consommation diminue",
              "La consommation augmente de 10 \xE0 20% \xE0 cause de la r\xE9sistance a\xE9rodynamique",
              "La vitesse maximale est augment\xE9e",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "La prise au vent augmente la tra\xEEn\xE9e a\xE9rodynamique et la facture de carburant."
          },
          {
            "_id": "q-lec-14-3-4",
            "questionText": "Avant de partir charg\xE9, devez-vous ajuster la hauteur des faisceaux de phares ?",
            "options": [
              "Non jamais",
              "Oui, baisser les phares avec la molette de r\xE9glage pour \xE9viter d\u2019\xE9blouir \xE0 cause de l\u2019affaissement de l\u2019arri\xE8re",
              "Allumer les antibrouillards",
              "Mettre en feux de route"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le poids sur l\u2019essieu arri\xE8re l\xE8ve le nez de la voiture et fait pointer les phares vers le haut."
          },
          {
            "_id": "q-lec-14-3-5",
            "questionText": "Quelle est la v\xE9rification essentielle \xE0 faire sur les essuie-glaces avant un long voyage ?",
            "options": [
              "V\xE9rifier l\u2019absence de craquelures sur les balais et le niveau du r\xE9servoir de lave-glace",
              "Les peindre en noir",
              "Les d\xE9monter",
              "Les couper"
            ],
            "correctOptionIndex": 0,
            "explanation": "Des balais propres et un liquide lave-glace plein assurent une visibilit\xE9 irr\xE9prochable."
          }
        ]
      },
      {
        "_id": "lec-14-4",
        "_type": "lecon",
        "title": "Le\xE7on 14.4 \u2014 Pollution et mobilit\xE9 responsable",
        "ordre": 4,
        "description": "R\xE9duction des \xE9missions, choix de mobilit\xE9, optimisation des d\xE9placements et entretien du v\xE9hicule.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-4-1",
            "questionText": "Que certifie la vignette environnementale Crit\u2019Air appos\xE9e sur le pare-brise ?",
            "options": [
              "Le paiement des taxes",
              "La classe environnementale du v\xE9hicule selon son niveau d\u2019\xE9mission de polluants et son carburant",
              "L\u2019assurance tous risques",
              "Le permis du conducteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "La vignette Crit\u2019Air d\xE9termine les autorisations de circuler dans les Zones \xE0 Faibles \xC9missions (ZFE)."
          },
          {
            "_id": "q-lec-14-4-2",
            "questionText": "Lors d\u2019un pic de pollution de l\u2019air en ville, quelle mesure de conduite est souvent impos\xE9e ?",
            "options": [
              "Rouler en feux de route",
              "Abaissement de 20 km/h de la vitesse maximale autoris\xE9e et circulation diff\xE9renci\xE9e",
              "Interdiction de freiner",
              "Augmentation de la vitesse"
            ],
            "correctOptionIndex": 1,
            "explanation": "R\xE9duire la vitesse de 20 km/h diminue directement les \xE9missions de particules fines et d\u2019oxydes d\u2019azote."
          },
          {
            "_id": "q-lec-14-4-3",
            "questionText": "L\u2019utilisation de la climatisation en continu dans l\u2019habitacle entra\xEEne :",
            "options": [
              "Une baisse de la consommation",
              "Une surconsommation de carburant pouvant atteindre 10 \xE0 15% et des rejets suppl\xE9mentaires",
              "Une panne de frein",
              "Aucun effet"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le compresseur de climatisation demande de l\u2019\xE9nergie au moteur et augmente la consommation."
          },
          {
            "_id": "q-lec-14-4-4",
            "questionText": "Pour les trajets tr\xE8s courts du quotidien (moins de 2 km), quelle est l\u2019alternative la plus responsable ?",
            "options": [
              "Prendre son gros 4x4",
              "Privil\xE9gier la marche \xE0 pied, le v\xE9lo ou les transports en commun",
              "Rouler moteur froid \xE0 fond",
              "Laisser tourner le moteur 10 min"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est sur les premiers kilom\xE8tres que le moteur froid pollue et consomme le plus."
          },
          {
            "_id": "q-lec-14-4-5",
            "questionText": "Le covoiturage r\xE9gulier permet de :",
            "options": [
              "Multiplier les bouchons",
              "Diviser les frais de carburant, r\xE9duire le nombre de v\xE9hicules sur la route et diminuer la pollution globale",
              "Perdre des points",
              "Augmenter le risque de panne"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le partage des trajets all\xE8ge le trafic et les \xE9missions de gaz \xE0 effet de serre."
          }
        ]
      },
      {
        "_id": "lec-14-5",
        "_type": "lecon",
        "title": "Le\xE7on 14.5 \u2014 Conduite \xE9conomique en pratique",
        "ordre": 5,
        "description": "Acc\xE9l\xE9ration progressive, anticipation, frein moteur, limitation de la climatisation excessive et r\xE9duction des consommations inutiles.",
        "videoUrl": "https://www.youtube.com/watch?v=BK5m9SMjeCs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-14-5-1",
            "questionText": "Pour d\xE9marrer et acc\xE9l\xE9rer de fa\xE7on \xE9co-responsable, on doit :",
            "options": [
              "Faire crisser les pneus",
              "Monter doucement dans les tours et passer rapidement les rapports sup\xE9rieurs sans pousser les r\xE9gimes",
              "Rester en 1\xE8re jusqu\u2019\xE0 50 km/h",
              "Acc\xE9l\xE9rer \xE0 fond"
            ],
            "correctOptionIndex": 1,
            "explanation": "La mont\xE9e en vitesse souple et le passage pr\xE9coce des rapports sont au c\u0153ur de l\u2019\xE9coconduite."
          },
          {
            "_id": "q-lec-14-5-2",
            "questionText": "\xC0 l\u2019arr\xEAt prolong\xE9 (plus d\u2019une minute \xE0 un passage \xE0 niveau ou dans un embouteillage statique) :",
            "options": [
              "Laisser tourner le moteur",
              "Couper le moteur manuellement ou laisser agir le syst\xE8me Start & Stop",
              "Donner des coups d\u2019acc\xE9l\xE9rateur",
              "Allumer la clim"
            ],
            "correctOptionIndex": 1,
            "explanation": "Couper le moteur d\xE8s 30 secondes d\u2019arr\xEAt \xE9limine toute consommation et pollution inutile."
          },
          {
            "_id": "q-lec-14-5-3",
            "questionText": "Quelle est la cons\xE9quence de rouler vitres ouvertes \xE0 130 km/h sur autoroute ?",
            "options": [
              "Aucun effet",
              "Forte surconsommation due \xE0 la d\xE9gradation a\xE9rodynamique par turbulence d\u2019air",
              "\xC9conomie de carburant",
              "Refroidissement des pneus"
            ],
            "correctOptionIndex": 1,
            "explanation": "\xC0 vitesse \xE9lev\xE9e, l\u2019a\xE9rodynamisme prime : les vitres ouvertes freinent le v\xE9hicule."
          },
          {
            "_id": "q-lec-14-5-4",
            "questionText": "L\u2019utilisation du r\xE9gulateur de vitesse sur autoroute par temps sec permet :",
            "options": [
              "De s\u2019endormir",
              "De stabiliser sa vitesse et d\u2019optimiser la consommation de carburant sur le plat",
              "De doubler par la droite",
              "De couper les freins"
            ],
            "correctOptionIndex": 1,
            "explanation": "Une vitesse stable sans \xE0-coups limite les surconsommations sur les longs trajets."
          },
          {
            "_id": "q-lec-14-5-5",
            "questionText": "D\xE9monter les barres de toit ou porte-v\xE9los lorsqu\u2019on ne s\u2019en sert pas :",
            "options": [
              "Est inutile",
              "Permet de supprimer la r\xE9sistance \xE0 l\u2019air inutile et d\u2019\xE9conomiser du carburant",
              "Est interdit",
              "Ab\xEEme le toit"
            ],
            "correctOptionIndex": 1,
            "explanation": "Retirer les accessoires inutiles r\xE9tablit le profil a\xE9rodynamique d\u2019origine du v\xE9hicule."
          }
        ]
      }
    ]
  },
  {
    "_id": "mod-15",
    "_type": "moduleFormation",
    "code": "MOD-015",
    "title": "Module 15 \u2014 R\xE9visions et examens blancs",
    "summary": "Synth\xE8se g\xE9n\xE9rale et examens blancs type ETG (\xC9preuve Th\xE9orique G\xE9n\xE9rale) couvrant les 10 th\xE8mes du Code de la Route.",
    "learningObjectives": [
      "R\xE9viser l'ensemble des panneaux de danger, interdiction, obligation et indication",
      "Valider les priorit\xE9s aux intersections et les r\xE8gles de circulation complexes",
      "Ma\xEEtriser tous les calculs de distances d'arr\xEAt, de freinage et de s\xE9curit\xE9",
      "R\xE9ussir l'examen blanc final type ETG officiel de 40 questions avec un score sup\xE9rieur \xE0 35/40"
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
        "title": "Le\xE7on 15.1 \u2014 R\xE9vision g\xE9n\xE9rale des panneaux",
        "ordre": 1,
        "description": "R\xE9vision des panneaux de danger, d\u2019interdiction, d\u2019obligation, d\u2019indication, de direction et de priorit\xE9.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-1-1",
            "questionText": "Quelle est la signification d\u2019un panneau triangulaire invers\xE9 pointant vers le bas ?",
            "options": [
              "Danger virage",
              "C\xE9dez le passage \xE0 l\u2019intersection",
              "Arr\xEAt absolu",
              "Sens unique"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le triangle invers\xE9 est le signal universel du C\xE9dez le passage."
          },
          {
            "_id": "q-lec-15-1-2",
            "questionText": "Un panneau carr\xE9 bleu avec un pictogramme blanc d\u2019autoroute annonce :",
            "options": [
              "Une piste cyclable",
              "L\u2019entr\xE9e sur une section d\u2019autoroute avec application des r\xE8gles autorouti\xE8res",
              "La sortie d\u2019autoroute",
              "Un p\xE9age"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il marque le d\xE9but de l\u2019autoroute o\xF9 les pi\xE9tons, v\xE9los et engins lents sont interdits."
          },
          {
            "_id": "q-lec-15-1-3",
            "questionText": "Que signifie un panneau rond blanc cercl\xE9 de rouge totalement vierge \xE0 l\u2019int\xE9rieur ?",
            "options": [
              "Sens interdit",
              "Circulation interdite \xE0 tout v\xE9hicule dans les deux sens",
              "Stationnement interdit",
              "Fin d\u2019interdiction"
            ],
            "correctOptionIndex": 1,
            "explanation": "C\u2019est le signal d\u2019acc\xE8s interdit \xE0 tout v\xE9hicule dans les deux sens de circulation."
          },
          {
            "_id": "q-lec-15-1-4",
            "questionText": "Que signifie un panneau rond rouge avec une barre blanche horizontale ?",
            "options": [
              "C\xE9dez le passage",
              "Sens interdit (interdiction de p\xE9n\xE9trer dans ce sens)",
              "Route barr\xE9e",
              "Douane"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le sens interdit prohibe l\u2019entr\xE9e dans cette direction."
          },
          {
            "_id": "q-lec-15-1-5",
            "questionText": "Un panneau octogonal rouge portant le mot STOP impose :",
            "options": [
              "Un ralentissement",
              "Un temps d\u2019arr\xEAt complet et marqu\xE9 des roues au niveau de la ligne continue",
              "De klaxonner",
              "De faire demi-tour"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le Stop impose l\u2019arr\xEAt absolu inconditionnel."
          }
        ]
      },
      {
        "_id": "lec-15-2",
        "_type": "lecon",
        "title": "Le\xE7on 15.2 \u2014 R\xE9vision g\xE9n\xE9rale des priorit\xE9s et intersections",
        "ordre": 2,
        "description": "Priorit\xE9 \xE0 droite, Stop, C\xE9dez-le-passage, giratoires, feux et passages \xE0 niveau.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-2-1",
            "questionText": "En l\u2019absence de tout panneau \xE0 un carrefour, qui passe en premier ?",
            "options": [
              "Le v\xE9hicule venant de gauche",
              "Le v\xE9hicule venant de droite (priorit\xE9 \xE0 droite)",
              "Le plus rapide",
              "Le v\xE9hicule le plus lourd"
            ],
            "correctOptionIndex": 1,
            "explanation": "La r\xE8gle par d\xE9faut est la priorit\xE9 \xE0 droite."
          },
          {
            "_id": "q-lec-15-2-2",
            "questionText": "Au feu vert, je souhaite tourner \xE0 gauche. Qui est prioritaire ?",
            "options": [
              "Moi seul",
              "Les v\xE9hicules arrivant en face qui vont tout droit ou tournent \xE0 droite",
              "Les voitures derri\xE8re moi",
              "Personne"
            ],
            "correctOptionIndex": 1,
            "explanation": "En coupant la voie d\u2019en face, on doit c\xE9der le passage aux usagers d\u2019en face."
          },
          {
            "_id": "q-lec-15-2-3",
            "questionText": "Sur un rond-point \xE0 sens giratoire avec panneaux C\xE9dez le passage aux entr\xE9es :",
            "options": [
              "Ceux qui entrent ont la priorit\xE9",
              "Les v\xE9hicules circulant sur l\u2019anneau sont prioritaires",
              "Priorit\xE9 \xE0 droite",
              "Priorit\xE9 aux camions"
            ],
            "correctOptionIndex": 1,
            "explanation": "La priorit\xE9 appartient aux usagers engag\xE9s dans l\u2019anneau."
          },
          {
            "_id": "q-lec-15-2-4",
            "questionText": "Face \xE0 un feu rouge clignotant \xE0 un passage \xE0 niveau :",
            "options": [
              "Je passe vite",
              "L\u2019arr\xEAt imm\xE9diat et absolu est obligatoire",
              "Je klaxonne",
              "Je double"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le feu rouge clignotant interdit formellement de franchir la voie ferr\xE9e."
          },
          {
            "_id": "q-lec-15-2-5",
            "questionText": "Un v\xE9hicule de police approche avec gyrophare bleu et sir\xE8ne deux-tons active :",
            "options": [
              "J\u2019acc\xE9l\xE8re",
              "Je lui c\xE8de le passage et facilite sa progression en serrant \xE0 droite",
              "Je garde ma vitesse",
              "Je le bloque"
            ],
            "correctOptionIndex": 1,
            "explanation": "Les v\xE9hicules de secours en intervention sont prioritaires absolus."
          }
        ]
      },
      {
        "_id": "lec-15-3",
        "_type": "lecon",
        "title": "Le\xE7on 15.3 \u2014 R\xE9vision des distances, vitesses et risques",
        "ordre": 3,
        "description": "Distance d\u2019arr\xEAt, distance de s\xE9curit\xE9, limitations, alcool, fatigue, t\xE9l\xE9phone et conditions difficiles.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-3-1",
            "questionText": "\xC0 50 km/h sur sol sec, quelle est l\u2019estimation de la distance totale d\u2019arr\xEAt ?",
            "options": [
              "15 m\xE8tres",
              "25 m\xE8tres (5 x 5)",
              "50 m\xE8tres",
              "100 m\xE8tres"
            ],
            "correctOptionIndex": 1,
            "explanation": "Formule : 5 x 5 = 25 m\xE8tres d\u2019arr\xEAt total."
          },
          {
            "_id": "q-lec-15-3-2",
            "questionText": "Sur sol mouill\xE9, que devient la distance de freinage ?",
            "options": [
              "Elle diminue",
              "Elle est multipli\xE9e par deux",
              "Elle est divis\xE9e par deux",
              "Inchang\xE9e"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019adh\xE9rence divis\xE9e par 2 double la distance de freinage."
          },
          {
            "_id": "q-lec-15-3-3",
            "questionText": "Quel est le taux l\xE9gal maximal d\u2019alcool\xE9mie en permis probatoire ?",
            "options": [
              "0,0 g/l",
              "0,2 g/l de sang (tol\xE9rance z\xE9ro)",
              "0,5 g/l",
              "0,8 g/l"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le seuil probatoire est de 0,2 g/l de sang."
          },
          {
            "_id": "q-lec-15-3-4",
            "questionText": "Quel est le temps moyen d\u2019un intervalle de s\xE9curit\xE9 r\xE9glementaire entre 2 voitures ?",
            "options": [
              "0,5 s",
              "1 s",
              "2 secondes au moins",
              "5 s"
            ],
            "correctOptionIndex": 2,
            "explanation": "L\u2019intervalle de s\xE9curit\xE9 doit \xEAtre d\u2019au moins 2 secondes."
          },
          {
            "_id": "q-lec-15-3-5",
            "questionText": "L\u2019utilisation d\u2019un smartphone tenu en main en conduisant retire :",
            "options": [
              "1 point",
              "2 points",
              "3 points et 135 \u20AC d\u2019amende",
              "6 points"
            ],
            "correctOptionIndex": 2,
            "explanation": "T\xE9l\xE9phoner au volant entra\xEEne le retrait de 3 points."
          }
        ]
      },
      {
        "_id": "lec-15-4",
        "_type": "lecon",
        "title": "Le\xE7on 15.4 \u2014 R\xE9vision m\xE9canique, s\xE9curit\xE9 et environnement",
        "ordre": 4,
        "description": "Voyants, pneus, \xE9quipements, entretien, \xE9coconduite et s\xE9curit\xE9 des passagers.",
        "videoUrl": "https://www.youtube.com/watch?v=FvS-JIuclvs",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-4-1",
            "questionText": "L\u2019allumage d\u2019un voyant de couleur ROUGE en circulation exige :",
            "options": [
              "Un contr\xF4le annuel",
              "Un arr\xEAt imm\xE9diat et s\xE9curis\xE9 du v\xE9hicule",
              "D\u2019acc\xE9l\xE9rer",
              "D\u2019allumer les antibrouillards"
            ],
            "correctOptionIndex": 1,
            "explanation": "Le voyant rouge signale un danger critique imposant l\u2019arr\xEAt imm\xE9diat."
          },
          {
            "_id": "q-lec-15-4-2",
            "questionText": "Quelle est la profondeur minimale des rainures de pneus autoris\xE9e par la loi ?",
            "options": [
              "0,5 mm",
              "1,6 mm sur toute la bande de roulement",
              "3,0 mm",
              "5,0 mm"
            ],
            "correctOptionIndex": 1,
            "explanation": "La limite l\xE9gale est de 1,6 mm."
          },
          {
            "_id": "q-lec-15-4-3",
            "questionText": "Le syst\xE8me ABS a pour fonction premi\xE8re de :",
            "options": [
              "Remplacer la ceinture",
              "Emp\xEAcher le blocage des roues pour garder le contr\xF4le de direction lors d\u2019un freinage fort",
              "Couper le moteur",
              "Acc\xE9l\xE9rer"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019ABS pr\xE9serve la man\u0153uvrabilit\xE9 du v\xE9hicule pendant le freinage."
          },
          {
            "_id": "q-lec-15-4-4",
            "questionText": "Le port de la ceinture de s\xE9curit\xE9 est obligatoire :",
            "options": [
              "\xC0 l\u2019avant seulement",
              "\xC0 toutes les places \xE9quip\xE9es d\u2019une ceinture (avant et arri\xE8re)",
              "Uniquement sur autoroute",
              "Uniquement pour le conducteur"
            ],
            "correctOptionIndex": 1,
            "explanation": "Tous les passagers doivent \xEAtre attach\xE9s."
          },
          {
            "_id": "q-lec-15-4-5",
            "questionText": "L\u2019\xE9coconduite permet une \xE9conomie moyenne de carburant de :",
            "options": [
              "1%",
              "5%",
              "15% \xE0 25%",
              "50%"
            ],
            "correctOptionIndex": 2,
            "explanation": "Une conduite souple et anticipative \xE9conomise jusqu\u2019\xE0 25% de carburant."
          }
        ]
      },
      {
        "_id": "lec-15-5",
        "_type": "lecon",
        "title": "Le\xE7on 15.5 \u2014 Examen blanc final type ETG",
        "ordre": 5,
        "description": "Simulation finale de 40 questions couvrant les dix th\xE9matiques officielles du code de la route.",
        "videoUrl": "https://www.youtube.com/watch?v=vOEc9e1qq_E",
        "durationSeconds": 540,
        "tempsMinimumVisionnageSeconds": 432,
        "hasInlineQuiz": true,
        "createdAt": "2026-01-01T00:00:00Z",
        "updatedAt": "2026-01-01T00:00:00Z",
        "inlineQuiz": [
          {
            "_id": "q-lec-15-5-1",
            "questionText": "Pour r\xE9ussir l\u2019examen officiel du Code de la Route (ETG), combien de fautes maximum sont tol\xE9r\xE9es sur 40 questions ?",
            "options": [
              "3 fautes",
              "5 fautes maximum (score minimal requis : 35/40)",
              "8 fautes",
              "10 fautes"
            ],
            "correctOptionIndex": 1,
            "explanation": "Il faut obtenir au moins 35 bonnes r\xE9ponses sur 40 pour \xEAtre re\xE7u \xE0 l\u2019examen."
          },
          {
            "_id": "q-lec-15-5-2",
            "questionText": "Combien de th\xE9matiques officielles composent l\u2019examen du Code de la route ?",
            "options": [
              "3 th\xE8mes",
              "5 th\xE8mes",
              "10 th\xE9matiques officielles (L, C, U, R, D, A, M, S, P, E)",
              "20 th\xE8mes"
            ],
            "correctOptionIndex": 2,
            "explanation": "L\u2019ETG couvre 10 familles officielles de r\xE9glementation et s\xE9curit\xE9 routi\xE8re."
          },
          {
            "_id": "q-lec-15-5-3",
            "questionText": "Quelle est la premi\xE8re cause de mortalit\xE9 sur les autoroutes fran\xE7aises ?",
            "options": [
              "La pluie",
              "La somnolence et la fatigue au volant",
              "Les pannes d\u2019essence",
              "Les animaux"
            ],
            "correctOptionIndex": 1,
            "explanation": "L\u2019endormissement est le 1er facteur mortel sur autoroute."
          },
          {
            "_id": "q-lec-15-5-4",
            "questionText": "La distance de s\xE9curit\xE9 minimale \xE0 laisser en d\xE9passant un cycliste hors agglom\xE9ration est de :",
            "options": [
              "0,5 m",
              "1 m",
              "1,50 m",
              "2,5 m"
            ],
            "correctOptionIndex": 2,
            "explanation": "1,50 m hors ville, 1 m en agglom\xE9ration."
          },
          {
            "_id": "q-lec-15-5-5",
            "questionText": "Le refus de priorit\xE9 \xE0 un pi\xE9ton engag\xE9 sur un passage clout\xE9 est sanctionn\xE9 par :",
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
var PERMIS_B_QUIZZES = [
  {
    "_id": "quiz-mod-1",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 1 \u2014 Comprendre le v\xE9hicule",
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
        "questionText": "Quelle est la profondeur minimale l\xE9gale des rainures d\u2019un pneumatique ?",
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
        "questionText": "L\u2019allumage d\u2019un voyant rouge d\u2019alerte en circulation n\xE9cessite :",
        "options": [
          "De continuer \xE0 vitesse mod\xE9r\xE9e",
          "Un arr\xEAt imm\xE9diat et s\xE9curis\xE9 du v\xE9hicule",
          "D\u2019acc\xE9l\xE9rer jusqu\u2019au garage",
          "D\u2019allumer les feux"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le voyant rouge impose de s\u2019arr\xEAter d\xE8s que possible en s\xE9curit\xE9."
      },
      {
        "_id": "q-final-1-3",
        "questionText": "Quelle est la mission principale du syst\xE8me ABS ?",
        "options": [
          "R\xE9duire la vitesse en virage",
          "Maintenir le pouvoir directionnel en \xE9vitant le blocage des roues",
          "Remplacer les freins",
          "Recharger la batterie"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019ABS emp\xEAche les roues de se bloquer pour permettre l\u2019\xE9vitement."
      },
      {
        "_id": "q-final-1-4",
        "questionText": "Pour une bonne installation au poste de conduite, que r\xE8gle-t-on en dernier ?",
        "options": [
          "Le si\xE8ge",
          "Les r\xE9troviseurs",
          "Le volant",
          "La ceinture de s\xE9curit\xE9"
        ],
        "correctOptionIndex": 3,
        "explanation": "La ceinture se boucle en dernier une fois tous les r\xE9glages termin\xE9s."
      },
      {
        "_id": "q-final-1-5",
        "questionText": "De quelle couleur est le t\xE9moin d\u2019avertissement du niveau de carburant ?",
        "options": [
          "Rouge",
          "Orange / Jaune",
          "Vert",
          "Bleu"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le t\xE9moin de r\xE9serve est orange car il n\u2019impose pas un arr\xEAt d\u2019urgence."
      },
      {
        "_id": "q-final-1-6",
        "questionText": "Quelle pression appliquer aux pneus avant un long trajet autoroutier ?",
        "options": [
          "Diminuer de 0,5 bar",
          "Laisser sous-gonfl\xE9",
          "Augmenter de 0,2 \xE0 0,3 bar",
          "Aucun changement"
        ],
        "correctOptionIndex": 2,
        "explanation": "On augmente la pression de 0,2 \xE0 0,3 bar pour \xE9viter l\u2019\xE9chauffement sur autoroute."
      },
      {
        "_id": "q-final-1-7",
        "questionText": "\xC0 quoi sert la commande d\u2019essuie-glaces ?",
        "options": [
          "\xC0 refroidir les vitres",
          "\xC0 \xE9vacuer l\u2019eau pour assurer une bonne visibilit\xE9",
          "\xC0 r\xE9gler les phares",
          "\xC0 d\xE9givrer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les essuie-glaces garantissent la visibilit\xE9 par mauvais temps."
      },
      {
        "_id": "q-final-1-8",
        "questionText": "Sans ceinture attach\xE9e, l\u2019airbag peut-il blesser gri\xE8vement l\u2019occupant ?",
        "options": [
          "Non, jamais",
          "Oui, le choc direct avec le coussin en d\xE9ploiement peut \xEAtre tr\xE8s violent",
          "C\u2019est sans danger",
          "L\u2019airbag ne s\u2019ouvre pas"
        ],
        "correctOptionIndex": 1,
        "explanation": "Sans retenue de ceinture, la projection contre l\u2019airbag peut \xEAtre mortelle."
      },
      {
        "_id": "q-final-1-9",
        "questionText": "Sur bo\xEEte manuelle, quand utilise-t-on la p\xE9dale d\u2019embrayage ?",
        "options": [
          "Pour acc\xE9l\xE9rer",
          "Pour passer les vitesses et s\u2019arr\xEAter sans caler",
          "Pour freiner fort",
          "En virage"
        ],
        "correctOptionIndex": 1,
        "explanation": "On d\xE9braye pour changer de rapport et lors de l\u2019arr\xEAt du v\xE9hicule."
      },
      {
        "_id": "q-final-1-10",
        "questionText": "Comment v\xE9rifier le niveau d\u2019huile moteur \xE0 la jauge manuelle ?",
        "options": [
          "Moteur tournant en pente",
          "Moteur froid/arr\xEAt\xE9 sur sol horizontal",
          "\xC0 90 km/h",
          "Ce n\u2019est pas possible"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le contr\xF4le s\u2019effectue moteur coup\xE9 et froid, sur un sol parfaitement plat."
      }
    ]
  },
  {
    "_id": "quiz-mod-2",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 2 \u2014 R\xE8gles g\xE9n\xE9rales de circulation",
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
        "questionText": "En marche normale sur route \xE0 plusieurs voies, o\xF9 devez-vous rouler ?",
        "options": [
          "Au milieu",
          "Sur la voie la plus \xE0 droite",
          "\xC0 gauche",
          "Peu importe"
        ],
        "correctOptionIndex": 1,
        "explanation": "On circule sur la voie de droite, les autres servant aux d\xE9passements."
      },
      {
        "_id": "q-final-2-2",
        "questionText": "Distance lat\xE9rale minimale pour d\xE9passer un v\xE9lo hors agglom\xE9ration ?",
        "options": [
          "0,5 m",
          "1 m",
          "1,5 m",
          "2,5 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors agglom\xE9ration, la vitesse exige un \xE9cart minimal de 1,50 m."
      },
      {
        "_id": "q-final-2-3",
        "questionText": "Une ligne jaune continue le long du trottoir interdit :",
        "options": [
          "Le stationnement seul",
          "L\u2019arr\xEAt et le stationnement",
          "Les v\xE9los",
          "Le d\xE9passement"
        ],
        "correctOptionIndex": 1,
        "explanation": "La ligne continue jaune interdit \xE0 la fois l\u2019arr\xEAt et le stationnement."
      },
      {
        "_id": "q-final-2-4",
        "questionText": "Avant de changer de voie, quelle est la chronologie obligatoire ?",
        "options": [
          "Clignotant puis braquer",
          "R\xE9troviseurs + angle mort, clignotant, puis man\u0153uvre",
          "Freiner puis tourner",
          "Klaxonner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les contr\xF4les visuels complets pr\xE9c\xE8dent toujours le clignotant."
      },
      {
        "_id": "q-final-2-5",
        "questionText": "Peut-on s\u2019arr\xEAter sur la BAU pour passer un appel t\xE9l\xE9phonique ?",
        "options": [
          "Oui avec feux de d\xE9tresse",
          "Non, c\u2019est strictement interdit et tr\xE8s dangereux",
          "Oui si c\u2019est urgent",
          "La nuit oui"
        ],
        "correctOptionIndex": 1,
        "explanation": "Seule une panne grave, un malaise ou accident justifie l\u2019arr\xEAt sur BAU."
      },
      {
        "_id": "q-final-2-6",
        "questionText": "Un pi\xE9ton regarde la chauss\xE9e au bord du passage pi\xE9ton :",
        "options": [
          "Je passe vite",
          "Je ralentis et je m\u2019arr\xEAte pour le laisser traverser",
          "Je klaxonne",
          "Je l\u2019ignore"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le conducteur doit s\u2019arr\xEAter pour laisser traverser le pi\xE9ton."
      },
      {
        "_id": "q-final-2-7",
        "questionText": "Sur voie d\u2019insertion, si aucun espace n\u2019est disponible :",
        "options": [
          "Je force le passage",
          "Je roule sur la BAU",
          "Je ralentis/m\u2019arr\xEAte au d\xE9but en attendant un cr\xE9neau",
          "Je fais demi-tour"
        ],
        "correctOptionIndex": 2,
        "explanation": "Il faut ralentir au d\xE9but de la voie d\u2019insertion pour pouvoir acc\xE9l\xE9rer ensuite."
      },
      {
        "_id": "q-final-2-8",
        "questionText": "Stationner sur un emplacement r\xE9serv\xE9 aux personnes handicap\xE9es sans carte :",
        "options": [
          "Est tol\xE9r\xE9 10 min",
          "Est une infraction passible de 135 \u20AC d\u2019amende et fourri\xE8re",
          "Co\xFBte 11 \u20AC",
          "Est gratuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "Ce stationnement g\xEAnant est puni d\u2019une amende forfaitaire de 135 \u20AC."
      },
      {
        "_id": "q-final-2-9",
        "questionText": "Dans un virage \xE0 droite sans visibilit\xE9, pour bien se positionner, on doit :",
        "options": [
          "Couper \xE0 gauche",
          "Serrer \xE0 droite dans sa voie",
          "Rouler au milieu",
          "Acc\xE9l\xE9rer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Serrer \xE0 droite \xE9largit le champ de vision et prot\xE8ge des v\xE9hicules en face."
      },
      {
        "_id": "q-final-2-10",
        "questionText": "Quel est l\u2019int\xE9r\xEAt du coup d\u2019\u0153il direct dans l\u2019angle mort ?",
        "options": [
          "Regarder les passagers",
          "D\xE9celer un usager masqu\xE9 dans l\u2019angle invisible du r\xE9troviseur",
          "V\xE9rifier la vitre",
          "R\xE9gler le si\xE8ge"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vision directe permet de voir ce que le r\xE9troviseur ne refl\xE8te pas."
      }
    ]
  },
  {
    "_id": "quiz-mod-3",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 3 \u2014 Signalisation routi\xE8re",
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
        "questionText": "\xC0 quelle distance est plac\xE9 un panneau de danger hors agglom\xE9ration ?",
        "options": [
          "50 m",
          "100 m",
          "150 m",
          "200 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors agglom\xE9ration, la distance r\xE9glementaire est de 150 m\xE8tres."
      },
      {
        "_id": "q-final-3-2",
        "questionText": "\xC0 partir de quel point s\u2019applique une interdiction signal\xE9e par un panneau rond rouge ?",
        "options": [
          "\xC0 150 m",
          "D\xE8s la hauteur du panneau",
          "\xC0 la prochaine intersection",
          "Au prochain p\xE9age"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les prescriptions prennent effet imm\xE9diatement \xE0 la hauteur du panneau."
      },
      {
        "_id": "q-final-3-3",
        "questionText": "Quelle signalisation pr\xE9vaut sur les feux tricolores ?",
        "options": [
          "Les panneaux sous les feux",
          "Les injonctions des forces de l\u2019ordre",
          "Le marquage au sol",
          "La priorit\xE9 \xE0 droite"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les agents de police ont l\u2019autorit\xE9 supr\xEAme sur la circulation."
      },
      {
        "_id": "q-final-3-4",
        "questionText": "Que devez-vous faire devant un feu rouge clignotant ?",
        "options": [
          "Passer avec prudence",
          "Arr\xEAt absolu obligatoire",
          "Acc\xE9l\xE9rer",
          "Klaxonner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le feu rouge clignotant impose un arr\xEAt inconditionnel (ex: passage \xE0 niveau)."
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
        "explanation": "La signalisation autorouti\xE8re est exclusivement bleue en France."
      },
      {
        "_id": "q-final-3-6",
        "questionText": "Un panneau de danger \xE0 fond JAUNE indique :",
        "options": [
          "Un danger temporaire (travaux, d\xE9viation)",
          "Un danger permanent",
          "Une zone 30",
          "Une piste cyclable"
        ],
        "correctOptionIndex": 0,
        "explanation": "Le fond jaune signale une situation temporaire de chantier."
      },
      {
        "_id": "q-final-3-7",
        "questionText": "Une fl\xE8che au sol pointant vers la gauche dans votre voie vous oblige \xE0 :",
        "options": [
          "Tourner \xE0 gauche \xE0 l\u2019intersection",
          "Aller tout droit",
          "Faire demi-tour",
          "Vous arr\xEAter"
        ],
        "correctOptionIndex": 0,
        "explanation": "Les fl\xE8ches de s\xE9lection obligent \xE0 suivre la direction indiqu\xE9e."
      },
      {
        "_id": "q-final-3-8",
        "questionText": "Que faire \xE0 un feu orange fixe ?",
        "options": [
          "Acc\xE9l\xE9rer pour passer",
          "S\u2019arr\xEAter sauf risque de choc arri\xE8re av\xE9r\xE9",
          "Klaxonner",
          "Faire demi-tour"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le feu orange impose l\u2019arr\xEAt sauf risque de collision par l\u2019arri\xE8re."
      },
      {
        "_id": "q-final-3-9",
        "questionText": "Un panneau rond bleu avec un v\xE9lo blanc signifie :",
        "options": [
          "Interdit aux v\xE9los",
          "Piste cyclable obligatoire pour les cycles",
          "Parking v\xE9lo",
          "Location de v\xE9los"
        ],
        "correctOptionIndex": 1,
        "explanation": "C\u2019est une obligation impos\xE9e aux cyclistes."
      },
      {
        "_id": "q-final-3-10",
        "questionText": "Une ligne de rive continue \xE0 droite sur autoroute d\xE9limite :",
        "options": [
          "La voie rapide",
          "La bande d\u2019arr\xEAt d\u2019urgence",
          "Un passage pi\xE9ton",
          "Une piste cyclable"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elle s\xE9pare la chauss\xE9e de la bande d\u2019arr\xEAt d\u2019urgence."
      }
    ]
  },
  {
    "_id": "quiz-mod-4",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 4 \u2014 Feux et priorit\xE9s",
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
        "questionText": "En l\u2019absence totale de signalisation \xE0 une intersection, quelle r\xE8gle s\u2019applique ?",
        "options": [
          "Priorit\xE9 \xE0 gauche",
          "Priorit\xE9 \xE0 droite",
          "Priorit\xE9 au plus rapide",
          "Priorit\xE9 aux poids lourds"
        ],
        "correctOptionIndex": 1,
        "explanation": "La priorit\xE9 \xE0 droite s\u2019applique par d\xE9faut \xE0 tout carrefour sans panneau."
      },
      {
        "_id": "q-final-4-2",
        "questionText": "O\xF9 doit s\u2019effectuer l\u2019arr\xEAt obligatoire d\u2019un panneau STOP ?",
        "options": [
          "\xC0 la ligne continue au sol",
          "Au panneau",
          "Au milieu de la chauss\xE9e",
          "5 m\xE8tres avant"
        ],
        "correctOptionIndex": 0,
        "explanation": "L\u2019arr\xEAt doit se faire pr\xE9cis\xE9ment \xE0 la limite de la ligne continue de stop."
      },
      {
        "_id": "q-final-4-3",
        "questionText": "Un v\xE9hicule prioritaire arrive derri\xE8re vous avec sir\xE8ne deux-tons et gyrophare :",
        "options": [
          "Vous acc\xE9l\xE9rez pour le semer",
          "Vous facilitez son passage en serrant \xE0 droite en s\xE9curit\xE9",
          "Vous freinez en urgence au milieu",
          "Vous l\u2019ignorez"
        ],
        "correctOptionIndex": 1,
        "explanation": "On facilite imm\xE9diatement son d\xE9gagement en serrant \xE0 droite."
      },
      {
        "_id": "q-final-4-4",
        "questionText": "Au feu vert, pour tourner \xE0 gauche, vous devez c\xE9der le passage :",
        "options": [
          "Aux voitures derri\xE8re vous",
          "Aux v\xE9hicules arrivant en face et pi\xE9tons traversant",
          "\xC0 personne",
          "Aux avions"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tourner \xE0 gauche coupe l\u2019axe des v\xE9hicules venant d\u2019en face."
      },
      {
        "_id": "q-final-4-5",
        "questionText": "Sur un carrefour \xE0 sens giratoire conventionnel :",
        "options": [
          "Ceux qui entrent sont prioritaires",
          "Les usagers engag\xE9s sur l\u2019anneau sont prioritaires",
          "Priorit\xE9 \xE0 droite",
          "Priorit\xE9 aux deux-roues"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les panneaux C\xE9dez le passage donnent la priorit\xE9 aux usagers de l\u2019anneau."
      },
      {
        "_id": "q-final-4-6",
        "questionText": "Que faire face \xE0 un feu jaune clignotant en bas \xE0 la place du vert ?",
        "options": [
          "Arr\xEAt absolu",
          "Passer avec prudence en respectant la signalisation de priorit\xE9",
          "Faire demi-tour",
          "Acc\xE9l\xE9rer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le jaune clignotant appelle \xE0 la prudence et confirme la priorit\xE9 de passage."
      },
      {
        "_id": "q-final-4-7",
        "questionText": "Combien de points retire le non-respect d\u2019un panneau Stop ou feu rouge ?",
        "options": [
          "2 points",
          "3 points",
          "4 points",
          "6 points"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le refus de priorit\xE9 \xE0 un feu rouge ou Stop retire 4 points."
      },
      {
        "_id": "q-final-4-8",
        "questionText": "Un v\xE9hicule d\xE9bouchant d\u2019un parking de supermarch\xE9 :",
        "options": [
          "A la priorit\xE9 \xE0 droite",
          "Doit c\xE9der le passage \xE0 tous les usagers de la voie publique",
          "Est prioritaire s\u2019il a son clignotant",
          "Passe en premier"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les sorties de parkings et lieux priv\xE9s n\u2019ont jamais la priorit\xE9."
      },
      {
        "_id": "q-final-4-9",
        "questionText": "Face \xE0 un tramway arrivant \xE0 un croisement :",
        "options": [
          "Vous passez s\u2019il est \xE0 gauche",
          "Le tramway a la priorit\xE9 absolue",
          "Vous le doublez",
          "Il doit vous c\xE9der le passage"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le tramway est toujours prioritaire."
      },
      {
        "_id": "q-final-4-10",
        "questionText": "Si une intersection est encombr\xE9e alors que votre feu est vert :",
        "options": [
          "Vous avancez pour forcer le passage",
          "Vous vous arr\xEAtez avant l\u2019intersection pour ne pas la bloquer",
          "Vous klaxonnez",
          "Vous faites marche arri\xE8re"
        ],
        "correctOptionIndex": 1,
        "explanation": "On ne s\u2019engage dans un carrefour que si la sortie est totalement d\xE9gag\xE9e."
      }
    ]
  },
  {
    "_id": "quiz-mod-5",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 5 \u2014 Intersections et carrefours",
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
        "questionText": "Pour emprunter la premi\xE8re sortie \xE0 droite dans un rond-point :",
        "options": [
          "On reste au milieu",
          "On allume le clignotant droit d\xE8s l\u2019entr\xE9e et on serre \xE0 droite",
          "On met le clignotant gauche",
          "On ne met rien"
        ],
        "correctOptionIndex": 1,
        "explanation": "Pour sortir \xE0 droite, le clignotant droit est activ\xE9 avant l\u2019entr\xE9e dans le giratoire."
      },
      {
        "_id": "q-final-5-2",
        "questionText": "Si la sonnerie retentit \xE0 un passage \xE0 niveau mais que les barri\xE8res sont encore lev\xE9es :",
        "options": [
          "J\u2019acc\xE9l\xE8re pour passer",
          "L\u2019arr\xEAt absolu est obligatoire",
          "Je passe si la voie est libre",
          "Je klaxonne"
        ],
        "correctOptionIndex": 1,
        "explanation": "La sonnerie annonce la fermeture imminente : interdiction formelle de s\u2019engager."
      },
      {
        "_id": "q-final-5-3",
        "questionText": "Dans un carrefour complexe avec feux fl\xE9ch\xE9s, la fl\xE8che verte vers la gauche signifie :",
        "options": [
          "Je tourne \xE0 gauche en coupant un trafic prioritaire en face",
          "La voie d\u2019en face est au rouge, le tourne-\xE0-gauche est prot\xE9g\xE9",
          "Le feu est en panne",
          "Seuls les v\xE9los peuvent tourner"
        ],
        "correctOptionIndex": 1,
        "explanation": "Une fl\xE8che verte directionnelle garantit une travers\xE9e prot\xE9g\xE9e."
      },
      {
        "_id": "q-final-5-4",
        "questionText": "Si vous \xEAtes engag\xE9 sur un giratoire et qu\u2019une voiture veut entrer :",
        "options": [
          "Elle a la priorit\xE9",
          "Vous avez la priorit\xE9 de circulation sur l\u2019anneau",
          "Vous devez piler",
          "Elle passe en premier"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les v\xE9hicules sur l\u2019anneau sont prioritaires sur ceux qui entrent."
      },
      {
        "_id": "q-final-5-5",
        "questionText": "Que faire en cas de panne m\xE9canique immobilisant la voiture sur une voie ferr\xE9e ?",
        "options": [
          "Pousser la voiture seul sans sortir les passagers",
          "Faire \xE9vacuer imm\xE9diatement les passagers et utiliser la borne d\u2019urgence",
          "Attendre le train",
          "T\xE9l\xE9phoner \xE0 un ami"
        ],
        "correctOptionIndex": 1,
        "explanation": "La priorit\xE9 absolue est l\u2019\xE9vacuation des occupants et l\u2019alerte imm\xE9diate."
      },
      {
        "_id": "q-final-5-6",
        "questionText": "Dans un croisement \xE0 l\u2019indon\xE9sienne, les voitures tournant \xE0 gauche se croisent :",
        "options": [
          "L\u2019une derri\xE8re l\u2019autre",
          "L\u2019une devant l\u2019autre face \xE0 face",
          "Par la droite",
          "En marche arri\xE8re"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elles passent l\u2019une devant l\u2019autre sans faire le tour du centre."
      },
      {
        "_id": "q-final-5-7",
        "questionText": "\xC0 quelle distance minimale d\u2019un passage \xE0 niveau sans barri\xE8re doit-on s\u2019arr\xEAter ?",
        "options": [
          "\xC0 1 m\xE8tre",
          "\xC0 la ligne Stop ou au moins 5 m\xE8tres du premier rail",
          "Sur les rails",
          "\xC0 100 m\xE8tres"
        ],
        "correctOptionIndex": 1,
        "explanation": "On doit respecter une distance de s\xE9curit\xE9 d\u2019au moins 5 m\xE8tres des rails."
      },
      {
        "_id": "q-final-5-8",
        "questionText": "L\u2019angle mort droit lors de la sortie d\u2019un giratoire permet de d\xE9tecter :",
        "options": [
          "Un oiseau",
          "Un cycliste ou scooter circulant sur le bord droit de l\u2019anneau",
          "Le panneau de sortie",
          "Le passager"
        ],
        "correctOptionIndex": 1,
        "explanation": "Un deux-roues peut se trouver le long de votre flanc droit lors de la sortie."
      },
      {
        "_id": "q-final-5-9",
        "questionText": "Un miroir de carrefour donne-t-il la priorit\xE9 ?",
        "options": [
          "Oui toujours",
          "Non, c\u2019est une aide visuelle sans modification des priorit\xE9s",
          "Oui aux heures de pointe",
          "Uniquement aux camions"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le miroir ne conf\xE8re aucune priorit\xE9 l\xE9gale."
      },
      {
        "_id": "q-final-5-10",
        "questionText": "La communication par le regard avec un pi\xE9ton \xE0 une intersection permet de :",
        "options": [
          "Le forcer \xE0 courir",
          "Confirmer qu\u2019il est vu et qu\u2019il peut traverser en toute s\xE9curit\xE9",
          "Lui faire peur",
          "Le saluer"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le contact visuel garantit une compr\xE9hension mutuelle s\xE9curisante."
      }
    ]
  },
  {
    "_id": "quiz-mod-6",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 6 \u2014 Vitesse, freinage et distances",
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
        "questionText": "Quelle est la limitation de vitesse sur autoroute par temps de pluie (permis confirm\xE9) ?",
        "options": [
          "130 km/h",
          "110 km/h",
          "100 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Par pluie, la vitesse sur autoroute passe de 130 \xE0 110 km/h."
      },
      {
        "_id": "q-final-6-2",
        "questionText": "\xC0 90 km/h sur sol sec, quelle est la distance parcourue pendant 1 seconde de r\xE9action ?",
        "options": [
          "15 m",
          "27 m",
          "45 m",
          "81 m"
        ],
        "correctOptionIndex": 1,
        "explanation": "Formule : 9 x 3 = 27 m\xE8tres."
      },
      {
        "_id": "q-final-6-3",
        "questionText": "\xC0 90 km/h sur sol sec, quelle est l\u2019estimation de la distance totale d\u2019arr\xEAt ?",
        "options": [
          "27 m",
          "54 m",
          "81 m",
          "100 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Formule : 9 x 9 = 81 m\xE8tres."
      },
      {
        "_id": "q-final-6-4",
        "questionText": "Sur sol mouill\xE9, par combien est multipli\xE9e la distance de freinage ?",
        "options": [
          "Par 1,2",
          "Par 2",
          "Par 4",
          "Par 10"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019adh\xE9rence divis\xE9e par 2 double la distance n\xE9cessaire pour freiner."
      },
      {
        "_id": "q-final-6-5",
        "questionText": "Combien de temps correspond au minimum l\xE9gal de s\xE9curit\xE9 entre deux v\xE9hicules qui se suivent ?",
        "options": [
          "1 seconde",
          "2 secondes",
          "3 secondes",
          "5 secondes"
        ],
        "correctOptionIndex": 1,
        "explanation": "La r\xE8gle r\xE9glementaire minimale est de 2 secondes."
      },
      {
        "_id": "q-final-6-6",
        "questionText": "Sur autoroute, pour respecter la distance de s\xE9curit\xE9, on doit laisser visible entre soi et le pr\xE9c\xE9dent :",
        "options": [
          "1 ligne blanche de BAU",
          "2 traits de bande d\u2019arr\xEAt d\u2019urgence",
          "10 m\xE8tres",
          "La plaque d\u2019immatriculation"
        ],
        "correctOptionIndex": 1,
        "explanation": "\xAB Deux traits = s\xE9curit\xE9 \xBB est le rep\xE8re officiel autoroutier."
      },
      {
        "_id": "q-final-6-7",
        "questionText": "Si la vitesse est multipli\xE9e par 3, l\u2019\xE9nergie cin\xE9tique est multipli\xE9e par :",
        "options": [
          "3",
          "6",
          "9",
          "12"
        ],
        "correctOptionIndex": 2,
        "explanation": "L\u2019\xE9nergie cin\xE9tique d\xE9pend du carr\xE9 de la vitesse : 3\xB2 = 9."
      },
      {
        "_id": "q-final-6-8",
        "questionText": "En cas de brouillard r\xE9duisant la visibilit\xE9 \xE0 moins de 50 m, la vitesse max est de :",
        "options": [
          "30 km/h",
          "50 km/h",
          "70 km/h",
          "80 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La limite l\xE9gale est de 50 km/h sur toutes les routes et autoroutes."
      },
      {
        "_id": "q-final-6-9",
        "questionText": "Quelle sanction encourt le non-respect des distances de s\xE9curit\xE9 ?",
        "options": [
          "135 \u20AC et retrait de 3 points",
          "68 \u20AC sans retrait de point",
          "Prison ferme",
          "Suspension de 5 ans"
        ],
        "correctOptionIndex": 0,
        "explanation": "C\u2019est une contravention de 4\xE8me classe avec retrait de 3 points."
      },
      {
        "_id": "q-final-6-10",
        "questionText": "Pour un conducteur novice (permis probatoire), la vitesse sur route \xE0 80 km/h est de :",
        "options": [
          "60 km/h",
          "70 km/h",
          "80 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 2,
        "explanation": "Sur les routes \xE0 double sens limit\xE9es \xE0 80 km/h, la vitesse reste 80 km/h pour les jeunes conducteurs."
      }
    ]
  },
  {
    "_id": "quiz-mod-7",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 7 \u2014 Croisement et d\xE9passement",
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
        "questionText": "Quelle est la distance minimale pour d\xE9passer un cycliste hors agglom\xE9ration ?",
        "options": [
          "0,5 m",
          "1,0 m",
          "1,50 m",
          "2,5 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Hors ville, l\u2019\xE9cart de s\xE9curit\xE9 obligatoire est de 1,50 m\xE8tre."
      },
      {
        "_id": "q-final-7-2",
        "questionText": "Sur une route en forte pente, qui doit reculer si deux voitures ne peuvent pas croiser ?",
        "options": [
          "Le v\xE9hicule qui monte",
          "Le v\xE9hicule qui descend",
          "Le plus rapide",
          "Le plus r\xE9cent"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le v\xE9hicule descendant doit s\u2019arr\xEAter et reculer."
      },
      {
        "_id": "q-final-7-3",
        "questionText": "Est-il autoris\xE9 de d\xE9passer par la droite sur autoroute ?",
        "options": [
          "Oui si la voie de droite est libre",
          "Non, c\u2019est strictement interdit (3 points en moins)",
          "Oui si la voiture roule \xE0 100 km/h",
          "Oui le week-end"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tout d\xE9passement doit obligatoirement s\u2019effectuer par la gauche."
      },
      {
        "_id": "q-final-7-4",
        "questionText": "Peut-on chevaucher une ligne continue pour d\xE9passer un v\xE9lo avec bonne visibilit\xE9 ?",
        "options": [
          "Non jamais",
          "Oui, le chevauchement de ligne est l\xE9galement autoris\xE9 pour d\xE9passer un cycliste",
          "Uniquement en ville",
          "Uniquement pour les tracteurs"
        ],
        "correctOptionIndex": 1,
        "explanation": "La loi autorise le chevauchement de ligne continue pour prot\xE9ger les cyclistes."
      },
      {
        "_id": "q-final-7-5",
        "questionText": "Quand un usager vous d\xE9passe, vous devez :",
        "options": [
          "Acc\xE9l\xE9rer",
          "Maintenir votre vitesse et serrer \xE0 droite",
          "Mettre vos feux de d\xE9tresse",
          "Freiner brusquement"
        ],
        "correctOptionIndex": 1,
        "explanation": "Il est interdit d\u2019acc\xE9l\xE9rer quand on est d\xE9pass\xE9."
      },
      {
        "_id": "q-final-7-6",
        "questionText": "Quand peut-on se rabattre en toute s\xE9curit\xE9 apr\xE8s un d\xE9passement ?",
        "options": [
          "D\xE8s qu\u2019on a pass\xE9 le pare-choc",
          "D\xE8s que le v\xE9hicule d\xE9pass\xE9 appara\xEEt en entier dans le r\xE9troviseur int\xE9rieur",
          "Apr\xE8s 2 km",
          "Quand on veut"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vision de la face avant compl\xE8te dans le r\xE9troviseur central assure un intervalle suffisant."
      },
      {
        "_id": "q-final-7-7",
        "questionText": "Peut-on d\xE9passer un chasse-neige qui sale ou d\xE9neige la chauss\xE9e ?",
        "options": [
          "Oui par la gauche",
          "Non, c\u2019est strictement interdit par le code de la route",
          "Oui avec le clignotant",
          "Oui s\u2019il roule \xE0 30 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le d\xE9passement des engins de service hivernal en intervention est prohib\xE9."
      },
      {
        "_id": "q-final-7-8",
        "questionText": "\xC0 l\u2019approche d\u2019un sommet de c\xF4te sur route \xE0 2 voies \xE0 double sens :",
        "options": [
          "Le d\xE9passement est interdit",
          "Le d\xE9passement est autoris\xE9 \xE0 80 km/h",
          "On peut doubler les camions",
          "On acc\xE9l\xE8re"
        ],
        "correctOptionIndex": 0,
        "explanation": "L\u2019absence de visibilit\xE9 frontale interdit tout d\xE9passement."
      },
      {
        "_id": "q-final-7-9",
        "questionText": "Quel diff\xE9rentiel de vitesse est recommand\xE9 pour doubler un v\xE9hicule sans tra\xEEner ?",
        "options": [
          "2 km/h",
          "Au moins 20 km/h sans franchir la vitesse limite",
          "60 km/h",
          "Aucun"
        ],
        "correctOptionIndex": 1,
        "explanation": "Une r\xE9serve d\u2019environ 20 km/h garantit une man\u0153uvre br\xE8ve et s\xFBre."
      },
      {
        "_id": "q-final-7-10",
        "questionText": "Le franchissement d\u2019une ligne continue pour un d\xE9passement non autoris\xE9 co\xFBte :",
        "options": [
          "1 point",
          "2 points",
          "3 points et 135 \u20AC d\u2019amende",
          "6 points"
        ],
        "correctOptionIndex": 2,
        "explanation": "Franchir une ligne continue entra\xEEne la perte de 3 points."
      }
    ]
  },
  {
    "_id": "quiz-mod-8",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 8 \u2014 Autoroutes et voies rapides",
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
          "La voie la plus \xE0 droite",
          "Peu importe"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le code impose de circuler sur la voie de droite."
      },
      {
        "_id": "q-final-8-2",
        "questionText": "\xC0 130 km/h sur autoroute, la distance de s\xE9curit\xE9 minimale est de :",
        "options": [
          "30 m",
          "50 m",
          "78 m (2 traits de BAU)",
          "150 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Deux traits de bande d\u2019arr\xEAt d\u2019urgence repr\xE9sentent l\u2019intervalle de s\xE9curit\xE9 l\xE9gal."
      },
      {
        "_id": "q-final-8-3",
        "questionText": "En cas de panne sur autoroute, la premi\xE8re chose \xE0 faire avant de sortir est :",
        "options": [
          "Poser le triangle",
          "Allumer les feux de d\xE9tresse et enfiler son gilet r\xE9tro-r\xE9fl\xE9chissant",
          "T\xE9l\xE9phoner",
          "Ouvrir le capot"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le gilet doit \xEAtre enfil\xE9 \xE0 l\u2019int\xE9rieur avant de poser le pied dehors."
      },
      {
        "_id": "q-final-8-4",
        "questionText": "O\xF9 les passagers doivent-ils attendre les secours sur autoroute ?",
        "options": [
          "Dans la voiture",
          "Sur la bande d\u2019arr\xEAt d\u2019urgence",
          "Derri\xE8re la glissi\xE8re de s\xE9curit\xE9",
          "Sur le toit"
        ],
        "correctOptionIndex": 2,
        "explanation": "Tout le monde doit se tenir \xE0 l\u2019abri derri\xE8re la glissi\xE8re m\xE9tallique."
      },
      {
        "_id": "q-final-8-5",
        "questionText": "O\xF9 commence-t-on \xE0 ralentir pour quitter une autoroute ?",
        "options": [
          "Sur la voie de droite de l\u2019autoroute",
          "D\xE8s le d\xE9but de la voie de d\xE9c\xE9l\xE9ration",
          "Au milieu de l\u2019autoroute",
          "Dans le virage de sortie"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le freinage s\u2019effectue exclusivement sur la voie de d\xE9c\xE9l\xE9ration."
      },
      {
        "_id": "q-final-8-6",
        "questionText": "Sur autoroute, faire marche arri\xE8re pour rattraper une sortie rat\xE9e est puni de :",
        "options": [
          "Rien du tout",
          "Amende, retrait de 4 points et suspension de permis",
          "1 point en moins",
          "10 \u20AC"
        ],
        "correctOptionIndex": 1,
        "explanation": "La man\u0153uvre en marche arri\xE8re sur autoroute est passible de 4 points et suspension."
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
        "questionText": "Le triangle de pr\xE9signalisation doit-il obligatoirement \xEAtre pos\xE9 sur autoroute ?",
        "options": [
          "Oui toujours \xE0 100 m",
          "Non, si la man\u0153uvre constitue un danger pour la vie du conducteur",
          "Oui au milieu des voies",
          "Oui sur la voie de gauche"
        ],
        "correctOptionIndex": 1,
        "explanation": "Sur autoroute, la s\xE9curit\xE9 prime : le triangle est facultatif s\u2019il y a danger."
      },
      {
        "_id": "q-final-8-9",
        "questionText": "Quel moyen privil\xE9gier pour appeler les secours d\u2019autoroute ?",
        "options": [
          "Les bornes d\u2019appel d\u2019urgence orange (tous les 2 km)",
          "Faire des signes avec les bras",
          "Klaxonner",
          "Courir vers le p\xE9age"
        ],
        "correctOptionIndex": 0,
        "explanation": "La borne d\u2019urgence g\xE9olocalise imm\xE9diatement l\u2019appel."
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
        "explanation": "Les permis probatoires sont plafonn\xE9s \xE0 110 km/h sur autoroute."
      }
    ]
  },
  {
    "_id": "quiz-mod-9",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 9 \u2014 Conduite de nuit et m\xE9t\xE9o difficile",
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
          "Feux de brouillard arri\xE8re",
          "Feux de route"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les feux de croisement sont obligatoires d\xE8s l\u2019apparition de la pluie."
      },
      {
        "_id": "q-final-9-2",
        "questionText": "L\u2019utilisation des feux de brouillard arri\xE8re est STRICTEMENT INTERDITE :",
        "options": [
          "Par temps de neige",
          "Par temps de pluie (car ils \xE9blouissent les usagers derri\xE8re)",
          "Par temps de brouillard",
          "La nuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019eau pulv\xE9ris\xE9e r\xE9fl\xE9chit la lumi\xE8re intense des antibrouillards arri\xE8re et \xE9blouit."
      },
      {
        "_id": "q-final-9-3",
        "questionText": "\xC0 quelle distance minimale doivent \xE9clairer les feux de route (pleins phares) ?",
        "options": [
          "30 m",
          "50 m",
          "100 m",
          "200 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Les feux de route doivent projeter leur faisceau \xE0 au moins 100 m\xE8tres."
      },
      {
        "_id": "q-final-9-4",
        "questionText": "En pr\xE9sence d\u2019une nappe de brouillard dense avec visibilit\xE9 sous 50 m, la vitesse max est de :",
        "options": [
          "30 km/h",
          "50 km/h partout",
          "70 km/h",
          "80 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La limite absolue est de 50 km/h sur l\u2019ensemble du r\xE9seau routier."
      },
      {
        "_id": "q-final-9-5",
        "questionText": "Pour limiter le risque d\u2019aquaplaning sous forte pluie, on doit :",
        "options": [
          "Gonfler les pneus \xE0 5 bars",
          "R\xE9duire sa vitesse et s\u2019assurer que les pneus ont des sculptures d\u2019au moins 1,6 mm",
          "Freiner en continu",
          "Acc\xE9l\xE9rer"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse mod\xE9r\xE9e et de bonnes rainures \xE9vacuent l\u2019eau sous le pneu."
      },
      {
        "_id": "q-final-9-6",
        "questionText": "Que faire imm\xE9diatement si le v\xE9hicule part en aquaplaning ?",
        "options": [
          "Piler sur le frein",
          "Garder les roues droites et d\xE9c\xE9l\xE9rer sans geste brusque",
          "Tirer le frein \xE0 main",
          "Braquer d\u2019un coup"
        ],
        "correctOptionIndex": 1,
        "explanation": "On soulage l\u2019acc\xE9l\xE9rateur en douceur pour reprendre contact avec le sol."
      },
      {
        "_id": "q-final-9-7",
        "questionText": "Le panneau B26 (pneu avec cha\xEEnes) rend obligatoire :",
        "options": [
          "Les pneus neufs",
          "Le montage de cha\xEEnes sur au moins deux roues motrices",
          "L\u2019arr\xEAt du v\xE9hicule",
          "La marche arri\xE8re"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les cha\xEEnes ou dispositifs antid\xE9rapants deviennent obligatoires."
      },
      {
        "_id": "q-final-9-8",
        "questionText": "Pourquoi les feux de route sont-ils inefficaces et dangereux dans le brouillard ?",
        "options": [
          "Ils n\u2019\xE9clairent rien",
          "Ils cr\xE9ent un mur blanc \xE9blouissant par r\xE9verb\xE9ration sur les gouttelettes",
          "Ils chauffent",
          "Ils \xE9teignent le moteur"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le faisceau haut se r\xE9fl\xE9chit sur les micro-gouttes d\u2019eau."
      },
      {
        "_id": "q-final-9-9",
        "questionText": "Face \xE0 un fort vent lat\xE9ral en doublant un camion :",
        "options": [
          "On acc\xE9l\xE8re",
          "On s\u2019attend \xE0 une d\xE9viation lors du d\xE9passement et \xE0 une rafale \xE0 la sortie du camion",
          "On klaxonne",
          "On freine fort"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le camion fait \xE9cran puis le vent r\xE9appara\xEEt brutalement au niveau de la cabine."
      },
      {
        "_id": "q-final-9-10",
        "questionText": "La nuit en croisant un v\xE9hicule, quel rep\xE8re regarder pour ne pas \xEAtre \xE9bloui ?",
        "options": [
          "Le ciel",
          "La ligne blanche continue ou le bord droit de la chauss\xE9e",
          "Les phares d\u2019en face",
          "Le tableau de bord"
        ],
        "correctOptionIndex": 1,
        "explanation": "Guider son regard le long de la ligne de rive droite prot\xE8ge la r\xE9tine."
      }
    ]
  },
  {
    "_id": "quiz-mod-10",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 10 \u2014 Alcool, drogues, fatigue et capacit\xE9s",
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
        "questionText": "Quel est le taux d\u2019alcool\xE9mie maximal l\xE9gal pour un conducteur en p\xE9riode probatoire ?",
        "options": [
          "0,0 g/l",
          "0,2 g/l de sang (tol\xE9rance z\xE9ro)",
          "0,5 g/l",
          "0,8 g/l"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le seuil probatoire est fix\xE9 \xE0 0,2 g/l de sang."
      },
      {
        "_id": "q-final-10-2",
        "questionText": "\xC0 partir de quel taux d\u2019alcool l\u2019infraction devient-elle un d\xE9lit p\xE9nal ?",
        "options": [
          "0,2 g/l",
          "0,5 g/l",
          "0,8 g/l de sang",
          "1,2 g/l"
        ],
        "correctOptionIndex": 2,
        "explanation": "D\xE8s 0,8 g/l de sang, le tribunal correctionnel peut prononcer jusqu\u2019\xE0 2 ans de prison."
      },
      {
        "_id": "q-final-10-3",
        "questionText": "Un pictogramme triangulaire ROUGE (Niveau 3) sur une bo\xEEte de m\xE9dicament signifie :",
        "options": [
          "Conduite prudente",
          "Attention pour les camions",
          "Conduite formellement d\xE9conseill\xE9e / interdite",
          "Aucun effet"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le niveau 3 interdit la conduite pendant le traitement."
      },
      {
        "_id": "q-final-10-4",
        "questionText": "Quel est le temps moyen d\u2019\xE9limination d\u2019un verre d\u2019alcool par le foie ?",
        "options": [
          "10 min",
          "1h \xE0 2h par verre",
          "5h",
          "24h"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le foie \xE9limine environ 0,10 \xE0 0,15 g/l par heure."
      },
      {
        "_id": "q-final-10-5",
        "questionText": "Le port d\u2019oreillettes ou \xE9couteurs au volant est sanctionn\xE9 par :",
        "options": [
          "Rien",
          "135 \u20AC d\u2019amende et retrait de 3 points",
          "10 \u20AC",
          "1 point"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tout \xE9couteur dans l\u2019oreille est strictement interdit."
      },
      {
        "_id": "q-final-10-6",
        "questionText": "Tous les combien de temps doit-on marquer une pause sur long trajet ?",
        "options": [
          "Toutes les 2 heures au moins",
          "Toutes les 4 heures",
          "Toutes les 6 heures",
          "\xC0 l\u2019arriv\xE9e"
        ],
        "correctOptionIndex": 0,
        "explanation": "Une pause de 15 \xE0 20 minutes s\u2019impose toutes les 2 heures."
      },
      {
        "_id": "q-final-10-7",
        "questionText": "Quel est l\u2019unique moyen de r\xE9cup\xE9rer de la vigilance en cas de somnolence aigu\xEB ?",
        "options": [
          "Caf\xE9 fort",
          "Ouvrir la vitre",
          "Une courte sieste de 15 \xE0 20 minutes",
          "Chanter"
        ],
        "correctOptionIndex": 2,
        "explanation": "Seul le sommeil r\xE9pare l\u2019\xE9puisement c\xE9r\xE9bral."
      },
      {
        "_id": "q-final-10-8",
        "questionText": "Conduire sous l\u2019emprise de stup\xE9fiants (cannabis, etc.) entra\xEEne :",
        "options": [
          "Un simple avertissement",
          "Un d\xE9lit avec retrait de 6 points, r\xE9tention de permis et peines de prison",
          "Une amende de 11 \u20AC",
          "Rien sans accident"
        ],
        "correctOptionIndex": 1,
        "explanation": "La tol\xE9rance z\xE9ro stup\xE9fiants est sanctionn\xE9e par un d\xE9lit lourd."
      },
      {
        "_id": "q-final-10-9",
        "questionText": "Lire un message sur son smartphone en conduisant multiplie le risque d\u2019accident par :",
        "options": [
          "2",
          "5",
          "10",
          "23"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le risque d\u2019accident est multipli\xE9 par 23 lors de la lecture d\u2019un SMS."
      },
      {
        "_id": "q-final-10-10",
        "questionText": "Le champ visuel d\u2019un conducteur alcoolis\xE9 :",
        "options": [
          "S\u2019\xE9largit",
          "Se r\xE9tr\xE9cit de fa\xE7on notable",
          "Reste identique",
          "Devient multicolore"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019alcool r\xE9duit consid\xE9rablement la vision p\xE9riph\xE9rique."
      }
    ]
  },
  {
    "_id": "quiz-mod-11",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 11 \u2014 Usagers vuln\xE9rables",
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
        "questionText": "Quel est le retrait de points pour un refus de priorit\xE9 \xE0 un pi\xE9ton sur un passage clout\xE9 ?",
        "options": [
          "2 points",
          "3 points",
          "4 points",
          "6 points et suspension possible"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le refus de priorit\xE9 pi\xE9ton est sanctionn\xE9 par un retrait maximal de 6 points."
      },
      {
        "_id": "q-final-11-2",
        "questionText": "Quelle est la vitesse maximale autoris\xE9e dans une \xAB Zone de rencontre \xBB ?",
        "options": [
          "10 km/h",
          "20 km/h (priorit\xE9 aux pi\xE9tons)",
          "30 km/h",
          "50 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse est limit\xE9e \xE0 20 km/h avec priorit\xE9 absolue aux pi\xE9tons."
      },
      {
        "_id": "q-final-11-3",
        "questionText": "Quelle est la distance minimale pour d\xE9passer un cycliste en ville ?",
        "options": [
          "0,5 m",
          "1 m\xE8tre",
          "1,50 m\xE8tre",
          "2 m\xE8tres"
        ],
        "correctOptionIndex": 1,
        "explanation": "En agglom\xE9ration, l\u2019\xE9cart minimal de d\xE9passement est de 1 m\xE8tre."
      },
      {
        "_id": "q-final-11-4",
        "questionText": "\xC0 quoi sert la technique d\u2019ouverture de porti\xE8re \xE0 la hollandaise (avec la main oppos\xE9e) ?",
        "options": [
          "\xC0 ne pas salir la poign\xE9e",
          "\xC0 faire pivoter le haut du corps pour v\xE9rifier l\u2019angle mort et \xE9viter d\u2019emporter un cycliste",
          "\xC0 fermer plus vite",
          "\xC0 faire du sport"
        ],
        "correctOptionIndex": 1,
        "explanation": "Cette man\u0153uvre \xE9vite les accidents de porti\xE8re avec les cyclistes."
      },
      {
        "_id": "q-final-11-5",
        "questionText": "Un pi\xE9ton tenant une canne blanche dress\xE9e ou lev\xE9e :",
        "options": [
          "Doit attendre votre passage",
          "A la priorit\xE9 absolue en toute circonstance",
          "Est un policier",
          "Ne doit pas traverser"
        ],
        "correctOptionIndex": 1,
        "explanation": "La canne blanche signale une personne non-voyante prioritaire."
      },
      {
        "_id": "q-final-11-6",
        "questionText": "En cas d\u2019accident corporel avec un motard au sol, doit-on lui enlever son casque ?",
        "options": [
          "Oui imm\xE9diatement",
          "Non, jamais (sauf arr\xEAt respiratoire par secouriste form\xE9)",
          "Oui pour lui parler",
          "Oui pour le rafra\xEEchir"
        ],
        "correctOptionIndex": 1,
        "explanation": "Retirer le casque peut aggraver un traumatisme cervical fatal."
      },
      {
        "_id": "q-final-11-7",
        "questionText": "Quelle est la probabilit\xE9 de survie d\u2019un pi\xE9ton percut\xE9 \xE0 30 km/h ?",
        "options": [
          "Environ 20%",
          "Environ 50%",
          "Environ 90%",
          "0%"
        ],
        "correctOptionIndex": 2,
        "explanation": "\xC0 30 km/h, 9 pi\xE9tons sur 10 survivent \xE0 l\u2019impact."
      },
      {
        "_id": "q-final-11-8",
        "questionText": "O\xF9 les voitures doivent-elles s\u2019arr\xEAter \xE0 un feu tricolore pr\xE9c\xE9d\xE9 d\u2019un sas v\xE9lo ?",
        "options": [
          "Sur le sas v\xE9lo",
          "Avant la premi\xE8re ligne d\u2019arr\xEAt du sas v\xE9lo",
          "Au feu",
          "Sur le passage pi\xE9ton"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le sas v\xE9lo doit \xEAtre laiss\xE9 libre pour les cyclistes."
      },
      {
        "_id": "q-final-11-9",
        "questionText": "Un ballon roule sur la route devant vous, que devez-vous anticiper ?",
        "options": [
          "Le vent",
          "L\u2019irruption imm\xE9diate d\u2019un enfant qui court apr\xE8s son ballon",
          "Rien",
          "Un chien"
        ],
        "correctOptionIndex": 1,
        "explanation": "Un enfant suit presque toujours son ballon sur la chauss\xE9e."
      },
      {
        "_id": "q-final-11-10",
        "questionText": "En zone 30, les rues \xE0 sens unique pour les voitures sont g\xE9n\xE9ralement :",
        "options": [
          "Interdites aux v\xE9los",
          "\xC0 double sens de circulation pour les cyclistes (double sens cyclable)",
          "R\xE9serv\xE9es aux camions",
          "Ferm\xE9es la nuit"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les double-sens cyclables sont la r\xE8gle par d\xE9faut en zone 30."
      }
    ]
  },
  {
    "_id": "quiz-mod-12",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 12 \u2014 Premiers secours et accident",
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
        "questionText": "Que signifie l\u2019acronyme vital PAS lors d\u2019un accident ?",
        "options": [
          "Partir, Appeler, Soigner",
          "Prot\xE9ger, Alerter, Secourir",
          "Pousser, Aider, Stopper",
          "Pr\xE9venir, Attendre, Sauver"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019ordre officiel d\u2019intervention est Prot\xE9ger, Alerter, Secourir."
      },
      {
        "_id": "q-final-12-2",
        "questionText": "Quel est le num\xE9ro d\u2019urgence europ\xE9en unique gratuit ?",
        "options": [
          "15",
          "17",
          "18",
          "112"
        ],
        "correctOptionIndex": 3,
        "explanation": "Le 112 fonctionne dans toute l\u2019Union europ\xE9enne."
      },
      {
        "_id": "q-final-12-3",
        "questionText": "Dans quel cas exceptionnel peut-on d\xE9placer un bless\xE9 de la route ?",
        "options": [
          "S\u2019il a froid",
          "Uniquement en pr\xE9sence d\u2019un DANGER IMM\xC9DIAT ET NON CONTR\xD4LABLE (incendie, noyade)",
          "Pour le mettre dans son lit",
          "Pour lib\xE9rer la route"
        ],
        "correctOptionIndex": 1,
        "explanation": "Seul un p\xE9ril mortel imminent justifie un d\xE9gagement d\u2019urgence."
      },
      {
        "_id": "q-final-12-4",
        "questionText": "Si une victime inconsciente respire normalement, on la place en :",
        "options": [
          "Position assise",
          "Position Lat\xE9rale de S\xE9curit\xE9 (PLS)",
          "Position debout",
          "Sur le dos les bras crois\xE9s"
        ],
        "correctOptionIndex": 1,
        "explanation": "La PLS maintient les voies respiratoires d\xE9gag\xE9es."
      },
      {
        "_id": "q-final-12-5",
        "questionText": "Le fait de ne pas s\u2019arr\xEAter apr\xE8s un accident que l\u2019on a caus\xE9 ou subi est qualifi\xE9 de :",
        "options": [
          "D\xE9lit de fuite (3 ans de prison, 75000 \u20AC d\u2019amende et 6 points)",
          "Refus d\u2019obtemp\xE9rer",
          "Simple erreur de parcours",
          "Infraction mineure"
        ],
        "correctOptionIndex": 0,
        "explanation": "C\u2019est un d\xE9lit de fuite s\xE9v\xE8rement puni par la justice."
      },
      {
        "_id": "q-final-12-6",
        "questionText": "Quel num\xE9ro joindre pour une urgence m\xE9dicale vitale directe (SAMU) ?",
        "options": [
          "15",
          "17",
          "18",
          "114"
        ],
        "correctOptionIndex": 0,
        "explanation": "Le 15 est le num\xE9ro direct du SAMU en France."
      },
      {
        "_id": "q-final-12-7",
        "questionText": "Combien de compressions thoraciques effectue-t-on avant 2 insufflations lors d\u2019un massage cardiaque ?",
        "options": [
          "10",
          "15",
          "30 compressions",
          "50"
        ],
        "correctOptionIndex": 2,
        "explanation": "Le rythme officiel de r\xE9animation est de 30 compressions pour 2 insufflations."
      },
      {
        "_id": "q-final-12-8",
        "questionText": "\xC0 quelle distance minimale poser le triangle de pr\xE9signalisation sur route ?",
        "options": [
          "5 m\xE8tres",
          "Au moins 30 m\xE8tres en amont",
          "100 m\xE8tres",
          "Sur le coffre"
        ],
        "correctOptionIndex": 1,
        "explanation": "30 m\xE8tres minimum pour laisser une distance de freinage aux autres usagers."
      },
      {
        "_id": "q-final-12-9",
        "questionText": "Dans quel d\xE9lai doit-on faire parvenir un constat amiable \xE0 son assurance ?",
        "options": [
          "24 heures",
          "5 jours ouvr\xE9s",
          "15 jours",
          "1 mois"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le d\xE9lai l\xE9gal de transmission du constat est de 5 jours ouvr\xE9s."
      },
      {
        "_id": "q-final-12-10",
        "questionText": "Doit-on donner de l\u2019eau \xE0 un bless\xE9 d\u2019accident qui r\xE9clame \xE0 boire ?",
        "options": [
          "Oui un grand verre",
          "Non, jamais rien donner \xE0 boire ni \xE0 manger",
          "Oui avec du sucre",
          "Oui du caf\xE9"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019ingestion de liquide peut compliquer les soins ou l\u2019anesth\xE9sie d\u2019urgence."
      }
    ]
  },
  {
    "_id": "quiz-mod-13",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 13 \u2014 Documents, assurance et responsabilit\xE9",
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
        "questionText": "Quel document minimum d\u2019assurance est l\xE9galement obligatoire pour circuler ?",
        "options": [
          "Tous risques",
          "Responsabilit\xE9 civile (\xAB au tiers \xBB)",
          "Vol-incendie",
          "Assurance z\xE9ro franchise"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019assurance au tiers (responsabilit\xE9 civile) est le minimum l\xE9gal impos\xE9."
      },
      {
        "_id": "q-final-13-2",
        "questionText": "Quel est le capital de d\xE9part sur un permis probatoire classique ?",
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
        "questionText": "La non-pr\xE9sentation imm\xE9diate du permis lors d\u2019un contr\xF4le doit \xEAtre r\xE9gularis\xE9e sous :",
        "options": [
          "24 heures",
          "5 jours",
          "15 jours",
          "1 mois"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le conducteur dispose de 5 jours pour pr\xE9senter ses papiers en gendarmerie."
      },
      {
        "_id": "q-final-13-4",
        "questionText": "Combien de points peut-on perdre au maximum lors d\u2019une seule infraction ?",
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
        "questionText": "Circuler sans \xEAtre titulaire du permis de conduire est :",
        "options": [
          "Une contravention",
          "Un d\xE9lit passible d\u2019une peine de prison et d\u2019une lourde amende",
          "Une faute mineure",
          "Autoris\xE9 avec un accompagnateur sans dipl\xF4me"
        ],
        "correctOptionIndex": 1,
        "explanation": "La conduite sans permis est un d\xE9lit p\xE9nal."
      },
      {
        "_id": "q-final-13-6",
        "questionText": "En cas de changement d\u2019adresse, la carte grise doit \xEAtre modifi\xE9e dans un d\xE9lai de :",
        "options": [
          "15 jours",
          "1 mois",
          "3 mois",
          "1 an"
        ],
        "correctOptionIndex": 1,
        "explanation": "La d\xE9claration de changement de domicile doit se faire dans le mois."
      },
      {
        "_id": "q-final-13-7",
        "questionText": "Combien de points permet de r\xE9cup\xE9rer un stage de sensibilisation de 2 jours ?",
        "options": [
          "2 points",
          "4 points au maximum",
          "6 points",
          "12 points"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le stage de s\xE9curit\xE9 routi\xE8re permet d\u2019obtenir 4 points."
      },
      {
        "_id": "q-final-13-8",
        "questionText": "L\u2019assurance responsabilit\xE9 civile au tiers indemnise :",
        "options": [
          "Les d\xE9g\xE2ts caus\xE9s aux tiers et autres usagers",
          "La voiture du conducteur responsable",
          "Le vol du v\xE9hicule",
          "Les pannes m\xE9caniques"
        ],
        "correctOptionIndex": 0,
        "explanation": "Elle prend en charge les dommages caus\xE9s aux autres personnes."
      },
      {
        "_id": "q-final-13-9",
        "questionText": "Un conducteur responsable d\u2019un accident avec 1,2 g/l d\u2019alcool dans le sang :",
        "options": [
          "Est couvert \xE0 100% par son assurance",
          "S\u2019expose \xE0 la d\xE9ch\xE9ance de garantie et au remboursement des frais",
          "Re\xE7oit un bonus",
          "N\u2019a aucune sanction"
        ],
        "correctOptionIndex": 1,
        "explanation": "L\u2019alcool entra\xEEne la d\xE9ch\xE9ance des garanties contractuelles."
      },
      {
        "_id": "q-final-13-10",
        "questionText": "La lettre 48SI envoy\xE9e en recommand\xE9 par le Minist\xE8re de l\u2019Int\xE9rieur notifie :",
        "options": [
          "L\u2019obtention de 12 points",
          "L\u2019invalidation du permis pour solde de points nul",
          "Une convocation \xE0 un stage",
          "Une r\xE9duction d\u2019assurance"
        ],
        "correctOptionIndex": 1,
        "explanation": "La lettre 48SI acte l\u2019invalidation et l\u2019interdiction de conduire."
      }
    ]
  },
  {
    "_id": "quiz-mod-14",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 14 \u2014 \xC9coconduite et entretien",
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
        "questionText": "L\u2019\xE9coconduite permet une \xE9conomie moyenne de carburant de l\u2019ordre de :",
        "options": [
          "1%",
          "5%",
          "15 \xE0 25%",
          "50%"
        ],
        "correctOptionIndex": 2,
        "explanation": "L\u2019\xE9coconduite g\xE9n\xE8re 15 \xE0 25% d\u2019\xE9conomie de carburant."
      },
      {
        "_id": "q-final-14-2",
        "questionText": "\xC0 quel moment doit-on v\xE9rifier la pression des pneumatiques ?",
        "options": [
          "Tous les ans",
          "Au moins une fois par mois et \xE0 froid",
          "Tous les 5 ans",
          "Uniquement l\u2019\xE9t\xE9"
        ],
        "correctOptionIndex": 1,
        "explanation": "La v\xE9rification mensuelle \xE0 froid garantit la s\xE9curit\xE9 et l\u2019\xE9conomie."
      },
      {
        "_id": "q-final-14-3",
        "questionText": "Un pneu sous-gonfl\xE9 entra\xEEne :",
        "options": [
          "Une baisse de consommation",
          "Une surconsommation et un risque d\u2019\xE9chauffement/\xE9clatement",
          "Une meilleure adh\xE9rence",
          "Aucun effet"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le sous-gonflage augmente la r\xE9sistance au roulement et le risque d\u2019\xE9clatement."
      },
      {
        "_id": "q-final-14-4",
        "questionText": "Lorsque l\u2019on d\xE9c\xE9l\xE8re avec une vitesse enclench\xE9e (frein moteur), la consommation est de :",
        "options": [
          "0 litre / 100 km",
          "2 litres / 100 km",
          "5 litres / 100 km",
          "10 litres / 100 km"
        ],
        "correctOptionIndex": 0,
        "explanation": "L\u2019injection est totalement coup\xE9e en d\xE9c\xE9l\xE9ration."
      },
      {
        "_id": "q-final-14-5",
        "questionText": "La vignette Crit\u2019Air sert \xE0 :",
        "options": [
          "Payer les autoroutes",
          "Identifier la classe environnementale pour les ZFE et pics de pollution",
          "Contr\xF4ler la vitesse",
          "Remplacer la carte grise"
        ],
        "correctOptionIndex": 1,
        "explanation": "Elle classe les v\xE9hicules selon leurs \xE9missions polluantes."
      },
      {
        "_id": "q-final-14-6",
        "questionText": "Pour charger les bagages dans le coffre, o\xF9 positionner les valises les plus lourdes ?",
        "options": [
          "Tout en haut sur la plage arri\xE8re",
          "Tout au fond au plancher contre les dossiers de si\xE8ges",
          "Sur le c\xF4t\xE9 droit",
          "Sur le capot"
        ],
        "correctOptionIndex": 1,
        "explanation": "Les masses lourdes au plancher stabilisent l\u2019assiette du v\xE9hicule."
      },
      {
        "_id": "q-final-14-7",
        "questionText": "Sur autoroute \xE0 130 km/h, rouler vitres grandes ouvertes :",
        "options": [
          "\xC9conomise la clim",
          "Augmente fortement la consommation par r\xE9sistance a\xE9rodynamique",
          "Refroidit le moteur",
          "Est sans effet"
        ],
        "correctOptionIndex": 1,
        "explanation": "La tra\xEEn\xE9e a\xE9rodynamique freine le v\xE9hicule et augmente la consommation."
      },
      {
        "_id": "q-final-14-8",
        "questionText": "L\u2019usage excessif de la climatisation en voiture g\xE9n\xE8re une surconsommation de :",
        "options": [
          "0%",
          "10 \xE0 15%",
          "50%",
          "80%"
        ],
        "correctOptionIndex": 1,
        "explanation": "La climatisation sollicite le moteur et augmente la d\xE9pense d\u2019\xE9nergie."
      },
      {
        "_id": "q-final-14-9",
        "questionText": "\xC0 quel r\xE9gime moteur passer la vitesse sup\xE9rieure en conduite souple (essence) ?",
        "options": [
          "\xC0 2000-2500 tr/min",
          "\xC0 4500 tr/min",
          "\xC0 6000 tr/min",
          "\xC0 1000 tr/min"
        ],
        "correctOptionIndex": 0,
        "explanation": "Passer les rapports entre 2000 et 2500 tr/min optimise le rendement."
      },
      {
        "_id": "q-final-14-10",
        "questionText": "Le syst\xE8me Start & Stop permet de :",
        "options": [
          "Acc\xE9l\xE9rer plus fort",
          "Couper automatiquement le moteur \xE0 l\u2019arr\xEAt pour r\xE9duire pollution et consommation",
          "Couper les phares",
          "Freiner tout seul"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le Start & Stop coupe le moteur aux arr\xEAts prolong\xE9s pour \xE9conomiser l\u2019\xE9nergie."
      }
    ]
  },
  {
    "_id": "quiz-mod-15",
    "_type": "quiz",
    "title": "\xC9valuation Finale \u2014 Module 15 \u2014 R\xE9visions et examens blancs",
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
        "questionText": "Pour \xEAtre re\xE7u \xE0 l\u2019examen th\xE9orique g\xE9n\xE9ral du permis B (ETG), le score minimal est de :",
        "options": [
          "30/40",
          "33/40",
          "35/40 (5 fautes maximum)",
          "38/40"
        ],
        "correctOptionIndex": 2,
        "explanation": "35 bonnes r\xE9ponses sur 40 questions sont obligatoires pour d\xE9crocher le code."
      },
      {
        "_id": "q-final-15-2",
        "questionText": "Quelle est la vitesse maximale sur autoroute par temps de pluie (permis confirm\xE9) ?",
        "options": [
          "130 km/h",
          "110 km/h",
          "100 km/h",
          "90 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse sur autoroute est r\xE9duite \xE0 110 km/h par temps pluvieux."
      },
      {
        "_id": "q-final-15-3",
        "questionText": "Quel est le taux l\xE9gal maximal d\u2019alcool\xE9mie pour un jeune conducteur probatoire ?",
        "options": [
          "0,0 g/l",
          "0,2 g/l de sang (tol\xE9rance z\xE9ro)",
          "0,5 g/l",
          "0,8 g/l"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le seuil probatoire l\xE9gal est de 0,2 g/l de sang."
      },
      {
        "_id": "q-final-15-4",
        "questionText": "Sur route s\xE8che \xE0 90 km/h, la distance totale d\u2019arr\xEAt est estim\xE9e \xE0 :",
        "options": [
          "27 m",
          "54 m",
          "81 m",
          "120 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "Calcul th\xE9orique : 9 x 9 = 81 m\xE8tres."
      },
      {
        "_id": "q-final-15-5",
        "questionText": "La r\xE8gle de s\xE9curit\xE9 des 2 secondes entre deux v\xE9hicules correspond \xE0 130 km/h \xE0 :",
        "options": [
          "30 m",
          "50 m",
          "78 m\xE8tres (2 traits de BAU)",
          "150 m"
        ],
        "correctOptionIndex": 2,
        "explanation": "13 x 6 = 78 m\xE8tres, soit deux bandes blanches de bande d\u2019arr\xEAt d\u2019urgence."
      },
      {
        "_id": "q-final-15-6",
        "questionText": "Quelle est la premi\xE8re action vitale \xE0 mener en arrivant sur un accident ?",
        "options": [
          "Secourir",
          "Alerter",
          "Prot\xE9ger les lieux pour \xE9viter le sur-accident",
          "Prendre des photos"
        ],
        "correctOptionIndex": 2,
        "explanation": "P = Prot\xE9ger est la premi\xE8re obligation absolue."
      },
      {
        "_id": "q-final-15-7",
        "questionText": "Le port de la ceinture de s\xE9curit\xE9 est obligatoire :",
        "options": [
          "Uniquement \xE0 l\u2019avant",
          "\xC0 toutes les places \xE9quip\xE9es d\u2019un v\xE9hicule",
          "Uniquement hors agglom\xE9ration",
          "Pour le conducteur seul"
        ],
        "correctOptionIndex": 1,
        "explanation": "Tous les passagers doivent boucler leur ceinture."
      },
      {
        "_id": "q-final-15-8",
        "questionText": "Quelle sanction encourt le non-respect d\u2019un feu rouge ou d\u2019un panneau Stop ?",
        "options": [
          "135 \u20AC et 1 point",
          "135 \u20AC et 4 points de retrait",
          "68 \u20AC sans point",
          "Prison ferme"
        ],
        "correctOptionIndex": 1,
        "explanation": "Le refus de priorit\xE9 au feu rouge ou Stop retire 4 points."
      },
      {
        "_id": "q-final-15-9",
        "questionText": "Dans une \xAB Zone de rencontre \xBB, quelle est la vitesse maximale autoris\xE9e ?",
        "options": [
          "10 km/h",
          "20 km/h avec priorit\xE9 absolue aux pi\xE9tons",
          "30 km/h",
          "50 km/h"
        ],
        "correctOptionIndex": 1,
        "explanation": "La vitesse est plafonn\xE9e \xE0 20 km/h avec pi\xE9tons prioritaires sur toute la chauss\xE9e."
      },
      {
        "_id": "q-final-15-10",
        "questionText": "Les feux de brouillard arri\xE8re sont formellement INTERDITS :",
        "options": [
          "Par temps de brouillard",
          "Par temps de neige",
          "Par temps de pluie (pour cause d\u2019\xE9blouissement)",
          "La nuit"
        ],
        "correctOptionIndex": 2,
        "explanation": "La r\xE9verb\xE9ration de la lumi\xE8re dans l\u2019eau de pluie \xE9blouit dangereusement les usagers derri\xE8re."
      }
    ]
  }
];

// src/lib/sanityStore.ts
var INITIAL_PROGRAMMES_PERMIS = [PERMIS_B_PROGRAMME];
var getEnvVar = (nodeKey, viteKey, fallback) => {
  if (typeof process !== "undefined" && process.env) {
    if (process.env[nodeKey]) return process.env[nodeKey];
    if (process.env[viteKey]) return process.env[viteKey];
  }
  return fallback;
};
var sanityProjectId = getEnvVar("SANITY_PROJECT_ID", "VITE_SANITY_PROJECT_ID", "cchdhqvw");
var sanityDataset = getEnvVar("SANITY_DATASET", "VITE_SANITY_DATASET", "production");
var sanityToken = getEnvVar("SANITY_API_TOKEN", "VITE_SANITY_API_TOKEN", "skEGKHtehXGVW6vZV3vOQxxnJPuM2ySmjAvkYWI68CtKUgJOt5lOBLgtBeLKQhUNgtNgoPNpp6ewuJumw2t7PZdJdnBObPSh0Z886EQpZOsTkh6O9uc1ySmCt3MYP2XFzcDNlcwSkyPBSdarV6O6rxmXveGpkA5lb7mLFyOJ5TKZj00n6LRh");
var liveSanityClient = sanityProjectId ? createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  token: sanityToken,
  apiVersion: "2024-01-01",
  useCdn: false
}) : null;
var INITIAL_AUTO_ECOLES = [];
var INITIAL_USERS = [
  {
    _id: "user-super-admin",
    _type: "user",
    name: "Matoa Super Admin",
    email: "matoa@gmail.com",
    phone: "01 00 00 00 00",
    role: "SUPER_ADMIN" /* SUPER_ADMIN */,
    passwordHash: "qlac485!",
    isActive: true,
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  }
];
var INITIAL_ELEVES = [];
var INITIAL_MODULES = [...PERMIS_B_MODULES];
var INITIAL_QUIZZES = [...PERMIS_B_QUIZZES];
var INITIAL_PROGRESSIONS = [];
var INITIAL_LOGS = [];
var INITIAL_CERTIFICATS = [];
var INITIAL_SETTINGS = {
  defaultMinWatchPercentage: 80,
  defaultMinQuizScore: 70,
  allowMultipleSessions: false,
  maintenanceMode: false
};
var InMemorySanityStore = class {
  constructor() {
    this.autoEcoles = [
      {
        _id: "ae-matoa-official",
        _type: "autoEcole",
        name: "Matoa Auto-\xC9cole",
        adresse: "100 Avenue de la Conduite, Matoa HQ",
        contact: {
          phone: "01 45 89 20 00",
          email: "matoaadmin@gmail.com"
        },
        codeAutoEcoleUnique: "MATOA-AE-001",
        logo: "/matoa-logo.png",
        couleursTheme: {
          primaryColor: "#2563eb",
          secondaryColor: "#059669"
        },
        slogan: "Matoa Auto-\xC9cole \u2014 Formation d'excellence au permis de conduire.",
        isActive: true,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z"
      }
    ];
    this.users = [
      {
        _id: "user-super-admin",
        _type: "user",
        name: "Matoa Super Admin",
        email: "matoa@gmail.com",
        phone: "01 00 00 00 00",
        role: "SUPER_ADMIN" /* SUPER_ADMIN */,
        passwordHash: "qlac485!",
        isActive: true,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z"
      },
      {
        _id: "user-ae-matoa-admin",
        _type: "user",
        name: "Admin Matoa Auto-\xC9cole",
        email: "matoaadmin@gmail.com",
        phone: "01 45 89 20 00",
        role: "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */,
        autoEcole: { _type: "reference", _ref: "ae-matoa-official" },
        passwordHash: "admin123",
        isActive: true,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z"
      }
    ];
    this.eleves = [];
    this.programmesPermis = [...INITIAL_PROGRAMMES_PERMIS];
    this.modules = [...INITIAL_MODULES];
    this.quizzes = [...INITIAL_QUIZZES];
    this.progressions = [];
    this.logs = [];
    this.certificats = [];
    this.settings = { ...INITIAL_SETTINGS };
    this.lastSyncTimestamp = 0;
    this.syncPromise = null;
  }
  async purgeNonPermisBFromSanity() {
    if (!liveSanityClient) return;
    try {
      const [remoteProgs, remoteMods, remoteQuizzes] = await Promise.all([
        liveSanityClient.fetch(`*[_type == "programmePermis"]`),
        liveSanityClient.fetch(`*[_type == "moduleFormation"]`),
        liveSanityClient.fetch(`*[_type == "quiz"]`)
      ]);
      const validProgIds = [PERMIS_B_PROGRAMME._id];
      const validModIds = PERMIS_B_MODULES.map((m) => m._id);
      const validQuizIds = PERMIS_B_QUIZZES.map((q) => q._id);
      for (const p of remoteProgs || []) {
        if (!validProgIds.includes(p._id)) {
          await liveSanityClient.delete(p._id).catch(() => {
          });
        }
      }
      for (const m of remoteMods || []) {
        if (!validModIds.includes(m._id)) {
          await liveSanityClient.delete(m._id).catch(() => {
          });
        }
      }
      for (const q of remoteQuizzes || []) {
        if (!validQuizIds.includes(q._id)) {
          await liveSanityClient.delete(q._id).catch(() => {
          });
        }
      }
    } catch (err) {
      console.warn("Purge non-Permis B Sanity warning:", err);
    }
  }
  async seedPermisBContent() {
    this.programmesPermis = [{ ...PERMIS_B_PROGRAMME }];
    this.modules = [...PERMIS_B_MODULES];
    this.quizzes = [...PERMIS_B_QUIZZES];
    await this.purgeNonPermisBFromSanity();
    if (liveSanityClient) {
      try {
        await this.syncProgrammePermisToSanity(PERMIS_B_PROGRAMME);
        for (const mod of PERMIS_B_MODULES) {
          await this.syncModuleToSanity(mod);
        }
        for (const qz of PERMIS_B_QUIZZES) {
          await this.syncQuizToSanity(qz);
        }
      } catch (e) {
        console.warn("Erreur sync Permis B Sanity Cloud:", e);
      }
    }
  }
  clearDemoData() {
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
  getAutoEcoleById(idOrRef) {
    if (!idOrRef) return void 0;
    const refId = typeof idOrRef === "string" ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.autoEcoles.find((ae) => ae._id === refId);
  }
  // Helper to resolve user reference
  getUserById(idOrRef) {
    if (!idOrRef) return void 0;
    const refId = typeof idOrRef === "string" ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.users.find((u) => u._id === refId);
  }
  // Helper to resolve eleve reference
  getEleveById(idOrRef) {
    if (!idOrRef) return void 0;
    const refId = typeof idOrRef === "string" ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.eleves.find((el) => el._id === refId);
  }
  // Helper to resolve programmePermis reference
  getProgrammePermisById(idOrRef) {
    if (!idOrRef) return void 0;
    const refId = typeof idOrRef === "string" ? idOrRef : idOrRef._ref || idOrRef._id;
    return this.programmesPermis.find((p) => p._id === refId);
  }
  // Get modules filtered for a student's assigned program or permit type
  getModulesForEleve(eleveId) {
    const eleve = this.getEleveById(eleveId);
    if (!eleve) return this.modules.filter((m) => m.isActive);
    const progId = eleve.programmePermis ? typeof eleve.programmePermis === "string" ? eleve.programmePermis : eleve.programmePermis._ref || eleve.programmePermis._id : null;
    if (progId) {
      const prog = this.getProgrammePermisById(progId);
      if (prog && prog.modules && prog.modules.length > 0) {
        const moduleIds = prog.modules.map((m) => typeof m === "string" ? m : m._ref || m._id);
        const matched = this.modules.filter((m) => moduleIds.includes(m._id) && m.isActive);
        if (matched.length > 0) {
          return matched.sort((a, b) => a.ordre - b.ordre);
        }
      }
    }
    const typeP = eleve.typePermis || "B";
    const filteredByType = this.modules.filter(
      (m) => m.isActive && (m.typePermis === typeP || !m.typePermis || m.programmePermis && (typeof m.programmePermis === "string" ? this.getProgrammePermisById(m.programmePermis)?.typePermis === typeP : m.programmePermis.typePermis === typeP))
    );
    if (filteredByType.length > 0) {
      return filteredByType.sort((a, b) => a.ordre - b.ordre);
    }
    return this.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
  }
  // Helper for safe weak references in Sanity mutations
  toWeakRef(refObjOrId) {
    if (!refObjOrId) return void 0;
    const refId = typeof refObjOrId === "string" ? refObjOrId : refObjOrId._ref || refObjOrId._id;
    if (!refId) return void 0;
    return { _type: "reference", _ref: refId, _weak: true };
  }
  // Add Log Entry
  addLog(actorUser, typeAction, description, autoEcoleId) {
    const userObj = typeof actorUser === "string" ? this.getUserById(actorUser) : actorUser;
    const aeId = autoEcoleId || (userObj?.autoEcole ? typeof userObj.autoEcole === "string" ? userObj.autoEcole : userObj.autoEcole._ref || userObj.autoEcole._id : void 0);
    const newLog = {
      _id: `log-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
      _type: "logActivite",
      actorUser: userObj ? { _type: "reference", _ref: userObj._id } : { _type: "reference", _ref: "system" },
      actorName: userObj?.name || "Syst\xE8me",
      actorRole: userObj?.role || "SUPER_ADMIN" /* SUPER_ADMIN */,
      autoEcole: aeId ? { _type: "reference", _ref: aeId } : void 0,
      typeAction,
      description,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.logs.unshift(newLog);
    this.syncLogToSanity(newLog);
    return newLog;
  }
  // Sanity Mutations Sync
  async syncAutoEcoleToSanity(ae) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: ae._id,
        _type: "autoEcole",
        name: ae.name,
        codeAutoEcoleUnique: ae.codeAutoEcoleUnique,
        adresse: ae.adresse,
        contact: ae.contact,
        logo: ae.logo,
        slogan: ae.slogan,
        couleursTheme: ae.couleursTheme,
        isActive: ae.isActive,
        createdAt: ae.createdAt,
        updatedAt: ae.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (autoEcole):", err);
    }
  }
  async syncLogToSanity(log) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: log._id,
        _type: "logActivite",
        actorUser: this.toWeakRef(log.actorUser),
        actorName: log.actorName,
        actorRole: log.actorRole,
        autoEcole: this.toWeakRef(log.autoEcole),
        typeAction: log.typeAction,
        description: log.description,
        timestamp: log.timestamp
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (logActivite):", err);
    }
  }
  async syncUserToSanity(user) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: "user",
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (user):", err);
    }
  }
  async deleteSanityDocument(docId) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.delete(docId);
    } catch (err) {
      console.warn("Sanity delete warning:", err);
    }
  }
  async syncProgrammePermisToSanity(prog) {
    if (!liveSanityClient) return;
    try {
      const moduleRefs = (prog.modules || []).map((m) => this.toWeakRef(m)).filter(Boolean);
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: "programmePermis",
        typePermis: prog.typePermis,
        titreProgramme: prog.titreProgramme,
        descriptionProgramme: prog.descriptionProgramme,
        modules: moduleRefs,
        isActive: prog.isActive,
        createdAt: prog.createdAt,
        updatedAt: prog.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (programmePermis):", err);
    }
  }
  async syncEleveToSanity(eleve, user) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: user._id,
        _type: "user",
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        autoEcole: this.toWeakRef(user.autoEcole),
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });
      await liveSanityClient.createOrReplace({
        _id: eleve._id,
        _type: "eleve",
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
        updatedAt: eleve.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (eleve/user):", err);
    }
  }
  async syncProgressionToSanity(prog) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: prog._id,
        _type: "progressionModule",
        eleve: this.toWeakRef(prog.eleve),
        module: this.toWeakRef(prog.module),
        videoWatchTimeSeconds: prog.videoWatchTimeSeconds,
        hasCompletedVideo: prog.hasCompletedVideo,
        quizScore: prog.quizScore,
        quizAttemptCount: prog.quizAttemptCount,
        isModuleValidated: prog.isModuleValidated,
        lastActivityAt: prog.lastActivityAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (progression):", err);
    }
  }
  async syncModuleToSanity(mod) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: mod._id,
        _type: "moduleFormation",
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
        updatedAt: mod.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (moduleFormation):", err);
    }
  }
  async syncQuizToSanity(quiz) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: quiz._id,
        _type: "quiz",
        title: quiz.title,
        module: this.toWeakRef(quiz.module),
        timerSeconds: quiz.timerSeconds,
        scoreMinimum: quiz.scoreMinimum,
        questions: quiz.questions,
        createdAt: quiz.createdAt,
        updatedAt: quiz.updatedAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (quiz):", err);
    }
  }
  async syncCertificatToSanity(cert) {
    if (!liveSanityClient) return;
    try {
      await liveSanityClient.createOrReplace({
        _id: cert._id,
        _type: "certificat",
        eleve: this.toWeakRef(cert.eleve),
        autoEcole: this.toWeakRef(cert.autoEcole),
        dateEmission: cert.dateEmission,
        certificateCode: cert.certificateCode,
        status: cert.status,
        createdAt: cert.createdAt
      });
    } catch (err) {
      console.warn("Sanity mutation sync warning (certificat):", err);
    }
  }
  async purgeDemoElevesFromSanity() {
    if (!liveSanityClient) return;
    try {
      const demoIds = [
        "ae-001",
        "ae-002",
        "user-ae-001",
        "user-ae-002",
        "eleve-001",
        "eleve-002",
        "eleve-003",
        "eleve-004",
        "user-eleve-1",
        "user-eleve-2",
        "user-eleve-3",
        "user-eleve-4",
        "prog-001-mod-1",
        "prog-001-mod-2",
        "prog-001-mod-3",
        "prog-002-mod-1",
        "prog-002-mod-2",
        "prog-002-mod-3",
        "cert-001"
      ];
      for (const id of demoIds) {
        try {
          await liveSanityClient.delete(id);
        } catch {
        }
      }
    } catch (err) {
      console.warn("Nettoyage d\xE9mo warning:", err);
    }
  }
  async seedInitialDatasetToSanity() {
    if (!liveSanityClient) return;
    console.log("\u{1F331} Seeding default initial data into Sanity Cloud...");
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
        const u = this.users.find((usr) => usr._id === (typeof e.user === "string" ? e.user : e.user._ref || e.user._id));
        if (u) await this.syncEleveToSanity(e, u);
      }
      for (const pr of this.progressions) await this.syncProgressionToSanity(pr);
      for (const c of this.certificats) await this.syncCertificatToSanity(c);
      for (const l of this.logs) await this.syncLogToSanity(l);
      console.log("\u2705 Seeding Sanity Cloud complet !");
    } catch (err) {
      console.warn("Erreur durant le seeding Sanity Cloud:", err);
    }
  }
  async ensureSynced(force = false) {
    const now = Date.now();
    if (!force && this.lastSyncTimestamp > 0 && now - this.lastSyncTimestamp < 2e3) {
      return;
    }
    if (this.syncPromise) {
      return this.syncPromise;
    }
    this.syncPromise = this.loadFromSanity().then(() => {
      this.lastSyncTimestamp = Date.now();
      this.syncPromise = null;
    }).catch((err) => {
      console.warn("Sync error:", err);
      this.syncPromise = null;
    });
    return this.syncPromise;
  }
  async loadFromSanity() {
    if (!liveSanityClient) {
      console.log("\u2139\uFE0F Client Sanity non configur\xE9, utilisation du store m\xE9moire local.");
      return;
    }
    try {
      console.log("\u{1F504} Chargement rapide depuis Sanity Cloud...");
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
        liveSanityClient.fetch(`*[_type == "autoEcole"]`),
        liveSanityClient.fetch(`*[_type == "user"]`),
        liveSanityClient.fetch(`*[_type == "eleve"]`),
        liveSanityClient.fetch(`*[_type == "programmePermis"]`),
        liveSanityClient.fetch(`*[_type == "moduleFormation"]`),
        liveSanityClient.fetch(`*[_type == "quiz"]`),
        liveSanityClient.fetch(`*[_type == "progressionModule"]`),
        liveSanityClient.fetch(`*[_type == "logActivite"]`),
        liveSanityClient.fetch(`*[_type == "certificat"]`)
      ]);
      const DEMO_IDS = /* @__PURE__ */ new Set([
        "ae-001",
        "ae-002",
        "user-ae-001",
        "user-ae-002",
        "eleve-001",
        "eleve-002",
        "eleve-003",
        "eleve-004",
        "user-eleve-1",
        "user-eleve-2",
        "user-eleve-3",
        "user-eleve-4",
        "prog-001-mod-1",
        "prog-001-mod-2",
        "prog-001-mod-3",
        "prog-002-mod-1",
        "prog-002-mod-2",
        "prog-002-mod-3",
        "cert-001"
      ]);
      const isDemoId = (id) => Boolean(id && DEMO_IDS.has(id));
      if (remoteAutoEcoles && remoteAutoEcoles.length > 0) {
        const filtered = remoteAutoEcoles.filter(
          (ae) => !isDemoId(ae._id) && !ae.name?.includes("Conduite Passion") && !ae.name?.includes("Permis Zen")
        );
        if (filtered.length > 0) this.autoEcoles = filtered;
      }
      if (remoteUsers && remoteUsers.length > 0) {
        const filtered = remoteUsers.filter(
          (u) => !isDemoId(u._id) && u.email !== "contact@conduitepassion.fr" && u.email !== "admin@permiszen.fr"
        );
        if (filtered.length > 0) this.users = filtered;
      }
      if (remoteEleves && remoteEleves.length > 0) {
        this.eleves = remoteEleves.filter((e) => !isDemoId(e._id));
      }
      if (remoteProgrammes && remoteProgrammes.length > 0) {
        this.programmesPermis = remoteProgrammes;
      }
      if (remoteModules && remoteModules.length > 0) {
        this.modules = remoteModules;
      }
      if (remoteQuizzes && remoteQuizzes.length > 0) {
        this.quizzes = remoteQuizzes;
      }
      if (remoteProgressions && remoteProgressions.length > 0) {
        this.progressions = remoteProgressions.filter((pr) => {
          const elId = typeof pr.eleve === "string" ? pr.eleve : pr.eleve?._ref || pr.eleve?._id;
          return elId && !isDemoId(elId) && !pr._id.startsWith("prog-00");
        });
      }
      if (remoteLogs && remoteLogs.length > 0) this.logs = remoteLogs;
      if (remoteCertificats && remoteCertificats.length > 0) {
        this.certificats = remoteCertificats.filter((c) => {
          const elId = typeof c.eleve === "string" ? c.eleve : c.eleve?._ref || c.eleve?._id;
          return elId && !isDemoId(elId) && c._id !== "cert-001";
        });
      }
      let superAdmin = this.users.find((u) => u.role === "SUPER_ADMIN" /* SUPER_ADMIN */);
      if (!superAdmin) {
        superAdmin = {
          _id: "user-super-admin",
          _type: "user",
          name: "Matoa Super Admin",
          email: "matoa@gmail.com",
          phone: "01 00 00 00 00",
          role: "SUPER_ADMIN" /* SUPER_ADMIN */,
          passwordHash: "qlac485!",
          isActive: true,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.users.unshift(superAdmin);
      }
      let matoaAe = this.autoEcoles.find(
        (ae) => ae.codeAutoEcoleUnique === "MATOA-AE-001" || ae.contact?.email === "matoaadmin@gmail.com" || ae.name.toLowerCase().includes("matoa auto-\xE9cole")
      );
      if (!matoaAe) {
        matoaAe = {
          _id: "ae-matoa-official",
          _type: "autoEcole",
          name: "Matoa Auto-\xC9cole",
          adresse: "100 Avenue de la Conduite, Matoa HQ",
          contact: {
            phone: "01 45 89 20 00",
            email: "matoaadmin@gmail.com"
          },
          codeAutoEcoleUnique: "MATOA-AE-001",
          logo: "/matoa-logo.png",
          couleursTheme: {
            primaryColor: "#2563eb",
            secondaryColor: "#059669"
          },
          slogan: "Matoa Auto-\xC9cole \u2014 Formation d'excellence au permis de conduire.",
          isActive: true,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.autoEcoles.unshift(matoaAe);
      }
      let matoaAdmin = this.users.find(
        (u) => u.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && (u.email === "matoaadmin@gmail.com" || u._id === "user-ae-matoa-admin")
      );
      if (!matoaAdmin) {
        matoaAdmin = {
          _id: "user-ae-matoa-admin",
          _type: "user",
          name: "Admin Matoa Auto-\xC9cole",
          email: "matoaadmin@gmail.com",
          phone: "01 45 89 20 00",
          role: "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */,
          autoEcole: { _type: "reference", _ref: matoaAe._id },
          passwordHash: "admin123",
          isActive: true,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.users.push(matoaAdmin);
      }
      console.log(`\u2705 Sanity Synchronis\xE9 ! (${this.autoEcoles.length} auto-\xE9coles, ${this.users.length} utilisateurs, ${this.eleves.length} \xE9l\xE8ves, ${this.modules.length} modules)`);
    } catch (err) {
      console.warn("\u26A0\uFE0F Avertissement lors du chargement Sanity:", err);
    }
  }
};
var inMemoryStore = new InMemorySanityStore();

// src/server/auth.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "matoa-super-secret-jwt-key-2026";
function signJwtToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
function verifyJwtToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acc\xE8s non autoris\xE9. Jeton manquant." });
  }
  const token = authHeader.split(" ")[1];
  const decoded = verifyJwtToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Session expir\xE9e ou jeton invalide." });
  }
  req.user = decoded;
  next();
}
function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Non authentifi\xE9." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acc\xE8s refus\xE9 pour votre r\xF4le." });
    }
    next();
  };
}

// src/serverApp.ts
function getRefId(item) {
  if (!item) return void 0;
  if (typeof item === "string") return item;
  return item._ref || item._id;
}
var app = express();
app.use((req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req._body = true;
  }
  next();
});
app.use(express.json());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (_req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
inMemoryStore.ensureSynced().catch((err) => console.warn("Boot sync warning:", err));
var apiRouter = express.Router();
apiRouter.get("/health", async (_req, res) => {
  res.json({
    status: "ok",
    app: "Matoa Multi-Tenant Driving School SaaS",
    sanityConnected: Boolean(liveSanityClient),
    schoolsCount: inMemoryStore.autoEcoles.length,
    studentsCount: inMemoryStore.eleves.length,
    modulesCount: inMemoryStore.modules.length,
    time: (/* @__PURE__ */ new Date()).toISOString()
  });
});
apiRouter.post("/sync/refresh", authMiddleware, async (_req, res) => {
  try {
    await inMemoryStore.ensureSynced(true);
    res.json({
      success: true,
      message: "Base de donn\xE9es Sanity Cloud synchronis\xE9e avec succ\xE8s !",
      schoolsCount: inMemoryStore.autoEcoles.length,
      usersCount: inMemoryStore.users.length,
      studentsCount: inMemoryStore.eleves.length,
      modulesCount: inMemoryStore.modules.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur de synchronisation Sanity" });
  }
});
apiRouter.post("/auth/login", async (req, res) => {
  try {
    const { loginType, email, password, codeAutoEcole, codeEleveUnique } = req.body || {};
    if (!password) {
      return res.status(400).json({ error: "Le mot de passe est obligatoire." });
    }
    await inMemoryStore.ensureSynced();
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (loginType === "SUPER_ADMIN" /* SUPER_ADMIN */ || loginType === "SUPER_ADMIN" || loginType === "super_admin") {
      const user = inMemoryStore.users.find(
        (u) => u.role === "SUPER_ADMIN" /* SUPER_ADMIN */ && (u.email.toLowerCase() === (email || "").trim().toLowerCase() || u.email === "matoa@gmail.com")
      );
      if (!user || user.passwordHash !== password) {
        return res.status(401).json({ error: "Identifiants Super Admin incorrects." });
      }
      const token = signJwtToken({
        userId: user._id,
        email: user.email,
        name: user.name,
        role: "SUPER_ADMIN" /* SUPER_ADMIN */
      });
      const log = inMemoryStore.addLog(user, "CONNEXION_UTILISATEUR" /* CONNEXION_UTILISATEUR */, "Connexion Super Admin Matoa");
      await inMemoryStore.syncLogToSanity(log);
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "SUPER_ADMIN" /* SUPER_ADMIN */
        }
      });
    }
    if (loginType === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ || loginType === "AUTO_ECOLE_ADMIN" || loginType === "auto_ecole_admin") {
      const user = inMemoryStore.users.find(
        (u) => u.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && u.email.toLowerCase() === (email || "").trim().toLowerCase()
      );
      if (!user || user.passwordHash !== password) {
        return res.status(401).json({ error: "Identifiants Administrateur Auto-\xC9cole incorrects." });
      }
      const aeId = getRefId(user.autoEcole);
      const ae = inMemoryStore.getAutoEcoleById(aeId);
      if (!ae || !ae.isActive) {
        return res.status(403).json({
          error: "Compte Auto-\xC9cole suspendu ou inactif. Veuillez contacter le support Matoa."
        });
      }
      const token = signJwtToken({
        userId: user._id,
        email: user.email,
        name: user.name,
        role: "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */,
        autoEcoleId: ae._id
      });
      const log = inMemoryStore.addLog(user, "CONNEXION_UTILISATEUR" /* CONNEXION_UTILISATEUR */, `Connexion Admin Auto-\xC9cole : ${ae.name}`, ae._id);
      await inMemoryStore.syncLogToSanity(log);
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */,
          autoEcoleId: ae._id,
          autoEcoleName: ae.name
        },
        autoEcole: ae
      });
    }
    if (loginType === "ELEVE" /* ELEVE */ || loginType === "ELEVE" || loginType === "eleve") {
      if (!codeAutoEcole) {
        return res.status(400).json({ error: "Le code unique d'auto-\xE9cole est requis pour la connexion \xE9l\xE8ve." });
      }
      const ae = inMemoryStore.autoEcoles.find(
        (a) => a.codeAutoEcoleUnique.toUpperCase() === codeAutoEcole.trim().toUpperCase()
      );
      if (!ae || !ae.isActive) {
        return res.status(404).json({ error: "Code auto-\xE9cole introuvable ou \xE9tablissement suspendu." });
      }
      const eleveRecord = inMemoryStore.eleves.find((el) => {
        const elAeId = getRefId(el.autoEcole);
        if (elAeId !== ae._id) return false;
        const u = inMemoryStore.getUserById(el.user);
        if (!u) return false;
        const matchesCode = codeEleveUnique && el.codeEleveUnique.toUpperCase() === codeEleveUnique.trim().toUpperCase();
        const matchesEmail = email && u.email.toLowerCase() === email.trim().toLowerCase();
        return matchesCode || matchesEmail;
      });
      if (!eleveRecord) {
        return res.status(401).json({ error: "\xC9l\xE8ve non trouv\xE9 pour cette auto-\xE9cole. V\xE9rifiez votre code \xE9l\xE8ve ou email." });
      }
      const user = inMemoryStore.getUserById(eleveRecord.user);
      if (!user || user.passwordHash !== password) {
        return res.status(401).json({ error: "Mot de passe \xE9l\xE8ve incorrect." });
      }
      if (eleveRecord.dateFinFormation && eleveRecord.dateFinFormation < todayStr) {
        eleveRecord.isBlocked = true;
        eleveRecord.formationActive = false;
        const log2 = inMemoryStore.addLog(
          user,
          "SUSPENSION_ELEVE" /* SUSPENSION_ELEVE */,
          `Tentative de connexion refus\xE9e : P\xE9riode de formation expir\xE9e (${eleveRecord.dateFinFormation})`,
          ae._id
        );
        await inMemoryStore.syncLogToSanity(log2);
        await inMemoryStore.syncEleveToSanity(eleveRecord, user);
        return res.status(403).json({
          error: `ACC\xC8S SUSPENDU : Votre p\xE9riode de formation s'est achev\xE9e le ${eleveRecord.dateFinFormation}. Votre compte est actuellement verrouill\xE9. Veuillez contacter l'administration de ${ae.name}.`,
          isBlocked: true,
          isExpired: true,
          dateFinFormation: eleveRecord.dateFinFormation
        });
      }
      if (eleveRecord.isBlocked || !user.isActive) {
        return res.status(403).json({
          error: `ACC\xC8S SUSPENDU : Votre compte \xE9l\xE8ve a \xE9t\xE9 bloqu\xE9 par votre auto-\xE9cole (${ae.name}). Veuillez contacter la direction pour r\xE9tablir votre acc\xE8s.`,
          isBlocked: true
        });
      }
      const token = signJwtToken({
        userId: user._id,
        email: user.email,
        name: user.name,
        role: "ELEVE" /* ELEVE */,
        autoEcoleId: ae._id,
        codeEleveUnique: eleveRecord.codeEleveUnique
      });
      const log = inMemoryStore.addLog(
        user,
        "CONNEXION_UTILISATEUR" /* CONNEXION_UTILISATEUR */,
        `Connexion de l'\xE9l\xE8ve ${user.name} (${eleveRecord.codeEleveUnique})`,
        ae._id
      );
      await inMemoryStore.syncLogToSanity(log);
      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: "ELEVE" /* ELEVE */,
          autoEcoleId: ae._id,
          autoEcoleName: ae.name,
          codeEleveUnique: eleveRecord.codeEleveUnique,
          eleveId: eleveRecord._id
        },
        autoEcole: ae,
        eleve: eleveRecord
      });
    }
    return res.status(400).json({ error: "Type de connexion invalide." });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: err?.message || "Erreur interne lors de la connexion" });
  }
});
apiRouter.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const userPayload = req.user;
    const user = inMemoryStore.getUserById(userPayload.userId);
    if (!user || !user.isActive) {
      return res.status(403).json({ error: "Utilisateur introuvable ou suspendu.", isBlocked: true });
    }
    let ae;
    let eleve;
    if (userPayload.autoEcoleId) {
      ae = inMemoryStore.getAutoEcoleById(userPayload.autoEcoleId);
      if (userPayload.role !== "SUPER_ADMIN" /* SUPER_ADMIN */ && (!ae || !ae.isActive)) {
        return res.status(403).json({ error: "\xC9tablissement auto-\xE9cole suspendu.", isBlocked: true });
      }
    }
    if (userPayload.role === "ELEVE" /* ELEVE */) {
      eleve = inMemoryStore.eleves.find((el) => {
        const uId = getRefId(el.user);
        return uId === user._id;
      });
      if (!eleve) {
        return res.status(404).json({ error: "Dossier \xE9l\xE8ve introuvable.", isBlocked: true });
      }
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const isExpired = eleve.dateFinFormation ? eleve.dateFinFormation < todayStr : false;
      if (eleve.isBlocked || !eleve.formationActive || isExpired) {
        if (isExpired && !eleve.isBlocked) {
          eleve.isBlocked = true;
          eleve.formationActive = false;
          await inMemoryStore.syncEleveToSanity(eleve, user);
        }
        return res.status(403).json({
          error: eleve.isBlocked ? `Acc\xE8s \xE9l\xE8ve suspendu par l'auto-\xE9cole ${ae?.name || "Matoa Auto-\xC9cole"}.` : `P\xE9riode de formation expir\xE9e le ${eleve.dateFinFormation}.`,
          isBlocked: true,
          isExpired
        });
      }
    }
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        autoEcoleId: ae?._id,
        autoEcoleName: ae?.name,
        codeEleveUnique: eleve?.codeEleveUnique,
        eleveId: eleve?._id
      },
      autoEcole: ae,
      eleve
    });
  } catch (err) {
    console.error("Erreur auth/me:", err);
    res.status(500).json({ error: err?.message || "Erreur interne de session" });
  }
});
apiRouter.get("/auto-ecoles", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    if (req.user?.role === "SUPER_ADMIN" /* SUPER_ADMIN */) {
      const schools = inMemoryStore.autoEcoles.map((ae) => {
        const studentCount = inMemoryStore.eleves.filter((e) => {
          const aeRef = getRefId(e.autoEcole);
          return aeRef === ae._id;
        }).length;
        return { ...ae, studentCount };
      });
      return res.json(schools);
    }
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */) {
      const ae = inMemoryStore.getAutoEcoleById(req.user.autoEcoleId);
      return res.json(ae ? [ae] : []);
    }
    res.status(403).json({ error: "Acc\xE8s non autoris\xE9." });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/auto-ecoles", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { name, adresse, contact, slogan, primaryColor, secondaryColor, adminName, adminEmail, adminPassword } = req.body || {};
    if (!name || !adminEmail || !adminPassword) {
      return res.status(400).json({ error: "Le nom, l'email admin et le mot de passe sont requis." });
    }
    const count = inMemoryStore.autoEcoles.length + 1;
    const codeAutoEcoleUnique = `MATOA-AE-${String(count).padStart(3, "0")}`;
    const aeId = `ae-${Date.now()}`;
    const newAutoEcole = {
      _id: aeId,
      _type: "autoEcole",
      name,
      adresse: adresse || "",
      contact: contact || { phone: "", email: adminEmail },
      codeAutoEcoleUnique,
      logo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=150&auto=format&fit=crop&q=80",
      couleursTheme: {
        primaryColor: primaryColor || "#2563eb",
        secondaryColor: secondaryColor || "#059669"
      },
      slogan: slogan || "Bienvenue dans notre auto-\xE9cole.",
      isActive: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.autoEcoles.push(newAutoEcole);
    await inMemoryStore.syncAutoEcoleToSanity(newAutoEcole);
    const newAdminUser = {
      _id: `user-ae-${Date.now()}`,
      _type: "user",
      name: adminName || `Admin ${name}`,
      email: adminEmail,
      phone: contact?.phone || "",
      role: "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */,
      autoEcole: { _type: "reference", _ref: aeId },
      passwordHash: adminPassword,
      isActive: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.users.push(newAdminUser);
    await inMemoryStore.syncUserToSanity(newAdminUser);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "CREATION_AUTO_ECOLE" /* CREATION_AUTO_ECOLE */,
      `Cr\xE9ation de l'auto-\xE9cole ${name} (${codeAutoEcoleUnique}) avec administrateur ${adminEmail}`,
      aeId
    );
    await inMemoryStore.syncLogToSanity(log);
    res.status(201).json({ autoEcole: newAutoEcole, adminUser: newAdminUser });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.put("/auto-ecoles/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && req.user.autoEcoleId !== id) {
      return res.status(403).json({ error: "Vous ne pouvez modifier que votre propre auto-\xE9cole." });
    }
    const ae = inMemoryStore.getAutoEcoleById(id);
    if (!ae) {
      return res.status(404).json({ error: "Auto-\xE9cole non trouv\xE9e." });
    }
    const { name, adresse, contact, slogan, logo, couleursTheme, isActive } = req.body || {};
    if (name) ae.name = name;
    if (adresse !== void 0) ae.adresse = adresse;
    if (contact) ae.contact = { ...ae.contact, ...contact };
    if (slogan !== void 0) ae.slogan = slogan;
    if (logo !== void 0) ae.logo = logo;
    if (couleursTheme) ae.couleursTheme = { ...ae.couleursTheme, ...couleursTheme };
    if (req.user?.role === "SUPER_ADMIN" /* SUPER_ADMIN */ && isActive !== void 0) {
      ae.isActive = isActive;
      const log = inMemoryStore.addLog(
        req.user.userId,
        isActive ? "ACTIVATION_AUTO_ECOLE" /* ACTIVATION_AUTO_ECOLE */ : "SUSPENSION_AUTO_ECOLE" /* SUSPENSION_AUTO_ECOLE */,
        `Auto-\xE9cole ${ae.name} ${isActive ? "r\xE9activ\xE9e" : "suspendue"}.`,
        ae._id
      );
      await inMemoryStore.syncLogToSanity(log);
    }
    ae.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncAutoEcoleToSanity(ae);
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */) {
      const log = inMemoryStore.addLog(
        req.user.userId,
        "MODIFICATION_BRANDING" /* MODIFICATION_BRANDING */,
        `Mise \xE0 jour du branding et informations de l'auto-\xE9cole ${ae.name}`,
        ae._id
      );
      await inMemoryStore.syncLogToSanity(log);
    }
    res.json(ae);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.delete("/auto-ecoles/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const ae = inMemoryStore.getAutoEcoleById(id);
    if (!ae) {
      return res.status(404).json({ error: "Auto-\xE9cole introuvable." });
    }
    const schoolName = ae.name;
    const schoolCode = ae.codeAutoEcoleUnique;
    inMemoryStore.autoEcoles = inMemoryStore.autoEcoles.filter((a) => a._id !== id);
    inMemoryStore.eleves = inMemoryStore.eleves.filter((e) => getRefId(e.autoEcole) !== id);
    inMemoryStore.users = inMemoryStore.users.filter((u) => getRefId(u.autoEcole) !== id);
    await inMemoryStore.deleteSanityDocument(id);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "SUPPRESSION_AUTO_ECOLE" /* SUPPRESSION_AUTO_ECOLE */,
      `Suppression d\xE9finitive de l'auto-\xE9cole ${schoolName} (${schoolCode})`,
      id
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({ message: `L'auto-\xE9cole ${schoolName} a \xE9t\xE9 supprim\xE9e avec succ\xE8s.`, deletedId: id });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.put("/users/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = inMemoryStore.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }
    const { name, email, phone, currentPassword, newPassword, notificationPreferences } = req.body || {};
    if (name) user.name = name;
    if (phone !== void 0) user.phone = phone;
    if (email && email.toLowerCase() !== user.email.toLowerCase()) {
      const existing = inMemoryStore.users.find((u) => u._id !== userId && u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ error: "Cet email est d\xE9j\xE0 utilis\xE9 par un autre compte." });
      }
      user.email = email;
    }
    if (newPassword) {
      if (currentPassword && currentPassword !== user.passwordHash) {
        return res.status(400).json({ error: "Le mot de passe actuel est incorrect." });
      }
      user.passwordHash = newPassword;
    }
    if (notificationPreferences) {
      user.notificationPreferences = notificationPreferences;
    }
    user.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncUserToSanity(user);
    const log = inMemoryStore.addLog(
      userId,
      "MODIFICATION_ELEVE" /* MODIFICATION_ELEVE */,
      `Mise \xE0 jour des param\xE8tres du profil utilisateur (${user.name})`,
      req.user?.autoEcoleId
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({
      message: "Profil mis \xE0 jour avec succ\xE8s.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        notificationPreferences: user.notificationPreferences || {}
      }
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/eleves", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    let list = [...inMemoryStore.eleves];
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ || req.user?.role === "ELEVE" /* ELEVE */) {
      list = list.filter((e) => {
        const aeRef = getRefId(e.autoEcole);
        return aeRef === req.user?.autoEcoleId;
      });
    }
    const enriched = list.map((el) => {
      const user = inMemoryStore.getUserById(el.user);
      const ae = inMemoryStore.getAutoEcoleById(el.autoEcole);
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const isExpired = el.dateFinFormation ? el.dateFinFormation < todayStr : false;
      return {
        ...el,
        userDetail: user ? { name: user.name, email: user.email, phone: user.phone } : null,
        autoEcoleDetail: ae ? { name: ae.name, code: ae.codeAutoEcoleUnique } : null,
        isExpired
      };
    });
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/eleves", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    const { name, email, phone, password, dateDebutFormation, dateFinFormation, autoEcoleId, typePermis, programmePermisId } = req.body || {};
    const targetAeId = req.user?.role === "SUPER_ADMIN" /* SUPER_ADMIN */ ? autoEcoleId : req.user?.autoEcoleId;
    if (!name || !email || !password || !dateDebutFormation || !dateFinFormation || !targetAeId) {
      return res.status(400).json({ error: "Tous les champs requis doivent \xEAtre renseign\xE9s." });
    }
    const ae = inMemoryStore.getAutoEcoleById(targetAeId);
    if (!ae) {
      return res.status(404).json({ error: "Auto-\xE9cole introuvable." });
    }
    const selectedTypePermis = (typePermis || "B").trim().toUpperCase();
    let selectedProgId = programmePermisId;
    if (!selectedProgId) {
      const matchedProg = inMemoryStore.programmesPermis.find((p) => p.typePermis === selectedTypePermis);
      if (matchedProg) {
        selectedProgId = matchedProg._id;
      }
    }
    const existingUser = inMemoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: "Un utilisateur avec cette adresse email existe d\xE9j\xE0." });
    }
    const aeIndex = ae.codeAutoEcoleUnique.split("-")[2] || "001";
    const totalStudentsInAe = inMemoryStore.eleves.filter((e) => {
      const aeRef = getRefId(e.autoEcole);
      return aeRef === ae._id;
    }).length + 1;
    const codeEleveUnique = `AE${aeIndex}-ELV${String(totalStudentsInAe).padStart(3, "0")}`;
    const userId = `user-eleve-${Date.now()}-${Math.floor(Math.random() * 1e3)}`;
    const newUser = {
      _id: userId,
      _type: "user",
      name,
      email,
      phone: phone || "",
      role: "ELEVE" /* ELEVE */,
      autoEcole: { _type: "reference", _ref: ae._id },
      passwordHash: password,
      isActive: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.users.push(newUser);
    const eleveId = `eleve-${Date.now()}-${Math.floor(Math.random() * 1e3)}`;
    const newEleve = {
      _id: eleveId,
      _type: "eleve",
      user: { _type: "reference", _ref: userId },
      autoEcole: { _type: "reference", _ref: ae._id },
      codeEleveUnique,
      typePermis: selectedTypePermis,
      programmePermis: selectedProgId ? { _type: "reference", _ref: selectedProgId } : void 0,
      dateDebutFormation,
      dateFinFormation,
      formationActive: true,
      progressionGlobal: 0,
      isBlocked: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.eleves.push(newEleve);
    await inMemoryStore.syncEleveToSanity(newEleve, newUser);
    const log1 = inMemoryStore.addLog(
      req.user.userId,
      "CREATION_ELEVE" /* CREATION_ELEVE */,
      `Cr\xE9ation de l'\xE9l\xE8ve ${name} (${codeEleveUnique}) - Permis ${selectedTypePermis} du ${dateDebutFormation} au ${dateFinFormation}`,
      ae._id
    );
    await inMemoryStore.syncLogToSanity(log1);
    const log2 = inMemoryStore.addLog(
      req.user.userId,
      "CHOIX_TYPE_PERMIS_POUR_ELEVE" /* CHOIX_TYPE_PERMIS_POUR_ELEVE */,
      `Attribution du Permis ${selectedTypePermis} pour l'\xE9l\xE8ve ${name} (${codeEleveUnique})`,
      ae._id
    );
    await inMemoryStore.syncLogToSanity(log2);
    res.status(201).json({
      eleve: newEleve,
      user: newUser,
      codeEleveUnique
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/eleves/bulk-import", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    const { csvText, studentsList, autoEcoleId } = req.body || {};
    const targetAeId = req.user?.role === "SUPER_ADMIN" /* SUPER_ADMIN */ ? autoEcoleId : req.user?.autoEcoleId;
    const ae = inMemoryStore.getAutoEcoleById(targetAeId);
    if (!ae) {
      return res.status(404).json({ error: "Auto-\xE9cole cible introuvable." });
    }
    let rawRows = [];
    if (Array.isArray(studentsList) && studentsList.length > 0) {
      rawRows = studentsList;
    } else if (typeof csvText === "string" && csvText.trim().length > 0) {
      const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
      if (lines.length === 0) {
        return res.status(400).json({ error: "Fichier CSV vide ou format invalide." });
      }
      const firstLineLower = lines[0].toLowerCase();
      const hasHeader = firstLineLower.includes("nom") || firstLineLower.includes("name") || firstLineLower.includes("email");
      const dataLines = hasHeader ? lines.slice(1) : lines;
      for (const line of dataLines) {
        const parts = line.split(/[,;]/).map((p) => p.trim().replace(/^["']|["']$/g, ""));
        if (parts.length >= 2) {
          rawRows.push({
            name: parts[0],
            email: parts[1],
            phone: parts[2] || "",
            password: parts[3] || "password123",
            dateDebutFormation: parts[4] || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            dateFinFormation: parts[5] || new Date(Date.now() + 180 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0]
          });
        }
      }
    } else {
      return res.status(400).json({ error: "Aucune donn\xE9e CSV fournie." });
    }
    if (rawRows.length === 0) {
      return res.status(400).json({ error: "Aucun \xE9l\xE8ve valide \xE0 importer n'a \xE9t\xE9 d\xE9tect\xE9 dans le fichier." });
    }
    const importedStudents = [];
    const errors = [];
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const defaultEndStr = new Date(Date.now() + 180 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
    for (let index = 0; index < rawRows.length; index++) {
      const row = rawRows[index];
      const name = row.name?.trim();
      const email = row.email?.trim().toLowerCase();
      const phone = row.phone?.trim() || "";
      const password = row.password?.trim() || "password123";
      const dateDebutFormation = row.dateDebutFormation?.trim() || todayStr;
      const dateFinFormation = row.dateFinFormation?.trim() || defaultEndStr;
      if (!name || !email) {
        errors.push(`Ligne ${index + 1}: Le nom et l'email sont obligatoires.`);
        continue;
      }
      const existingUser = inMemoryStore.users.find((u) => u.email.toLowerCase() === email);
      if (existingUser) {
        errors.push(`Ligne ${index + 1} (${email}): Un utilisateur avec cet email existe d\xE9j\xE0.`);
        continue;
      }
      const aeIndex = ae.codeAutoEcoleUnique.split("-")[2] || "001";
      const totalStudentsInAe = inMemoryStore.eleves.filter((e) => {
        const aeRef = getRefId(e.autoEcole);
        return aeRef === ae._id;
      }).length + 1;
      const codeEleveUnique = `AE${aeIndex}-ELV${String(totalStudentsInAe).padStart(3, "0")}`;
      const userId = `user-eleve-csv-${Date.now()}-${index}-${Math.floor(Math.random() * 1e3)}`;
      const newUser = {
        _id: userId,
        _type: "user",
        name,
        email,
        phone,
        role: "ELEVE" /* ELEVE */,
        autoEcole: { _type: "reference", _ref: ae._id },
        passwordHash: password,
        isActive: true,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const eleveId = `eleve-csv-${Date.now()}-${index}-${Math.floor(Math.random() * 1e3)}`;
      const newEleve = {
        _id: eleveId,
        _type: "eleve",
        user: { _type: "reference", _ref: userId },
        autoEcole: { _type: "reference", _ref: ae._id },
        codeEleveUnique,
        dateDebutFormation,
        dateFinFormation,
        formationActive: true,
        progressionGlobal: 0,
        isBlocked: false,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.users.push(newUser);
      inMemoryStore.eleves.push(newEleve);
      await inMemoryStore.syncEleveToSanity(newEleve, newUser);
      importedStudents.push({
        _id: eleveId,
        name,
        email,
        codeEleveUnique
      });
    }
    if (importedStudents.length > 0) {
      const log = inMemoryStore.addLog(
        req.user.userId,
        "CREATION_ELEVE" /* CREATION_ELEVE */,
        `Importation CSV group\xE9e de ${importedStudents.length} \xE9l\xE8ves dans l'auto-\xE9cole ${ae.name}`,
        ae._id
      );
      await inMemoryStore.syncLogToSanity(log);
    }
    res.json({
      success: true,
      importedCount: importedStudents.length,
      errorCount: errors.length,
      errors,
      importedStudents
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.put("/eleves/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const eleve = inMemoryStore.getEleveById(id);
    if (!eleve) {
      return res.status(404).json({ error: "\xC9l\xE8ve non trouv\xE9." });
    }
    const aeRef = getRefId(eleve.autoEcole);
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && aeRef !== req.user.autoEcoleId) {
      return res.status(403).json({ error: "Acc\xE8s non autoris\xE9 \xE0 cet \xE9l\xE8ve." });
    }
    const { name, phone, dateDebutFormation, dateFinFormation, isBlocked, formationActive, typePermis, programmePermisId } = req.body || {};
    const user = inMemoryStore.getUserById(eleve.user);
    if (user) {
      if (name) user.name = name;
      if (phone !== void 0) user.phone = phone;
      user.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    if (typePermis && typePermis !== eleve.typePermis) {
      const oldPermis = eleve.typePermis || "Non d\xE9fini";
      eleve.typePermis = typePermis.trim().toUpperCase();
      const log2 = inMemoryStore.addLog(
        req.user.userId,
        "CHANGEMENT_TYPE_PERMIS_POUR_ELEVE" /* CHANGEMENT_TYPE_PERMIS_POUR_ELEVE */,
        `Changement du type de permis de l'\xE9l\xE8ve ${user?.name || ""} : ${oldPermis} \u2794 ${eleve.typePermis}`,
        aeRef
      );
      await inMemoryStore.syncLogToSanity(log2);
    }
    if (programmePermisId) {
      eleve.programmePermis = { _type: "reference", _ref: programmePermisId };
    } else if (typePermis) {
      const matchedProg = inMemoryStore.programmesPermis.find((p) => p.typePermis === typePermis.trim().toUpperCase());
      if (matchedProg) {
        eleve.programmePermis = { _type: "reference", _ref: matchedProg._id };
      }
    }
    if (dateDebutFormation) eleve.dateDebutFormation = dateDebutFormation;
    if (dateFinFormation) eleve.dateFinFormation = dateFinFormation;
    if (isBlocked !== void 0) eleve.isBlocked = isBlocked;
    if (formationActive !== void 0) eleve.formationActive = formationActive;
    eleve.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    if (user) await inMemoryStore.syncEleveToSanity(eleve, user);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_ELEVE" /* MODIFICATION_ELEVE */,
      `Mise \xE0 jour du dossier \xE9l\xE8ve ${user?.name || ""} (${eleve.codeEleveUnique})`,
      aeRef
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json(eleve);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.delete("/eleves/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const index = inMemoryStore.eleves.findIndex((e) => e._id === id);
    if (index === -1) {
      return res.status(404).json({ error: "\xC9l\xE8ve non trouv\xE9." });
    }
    const eleve = inMemoryStore.eleves[index];
    const aeRef = getRefId(eleve.autoEcole);
    const userId = getRefId(eleve.user);
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && aeRef !== req.user.autoEcoleId) {
      return res.status(403).json({ error: "Acc\xE8s non autoris\xE9." });
    }
    inMemoryStore.eleves.splice(index, 1);
    await inMemoryStore.deleteSanityDocument(id);
    if (userId) {
      inMemoryStore.users = inMemoryStore.users.filter((u) => u._id !== userId);
      await inMemoryStore.deleteSanityDocument(userId);
    }
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_ELEVE" /* MODIFICATION_ELEVE */,
      `Suppression de l'\xE9l\xE8ve code ${eleve.codeEleveUnique}`,
      aeRef
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({ success: true, message: "\xC9l\xE8ve supprim\xE9." });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/programmes-permis", authMiddleware, async (_req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const list = inMemoryStore.programmesPermis.map((prog) => {
      const moduleIds = (prog.modules || []).map((m) => getRefId(m)).filter(Boolean);
      const matchedModules = inMemoryStore.modules.filter((mod) => moduleIds.includes(mod._id));
      return {
        ...prog,
        moduleDetails: matchedModules,
        moduleCount: matchedModules.length
      };
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/programmes-permis", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { typePermis, titreProgramme, descriptionProgramme, moduleIds, isActive } = req.body || {};
    if (!typePermis || !titreProgramme) {
      return res.status(400).json({ error: "Le type de permis et le titre du programme sont obligatoires." });
    }
    const progId = `prog-permis-${Date.now()}`;
    const modulesRef = Array.isArray(moduleIds) ? moduleIds.map((id) => ({ _type: "reference", _ref: id })) : [];
    const newProg = {
      _id: progId,
      _type: "programmePermis",
      typePermis: typePermis.trim().toUpperCase(),
      titreProgramme: titreProgramme.trim(),
      descriptionProgramme: descriptionProgramme || "",
      modules: modulesRef,
      isActive: isActive !== void 0 ? isActive : true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.programmesPermis.push(newProg);
    if (Array.isArray(moduleIds)) {
      moduleIds.forEach((mId) => {
        const mod = inMemoryStore.modules.find((m) => m._id === mId);
        if (mod) {
          mod.typePermis = newProg.typePermis;
          mod.programmePermis = { _type: "reference", _ref: newProg._id };
        }
      });
    }
    await inMemoryStore.syncProgrammePermisToSanity(newProg);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "CREATION_PROGRAMME_PERMIS" /* CREATION_PROGRAMME_PERMIS */,
      `Cr\xE9ation du programme pour le permis ${newProg.typePermis} : "${newProg.titreProgramme}"`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.status(201).json(newProg);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.put("/programmes-permis/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const prog = inMemoryStore.getProgrammePermisById(id);
    if (!prog) {
      return res.status(404).json({ error: "Programme de permis introuvable." });
    }
    const { typePermis, titreProgramme, descriptionProgramme, moduleIds, isActive } = req.body || {};
    if (typePermis) prog.typePermis = typePermis.trim().toUpperCase();
    if (titreProgramme) prog.titreProgramme = titreProgramme.trim();
    if (descriptionProgramme !== void 0) prog.descriptionProgramme = descriptionProgramme;
    if (isActive !== void 0) prog.isActive = isActive;
    if (Array.isArray(moduleIds)) {
      prog.modules = moduleIds.map((mId) => ({ _type: "reference", _ref: mId }));
      moduleIds.forEach((mId) => {
        const mod = inMemoryStore.modules.find((m) => m._id === mId);
        if (mod) {
          mod.typePermis = prog.typePermis;
          mod.programmePermis = { _type: "reference", _ref: prog._id };
        }
      });
    }
    prog.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncProgrammePermisToSanity(prog);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_PROGRAMME_PERMIS" /* MODIFICATION_PROGRAMME_PERMIS */,
      `Mise \xE0 jour du programme permis ${prog.typePermis} : "${prog.titreProgramme}"`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json(prog);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.delete("/programmes-permis/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const index = inMemoryStore.programmesPermis.findIndex((p) => p._id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Programme de permis non trouv\xE9." });
    }
    const removed = inMemoryStore.programmesPermis.splice(index, 1)[0];
    await inMemoryStore.deleteSanityDocument(id);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_PROGRAMME_PERMIS" /* MODIFICATION_PROGRAMME_PERMIS */,
      `Suppression du programme permis ${removed.typePermis} ("${removed.titreProgramme}")`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({ message: "Programme de permis supprim\xE9 avec succ\xE8s.", programme: removed });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/modules/seed-permis-b", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    await inMemoryStore.seedPermisBContent();
    await inMemoryStore.seedInitialDatasetToSanity();
    const log = inMemoryStore.addLog(
      req.user.userId,
      "CREATION_PROGRAMME_PERMIS" /* CREATION_PROGRAMME_PERMIS */,
      "R\xE9initialisation et injection du programme et modules Permis B complets (10 modules, YouTube FR, mini-quizzes & quizzes finaux)."
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({
      message: "Programme et modules complets Permis B r\xE9initialis\xE9s et inject\xE9s avec succ\xE8s !",
      program: inMemoryStore.getProgrammePermisById("prog-permis-b"),
      modulesCount: inMemoryStore.modules.filter((m) => m.typePermis === "B").length
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/modules", authMiddleware, async (_req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const modulesSorted = [...inMemoryStore.modules].filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre).map((mod) => {
      const quiz = inMemoryStore.quizzes.find((q) => {
        const modRef = getRefId(q.module);
        return modRef === mod._id;
      });
      return { ...mod, quiz };
    });
    res.json(modulesSorted);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/modules", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { code, title, summary, description, learningObjectives, ordre, videoUrl, durationSeconds, tempsMinimumVisionnage, scoreMinimumQuiz, lecons } = req.body || {};
    if (!title || !videoUrl) {
      return res.status(400).json({ error: "Titre et URL vid\xE9o obligatoires." });
    }
    const newModule = {
      _id: `mod-${Date.now()}`,
      _type: "moduleFormation",
      code: code || `MOD-00${inMemoryStore.modules.length + 1}`,
      title,
      summary: summary || description || "R\xE9sum\xE9 du module de formation.",
      learningObjectives: Array.isArray(learningObjectives) ? learningObjectives : [],
      ordre: ordre || inMemoryStore.modules.length + 1,
      videoUrl,
      durationSeconds: durationSeconds || 180,
      tempsMinimumVisionnage: tempsMinimumVisionnage || Math.round((durationSeconds || 180) * 0.8),
      scoreMinimumQuiz: scoreMinimumQuiz || 70,
      isActive: true,
      lecons: Array.isArray(lecons) ? lecons : [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    inMemoryStore.modules.push(newModule);
    await inMemoryStore.syncModuleToSanity(newModule);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_MODULE" /* MODIFICATION_MODULE */,
      `Module de formation cr\xE9\xE9 : ${title}`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.status(201).json(newModule);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.put("/modules/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const mod = inMemoryStore.modules.find((m) => m._id === id);
    if (!mod) {
      return res.status(404).json({ error: "Module non trouv\xE9." });
    }
    const { code, title, summary, learningObjectives, ordre, videoUrl, durationSeconds, tempsMinimumVisionnage, scoreMinimumQuiz, isActive, lecons } = req.body || {};
    if (code !== void 0) mod.code = code;
    if (title) mod.title = title;
    if (summary !== void 0) mod.summary = summary;
    if (Array.isArray(learningObjectives)) mod.learningObjectives = learningObjectives;
    if (ordre !== void 0) mod.ordre = ordre;
    if (videoUrl) mod.videoUrl = videoUrl;
    if (durationSeconds) mod.durationSeconds = durationSeconds;
    if (tempsMinimumVisionnage !== void 0) mod.tempsMinimumVisionnage = tempsMinimumVisionnage;
    if (scoreMinimumQuiz !== void 0) mod.scoreMinimumQuiz = scoreMinimumQuiz;
    if (isActive !== void 0) mod.isActive = isActive;
    if (Array.isArray(lecons)) mod.lecons = lecons;
    mod.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncModuleToSanity(mod);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_MODULE" /* MODIFICATION_MODULE */,
      `Module de formation mis \xE0 jour : ${mod.title}`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json(mod);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.delete("/modules/:id", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { id } = req.params;
    const index = inMemoryStore.modules.findIndex((m) => m._id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Module non trouv\xE9." });
    }
    const removed = inMemoryStore.modules.splice(index, 1)[0];
    await inMemoryStore.deleteSanityDocument(id);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "MODIFICATION_MODULE" /* MODIFICATION_MODULE */,
      `Module de formation supprim\xE9 : ${removed.title}`
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({ message: "Module supprim\xE9 avec succ\xE8s.", module: removed });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/quizzes", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */), async (req, res) => {
  try {
    const { moduleId, questions, timerSeconds, scoreMinimum, title } = req.body || {};
    if (!moduleId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Module ID et liste de questions valides requis." });
    }
    const mod = inMemoryStore.modules.find((m) => m._id === moduleId);
    if (mod && scoreMinimum !== void 0) {
      mod.scoreMinimumQuiz = scoreMinimum;
    }
    let quiz = inMemoryStore.quizzes.find((q) => {
      const mRef = getRefId(q.module);
      return mRef === moduleId;
    });
    if (quiz) {
      quiz.questions = questions;
      quiz.timerSeconds = timerSeconds || 600;
      if (title) quiz.title = title;
      if (scoreMinimum !== void 0) quiz.scoreMinimum = scoreMinimum;
      quiz.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    } else {
      quiz = {
        _id: `quiz-${Date.now()}`,
        _type: "quiz",
        title: title || `Quiz - ${mod?.title || "Module"}`,
        module: { _type: "reference", _ref: moduleId },
        timerSeconds: timerSeconds || 600,
        scoreMinimum: scoreMinimum || mod?.scoreMinimumQuiz || 70,
        questions,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.quizzes.push(quiz);
    }
    if (mod) {
      mod.quiz = quiz;
    }
    await inMemoryStore.syncQuizToSanity(quiz);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/progression/:eleveId", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const { eleveId } = req.params;
    const eleve = inMemoryStore.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ error: "\xC9l\xE8ve non trouv\xE9." });
    }
    const aeRef = getRefId(eleve.autoEcole);
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && aeRef !== req.user.autoEcoleId) {
      return res.status(403).json({ error: "Acc\xE8s non autoris\xE9." });
    }
    const activeModules = inMemoryStore.getModulesForEleve(eleve._id);
    const progId = eleve.programmePermis ? typeof eleve.programmePermis === "string" ? eleve.programmePermis : eleve.programmePermis._ref || eleve.programmePermis._id : null;
    const programmePermisDetail = progId ? inMemoryStore.getProgrammePermisById(progId) : null;
    const eleveProgressions = inMemoryStore.progressions.filter((p) => {
      const elRef = getRefId(p.eleve);
      return elRef === eleve._id;
    });
    let previousValidated = true;
    const structuredProgression = activeModules.map((mod) => {
      const quiz = inMemoryStore.quizzes.find((q) => {
        const mRef = getRefId(q.module);
        return mRef === mod._id;
      });
      const prog = eleveProgressions.find((p) => {
        const mRef = getRefId(p.module);
        return mRef === mod._id;
      });
      const lecons = mod.lecons && mod.lecons.length > 0 ? mod.lecons : [
        {
          _id: `lec-${mod._id}-default`,
          _type: "lecon",
          title: mod.title,
          ordre: 1,
          description: mod.summary || "Contenu p\xE9dagogique principal.",
          videoUrl: mod.videoUrl,
          durationSeconds: mod.durationSeconds,
          tempsMinimumVisionnageSeconds: mod.tempsMinimumVisionnage,
          hasInlineQuiz: false
        }
      ];
      const leconProgressionsMap = prog?.leconProgressions || {};
      let previousLessonCompleted = true;
      const leconStatuses = lecons.map((lec, lIdx) => {
        const lecProg = leconProgressionsMap[lec._id];
        const videoWatchTimeSeconds = lecProg?.videoWatchTimeSeconds ?? (prog?.videoWatchTimeSeconds || 0);
        const hasCompletedVideo = videoWatchTimeSeconds >= lec.tempsMinimumVisionnageSeconds || (prog?.hasCompletedVideo ?? false);
        const inlineQuizScore = lecProg?.inlineQuizScore ?? null;
        const isInlineQuizPassed = lec.hasInlineQuiz ? lecProg?.isInlineQuizPassed ?? false : true;
        const isCompleted = hasCompletedVideo && isInlineQuizPassed;
        const isLessonLocked = lIdx > 0 ? !previousLessonCompleted : false;
        if (!isCompleted) {
          previousLessonCompleted = false;
        }
        return {
          lecon: lec,
          videoWatchTimeSeconds,
          hasCompletedVideo,
          inlineQuizScore,
          isInlineQuizPassed,
          isCompleted,
          isLessonLocked
        };
      });
      const areAllLessonsCompleted = leconStatuses.every((ls) => ls.isCompleted);
      const isLocked = !previousValidated;
      const isVideoTimeCompleted = areAllLessonsCompleted;
      const isQuizUnlocked = areAllLessonsCompleted && !isLocked;
      const isValidated = prog ? prog.isModuleValidated : false;
      if (!isValidated) {
        previousValidated = false;
      }
      return {
        module: mod,
        quiz,
        lecons: leconStatuses,
        progression: prog || {
          videoWatchTimeSeconds: 0,
          hasCompletedVideo: false,
          quizScore: 0,
          quizAttemptCount: 0,
          isModuleValidated: false
        },
        isLocked,
        areAllLessonsCompleted,
        isVideoTimeCompleted,
        isQuizUnlocked,
        isValidated
      };
    });
    res.json({
      eleve,
      programmePermisDetail,
      structuredProgression
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/progression/watch-time", authMiddleware, requireRoles("ELEVE" /* ELEVE */), async (req, res) => {
  try {
    const { eleveId, moduleId, leconId, watchSeconds, isFinished } = req.body || {};
    if (!eleveId || !moduleId || typeof watchSeconds !== "number") {
      return res.status(400).json({ error: "Donn\xE9es de visionnage invalides." });
    }
    const eleve = inMemoryStore.getEleveById(eleveId);
    const mod = inMemoryStore.modules.find((m) => m._id === moduleId);
    if (!eleve || !mod) {
      return res.status(404).json({ error: "\xC9l\xE8ve ou module introuvable." });
    }
    let prog = inMemoryStore.progressions.find((p) => {
      const elRef = getRefId(p.eleve);
      const mRef = getRefId(p.module);
      return elRef === eleve._id && mRef === mod._id;
    });
    if (!prog) {
      prog = {
        _id: `prog-${Date.now()}`,
        _type: "progressionModule",
        eleve: { _type: "reference", _ref: eleve._id },
        module: { _type: "reference", _ref: mod._id },
        videoWatchTimeSeconds: watchSeconds,
        hasCompletedVideo: false,
        leconProgressions: {},
        quizScore: 0,
        quizAttemptCount: 0,
        isModuleValidated: false,
        lastActivityAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.progressions.push(prog);
    }
    if (!prog.leconProgressions) prog.leconProgressions = {};
    const targetLecId = leconId || (mod.lecons?.[0]?._id ?? `lec-${mod._id}-default`);
    const targetLec = mod.lecons?.find((l) => l._id === targetLecId) || {
      _id: targetLecId,
      tempsMinimumVisionnageSeconds: mod.tempsMinimumVisionnage,
      hasInlineQuiz: false
    };
    const prevLecProg = prog.leconProgressions[targetLecId] || {
      leconId: targetLecId,
      videoWatchTimeSeconds: 0,
      hasCompletedVideo: false,
      inlineQuizScore: null,
      isInlineQuizPassed: false,
      isCompleted: false
    };
    const reqWatchSeconds = isFinished ? targetLec.tempsMinimumVisionnageSeconds : watchSeconds;
    const newWatchTime = Math.max(prevLecProg.videoWatchTimeSeconds, reqWatchSeconds);
    const hasCompletedLecVideo = isFinished || newWatchTime >= targetLec.tempsMinimumVisionnageSeconds;
    const isLecCompleted = hasCompletedLecVideo && (!targetLec.hasInlineQuiz || (prevLecProg.isInlineQuizPassed ?? false));
    prog.leconProgressions[targetLecId] = {
      ...prevLecProg,
      videoWatchTimeSeconds: newWatchTime,
      hasCompletedVideo: hasCompletedLecVideo,
      isCompleted: isLecCompleted
    };
    prog.videoWatchTimeSeconds = Math.max(prog.videoWatchTimeSeconds, newWatchTime);
    prog.lastActivityAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncProgressionToSanity(prog);
    res.json({
      progression: prog,
      leconProgression: prog.leconProgressions[targetLecId],
      isLessonVideoCompleted: hasCompletedLecVideo
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/progression/submit-lesson-quiz", authMiddleware, requireRoles("ELEVE" /* ELEVE */), async (req, res) => {
  try {
    const { eleveId, moduleId, leconId, userAnswers } = req.body || {};
    const eleve = inMemoryStore.getEleveById(eleveId);
    const mod = inMemoryStore.modules.find((m) => m._id === moduleId);
    if (!eleve || !mod) {
      return res.status(404).json({ error: "\xC9l\xE8ve ou module introuvable." });
    }
    const lecon = mod.lecons?.find((l) => l._id === leconId);
    if (!lecon || !lecon.inlineQuiz || lecon.inlineQuiz.length === 0) {
      return res.status(400).json({ error: "Aucun mini-quiz trouv\xE9 pour cette le\xE7on." });
    }
    let correctCount = 0;
    lecon.inlineQuiz.forEach((q, idx) => {
      if (userAnswers && userAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    const totalQuestions = lecon.inlineQuiz.length;
    const scorePercentage = Math.round(correctCount / totalQuestions * 100);
    const passed = scorePercentage >= 70;
    let prog = inMemoryStore.progressions.find((p) => {
      const elRef = getRefId(p.eleve);
      const mRef = getRefId(p.module);
      return elRef === eleve._id && mRef === mod._id;
    });
    if (!prog) {
      prog = {
        _id: `prog-${Date.now()}`,
        _type: "progressionModule",
        eleve: { _type: "reference", _ref: eleve._id },
        module: { _type: "reference", _ref: mod._id },
        videoWatchTimeSeconds: 0,
        hasCompletedVideo: false,
        leconProgressions: {},
        quizScore: 0,
        quizAttemptCount: 0,
        isModuleValidated: false,
        lastActivityAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.progressions.push(prog);
    }
    if (!prog.leconProgressions) prog.leconProgressions = {};
    const prevLecProg = prog.leconProgressions[leconId] || {
      leconId,
      videoWatchTimeSeconds: lecon.tempsMinimumVisionnageSeconds,
      hasCompletedVideo: true,
      isCompleted: false
    };
    prog.leconProgressions[leconId] = {
      ...prevLecProg,
      inlineQuizScore: scorePercentage,
      isInlineQuizPassed: passed,
      isCompleted: prevLecProg.hasCompletedVideo && passed
    };
    prog.lastActivityAt = (/* @__PURE__ */ new Date()).toISOString();
    await inMemoryStore.syncProgressionToSanity(prog);
    res.json({
      scorePercentage,
      correctCount,
      totalQuestions,
      passed,
      leconProgression: prog.leconProgressions[leconId]
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/progression/submit-quiz", authMiddleware, requireRoles("ELEVE" /* ELEVE */), async (req, res) => {
  try {
    const { eleveId, moduleId, userAnswers } = req.body || {};
    const eleve = inMemoryStore.getEleveById(eleveId);
    const mod = inMemoryStore.modules.find((m) => m._id === moduleId);
    if (!eleve || !mod) {
      return res.status(404).json({ error: "\xC9l\xE8ve ou module introuvable." });
    }
    const quiz = inMemoryStore.quizzes.find((q) => {
      const mRef = getRefId(q.module);
      return mRef === mod._id;
    });
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return res.status(400).json({ error: "Aucun quiz associ\xE9 \xE0 ce module." });
    }
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers && userAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    const totalQuestions = quiz.questions.length;
    const scorePercentage = Math.round(correctCount / totalQuestions * 100);
    const passed = scorePercentage >= mod.scoreMinimumQuiz;
    let prog = inMemoryStore.progressions.find((p) => {
      const elRef = getRefId(p.eleve);
      const mRef = getRefId(p.module);
      return elRef === eleve._id && mRef === mod._id;
    });
    if (!prog) {
      prog = {
        _id: `prog-${Date.now()}`,
        _type: "progressionModule",
        eleve: { _type: "reference", _ref: eleve._id },
        module: { _type: "reference", _ref: mod._id },
        videoWatchTimeSeconds: mod.tempsMinimumVisionnage,
        hasCompletedVideo: true,
        quizScore: scorePercentage,
        quizAttemptCount: 1,
        isModuleValidated: passed,
        lastActivityAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.progressions.push(prog);
    } else {
      prog.quizAttemptCount += 1;
      prog.quizScore = Math.max(prog.quizScore, scorePercentage);
      if (passed) {
        prog.isModuleValidated = true;
      }
      prog.lastActivityAt = (/* @__PURE__ */ new Date()).toISOString();
    }
    const studentModules = inMemoryStore.getModulesForEleve(eleve._id);
    const totalProgramModules = Math.max(1, studentModules.length);
    const allEleveProg = inMemoryStore.progressions.filter((p) => {
      const elRef = getRefId(p.eleve);
      const mRef = getRefId(p.module);
      return elRef === eleve._id && p.isModuleValidated && studentModules.some((sm) => sm._id === mRef);
    });
    const validatedCount = allEleveProg.length;
    const overallPercentage = Math.round(validatedCount / totalProgramModules * 100);
    eleve.progressionGlobal = Math.min(100, overallPercentage);
    const userObj = inMemoryStore.getUserById(eleve.user);
    const aeRef = getRefId(eleve.autoEcole);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "QUIZ_PASSE" /* QUIZ_PASSE */,
      `\xC9l\xE8ve ${userObj?.name || ""} (${eleve.codeEleveUnique}) a pass\xE9 le Quiz "${mod.title}" : Score ${scorePercentage}% (${passed ? "R\xC9USSI" : "\xC9CHOU\xC9"})`,
      aeRef
    );
    await inMemoryStore.syncLogToSanity(log);
    await inMemoryStore.syncProgressionToSanity(prog);
    if (userObj) {
      await inMemoryStore.syncEleveToSanity(eleve, userObj);
    }
    let certificatRecord;
    if (overallPercentage >= 100) {
      let cert = inMemoryStore.certificats.find((c) => {
        const elRef = getRefId(c.eleve);
        return elRef === eleve._id;
      });
      if (!cert) {
        cert = {
          _id: `cert-${Date.now()}`,
          _type: "certificat",
          eleve: { _type: "reference", _ref: eleve._id },
          autoEcole: { _type: "reference", _ref: aeRef },
          dateEmission: (/* @__PURE__ */ new Date()).toISOString(),
          certificateCode: `CERT-${(/* @__PURE__ */ new Date()).getFullYear()}-MATOA-${Math.floor(1e4 + Math.random() * 9e4)}`,
          status: "GENERE" /* GENERE */,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        inMemoryStore.certificats.push(cert);
        const logCert = inMemoryStore.addLog(
          req.user.userId,
          "CERTIFICAT_GENERE" /* CERTIFICAT_GENERE */,
          `Certificat Officiel Matoa g\xE9n\xE9r\xE9 pour l'\xE9l\xE8ve ${userObj?.name || ""} (${cert.certificateCode})`,
          aeRef
        );
        await inMemoryStore.syncLogToSanity(logCert);
      }
      certificatRecord = cert;
      await inMemoryStore.syncCertificatToSanity(cert);
    }
    res.json({
      scorePercentage,
      correctCount,
      totalQuestions,
      passed,
      isModuleValidated: prog.isModuleValidated,
      overallProgression: eleve.progressionGlobal,
      certificatRecord
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/certificats", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    let targetEleves = [...inMemoryStore.eleves];
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */) {
      targetEleves = targetEleves.filter((e) => getRefId(e.autoEcole) === req.user?.autoEcoleId);
    }
    const enrichedCertificates = targetEleves.map((eleve) => {
      const user = inMemoryStore.getUserById(eleve.user);
      const ae = inMemoryStore.getAutoEcoleById(eleve.autoEcole);
      const cert = inMemoryStore.certificats.find((c) => getRefId(c.eleve) === eleve._id);
      return {
        eleve,
        user: user ? { _id: user._id, name: user.name, email: user.email, phone: user.phone } : null,
        autoEcole: ae ? { _id: ae._id, name: ae.name, codeAutoEcoleUnique: ae.codeAutoEcoleUnique, couleursTheme: ae.couleursTheme, logo: ae.logo, slogan: ae.slogan } : null,
        certificat: cert || null,
        isEligible: eleve.progressionGlobal >= 100 && eleve.formationActive
      };
    });
    res.json(enrichedCertificates);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/certificats/generate", authMiddleware, requireRoles("SUPER_ADMIN" /* SUPER_ADMIN */, "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */), async (req, res) => {
  try {
    const { eleveId } = req.body || {};
    const eleve = inMemoryStore.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ error: "\xC9l\xE8ve non trouv\xE9." });
    }
    const aeRef = getRefId(eleve.autoEcole);
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */ && aeRef !== req.user.autoEcoleId) {
      return res.status(403).json({ error: "Acc\xE8s non autoris\xE9." });
    }
    let cert = inMemoryStore.certificats.find((c) => getRefId(c.eleve) === eleve._id);
    if (!cert) {
      cert = {
        _id: `cert-${Date.now()}`,
        _type: "certificat",
        eleve: { _type: "reference", _ref: eleve._id },
        autoEcole: { _type: "reference", _ref: aeRef },
        dateEmission: (/* @__PURE__ */ new Date()).toISOString(),
        certificateCode: `CERT-${(/* @__PURE__ */ new Date()).getFullYear()}-MATOA-${Math.floor(1e4 + Math.random() * 9e4)}`,
        status: "GENERE" /* GENERE */,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      inMemoryStore.certificats.push(cert);
    } else {
      cert.status = "GENERE" /* GENERE */;
      cert.dateEmission = (/* @__PURE__ */ new Date()).toISOString();
    }
    await inMemoryStore.syncCertificatToSanity(cert);
    const userObj = inMemoryStore.getUserById(eleve.user);
    const log = inMemoryStore.addLog(
      req.user.userId,
      "CERTIFICAT_GENERE" /* CERTIFICAT_GENERE */,
      `G\xE9n\xE9ration manuelle du certificat pour l'\xE9l\xE8ve ${userObj?.name || ""} (${cert.certificateCode})`,
      aeRef
    );
    await inMemoryStore.syncLogToSanity(log);
    res.json({ success: true, certificat: cert });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/certificats/:eleveId", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const { eleveId } = req.params;
    const eleve = inMemoryStore.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ error: "\xC9l\xE8ve introuvable." });
    }
    const cert = inMemoryStore.certificats.find((c) => {
      const elRef = getRefId(c.eleve);
      return elRef === eleve._id;
    });
    const user = inMemoryStore.getUserById(eleve.user);
    const ae = inMemoryStore.getAutoEcoleById(eleve.autoEcole);
    res.json({
      certificat: cert || null,
      eleve,
      user,
      autoEcole: ae,
      isEligible: eleve.progressionGlobal >= 100 && eleve.formationActive
    });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.post("/certificats/download", authMiddleware, async (req, res) => {
  try {
    const { eleveId } = req.body || {};
    const eleve = inMemoryStore.getEleveById(eleveId);
    if (!eleve) {
      return res.status(404).json({ error: "\xC9l\xE8ve non trouv\xE9." });
    }
    let cert = inMemoryStore.certificats.find((c) => {
      const elRef = getRefId(c.eleve);
      return elRef === eleve._id;
    });
    if (cert) {
      cert.status = "TELECHARGE" /* TELECHARGE */;
      await inMemoryStore.syncCertificatToSanity(cert);
      const user = inMemoryStore.getUserById(eleve.user);
      const aeRef = getRefId(eleve.autoEcole);
      const log = inMemoryStore.addLog(
        req.user.userId,
        "CERTIFICAT_TELECHARGE" /* CERTIFICAT_TELECHARGE */,
        `Certificat t\xE9l\xE9charg\xE9 pour l'\xE9l\xE8ve ${user?.name || ""} (${cert.certificateCode})`,
        aeRef
      );
      await inMemoryStore.syncLogToSanity(log);
    }
    res.json({ success: true, certificat: cert });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/logs", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    let logs = [...inMemoryStore.logs];
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */) {
      logs = logs.filter((l) => {
        const aeRef = getRefId(l.autoEcole);
        return aeRef === req.user?.autoEcoleId;
      });
    } else if (req.user?.role === "ELEVE" /* ELEVE */) {
      logs = logs.filter((l) => {
        const uRef = getRefId(l.actorUser);
        return uRef === req.user?.userId;
      });
    }
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
apiRouter.get("/stats", authMiddleware, async (req, res) => {
  try {
    await inMemoryStore.ensureSynced();
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (req.user?.role === "SUPER_ADMIN" /* SUPER_ADMIN */) {
      const totalSchools = inMemoryStore.autoEcoles.length;
      const activeSchools = inMemoryStore.autoEcoles.filter((a) => a.isActive).length;
      const totalStudents = inMemoryStore.eleves.length;
      const activeStudents = inMemoryStore.eleves.filter(
        (e) => e.formationActive && !e.isBlocked && e.dateFinFormation >= todayStr
      ).length;
      const completedStudents = inMemoryStore.eleves.filter((e) => e.progressionGlobal >= 100).length;
      const avgProgress = totalStudents > 0 ? Math.round(inMemoryStore.eleves.reduce((acc, curr) => acc + curr.progressionGlobal, 0) / totalStudents) : 0;
      const schoolsProgression = inMemoryStore.autoEcoles.map((ae) => {
        const aeStudents = inMemoryStore.eleves.filter((e) => getRefId(e.autoEcole) === ae._id);
        const aeAvg = aeStudents.length > 0 ? Math.round(aeStudents.reduce((acc, c) => acc + c.progressionGlobal, 0) / aeStudents.length) : 0;
        const aeCompleted = aeStudents.filter((e) => e.progressionGlobal >= 100).length;
        return {
          schoolName: ae.name,
          studentCount: aeStudents.length,
          avgProgress: aeAvg,
          completedCount: aeCompleted
        };
      });
      const activeModules = inMemoryStore.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
      const modulesCompletion = activeModules.map((mod) => {
        const validatedCount = inMemoryStore.progressions.filter((p) => {
          const mRef = getRefId(p.module);
          return mRef === mod._id && p.isModuleValidated;
        }).length;
        const completionRate = totalStudents > 0 ? Math.round(validatedCount / totalStudents * 100) : 0;
        return {
          moduleTitle: mod.title,
          validatedCount,
          totalStudents,
          completionRate
        };
      });
      const progressionDistribution = [
        { range: "0 - 25%", count: inMemoryStore.eleves.filter((e) => e.progressionGlobal <= 25).length },
        {
          range: "26 - 50%",
          count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 25 && e.progressionGlobal <= 50).length
        },
        {
          range: "51 - 75%",
          count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 50 && e.progressionGlobal <= 75).length
        },
        {
          range: "76 - 99%",
          count: inMemoryStore.eleves.filter((e) => e.progressionGlobal > 75 && e.progressionGlobal < 100).length
        },
        { range: "100% Certifi\xE9", count: inMemoryStore.eleves.filter((e) => e.progressionGlobal >= 100).length }
      ];
      const months = ["Janv", "F\xE9vr", "Mars", "Avril", "Mai", "Juin", "Juil"];
      const enrollmentTrends = months.map((m, idx) => ({
        month: m,
        inscriptions: Math.max(1, (idx + 1) * 2 + totalStudents % (idx + 2)),
        certifications: Math.max(0, Math.floor((idx + 1) * completedStudents / 7))
      }));
      return res.json({
        totalSchools,
        activeSchools,
        totalStudents,
        activeStudents,
        completedStudents,
        avgProgress,
        schoolsProgression,
        modulesCompletion,
        progressionDistribution,
        enrollmentTrends
      });
    }
    if (req.user?.role === "AUTO_ECOLE_ADMIN" /* AUTO_ECOLE_ADMIN */) {
      const aeId = req.user.autoEcoleId;
      const schoolStudents = inMemoryStore.eleves.filter((e) => {
        const aeRef = getRefId(e.autoEcole);
        return aeRef === aeId;
      });
      const totalStudents = schoolStudents.length;
      const activeStudents = schoolStudents.filter(
        (e) => e.formationActive && !e.isBlocked && e.dateFinFormation >= todayStr
      ).length;
      const completedStudents = schoolStudents.filter((e) => e.progressionGlobal >= 100).length;
      const expiredStudents = schoolStudents.filter((e) => e.dateFinFormation < todayStr).length;
      const blockedStudents = schoolStudents.filter((e) => e.isBlocked).length;
      const avgProgress = totalStudents > 0 ? Math.round(schoolStudents.reduce((acc, curr) => acc + curr.progressionGlobal, 0) / totalStudents) : 0;
      const activeModules = inMemoryStore.modules.filter((m) => m.isActive).sort((a, b) => a.ordre - b.ordre);
      const studentIds = new Set(schoolStudents.map((s) => s._id));
      const modulesCompletion = activeModules.map((mod) => {
        const validatedCount = inMemoryStore.progressions.filter((p) => {
          const mRef = getRefId(p.module);
          const elRef = getRefId(p.eleve);
          return mRef === mod._id && studentIds.has(elRef) && p.isModuleValidated;
        }).length;
        const completionRate = totalStudents > 0 ? Math.round(validatedCount / totalStudents * 100) : 0;
        return {
          moduleTitle: mod.title,
          validatedCount,
          totalStudents,
          completionRate
        };
      });
      const progressionDistribution = [
        { range: "0 - 25%", count: schoolStudents.filter((e) => e.progressionGlobal <= 25).length },
        {
          range: "26 - 50%",
          count: schoolStudents.filter((e) => e.progressionGlobal > 25 && e.progressionGlobal <= 50).length
        },
        {
          range: "51 - 75%",
          count: schoolStudents.filter((e) => e.progressionGlobal > 50 && e.progressionGlobal <= 75).length
        },
        {
          range: "76 - 99%",
          count: schoolStudents.filter((e) => e.progressionGlobal > 75 && e.progressionGlobal < 100).length
        },
        { range: "100% Valid\xE9", count: schoolStudents.filter((e) => e.progressionGlobal >= 100).length }
      ];
      const statusBreakdown = [
        { status: "Actifs en cours", count: activeStudents, fill: "#10b981" },
        { status: "Certifi\xE9s (100%)", count: completedStudents, fill: "#f59e0b" },
        { status: "P\xE9riode Expir\xE9e", count: expiredStudents, fill: "#ef4444" },
        { status: "Acc\xE8s Bloqu\xE9", count: blockedStudents, fill: "#6b7280" }
      ];
      const months = ["Janv", "F\xE9vr", "Mars", "Avril", "Mai", "Juin", "Juil"];
      const enrollmentTrends = months.map((m, idx) => ({
        month: m,
        inscriptions: Math.max(1, Math.floor(totalStudents * (idx + 1) / 7))
      }));
      return res.json({
        totalStudents,
        activeStudents,
        completedStudents,
        expiredStudents,
        avgProgress,
        modulesCompletion,
        progressionDistribution,
        statusBreakdown,
        enrollmentTrends
      });
    }
    res.status(403).json({ error: "R\xF4le non pris en charge pour les statistiques." });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Erreur serveur" });
  }
});
app.use("/api", apiRouter);
app.use("/", apiRouter);
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `Route API introuvable : ${req.method} ${req.originalUrl || req.url}` });
});
app.use((err, _req, res, next) => {
  console.error("Erreur API serveur :", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({ error: err?.message || "Erreur interne du serveur" });
});
var serverApp_default = app;
export {
  apiRouter,
  app,
  serverApp_default as default
};
