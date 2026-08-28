// src/serverApp.ts
import express from "express";

// src/lib/sanityStore.ts
import { createClient } from "@sanity/client";

// src/lib/permisBData.ts
var PERMIS_B_PROGRAMME = {
  _id: "prog-permis-b",
  _type: "programmePermis",
  typePermis: "B",
  titreProgramme: "Programme complet Permis B \u2013 Conduite v\xE9hicule l\xE9ger",
  descriptionProgramme: `Ce programme couvre l'ensemble des connaissances th\xE9oriques n\xE9cessaires pour pr\xE9parer le Permis B (v\xE9hicules l\xE9gers). Il permet \xE0 l'\xE9l\xE8ve de comprendre la voiture qu'il va conduire, de ma\xEEtriser les r\xE8gles de circulation, de lire et interpr\xE9ter la signalisation, de g\xE9rer les priorit\xE9s aux intersections, de respecter les limitations de vitesse et les distances de s\xE9curit\xE9, d'anticiper les risques (alcool, fatigue, m\xE9t\xE9o), et d'adopter un comportement responsable en tant que conducteur. Le programme se termine par des tests blancs simulant l'examen th\xE9orique officiel du Permis B.`,
  modules: ["mod-1", "mod-2", "mod-3", "mod-4", "mod-5", "mod-6", "mod-7", "mod-8", "mod-9", "mod-10", "mod-11", "mod-12", "mod-13", "mod-14", "mod-15"],
  isActive: true,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z"
};
var PERMIS_B_MODULES = [
  // -------------------------------------------------------------
  // MODULE 1 : Comprendre le véhicule (voiture)
  // -------------------------------------------------------------
  {
    _id: "mod-1",
    _type: "moduleFormation",
    code: "MOD-001",
    title: "Module 1 : Comprendre le v\xE9hicule (voiture)",
    summary: "Ce module pr\xE9sente les \xE9l\xE9ments principaux d'une voiture. L'\xE9l\xE8ve d\xE9couvre le vocabulaire de base (parties du v\xE9hicule), le poste de conduite et les organes de commande, le tableau de bord et ses t\xE9moins, ainsi que les \xE9quipements de s\xE9curit\xE9 (ceintures, airbags, ABS, pneus). L'objectif est que l'\xE9l\xE8ve comprenne concr\xE8tement l'outil qu'il va conduire, sait o\xF9 se trouvent les commandes essentielles et ce que signifient les principaux voyants, afin de manipuler le v\xE9hicule en s\xE9curit\xE9 d\xE8s les premi\xE8res heures de conduite.",
    learningObjectives: [
      "Identifier et nommer les parties principales de la carrosserie, du moteur et des essieux",
      "Ma\xEEtriser l'installation au poste de conduite et l'ergonomie des commandes",
      "Interpr\xE9ter instantan\xE9ment les t\xE9moins et voyants d'alerte du tableau de bord",
      "Comprendre l'utilit\xE9 des syst\xE8mes de s\xE9curit\xE9 active et passive (ceintures, ABS, airbags, pneus)"
    ],
    ordre: 1,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g&list=PLsr6X_3CMxXtgXoK8DzOY6wNeNpf7Sdgu",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-1-1",
        _type: "lecon",
        title: "Le\xE7on 1.1 \u2013 Les parties principales de la voiture",
        ordre: 1,
        description: "Dans cette le\xE7on, l'\xE9l\xE8ve d\xE9couvre les grandes parties d'un v\xE9hicule l\xE9ger : carrosserie, moteur, habitacle, coffre, essieux, roues. La le\xE7on explique la fonction de chaque partie, le vocabulaire exact, et donne des exemples concrets (o\xF9 se trouve le moteur, pourquoi la carrosserie prot\xE8ge les occupants, etc.). L'\xE9l\xE8ve apprend \xE0 nommer correctement ce qu'il voit sur le v\xE9hicule afin de mieux comprendre les instructions des moniteurs et des documents officiels.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g&list=PLsr6X_3CMxXtgXoK8DzOY6wNeNpf7Sdgu",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "O\xF9 se situe g\xE9n\xE9ralement le moteur de la grande majorit\xE9 des v\xE9hicules l\xE9gers ?",
            options: ["Dans le coffre arri\xE8re", "Sous le capot avant", "Sous les si\xE8ges passagers", "Dans les porti\xE8res"],
            correctOptionIndex: 1,
            explanation: "Le moteur thermique ou \xE9lectrique est g\xE9n\xE9ralement implant\xE9 sous le capot \xE0 l'avant du v\xE9hicule."
          },
          {
            questionText: "Quelle est la fonction essentielle de la carrosserie moderne d'un v\xE9hicule ?",
            options: ["Uniquement un r\xF4le esth\xE9tique", "Prot\xE9ger les passagers en absorbant l'\xE9nergie des chocs", "Augmenter le poids de la voiture", "Conserver le carburant au frais"],
            correctOptionIndex: 1,
            explanation: "La structure d\xE9formable de la carrosserie absorbe l'\xE9nergie d'un impact pour prot\xE9ger l'habitacle."
          },
          {
            questionText: "Comment appelle-t-on la partie de la voiture o\xF9 s'installent le conducteur et ses passagers ?",
            options: ["Le ch\xE2ssis", "L'habitacle", "Le compartiment moteur", "La calandre"],
            correctOptionIndex: 1,
            explanation: "L'habitacle est l'espace int\xE9rieur d\xE9di\xE9 au confort et \xE0 la s\xE9curit\xE9 du conducteur et des passagers."
          },
          {
            questionText: "Que relie un essieu sur un v\xE9hicule automobile ?",
            options: ["Le volant aux r\xE9troviseurs", "Les roues oppos\xE9es d'un m\xEAme train (avant ou arri\xE8re)", "Les phares \xE0 la batterie", "La bo\xEEte de vitesse au pot d'\xE9chappement"],
            correctOptionIndex: 1,
            explanation: "Un essieu est un axe transversal supportant les roues \xE0 ses extr\xE9mit\xE9s."
          },
          {
            questionText: "Pourquoi est-il indispensable de conna\xEEtre le vocabulaire technique des parties du v\xE9hicule ?",
            options: ["Pour obtenir une r\xE9duction d'assurance", "Pour appliquer pr\xE9cis\xE9ment les v\xE9rifications de l'examen et les consignes du moniteur", "Pour pouvoir d\xE9monter le moteur soi-m\xEAme", "Ce n'est pas obligatoire pour l'examen"],
            correctOptionIndex: 1,
            explanation: "La ma\xEEtrise du vocabulaire est essentielle lors des v\xE9rifications int\xE9rieures/ext\xE9rieures de l'examen pratique."
          }
        ]
      },
      {
        _id: "lec-1-2",
        _type: "lecon",
        title: "Le\xE7on 1.2 \u2013 Le poste de conduite et les commandes",
        ordre: 2,
        description: "Cette le\xE7on pr\xE9sente le poste de conduite : volant, p\xE9dales (embrayage, frein, acc\xE9l\xE9rateur), levier de vitesses, frein \xE0 main, clignotants, essuie\u2011glaces, r\xE9glage des si\xE8ges et des r\xE9troviseurs. L'\xE9l\xE8ve apprend \xE0 reconna\xEEtre chaque commande, son r\xF4le, et les bonnes pratiques de r\xE9glage avant de d\xE9marrer (position du si\xE8ge, ceinture, angles de vision). L'objectif est qu'il puisse s'installer correctement et manipuler les commandes de base en s\xE9curit\xE9.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY&list=PL-kDknubECW4-gEwpco43ofPC5b4ptcYx",
        durationSeconds: 660,
        tempsMinimumVisionnageSeconds: 528,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Dans quel ordre pr\xE9cis devez-vous effectuer les r\xE9glages en vous installant au poste de conduite ?",
            options: ["R\xE9troviseurs, puis si\xE8ge, puis ceinture", "Si\xE8ge, r\xE9troviseurs, volant puis ceinture de s\xE9curit\xE9", "Ceinture en premier, puis si\xE8ge", "Peu importe l'ordre"],
            correctOptionIndex: 1,
            explanation: "On r\xE8gle d'abord sa position de conduite (si\xE8ge/dossier/volant), puis les r\xE9troviseurs, et enfin la ceinture."
          },
          {
            questionText: "Sur une voiture \xE0 bo\xEEte manuelle, avec quel pied doit-on actionner la p\xE9dale d'embrayage (\xE0 gauche) ?",
            options: ["Le pied gauche uniquement", "Le pied droit", "Les deux pieds en m\xEAme temps", "La main gauche"],
            correctOptionIndex: 0,
            explanation: "Le pied gauche est exclusivement r\xE9serv\xE9 \xE0 la p\xE9dale d'embrayage."
          },
          {
            questionText: "\xC0 quoi sert le levier de frein \xE0 main (ou frein de stationnement) ?",
            options: ["\xC0 ralentir dans les virages serr\xE9s", "\xC0 maintenir le v\xE9hicule totalement immobilis\xE9 \xE0 l'arr\xEAt ou au stationnement", "\xC0 passer la marche arri\xE8re", "\xC0 augmenter la vitesse"],
            correctOptionIndex: 1,
            explanation: "Le frein \xE0 main immobilise durablement le v\xE9hicule \xE0 l'arr\xEAt ou en stationnement."
          },
          {
            questionText: "Comment r\xE9gler correctement les r\xE9troviseurs ext\xE9rieurs ?",
            options: ["Pour voir uniquement l'int\xE9rieur de sa voiture", "Pour apercevoir une tr\xE8s l\xE9g\xE8re poign\xE9e de la porti\xE8re arri\xE8re et maximiser la vision vers l'arri\xE8re", "Vers le ciel", "Vers les roues uniquement"],
            correctOptionIndex: 1,
            explanation: "Apercevoir un bord de la carrosserie sert de rep\xE8re visuel tout en r\xE9duisant l'angle mort au maximum."
          },
          {
            questionText: "Quelle doit \xEAtre la position id\xE9ale des mains sur le volant en conduite normale ?",
            options: ["\xC0 12h00 une seule main", "\xC0 9h15 ou 10h10", "En bas du volant \xE0 6h00", "Les bras crois\xE9s"],
            correctOptionIndex: 1,
            explanation: "La position 9h15 ou 10h10 assure un contr\xF4le optimal du volant et une r\xE9action rapide en cas d'urgence."
          }
        ]
      },
      {
        _id: "lec-1-3",
        _type: "lecon",
        title: "Le\xE7on 1.3 \u2013 Tableaux de bord, voyants et t\xE9moins",
        ordre: 3,
        description: "La le\xE7on explique les principaux voyants du tableau de bord : feux, clignotants, niveau de carburant, pression d'huile, temp\xE9rature moteur, t\xE9moins d'alerte (freins, batterie, etc.). L'\xE9l\xE8ve apprend \xE0 reconna\xEEtre les pictogrammes, \xE0 distinguer les voyants d'information des voyants d'alerte, et \xE0 comprendre ce qu'il doit faire lorsqu'un voyant s'allume (v\xE9rification, arr\xEAt, appel au professionnel).",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g&list=PLsr6X_3CMxXtgXoK8DzOY6wNeNpf7Sdgu",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Que signifie l'allumage d'un t\xE9moin lumineux de couleur ROUGE au tableau de bord en roulant ?",
            options: ["Une simple information de confort", "Un danger grave : arr\xEAt imm\xE9diat obligatoire en s\xE9curit\xE9", "Le fonctionnement normal des clignotants", "Une incitation \xE0 acc\xE9l\xE9rer"],
            correctOptionIndex: 1,
            explanation: "Les voyants rouges signalent une urgence absolue exigeant l'arr\xEAt imm\xE9diat du v\xE9hicule."
          },
          {
            questionText: "De quelle couleur sont g\xE9n\xE9ralement les t\xE9moins d'\xE9clairage (feux de croisement, feux de position) ?",
            options: ["Rouge ou violet", "Vert ou bleu", "Jaune uniquement", "Noir"],
            correctOptionIndex: 1,
            explanation: "Les t\xE9moins de feux de position et de croisement sont verts; le t\xE9moin de feux de route est bleu."
          },
          {
            questionText: "Si le voyant de pression d'huile moteur (voyant rouge en forme de burette) s'allume en roulant, vous devez :",
            options: ["Continuer jusqu'\xE0 la maison", "Remettre de l'essence \xE0 la prochaine station", "Vous arr\xEAter imm\xE9diatement en s\xE9curit\xE9 et couper le moteur", "Allumer la climatisation"],
            correctOptionIndex: 2,
            explanation: "Un manque de pression d'huile risque de d\xE9truire le moteur en quelques secondes : l'arr\xEAt imm\xE9diat est imp\xE9ratif."
          },
          {
            questionText: "Quelle couleur caract\xE9rise un voyant d'avertissement ou de dysfonctionnement non imm\xE9diat (ex: niveau lave-glace, usure plaquettes) ?",
            options: ["Rouge clignotant", "Orange / Jaune", "Bleu vif", "Vert clair"],
            correctOptionIndex: 1,
            explanation: "L'orange ou le jaune alerte d'un d\xE9faut \xE0 faire contr\xF4ler rapidement sans n\xE9cessiter un arr\xEAt d'urgence."
          },
          {
            questionText: "\xC0 quoi sert le compte-tours situ\xE9 sur le tableau de bord ?",
            options: ["\xC0 mesurer la vitesse du v\xE9hicule en km/h", "\xC0 indiquer le nombre de tours que fait le moteur par minute (tr/min)", "\xC0 calculer le nombre de kilom\xE8tres parcourus", "\xC0 mesurer la pression des pneus"],
            correctOptionIndex: 1,
            explanation: "Le compte-tours indique le r\xE9gime moteur en tours par minute pour adapter le passage des vitesses."
          }
        ]
      },
      {
        _id: "lec-1-4",
        _type: "lecon",
        title: "Le\xE7on 1.4 \u2013 Syst\xE8mes de s\xE9curit\xE9 du v\xE9hicule",
        ordre: 4,
        description: "Cette le\xE7on pr\xE9sente les syst\xE8mes de s\xE9curit\xE9 de la voiture : ceintures de s\xE9curit\xE9, airbags, ABS, qualit\xE9 des pneus, contr\xF4les techniques et v\xE9rifications r\xE9guli\xE8res. L'\xE9l\xE8ve comprend pourquoi ces \xE9quipements sont indispensables, comment les utiliser correctement (ceinture bien ajust\xE9e, ABS lors d'un freinage), et quelles v\xE9rifications simples il peut faire avant de prendre la route.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY&list=PL-kDknubECW4-gEwpco43ofPC5b4ptcYx",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quel est le r\xF4le principal du syst\xE8me ABS (Syst\xE8me Antiblocage des Roues) lors d'un freinage d'urgence ?",
            options: ["Raccourcir automatiquement la distance de freinage de moiti\xE9", "Emp\xEAcher le blocage des roues pour maintenir le contr\xF4le de la trajectoire", "Allumer les feux de d\xE9tresse automatiquement", "Multiplier la puissance du moteur"],
            correctOptionIndex: 1,
            explanation: "L'ABS \xE9vite le blocage des roues lors d'un freinage appuy\xE9, permettant de continuer \xE0 diriger le v\xE9hicule."
          },
          {
            questionText: "Quelle est la profondeur minimale l\xE9gale des sculptures d'un pneumatique pour voiture ?",
            options: ["0,5 mm", "1,6 mm", "3,0 mm", "5,0 mm"],
            correctOptionIndex: 1,
            explanation: "La limite d'usure l\xE9gale en France est fix\xE9e \xE0 1,6 mm de profondeur sur toute la bande de roulement."
          },
          {
            questionText: "Est-il obligatoire pour tous les passagers d'attacher leur ceinture de s\xE9curit\xE9 en voiture ?",
            options: ["Uniquement pour le conducteur", "Uniquement aux places avant", "Oui, pour tous les occupants du v\xE9hicule (avant et arri\xE8re)", "Non, si la vitesse est inf\xE9rieure \xE0 30 km/h"],
            correctOptionIndex: 2,
            explanation: "Le port de la ceinture de s\xE9curit\xE9 est obligatoire pour tous les occupants d'un v\xE9hicule en circulation."
          },
          {
            questionText: `Peut-on installer un si\xE8ge b\xE9b\xE9 "dos \xE0 la route" sur le si\xE8ge passager avant si l'airbag passager est actif ?`,
            options: ["Oui, sans condition", "Non, il faut obligatoirement d\xE9sactiver l'airbag passager avant", "Uniquement la nuit", "Oui, avec les feux de d\xE9tresse"],
            correctOptionIndex: 1,
            explanation: "Le d\xE9ploiement de l'airbag contre un si\xE8ge b\xE9b\xE9 dos \xE0 la route peut \xEAtre mortel : il faut d\xE9sactiver l'airbag."
          },
          {
            questionText: "Tous les combien de temps un contr\xF4le technique est-il obligatoire pour un v\xE9hicule de plus de 4 ans ?",
            options: ["Tous les ans", "Tous les 2 ans", "Tous les 5 ans", "Il n'y a plus de contr\xF4le obligatoire"],
            correctOptionIndex: 1,
            explanation: "Une fois le premier contr\xF4le effectu\xE9 \xE0 4 ans, le contr\xF4le technique p\xE9riodique a lieu tous les 2 ans."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 2 : Règles générales de circulation
  // -------------------------------------------------------------
  {
    _id: "mod-2",
    _type: "moduleFormation",
    code: "MOD-002",
    title: "Module 2 : R\xE8gles g\xE9n\xE9rales de circulation",
    summary: "Ce module explique les r\xE8gles g\xE9n\xE9rales de la circulation : sens de circulation, position sur la chauss\xE9e, changements de direction, insertion dans le trafic, arr\xEAt et stationnement, partage de la route avec les autres usagers. L'objectif est que l'\xE9l\xE8ve sache se placer correctement sur la route, utiliser les clignotants, respecter les zones d'arr\xEAt et de stationnement, et tenir compte des pi\xE9tons, cyclistes et v\xE9hicules lourds.",
    learningObjectives: [
      "Appliquer le principe de circulation \xE0 droite et l'usage des voies",
      "Ma\xEEtriser la s\xE9quence des contr\xF4les visuels et l'usage du clignotant lors d'une insertion",
      "Distinguer les r\xE8gles d'arr\xEAt et de stationnement g\xEAnant, dangereux ou interdit",
      "Adopter une conduite pr\xE9venante vis-\xE0-vis des autres cat\xE9gories d'usagers"
    ],
    ordre: 2,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 600,
    tempsMinimumVisionnage: 480,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-2-1",
        _type: "lecon",
        title: "Le\xE7on 2.1 \u2013 Sens de circulation et position sur la chauss\xE9e",
        ordre: 1,
        description: "Le\xE7on consacr\xE9e au sens de circulation (rouler \xE0 droite), \xE0 la diff\xE9rence entre lignes continues et pointill\xE9es, aux voies r\xE9serv\xE9es et \xE0 la bande d'arr\xEAt d'urgence. L'\xE9l\xE8ve apprend o\xF9 il doit se placer sur la chauss\xE9e selon le type de route, quand il peut changer de voie, et quelles zones sont strictement interdites.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "En France, sur une route \xE0 double sens de circulation sans marquage au sol, vous devez rouler :",
            options: ["Au milieu de la route", "Le plus pr\xE8s possible du bord droit de la chauss\xE9e", "Sur la gauche si personne ne vient", "Sur le trottoir"],
            correctOptionIndex: 1,
            explanation: "La r\xE8gle fondamentale impose de circuler pr\xE8s du bord droit de la chauss\xE9e."
          },
          {
            questionText: "Est-il autoris\xE9 de franchir une ligne continue blanche pour d\xE9passer une voiture lente ?",
            options: ["Oui, si la voie est libre", "Strictement interdit sous peine de perte de points et amende", "Oui, uniquement la nuit", "Oui, en klaxonnant"],
            correctOptionIndex: 1,
            explanation: "Le franchissement d'une ligne continue est une infraction grave formellement interdite."
          },
          {
            questionText: "\xC0 quoi sert la bande d'arr\xEAt d'urgence (BAU) sur autoroute ?",
            options: ["\xC0 t\xE9l\xE9phoner ou se reposer", "Exclusivement aux arr\xEAts d'urgence absolue ou pannes", "\xC0 d\xE9passer par la droite", "\xC0 rouler en cas de bouchon"],
            correctOptionIndex: 1,
            explanation: "La BAU est strictement r\xE9serv\xE9e aux secours et aux immobilisations d'urgence absolue."
          },
          {
            questionText: "Sur une chauss\xE9e \xE0 3 voies dans le m\xEAme sens, quelle voie devez-vous occuper en conduite normale ?",
            options: ["La voie du milieu", "La voie la plus \xE0 gauche", "La voie la plus \xE0 droite", "Celle de votre choix"],
            correctOptionIndex: 2,
            explanation: "On doit toujours rouler sur la voie de droite disponible et n'utiliser les voies de gauche que pour d\xE9passer."
          },
          {
            questionText: "Que signifie une ligne de dissuasion (pointill\xE9s resserr\xE9s) sur route \xE9troite ou sinueuse ?",
            options: ["D\xE9passement totalement libre", "D\xE9passement d\xE9conseill\xE9 et r\xE9serv\xE9 uniquement aux v\xE9hicules tr\xE8s lents (ex: tracteurs)", "Obligation de demi-tour", "Interdiction de s'arr\xEAter"],
            correctOptionIndex: 1,
            explanation: "La ligne de dissuasion alerte sur le danger de d\xE9passer des v\xE9hicules roulant \xE0 vitesse normale."
          }
        ]
      },
      {
        _id: "lec-2-2",
        _type: "lecon",
        title: "Le\xE7on 2.2 \u2013 Changements de direction et insertion",
        ordre: 2,
        description: "Cette le\xE7on traite des changements de direction (tourner \xE0 gauche/droite), de l'utilisation des clignotants, des contr\xF4les visuels (r\xE9troviseurs, angle mort) et de l'insertion sur voie rapide (autoroute, route \xE0 grande circulation). L'\xE9l\xE8ve voit des cas concrets d'insertion et de sortie, et apprend \xE0 signaler correctement ses intentions.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 660,
        tempsMinimumVisionnageSeconds: 528,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la m\xE9thode exacte d'observation avant de changer de voie ?",
            options: ["Mettre le clignotant puis tourner directement", "R\xE9troviseur int\xE9rieur, r\xE9tro ext\xE9rieur, contr\xF4le de l'angle mort, clignotant", "Klaxonner puis tourner", "Attendre un appel de phares"],
            correctOptionIndex: 1,
            explanation: "La s\xE9quence r\xE9tro int\xE9rieur -> r\xE9tro ext\xE9rieur -> angle mort -> clignotant garantit un changement de voie s\xFBr."
          },
          {
            questionText: "Sur une voie d'insertion d'autoroute, qui poss\xE8de la priorit\xE9 de passage ?",
            options: ["Le v\xE9hicule qui s'ins\xE8re", "Les v\xE9hicules circulant d\xE9j\xE0 sur la chauss\xE9e principale de l'autoroute", "Le v\xE9hicule le plus rapide", "Les deux en alternance obligatoire"],
            correctOptionIndex: 1,
            explanation: "Les usagers s'ins\xE9rant doivent c\xE9der le passage aux v\xE9hicules d\xE9j\xE0 engag\xE9s sur l'autoroute."
          },
          {
            questionText: "Quand devez-vous allumer votre clignotant pour avertir d'un changement de direction ?",
            options: ["Pendant qu'on tourne le volant", "Suffisamment t\xF4t avant d'effectuer la man\u0153uvre", "Apr\xE8s avoir tourn\xE9", "Uniquement s'il y a une voiture derri\xE8re"],
            correctOptionIndex: 1,
            explanation: "Le clignotant avertit \xE0 l'avance les autres usagers de votre intention."
          },
          {
            questionText: "Qu'est-ce que l'angle mort d'un v\xE9hicule ?",
            options: ["La zone arri\xE8re couverte par le r\xE9troviseur central", "La zone non visible par le conducteur via les r\xE9troviseurs", "Le dessous du moteur", "Le coffre"],
            correctOptionIndex: 1,
            explanation: "L'angle mort est la zone masqu\xE9e par les montants de la voiture et hors du champ des r\xE9troviseurs."
          },
          {
            questionText: "Pour tourner \xE0 gauche sur une rue \xE0 double sens, o\xF9 devez-vous vous placer ?",
            options: ["Compl\xE8tement \xE0 gauche sur la voie inverse", "Le long de la ligne axiale de s\xE9paration des sens sans la franchir", "Sur le trottoir de droite", "Sur le bas-c\xF4t\xE9"],
            correctOptionIndex: 1,
            explanation: "On serre l'axe central de la chauss\xE9e sans mordre sur la voie oppos\xE9e."
          }
        ]
      },
      {
        _id: "lec-2-3",
        _type: "lecon",
        title: "Le\xE7on 2.3 \u2013 Arr\xEAt, stationnement et immobilisation",
        ordre: 3,
        description: "La le\xE7on explique la diff\xE9rence entre arr\xEAt (immobilisation temporaire) et stationnement (immobilisation plus longue), les zones o\xF9 l'arr\xEAt ou le stationnement sont interdits (devant les passages pi\xE9tons, sur les trottoirs, etc.), et les r\xE8gles de bon sens pour ne pas g\xEAner la circulation ou mettre les autres usagers en danger.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: 'Quelle est la diff\xE9rence fondamentale entre un "arr\xEAt" et un "stationnement" ?',
            options: ["Aucune diff\xE9rence", "L'arr\xEAt implique que le conducteur reste \xE0 proximit\xE9 imm\xE9diate pr\xEAt \xE0 d\xE9placer le v\xE9hicule", "Le stationnement dure moins de 1 minute", "L'arr\xEAt se fait moteur \xE9teint"],
            correctOptionIndex: 1,
            explanation: "L'arr\xEAt est une immobilisation tr\xE8s courte (chargement/d\xE9chargement, mont\xE9e de passagers) avec le conducteur tout pr\xE8s."
          },
          {
            questionText: "Est-il autoris\xE9 de stationner son v\xE9hicule sur un passage pour pi\xE9tons ?",
            options: ["Oui, si ce n'est que 5 minutes", "Non, c'est un stationnement tr\xE8s g\xEAnant strictly interdit", "Oui, avec les feux de d\xE9tresse", "Uniquement le dimanche"],
            correctOptionIndex: 1,
            explanation: "Bloquer un passage pi\xE9ton est une infraction grave qualifi\xE9e de stationnement tr\xE8s g\xEAnant."
          },
          {
            questionText: "\xC0 quelle distance minimale d'un virage masqu\xE9 ou d'un sommet de c\xF4te le stationnement est-il consid\xE9r\xE9 dangereux ?",
            options: ["Moins de 5 m\xE8tres", "En pleine zone sans visibilit\xE9 \xE0 proximit\xE9 imm\xE9diate", "\xC0 500 m\xE8tres", "Jamais"],
            correctOptionIndex: 1,
            explanation: "Tout arr\xEAt ou stationnement masquant la visibilit\xE9 dans un virage ou sommet de c\xF4te est qualifi\xE9 de dangereux."
          },
          {
            questionText: "Que risque un conducteur pour stationnement tr\xE8s g\xEAnant ou dangereux ?",
            options: ["Un simple avertissement verbal", "Une amende de 135 \u20AC, un retrait de points et la mise en fourri\xE8re", "Une m\xE9daille de courtoisie", "Rien du tout"],
            correctOptionIndex: 1,
            explanation: "Les stationnements tr\xE8s g\xEAnants ou dangereux entra\xEEnent amende forfaitaire, retrait de 3 points et enl\xE8vement fourri\xE8re."
          },
          {
            questionText: "Comment devez-vous stationner le long d'un trottoir en agglom\xE9ration sur une rue \xE0 double sens ?",
            options: ["Dans le sens contraire de la circulation", "Dans le sens de la circulation du c\xF4t\xE9 droit", "En travers du trottoir", "Au milieu de la chauss\xE9e"],
            correctOptionIndex: 1,
            explanation: "Le stationnement s'effectue toujours dans le sens de la marche sur le c\xF4t\xE9 droit de la voie."
          }
        ]
      },
      {
        _id: "lec-2-4",
        _type: "lecon",
        title: "Le\xE7on 2.4 \u2013 Partage de la route avec les autres usagers",
        ordre: 4,
        description: "La le\xE7on montre comment partager la route avec les pi\xE9tons, cyclistes, motocyclistes et v\xE9hicules lourds. L'\xE9l\xE8ve apprend \xE0 respecter les distances lat\xE9rales, \xE0 anticiper les comportements des usagers vuln\xE9rables, et \xE0 adapter sa conduite \xE0 proximit\xE9 des transports en commun (bus, taxis) et des camions.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle distance lat\xE9rale minimale devez-vous laisser pour d\xE9passer un cycliste HORS AGGLOM\xC9RATION ?",
            options: ["0,5 m\xE8tre", "1,0 m\xE8tre", "1,5 m\xE8tre", "3,0 m\xE8tres"],
            correctOptionIndex: 2,
            explanation: "La distance l\xE9gale de d\xE9passement d'un usager vuln\xE9rable est de 1,5m hors agglom\xE9ration (1,0m en agglom\xE9ration)."
          },
          {
            questionText: "Lorsqu'un pi\xE9ton s'engage ou manifeste clairement l'intention de s'engager sur un passage pi\xE9ton, vous devez :",
            options: ["Acc\xE9l\xE9rer pour passer avant lui", "Klaxonner pour qu'il s'arr\xEAte", "C\xE9der obligatoirement le passage en vous arr\xEAtant", "Appeler la police"],
            correctOptionIndex: 2,
            explanation: "Le pi\xE9ton qui s'engage a une priorit\xE9 absolue d'acc\xE8s \xE0 la chauss\xE9e."
          },
          {
            questionText: "Pourquoi devez-vous redoubler de prudence \xE0 proximit\xE9 des autobus \xE0 l'arr\xEAt ?",
            options: ["Car des pi\xE9tons peuvent surgir soudainement devant ou derri\xE8re le bus", "Parce que les bus roulent tr\xE8s vite", "Pour d\xE9passer par la droite", "Les bus n'ont pas de clignotants"],
            correctOptionIndex: 0,
            explanation: "Un bus masquant la vision peut cacher des pi\xE9tons traversant la chauss\xE9e."
          },
          {
            questionText: "Que devez-vous anticiper en pr\xE9sence d'un camion poids lourd qui s'appr\xEAte \xE0 tourner \xE0 droite ?",
            options: ["Le camion tourne sur place sans se d\xE9porter", "Le camion peut se d\xE9porter vers la gauche pour balayer sa remorque", "Le camion va reculer", "Le camion s'arr\xEAte net"],
            correctOptionIndex: 1,
            explanation: "En raison du grand gabarit, les camions se d\xE9portent vers l'ext\xE9rieur avant de braquer."
          },
          {
            questionText: "Face \xE0 un deux-roues motoris\xE9 (moto/scooter), quelle est l'une des causes principales d'accident \xE0 anticiper ?",
            options: ["Les motos roulent toujours trop lentement", "Leur silhouette \xE9troite est facilement masqu\xE9e dans les angles morts", "Ils n'ont pas de freins", "Ils roulent uniquement sur le bas-c\xF4t\xE9"],
            correctOptionIndex: 1,
            explanation: "Les deux-roues ont un gabarit r\xE9duit tr\xE8s facile \xE0 manquer lors d'un simple coup d'\u0153il dans le r\xE9troviseur."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 3 : Signalisation routière (panneaux, marquages, feux)
  // -------------------------------------------------------------
  {
    _id: "mod-3",
    _type: "moduleFormation",
    code: "MOD-003",
    title: "Module 3 : Signalisation routi\xE8re (panneaux, marquages, feux)",
    summary: "Ce module couvre la signalisation routi\xE8re : panneaux de danger, d'interdiction, d'obligation, d'indication et de direction, marquages au sol et feux tricolores. L'\xE9l\xE8ve apprend \xE0 interpr\xE9ter correctement les symboles, \xE0 comprendre la hi\xE9rarchie entre panneaux, feux et marquages, et \xE0 appliquer ces r\xE8gles dans des situations concr\xE8tes.",
    learningObjectives: [
      "Reconna\xEEtre et interpr\xE9ter la signalisation verticale (danger, interdiction, obligation)",
      "D\xE9chiffrer la signalisation d'indication et de direction",
      "Comprendre les lignes et marquages au sol (lignes de dissuasion, bandes jaunes)",
      "Appliquer la hi\xE9rarchie entre les signaux des agents, les feux, les panneaux et la priorit\xE9 \xE0 droite"
    ],
    ordre: 3,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 600,
    tempsMinimumVisionnage: 480,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-3-1",
        _type: "lecon",
        title: "Le\xE7on 3.1 \u2013 Panneaux de danger",
        ordre: 1,
        description: "Pr\xE9sentation des panneaux de danger : forme triangulaire, fond blanc ou jaune, bordure rouge. La le\xE7on montre diff\xE9rents panneaux (virage dangereux, route glissante, chauss\xE9e r\xE9tr\xE9cie, etc.), leur signification et l'attitude \xE0 adopter. L'objectif est que l'\xE9l\xE8ve rep\xE8re rapidement les signaux de danger et adapte sa conduite.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la forme caract\xE9ristique d'un panneau de danger permanent ?",
            options: ["Ronde \xE0 bordure bleue", "Triangulaire \xE0 fond blanc et bordure rouge", "Carr\xE9e \xE0 fond jaune", "Octogonale rouge"],
            correctOptionIndex: 1,
            explanation: "Les panneaux de danger permanent sont des triangles bord\xE9s de rouge sur fond blanc."
          },
          {
            questionText: "\xC0 quelle distance du danger un panneau triangulaire est-il implant\xE9 en agglom\xE9ration ?",
            options: ["Au niveau exact du danger", "\xC0 environ 50 m\xE8tres", "\xC0 environ 150 m\xE8tres", "\xC0 300 m\xE8tres"],
            correctOptionIndex: 1,
            explanation: "En ville (agglom\xE9ration), le panneau est plac\xE9 50 m\xE8tres avant le danger."
          },
          {
            questionText: "\xC0 quelle distance du danger un panneau triangulaire est-il situ\xE9 HORS agglom\xE9ration ?",
            options: ["50 m\xE8tres", "100 m\xE8tres", "150 m\xE8tres", "500 m\xE8tres"],
            correctOptionIndex: 2,
            explanation: "Hors agglom\xE9ration, la vitesse \xE9tant plus \xE9lev\xE9e, le pr\xE9avis est de 150 m\xE8tres."
          },
          {
            questionText: "Quelle est la signification d'un panneau triangulaire \xE0 FOND JAUNE ?",
            options: ["Danger permanent", "Danger temporaire (chantiers, d\xE9viations)", "Zone touristique", "Signalisation nocturne"],
            correctOptionIndex: 1,
            explanation: "Le fond jaune est syst\xE9matiquement r\xE9serv\xE9 \xE0 la signalisation temporaire."
          },
          {
            questionText: "Que signale un panneau triangulaire avec deux fl\xE8ches en boucle oppos\xE9e (deux fl\xE8ches rondes) ?",
            options: ["Sens interdit", "Intersection avec carrefour \xE0 sens giratoire", "Demi-tour obligatoire", "Route \xE0 sens unique"],
            correctOptionIndex: 1,
            explanation: "Le panneau A25 annonce l'approche d'un carrefour giratoire."
          }
        ]
      },
      {
        _id: "lec-3-2",
        _type: "lecon",
        title: "Le\xE7on 3.2 \u2013 Panneaux d'interdiction et d'obligation",
        ordre: 2,
        description: "La le\xE7on pr\xE9sente les panneaux ronds rouges (interdiction) et bleus (obligation), avec des exemples fr\xE9quents (interdiction de tourner \xE0 gauche, obligation de tourner \xE0 droite, limitation de vitesse, interdiction de d\xE9passer). L'\xE9l\xE8ve voit comment ces panneaux influencent son comportement et quelles sanctions il risque en cas de non\u2011respect.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "O\xF9 commence l'effet d'un panneau d'interdiction (rond \xE0 bordure rouge) ?",
            options: ["150 m\xE8tres apr\xE8s le panneau", "Imm\xE9diatement \xE0 la hauteur du panneau", "\xC0 la prochaine station-service", "\xC0 l'entr\xE9e de l'autoroute"],
            correctOptionIndex: 1,
            explanation: "Les panneaux de prescription (interdiction et obligation) prennent effet \xE0 leur hauteur exacte."
          },
          {
            questionText: 'Que signifie un panneau rond bleu comportant le nombre "30" ?',
            options: ["Vitesse maximale 30 km/h", "Vitesse minimale obligatoire de 30 km/h", "Conseil de rouler \xE0 30 km/h", "Fin de zone 30"],
            correctOptionIndex: 1,
            explanation: "Un panneau rond bleu fixe une obligation, ici la vitesse minimale obligatoire."
          },
          {
            questionText: "Jusqu'o\xF9 s'applique une limitation de vitesse indiqu\xE9e par un panneau rond B14 (ex: 70) ?",
            options: ["Jusqu'\xE0 la prochaine intersection ou panneau de fin de limitation", "Sur 10 kilom\xE8tres", "Pendant 2 minutes", "Sur toute la r\xE9gion"],
            correctOptionIndex: 0,
            explanation: "Une interdiction cesse \xE0 la premi\xE8re intersection rencontr\xE9e ou au panneau de fin d'interdiction."
          },
          {
            questionText: "Que signifie le panneau B0 (rond blanc entour\xE9 de rouge sans symbole au centre) ?",
            options: ["Sens interdit", "Circulation interdite \xE0 tout v\xE9hicule dans les deux sens", "Acc\xE8s r\xE9serv\xE9 aux riverains", "Stationnement payant"],
            correctOptionIndex: 1,
            explanation: "Le panneau B0 interdit la circulation de tout v\xE9hicule dans les 2 sens."
          },
          {
            questionText: "Un panneau rond bleu affichant une fl\xE8che contournant par la droite impose de :",
            options: ["Tourner la t\xEAte \xE0 droite", "Contourner l'obstacle par la droite", "Allumer les feux de d\xE9tresse", "S'arr\xEAter sur le bas-c\xF4t\xE9"],
            correctOptionIndex: 1,
            explanation: "C'est un panneau d'obligation de contournement par le c\xF4t\xE9 indiqu\xE9 par la fl\xE8che."
          }
        ]
      },
      {
        _id: "lec-3-3",
        _type: "lecon",
        title: "Le\xE7on 3.3 \u2013 Panneaux d'indication et de direction",
        ordre: 3,
        description: "Le\xE7on sur les panneaux d'information, de services (station\u2011service, parking, h\xF4pital), et les panneaux de direction (noms de villes, routes, num\xE9ros). L'\xE9l\xE8ve apprend \xE0 se rep\xE9rer gr\xE2ce \xE0 la signalisation, \xE0 suivre un itin\xE9raire et \xE0 trouver les services utiles.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la forme des panneaux apportant une simple indication ou information ?",
            options: ["Triangulaire", "Ronde", "Carr\xE9e ou rectangulaire", "Hexagonale"],
            correctOptionIndex: 2,
            explanation: "Les panneaux carr\xE9s ou rectangulaires transmettent des indications utiles."
          },
          {
            questionText: "Quelle couleur caract\xE9rise les panneaux de direction d'itin\xE9raire de grande liaison (autoroutes) en France ?",
            options: ["Fond vert", "Fond bleu", "Fond jaune", "Fond blanc"],
            correctOptionIndex: 1,
            explanation: "Le bleu est exclusivement r\xE9serv\xE9 au r\xE9seau autoroutier."
          },
          {
            questionText: "Un panneau de direction de couleur VERTE indique un itin\xE9raire reliant :",
            options: ["Des petites communes rurales", "Des grandes villes par routes principales ou nationales", "Des chantiers temporaires", "Des zones pi\xE9tonnes"],
            correctOptionIndex: 1,
            explanation: "Le vert guide vers les agglom\xE9rations importantes sur le r\xE9seau principal non autoroutier."
          },
          {
            questionText: "Un panneau de direction blanc guide vers :",
            options: ["Les autoroutes", "Les grands axes", "Le r\xE9seau local et les destinations de proximit\xE9", "Les h\xF4pitaux uniquement"],
            correctOptionIndex: 2,
            explanation: "Le blanc signale les itin\xE9raires secondaires et de proximit\xE9 locale."
          },
          {
            questionText: `Que signale un panneau rectangulaire bleu marqu\xE9 d'un "P" blanc ?`,
            options: ["Un poste de police", "Un emplacement de parking r\xE9serv\xE9 ou public", "Une zone de p\xE9age", "Une pharmacie"],
            correctOptionIndex: 1,
            explanation: "La lettre P signale une zone am\xE9nag\xE9e pour le stationnement."
          }
        ]
      },
      {
        _id: "lec-3-4",
        _type: "lecon",
        title: "Le\xE7on 3.4 \u2013 Marquages au sol et feux de circulation",
        ordre: 4,
        description: "Cette le\xE7on traite des marquages au sol (lignes continues/en pointill\xE9s, z\xE9bras, passages pi\xE9tons, fl\xE8ches directionnelles) et des feux de circulation (rouge, orange, vert, feux pour pi\xE9tons, signaux compl\xE9mentaires). L'\xE9l\xE8ve apprend la hi\xE9rarchie entre panneaux, feux et marquages, et comment r\xE9agir dans les diff\xE9rents cas (feu orange, feu clignotant, etc.).",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 660,
        tempsMinimumVisionnageSeconds: 528,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la r\xE8gle absolue face \xE0 un FEU JAUNE / ORANGE FIXE ?",
            options: ["Acc\xE9l\xE9rer fortement pour passer", "S'arr\xEAter sauf si l'arr\xEAt pr\xE9sente un danger pour les v\xE9hicules qui suivent", "Klaxonner et passer", "Consid\xE9rer que c'est vert"],
            correctOptionIndex: 1,
            explanation: "Le feu orange impose l'arr\xEAt. On ne franchit que si l'arr\xEAt est dangereux pour la s\xE9curit\xE9."
          },
          {
            questionText: "En cas de contradiction entre un panneau de signalisation et un feu tricolore en fonctionnement :",
            options: ["Le panneau pr\xE9vaut sur le feu", "Le feu tricolore pr\xE9vaut sur le panneau", "La priorit\xE9 \xE0 droite s'applique", "Le conducteur choisit"],
            correctOptionIndex: 1,
            explanation: "Dans la hi\xE9rarchie : l'agent > le feu tricolore > le panneau > la r\xE8gle par d\xE9faut (priorit\xE9 \xE0 droite)."
          },
          {
            questionText: "Que signifie un FEU JAUNE CLIGNOTANT en bas du feu tricolore ?",
            options: ["Panne totale de courant", "Appel \xE0 la prudence : le carrefour s'envisage selon les panneaux ou la priorit\xE9 \xE0 droite", "Arr\xEAt obligatoire", "Sens interdit"],
            correctOptionIndex: 1,
            explanation: "Le feu jaune clignotant signale que le feu n'est pas actif et invite \xE0 appliquer les r\xE8gles de priorit\xE9 ordinaires."
          },
          {
            questionText: "Peut-on rouler ou s'arr\xEAter sur des zones z\xE9br\xE9es peintes au sol (hachures blanches) ?",
            options: ["Oui pour stationner", "Strictement interdit d'y circuler, de s'y arr\xEAter ou d'y stationner", "Uniquement pour d\xE9passer", "Oui en cas d'embouteillage"],
            correctOptionIndex: 1,
            explanation: "Les z\xE9bras sont assimil\xE9s \xE0 un terre-plein central : le franchissement y est interdit."
          },
          {
            questionText: "\xC0 quoi servent les fl\xE8ches de rabattement peintes au sol au milieu d'une ligne discontinue ?",
            options: ["Indiquer d'acc\xE9l\xE9rer", "Annoncer la fin d'autorisation de d\xE9passement et le retour d'une ligne continue", "Indiquer un virage serr\xE9", "Indiquer la pr\xE9sence d'une station-service"],
            correctOptionIndex: 1,
            explanation: "Les fl\xE8ches de rabattement intiment l'ordre de rejoindre la voie de droite avant la ligne continue."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 4 : Priorités de passage et intersections
  // -------------------------------------------------------------
  {
    _id: "mod-4",
    _type: "moduleFormation",
    code: "MOD-004",
    title: "Module 4 : Priorit\xE9s de passage et intersections",
    summary: "Les intersections sont les zones de croisement les plus d\xE9licates de la circulation routi\xE8re. Ce module \xE9tudie la priorit\xE9 \xE0 droite, le panneau STOP, le C\xE9der le passage, les rond-points et les carrefours \xE0 sens giratoire, ainsi que le comportement \xE0 adopter face aux v\xE9hicules d'urgence prioritaires.",
    learningObjectives: [
      "Appliquer sans h\xE9sitation la priorit\xE9 \xE0 droite",
      "Identifier la ligne de marquer d'arr\xEAt au STOP et c\xE9der le passage",
      "Placer son v\xE9hicule correctement dans un carrefour giratoire \xE0 2 voies",
      "D\xE9gager la voie imm\xE9diatement face aux v\xE9hicules de secours"
    ],
    ordre: 4,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-4-1",
        _type: "lecon",
        title: "Le\xE7on 4.1 \u2013 Priorit\xE9 \xE0 droite et intersections simples",
        ordre: 1,
        description: "Exploration d\xE9taill\xE9e du principe de la priorit\xE9 \xE0 droite en l'absence de panneaux. Savoir d\xE9tecter les rues d\xE9bouchant sur sa droite, adapter sa vitesse et anticiper les franchissements de carrefours sans signalisation.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "En l'absence de toute signalisation \xE0 un croisement, quel usager est prioritaire ?",
            options: ["Le plus rapide", "L'usager venant de droite", "L'usager venant de gauche", "Le v\xE9hicule le plus lourd"],
            correctOptionIndex: 1,
            explanation: "En l'absence de panneaux ou marquages, la priorit\xE9 appartient aux v\xE9hicules venant de droite."
          },
          {
            questionText: "Un v\xE9hicule sortant d'une voie priv\xE9e, d'un garage ou d'un chemin de terre est-il prioritaire ?",
            options: ["Oui, il applique la priorit\xE9 \xE0 droite", "Non, il doit c\xE9der le passage \xE0 tous les usagers de la chauss\xE9e publique", "Uniquement s'il klaxonne", "Uniquement s'il tourne \xE0 droite"],
            correctOptionIndex: 1,
            explanation: "Sortir d'une propri\xE9t\xE9 priv\xE9e ou d'un chemin non carrossable impose de c\xE9der la priorit\xE9 \xE0 tous."
          },
          {
            questionText: "Comment aborder une intersection o\xF9 s'applique la priorit\xE9 \xE0 droite sans visibilit\xE9 ?",
            options: ["Acc\xE9l\xE9rer pour passer vite", "Ralentir, r\xE9trograder et placer le pied au-dessus du frein pr\xEAt \xE0 stopper", "Faire des appels de phares et passer", "Klaxonner sans ralentir"],
            correctOptionIndex: 1,
            explanation: "Placer le pied au-dessus du frein r\xE9duit le temps de r\xE9action en cas de survenue d'un v\xE9hicule \xE0 droite."
          },
          {
            questionText: "Dans une impasse (voie sans issue) d\xE9bouchant \xE0 votre droite sans panneau :",
            options: ["La priorit\xE9 \xE0 droite ne s'applique pas", "La priorit\xE9 \xE0 droite s'applique normalement", "Elle est r\xE9serv\xE9e aux pi\xE9tons", "Le plus lourd passe"],
            correctOptionIndex: 1,
            explanation: "Une impasse publique fait partie du r\xE9seau routier et applique la r\xE8gle de la priorit\xE9 \xE0 droite."
          },
          {
            questionText: "Dans les parkings de centres commerciaux sans signalisation :",
            options: ["Le code de la route ne s'applique pas", "La priorit\xE9 \xE0 droite s'applique comme sur chauss\xE9e publique", "Chacun fait ce qu'il veut", "Priorit\xE9 au v\xE9hicule le plus cher"],
            correctOptionIndex: 1,
            explanation: "Le code de la route s'applique pleinement dans tous les parkings ouverts \xE0 la circulation publique."
          }
        ]
      },
      {
        _id: "lec-4-2",
        _type: "lecon",
        title: "Le\xE7on 4.2 \u2013 Panneaux STOP et C\xE9der le Passage",
        ordre: 2,
        description: "Cette le\xE7on d\xE9taille la diff\xE9rence entre le Stop et le C\xE9der le passage. L'\xE9l\xE8ve apprend o\xF9 marquer l'arr\xEAt complet des roues au Stop (\xE0 la ligne blanche) et comment aborder un C\xE9der le passage.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Au panneau STOP, o\xF9 devez-vous marquer l'arr\xEAt complet du v\xE9hicule ?",
            options: ["Au niveau du panneau", "\xC0 la ligne blanche continue peinte au sol", "Au milieu du carrefour", "10 m\xE8tres avant"],
            correctOptionIndex: 1,
            explanation: "L'arr\xEAt des roues doit se faire exactement \xE0 la ligne d'arr\xEAt peinte au sol."
          },
          {
            questionText: "Au C\xE9der le passage, devez-vous obligatoirement marquer un temps d'arr\xEAt si la voie est totalement libre ?",
            options: ["Oui, au moins 3 secondes", "Non, si la visibilit\xE9 est parfaite et qu'aucun v\xE9hicule n'arrive, l'arr\xEAt n'est pas obligatoire", "Oui, toujours", "Uniquement s'il pleut"],
            correctOptionIndex: 1,
            explanation: "\xC0 la diff\xE9rence du Stop, le C\xE9der le passage permet de franchir sans s'arr\xEAter si la voie est d\xE9gag\xE9e."
          },
          {
            questionText: 'Un panneau STOP comporte un panonceau "150 m". Cela signifie :',
            options: ["Stop imm\xE9diat", "Signal avanc\xE9 : le panneau STOP se situe \xE0 150 m\xE8tres", "Arr\xEAt pendant 150 secondes", "Interdiction de rouler \xE0 plus de 150 km/h"],
            correctOptionIndex: 1,
            explanation: "C'est une signalisation avanc\xE9e annon\xE7ant un Stop \xE0 150m."
          },
          {
            questionText: "\xC0 un Stop, si le marquage au sol est effac\xE9, o\xF9 devez-vous marquer l'arr\xEAt ?",
            options: ["Au niveau du panneau Stop", "\xC0 la limite de la chauss\xE9e abord\xE9e permettant une visibilit\xE9 optimale", "Vous n'\xEAtes plus oblig\xE9 de vous arr\xEAter", "Au milieu de la voie"],
            correctOptionIndex: 1,
            explanation: "En l'absence de ligne, on marque l'arr\xEAt \xE0 la fronti\xE8re de la chauss\xE9e prioritaire sans s'y engager."
          },
          {
            questionText: "Est-il autoris\xE9 de red\xE9marrer imm\xE9diatement derri\xE8re une voiture qui s'\xE9tait arr\xEAt\xE9e au Stop ?",
            options: ["Oui s'il n'y a personne", "Non, chaque v\xE9hicule doit marquer son propre temps d'arr\xEAt marquant la ligne", "Oui en suivant son pare-chocs", "Uniquement en agglom\xE9ration"],
            correctOptionIndex: 1,
            explanation: "Chaque conducteur doit marquer un arr\xEAt complet individuel \xE0 la ligne de Stop."
          }
        ]
      },
      {
        _id: "lec-4-3",
        _type: "lecon",
        title: "Le\xE7on 4.3 \u2013 Carrefours \xE0 sens giratoire et rond-points",
        ordre: 3,
        description: "Comprendre la diff\xE9rence entre carrefour \xE0 sens giratoire (C\xE9der le passage \xE0 l'entr\xE9e, usagers sur l'anneau prioritaires) et rond-point classique (priorit\xE9 \xE0 droite). Placement des voies et clignotants \xE0 l'entr\xE9e et \xE0 la sortie.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Dans un carrefour \xE0 sens giratoire en France (signal\xE9 par un C\xE9der le passage) :",
            options: ["Les usagers entrant sont prioritaires", "Les usagers engag\xE9s sur l'anneau sont prioritaires", "Le plus rapide a la priorit\xE9", "La priorit\xE9 est \xE0 droite"],
            correctOptionIndex: 1,
            explanation: "Dans un carrefour giratoire, la priorit\xE9 appartient aux usagers circulant sur l'anneau."
          },
          {
            questionText: "Pour prendre la PREMI\xC8RE SORTIE \xC0 DROITE d'un giratoire, quand devez-vous allumer le clignotant droit ?",
            options: ["Apr\xE8s la sortie", "Avant d'entrer sur le giratoire", "Au milieu de l'anneau", "Jamais"],
            correctOptionIndex: 1,
            explanation: "Pour tourner \xE0 droite d\xE8s la 1\xE8re sortie, on allume le clignotant droit avant m\xEAme de s'engager."
          },
          {
            questionText: "Pour faire un demi-tour ou aller en face sur un giratoire \xE0 2 voies, quelle voie pouvez-vous emprunter ?",
            options: ["La voie de droite obligatoirement pour sortir, ou la voie de gauche pour serrer l'anneau avant de se rabattre", "Le trottoir central", "La bande d'arr\xEAt d'urgence", "Au milieu \xE0 cheval"],
            correctOptionIndex: 0,
            explanation: "On peut emprunter la voie de gauche pour faire le tour, mais il faut obligatoirement contr\xF4ler et se rabattre \xE0 droite avant la sortie."
          },
          {
            questionText: `Dans un "Rond-Point" classique sans panneau C\xE9der le passage \xE0 l'entr\xE9e (ex: Place de l'\xC9toile \xE0 Paris) :`,
            options: ["Ceux qui sont sur l'anneau ont la priorit\xE9", "La r\xE8gle de la priorit\xE9 \xE0 droite s'applique aux v\xE9hicules qui entrent", "La priorit\xE9 est au centre", "C'est un feu vert permanent"],
            correctOptionIndex: 1,
            explanation: "En l'absence de panneau C\xE9der le passage, c'est la priorit\xE9 \xE0 droite qui s'applique \xE0 l'entr\xE9e."
          },
          {
            questionText: "Quand devez-vous allumer le clignotant DROIT pour quitter un carrefour giratoire ?",
            options: ["D\xE8s l'entr\xE9e", "Juste apr\xE8s avoir d\xE9pass\xE9 la sortie pr\xE9c\xE9dant celle que vous voulez prendre", "Une fois engag\xE9 dans la rue de sortie", "Jamais"],
            correctOptionIndex: 1,
            explanation: "Le clignotant droit signale votre sortie imm\xE9diate au niveau de la sortie vis\xE9e."
          }
        ]
      },
      {
        _id: "lec-4-4",
        _type: "lecon",
        title: "Le\xE7on 4.4 \u2013 V\xE9hicules prioritaires et feux tricolores",
        ordre: 4,
        description: "Identifier les v\xE9hicules d'urgence prioritaires (SAMU, Pompiers, Police avec gyrophares bleus et sir\xE8ne 2 tons) et savoir faciliter leur passage imm\xE9diatement.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Comment reconna\xEEtre un v\xE9hicule de secours d'urgence b\xE9n\xE9ficiant de la priorit\xE9 absolue ?",
            options: ["Gyrophares bleus et avertisseur sonore \xE0 deux tons en fonctionnement", "Simple warning", "Phares jaunes", "Bande adh\xE9sive rouge"],
            correctOptionIndex: 0,
            explanation: "Les signaux lumineux bleus ET sonores 2 tons caract\xE9risent l'urgence prioritaire."
          },
          {
            questionText: "Face \xE0 une ambulance en intervention d'urgence arrivant derri\xE8re vous, vous devez :",
            options: ["Acc\xE9l\xE9rer et d\xE9passer la limite de vitesse", "Faciliter imm\xE9diatement le passage en vous serrant \xE0 droite ou en vous arr\xEAtant", "Rester au milieu sans bouger", "Freiner brusquement"],
            correctOptionIndex: 1,
            explanation: "Vous devez imm\xE9diatement c\xE9der le passage et cr\xE9er un espace libre."
          },
          {
            questionText: "Un v\xE9hicule d'intervention du gaz (GRDF) avec gyrophare bleu SANS sir\xE8ne est-il un v\xE9hicule prioritaire ?",
            options: ["Oui, toujours", "Non, c'est un v\xE9hicule b\xE9n\xE9ficiant de facilit\xE9s de passage mais non prioritaire", "Oui la nuit", "Non, c'est un v\xE9hicule interdit"],
            correctOptionIndex: 1,
            explanation: "Sans l'avertisseur sonore \xE0 2 tons, le v\xE9hicule n'a que des facilit\xE9s de passage."
          },
          {
            questionText: "\xC0 un feu rouge, si un v\xE9hicule de pompier en sir\xE8ne d'urgence est bloqu\xE9 derri\xE8re vous :",
            options: ["Vous devez attendre le feu vert quoi qu'il arrive", "Vous devez vous avancer prudemment avec pr\xE9caution pour lui faire de la place", "Vous coupez le moteur", "Vous faites demi-tour"],
            correctOptionIndex: 1,
            explanation: "On d\xE9gage l'intersection avec prudence pour laisser passer les secours d'urgence."
          },
          {
            questionText: "Un bus quittant son arr\xEAt en agglom\xE9ration a-t-il la priorit\xE9 de r\xE9insertion ?",
            options: ["Oui, les automobilistes doivent ralentir et lui faciliter la sortie d'arr\xEAt", "Non, le bus attend que la rue soit vide", "Uniquement s'il roule \xE0 80 km/h", "Jamais"],
            correctOptionIndex: 0,
            explanation: "En agglom\xE9ration, on doit faciliter le d\xE9part des bus indiquant leur clignotant."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 5 : Vitesse, distances de sécurité et freinage
  // -------------------------------------------------------------
  {
    _id: "mod-5",
    _type: "moduleFormation",
    code: "MOD-005",
    title: "Module 5 : Vitesse, distances de s\xE9curit\xE9 et freinage",
    summary: "Ce module aborde l'ensemble des r\xE8gles relatives aux limitations de vitesse sur le r\xE9seau routier fran\xE7ais, le calcul de la distance de s\xE9curit\xE9, le temps de r\xE9action, la distance de freinage et les facteurs d'adh\xE9rence.",
    learningObjectives: [
      "Conna\xEEtre par c\u0153ur les limitations de vitesse selon le type de route et les conditions m\xE9t\xE9o",
      "Calculer mentalement le temps de r\xE9action et la distance d'arr\xEAt",
      "\xC9valuer l'impact de la chauss\xE9e mouill\xE9e ou glissante sur le freinage",
      "Comprendre la notion d'\xE9nergie cin\xE9tique et les cons\xE9quences de la vitesse sur les chocs"
    ],
    ordre: 5,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 600,
    tempsMinimumVisionnage: 480,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-5-1",
        _type: "lecon",
        title: "Le\xE7on 5.1 \u2013 Limitations de vitesse par r\xE9seau et m\xE9t\xE9o",
        ordre: 1,
        description: "Pr\xE9sentation des vitesses maximales autoris\xE9es : 50 km/h en agglom\xE9ration, 80 km/h sur route \xE0 double sens sans s\xE9parateur central, 110 km/h sur voie rapide et 130 km/h sur autoroute par temps sec (abaiss\xE9es \xE0 110 km/h et 100 km/h par pluie).",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la vitesse maximale autoris\xE9e sur autoroute par TEMPS DE PLUIE pour un conducteur confirm\xE9 ?",
            options: ["130 km/h", "110 km/h", "100 km/h", "90 km/h"],
            correctOptionIndex: 1,
            explanation: "En cas de pluie, la vitesse sur autoroute est abaiss\xE9e de 130 km/h \xE0 110 km/h."
          },
          {
            questionText: "Pour un jeune conducteur en PERMIS PROBATOIRE, quelle est la vitesse maximale sur autoroute par temps sec ?",
            options: ["130 km/h", "110 km/h", "100 km/h", "90 km/h"],
            correctOptionIndex: 1,
            explanation: "En p\xE9riode probatoire, la vitesse sur autoroute est limit\xE9e \xE0 110 km/h."
          },
          {
            questionText: "En pr\xE9sence d'un brouillard r\xE9duisant la visibilit\xE9 \xE0 MOINS DE 50 M\xC8TRES, la vitesse est limit\xE9e \xE0 :",
            options: ["80 km/h sur autoroute", "50 km/h sur l'ensemble du r\xE9seau routier", "70 km/h", "30 km/h"],
            correctOptionIndex: 1,
            explanation: "D\xE8s que la visibilit\xE9 descend sous 50 m, la vitesse maximale absolue est de 50 km/h partout."
          },
          {
            questionText: "Quelle est la vitesse maximale par d\xE9faut en agglom\xE9ration sauf indication contraire ?",
            options: ["30 km/h", "50 km/h", "70 km/h", "80 km/h"],
            correctOptionIndex: 1,
            explanation: "La vitesse l\xE9gale par d\xE9faut en ville est de 50 km/h."
          },
          {
            questionText: "Quelle est la vitesse maximale sur une route \xE0 double sens sans s\xE9parateur central hors agglom\xE9ration ?",
            options: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
            correctOptionIndex: 0,
            explanation: "La vitesse maximale est de 80 km/h sur ces tron\xE7ons."
          }
        ]
      },
      {
        _id: "lec-5-2",
        _type: "lecon",
        title: "Le\xE7on 5.2 \u2013 Distance de s\xE9curit\xE9 et calcul du temps de r\xE9action",
        ordre: 2,
        description: "Apprendre \xE0 \xE9valuer l'intervalle de s\xE9curit\xE9 de 2 secondes. Formule simplifi\xE9e pour calculer la distance parcourue pendant le temps de r\xE9action (environ 1 seconde) : multiplier le chiffre des dizaines de la vitesse par 3.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quel intervalle de temps minimal de s\xE9curit\xE9 devez-vous maintenir avec le v\xE9hicule devant vous ?",
            options: ["0,5 seconde", "1 seconde", "Au moins 2 secondes", "5 secondes"],
            correctOptionIndex: 2,
            explanation: "L'article R412-9 du code de la route impose un intervalle d'au moins 2 secondes."
          },
          {
            questionText: "\xC0 90 km/h, quelle distance parcourez-vous approximativement pendant 1 seconde de temps de r\xE9action ?",
            options: ["9 m\xE8tres", "18 m\xE8tres", "27 m\xE8tres (9 x 3)", "45 m\xE8tres"],
            correctOptionIndex: 2,
            explanation: "Pour trouver la distance parcourue en 1 sec : 9 x 3 = 27 m\xE8tres."
          },
          {
            questionText: "Sur autoroute, quel rep\xE8re visuel garantit une distance de s\xE9curit\xE9 suffisante sur sol sec ?",
            options: ["Laisser 1 bande blanche de la ligne de rive droite", "Laisser au moins 2 bandes blanches de la ligne de rive droite", "Compter jusqu'\xE0 10", "Suivre les feux du camion"],
            correctOptionIndex: 1,
            explanation: "Sur autoroute, 2 bandes de la ligne de rive correspondent \xE0 l'intervalle r\xE9glementaire."
          },
          {
            questionText: "La fatigue ou la consommation d'alcool a pour effet sur le temps de r\xE9action de :",
            options: ["Le diminuer (r\xE9action plus rapide)", "L'augmenter (r\xE9action plus lente)", "Ne rien changer", "Rendre le freinage plus court"],
            correctOptionIndex: 1,
            explanation: "L'alcool, les drogues et la fatigue allongent le temps de r\xE9action de mani\xE8re importante."
          },
          {
            questionText: "\xC0 50 km/h en ville, quelle distance parcourez-vous pendant le temps de r\xE9action (1 sec) ?",
            options: ["5 m\xE8tres", "15 m\xE8tres (5 x 3)", "25 m\xE8tres", "50 m\xE8tres"],
            correctOptionIndex: 1,
            explanation: "Calcul : 5 x 3 = 15 m\xE8tres parcourus avant m\xEAme de toucher la p\xE9dale de frein."
          }
        ]
      },
      {
        _id: "lec-5-3",
        _type: "lecon",
        title: "Le\xE7on 5.3 \u2013 Distance de freinage, adh\xE9rence et arr\xEAt complet",
        ordre: 3,
        description: "La distance d'arr\xEAt totale = distance de r\xE9action + distance de freinage. \xC9valuation du freinage sur chauss\xE9e mouill\xE9e (distance doubl\xE9e) ou sur verglas (multipli\xE9e par 10).",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Sur sol mouill\xE9, par combien est multipli\xE9e la distance de freinage d'un v\xE9hicule ?",
            options: ["Elle ne change pas", "Elle est multipli\xE9e par 2 (doubl\xE9e)", "Elle est multipli\xE9e par 5", "Elle est divis\xE9e par 2"],
            correctOptionIndex: 1,
            explanation: "La pr\xE9sence d'eau diminue l'adh\xE9rence des pneus et double la distance de freinage."
          },
          {
            questionText: "Si vous doublez votre vitesse (de 50 km/h \xE0 100 km/h), votre distance de freinage est :",
            options: ["Doubl\xE9e (x 2)", "Tripl\xE9e (x 3)", "Quadrupl\xE9e (x 4)", "Identique"],
            correctOptionIndex: 2,
            explanation: "La distance de freinage varie avec le carr\xE9 de la vitesse : 2\xB2 = 4 fois plus longue !"
          },
          {
            questionText: "Par temps de verglas, la distance de freinage peut \xEAtre multipli\xE9e par :",
            options: ["2", "4", "10", "100"],
            correctOptionIndex: 2,
            explanation: "L'absence quasi totale d'adh\xE9rence sur verglas multiplie la distance par 10."
          },
          {
            questionText: "Qu'est-ce que le ph\xE9nom\xE8ne d'aquaplaning (ou aquaplanage) ?",
            options: ["Une perte d'huile sous la voiture", "Une pellicule d'eau qui s'intercale entre le pneu et la route faisant flotter le v\xE9hicule", "Un freinage brusque sur sol sec", "Un nettoyage des phares"],
            correctOptionIndex: 1,
            explanation: "Le pneu n'\xE9vacue plus l'eau et perd tout contact avec l'asphalte."
          },
          {
            questionText: "Comment calculer la distance d'arr\xEAt TOTALE approximative sur sol sec \xE0 50 km/h ?",
            options: ["5 x 5 = 25 m\xE8tres", "5 x 3 = 15 m\xE8tres", "5 x 10 = 50 m\xE8tres", "50 x 2 = 100 m\xE8tres"],
            correctOptionIndex: 0,
            explanation: "Formule d'arr\xEAt total approximatif : (dizaine de la vitesse) x (dizaine de la vitesse) -> 5 x 5 = 25m."
          }
        ]
      },
      {
        _id: "lec-5-4",
        _type: "lecon",
        title: "Le\xE7on 5.4 \u2013 Dangers de la vitesse excessive et \xE9nergie cin\xE9tique",
        ordre: 4,
        description: "Comprendre les lois physiques en jeu : l'\xE9nergie cin\xE9tique emmagasin\xE9e par la masse du v\xE9hicule cro\xEEt avec le carr\xE9 de la vitesse.Cons\xE9quences d\xE9vastatrices lors d'une collision.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Un choc frontal \xE0 50 km/h sans ceinture \xE9quivaut pour les occupants \xE0 une chute de quel \xE9tage d'un immeuble ?",
            options: ["1er \xE9tage", "3\xE8me \xE9tage", "10\xE8me \xE9tage", "20\xE8me \xE9tage"],
            correctOptionIndex: 1,
            explanation: "Un choc \xE0 50 km/h subit la m\xEAme violence qu'une chute du 3\xE8me \xE9tage (environ 10 m\xE8tres de hauteur)."
          },
          {
            questionText: "Si l'on augmente sa vitesse, le champ visuel du conducteur :",
            options: ["S'\xE9largit consid\xE9rablement", "Se r\xE9tr\xE9cit (effet de vision en tunnel)", "Devient flou uniquement \xE0 droite", "Ne change pas"],
            correctOptionIndex: 1,
            explanation: "Plus la vitesse augmente, plus le champ visuel lat\xE9ral se r\xE9duit."
          },
          {
            questionText: "Quelle est la premi\xE8re cause de mortalit\xE9 routi\xE8re chez les jeunes conducteurs ?",
            options: ["Les pannes d'essence", "La vitesse excessive ou inadapt\xE9e et l'alcool", "Les feux de brouillard", "Les crevaisons"],
            correctOptionIndex: 1,
            explanation: "La vitesse combin\xE9e aux facteurs d'inattention/alcool est la cause majeure des accidents mortels."
          },
          {
            questionText: "L'\xE9nergie cin\xE9tique d'un v\xE9hicule d\xE9pend de :",
            options: ["La couleur de la carrosserie", "La masse du v\xE9hicule et du carr\xE9 de sa vitesse", "La marque des pneumatiques", "La hauteur du volant"],
            correctOptionIndex: 1,
            explanation: "\xC9nergie cin\xE9tique E = 1/2 m v\xB2. La vitesse a un impact quadratique majeur."
          },
          {
            questionText: "R\xE9duire sa vitesse de 130 km/h \xE0 110 km/h sur un trajet de 100 km permet de :",
            options: ["\xC9conomiser du carburant tout en ne perdant que quelques minutes", "Doubler son temps de trajet", "User pr\xE9matur\xE9ment les freins", "Ne rien changer"],
            correctOptionIndex: 0,
            explanation: "Baisser sa vitesse \xE9conomise jusqu'\xE0 20% de carburant pour une perte de temps n\xE9gligeable (~5 min)."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 6 : Conduite dans des conditions difficiles
  // -------------------------------------------------------------
  {
    _id: "mod-6",
    _type: "moduleFormation",
    code: "MOD-006",
    title: "Module 6 : Conduite dans des conditions difficiles",
    summary: "Ce module forme l'\xE9l\xE8ve \xE0 la conduite nocturne et aux intemp\xE9ries (pluie torrentielle, brouillard, neige, verglas, vent violent) ainsi qu'au passage des tunnels et zones de montagne.",
    learningObjectives: [
      "Ma\xEEtriser le choix des feux du v\xE9hicule (croisement, route, brouillard avant/arri\xE8re)",
      "Adapter la conduite sur chauss\xE9e glissante, verglac\xE9e ou enneig\xE9e",
      "R\xE9agir correctement en cas d'aquaplaning ou de fort vent lat\xE9ral",
      "Respecter les r\xE8gles sp\xE9cifiques de s\xE9curit\xE9 en tunnel et en montagne"
    ],
    ordre: 6,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-6-1",
        _type: "lecon",
        title: "Le\xE7on 6.1 \u2013 Conduite de nuit et \xE9clairage du v\xE9hicule",
        ordre: 1,
        description: "Utilisation des feux de position, feux de croisement et feux de route. Savoir passer en feux de croisement d\xE8s qu'on croise ou qu'on suit un autre usager pour \xE9viter l'\xE9blouissement.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Lorsque vous croisez un autre v\xE9hicule la nuit sur route non \xE9clair\xE9e, vous devez :",
            options: ["Rester en feux de route (pleins phares)", "Passer imm\xE9diatement en feux de croisement", "\xC9teindre tous vos feux", "Mettre les feux de d\xE9tresse"],
            correctOptionIndex: 1,
            explanation: "Il est obligatoire d'interrompre les feux de route pour ne pas \xE9blouir le conducteur crois\xE9."
          },
          {
            questionText: "\xC0 quelle distance minimale vers l'avant doivent \xE9clairer les feux de croisement ?",
            options: ["10 m\xE8tres", "30 m\xE8tres", "100 m\xE8tres", "200 m\xE8tres"],
            correctOptionIndex: 1,
            explanation: "Les feux de croisement doivent \xE9clairer la chauss\xE9e sur une distance minimale de 30 m\xE8tres."
          },
          {
            questionText: "\xC0 quelle distance minimale doivent \xE9clairer les feux de route (pleins phares) ?",
            options: ["30 m\xE8tres", "50 m\xE8tres", "100 m\xE8tres", "300 m\xE8tres"],
            correctOptionIndex: 2,
            explanation: "Les feux de route doivent \xE9clairer \xE0 au moins 100 m\xE8tres vers l'avant."
          },
          {
            questionText: "En agglom\xE9ration bien \xE9clair\xE9e la nuit, quels feux devez-vous utiliser ?",
            options: ["Feux de route", "Feux de croisement", "Feux de brouillard arri\xE8re uniquement", "Aucun feu"],
            correctOptionIndex: 1,
            explanation: "En ville \xE9clair\xE9e, on circule avec les feux de croisement."
          },
          {
            questionText: "Si vous \xEAtes \xE9bloui par les pleins phares d'un usager venant en sens inverse, vous devez :",
            options: ["Regarder fixement ses phares", "Porter votre regard vers le bord droit de la chauss\xE9e et ralentir", "Fermer les yeux", "Acc\xE9l\xE9rer"],
            correctOptionIndex: 1,
            explanation: "Fixer la ligne blanche du bord droit permet d'\xE9viter l'aveuglement tout en conservant sa trajectoire."
          }
        ]
      },
      {
        _id: "lec-6-2",
        _type: "lecon",
        title: "Le\xE7on 6.2 \u2013 Pluie, aquaplaning et chauss\xE9e glissante",
        ordre: 2,
        description: "R\xE9duire sa vitesse d\xE8s les premi\xE8res gouttes de pluie (verglas d'\xE9t\xE9). R\xE9agir sereinement sans braquer brusquement ni piler en cas de perte d'adh\xE9rence par aquaplaning.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Peut-on utiliser les feux de brouillard ARRI\xC8RE en cas de forte pluie ?",
            options: ["Oui, toujours", "Non, ils sont strictement interdits sous la pluie car ils \xE9blouissent fortement", "Oui sur autoroute", "Uniquement le jour"],
            correctOptionIndex: 1,
            explanation: "Le brouillard arri\xE8re est interdit par temps de pluie car il est trop \xE9blouissant."
          },
          {
            questionText: "Quels feux avant devez-vous allumer en cas de forte pluie de jour ?",
            options: ["Feux de position seuls", "Feux de croisement (et \xE9ventuellement feux de brouillard avant)", "Feux de route", "Aucun"],
            correctOptionIndex: 1,
            explanation: "La pluie r\xE9duit la visibilit\xE9 : les feux de croisement sont obligatoires."
          },
          {
            questionText: "Si votre v\xE9hicule commence \xE0 faire de l'aquaplaning sur une flaque d'eau sur autoroute :",
            options: ["Piler de toutes vos forces sur le frein", "Maintenir le volant droit, rel\xE2cher doucement l'acc\xE9l\xE9rateur sans freiner brusquement", "Tirer le frein \xE0 main", "Braquer le volant \xE0 fond"],
            correctOptionIndex: 1,
            explanation: "Conserver les roues droites et d\xE9c\xE9l\xE9rer progressivement permet de retrouver l'adh\xE9rence d\xE8s la sortie de la flaque."
          },
          {
            questionText: `Qu'appelle-t-on le "verglas d'\xE9t\xE9" ?`,
            options: ["De la neige en juillet", "La chauss\xE9e rendue tr\xE8s glissante par la pluie fine se m\xE9langeant aux poussi\xE8res et huiles d\xE9pos\xE9es sur la route", "Des morceaux de glace tombant du ciel", "Le givre de climatisation"],
            correctOptionIndex: 1,
            explanation: "Apr\xE8s une longue p\xE9riode s\xE8che, les premi\xE8res gouttes cr\xE9ent une pellicule visqueuse tr\xE8s glissante."
          },
          {
            questionText: "Par temps de forte pluie, comment devez-vous adapter vos distances de s\xE9curit\xE9 ?",
            options: ["Les r\xE9duire", "Les augmenter significativement", "Garder 1 m\xE8tre", "Aucune adaptation n\xE9cessaire"],
            correctOptionIndex: 1,
            explanation: "Le freinage \xE9tant doubl\xE9 sur route mouill\xE9e, il faut augmenter la marge de s\xE9curit\xE9."
          }
        ]
      },
      {
        _id: "lec-6-3",
        _type: "lecon",
        title: "Le\xE7on 6.3 \u2013 Brouillard, neige et verglas",
        ordre: 3,
        description: "Utilisation des feux de brouillard avant et arri\xE8re. R\xE8gles de conduite sur neige ou verglas (conduite tr\xE8s souple, sans coup de volant ni freinage sec, usage d'\xE9quipements sp\xE9ciaux).",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Dans quelles conditions pr\xE9cises l'utilisation des feux de BROUILLARD ARRI\xC8RE est-elle autoris\xE9e ?",
            options: ["Brouillard et chute de neige uniquement", "Pluie et nuit", "Vent fort", "En ville la nuit"],
            correctOptionIndex: 0,
            explanation: "Le feu de brouillard arri\xE8re est autoris\xE9 uniquement par brouillard ou chute de neige (interdit sous la pluie)."
          },
          {
            questionText: "Par temps de neige ou verglas, pour \xE9viter le patinage au d\xE9marrage, il est conseill\xE9 de :",
            options: ["Acc\xE9l\xE9rer \xE0 fond en 1\xE8re vitesse", "D\xE9marrer en douceur, \xE9ventuellement en passant la 2\xE8me vitesse", "Tirer le frein \xE0 main", "Gonfler les pneus au maximum"],
            correctOptionIndex: 1,
            explanation: "D\xE9marrer en 2\xE8me limite le couple aux roues et r\xE9duit le patinage sur neige."
          },
          {
            questionText: "La loi Montagne impose dans certaines zones montagneuses en p\xE9riode hivernale (du 1er nov au 31 mars) :",
            options: ["La possession de cha\xEEnes/chaussettes \xE0 neige ou 4 pneus hiver", "Un moteur V6", "De rouler \xE0 30 km/h maxi", "Le port d'un casque"],
            correctOptionIndex: 0,
            explanation: "Les \xE9quipements hivernaux sont obligatoires dans les communes d\xE9finies par les pr\xE9fets en zone de montagne."
          },
          {
            questionText: "Si vous d\xE9rapez du train arri\xE8re sur du verglas, vous devez :",
            options: ["Piler sur les freins et fermer les yeux", "D\xE9brayer ou rel\xE2cher les p\xE9dales et regarder vers la trajectoire de sortie souhait\xE9e sans coup de volant violent", "Acc\xE9l\xE9rer au maximum", "Tirer le frein \xE0 main"],
            correctOptionIndex: 1,
            explanation: "Guider le regard vers la zone de d\xE9gagement aide \xE0 corriger la trajectoire en douceur."
          },
          {
            questionText: "Que signale un panneau triangulaire affichant un flocon de neige ?",
            options: ["Station de ski proche", "Risque de chauss\xE9e glissante par verglas ou neige", "Changement de saison", "Distribution de cha\xEEnes"],
            correctOptionIndex: 1,
            explanation: "C'est le panneau de danger A14 signalant le risque de verglas ou neige fr\xE9quente."
          }
        ]
      },
      {
        _id: "lec-6-4",
        _type: "lecon",
        title: "Le\xE7on 6.4 \u2013 Conduite en montagne, tunnels et zones de travaux",
        ordre: 4,
        description: "Sp\xE9cificit\xE9s de la circulation en tunnel (respect des distances de s\xE9curit\xE9 signal\xE9es par les lumi\xE8res bleues, comportement en cas d'incendie) et croisement en forte pente.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Dans un tunnel, quelle est la distance de s\xE9curit\xE9 \xE0 respecter entre deux v\xE9hicules en circulation ?",
            options: ["10 m\xE8tres", "La distance mat\xE9rialis\xE9e au sol ou par des diodes bleues (souvent au moins 2 lumi\xE8res bleues)", "Il n'y en a pas", "2 m\xE8tres"],
            correctOptionIndex: 1,
            explanation: "Dans les tunnels, les diodes bleues sur les parois indiquent l'\xE9cart minimal de s\xE9curit\xE9."
          },
          {
            questionText: "Si de la fum\xE9e ou un incendie se d\xE9clare dans le tunnel devant vous :",
            options: ["Rester dans sa voiture en fermant les fen\xEAtres", "Immobiliser le v\xE9hicule sur le c\xF4t\xE9, couper le moteur et rejoindre imm\xE9diatement une niche d'\xE9vacuation/issue de secours \xE0 pied", "Faire demi-tour en roulant vite", "Acc\xE9l\xE9rer \xE0 travers les fum\xE9es"],
            correctOptionIndex: 1,
            explanation: "Il faut quitter le v\xE9hicule et gagner au plus vite les abris/issues de secours enfum\xE9s."
          },
          {
            questionText: "Sur une route de montagne \xE9troite o\xF9 le croisement est impossible, qui doit reculer entre un v\xE9hicule seul et un ensemble de v\xE9hicules (ex: bus/camion) ?",
            options: ["Le v\xE9hicule seul (le plus l\xE9ger/maniable)", "Le bus ou le camion", "Le plus rapide", "Aucun des deux"],
            correctOptionIndex: 0,
            explanation: "Le v\xE9hicule le plus l\xE9ger et maniable doit faire la man\u0153uvre de marche arri\xE8re."
          },
          {
            questionText: "Entre un v\xE9hicule descendant et un v\xE9hicule montant sur pente raide de m\xEAme cat\xE9gorie, qui a la priorit\xE9 pour passer ?",
            options: ["Le v\xE9hicule descendant", "Le v\xE9hicule qui monte (car le red\xE9marrage en c\xF4te est plus difficile)", "Celui qui klaxonne", "Le plus vieux"],
            correctOptionIndex: 1,
            explanation: "Le v\xE9hicule montant est prioritaire car s'arr\xEAter en c\xF4te est plus d\xE9licat."
          },
          {
            questionText: "Que devez-vous faire \xE0 l'approche d'un chantier routier signal\xE9 par des panneaux jaunes ?",
            options: ["Conserver la vitesse maximale", "Ralentir significativement et respecter la vitesse r\xE9duite affich\xE9e pour prot\xE9ger les agents de chantier", "D\xE9passer les camions de chantier par la droite", "Klaxonner"],
            correctOptionIndex: 1,
            explanation: "La pr\xE9sence d'hommes en travail exige une r\xE9duction stricte de la vitesse."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 7 : Éco-conduite et entretien du véhicule
  // -------------------------------------------------------------
  {
    _id: "mod-7",
    _type: "moduleFormation",
    code: "MOD-007",
    title: "Module 7 : \xC9co-conduite et entretien du v\xE9hicule",
    summary: "Ce module enseigne les r\xE8gles d'\xE9co-conduite permettant de diminuer sa consommation de carburant de 15 \xE0 20 %, la gestion de l'entretien r\xE9gulier (huile, liquide de frein, pression des pneus) et le respect de l'environnement.",
    learningObjectives: [
      "Adopter un comportement d'\xE9co-conduite souple et anticipatif",
      "Passer les rapports de vitesse au r\xE9gime optimal (2000 tr/min diesel, 2500 tr/min essence)",
      "V\xE9rifier r\xE9guli\xE8rement les niveaux de fluides et la pression des pneus",
      "R\xE9duire les \xE9missions de gaz \xE0 effet de serre et le bruit en agglom\xE9ration"
    ],
    ordre: 7,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-7-1",
        _type: "lecon",
        title: "Le\xE7on 7.1 \u2013 Principes de l'\xE9co-conduite et changement de rapports",
        ordre: 1,
        description: "Passer les vitesses sans monter inutilement dans les tours. Anticiper les ralentissements pour utiliser le frein moteur qui coupe totalement l'injection de carburant.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "\xC0 quel r\xE9gime moteur est-il recommand\xE9 de passer au rapport sup\xE9rieur sur un v\xE9hicule ESSENCE pour adopter l'\xE9co-conduite ?",
            options: ["Vers 1500 tr/min", "Vers 2000 - 2500 tr/min", "\xC0 4000 tr/min", "Au rupteur"],
            correctOptionIndex: 1,
            explanation: "Passer les rapports vers 2000-2500 tr/min \xE9vite les r\xE9gimes \xE9nergivores."
          },
          {
            questionText: "En rel\xE2chant totalement la p\xE9dale d'acc\xE9l\xE9rateur avec une vitesse enclench\xE9e (frein moteur), la consommation est de :",
            options: ["0,0 Litre / 100 km (coupure d'injection)", "5 Litres / 100 km", "Maximale", "Identique \xE0 la vitesse maximale"],
            correctOptionIndex: 0,
            explanation: "L'injection de carburant est int\xE9gralement coup\xE9e sur le frein moteur."
          },
          {
            questionText: "L'\xE9co-conduite permet de r\xE9duire la consommation moyenne de carburant de :",
            options: ["1 \xE0 2 %", "15 \xE0 20 %", "50 %", "Elle augmente la consommation"],
            correctOptionIndex: 1,
            explanation: "Une conduite souple et anticip\xE9e permet d'\xE9conomiser de 15 \xE0 20 % de carburant."
          },
          {
            questionText: "Quelle attitude \xE0 l'approche d'un feu rouge est conforme \xE0 l'\xE9co-conduite ?",
            options: ["Acc\xE9l\xE9rer jusqu'au feu puis piler", "Anticiper de loin en rel\xE2chant l'acc\xE9l\xE9rateur pour laisser rouler le v\xE9hicule sur le frein moteur", "Mettre le point mort", "Couper les phares"],
            correctOptionIndex: 1,
            explanation: "Anticiper permet souvent de conserver de l'\xE9lan si le feu repasse au vert sans s'arr\xEAter."
          },
          {
            questionText: "L'utilisation abusive de la climatisation en ville entra\xEEne une surconsommation de carburant de l'ordre de :",
            options: ["0 %", "Jusqu'\xE0 10 \xE0 25 %", "50 %", "100 %"],
            correctOptionIndex: 1,
            explanation: "La climatisation sollicite fortement le moteur et augmente nettement la consommation."
          }
        ]
      },
      {
        _id: "lec-7-2",
        _type: "lecon",
        title: "Le\xE7on 7.2 \u2013 Entretien r\xE9gulier (niveaux, pneus, freins)",
        ordre: 2,
        description: "Contr\xF4le mensuel de la pression des pneumatiques (\xE0 froid). V\xE9rification r\xE9guli\xE8re sous le capot : niveau d'huile moteur, liquide de refroidissement, liquide de frein, lave-glace.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Comment et quand doit-on v\xE9rifier la pression des pneumatiques d'un v\xE9hicule ?",
            options: ["Apr\xE8s 200 km d'autoroute \xE0 chaud", "\xC0 froid (v\xE9hicule arr\xEAt\xE9 depuis au moins 1 heure ou ayant roul\xE9 moins de 3 km) au moins 1 fois par mois", "Une fois tous les 5 ans", "Uniquement lors de la r\xE9vision"],
            correctOptionIndex: 1,
            explanation: "La pression exacte se contr\xF4le \xE0 froid mensuellement."
          },
          {
            questionText: "Un sous-gonflage des pneumatiques de 0,5 bar entra\xEEne :",
            options: ["Une \xE9conomie d'essence", "Une surconsommation de carburant et un risque d'\xE9chauffement/\xE9clatement du pneu", "Une meilleure adh\xE9rence", "Une usure moins rapide"],
            correctOptionIndex: 1,
            explanation: "Le sous-gonflage d\xE9forme le pneu, augmente la r\xE9sistance au roulement et favorise l'\xE9clatement."
          },
          {
            questionText: "O\xF9 v\xE9rifie-t-on le niveau d'huile moteur ?",
            options: ["\xC0 la jauge manuelle situ\xE9e sous le capot moteur (\xE0 froid et sur sol plat)", "Dans le r\xE9servoir \xE0 carburant", "Dans le coffre", "Sous la voiture"],
            correctOptionIndex: 0,
            explanation: "Le niveau se contr\xF4le \xE0 l'aide de la jauge sur sol plat, moteur froid."
          },
          {
            questionText: 'Si le niveau du liquide de FREIN est en dessous du rep\xE8re "MINI", cela indique :',
            options: ["Un fonctionnement parfait", "Une usure prononc\xE9e des plaquettes de frein ou une fuite grave du circuit", "Un trop-plein de carburant", "Une panne de batterie"],
            correctOptionIndex: 1,
            explanation: "Une baisse du liquide de frein traduit une usure importante ou une fuite \xE0 contr\xF4ler imm\xE9diatement."
          },
          {
            questionText: "Peut-on remplacer le liquide de refroidissement du moteur par de l'eau du robinet en hiver ?",
            options: ["Oui sans probl\xE8me", "Non, l'eau g\xE8le \xE0 0\xB0C et risque d'\xE9clater le bloc moteur", "Oui, c'est conseill\xE9", "Uniquement le soir"],
            correctOptionIndex: 1,
            explanation: "Le liquide de refroidissement contient un antigel indispensable en hiver."
          }
        ]
      },
      {
        _id: "lec-7-3",
        _type: "lecon",
        title: "Le\xE7on 7.3 \u2013 Contr\xF4le technique et \xE9co-mobilit\xE9",
        ordre: 3,
        description: "Organisation du contr\xF4le technique en France (d\xE9fauts majeurs n\xE9cessitant une contre-visite sous 2 mois). Sensibilisation \xE0 l'\xE9co-mobilit\xE9 (covoiturage, transports doux).",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "En cas de d\xE9faillance majeure constat\xE9e lors du contr\xF4le technique, quel est le d\xE9lai pour faire effectuer la contre-visite ?",
            options: ["24 heures", "2 mois", "6 mois", "1 an"],
            correctOptionIndex: 1,
            explanation: "Le propri\xE9taire dispose d'un d\xE9lai l\xE9gal de 2 mois pour faire r\xE9parer et pr\xE9senter le v\xE9hicule \xE0 la contre-visite."
          },
          {
            questionText: "Que risque un automobiliste roulant sans contr\xF4le technique \xE0 jour ?",
            options: ["Une amende de 135 \u20AC et l'immobilisation possible du v\xE9hicule", "Rien", "Un simple retrait de permis d\xE9finitif", "Une suspension d'assurance automatique de 10 ans"],
            correctOptionIndex: 0,
            explanation: "Le d\xE9faut de contr\xF4le technique est sanctionn\xE9 par une amende de 135 \u20AC."
          },
          {
            questionText: "Qu'est-ce que le covoiturage ?",
            options: ["Acheter une voiture \xE0 deux", "Partager son v\xE9hicule avec d'autres usagers effectuant le m\xEAme trajet pour r\xE9duire les co\xFBts et la pollution", "Louer son v\xE9hicule", "Utiliser un taxi"],
            correctOptionIndex: 1,
            explanation: "Le covoiturage optimise l'occupation des voitures et r\xE9duit l'empreinte carbone."
          },
          {
            questionText: "L'utilisation d'un coffre de toit non d\xE9mont\xE9 apr\xE8s les vacances augmente la consommation de :",
            options: ["0 %", "10 \xE0 15 % en raison de la d\xE9gradation de l'a\xE9rodynamisme", "50 %", "100 %"],
            correctOptionIndex: 1,
            explanation: "La r\xE9sistance \xE0 l'air cr\xE9\xE9e par les barres et coffres de toit entra\xEEne une surconsommation notable."
          },
          {
            questionText: "Quelle vignette environnementale est obligatoire en France pour circuler dans les ZFE (Zones \xE0 Faibles \xC9missions) ?",
            options: ["La vignette Crit'Air", "La vignette Autoroute", "La carte grise", "Le macaron d'assurance"],
            correctOptionIndex: 0,
            explanation: "Le certificat qualit\xE9 de l'air Crit'Air classifie les v\xE9hicules selon leurs \xE9missions polluantes."
          }
        ]
      },
      {
        _id: "lec-7-4",
        _type: "lecon",
        title: "Le\xE7on 7.4 \u2013 Pollution, \xE9missions de CO2 et choix de v\xE9hicule",
        ordre: 4,
        description: "Comprendre les gaz polluants (CO2, particules fines, oxydes d'azote NOx) et l'impact environnemental du choix de motorisation (essence, diesel, hybride, \xE9lectrique).",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quel gaz \xE9mis par la combustion des moteurs thermiques est le principal responsable de l'effet de serre et du r\xE9chauffement climatique ?",
            options: ["L'oxyg\xE8ne (O2)", "Le dioxyde de carbone (CO2)", "L'azote (N2)", "L'h\xE9lium"],
            correctOptionIndex: 1,
            explanation: "Le CO2 est le principal gaz \xE0 effet de serre rejet\xE9 par les carburants fossiles."
          },
          {
            questionText: "Les filtres \xE0 particules (FAP) sur les moteurs Diesel modernes servent \xE0 retenir :",
            options: ["L'eau de pluie", "Les particules fines canc\xE9rig\xE8nes pr\xE9sentes dans les gaz d'\xE9chappement", "L'huile de moteur", "Le bruit du pot"],
            correctOptionIndex: 1,
            explanation: "Le FAP pi\xE8ge les particules de suie extr\xEAmement fines toxiques pour les poumons."
          },
          {
            questionText: "En ville, couper son moteur lors d'un arr\xEAt prolong\xE9 sup\xE9rieur \xE0 10 secondes (ou syst\xE8me Stop & Start) :",
            options: ["Ab\xEEme le moteur", "Permet d'\xE9conomiser du carburant et de r\xE9duire les \xE9missions polluantes \xE0 l'arr\xEAt", "Consomme deux fois plus d'essence", "Bloque le volant"],
            correctOptionIndex: 1,
            explanation: "Couper le moteur d\xE8s 10 sec d'immobilit\xE9 r\xE9duit les \xE9missions toxiques en agglom\xE9ration."
          },
          {
            questionText: "Un entretien d\xE9fectueux de son v\xE9hicule (filtre \xE0 air encrass\xE9, bougies us\xE9es) provoque :",
            options: ["Une baisse de consommation", "Une hausse de la pollution et de la consommation", "Une augmentation de puissance", "Aucun changement"],
            correctOptionIndex: 1,
            explanation: "Un mauvais m\xE9lange air/carburant augmente la pollution et d\xE9t\xE9riore le rendement."
          },
          {
            questionText: "Quelle \xE9tiquette \xE9nergie/climat permet de conna\xEEtre les rejets de CO2 lors de l'achat d'une voiture neuve ?",
            options: ["L'\xE9tiquette \xE9nergie A \xE0 G", "Le permis de conduire", "Le carnet d'entretien", "La plaque d'immatriculation"],
            correctOptionIndex: 0,
            explanation: "L'\xE9tiquette \xE9nergie classe les voitures de A (tr\xE8s faible \xE9mission) \xE0 G (tr\xE8s forte \xE9mission)."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 8 : Prise de conscience des risques
  // -------------------------------------------------------------
  {
    _id: "mod-8",
    _type: "moduleFormation",
    code: "MOD-008",
    title: "Module 8 : Prise de conscience des risques (alcool, drogues, fatigue, t\xE9l\xE9phone)",
    summary: "Ce module sensibilise le candidat aux facteurs majeurs d'accidents de la route : consommation d'alcool et de stup\xE9fiants, fatigue au volant, somnolence, usage du t\xE9l\xE9phone portable et distracteurs.",
    learningObjectives: [
      "Conna\xEEtre le taux d'alcool\xE9mie l\xE9gal (0,2 g/L en probatoire, 0,5 g/L en permis d\xE9finitif)",
      "Comprendre l'\xE9limination lente de l'alcool par le foie (~0,10 \xE0 0,15 g/L par heure)",
      "Identifier les sympt\xF4mes de somnolence et l'obligation de pause toutes les 2 heures",
      "Mesurer le danger mortel de l'usage du t\xE9l\xE9phone et de l'envoi de SMS au volant"
    ],
    ordre: 8,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 600,
    tempsMinimumVisionnage: 480,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-8-1",
        _type: "lecon",
        title: "Le\xE7on 8.1 \u2013 Alcool\xE9mie, drogues et sanctions l\xE9gales",
        ordre: 1,
        description: "Taux l\xE9gaux d'alcool\xE9mie en France. 0,2 g/L de sang pour les jeunes conducteurs en permis probatoire (tol\xE9rance z\xE9ro). \xC9limination naturelle par le foie uniquement.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quel est le taux maximal d'alcool\xE9mie autoris\xE9 par la loi pour un JEUNE CONDUCTEUR en permis probatoire ?",
            options: ["0,0 g/L de sang", "0,2 g/L de sang (strictement moins de 1 verre)", "0,5 g/L de sang", "0,8 g/L de sang"],
            correctOptionIndex: 1,
            explanation: "Le taux limite en permis probatoire est de 0,2 g/L (ce qui interdit la consommation de tout verre d'alcool)."
          },
          {
            questionText: "\xC0 quelle vitesse moyenne l'organisme d'un adulte \xE9limine-t-il l'alcool ing\xE9r\xE9 ?",
            options: ["1 g/L par heure", "Environ 0,10 \xE0 0,15 g/L de sang par heure", "En buvant du caf\xE9 noir en 10 minutes", "En prenant une douche froide"],
            correctOptionIndex: 1,
            explanation: `Seul le temps permet d'\xE9liminer l'alcool, \xE0 raison d'environ 0,10 \xE0 0,15 g/L par heure. Aucun "truc" n'acc\xE9l\xE8re ce processus.`
          },
          {
            questionText: "La conduite apr\xE8s avoir consomm\xE9 des stup\xE9fiants (cannabis, coca\xEFne...) est punie par :",
            options: ["Une amende de 15 \u20AC", "Un d\xE9lit passible de 2 ans de prison, 4500 \u20AC d'amende et la perte de 6 points", "Un simple rappel \xE0 la loi", "Rien si on roule lentement"],
            correctOptionIndex: 1,
            explanation: "La conduite sous stup\xE9fiants est un d\xE9lit grave entra\xEEnant retrait de 6 points, lourde amende et peine de prison."
          },
          {
            questionText: "Combien de verres d'alcool standard faut-il g\xE9n\xE9ralement pour atteindre 0,5 g/L chez un conducteur confirm\xE9 ?",
            options: ["1 verre", "Environ 2 verres standard", "5 verres", "10 verres"],
            correctOptionIndex: 1,
            explanation: "En moyenne, 2 doses d'alcool standard servies dans un bar suffisent pour atteindre ou d\xE9passer 0,5 g/L."
          },
          {
            questionText: "Le m\xE9lange d'alcool et de cannabis multiplie le risque d'accident mortel par environ :",
            options: ["2", "5", "29", "100"],
            correctOptionIndex: 2,
            explanation: "Le cocktail alcool + cannabis cumule les effets toxiques et multiplie par 29 le risque d'accident mortel !"
          }
        ]
      },
      {
        _id: "lec-8-2",
        _type: "lecon",
        title: "Le\xE7on 8.2 \u2013 Fatigue, somnolence et pauses sur trajet",
        ordre: 2,
        description: "Identifier les premiers signes de fatigue (picotements des yeux, raideur dans la nuque, baillements r\xE9p\xE9t\xE9s). La seule solution efficace : s'arr\xEAter au moins 15 \xE0 20 minutes pour dormir.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Tous les combien de temps est-il vivement recommand\xE9 d'effectuer une pause lors d'un long trajet routier ?",
            options: ["Toutes les 30 minutes", "Toutes les 2 heures de conduite au maximum", "Toutes les 6 heures", "Uniquement quand le r\xE9servoir est vide"],
            correctOptionIndex: 1,
            explanation: "Une pause d'au moins 15 \xE0 20 minutes s'impose toutes les 2 heures de conduite."
          },
          {
            questionText: "Quel est le premier facteur de mortalit\xE9 sur les autoroutes fran\xE7aises ?",
            options: ["Les pannes m\xE9caniques", "La somnolence et la fatigue au volant", "Le manque d'essence", "Les animaux sauvages"],
            correctOptionIndex: 1,
            explanation: "La somnolence est responsable d'un accident mortel sur trois sur autoroute."
          },
          {
            questionText: "Lorsque vous ressentez les yeux qui picotent et des baillements r\xE9p\xE9t\xE9s en roulant :",
            options: ["Montez le son de la radio et ouvrez la fen\xEAtre", "Arr\xEAtez-vous d\xE8s que possible sur une aire s\xE9curis\xE9e pour faire une sieste de 15-20 min", "Buvez une boisson gazeuse en acc\xE9l\xE9rant", "Faites des appels de phares"],
            correctOptionIndex: 1,
            explanation: "Aucune astuce ne remplace le sommeil : la sieste d'\xE9tape est la seule r\xE9ponse efficace."
          },
          {
            questionText: "\xC0 quel moment de la journ\xE9e l'horloge biologique humaine enregistre-t-elle un pic naturel de somnolence ?",
            options: ["\xC0 8h du matin", "Entre 13h et 16h et entre 2h et 5h du matin", "\xC0 20h pile", "\xC0 midi"],
            correctOptionIndex: 1,
            explanation: "Les heures du d\xE9but d'apr\xE8s-midi et du milieu de nuit connaissent une baisse de vigilance physiologique."
          },
          {
            questionText: "Un conducteur priv\xE9 de sommeil depuis 17 heures pr\xE9sente des r\xE9flexes \xE9quivalents \xE0 une alcool\xE9mie de :",
            options: ["0,0 g/L", "0,5 g/L de sang", "2,0 g/L", "5,0 g/L"],
            correctOptionIndex: 1,
            explanation: "17h d'\xE9veil continu d\xE9gradent les r\xE9flexes autant qu'un taux de 0,5 g/L d'alcool dans le sang."
          }
        ]
      },
      {
        _id: "lec-8-3",
        _type: "lecon",
        title: "Le\xE7on 8.3 \u2013 Distracteurs au volant (t\xE9l\xE9phone, GPS, \xE9crans)",
        ordre: 3,
        description: "L'usage du t\xE9l\xE9phone tenu en main ou avec oreillette/casque est interdit en conduite. Lire ou \xE9crire un SMS multiplie le risque d'accident par 23.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Est-il autoris\xE9 d'utiliser des \xE9couteurs, un casque audio ou une oreillette Bluetooth en conduisant une voiture ?",
            options: ["Oui, si c'est pour le travail", "Strictement interdit par le code de la route", "Oui, d'une seule oreille", "Oui le dimanche"],
            correctOptionIndex: 1,
            explanation: "Le port de tout dispositif \xE9mettant du son \xE0 l'oreille (oreillettes, casque, \xE9couteurs) est interdit."
          },
          {
            questionText: "Lire ou \xE9crire un SMS en conduisant multiplie le risque d'accident par :",
            options: ["2", "5", "23", "100"],
            correctOptionIndex: 2,
            explanation: "La r\xE9daction d'un SMS quitte la route des yeux pendant 5 secondes en moyenne, multipliant le risque par 23."
          },
          {
            questionText: "Quelle est la sanction pour t\xE9l\xE9phone tenu en main au volant en France ?",
            options: ["Une amende de 35 \u20AC sans retrait de point", "Une amende de 135 \u20AC et un retrait de 3 points sur le permis", "La prison ferme", "Un avertissement"],
            correctOptionIndex: 1,
            explanation: "L'usage du t\xE9l\xE9phone en main est puni de 135 \u20AC d'amende et du retrait de 3 points."
          },
          {
            questionText: "Si l'usage du t\xE9l\xE9phone en main est constat\xE9 en m\xEAme temps qu'une autre infraction au code de la route :",
            options: ["Le permis peut \xEAtre imm\xE9diatement suspendu par les forces de l'ordre", "Rien de plus", "Le t\xE9l\xE9phone est confisqu\xE9 \xE0 vie", "L'amende est divis\xE9e par 2"],
            correctOptionIndex: 0,
            explanation: "Le cumul t\xE9l\xE9phone + autre infraction entra\xEEne la r\xE9tention imm\xE9diate du permis de conduire."
          },
          {
            questionText: "O\xF9 devez-vous programmer votre destination sur le GPS ?",
            options: ["En roulant sur l'autoroute", "\xC0 l'arr\xEAt complet du v\xE9hicule avant de prendre la route", "\xC0 130 km/h", "En tenant le t\xE9l\xE9phone de la main gauche"],
            correctOptionIndex: 1,
            explanation: "Toute programmation d'itin\xE9raire doit s'effectuer v\xE9hicule stationn\xE9 en s\xE9curit\xE9."
          }
        ]
      },
      {
        _id: "lec-8-4",
        _type: "lecon",
        title: "Le\xE7on 8.4 \u2013 Pression sociale, vitesse et courtoisie au volant",
        ordre: 4,
        description: "R\xE9sister \xE0 la pression des passagers ou d'autres usagers agressifs. Adopter un comportement calme, courtois et pr\xE9venant au volant (charte du conducteur responsable).",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Si un automobiliste derri\xE8re vous colle votre pare-chocs de mani\xE8re agressive pour vous inciter \xE0 d\xE9passer la vitesse :",
            options: ["Acc\xE9l\xE9rer pour lui faire plaisir", "Piler brusquement", "Garder son calme, maintenir sa vitesse l\xE9gale et faciliter son d\xE9passement d\xE8s que possible", "Faire des gestes d'insulte"],
            correctOptionIndex: 2,
            explanation: "Garder son sang-froid et ne pas c\xE9der \xE0 la provocation garantit la s\xE9curit\xE9."
          },
          {
            questionText: "La courtoisie au volant consiste notamment \xE0 :",
            options: ["Forcer le passage aux intersections", "Faciliter l'insertion des autres usagers et remercier d'un signe de main", "Klaxonner les pi\xE9tons lents", "Rouler au milieu de la route"],
            correctOptionIndex: 1,
            explanation: "La courtoisie apaise la circulation et pr\xE9vient l'agressivit\xE9 au volant."
          },
          {
            questionText: "Si vos amis passagers vous incitent \xE0 prendre des risques ou \xE0 rouler trop vite :",
            options: ["Accepter pour ne pas perdre la face", "Affirmer votre responsabilit\xE9 de conducteur et refuser fermement de prendre le moindre risque", "Leur donner le volant en roulant", "\xC9teindre les phares"],
            correctOptionIndex: 1,
            explanation: "Le conducteur est ma\xEEtre \xE0 bord et responsable de la vie de tous ses passagers."
          },
          {
            questionText: "Qu'est-ce que la d\xE9tection d'indice en conduite pr\xE9ventive ?",
            options: ["Rechercher la police", "Observer activement son environnement pour anticiper les comportements dangereux des autres usagers", "Regarder le capot", "Compter les arbres"],
            correctOptionIndex: 1,
            explanation: "Anticiper les erreurs potentielles des autres permet d'\xE9viter l'accident."
          },
          {
            questionText: "En cas de conflit verbal lors d'un accrochage l\xE9ger :",
            options: ["Envenir aux mains", "Rester calme, remplir sereinement le constat amiable et noter les t\xE9moignages", "Fuir les lieux sans s'arr\xEAter", "Casser le r\xE9troviseur adverse"],
            correctOptionIndex: 1,
            explanation: "Le calme et le remplissage rigoureux du constat amiable r\xE8glent les litiges en s\xE9curit\xE9."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 9 : Partage de la route et usagers vulnérables
  // -------------------------------------------------------------
  {
    _id: "mod-9",
    _type: "moduleFormation",
    code: "MOD-009",
    title: "Module 9 : Partage de la route et usagers vuln\xE9rables",
    summary: "Ce module apprend \xE0 cohabiter en toute s\xE9curit\xE9 avec l'ensemble des usagers de l'espace public : pi\xE9tons, PMR (personnes \xE0 mobilit\xE9 r\xE9duite), cyclistes, engins de d\xE9placement personnel motoris\xE9s (EDPM/trottinettes), motards et convois exceptionnels.",
    learningObjectives: [
      "Identifier les zones apais\xE9es (Zone 30, Zone de rencontre 20 km/h, Aire pi\xE9tonne 6 km/h)",
      "Respecter les sas v\xE9lo aux feux et les distances de d\xE9passement des cycles",
      "Anticiper les angles morts importants des poids lourds et bus",
      "Distinguer les r\xE8gles applicables aux trottinettes \xE9lectriques et EDPM"
    ],
    ordre: 9,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-9-1",
        _type: "lecon",
        title: "Le\xE7on 9.1 \u2013 Protection des pi\xE9tons et zones pi\xE9tonnes / de rencontre",
        ordre: 1,
        description: "D\xE9couverte des diff\xE9rentes zones de circulation apais\xE9e. Dans une zone de rencontre (limit\xE9e \xE0 20 km/h), les pi\xE9tons sont prioritaires sur toute la chauss\xE9e.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Quelle est la vitesse maximale autoris\xE9e dans une ZONE DE RENCONTRE en agglom\xE9ration ?",
            options: ["10 km/h", "20 km/h", "30 km/h", "50 km/h"],
            correctOptionIndex: 1,
            explanation: "Dans une zone de rencontre, la vitesse est limit\xE9e \xE0 20 km/h et le pi\xE9ton est prioritaire partout."
          },
          {
            questionText: "Dans une AIRE PI\xC9TONNE, quelle est la r\xE8gle concernant les v\xE9hicules autoris\xE9s \xE0 y p\xE9n\xE9trer au pas ?",
            options: ["Ils roulent \xE0 50 km/h", "Les pi\xE9tons sont prioritaires et les v\xE9hicules doivent rouler au pas (max 6 km/h)", "Les pi\xE9tons doivent s'\xE9carter", "Les voitures y stationnent librement"],
            correctOptionIndex: 1,
            explanation: "L'aire pi\xE9tonne est r\xE9serv\xE9e aux pi\xE9tons. Les rares v\xE9hicules autoris\xE9s roulent au pas sans g\xEAner les pi\xE9tons."
          },
          {
            questionText: "\xC0 l'approche d'une personne malvoyante traversant la rue avec une canne blanche :",
            options: ["Klaxonner pour l'avertir", "Lui c\xE9der la priorit\xE9 absolue en arr\xEAtant totalement le v\xE9hicule", "Acc\xE9l\xE9rer avant qu'elle s'engage", "Faire des appels de phares"],
            correctOptionIndex: 1,
            explanation: "Les personnes vuln\xE9rables (handicap, canne blanche) exigent une attention et un arr\xEAt bienveillant."
          },
          {
            questionText: "Peut-on chevaucher une ligne continue pour d\xE9passer un cycliste si la visibilit\xE9 est parfaite ?",
            options: ["Non jamais", "Oui, le code de la route autorise le chevauchement de la ligne continue pour d\xE9passer un v\xE9lo si la s\xE9curit\xE9 le permet", "Uniquement la nuit", "Oui en klaxonnant"],
            correctOptionIndex: 1,
            explanation: "Le chevauchement (sans franchissement total) est tol\xE9r\xE9 pour doubler un cycliste avec l'\xE9cart lat\xE9ral de s\xE9curit\xE9."
          },
          {
            questionText: "Dans une Zone 30, la circulation des cyclistes s'effectue :",
            options: ["Uniquement \xE0 droite", "En double-sens cyclable sur toutes les rues sauf d\xE9cision contraire du maire", "Interdite", "Sur le trottoir"],
            correctOptionIndex: 1,
            explanation: "Les rues en Zone 30 sont par d\xE9faut \xE0 double-sens pour les v\xE9los."
          }
        ]
      },
      {
        _id: "lec-9-2",
        _type: "lecon",
        title: "Le\xE7on 9.2 \u2013 Cohabitation avec les cyclistes et trottinettes",
        ordre: 2,
        description: "Respect des sas v\xE9los aux feux tricolores (interdit aux voitures). R\xE8gles sp\xE9cifiques applicables aux trottinettes \xE9lectriques (EDPM) : interdiction de rouler sur les trottoirs.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: `Qu'est-ce qu'un "sas v\xE9lo" situ\xE9 devant un feu tricolore ?`,
            options: ["Un parking v\xE9lo", "Un espace r\xE9serv\xE9 aux cyclistes au feu pour se placer devant les voitures et \xEAtre bien vus", "Une zone de livraison", "Un espace r\xE9serv\xE9 aux motos"],
            correctOptionIndex: 1,
            explanation: "Le sas v\xE9lo permet aux cyclistes de d\xE9marrer en toute s\xE9curit\xE9 devant les voitures au feu vert."
          },
          {
            questionText: "Une voiture s'arr\xEAtant dans un sas v\xE9lo au feu rouge risque :",
            options: ["Rien du tout", "Une amende de 35 \u20AC (ou 135 \u20AC) et un retrait de points", "Un compliment", "La saisie du v\xE9hicule"],
            correctOptionIndex: 1,
            explanation: "Refuser le sas v\xE9lo aux cyclistes constitue une infraction au code de la route."
          },
          {
            questionText: "O\xF9 une trottinette \xE9lectrique (EDPM) a-t-elle l'obligation de circuler en agglom\xE9ration ?",
            options: ["Sur les trottoirs \xE0 30 km/h", "Sur les pistes et bandes cyclables (ou sur la chauss\xE9e si pas de piste)", "Sur les autoroutes", "En sens interdit libre"],
            correctOptionIndex: 1,
            explanation: "Les EDPM doivent emprunter les voies cyclables ou la chauss\xE9e (trottoir interdit sauf si moteur coup\xE9 au pas)."
          },
          {
            questionText: "Quelle est la vitesse maximale par construction d'un engin de d\xE9placement personnel motoris\xE9 (EDPM) ?",
            options: ["15 km/h", "25 km/h", "45 km/h", "80 km/h"],
            correctOptionIndex: 1,
            explanation: "La vitesse maximale l\xE9gale par construction d'un EDPM est brid\xE9e \xE0 25 km/h."
          },
          {
            questionText: "Quelle distance lat\xE9rale minimale de s\xE9curit\xE9 devez-vous laisser pour d\xE9passer un cycliste EN AGGLOM\xC9RATION ?",
            options: ["0,5 m\xE8tre", "1,0 m\xE8tre", "1,5 m\xE8tre", "2,0 m\xE8tres"],
            correctOptionIndex: 1,
            explanation: "En ville (agglom\xE9ration), la distance minimale est de 1,0 m\xE8tre (1,5 m hors agglo)."
          }
        ]
      },
      {
        _id: "lec-9-3",
        _type: "lecon",
        title: "Le\xE7on 9.3 \u2013 Sp\xE9cificit\xE9s des deux-roues motoris\xE9s (motos, scooters)",
        ordre: 3,
        description: "Comprendre la conduite des deux-roues motoris\xE9s : acc\xE9l\xE9ration rapide, trajectoire de s\xE9curit\xE9 en virage, circulation inter-files (CIF) exp\xE9riment\xE9e sur autoroutes encombr\xE9es.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Dans les d\xE9partements autorisant la Circulation Inter-Files (CIF) des motos en cas de bouchon sur autoroute :",
            options: ["Les motos roulent sur la bande d'arr\xEAt d'urgence", "Les motos peuvent circuler entre les 2 voies les plus \xE0 gauche \xE0 50 km/h max", "Les motos roulent \xE0 130 km/h", "Les voitures doivent bloquer les motos"],
            correctOptionIndex: 1,
            explanation: "La CIF s'effectue entre les deux voies les plus \xE0 gauche lorsque le trafic est fortement ralenti."
          },
          {
            questionText: "Lorsque vous ouvrez votre porti\xE8re c\xF4t\xE9 rue apr\xE8s vous \xEAtre gar\xE9, quelle technique \xE9vite de percuter un motard ou cycliste ?",
            options: ["Ouvrir la porte d'un coup sec", "Ouvrir la porti\xE8re avec la main oppos\xE9e (main droite) pour tourner le buste et regarder vers l'arri\xE8re", "Fermer les yeux", "Sortir par la fen\xEAtre"],
            correctOptionIndex: 1,
            explanation: "La poign\xE9e hollandaise (ouvrir avec la main oppos\xE9e) force le regard vers l'angle mort arri\xE8re."
          },
          {
            questionText: `Pourquoi une moto semble-t-elle parfois "arriver plus vite" qu'on ne le pense \xE0 une intersection ?`,
            options: ["Parce qu'elle n'a pas de feux", "En raison de sa forte capacit\xE9 d'acc\xE9l\xE9ration et de sa faible surface visuelle", "Car les motos n'ont pas de freins", "C'est une illusion optique sans r\xE9alit\xE9"],
            correctOptionIndex: 1,
            explanation: "Le gabarit \xE9troit trompe le jugement de la vitesse et de la distance d'approche."
          },
          {
            questionText: "Si une moto vous suit de pr\xE8s, vous devez :",
            options: ["Piler pour lui faire peur", "\xC9viter les freinages brusques et lui faciliter le d\xE9passement d\xE8s que possible", "Mettre les essuie-glaces", "Acc\xE9l\xE9rer au maximum"],
            correctOptionIndex: 1,
            explanation: "Une moto a un risque de chute \xE9lev\xE9 en cas de freinage intempestif de l'usager qui la pr\xE9c\xE8de."
          },
          {
            questionText: "Par temps de pluie, quelle zone de marquage au sol pr\xE9sente un risque de glissade majeur pour un deux-roues ?",
            options: ["Les bandes blanches peintes au sol (passages pi\xE9tons, fl\xE8ches) et plaques d'\xE9gout", "Le bitume noir", "L'herbe du bas-c\xF4t\xE9", "Les panneaux de signalisation"],
            correctOptionIndex: 0,
            explanation: "La peinture routi\xE8re mouill\xE9e et le m\xE9tal des plaques deviennent d'authentiques patinoires pour les deux-roues."
          }
        ]
      },
      {
        _id: "lec-9-4",
        _type: "lecon",
        title: "Le\xE7on 9.4 \u2013 Camions, bus, convoi exceptionnel et angles morts",
        ordre: 4,
        description: `Visualiser les grands angles morts d'un poids lourd (\xE0 l'arri\xE8re, sur les c\xF4t\xE9s et directement sous la cabine). Signalisation "Attention Angles Morts" sur v\xE9hicules lourds.`,
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Si vous \xEAtes plac\xE9 au ras du pare-chocs arri\xE8re d'un semi-remorque, le chauffeur dans ses r\xE9troviseurs :",
            options: ["Vous voit parfaitement", "Ne vous voit absolument pas (vous \xEAtes dans son angle mort arri\xE8re)", "Vous voit gr\xE2ce \xE0 sa cam\xE9ra", "Vous entend parler"],
            correctOptionIndex: 1,
            explanation: "Rester coll\xE9 derri\xE8re un camion vous rend totalement invisible pour son conducteur."
          },
          {
            questionText: "\xC0 l'approche d'un Convoi Exceptionnel pr\xE9c\xE9d\xE9 d'un v\xE9hicule d'accompagnement \xE0 gyrophare jaune :",
            options: ["Forcer le passage", "R\xE9duire sa vitesse, se serrer \xE0 droite et c\xE9der le passage si n\xE9cessaire", "D\xE9passer le convoi par la droite", "Acc\xE9l\xE9rer"],
            correctOptionIndex: 1,
            explanation: "Un convoi exceptionnel occupant une largeur importante exige la plus grande prudence et le d\xE9gagement de la voie."
          },
          {
            questionText: `Que signale l'autocollant jaune et rouge "Attention Angles Morts" appos\xE9 sur les bus et camions ?`,
            options: ["Une publicit\xE9", "L'avertissement des zones aveugles autour du v\xE9hicule o\xF9 les usagers risquent de ne pas \xEAtre vus", "Une interdiction de d\xE9passer", "Une marque de fabricant"],
            correctOptionIndex: 1,
            explanation: "Cet autocollant signale aux pi\xE9tons, cyclistes et automobilistes les zones mortes visuelles du poids lourd."
          },
          {
            questionText: "Lors d'un d\xE9passement d'un camion poids lourd par vent fort, vous devez anticiper :",
            options: ["Aucun effet", "Un effet d'aspiration lors du d\xE9passement puis une pouss\xE9e de vent lat\xE9ral en sortant de son ombre", "Une panne de moteur", "Une augmentation de vitesse du camion"],
            correctOptionIndex: 1,
            explanation: "L'\xE9cran form\xE9 par le camion abrite du vent, puis sa sortie provoque un coup de vent lat\xE9ral au volant."
          },
          {
            questionText: "Peut-on s'ins\xE9rer entre les v\xE9hicules d'un convoi militaire ou d'un cort\xE8ge officiel en marche ?",
            options: ["Oui librement", "Strictement interdit d'interrompre la continuit\xE9 d'un convoi constitu\xE9", "Uniquement le week-end", "Oui en klaxonnant"],
            correctOptionIndex: 1,
            explanation: "Il est interdit de couper ou de s'immiscer au milieu d'un convoi prioritaire ou militaire en d\xE9placement."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 10 : Examen blanc & Révisions théoriques du Permis B
  // -------------------------------------------------------------
  {
    _id: "mod-10",
    _type: "moduleFormation",
    code: "MOD-010",
    title: "Module 10 : Examen blanc & R\xE9visions th\xE9oriques du Permis B",
    summary: "Ce module final pr\xE9pare l'\xE9l\xE8ve aux conditions r\xE9elles de l'\xC9preuve Th\xE9orique G\xE9n\xE9rale (ETG) du Permis B. Il passe en revue les pi\xE8ges classiques des questions, la m\xE9thodologie d'analyse des visuels et propose des s\xE9ries de tests blancs officiels.",
    learningObjectives: [
      "Ma\xEEtriser la grille d'analyse des questions ETG (Qui ? O\xF9 ? Que faire ?)",
      "D\xE9jouer les pi\xE8ges li\xE9s aux d\xE9tails d'arri\xE8re-plan (r\xE9troviseurs, feux, voyants)",
      "Obtenir au moins 35 bonnes r\xE9ponses sur 40 aux tests blancs officiels",
      "Valider l'int\xE9gralit\xE9 du parcours th\xE9orique pour l'obtention de l'attestation Matoa"
    ],
    ordre: 10,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
    durationSeconds: 600,
    tempsMinimumVisionnage: 480,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-10-1",
        _type: "lecon",
        title: "Le\xE7on 10.1 \u2013 Pi\xE8ges classiques et erreurs fr\xE9quentes \xE0 l'examen ETG",
        ordre: 1,
        description: `Analyse d\xE9cortiqu\xE9e des pi\xE8ges r\xE9currents de l'examen : distinction entre "Je peux" et "Je dois", observation fine du r\xE9troviseur int\xE9rieur avant de ralentir ou de doubler.`,
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: `Dans l'intitul\xE9 d'une question \xE0 l'examen, quelle est la nuance capitale entre "Je peux d\xE9passer" et "Je dois d\xE9passer" ?`,
            options: ["Aucune nuance", '"Je peux" exprime une autorisation sans obligation, alors que "Je dois" rend la man\u0153uvre obligatoire', "C'est la m\xEAme chose", '"Je dois" est interdit'],
            correctOptionIndex: 1,
            explanation: "V\xE9rifiez toujours si l'action est une simple possibilit\xE9 ou une obligation impos\xE9e par le code."
          },
          {
            questionText: "\xC0 l'examen du code, si une voiture vous colle de tr\xE8s pr\xE8s dans votre r\xE9troviseur int\xE9rieur et que vous approchez d'un feu orange :",
            options: ["Piler sur les freins", "Franchir prudemment le feu orange car l'arr\xEAt d'urgence ferait percuter le v\xE9hicule suiveur", "Faire marche arri\xE8re", "Tirer le frein \xE0 main"],
            correctOptionIndex: 1,
            explanation: "L'observation du r\xE9troviseur modifie la d\xE9cision : si piler cr\xE9e un choc arri\xE8re garanti, le franchissement au orange est justifi\xE9."
          },
          {
            questionText: "Combien de fautes maximum sont autoris\xE9es sur l'\xE9preuve officielle de 40 questions du Permis B (ETG) ?",
            options: ["0 faute", "5 fautes maximum (score min : 35/40)", "10 fautes", "20 fautes"],
            correctOptionIndex: 1,
            explanation: "L'examen officiel exige au moins 35 bonnes r\xE9ponses sur 40 (soit 5 fautes max)."
          },
          {
            questionText: "\xC0 l'examen, si la question comporte deux propositions A/B et C/D ind\xE9pendantes :",
            options: ["Il n'y a toujours qu'une seule bonne r\xE9ponse", "Il peut y avoir plusieurs bonnes r\xE9ponses simultan\xE9es (ex: A et C)", "Il faut toujours tout cocher", "On ne coche rien"],
            correctOptionIndex: 1,
            explanation: "Beaucoup de questions QCM de l'examen comportent 2 choix exacts simultan\xE9s."
          },
          {
            questionText: "Quelle est la dur\xE9e impartie pour r\xE9pondre \xE0 chaque question lors de l'examen officiel sur tablette ?",
            options: ["5 secondes", "20 secondes", "1 minute", "Illimit\xE9e"],
            correctOptionIndex: 1,
            explanation: "Le candidat dispose de 20 secondes apr\xE8s la lecture du son pour valider son choix."
          }
        ]
      },
      {
        _id: "lec-10-2",
        _type: "lecon",
        title: "Le\xE7on 10.2 \u2013 M\xE9thodologie d'analyse d'une photo / question ETG",
        ordre: 2,
        description: "M\xE9thode syst\xE9matique en 4 \xE9tapes pour analyser une image : 1. Signalisation et marquages, 2. Usagers environnants, 3. R\xE9troviseurs, 4. Voyants du tableau de bord.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 540,
        tempsMinimumVisionnageSeconds: 432,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Lorsqu'une photo montre l'aiguille du compteur de vitesse \xE0 45 km/h en agglom\xE9ration :",
            options: ["Vous devez acc\xE9l\xE9rer", "Vous \xEAtes dans la limite l\xE9gale de 50 km/h", "Vous \xEAtes en exc\xE8s de vitesse", "Le compteur est en panne"],
            correctOptionIndex: 1,
            explanation: "45 km/h respecte la limitation de 50 km/h en ville."
          },
          {
            questionText: "Si une question montre des gouttes de pluie sur le pare-brise sans panneau de vitesse :",
            options: ["La vitesse maximale autoris\xE9e est la vitesse par temps de pluie (ex: 110 sur autoroute)", "Les limitations ne s'appliquent plus", "On doit rouler \xE0 10 km/h", "On met les pleins phares"],
            correctOptionIndex: 0,
            explanation: "L'indice visuel de la pluie sur le pare-brise implique d'appliquer les limites m\xE9t\xE9o."
          },
          {
            questionText: 'Que devez-vous syst\xE9matiquement v\xE9rifier sur la photo avant de r\xE9pondre \xE0 la question "Je d\xE9passe" ?',
            options: ["Les panneaux, la ligne au sol, la voie en face ET le r\xE9troviseur int\xE9rieur pour v\xE9rifier qu me d\xE9passe pas", "Uniquement la couleur de la voiture", "Le paysage \xE0 droite", "L'heure de la journ\xE9e"],
            correctOptionIndex: 0,
            explanation: "Un d\xE9passement exige la v\xE9rification compl\xE8te de la cha\xEEne d'indices (panneau + ligne + face + arri\xE8re)."
          },
          {
            questionText: `\xC0 l'examen, si la question demande "Je suis bien plac\xE9 pour... ?" et que vous roulez sur la voie du milieu sur autoroute sans d\xE9passer :`,
            options: ["Oui", "Non, la r\xE8gle impose de rouler sur la voie la plus \xE0 droite", "Peu importe", "Uniquement le soir"],
            correctOptionIndex: 1,
            explanation: "En dehors d'un d\xE9passement actif, squatter la voie centrale est une mauvaise position."
          },
          {
            questionText: "Si une photo montre un feu vert ET un pi\xE9ton engag\xE9 sur le passage pi\xE9ton \xE0 droite :",
            options: ["Le feu vert donne la priorit\xE9 \xE0 la voiture, le pi\xE9ton doit attendre", "Vous devez c\xE9der le passage au pi\xE9ton engag\xE9", "Vous klaxonnez", "Vous passez en acc\xE9l\xE9rant"],
            correctOptionIndex: 1,
            explanation: "Le pi\xE9ton engag\xE9 prime sur la signalisation lumineuse pour des raisons \xE9vidents de s\xE9curit\xE9 humaine."
          }
        ]
      },
      {
        _id: "lec-10-3",
        _type: "lecon",
        title: "Le\xE7on 10.3 \u2013 Test blanc officiel Permis B \u2013 Partie 1 (Concepts & Signalisation)",
        ordre: 3,
        description: "Premi\xE8re s\xE9rie de test blanc portant sur la signalisation routi\xE8re, les r\xE8gles de priorit\xE9 et les commandes du v\xE9hicule.",
        videoUrl: "https://www.youtube.com/watch?v=lHEFMztZu0g",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Un panneau carr\xE9 \xE0 fond bleu montrant une silhouette d'autoroute blanche indique :",
            options: ["Entr\xE9e d'une autoroute o\xF9 la vitesse est limit\xE9e \xE0 130 km/h par temps sec", "Une route de campagne", "Un parking payant", "Fin d'autoroute"],
            correctOptionIndex: 0,
            explanation: "C'est le panneau C13a d'entr\xE9e d'autoroute."
          },
          {
            questionText: "Face \xE0 un feu rouge fixe avec une fl\xE8che verte pointant vers la droite :",
            options: ["Vous pouvez tourner \xE0 droite en c\xE9der le passage aux usagers de la voie abord\xE9e", "Vous devez vous arr\xEAter obligatoirement", "Vous devez aller tout droit", "Vous faites demi-tour"],
            correctOptionIndex: 0,
            explanation: "La fl\xE8che verte de virage autorise le mouvement \xE0 droite malgr\xE9 le feu rouge direct."
          },
          {
            questionText: "\xC0 quelle fr\xE9quence minimale devez-vous contr\xF4ler les miroirs r\xE9troviseurs en conduite urbaine ?",
            options: ["Toutes les 10 \xE0 15 secondes et avant chaque freinage/changement de voie", "Une fois par jour", "Uniquement au feu rouge", "Jamais"],
            correctOptionIndex: 0,
            explanation: "Le balayage visuel r\xE9gulier des r\xE9troviseurs maintient la conscience de la situation arri\xE8re."
          },
          {
            questionText: "Un panneau rond rouge barr\xE9 d'un trait blanc horizontal (sens interdit) interdit :",
            options: ["L'acc\xE8s \xE0 tous les v\xE9hicules dans ce sens de circulation", "Le stationnement uniquement", "Les v\xE9los seulement", "La marche arri\xE8re"],
            correctOptionIndex: 0,
            explanation: "Le panneau B1 interdit l'acc\xE8s au tron\xE7on de voie dans le sens consid\xE9r\xE9."
          },
          {
            questionText: "Sur un rond-point sans panneau de priorit\xE9 \xE0 l'entr\xE9e :",
            options: ["Vous c\xE9der le passage \xE0 droite aux v\xE9hicules qui entrent", "Vous passez sans regarder", "Ceux qui sont sur l'anneau sont prioritaires", "Vous klaxonnez"],
            correctOptionIndex: 0,
            explanation: "Sans panneau C\xE9der le passage, la priorit\xE9 \xE0 droite s'applique \xE0 l'entr\xE9e."
          }
        ]
      },
      {
        _id: "lec-10-4",
        _type: "lecon",
        title: "Le\xE7on 10.4 \u2013 Test blanc officiel Permis B \u2013 Partie 2 (Priorit\xE9s, Risques & Secourisme)",
        ordre: 4,
        description: "Deuxi\xE8me partie du test blanc g\xE9n\xE9ral int\xE9grant les comportements de secourisme (PAS : Prot\xE9ger, Alerter, Secourir) et l'\xE9valuation finale des risques.",
        videoUrl: "https://www.youtube.com/watch?v=TpD4ZzcmQGY",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          {
            questionText: "Sur le lieu d'un accident de la route, quel est l'ordre exact des trois actions de secours (protocole PAS) ?",
            options: ["Secourir, Alerter, Prot\xE9ger", "Prot\xE9ger le suraccident, Alerter les secours, Secourir les victimes", "Alerter, Courir, Partir", "Appeler les assurances"],
            correctOptionIndex: 1,
            explanation: "Le protocole universel est P.A.S. : Prot\xE9ger (baliser), Alerter (112/18/15), Secourir."
          },
          {
            questionText: "Quel est le num\xE9ro d'appel d'urgence europ\xE9en gratuit accessible depuis tout t\xE9l\xE9phone ?",
            options: ["112", "18", "15", "17"],
            correctOptionIndex: 0,
            explanation: "Le 112 est le num\xE9ro d'urgence valide dans toute l'Union Europ\xE9enne."
          },
          {
            questionText: "Devant un bless\xE9 inconscient qui respire sur la chauss\xE9e, quelle position de s\xE9curit\xE9 devez-vous adopter ?",
            options: ["Le faire asseoir", "La Position Lat\xE9rale de S\xE9curit\xE9 (PLS) sur le c\xF4t\xE9 pour \xE9viter l'\xE9touffement", "Le faire boire de l'eau", "Le relever debout"],
            correctOptionIndex: 1,
            explanation: "La PLS maintient les voies a\xE9riennes libres chez une personne inconsciente qui respire."
          },
          {
            questionText: "Faut-il retirer le casque d'un motard bless\xE9 \xE0 terre apr\xE8s un accident ?",
            options: ["Oui imm\xE9diatement", "Strictement NON, sauf urgence vitale par des secouristes entra\xEEn\xE9s (risque de paralysie cervicale)", "Oui pour lui donner \xE0 boire", "Oui s'il le demande"],
            correctOptionIndex: 1,
            explanation: "Retirer le casque d'un motard risque d'aggraver irr\xE9versiblement une l\xE9sion des vert\xE8bres cervicales."
          },
          {
            questionText: "Que devez-vous placer en priorit\xE9 pour baliser un accident de nuit sur route hors agglom\xE9ration ?",
            options: ["Allumer les feux de d\xE9tresse de votre v\xE9hicule et poser le triangle de pr\xE9signalisation \xE0 au moins 30 m\xE8tres en amont", "Attendre le jour", "Agiter un chiffon", "Rester au milieu de la route"],
            correctOptionIndex: 0,
            explanation: "Feux de d\xE9tresse + gilet haute visibilit\xE9 + triangle \xE0 30m minimisent le risque de suraccident."
          }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // -------------------------------------------------------------
  // MODULE 11 : Usagers vulnérables (piétons, cyclistes, deux-roues)
  // -------------------------------------------------------------
  {
    _id: "mod-11",
    _type: "moduleFormation",
    code: "MOD-011",
    title: "Module 11 : Usagers vuln\xE9rables (pi\xE9tons, cyclistes, deux-roues)",
    summary: "Ce module se concentre sur la protection des usagers vuln\xE9rables : pi\xE9tons, cyclistes et motocyclistes.",
    learningObjectives: [
      "Prot\xE9ger les pi\xE9tons sur et hors des passages pi\xE9tons",
      "Respecter les cyclistes, sas v\xE9lo et distances de d\xE9passement",
      "Anticiper la pr\xE9sence des deux-roues motoris\xE9s et leurs angles morts",
      "Adopter une conduite courtoise et s\xE9curis\xE9e envers tous les usagers"
    ],
    ordre: 11,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/@codesrousseau",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-11-1",
        _type: "lecon",
        title: "Le\xE7on 11.1 \u2013 Les pi\xE9tons : droits et comportements \xE0 adopter",
        ordre: 1,
        description: "Priorit\xE9 aux passages pi\xE9tons et zones de rencontre.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Un pi\xE9ton engag\xE9 sur un passage prot\xE9g\xE9 a :", options: ["Toujours priorit\xE9", "Jamais", "Jour uniquement", "Rien"], correctOptionIndex: 0, explanation: "Priorit\xE9 absolue." },
          { questionText: "Dans une zone de rencontre, la vitesse est limit\xE9e \xE0 :", options: ["50 km/h", "20 km/h", "30 km/h", "10 km/h"], correctOptionIndex: 1, explanation: "20 km/h max." },
          { questionText: "Pr\xE8s d'une \xE9cole aux heures de sortie, il faut :", options: ["Rien", "Redoubler de prudence", "Acc\xE9l\xE9rer", "Rien"], correctOptionIndex: 1, explanation: "Prudence accrue." },
          { questionText: "Un pi\xE9ton s'appr\xEAtant \xE0 traverser doit \xEAtre :", options: ["Ignor\xE9", "Anticip\xE9 avec prudence", "Klaxonn\xE9", "Rien"], correctOptionIndex: 1, explanation: "Anticip\xE9." },
          { questionText: "Klaxonner un pi\xE9ton sur un passage prot\xE9g\xE9 est :", options: ["Autoris\xE9", "D\xE9conseill\xE9 et dangereux", "Recommand\xE9", "Rien"], correctOptionIndex: 1, explanation: "Inutile et dangereux." }
        ]
      },
      {
        _id: "lec-11-2",
        _type: "lecon",
        title: "Le\xE7on 11.2 \u2013 Cyclistes : cohabitation et zones r\xE9serv\xE9es",
        ordre: 2,
        description: "Pistes cyclables, sas v\xE9lo, zones 30 et distances de d\xE9passement.",
        videoUrl: "https://www.youtube.com/@prepacode",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Le sas v\xE9lo \xE0 un feu rouge sert \xE0 :", options: ["Rien", "Permettre aux cyclistes de se positionner en s\xE9curit\xE9", "Stationner", "Rien"], correctOptionIndex: 1, explanation: "Positionnement v\xE9lo." },
          { questionText: "En tournant \xE0 droite, il faut v\xE9rifier particuli\xE8rement :", options: ["Rien", "La pr\xE9sence d'un cycliste dans l'angle mort", "La radio", "Rien"], correctOptionIndex: 1, explanation: "Angle mort \xE0 droite." },
          { questionText: "Franchir une piste cyclable impose de :", options: ["Rien", "C\xE9der le passage aux cyclistes", "Acc\xE9l\xE9rer", "Rien"], correctOptionIndex: 1, explanation: "C\xE9der le passage." },
          { questionText: "En zone 30, la cohabitation avec les cyclistes est :", options: ["Facilit\xE9e par la vitesse r\xE9duite", "Impossible", "Interdite", "Rien"], correctOptionIndex: 0, explanation: "Vitesse apais\xE9e." },
          { questionText: "Ouvrir sa porti\xE8re sans regarder peut :", options: ["Sans risque", "Blesser un cycliste (m\xE9thode hollandaise)", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Risque d'impact." }
        ]
      },
      {
        _id: "lec-11-3",
        _type: "lecon",
        title: "Le\xE7on 11.3 \u2013 Motocyclistes et deux-roues motoris\xE9s",
        ordre: 3,
        description: "Visibilit\xE9 r\xE9duite des deux-roues et distances de s\xE9curit\xE9.",
        videoUrl: "https://www.youtube.com/@codesrousseau",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Les deux-roues motoris\xE9s sont :", options: ["Toujours bien visibles", "Souvent moins visibles \xE0 cause de leur gabarit", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Gabarit mince." },
          { questionText: "Avant de tourner, il faut v\xE9rifier :", options: ["Rien", "L'absence de deux-roues remontant la file", "La radio", "Rien"], correctOptionIndex: 1, explanation: "Contr\xF4ler les r\xE9tros." },
          { questionText: "La distance de s\xE9curit\xE9 avec un deux-roues doit \xEAtre :", options: ["R\xE9duite", "Au moins \xE9quivalente \xE0 celle d'une voiture", "Nulle", "Rien"], correctOptionIndex: 1, explanation: "Distance \xE9quivalente." },
          { questionText: "La circulation inter-files des motos est :", options: ["Jamais", "Autoris\xE9e sous conditions dans certaines zones", "Toujours libre", "Rien"], correctOptionIndex: 1, explanation: "Exp\xE9riment\xE9e sous conditions." },
          { questionText: "Ouvrir une porti\xE8re sans regarder met en danger :", options: ["Rien", "Un motard/cycliste qui approche", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Choc direct." }
        ]
      },
      {
        _id: "lec-11-4",
        _type: "lecon",
        title: "Le\xE7on 11.4 \u2013 Enfants et personnes \xE0 mobilit\xE9 r\xE9duite",
        ordre: 4,
        description: "Comportements impr\xE9visibles des enfants et vigilance envers les PMR.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Les enfants ont un comportement :", options: ["Toujours pr\xE9visible", "Souvent impr\xE9visible", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Comportement spontan\xE9." },
          { questionText: "Pr\xE8s d'une aire de jeux, il faut :", options: ["Rien", "R\xE9duire sa vitesse et rester attentif", "Acc\xE9l\xE9rer", "Rien"], correctOptionIndex: 1, explanation: "Vigilance accrue." },
          { questionText: "Une PMR qui traverse doit b\xE9n\xE9ficier de :", options: ["Rien", "Temps suppl\xE9mentaire et de patience", "Klaxon", "Rien"], correctOptionIndex: 1, explanation: "Patience et temps." },
          { questionText: "Un ballon qui roule annonce :", options: ["Rien", "Un enfant qui surgit derri\xE8re", "Une f\xEAte", "Rien"], correctOptionIndex: 1, explanation: "Pr\xE9sence d'un enfant." },
          { questionText: "Les zones scolaires sont souvent signal\xE9es par :", options: ["Rien", "Panneaux sp\xE9cifiques et limitation de vitesse", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Panneaux sp\xE9cifiques." }
        ]
      },
      {
        _id: "lec-11-5",
        _type: "lecon",
        title: "Le\xE7on 11.5 \u2013 Bonnes pratiques g\xE9n\xE9rales usagers vuln\xE9rables",
        ordre: 5,
        description: "Anticipation, courtoisie et partage apais\xE9 de la route.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "La courtoisie envers les usagers vuln\xE9rables contribue \xE0 :", options: ["Rien", "Une route plus s\xFBre pour tous", "Ralentir", "Rien"], correctOptionIndex: 1, explanation: "S\xE9curit\xE9 partag\xE9e." },
          { questionText: "Anticiper les intentions d'un usager vuln\xE9rable permet :", options: ["Rien", "De r\xE9agir plus t\xF4t et en s\xE9curit\xE9", "Perdre du temps", "Rien"], correctOptionIndex: 1, explanation: "Marge de r\xE9action." },
          { questionText: "Il est recommand\xE9 de toujours garder :", options: ["Une distance de s\xE9curit\xE9 suffisante", "Rien", "Vitesse max", "Rien"], correctOptionIndex: 0, explanation: "Distance de s\xE9curit\xE9." },
          { questionText: "Le partage apais\xE9 de la route repose sur :", options: ["La rapidit\xE9", "Le respect mutuel entre usagers", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Respect r\xE9ciproque." },
          { questionText: "En cas de doute sur la trajectoire d'un pi\xE9ton, il faut :", options: ["Acc\xE9l\xE9rer", "Ralentir et marquer l'arr\xEAt si besoin", "Klaxonner fort", "Rien"], correctOptionIndex: 1, explanation: "Ralentir." }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // MODULE 12
  {
    _id: "mod-12",
    _type: "moduleFormation",
    code: "MOD-012",
    title: "Module 12 : Premiers secours et comportement en cas d'accident",
    summary: "Ce module pr\xE9sente les gestes essentiels de premiers secours et la conduite \xE0 tenir en cas d'accident : prot\xE9ger, alerter, secourir.",
    learningObjectives: [
      "Appliquer la cha\xEEne de secours P.A.S. (Prot\xE9ger, Alerter, Secourir)",
      "Alerter les secours avec les num\xE9ros 112, 15, 17, 18",
      "Placer une personne inconsciente qui respire en PLS",
      "S\xE9curiser la zone d'accident pour \xE9viter le suraccident"
    ],
    ordre: 12,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/@prepacode",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-12-1",
        _type: "lecon",
        title: "Le\xE7on 12.1 \u2013 La proc\xE9dure PAS (Prot\xE9ger, Alerter, Secourir)",
        ordre: 1,
        description: "Ordre des priorit\xE9s sur un lieu d'accident et s\xE9curisation de la zone.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "La premi\xE8re \xE9tape face \xE0 un accident est :", options: ["Secourir", "Prot\xE9ger", "Alerter", "Filmer"], correctOptionIndex: 1, explanation: "Prot\xE9ger en premier." },
          { questionText: "Prot\xE9ger la zone consiste \xE0 :", options: ["Rien", "\xC9viter le suraccident (gilet, triangle, d\xE9tresse)", "Filmer", "Rien"], correctOptionIndex: 1, explanation: "Balisage de s\xE9curit\xE9." },
          { questionText: "L'ordre correct est :", options: ["Alerter, Secourir, Prot\xE9ger", "Prot\xE9ger, Alerter, Secourir", "Secourir, Prot\xE9ger, Alerter", "Aucun"], correctOptionIndex: 1, explanation: "Prot\xE9ger -> Alerter -> Secourir." },
          { questionText: "Avant de s'approcher d'un accident, il faut :", options: ["Rien", "V\xE9rifier l'absence de danger imm\xE9diat", "Foncer", "Rien"], correctOptionIndex: 1, explanation: "\xC9valuer la s\xE9curit\xE9." },
          { questionText: "Le triangle de signalisation sert \xE0 :", options: ["Rien", "Pr\xE9venir les usagers du danger en amont", "D\xE9corer", "Rien"], correctOptionIndex: 1, explanation: "Pr\xE9venir du danger." }
        ]
      },
      {
        _id: "lec-12-2",
        _type: "lecon",
        title: "Le\xE7on 12.2 \u2013 Alerter les secours efficacement",
        ordre: 2,
        description: "Num\xE9ros d'urgence (15, 17, 18, 112) et informations essentielles \xE0 transmettre.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Le num\xE9ro d'urgence europ\xE9en unique est :", options: ["15", "112", "17", "18"], correctOptionIndex: 1, explanation: "112 num\xE9ro unique." },
          { questionText: "Le SAMU correspond au num\xE9ro :", options: ["15", "17", "18", "112"], correctOptionIndex: 0, explanation: "SAMU = 15." },
          { questionText: "La police/gendarmerie correspond au num\xE9ro :", options: ["15", "17", "18", "112"], correctOptionIndex: 1, explanation: "Police = 17." },
          { questionText: "Les pompiers correspondent au num\xE9ro :", options: ["15", "17", "18", "112"], correctOptionIndex: 2, explanation: "Pompiers = 18." },
          { questionText: "Lors de l'appel, il faut donner en priorit\xE9 :", options: ["Rien", "Le lieu pr\xE9cis et la nature de l'accident", "Nom", "Rien"], correctOptionIndex: 1, explanation: "Lieu et bilan." }
        ]
      },
      {
        _id: "lec-12-3",
        _type: "lecon",
        title: "Le\xE7on 12.3 \u2013 Gestes de premiers secours de base",
        ordre: 3,
        description: "Position lat\xE9rale de s\xE9curit\xE9 (PLS) et v\xE9rification de la respiration.",
        videoUrl: "https://www.youtube.com/@codesrousseau",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "La PLS est utilis\xE9e pour :", options: ["Une personne consciente", "Une personne inconsciente qui respire", "Arr\xEAt cardiaque", "Rien"], correctOptionIndex: 1, explanation: "Inconsciente qui respire." },
          { questionText: "Un bless\xE9 grave ne doit \xEAtre d\xE9plac\xE9 que :", options: ["Toujours", "En cas de danger imm\xE9diat uniquement", "Jamais", "Rien"], correctOptionIndex: 1, explanation: "Danger imm\xE9diat." },
          { questionText: "Avant tout geste, il faut v\xE9rifier :", options: ["Rien", "La conscience et la respiration de la victime", "T\xE9l\xE9phone", "Rien"], correctOptionIndex: 1, explanation: "\xC9tat de conscience." },
          { questionText: "En cas d'arr\xEAt cardiaque, le geste prioritaire est :", options: ["PLS", "Massage cardiaque et alerte imm\xE9diate", "Rien", "Attendre"], correctOptionIndex: 1, explanation: "Massage cardiaque." },
          { questionText: "Un d\xE9fibrillateur (DAE) peut \xEAtre utilis\xE9 par :", options: ["M\xE9decins", "Toute personne (guidage vocal)", "Personne", "Rien"], correctOptionIndex: 1, explanation: "Accessible \xE0 tous." }
        ]
      },
      {
        _id: "lec-12-4",
        _type: "lecon",
        title: "Le\xE7on 12.4 \u2013 Que faire en cas d'accident mat\xE9riel ou corporel",
        ordre: 4,
        description: "Constat amiable, \xE9change d'informations et obligations l\xE9gales.",
        videoUrl: "https://www.youtube.com/@prepacode",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Apr\xE8s un accident mat\xE9riel sans bless\xE9, il faut :", options: ["Fuir", "Remplir un constat amiable", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Constat amiable." },
          { questionText: "Quitter les lieux d'un accident sans s'arr\xEAter est :", options: ["Autoris\xE9", "Un d\xE9lit de fuite", "Tol\xE9r\xE9", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit p\xE9nale." },
          { questionText: "En cas d'accident corporel, la priorit\xE9 est :", options: ["Constat", "Prot\xE9ger, alerter, secourir avant tout", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Secourir d'abord." },
          { questionText: "Le constat amiable doit \xEAtre sign\xE9 par :", options: ["Un seul", "Les deux conducteurs impliqu\xE9s", "Personne", "Rien"], correctOptionIndex: 1, explanation: "Les deux conducteurs." },
          { questionText: "En cas de d\xE9saccord sur le constat, il faut :", options: ["Rien", "Noter ses r\xE9serves dans les observations", "Falsifier", "Rien"], correctOptionIndex: 1, explanation: "Noter les r\xE9serves." }
        ]
      },
      {
        _id: "lec-12-5",
        _type: "lecon",
        title: "Le\xE7on 12.5 \u2013 Pr\xE9venir les sur-accidents",
        ordre: 5,
        description: "Signalisation d'un v\xE9hicule accident\xE9 ou en panne et gilet de s\xE9curit\xE9.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Apr\xE8s un accident, les occupants doivent :", options: ["Rester dans le v\xE9hicule", "Se mettre en s\xE9curit\xE9 derri\xE8re la glissi\xE8re", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Mettre \xE0 l'abri." },
          { questionText: "Le gilet de s\xE9curit\xE9 doit \xEAtre enfil\xE9 :", options: ["Apr\xE8s \xEAtre sorti", "Avant de sortir du v\xE9hicule", "Jamais", "Rien"], correctOptionIndex: 1, explanation: "Avant la sortie." },
          { questionText: "Un v\xE9hicule accident\xE9 sur la chauss\xE9e doit avoir :", options: ["Rien", "Feux de d\xE9tresse et triangle", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Balisage d'urgence." },
          { questionText: "Rester sur la chauss\xE9e pr\xE8s d'un v\xE9hicule accident\xE9 est :", options: ["S\xFBr", "Tr\xE8s dangereux", "Recommand\xE9", "Rien"], correctOptionIndex: 1, explanation: "Danger de suraccident." },
          { questionText: "Pr\xE9venir un suraccident, c'est :", options: ["Rien", "\xC9viter qu'un autre usager ne percute la zone", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Protection." }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // MODULE 13
  {
    _id: "mod-13",
    _type: "moduleFormation",
    code: "MOD-013",
    title: "Module 13 : Documents, assurance et responsabilit\xE9 du conducteur",
    summary: "Ce module traite des documents obligatoires, de l'assurance, du permis \xE0 points, et des responsabilit\xE9s civiles et p\xE9nales.",
    learningObjectives: [
      "Pr\xE9senter permis, carte grise et attestation d'assurance en contr\xF4le",
      "Comprendre le capital de 6 points du permis probatoire",
      "Distinguer assurance au tiers obligatoire et tous risques",
      "Conna\xEEtre les responsabilit\xE9s civiles et p\xE9nales du conducteur"
    ],
    ordre: 13,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/@ornikar",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-13-1",
        _type: "lecon",
        title: "Le\xE7on 13.1 \u2013 Documents obligatoires \xE0 bord",
        ordre: 1,
        description: "Permis, carte grise, attestation d'assurance et contr\xF4le technique.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Les documents obligatoires \xE0 pr\xE9senter en contr\xF4le sont :", options: ["Rien", "Permis, carte grise, assurance", "Permis uniquement", "Rien"], correctOptionIndex: 1, explanation: "Permis, carte grise, assurance." },
          { questionText: "Ne pas pr\xE9senter son assurance peut entra\xEEner :", options: ["Rien", "Une amende forfaitaire", "Un bonus", "Rien"], correctOptionIndex: 1, explanation: "Amende pour d\xE9faut de pr\xE9sentation." },
          { questionText: "La carte grise prouve :", options: ["Rien", "L'immatriculation et l'identit\xE9 du titulaire", "L'assurance", "Rien"], correctOptionIndex: 1, explanation: "Certificat d'immatriculation." },
          { questionText: "Le contr\xF4le technique doit \xEAtre \xE0 jour pour :", options: ["Rien", "Circuler l\xE9galement sur voie publique", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Obligation l\xE9gale." },
          { questionText: "Conduire sans permis valide est :", options: ["Tol\xE9r\xE9", "Un d\xE9lit p\xE9nale lourd", "Sans risque", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit p\xE9nale." }
        ]
      },
      {
        _id: "lec-13-2",
        _type: "lecon",
        title: "Le\xE7on 13.2 \u2013 Le permis \xE0 points",
        ordre: 2,
        description: "Fonctionnement du capital de points, infractions et r\xE9cup\xE9ration.",
        videoUrl: "https://www.youtube.com/@prepacode",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Le capital initial d'un permis probatoire est de :", options: ["12 points", "6 points", "8 points", "4 points"], correctOptionIndex: 1, explanation: "6 points initiaux." },
          { questionText: "Un permis confirm\xE9 dispose de :", options: ["6 points", "12 points", "8 points", "20 points"], correctOptionIndex: 1, explanation: "12 points max." },
          { questionText: "En probatoire, le capital augmente chaque ann\xE9e sans infraction de :", options: ["2 points (ou 3 si AAC)", "Rien", "6 points", "Rien"], correctOptionIndex: 0, explanation: "+2 ou +3 points par an." },
          { questionText: "Un permis \xE0 0 point entra\xEEne :", options: ["Rien", "L'invalidation du permis de conduire", "Une m\xE9daille", "Rien"], correctOptionIndex: 1, explanation: "Invalidation." },
          { questionText: "On peut r\xE9cup\xE9rer jusqu'\xE0 4 points via :", options: ["Rien", "Un stage de sensibilisation \xE0 la s\xE9curit\xE9 routi\xE8re", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Stage de r\xE9cup\xE9ration." }
        ]
      },
      {
        _id: "lec-13-3",
        _type: "lecon",
        title: "Le\xE7on 13.3 \u2013 Infractions et sanctions",
        ordre: 3,
        description: "Classement des infractions, amendes, suspensions et annulations.",
        videoUrl: "https://www.youtube.com/@codesrousseau",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Un grand exc\xE8s de vitesse peut entra\xEEner :", options: ["Rien", "Amende, retrait de points et suspension imm\xE9diate", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Suspension du permis." },
          { questionText: "La conduite sans assurance est :", options: ["Contravention", "Un d\xE9lit sanctionn\xE9 lourdement", "Sans effet", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit p\xE9nale." },
          { questionText: "Une suspension du permis est :", options: ["D\xE9finitive", "Une interdiction temporaire de conduire", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Interdiction temporaire." },
          { questionText: "Une annulation judiciaire impose de :", options: ["Rien", "Repasser l'examen pour reconduire", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Repasser les \xE9preuves." },
          { questionText: "Le d\xE9lit de fuite est sanctionn\xE9 par :", options: ["Rien", "De lourdes peines de prison et amendes", "Rien", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit grave." }
        ]
      },
      {
        _id: "lec-13-4",
        _type: "lecon",
        title: "Le\xE7on 13.4 \u2013 Assurance automobile",
        ordre: 4,
        description: "Assurance au tiers vs tous risques, garanties et franchise.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "L'assurance au tiers minimale est :", options: ["Facultative", "Obligatoire pour tout v\xE9hicule en circulation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Assurance au tiers obligatoire." },
          { questionText: "L'assurance tous risques couvre :", options: ["Tiers uniquement", "Aussi les dommages caus\xE9s \xE0 son propre v\xE9hicule", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Couverture compl\xE8te." },
          { questionText: "La franchise correspond \xE0 :", options: ["Rien", "La somme restant \xE0 la charge de l'assur\xE9", "L'amende", "Rien"], correctOptionIndex: 1, explanation: "Franchise d'assurance." },
          { questionText: "Rouler sans assurance expose \xE0 :", options: ["Rien", "Rembourser personnellement les d\xE9g\xE2ts caus\xE9s toute sa vie", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Remboursement des d\xE9g\xE2ts." },
          { questionText: "D\xE9clarer un sinistre doit se faire dans un d\xE9lai de :", options: ["5 jours ouvr\xE9s en g\xE9n\xE9ral", "1 an", "Jamais", "Rien"], correctOptionIndex: 0, explanation: "5 jours ouvr\xE9s." }
        ]
      },
      {
        _id: "lec-13-5",
        _type: "lecon",
        title: "Le\xE7on 13.5 \u2013 Responsabilit\xE9 civile et p\xE9nale du conducteur",
        ordre: 5,
        description: "Notion de responsabilit\xE9 en cas d'accident et cons\xE9quences civiles/p\xE9nales.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "La responsabilit\xE9 civile concerne :", options: ["Rien", "L'indemnisation des dommages caus\xE9s \xE0 autrui", "Les amende", "Rien"], correctOptionIndex: 1, explanation: "Dommages caus\xE9s \xE0 autrui." },
          { questionText: "La responsabilit\xE9 p\xE9nale concerne :", options: ["Rien", "Les sanctions pr\xE9vues par la loi (amendes, prison)", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Sanctions p\xE9nales." },
          { questionText: "Un conducteur est responsable des passagers mineurs non attach\xE9s :", options: ["Vrai", "Faux", "Rien", "Rien"], correctOptionIndex: 0, explanation: "Responsable des mineurs." },
          { questionText: "En cas de sinistre caus\xE9 sous l'emprise de l'alcool, l'assureur peut :", options: ["Rien", "Refuser d'indemniser les d\xE9g\xE2ts du conducteur", "Payer un bonus", "Rien"], correctOptionIndex: 1, explanation: "Refus d'indemnisation." },
          { questionText: "Pr\xEAter son v\xE9hicule engage la responsabilit\xE9 de la carte grise en cas de radaris\xE9 :", options: ["Vrai", "Faux", "Rien", "Rien"], correctOptionIndex: 0, explanation: "Titulaire de la carte grise." }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // MODULE 14
  {
    _id: "mod-14",
    _type: "moduleFormation",
    code: "MOD-014",
    title: "Module 14 : \xC9coconduite et entretien du v\xE9hicule",
    summary: "Ce module aborde l'\xE9coconduite, l'entretien courant du v\xE9hicule et l'impact environnemental.",
    learningObjectives: [
      "R\xE9duire la consommation en adoptant une conduite souple",
      "V\xE9rifier r\xE9guli\xE8rement la pression des pneus et niveaux",
      "Comprendre le classement Crit'Air et les zones ZFE",
      "Utiliser le frein moteur pour pr\xE9server les freins"
    ],
    ordre: 14,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/@EnVoitureSimone",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-14-1",
        _type: "lecon",
        title: "Le\xE7on 14.1 \u2013 Principes de l'\xE9coconduite",
        ordre: 1,
        description: "Anticipation, r\xE9gime moteur optimal et r\xE9duction de la consommation.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "L'\xE9coconduite vise \xE0 :", options: ["Rouler plus vite", "R\xE9duire la consommation et les \xE9missions", "Rien", "Rien"], correctOptionIndex: 1, explanation: "\xC9conomie de carburant." },
          { questionText: "Anticiper les ralentissements permet de :", options: ["Rien", "R\xE9duire l'usage des freins et la consommation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Moins consommer." },
          { questionText: "Rouler en sur-r\xE9gime moteur :", options: ["\xC9conomise", "Augmente fortement la consommation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Surconsommation." },
          { questionText: "Une conduite souple est :", options: ["Plus \xE9conomique", "Plus co\xFBteuse", "Rien", "Rien"], correctOptionIndex: 0, explanation: "\xC9conome." },
          { questionText: "Couper le moteur \xE0 l'arr\xEAt prolong\xE9 permet de :", options: ["Rien", "\xC9conomiser du carburant", "Ab\xEEmer la batterie", "Rien"], correctOptionIndex: 1, explanation: "\xC9conomiser." }
        ]
      },
      {
        _id: "lec-14-2",
        _type: "lecon",
        title: "Le\xE7on 14.2 \u2013 Pression des pneus et entretien courant",
        ordre: 2,
        description: "Importance de la pression des pneus, niveaux et plaquettes de frein.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Un sous-gonflage des pneus augmente :", options: ["Rien", "La consommation et le risque d'\xE9clatement", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Risque et surconsommation." },
          { questionText: "La pression des pneus se v\xE9rifie environ :", options: ["Une fois par an", "Une fois par mois \xE0 froid", "Tous les 5 ans", "Rien"], correctOptionIndex: 1, explanation: "Mensuellement \xE0 froid." },
          { questionText: "Le niveau d'huile moteur doit se contr\xF4ler :", options: ["Rien", "R\xE9guli\xE8rement sur sol plat moteur froid", "En roulant", "Rien"], correctOptionIndex: 1, explanation: "Moteur froid sur sol plat." },
          { questionText: "Des plaquettes de frein us\xE9es provoquent :", options: ["Rien", "Un allongement des distances d'arr\xEAt", "Une meilleure vue", "Rien"], correctOptionIndex: 1, explanation: "Freinage rallong\xE9." },
          { questionText: "Le liquide de refroidissement \xE9vite :", options: ["Rien", "La surchauffe moteur", "Le froid", "Rien"], correctOptionIndex: 1, explanation: "Anti-surchauffe." }
        ]
      },
      {
        _id: "lec-14-3",
        _type: "lecon",
        title: "Le\xE7on 14.3 \u2013 Impact environnemental de l'automobile",
        ordre: 3,
        description: "\xC9missions, vignettes Crit'Air et zones \xE0 faibles \xE9missions (ZFE).",
        videoUrl: "https://www.youtube.com/@prepacode",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "La vignette Crit'Air classe les v\xE9hicules selon :", options: ["La couleur", "Leur niveau d'\xE9mission polluante", "Le prix", "Rien"], correctOptionIndex: 1, explanation: "Niveau polluant." },
          { questionText: "Les ZFE visent \xE0 :", options: ["Rien", "Limiter la pollution en r\xE9servant l'acc\xE8s aux v\xE9hicules moins polluants", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Qualit\xE9 de l'air." },
          { questionText: "Un v\xE9hicule trop polluant dans une ZFE peut \xEAtre :", options: ["Rien", "Interdit de circulation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Acc\xE8s interdit." },
          { questionText: "Adopter l'\xE9coconduite r\xE9duit les \xE9missions de CO2 de :", options: ["0%", "10% \xE0 20%", "100%", "Rien"], correctOptionIndex: 1, explanation: "10 \xE0 20% de baisse CO2." },
          { questionText: "La vignette Crit'Air se colle sur :", options: ["Le coffre", "Le pare-brise en bas \xE0 droite", "Le volant", "Rien"], correctOptionIndex: 1, explanation: "Bas du pare-brise." }
        ]
      },
      {
        _id: "lec-14-4",
        _type: "lecon",
        title: "Le\xE7on 14.4 \u2013 V\xE9rifications avant un long trajet",
        ordre: 4,
        description: "Contr\xF4les pr\xE9alables (pneus, niveaux, \xE9clairage) avant trajet long.",
        videoUrl: "https://www.youtube.com/@codesrousseau",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Avant un grand trajet, on v\xE9rifie :", options: ["Rien", "Pneus, liquides, feux et essuie-glaces", "Radio", "Rien"], correctOptionIndex: 1, explanation: "V\xE9rification compl\xE8te." },
          { questionText: "Charger excessivement le toit d'une voiture :", options: ["\xC9conomise", "Augmente fortement la prise au vent et la consommation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Prise au vent." },
          { questionText: "Faire des pauses toutes les 2h permet de :", options: ["Rien", "Maintenir la vigilance et la s\xE9curit\xE9", "Perdre du temps", "Rien"], correctOptionIndex: 1, explanation: "Pauses r\xE9guli\xE8res." },
          { questionText: "La pression des pneus pour autoroute ou voiture charg\xE9e doit \xEAtre :", options: ["Diminu\xE9e", "L\xE9g\xE8rement augment\xE9e selon pr\xE9conisations", "Nulle", "Rien"], correctOptionIndex: 1, explanation: "Augment\xE9e \xE0 la charge." },
          { questionText: "V\xE9rifier l'\xE9clairage permet :", options: ["Rien", "De voir et d'\xEAtre vu en toute circonstance", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Voir et \xEAtre vu." }
        ]
      },
      {
        _id: "lec-14-5",
        _type: "lecon",
        title: "Le\xE7on 14.5 \u2013 Conduite \xE9conomique et anticipation",
        ordre: 5,
        description: "Utilisation du frein moteur et planification d'itin\xE9raire.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 480,
        tempsMinimumVisionnageSeconds: 384,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Utiliser le frein moteur permet de :", options: ["\xC9conomiser", "\xC9conomiser le carburant et m\xE9nager les freins", "Ab\xEEmer la bo\xEEte", "Rien"], correctOptionIndex: 1, explanation: "Frein moteur." },
          { questionText: "Retirer les barres de toit inutilis\xE9es permet de :", options: ["Rien", "\xC9conomiser du carburant", "Rouler plus vite", "Rien"], correctOptionIndex: 1, explanation: "\xC9conomie carburant." },
          { questionText: "Planifier son itin\xE9raire \xE9vite :", options: ["Rien", "Les embouteillages et les kilom\xE8tres inutiles", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Itin\xE9raire optimis\xE9." },
          { questionText: "La climatisation \xE0 fond augmente la consommation de :", options: ["0%", "Environ 10% \xE0 15%", "100%", "Rien"], correctOptionIndex: 1, explanation: "Surconsommation clim." },
          { questionText: "Anticiper les feux tricolores \xE0 distance permet de :", options: ["Rien", "Conserver l'\xE9lan et \xE9viter l'arr\xEAt complet", "Acc\xE9l\xE9rer", "Rien"], correctOptionIndex: 1, explanation: "Conserver l'\xE9lan." }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  // MODULE 15
  {
    _id: "mod-15",
    _type: "moduleFormation",
    code: "MOD-015",
    title: "Module 15 : R\xE9visions g\xE9n\xE9rales et examens blancs type ETG",
    summary: "Synth\xE8se et r\xE9visions transversales sur l'ensemble du programme et tests blancs dans les conditions de l'ETG.",
    learningObjectives: [
      "R\xE9viser l'int\xE9gralit\xE9 des 14 modules th\xE9oriques du Permis B",
      "Comprendre le d\xE9roulement officiel de l'\xE9preuve th\xE9orique ETG",
      "G\xE9rer le temps imparti de 20 secondes par question",
      "Valider l'examen blanc avec un score minimum de 35/40 (80%)"
    ],
    ordre: 15,
    typePermis: "B",
    programmePermis: { _type: "reference", _ref: "prog-permis-b" },
    videoUrl: "https://www.youtube.com/@codesrousseau",
    durationSeconds: 540,
    tempsMinimumVisionnage: 432,
    scoreMinimumQuiz: 80,
    isActive: true,
    lecons: [
      {
        _id: "lec-15-1",
        _type: "lecon",
        title: "Le\xE7on 15.1 \u2013 R\xE9vision : v\xE9hicule, circulation et signalisation",
        ordre: 1,
        description: "Synth\xE8se des modules 1 \xE0 3 sous forme de r\xE9vision active.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Fonction principale des voyants du tableau de bord ?", options: ["D\xE9coration", "Informer/alerter le conducteur", "Rien", "Rien"], correctOptionIndex: 1, explanation: "T\xE9moins de s\xE9curit\xE9." },
          { questionText: "Une ligne continue signifie :", options: ["Franchissement autoris\xE9", "Franchissement interdit", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Interdiction absolue." },
          { questionText: "Un panneau triangulaire annonce :", options: ["Obligation", "Danger", "Interdiction", "Indication"], correctOptionIndex: 1, explanation: "Danger." },
          { questionText: "La ceinture de s\xE9curit\xE9 doit \xEAtre port\xE9e :", options: ["Parfois", "En permanence", "Jamais", "Rien"], correctOptionIndex: 1, explanation: "En permanence." },
          { questionText: "Un panneau rond \xE0 fond bleu indique :", options: ["Interdiction", "Obligation", "Danger", "Rien"], correctOptionIndex: 1, explanation: "Obligation." }
        ]
      },
      {
        _id: "lec-15-2",
        _type: "lecon",
        title: "Le\xE7on 15.2 \u2013 R\xE9vision : priorit\xE9s, vitesse et d\xE9passement",
        ordre: 2,
        description: "Synth\xE8se des modules 4 \xE0 7.",
        videoUrl: "https://www.youtube.com/@EnVoitureSimone",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "En l'absence de signalisation, qui est prioritaire ?", options: ["Gauche", "Droite", "Aucun", "Rien"], correctOptionIndex: 1, explanation: "Priorit\xE9 \xE0 droite." },
          { questionText: "Vitesse maximale en agglom\xE9ration ?", options: ["30", "50", "70", "90"], correctOptionIndex: 1, explanation: "50 km/h." },
          { questionText: "La distance d'arr\xEAt inclut :", options: ["Freinage seul", "R\xE9action + freinage", "R\xE9action seule", "Rien"], correctOptionIndex: 1, explanation: "R\xE9action + freinage." },
          { questionText: "Le d\xE9passement est interdit sur :", options: ["Ligne discontinue", "Ligne continue", "Autoroute", "Rien"], correctOptionIndex: 1, explanation: "Ligne continue." },
          { questionText: "Sur autoroute, la voie de gauche sert \xE0 :", options: ["Circulation normale", "D\xE9passement", "Stationnement", "Rien"], correctOptionIndex: 1, explanation: "D\xE9passement." }
        ]
      },
      {
        _id: "lec-15-3",
        _type: "lecon",
        title: "Le\xE7on 15.3 \u2013 R\xE9vision : conditions difficiles et capacit\xE9s du conducteur",
        ordre: 3,
        description: "Synth\xE8se des modules 8 \xE0 10.",
        videoUrl: "https://www.youtube.com/@prepacode",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "En cas de panne sur autoroute, se garer sur :", options: ["Voie de gauche", "Bande d'arr\xEAt d'urgence", "Voie centrale", "Rien"], correctOptionIndex: 1, explanation: "Bande d'arr\xEAt d'urgence." },
          { questionText: "Vitesse maximale sur autoroute sous la pluie ?", options: ["130", "110", "90", "150"], correctOptionIndex: 1, explanation: "110 km/h." },
          { questionText: "Taux d'alcool\xE9mie maximal pour conducteur confirm\xE9 ?", options: ["0,2", "0,5", "0,8", "1"], correctOptionIndex: 1, explanation: "0,5 g/L." },
          { questionText: "Que faire en cas de somnolence au volant ?", options: ["Continuer", "S'arr\xEAter et faire une pause", "Acc\xE9l\xE9rer", "Rien"], correctOptionIndex: 1, explanation: "Pause obligatoire." },
          { questionText: "Tenir son t\xE9l\xE9phone en main au volant est :", options: ["Autoris\xE9", "Interdit", "Tol\xE9r\xE9", "Rien"], correctOptionIndex: 1, explanation: "Interdit." }
        ]
      },
      {
        _id: "lec-15-4",
        _type: "lecon",
        title: "Le\xE7on 15.4 \u2013 R\xE9vision : usagers vuln\xE9rables, secours et responsabilit\xE9s",
        ordre: 4,
        description: "Synth\xE8se des modules 11 \xE0 14.",
        videoUrl: "https://www.youtube.com/@codesrousseau",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "Ordre de la proc\xE9dure en cas d'accident ?", options: ["Alerter, Secourir, Prot\xE9ger", "Prot\xE9ger, Alerter, Secourir", "Secourir, Alerter, Prot\xE9ger", "Rien"], correctOptionIndex: 1, explanation: "Prot\xE9ger -> Alerter -> Secourir." },
          { questionText: "Num\xE9ro d'urgence europ\xE9en unique ?", options: ["15", "112", "17", "18"], correctOptionIndex: 1, explanation: "112." },
          { questionText: "Points d'un permis probatoire au d\xE9part ?", options: ["12", "6", "8", "4"], correctOptionIndex: 1, explanation: "6 points." },
          { questionText: "Que classe la vignette Crit'Air ?", options: ["Prix", "Niveau de pollution", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Pollution." },
          { questionText: "Distance lat\xE9rale minimale pour d\xE9passer un v\xE9lo en agglom\xE9ration ?", options: ["0,5 m", "1 m", "3 m", "5 m"], correctOptionIndex: 1, explanation: "1 m\xE8tre." }
        ]
      },
      {
        _id: "lec-15-5",
        _type: "lecon",
        title: "Le\xE7on 15.5 \u2013 M\xE9thodologie de l'examen th\xE9orique (ETG)",
        ordre: 5,
        description: "D\xE9roulement de l'examen officiel (40 questions, seuil de r\xE9ussite 35/40), gestion du stress.",
        videoUrl: "https://www.youtube.com/@ornikar",
        durationSeconds: 600,
        tempsMinimumVisionnageSeconds: 480,
        hasInlineQuiz: true,
        inlineQuiz: [
          { questionText: "L'examen th\xE9orique g\xE9n\xE9ral (ETG) comporte :", options: ["20 questions", "40 questions", "60 questions", "10 questions"], correctOptionIndex: 1, explanation: "40 questions." },
          { questionText: "Le seuil de r\xE9ussite \xE0 l'examen est de :", options: ["30/40", "35/40", "40/40", "20/40"], correctOptionIndex: 1, explanation: "35 bonnes r\xE9ponses (5 fautes max)." },
          { questionText: "Chaque question \xE0 l'examen doit \xEAtre trait\xE9e en environ :", options: ["20 secondes", "5 minutes", "1 minute", "Rien"], correctOptionIndex: 0, explanation: "20 secondes par question." },
          { questionText: "En cas de doute sur une question, il vaut mieux :", options: ["R\xE9pondre au hasard", "Analyser calmement les indices visuels et le contexte", "Passer", "Rien"], correctOptionIndex: 1, explanation: "Analyse calme." },
          { questionText: "Un pi\xE8ge fr\xE9quent \xE0 l'examen est :", options: ["Les questions \xE0 r\xE9ponses multiples n\xE9cessitant une lecture attentive", "Rien", "Absence", "Rien"], correctOptionIndex: 0, explanation: "R\xE9ponses multiples." }
        ]
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  }
];
var PERMIS_B_QUIZZES = [
  {
    _id: "quiz-mod-1",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-1" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Dans quel compartiment du v\xE9hicule se trouve g\xE9n\xE9ralement le moteur d'une voiture de tourisme ?",
        options: ["Dans le coffre arri\xE8re", "Sous le capot avant", "Sous le si\xE8ge du conducteur", "Dans le r\xE9servoir"],
        correctOptionIndex: 1,
        explanation: "Le moteur est habituellement situ\xE9 \xE0 l'avant sous le capot."
      },
      {
        questionText: "2. Quelle commande \xE0 pied est sp\xE9cifiquement pr\xE9sente sur une voiture \xE0 bo\xEEte de vitesses manuelle ?",
        options: ["La p\xE9dale d'acc\xE9l\xE9rateur", "La p\xE9dale de frein", "La p\xE9dale d'embrayage", "Le commodo de clignotant"],
        correctOptionIndex: 2,
        explanation: "L'embrayage est sp\xE9cifique aux v\xE9hicules \xE0 bo\xEEte manuelle."
      },
      {
        questionText: "3. Si le voyant d'alerte ROUGE de temp\xE9rature de liquide de refroidissement s'allume en roulant, vous devez :",
        options: ["Continuer jusqu'au garage le plus proche", "Allumer les feux de brouillard", "Vous s'arr\xEAter imm\xE9diatement en s\xE9curit\xE9 et couper le moteur", "Mettre du lave-glace"],
        correctOptionIndex: 2,
        explanation: "Un voyant rouge impose l'arr\xEAt imm\xE9diat pour \xE9viter des d\xE9g\xE2ts irr\xE9versibles sur le moteur."
      },
      {
        questionText: "4. Quelle est la profondeur minimale l\xE9gale des rainures d'un pneu automobile ?",
        options: ["0,8 mm", "1,6 mm", "2,5 mm", "4,0 mm"],
        correctOptionIndex: 1,
        explanation: "La limite l\xE9gale d'usure est fix\xE9e \xE0 1,6 mm."
      },
      {
        questionText: "5. \xC0 quoi sert le syst\xE8me ABS lors d'un freinage violent ?",
        options: ["Il permet de stopper la voiture sur 2 m\xE8tres", "Il \xE9vite le blocage des roues et pr\xE9serve le pouvoir directionnel", "Il remplace la ceinture de s\xE9curit\xE9", "Il \xE9teint les phares"],
        correctOptionIndex: 1,
        explanation: "L'ABS emp\xEAche le blocage des roues pour garder le contr\xF4le du volant."
      },
      {
        questionText: "6. Quelle est la premi\xE8re chose \xE0 r\xE9gler en prenant place au poste de conduite ?",
        options: ["La ceinture de s\xE9curit\xE9", "Les r\xE9troviseurs", "L'assise et la hauteur du si\xE8ge de conduite", "La radio"],
        correctOptionIndex: 2,
        explanation: "On r\xE8gle d'abord sa position de si\xE8ge avant d'ajuster les r\xE9troviseurs et d'attacher sa ceinture."
      },
      {
        questionText: "7. De quelle couleur est le voyant indiquant l'allumage des feux de route (pleins phares) ?",
        options: ["Vert", "Jaune / Orange", "Bleu", "Rouge"],
        correctOptionIndex: 2,
        explanation: "Le t\xE9moin des feux de route est d'un bleu vif caract\xE9ristique."
      },
      {
        questionText: "8. En cas de choc frontal, le r\xF4le de la ceinture de s\xE9curit\xE9 est de :",
        options: ["Maintenir le corps solidaire de l'habitacle et \xE9viter l'\xE9jection", "D\xE9clencher l'alarme", "Bloquer le moteur", "Ouvrir les portes"],
        correctOptionIndex: 0,
        explanation: "La ceinture retient l'occupant sur son si\xE8ge et r\xE9duit consid\xE9rablement le risque de traumatisme grave."
      },
      {
        questionText: "9. Quel est l'intervalle l\xE9gal de passage au contr\xF4le technique p\xE9riodique pour un v\xE9hicule de plus de 4 ans ?",
        options: ["Chaque ann\xE9e", "Tous les 2 ans", "Tous les 3 ans", "Tous les 5 ans"],
        correctOptionIndex: 1,
        explanation: "Apr\xE8s les 4 ans du v\xE9hicule, le contr\xF4le technique doit \xEAtre renouvel\xE9 tous les 2 ans."
      },
      {
        questionText: "10. Si un voyant ORANGE d'usure des plaquettes de frein s'allume, vous devez :",
        options: ["Vous s'arr\xEAter au milieu de la route", "Pr\xE9voir le remplacement des plaquettes \xE0 bref d\xE9lai", "Ignorer l'avertissement", "Vider le coffre"],
        correctOptionIndex: 1,
        explanation: "L'orange pr\xE9vient d'un entretien \xE0 effectuer prochainement en atelier sans n\xE9cessiter d'arr\xEAt d'urgence."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-2",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-2" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. En l'absence de toute signalisation \xE0 une intersection, quelle r\xE8gle de priorit\xE9 s'applique ?",
        options: ["Priorit\xE9 \xE0 la voie la plus large", "Priorit\xE9 au v\xE9hicule venant de gauche", "Priorit\xE9 \xE0 droite", "Priorit\xE9 au plus rapide"],
        correctOptionIndex: 2,
        explanation: "La priorit\xE9 \xE0 droite s'applique par d\xE9faut en l'absence de panneaux."
      },
      {
        questionText: "2. Quelle est la distance lat\xE9rale minimale de s\xE9curit\xE9 pour d\xE9passer un cycliste HORS agglom\xE9ration ?",
        options: ["0,5 m\xE8tre", "1,0 m\xE8tre", "1,5 m\xE8tre", "2,5 m\xE8tres"],
        correctOptionIndex: 2,
        explanation: "1,5 m\xE8tre est obligatoire hors agglom\xE9ration (1,0 m en agglom\xE9ration)."
      },
      {
        questionText: "3. Sur autoroute, la bande d'arr\xEAt d'urgence peut \xEAtre utilis\xE9e pour :",
        options: ["Consulter son t\xE9l\xE9phone portable", "Attendre un ami", "S'immobiliser exclusivement en cas de panne grave ou urgence absolue", "Faire une sieste"],
        correctOptionIndex: 2,
        explanation: "La BAU est strictement r\xE9serv\xE9e aux d\xE9faillances graves et secours."
      },
      {
        questionText: "4. Lors d'un changement de voie, l'observation de l'angle mort se fait par :",
        options: ["Le r\xE9troviseur central uniquement", "Un coup d'\u0153il direct en tournant la t\xEAte par-dessus l'\xE9paule", "Le GPS", "Les feux de d\xE9tresse"],
        correctOptionIndex: 1,
        explanation: "La v\xE9rification directe de l'angle mort exige une rotation de la t\xEAte."
      },
      {
        questionText: "5. Face \xE0 un pi\xE9ton engag\xE9 sur un passage pour pi\xE9tons, le conducteur doit :",
        options: ["Acc\xE9l\xE9rer pour passer vite", "Klaxonner pour l'avertir de s'arr\xEAter", "S'arr\xEAter pour lui c\xE9der la priorit\xE9", "Le d\xE9passer par la gauche"],
        correctOptionIndex: 2,
        explanation: "Le pi\xE9ton engag\xE9 b\xE9n\xE9ficie de la priorit\xE9 absolue."
      },
      {
        questionText: "6. Un stationnement sur un passage pi\xE9ton est consid\xE9r\xE9 comme :",
        options: ["Un stationnement autoris\xE9 si c'est court", "Un stationnement tr\xE8s g\xEAnant passible d'une amende et fourri\xE8re", "Une simple tol\xE9rance", "Un arr\xEAt de courtoisie"],
        correctOptionIndex: 1,
        explanation: "Stationner sur un passage pi\xE9ton nuit gravement \xE0 la s\xE9curit\xE9 et constitue une infraction s\xE9v\xE8re."
      },
      {
        questionText: "7. Qui poss\xE8de la priorit\xE9 lors de l'insertion sur une autoroute via la voie d'acc\xE9l\xE9ration ?",
        options: ["Le v\xE9hicule entrant", "Les usagers circulant d\xE9j\xE0 sur la voie d'autoroute", "Le v\xE9hicule le plus lourd", "Premier arriv\xE9"],
        correctOptionIndex: 1,
        explanation: "Les usagers engag\xE9s sur l'autoroute ont la priorit\xE9."
      },
      {
        questionText: "8. Avant de tourner \xE0 gauche dans une rue \xE0 double sens, vous devez vous placer :",
        options: ["Sur le trottoir", "Le long de l'axe central s\xE9parant les sens de circulation", "Tout \xE0 fait \xE0 droite", "Au milieu de la voie de gauche inverse"],
        correctOptionIndex: 1,
        explanation: "On serre l'axe m\xE9dian de la chauss\xE9e sans mordre sur le sens oppos\xE9."
      },
      {
        questionText: "9. En cas de d\xE9passement d'un camion lourd \xE0 l'arr\xEAt, \xE0 quoi devez-vous \xEAtre particuli\xE8rement attentif ?",
        options: ["Au bruit du moteur", "\xC0 un pi\xE9ton masqu\xE9 surgissant devant le bus/camion", "\xC0 la peinture de la carrosserie", "Aux essuie-glaces"],
        correctOptionIndex: 1,
        explanation: "Le gabarit du poids lourd masque les pi\xE9tons traversant la chauss\xE9e."
      },
      {
        questionText: "10. Que devez-vous faire avant d'entamer toute man\u0153uvre de d\xE9port ou changement de direction ?",
        options: ["Mettre son clignotant au dernier moment", "Contr\xF4ler r\xE9troviseurs et angles morts, puis signaler l'intention au clignotant", "Freiner brutalement", "Allumer les feux de route"],
        correctOptionIndex: 1,
        explanation: "La s\xE9quence observation puis signalisation est la r\xE8gle de s\xE9curit\xE9 incontournable."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-3",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-3" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Un panneau de forme triangulaire bord\xE9 de rouge annonce :",
        options: ["Une interdiction stricte", "Un danger potentiel", "Une obligation", "Une direction touristique"],
        correctOptionIndex: 1,
        explanation: "Les panneaux triangulaires annoncent toujours un danger."
      },
      {
        questionText: "2. \xC0 quelle distance du danger un panneau triangulaire est-il implant\xE9 en agglom\xE9ration ?",
        options: ["50 m\xE8tres", "150 m\xE8tres", "300 m\xE8tres", "10 m\xE8tres"],
        correctOptionIndex: 0,
        explanation: "En agglom\xE9ration, le pr\xE9avis est de 50 m\xE8tres."
      },
      {
        questionText: `3. Que signifie un panneau rond bleu avec l'inscription "30" ?`,
        options: ["Vitesse maximale 30 km/h", "Vitesse minimale obligatoire de 30 km/h", "Fin de zone 30", "Stationnement durant 30 min"],
        correctOptionIndex: 1,
        explanation: "Un panneau rond bleu impose une obligation, ici la vitesse minimale."
      },
      {
        questionText: "4. En pr\xE9sence d'un feu tricolore ORANGE FIXE, vous devez :",
        options: ["Acc\xE9l\xE9rer pour passer rapidement", "Vous s'arr\xEAter, sauf si cet arr\xEAt repr\xE9sente un danger pour les usagers arri\xE8res", "Klaxonner", "Faire un appel de phares"],
        correctOptionIndex: 1,
        explanation: "L'arr\xEAt au feu orange est obligatoire sauf danger av\xE9r\xE9 pour les v\xE9hicules suiveurs."
      },
      {
        questionText: "5. En cas de contradiction entre les ordres d'un agent de police et des feux tricolores :",
        options: ["Le feu tricolore l'emporte", "Les injonctions de l'agent de police pr\xE9valent sur toute autre signalisation", "Le panneau l'emporte", "La priorit\xE9 \xE0 droite s'applique"],
        correctOptionIndex: 1,
        explanation: "L'agent de circulation s'impose sur tous les panneaux, feux et r\xE8gles."
      },
      {
        questionText: "6. Quelle est la couleur des panneaux de signalisation temporaire de chantier ?",
        options: ["Blanche", "Bleue", "Jaune", "Verte"],
        correctOptionIndex: 2,
        explanation: "Le jaune est la couleur r\xE9serv\xE9e aux \xE9v\xE9nements et chantiers temporaires."
      },
      {
        questionText: "7. Un panneau de direction vert indique un itin\xE9raire reliant :",
        options: ["Des petites routes de village", "Des autoroutes payantes", "Des agglom\xE9rations importantes sur le r\xE9seau principal", "Des zones agricoles"],
        correctOptionIndex: 2,
        explanation: "Le vert est utilis\xE9 pour le r\xE9seau des grandes liaisons nationales."
      },
      {
        questionText: "8. Est-il autoris\xE9 de franchir une ligne continue blanche au sol ?",
        options: ["Oui, si la voie d'en face est vide", "Non, c'est strictement interdit", "Oui, pour d\xE9passer les v\xE9los le dimanche", "Oui, la nuit"],
        correctOptionIndex: 1,
        explanation: "Le franchissement d'une ligne continue est une infraction s\xE9v\xE8re au code de la route."
      },
      {
        questionText: "9. Que signale un feu jaune clignotant situ\xE9 au bas d'un ensemble tricolore ?",
        options: ["Passez \xE0 100 km/h", "Le feu est inactif : traversez avec prudence selon la signalisation ou la priorit\xE9 \xE0 droite", "Arr\xEAt absolu", "Sens interdit"],
        correctOptionIndex: 1,
        explanation: "Le feu jaune clignotant invite \xE0 la prudence et r\xE9tablit les r\xE8gles de priorit\xE9 ordinaires."
      },
      {
        questionText: `10. Que signifie le panneau octogonal ROUGE portant l'inscription "STOP" ?`,
        options: ["C\xE9der le passage sans s'arr\xEAter si c'est libre", "Marquer obligatoirement l'arr\xEAt complet des roues et c\xE9der le passage", "Priorit\xE9 absolue", "Virage dangereux"],
        correctOptionIndex: 1,
        explanation: "Le STOP impose l'arr\xEAt complet des roues \xE0 la ligne de marquage avant de s'engager."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-4",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-4" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. \xC0 un croisement sans panneau ni marquage, quelle est la r\xE8gle par d\xE9faut ?",
        options: ["Priorit\xE9 \xE0 gauche", "Priorit\xE9 \xE0 droite", "Priorit\xE9 au v\xE9hicule le plus rapide", "Priorit\xE9 \xE0 la voie la plus large"],
        correctOptionIndex: 1,
        explanation: "La priorit\xE9 \xE0 droite est la r\xE8gle par d\xE9faut \xE0 toute intersection sans signalisation."
      },
      {
        questionText: "2. Devez-vous vous s'arr\xEAter au C\xE9der le passage si la voie transversale est compl\xE8tement d\xE9gag\xE9e ?",
        options: ["Oui toujours 3 secondes", "Non, si la visibilit\xE9 est bonne et qu'aucun v\xE9hicule n'approche", "Oui la nuit", "Oui avec le warning"],
        correctOptionIndex: 1,
        explanation: "Le C\xE9der le passage n'oblige pas \xE0 l'arr\xEAt complet si aucune voiture n'approche."
      },
      {
        questionText: "3. Dans un carrefour giratoire avec panneaux C\xE9der le passage \xE0 l'entr\xE9e, qui a la priorit\xE9 ?",
        options: ["Les usagers entrant", "Les usagers d\xE9j\xE0 engag\xE9s sur l'anneau", "Les bus uniquement", "Le plus rapide"],
        correctOptionIndex: 1,
        explanation: "Les usagers engag\xE9s sur l'anneau ont la priorit\xE9."
      },
      {
        questionText: "4. Face \xE0 un v\xE9hicule d'urgence (pompiers, SAMU) feux bleus et sir\xE8ne activ\xE9s :",
        options: ["Conserver la m\xEAme vitesse", "C\xE9der le passage imm\xE9diatement en vous serrant \xE0 droite ou en vous arr\xEAtant", "Acc\xE9l\xE9rer", "Klaxonner"],
        correctOptionIndex: 1,
        explanation: "Faciliter le passage d'un v\xE9hicule d'urgence prioritaire est une obligation l\xE9gale."
      },
      {
        questionText: "5. Au Stop, l'arr\xEAt complet des roues doit \xEAtre effectu\xE9 :",
        options: ["Au niveau du panneau", "\xC0 la ligne blanche d'arr\xEAt peinte au sol", "Au milieu du carrefour", "10 m\xE8tres avant"],
        correctOptionIndex: 1,
        explanation: "L'arr\xEAt des roues se fait \xE0 la ligne de marquage au sol."
      },
      {
        questionText: "6. Si un v\xE9hicule sort d'un chemin priv\xE9 ou d'un garage :",
        options: ["Il a la priorit\xE9 \xE0 droite", "Il doit c\xE9der le passage \xE0 tous les usagers de la voie publique", "Il passe en premier la nuit", "Il klaxonne et passe"],
        correctOptionIndex: 1,
        explanation: "Sortir d'un chemin priv\xE9 impose de c\xE9der la priorit\xE9 \xE0 tous."
      },
      {
        questionText: "7. Pour tourner \xE0 gauche dans un giratoire \xE0 2 voies, il est conseill\xE9 de se placer :",
        options: ["Sur la voie de droite uniquement", "Sur la voie de gauche de l'anneau", "Sur le trottoir", "Au milieu"],
        correctOptionIndex: 1,
        explanation: "On peut serrer l'anneau par la gauche pour contourner le giratoire."
      },
      {
        questionText: "8. Quand allumer le clignotant droit pour sortir d'un giratoire ?",
        options: ["\xC0 l'entr\xE9e", "Juste apr\xE8s avoir franchi la sortie pr\xE9c\xE9dant la sien", "Dans la rue de sortie", "Jamais"],
        correctOptionIndex: 1,
        explanation: "On indique sa sortie en allumant le clignotant droit au niveau de la sortie pr\xE9c\xE9dente."
      },
      {
        questionText: "9. Un agent de la circulation qui vous pr\xE9sente sa poitrine ou son dos signifie :",
        options: ["Passage autoris\xE9", "Arr\xEAt obligatoire (\xE9quivalent feu rouge)", "Ralentir", "Priorit\xE9 \xE0 droite"],
        correctOptionIndex: 1,
        explanation: "Poitrine ou dos face au conducteur = interdiction de passer."
      },
      {
        questionText: "10. En agglom\xE9ration, devez-vous faciliter la r\xE9insertion d'un autobus quittant son arr\xEAt ?",
        options: ["Oui, en ralentissant ou en s'arr\xEAtant si n\xE9cessaire", "Non, le bus doit attendre", "Uniquement s'il roule \xE0 80 km/h", "Jamais"],
        correctOptionIndex: 0,
        explanation: "En agglom\xE9ration, la priorit\xE9 de d\xE9part est accord\xE9e aux bus indiquant leur sortie d'arr\xEAt."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-5",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-5" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Quelle est la vitesse maximale autoris\xE9e sur autoroute par temps sec pour un conducteur confirm\xE9 ?",
        options: ["110 km/h", "120 km/h", "130 km/h", "140 km/h"],
        correctOptionIndex: 2,
        explanation: "La vitesse maximale est de 130 km/h sur autoroute par temps sec."
      },
      {
        questionText: "2. En cas de pluie, la vitesse maximale sur autoroute est de :",
        options: ["130 km/h", "110 km/h", "100 km/h", "90 km/h"],
        correctOptionIndex: 1,
        explanation: "La pluie abaisse la vitesse sur autoroute \xE0 110 km/h."
      },
      {
        questionText: "3. Pendant le temps de r\xE9action (moyen 1 seconde), \xE0 90 km/h vous parcourez :",
        options: ["9 m\xE8tres", "18 m\xE8tres", "27 m\xE8tres (9 x 3)", "50 m\xE8tres"],
        correctOptionIndex: 2,
        explanation: "Distance en 1 sec \u2248 dizaine x 3 -> 9 x 3 = 27 m\xE8tres."
      },
      {
        questionText: "4. Sur chauss\xE9e mouill\xE9e, la distance de freinage est :",
        options: ["Identique", "Doubl\xE9e (multipli\xE9e par 2)", "Tripl\xE9e", "Divis\xE9e par 2"],
        correctOptionIndex: 1,
        explanation: "La pluie r\xE9duit l'adh\xE9rence et double la distance de freinage."
      },
      {
        questionText: "5. Quel intervalle de temps minimal de s\xE9curit\xE9 devez-vous maintenir avec la voiture devant vous ?",
        options: ["0,5 seconde", "1 seconde", "Au moins 2 secondes", "5 secondes"],
        correctOptionIndex: 2,
        explanation: "La loi impose au moins 2 secondes d'intervalle de s\xE9curit\xE9."
      },
      {
        questionText: "6. Si vous doublez votre vitesse (de 50 km/h \xE0 100 km/h), votre distance de freinage est :",
        options: ["Doubl\xE9e", "Tripl\xE9e", "Quadrupl\xE9e (x 4)", "Identique"],
        correctOptionIndex: 2,
        explanation: "Le freinage varie avec le carr\xE9 de la vitesse : v x 2 = freinage x 4."
      },
      {
        questionText: "7. En pr\xE9sence d'un brouillard \xE9pais r\xE9duisant la visibilit\xE9 \xE0 moins de 50m, la vitesse est limit\xE9e \xE0 :",
        options: ["80 km/h", "50 km/h sur tout le r\xE9seau", "30 km/h", "70 km/h"],
        correctOptionIndex: 1,
        explanation: "Visibilit\xE9 < 50m = 50 km/h maximum sur toutes les routes."
      },
      {
        questionText: "8. L'\xE9co-conduite permet de r\xE9duire la consommation de carburant de :",
        options: ["1 \xE0 2 %", "15 \xE0 20 %", "50 %", "0 %"],
        correctOptionIndex: 1,
        explanation: "Une conduite anticipative permet 15 \xE0 20% d'\xE9conomie de carburant."
      },
      {
        questionText: "9. \xC0 50 km/h sur sol sec, quelle est la distance d'arr\xEAt totale approximative ?",
        options: ["15 m\xE8tres", "25 m\xE8tres (5 x 5)", "50 m\xE8tres", "5 m\xE8tres"],
        correctOptionIndex: 1,
        explanation: "Calcul d'arr\xEAt total sec : (dizaine)\xB2 = 5 x 5 = 25m."
      },
      {
        questionText: "10. Un choc frontal sans ceinture \xE0 50 km/h \xE9quivaut \xE0 une chute de quel \xE9tage d'un immeuble ?",
        options: ["1er \xE9tage", "3\xE8me \xE9tage", "10\xE8me \xE9tage", "20\xE8me \xE9tage"],
        correctOptionIndex: 1,
        explanation: "Un choc \xE0 50 km/h \xE9quivaut \xE0 une chute du 3\xE8me \xE9tage."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-6",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-6" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Lorsque vous croisez un v\xE9hicule la nuit sur route non \xE9clair\xE9e, vous devez :",
        options: ["Rester en pleins phares", "Passer imm\xE9diatement en feux de croisement", "\xC9teindre les feux", "Mettre le clignotant"],
        correctOptionIndex: 1,
        explanation: "Les feux de croisement \xE9vitent d'\xE9blouir les usagers crois\xE9s."
      },
      {
        questionText: "2. Les feux de brouillard ARRI\xC8RE peuvent \xEAtre utilis\xE9s sous :",
        options: ["La pluie forte", "Le brouillard et la chute de neige uniquement", "Le beau temps la nuit", "Toutes les intemp\xE9ries"],
        correctOptionIndex: 1,
        explanation: "Le brouillard arri\xE8re est strictement interdit sous la pluie car trop \xE9blouissant."
      },
      {
        questionText: "3. En cas d'aquaplaning sur autoroute, vous devez :",
        options: ["Piler sur le frein", "Maintenir le volant droit et rel\xE2cher doucement l'acc\xE9l\xE9rateur", "Tirer le frein \xE0 main", "Braquer \xE0 fond"],
        correctOptionIndex: 1,
        explanation: "Garder les roues droites et d\xE9c\xE9l\xE9rer permet de retrouver l'adh\xE9rence."
      },
      {
        questionText: "4. Sur route verglac\xE9e, la distance de freinage est multipli\xE9e par :",
        options: ["2", "4", "10", "100"],
        correctOptionIndex: 2,
        explanation: "L'absence d'adh\xE9rence sur verglas multiplie le freinage par 10."
      },
      {
        questionText: "5. Dans un tunnel, quelle distance de s\xE9curit\xE9 observer ?",
        options: ["5 m\xE8tres", "Celle mat\xE9rialis\xE9e par les rep\xE8res bleus sur les parois", "Rester coll\xE9", "1 m\xE8tre"],
        correctOptionIndex: 1,
        explanation: "Les rep\xE8res ou diodes bleues en tunnel indiquent l'intervalle l\xE9gal."
      },
      {
        questionText: "6. Si un incendie survient dans un tunnel devant vous, vous devez :",
        options: ["Attendre dans la voiture", "Couper le moteur et gagner imm\xE9diatement une issue de secours / niche d'\xE9vacuation \xE0 pied", "Acc\xE9l\xE9rer dans la fum\xE9e", "Faire un demi-tour rapide"],
        correctOptionIndex: 1,
        explanation: "Il faut \xE9vacuer le v\xE9hicule et s'abriter dans une issue de secours."
      },
      {
        questionText: "7. Entre un v\xE9hicule descendant et un v\xE9hicule montant sur une forte pente \xE9troite de m\xEAme cat\xE9gorie :",
        options: ["Le descendant a la priorit\xE9", "Le montant a la priorit\xE9 (red\xE9marrage en c\xF4te difficile)", "Le plus gros passe", "Le plus rapide passe"],
        correctOptionIndex: 1,
        explanation: "Le v\xE9hicule qui monte est prioritaire pour s'\xE9pargner un red\xE9marrage en c\xF4te."
      },
      {
        questionText: "8. La loi Montagne impose en p\xE9riode hivernale dans les zones pr\xE9fectorales :",
        options: ["4 pneus hiver ou cha\xEEnes/chaussettes \xE0 neige dans le coffre", "Un moteur hybride", "De rouler \xE0 20 km/h", "Le port d'un gilet jaune"],
        correctOptionIndex: 0,
        explanation: "Les \xE9quipements sp\xE9ciaux hiver sont obligatoires du 1er nov au 31 mars en zone montagne."
      },
      {
        questionText: "9. \xC0 quelle distance minimale \xE9clairant vers l'avant doivent r\xE9pondre les feux de croisement ?",
        options: ["10 m\xE8tres", "30 m\xE8tres", "100 m\xE8tres", "300 m\xE8tres"],
        correctOptionIndex: 1,
        explanation: "Les feux de croisement doivent \xE9clairer \xE0 au moins 30m."
      },
      {
        questionText: "10. \xC0 quelle distance minimale vers l'avant doivent \xE9clairer les feux de route (pleins phares) ?",
        options: ["30 m\xE8tres", "50 m\xE8tres", "100 m\xE8tres", "500 m\xE8tres"],
        correctOptionIndex: 2,
        explanation: "Les feux de route doivent \xE9clairer \xE0 au moins 100m."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-7",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-7" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Passer les rapports \xE0 bas r\xE9gime (vers 2000-2500 tr/min) fait partie de :",
        options: ["La conduite sportive", "L'\xE9co-conduite", "Le freinage d'urgence", "Le rodage du moteur"],
        correctOptionIndex: 1,
        explanation: "Changer de rapport \xE0 bas r\xE9gime r\xE9duit la consommation et les rejets polluants."
      },
      {
        questionText: "2. Sur le frein moteur (d\xE9c\xE9l\xE9ration vitesse enclench\xE9e), la consommation instantan\xE9e est de :",
        options: ["0 Litre / 100 km", "3 Litres / 100 km", "Maximale", "10 Litres"],
        correctOptionIndex: 0,
        explanation: "L'injection de carburant est coup\xE9e \xE0 100% sur le frein moteur."
      },
      {
        questionText: "3. Quand doit-on contr\xF4ler la pression des pneus ?",
        options: ["\xC0 chaud apr\xE8s 100 km", "\xC0 froid au moins 1 fois par mois", "Une fois par an", "Au contr\xF4le technique uniquement"],
        correctOptionIndex: 1,
        explanation: "Le contr\xF4le de pression se fait \xE0 froid mensuellement."
      },
      {
        questionText: "4. En cas de d\xE9faillance majeure au contr\xF4le technique, la contre-visite doit avoir lieu dans un d\xE9lai de :",
        options: ["24h", "2 mois", "6 mois", "1 an"],
        correctOptionIndex: 1,
        explanation: "Le propri\xE9taire dispose de 2 mois pour effectuer les r\xE9parations."
      },
      {
        questionText: "5. La vignette obligatoire en France pour circuler dans les Zones \xE0 Faibles \xC9missions (ZFE) est :",
        options: ["Crit'Air", "Autoroute", "Assurance", "Contr\xF4le Technique"],
        correctOptionIndex: 0,
        explanation: "Le macaron Crit'Air classe la pollution des v\xE9hicules."
      },
      {
        questionText: "6. Rouler avec un coffre de toit vide non d\xE9mont\xE9 provoque une surconsommation de :",
        options: ["0 %", "10 \xE0 15 %", "50 %", "80 %"],
        correctOptionIndex: 1,
        explanation: "La r\xE9sistance a\xE9rodynamique suppl\xE9mentaire augmente la consommation."
      },
      {
        questionText: "7. Quel gaz est le principal responsable de l'effet de serre rejet\xE9 par les voitures ?",
        options: ["Le dioxyde de carbone (CO2)", "L'oxyg\xE8ne (O2)", "L'azote", "L'h\xE9lium"],
        correctOptionIndex: 0,
        explanation: "Le CO2 est le principal responsable du r\xE9chauffement climatique li\xE9 aux carburants."
      },
      {
        questionText: '8. Si le niveau du liquide de frein descend sous le rep\xE8re "MINI", cela traduit :',
        options: ["Un fonctionnement normal", "Une usure prononc\xE9e des plaquettes ou une fuite", "Un manque d'essence", "Un probl\xE8me de lave-glace"],
        correctOptionIndex: 1,
        explanation: "Une baisse du liquide de frein signale un d\xE9faut d'usure ou de fuite \xE0 v\xE9rifier."
      },
      {
        questionText: "9. Couper son moteur lors d'un arr\xEAt prolong\xE9 sup\xE9rieur \xE0 10 secondes (ou Stop & Start) :",
        options: ["D\xE9truit le moteur", "\xC9conomise du carburant et r\xE9duit la pollution en ville", "Doubler la consommation", "Bloque la batterie"],
        correctOptionIndex: 1,
        explanation: "Extinction du moteur \xE0 l'arr\xEAt r\xE9duit les \xE9missions inutiles."
      },
      {
        questionText: "10. Le filtre \xE0 particules (FAP) sur les moteurs diesel sert \xE0 retenir :",
        options: ["L'eau de pluie", "Les particules fines toxiques", "L'huile", "Le bruit"],
        correctOptionIndex: 1,
        explanation: "Le FAP pi\xE8ge les suies et particules fines nocives."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-8",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-8" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Quel est le taux maximal d'alcool\xE9mie autoris\xE9 pour un permis probatoire ?",
        options: ["0,0 g/l", "0,2 g/l de sang (strictement z\xE9ro verre)", "0,5 g/l", "0,8 g/l"],
        correctOptionIndex: 1,
        explanation: "Le taux probatoire est fix\xE9 \xE0 0,2 g/l de sang."
      },
      {
        questionText: "2. \xC0 quelle vitesse l'alcool s'\xE9limine-t-il naturellement de l'organisme ?",
        options: ["1 g/l par heure", "Environ 0,10 \xE0 0,15 g/l de sang par heure", "En buvant un caf\xE9 fort", "En prenant une douche"],
        correctOptionIndex: 1,
        explanation: "L'\xE9limination est lente et ne peut \xEAtre acc\xE9l\xE9r\xE9e par aucun rem\xE8de."
      },
      {
        questionText: "3. La conduite sous stup\xE9fiants (cannabis, coca\xEFne) est sanctionn\xE9e par :",
        options: ["Une amende de 15 \u20AC", "Un d\xE9lit passible de retrait de 6 points, amende lourde et prison", "Un simple avertissement", "Rien"],
        correctOptionIndex: 1,
        explanation: "C'est un d\xE9lit entra\xEEnant 6 points en moins et sanctions p\xE9nales."
      },
      {
        questionText: "4. Tous les combien de temps une pause est-elle recommand\xE9e sur un long trajet ?",
        options: ["Toutes les 30 min", "Toutes les 2 heures au maximum", "Toutes les 5h", "Au r\xE9servoir vide"],
        correctOptionIndex: 1,
        explanation: "Une pause de 15-20 min s'impose au moins toutes les 2h."
      },
      {
        questionText: "5. La premi\xE8re cause de mortalit\xE9 sur autoroute est :",
        options: ["La somnolence et la fatigue", "Les crevaisons", "Les pannes", "Le mauvais temps"],
        correctOptionIndex: 0,
        explanation: "La somnolence cause 1 accident mortel sur 3 sur autoroute."
      },
      {
        questionText: "6. L'usage du t\xE9l\xE9phone tenu en main au volant est puni par :",
        options: ["135 \u20AC d'amende et retrait de 3 points", "Aucune amende", "Une amende de 15 \u20AC", "Un permis blanc"],
        correctOptionIndex: 0,
        explanation: "T\xE9l\xE9phone en main = 135 \u20AC et 3 points en moins."
      },
      {
        questionText: "7. Le port d'\xE9couteurs ou d'oreillettes audio en conduisant est :",
        options: ["Autoris\xE9 pour la musique", "Strictement interdit par la loi", "Autoris\xE9 \xE0 droite", "Obligatoire"],
        correctOptionIndex: 1,
        explanation: "Tout dispositif audio \xE0 l'oreille est interdit au volant."
      },
      {
        questionText: "8. \xC9crire un SMS en conduisant multiplie le risque d'accident par :",
        options: ["2", "5", "23", "100"],
        correctOptionIndex: 2,
        explanation: "R\xE9diger un SMS distrait les yeux pendant 5 sec, soit un risque x 23."
      },
      {
        questionText: "9. Le m\xE9lange d'alcool et de cannabis multiplie le risque d'accident mortel par :",
        options: ["2", "5", "29", "100"],
        correctOptionIndex: 2,
        explanation: "Le cumul des deux stup\xE9fiants multiplie par 29 le risque mortel."
      },
      {
        questionText: "10. Si vous ressentez les yeux qui picotent et des baillements r\xE9p\xE9t\xE9s :",
        options: ["Ouvrir la fen\xEAtre et continuer", "Vous arr\xEAter pour faire une sieste de 15 \xE0 20 min", "Monter la musique", "Boire un soda"],
        correctOptionIndex: 1,
        explanation: "La sieste sur une aire s\xE9curis\xE9e est la seule solution face \xE0 la somnolence."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-9",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-9" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Dans une Zone de Rencontre en ville, la vitesse est limit\xE9e \xE0 :",
        options: ["10 km/h", "20 km/h", "30 km/h", "50 km/h"],
        correctOptionIndex: 1,
        explanation: "La vitesse en zone de rencontre est de 20 km/h max et le pi\xE9ton a la priorit\xE9 absolue."
      },
      {
        questionText: "2. Quelle distance lat\xE9rale minimale laisser pour d\xE9passer un v\xE9lo EN AGGLOM\xC9RATION ?",
        options: ["0,5m", "1,0 m\xE8tre", "1,5 m\xE8tre", "3,0 m\xE8tres"],
        correctOptionIndex: 1,
        explanation: "En ville (agglom\xE9ration), l'\xE9cart minimal est de 1,0m (1,5m hors agglo)."
      },
      {
        questionText: "3. Qu'est-ce qu'un sas v\xE9lo devant un feu tricolore ?",
        options: ["Un garage v\xE9lo", "Un espace r\xE9serv\xE9 aux v\xE9los devant les voitures pour \xEAtre bien vus", "Un couloir de bus", "Un parking"],
        correctOptionIndex: 1,
        explanation: "Le sas permet aux cyclistes de se positionner devant les voitures au feu rouge."
      },
      {
        questionText: "4. Les trottinettes \xE9lectriques (EDPM) ont-elles le droit de rouler sur les trottoirs ?",
        options: ["Oui \xE0 25 km/h", "Strictement interdit (sauf moteur coup\xE9 au pas)", "Oui la nuit", "Oui en Zone 30"],
        correctOptionIndex: 1,
        explanation: "Les EDPM doivent emprunter les voies cyclables ou la chauss\xE9e, trottoir interdit."
      },
      {
        questionText: "5. La vitesse maximale par construction d'une trottinette \xE9lectrique (EDPM) est brid\xE9e \xE0 :",
        options: ["15 km/h", "25 km/h", "45 km/h", "80 km/h"],
        correctOptionIndex: 1,
        explanation: "La vitesse limite par construction est de 25 km/h."
      },
      {
        questionText: "6. Pour \xE9viter d'emporter un cycliste en ouvrant sa porti\xE8re de voiture c\xF4t\xE9 rue, il convient de :",
        options: ["Ouvrir d'un coup sec", "Ouvrir avec la main oppos\xE9e (main droite) pour pivoter le buste et regarder l'angle mort", "Fermer les yeux", "Sortir par le coffre"],
        correctOptionIndex: 1,
        explanation: "La poign\xE9e hollandaise (main oppos\xE9e) oriente le regard vers l'arri\xE8re."
      },
      {
        questionText: `7. L'autocollant "Attention Angles Morts" sur les camions pr\xE9vient :`,
        options: ["D'une publicit\xE9", "Des zones aveugles autour du poids lourd o\xF9 les usagers sont invisibles", "D'un danger de panne", "D'une amende"],
        correctOptionIndex: 1,
        explanation: "Il avertit des angles morts masquant les usagers proches du camion."
      },
      {
        questionText: "8. Peut-on franchir une ligne continue pour doubler un cycliste ?",
        options: ["Non jamais", "Oui, le chevauchement de ligne est tol\xE9r\xE9 si la visibilit\xE9 le permet", "Oui la nuit", "Uniquement en autoroute"],
        correctOptionIndex: 1,
        explanation: "Le chevauchement de ligne continue est exceptionnellement tol\xE9r\xE9 pour doubler un v\xE9lo en s\xE9curit\xE9."
      },
      {
        questionText: "9. \xC0 l'approche d'une personne malvoyante avec une canne blanche s'engageant sur la rue :",
        options: ["Klaxonner", "S'arr\xEAter pour lui c\xE9der la priorit\xE9 absolue", "Acc\xE9l\xE9rer", "Faire des appels de phares"],
        correctOptionIndex: 1,
        explanation: "Les personnes vuln\xE9rables b\xE9n\xE9ficient de la priorit\xE9 absolue."
      },
      {
        questionText: "10. Est-il autoris\xE9 d'interrompre un convoi militaire ou cort\xE8ge officiel en circulation ?",
        options: ["Oui", "Strictement interdit de s'immiscer dans un convoi constitu\xE9", "Oui le week-end", "Oui en klaxonnant"],
        correctOptionIndex: 1,
        explanation: "Il est interdit de couper un convoi officiel en mouvement."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-10",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-10" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      {
        questionText: "1. Combien de fautes maximum sont autoris\xE9es \xE0 l'examen officiel ETG (Code de la route) ?",
        options: ["0 faute", "5 fautes maximum (score min : 35/40)", "10 fautes", "15 fautes"],
        correctOptionIndex: 1,
        explanation: "Le candidat doit r\xE9ussir au moins 35 questions sur 40."
      },
      {
        questionText: `2. \xC0 l'examen, si une question demande "Je peux d\xE9passer ?", cela signifie :`,
        options: ["J'ai l'obligation de d\xE9passer", "C'est une possibilit\xE9 autoris\xE9e par la s\xE9curit\xE9 et le code", "C'est interdit", "Il faut piler"],
        correctOptionIndex: 1,
        explanation: `"Je peux" interroge sur la possibilit\xE9 / autorisation sans caract\xE8re d'obligation.`
      },
      {
        questionText: "3. En cas d'accident de la route, quel est le premier r\xE9flexe du protocole P.A.S. ?",
        options: ["Secourir", "Prot\xE9ger la zone pour \xE9viter le suraccident (gilet, feux d\xE9tresse, triangle)", "Alerter les pompiers", "Partir"],
        correctOptionIndex: 1,
        explanation: "P.A.S. = Prot\xE9ger d'abord, Alerter ensuite, Secourir enfin."
      },
      {
        questionText: "4. Quel est le num\xE9ro d'appel d'urgence europ\xE9en gratuit ?",
        options: ["112", "18", "15", "17"],
        correctOptionIndex: 0,
        explanation: "Le 112 est le num\xE9ro d'urgence unique europ\xE9en."
      },
      {
        questionText: "5. Devant une victime inconsciente qui respire, dans quelle position la placer ?",
        options: ["Assise", "Position Lat\xE9rale de S\xE9curit\xE9 (PLS)", "Sur le dos les jambes lev\xE9es", "Debout"],
        correctOptionIndex: 1,
        explanation: "La PLS pr\xE9vient l'\xE9touffement chez la personne inconsciente qui respire."
      },
      {
        questionText: "6. Faut-il enlever le casque d'un motard accident\xE9 au sol ?",
        options: ["Oui tout de suite", "Non, jamais (risque de paralysie cervicale) sauf secouriste sp\xE9cialis\xE9", "Oui pour lui donner de l'eau", "Oui s'il a chaud"],
        correctOptionIndex: 1,
        explanation: "Retirer le casque risque de cr\xE9er des l\xE9sions m\xE9dullaires irr\xE9parables."
      },
      {
        questionText: "7. Quelle est la dur\xE9e de r\xE9ponse accord\xE9e par question sur la tablette d'examen ?",
        options: ["5 secondes", "20 secondes", "1 minute", "Illimit\xE9e"],
        correctOptionIndex: 1,
        explanation: "Le candidat dispose de 20 secondes pour valider sa r\xE9ponse."
      },
      {
        questionText: "8. Un feu vert avec un pi\xE9ton engag\xE9 sur le passage \xE0 droite :",
        options: ["Le v\xE9hicule passe car le feu est vert", "Le v\xE9hicule s'arr\xEAte pour c\xE9der la priorit\xE9 au pi\xE9ton engag\xE9", "Le v\xE9hicule klaxonne", "Le v\xE9hicule fait demi-tour"],
        correctOptionIndex: 1,
        explanation: "La priorit\xE9 absolue revient au pi\xE9ton engag\xE9."
      },
      {
        questionText: "9. Si un v\xE9hicule vous suit de tr\xE8s pr\xE8s \xE0 un feu orange :",
        options: ["Piler net", "Franchir le feu orange avec prudence si l'arr\xEAt brutal provoque un choc arri\xE8re", "Tirer le frein \xE0 main", "Reculer"],
        correctOptionIndex: 1,
        explanation: "L'observation de l'arri\xE8re primant sur l'arr\xEAt abrupt pour la s\xE9curit\xE9."
      },
      {
        questionText: "10. Pour valider le programme complet Permis B sur Matoa, l'\xE9l\xE8ve doit :",
        options: ["Valider tous les modules et r\xE9ussir leurs quiz avec au moins 80%", "Regarder 1 minute de vid\xE9o", "Payer un suppl\xE9ment", "Passer 100 heures en ligne"],
        correctOptionIndex: 0,
        explanation: "La validation th\xE9orique exige la r\xE9ussite de l'ensemble du parcours et des quizzes."
      }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-11",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-11" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      { questionText: "1. Qui est prioritaire sur un passage pi\xE9ton engag\xE9 ?", options: ["La voiture", "Le pi\xE9ton", "Le v\xE9lo", "Personne"], correctOptionIndex: 1, explanation: "Le pi\xE9ton engag\xE9." },
      { questionText: "2. Quelle est la vitesse limite dans une zone de rencontre ?", options: ["50 km/h", "20 km/h", "30 km/h", "10 km/h"], correctOptionIndex: 1, explanation: "20 km/h." },
      { questionText: "3. \xC0 quoi sert le sas v\xE9lo ?", options: ["\xC0 garer la voiture", "Permettre aux cyclistes de se positionner en s\xE9curit\xE9 devant les voitures", "\xC0 doubler", "Rien"], correctOptionIndex: 1, explanation: "Positionnement s\xE9curis\xE9 v\xE9lo." },
      { questionText: "4. Que v\xE9rifier avant de tourner \xE0 droite en ville ?", options: ["Rien", "La pr\xE9sence d'un cycliste dans l'angle mort", "La radio", "Rien"], correctOptionIndex: 1, explanation: "Angle mort cycliste." },
      { questionText: "5. Pourquoi les deux-roues sont-ils plus difficiles \xE0 voir ?", options: ["Ils vont trop vite", "\xC0 cause de leur gabarit \xE9troit", "Ils sont sombres", "Rien"], correctOptionIndex: 1, explanation: "Gabarit \xE9troit." },
      { questionText: "6. Quelle distance de s\xE9curit\xE9 adopter avec un deux-roues ?", options: ["Nulle", "Au moins \xE9quivalente \xE0 celle d'une voiture", "Moiti\xE9", "Rien"], correctOptionIndex: 1, explanation: "Distance \xE9quivalente." },
      { questionText: "7. Comment ouvrir sa porti\xE8re en s\xE9curit\xE9 ?", options: ["Tr\xE8s vite", "Avec la main oppos\xE9e pour se retourner (m\xE9thode hollandaise)", "Sans regarder", "Rien"], correctOptionIndex: 1, explanation: "M\xE9thode hollandaise." },
      { questionText: "8. Pourquoi redoubler de prudence pr\xE8s d'une \xE9cole ?", options: ["Rien", "Le comportement des enfants est impr\xE9visible", "Le bruit", "Rien"], correctOptionIndex: 1, explanation: "Impr\xE9visibilit\xE9 des enfants." },
      { questionText: "9. Que faut-il accorder \xE0 une personne \xE0 mobilit\xE9 r\xE9duite qui traverse ?", options: ["Du klaxon", "Du temps suppl\xE9mentaire et de la patience", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Patience et temps." },
      { questionText: "10. Sur quoi repose le partage apais\xE9 de la route ?", options: ["La force", "Le respect mutuel entre tous les usagers", "La vitesse", "Rien"], correctOptionIndex: 1, explanation: "Respect mutuel." }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-12",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-12" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      { questionText: "1. Quel est l'ordre de la proc\xE9dure PAS ?", options: ["Alerter, Secourir, Prot\xE9ger", "Prot\xE9ger, Alerter, Secourir", "Secourir, Prot\xE9ger, Alerter", "Rien"], correctOptionIndex: 1, explanation: "Prot\xE9ger, Alerter, Secourir." },
      { questionText: "2. Quel est le num\xE9ro d'urgence europ\xE9en unique ?", options: ["15", "112", "17", "18"], correctOptionIndex: 1, explanation: "112." },
      { questionText: "3. Quel num\xE9ro correspond au SAMU ?", options: ["15", "17", "18", "112"], correctOptionIndex: 0, explanation: "15." },
      { questionText: "4. Quel num\xE9ro correspond aux pompiers ?", options: ["15", "17", "18", "112"], correctOptionIndex: 2, explanation: "18." },
      { questionText: "5. Quand utiliser la PLS ?", options: ["Personne consciente", "Pour une personne inconsciente qui respire encore", "Arr\xEAt cardiaque", "Rien"], correctOptionIndex: 1, explanation: "Inconsciente qui respire." },
      { questionText: "6. Quand peut-on d\xE9placer un bless\xE9 grave ?", options: ["Toujours", "Uniquement en cas de danger imm\xE9diat (feu, suraccident)", "Jamais", "Rien"], correctOptionIndex: 1, explanation: "Danger imm\xE9diat." },
      { questionText: "7. Que faire en priorit\xE9 en cas d'arr\xEAt cardiaque ?", options: ["PLS", "Masser le thorax et alerter imm\xE9diatement", "Attendre", "Rien"], correctOptionIndex: 1, explanation: "Massage et alerte." },
      { questionText: "8. Que faire apr\xE8s un accident mat\xE9riel sans bless\xE9 ?", options: ["Fuir", "Remplir un constat amiable", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Constat amiable." },
      { questionText: "9. Quitter les lieux d'un accident sans motif est-il l\xE9gal ?", options: ["Oui", "Non, c'est un d\xE9lit de fuite", "Oui le dimanche", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit de fuite." },
      { questionText: "10. Comment signaler un v\xE9hicule accident\xE9 sur la chauss\xE9e ?", options: ["Rien", "Feux de d\xE9tresse et triangle de pr\xE9signalisation", "Klaxon", "Rien"], correctOptionIndex: 1, explanation: "Feux de d\xE9tresse et triangle." }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-13",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-13" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      { questionText: "1. Quels documents doit-on pouvoir pr\xE9senter en cas de contr\xF4le ?", options: ["Carte bancaire", "Permis, carte grise, attestation d'assurance", "Permis seul", "Rien"], correctOptionIndex: 1, explanation: "Permis, carte grise, assurance." },
      { questionText: "2. Combien de points a un permis probatoire au d\xE9part ?", options: ["12 points", "6 points", "8 points", "4 points"], correctOptionIndex: 1, explanation: "6 points." },
      { questionText: "3. Combien de points a un permis confirm\xE9 ?", options: ["6 points", "12 points", "8 points", "20 points"], correctOptionIndex: 1, explanation: "12 points." },
      { questionText: "4. Que se passe-t-il \xE0 0 point ?", options: ["Rien", "Invalidation du permis", "Bonus", "Rien"], correctOptionIndex: 1, explanation: "Invalidation." },
      { questionText: "5. Comment r\xE9cup\xE9rer des points ?", options: ["Rien", "Stage de sensibilisation ou d\xE9lai sans infraction", "Payer", "Rien"], correctOptionIndex: 1, explanation: "Stage ou d\xE9lai." },
      { questionText: "6. La conduite sans assurance est-elle une contravention ou un d\xE9lit ?", options: ["Contravention", "Un d\xE9lit p\xE9nale", "Rien", "Rien"], correctOptionIndex: 1, explanation: "D\xE9lit p\xE9nale." },
      { questionText: "7. Que couvre l'assurance tous risques en plus du tiers ?", options: ["Tiers seul", "Dommages \xE0 son propre v\xE9hicule", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Propre v\xE9hicule." },
      { questionText: "8. Qu'est-ce que la franchise ?", options: ["Une taxe", "La somme restant \xE0 la charge de l'assur\xE9 en cas de sinistre", "Un cadeau", "Rien"], correctOptionIndex: 1, explanation: "Reste \xE0 charge." },
      { questionText: "9. Que concerne la responsabilit\xE9 civile ?", options: ["Amendes", "L'indemnisation des dommages caus\xE9s \xE0 autrui", "Prison", "Rien"], correctOptionIndex: 1, explanation: "Dommages caus\xE9s \xE0 autrui." },
      { questionText: "10. Les sanctions sont-elles aggrav\xE9es en cas d'accident sous alcool ?", options: ["Non", "Oui, fortement aggrav\xE9es", "Inchang\xE9es", "Rien"], correctOptionIndex: 1, explanation: "Sanctions aggrav\xE9es." }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-14",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-14" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      { questionText: "1. Quel est l'objectif principal de l'\xE9coconduite ?", options: ["Rouler vite", "R\xE9duire la consommation de carburant et les \xE9missions", "Gagner du temps", "Rien"], correctOptionIndex: 1, explanation: "R\xE9duire consommation et pollution." },
      { questionText: "2. \xC0 quelle fr\xE9quence v\xE9rifier la pression des pneus ?", options: ["Tous les ans", "Environ une fois par mois \xE0 froid", "Chaque jour", "Rien"], correctOptionIndex: 1, explanation: "Chaque mois \xE0 froid." },
      { questionText: "3. Que provoquent des plaquettes de frein us\xE9es ?", options: ["Rien", "Une distance de freinage allong\xE9e", "Meilleure vue", "Rien"], correctOptionIndex: 1, explanation: "Distance de freinage allong\xE9e." },
      { questionText: "4. \xC0 quoi sert le liquide de refroidissement ?", options: ["Rien", "\xC9viter la surchauffe du moteur", "Chauffer les si\xE8ges", "Rien"], correctOptionIndex: 1, explanation: "\xC9viter la surchauffe." },
      { questionText: "5. Que classe la vignette Crit'Air ?", options: ["Prix", "Le niveau de pollution du v\xE9hicule", "Taille", "Rien"], correctOptionIndex: 1, explanation: "Niveau polluant." },
      { questionText: "6. Que visent les zones \xE0 faibles \xE9missions (ZFE) ?", options: ["Rien", "R\xE9duire la pollution en limitant l'acc\xE8s aux v\xE9hicules polluants", "Rien", "Rien"], correctOptionIndex: 1, explanation: "R\xE9duire la pollution." },
      { questionText: "7. Que faut-il v\xE9rifier avant un long trajet ?", options: ["Radio", "Pneus, niveaux, \xE9clairage et freins", "Clim", "Rien"], correctOptionIndex: 1, explanation: "Pneus, niveaux, feux, freins." },
      { questionText: "8. Pourquoi utiliser le frein moteur ?", options: ["Pour s'amuser", "Pour \xE9conomiser les freins et le carburant", "Rien", "Rien"], correctOptionIndex: 1, explanation: "\xC9conomiser freins et essence." },
      { questionText: "9. Pourquoi \xE9viter de transporter une charge inutile ?", options: ["C'est lourd", "Cela augmente la consommation de carburant", "Rien", "Rien"], correctOptionIndex: 1, explanation: "Augmente la consommation." },
      { questionText: "10. Quel est l'int\xE9r\xEAt de planifier son itin\xE9raire ?", options: ["Rien", "\xC9viter les embouteillages et r\xE9duire la consommation", "Rien", "Rien"], correctOptionIndex: 1, explanation: "\xC9viter embouteillages." }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    _id: "quiz-mod-15",
    _type: "quiz",
    module: { _type: "reference", _ref: "mod-15" },
    timerSeconds: 600,
    scoreMinimum: 80,
    questions: [
      { questionText: "1. Combien de questions comporte l'ETG ?", options: ["20", "40 questions", "60", "10"], correctOptionIndex: 1, explanation: "40 questions." },
      { questionText: "2. Quel est le seuil de r\xE9ussite ?", options: ["30/40", "35 bonnes r\xE9ponses sur 40 (5 fautes max)", "40/40", "20/40"], correctOptionIndex: 1, explanation: "35/40 minimum." },
      { questionText: "3. Qui est prioritaire en l'absence de signalisation ?", options: ["Gauche", "Celui qui vient de droite", "Le plus rapide", "Rien"], correctOptionIndex: 1, explanation: "Priorit\xE9 \xE0 droite." },
      { questionText: "4. Quelle est la vitesse maximale en agglom\xE9ration ?", options: ["30 km/h", "50 km/h", "70 km/h", "90 km/h"], correctOptionIndex: 1, explanation: "50 km/h." },
      { questionText: "5. Quel est l'ordre de la proc\xE9dure en cas d'accident ?", options: ["Alerter, Secourir, Prot\xE9ger", "Prot\xE9ger, Alerter, Secourir", "Secourir, Prot\xE9ger, Alerter", "Rien"], correctOptionIndex: 1, explanation: "Prot\xE9ger, Alerter, Secourir." },
      { questionText: "6. Quel est le taux d'alcool\xE9mie maximal pour un conducteur confirm\xE9 ?", options: ["0,2 g/L", "0,5 g/L", "0,8 g/L", "1 g/L"], correctOptionIndex: 1, explanation: "0,5 g/L." },
      { questionText: "7. Que faut-il faire en cas de panne sur autoroute ?", options: ["S'arr\xEAter au milieu", "Se garer sur la bande d'arr\xEAt d'urgence le plus \xE0 droite", "Continuer", "Rien"], correctOptionIndex: 1, explanation: "Bande d'arr\xEAt d'urgence." },
      { questionText: "8. Quelle est la distance de s\xE9curit\xE9 de base entre deux v\xE9hicules ?", options: ["1 seconde", "2 secondes minimum", "10 secondes", "Rien"], correctOptionIndex: 1, explanation: "2 secondes minimum." },
      { questionText: "9. Qu'est-ce que la vignette Crit'Air ?", options: ["Une amende", "Un classement du v\xE9hicule selon son niveau de pollution", "Un permis", "Rien"], correctOptionIndex: 1, explanation: "Classement de pollution." },
      { questionText: "10. Quel num\xE9ro appeler en urgence en Europe ?", options: ["15", "112", "17", "18"], correctOptionIndex: 1, explanation: "112." }
    ],
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
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
