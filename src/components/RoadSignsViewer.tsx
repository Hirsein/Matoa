import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  AlertTriangle,
  ShieldAlert,
  Compass,
  Info,
  Layers,
  FileText,
  Lightbulb,
  Maximize2,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Eye,
  SlidersHorizontal,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import {
  VISUAL_OVERVIEW,
  REFERENCE_DOCS,
  ALL_ROAD_SIGNS,
  EXAM_METHOD_TIPS,
  RoadSignItem,
  ReferenceImageDoc,
} from '../lib/roadSignsData';
import { RoadSignSvg } from './RoadSignSvg';

export const RoadSignsViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedDoc, setSelectedDoc] = useState<ReferenceImageDoc | null>(null);
  const [selectedSign, setSelectedSign] = useState<RoadSignItem | null>(null);

  // Filter signs
  const filteredSigns = useMemo(() => {
    return ALL_ROAD_SIGNS.filter((sign) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'danger' && sign.category === 'danger') ||
        (activeCategory === 'priority' && sign.category === 'priority') ||
        (activeCategory === 'interdiction' && (sign.category === 'interdiction' || sign.category === 'fin_interdiction')) ||
        (activeCategory === 'obligation' && (sign.category === 'obligation' || sign.category === 'fin_obligation')) ||
        (activeCategory === 'indication' && (sign.category === 'indication' || sign.category === 'balise')) ||
        (activeCategory === 'passage_travaux' && (sign.category === 'passage_niveau' || sign.category === 'temporaire')) ||
        (activeCategory === 'panonceau' && sign.category === 'panonceau');

      if (!matchesCategory) return false;

      // Search term filter
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        (sign.code && sign.code.toLowerCase().includes(term)) ||
        sign.name.toLowerCase().includes(term) ||
        sign.meaning.toLowerCase().includes(term) ||
        (sign.ruleTag && sign.ruleTag.toLowerCase().includes(term)) ||
        sign.categoryLabel.toLowerCase().includes(term)
      );
    });
  }, [activeCategory, searchTerm]);

  // Counts by category
  const counts = useMemo(() => {
    return {
      all: ALL_ROAD_SIGNS.length,
      danger: ALL_ROAD_SIGNS.filter((s) => s.category === 'danger').length,
      priority: ALL_ROAD_SIGNS.filter((s) => s.category === 'priority').length,
      interdiction: ALL_ROAD_SIGNS.filter((s) => s.category === 'interdiction' || s.category === 'fin_interdiction').length,
      obligation: ALL_ROAD_SIGNS.filter((s) => s.category === 'obligation' || s.category === 'fin_obligation').length,
      indication: ALL_ROAD_SIGNS.filter((s) => s.category === 'indication' || s.category === 'balise').length,
      passage_travaux: ALL_ROAD_SIGNS.filter((s) => s.category === 'passage_niveau' || s.category === 'temporaire').length,
      panonceau: ALL_ROAD_SIGNS.filter((s) => s.category === 'panonceau').length,
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-rose-500 text-white rounded-full shadow-sm flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Guide Officiel de Signalisation</span>
            </span>
            <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-indigo-600/80 text-indigo-100 rounded-full border border-indigo-400/30">
              Code CEMAC & Réglementation Locale
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Panneaux de Signalisation & Règles de Conduite
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Les panneaux ci-dessous sont décrits avec leur aspect visuel, leur signification et l’attitude à adopter. Les images illustratives montrent le principe visuel des catégories ; certains pictogrammes peuvent présenter de légères variantes selon la version du manuel local.
          </p>

          {/* Quick Search & Controls Toolbar */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par code (ex: A1a, B14, AB4, C1a), nom, mot-clé ou règle..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 rounded-2xl border border-white/20 focus:border-indigo-400 focus:outline-none transition text-sm backdrop-blur-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center space-x-2 border ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 border-white shadow-lg'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Cartes</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center space-x-2 border ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 border-white shadow-lg'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Tableau</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'all', label: 'Tous', count: counts.all, icon: Layers },
          { id: 'danger', label: '1. Danger', count: counts.danger, icon: AlertTriangle },
          { id: 'priority', label: 'Priorité (AB)', count: counts.priority, icon: Sparkles },
          { id: 'interdiction', label: '2. Interdictions', count: counts.interdiction, icon: ShieldAlert },
          { id: 'obligation', label: '3. Obligations', count: counts.obligation, icon: Compass },
          { id: 'indication', label: '4. Indications & Balises', count: counts.indication, icon: Info },
          { id: 'passage_travaux', label: '5. Passages & Travaux', count: counts.passage_travaux, icon: SlidersHorizontal },
          { id: 'panonceau', label: 'Panonceaux', count: counts.panonceau, icon: Bookmark },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 shrink-0 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SECTION : REPÈRE VISUEL */}
      {activeCategory === 'all' && !searchTerm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Formes & Couleurs
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Repère visuel fondamental
              </h2>
            </div>
            <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-3 py-1 rounded-full">
              9 Principes Clés
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISUAL_OVERVIEW.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 transition flex items-start space-x-4 shadow-xs"
              >
                <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 shrink-0">
                  <RoadSignSvg iconType={item.iconType} size={44} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-slate-900 dark:text-white">{item.family}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.shape}</p>
                  <p className="text-xs italic font-medium text-indigo-600 dark:text-indigo-400">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION : PLANCHES & DOCUMENTS OFFICIELS */}
      {activeCategory === 'all' && !searchTerm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Documents de Référence
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Planches Illustratives Officielles
              </h2>
            </div>
            <span className="text-xs bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
              Cliquez pour Agrandir
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REFERENCE_DOCS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="group cursor-pointer bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-slate-200 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={doc.imageUrl}
                    alt={doc.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white text-slate-900 text-xs font-black rounded-xl shadow-lg flex items-center space-x-2">
                      <Maximize2 className="w-4 h-4 text-indigo-600" />
                      <span>Examiner en Haute Définition</span>
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black rounded-lg uppercase tracking-wider border border-white/20">
                    {doc.badge}
                  </span>
                </div>
                <div className="p-4 space-y-1 bg-white dark:bg-slate-900 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {doc.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>Ouvrir la planche</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION : LISTE & CARTES DES PANNEAUX */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Catalogue des Panneaux & Prescriptions ({filteredSigns.length})
            </h2>
            {searchTerm && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Résultats filtrés pour : <strong className="text-slate-800 dark:text-slate-200">« {searchTerm} »</strong>
              </p>
            )}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Cliquez sur un panneau pour afficher sa fiche détaillée
          </span>
        </div>

        {filteredSigns.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Aucun panneau trouvé</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Essayez un autre mot-clé ou réinitialisez les filtres pour afficher l'ensemble des panneaux.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-indigo-700 transition"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSigns.map((sign) => (
              <div
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-200 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    {sign.code ? (
                      <span className="px-2.5 py-1 text-xs font-mono font-black rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs">
                        {sign.code}
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        {sign.categoryLabel}
                      </span>
                    )}

                    {sign.ruleTag && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 truncate max-w-[120px]">
                        {sign.ruleTag}
                      </span>
                    )}
                  </div>

                  {/* Sign Visual Graphic */}
                  <div className="py-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-3 border border-slate-100 dark:border-slate-800/60 group-hover:scale-105 transition-transform duration-300">
                    <RoadSignSvg iconType={sign.iconType} size={70} />
                  </div>

                  <h3 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                    {sign.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {sign.meaning}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Voir la consigne</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                    <th className="px-4 py-3.5 w-20 text-center">Visuel</th>
                    <th className="px-4 py-3.5 w-24">Code</th>
                    <th className="px-4 py-3.5">Panneau / Description</th>
                    <th className="px-4 py-3.5">Signification & Conduite à adopter</th>
                    <th className="px-4 py-3.5 w-32">Catégorie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs text-slate-800 dark:text-slate-200">
                  {filteredSigns.map((sign) => (
                    <tr
                      key={sign.id}
                      onClick={() => setSelectedSign(sign)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center justify-center p-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
                          <RoadSignSvg iconType={sign.iconType} size={40} />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {sign.code || '—'}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        {sign.name}
                      </td>
                      <td className="px-4 py-3 leading-relaxed text-slate-600 dark:text-slate-300">
                        {sign.meaning}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {sign.categoryLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* SECTION : METHODE RAPIDE POUR L'EXAMEN */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/30 dark:via-amber-950/10 rounded-3xl p-6 sm:p-8 border border-amber-300/60 dark:border-amber-700/40 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-md shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Conseils Pédagogiques
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Méthode rapide pour l’examen du Code
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {EXAM_METHOD_TIPS.map((tip, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 flex items-start space-x-3 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-amber-100/70 dark:bg-amber-900/30 rounded-2xl border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
          <strong>Rappel officiel :</strong> Le Code CEMAC régit les règles de circulation dans les États membres (Cameroun, Gabon, Congo, Guinée Équatoriale, Tchad, RCA). Pour votre examen, veillez à toujours respecter la signalisation enseignée par votre auto-école agréée.
        </div>
      </div>

      {/* MODAL : IMAGE HD VIEWER */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                    {selectedDoc.category}
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                    {selectedDoc.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1 bg-slate-950 flex items-center justify-center">
                <img
                  src={selectedDoc.imageUrl}
                  alt={selectedDoc.title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg shadow-xl"
                />
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                <span>{selectedDoc.subtitle}</span>
                <a
                  href={selectedDoc.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-xl flex items-center space-x-1.5 hover:bg-indigo-700 transition"
                >
                  <span>Plein écran</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL : SIGN INSPECTOR */}
      <AnimatePresence>
        {selectedSign && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
                <div className="flex items-center space-x-2">
                  {selectedSign.code && (
                    <span className="px-2.5 py-1 text-xs font-mono font-black rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200">
                      Code {selectedSign.code}
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {selectedSign.categoryLabel}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSign(null)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Visual Representation */}
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
                  <RoadSignSvg iconType={selectedSign.iconType} size={110} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedSign.name}
                  </h3>

                  <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 tracking-wider">
                      Signification & Attitude au Volant
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {selectedSign.meaning}
                    </p>
                  </div>

                  {selectedSign.ruleTag && (
                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Règle clé : {selectedSign.ruleTag}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex justify-end">
                <button
                  onClick={() => setSelectedSign(null)}
                  className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-90 transition"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
