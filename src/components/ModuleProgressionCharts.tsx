import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon, CheckCircle2, Lock, Clock, BookOpen } from 'lucide-react';

interface ModuleProgressionChartsProps {
  structuredProgression: any[];
  onSelectModule?: (modItem: any) => void;
  activeModuleId?: string;
}

export const ModuleProgressionCharts: React.FC<ModuleProgressionChartsProps> = ({
  structuredProgression,
  onSelectModule,
  activeModuleId,
}) => {
  if (!structuredProgression || structuredProgression.length === 0) {
    return null;
  }

  // Calculate Status Breakdown
  const validatedCount = structuredProgression.filter((sp) => sp.isCompleted || sp.isValidated).length;
  const inProgressCount = structuredProgression.filter(
    (sp) => !(sp.isCompleted || sp.isValidated) && !sp.isLocked && (sp.progressionPct > 0 || (sp.lecons && sp.lecons.some((l: any) => l.videoWatchPercent > 0)))
  ).length;
  const notStartedCount = structuredProgression.length - validatedCount - inProgressCount;

  const pieData = [
    { name: 'Validés (100%)', value: validatedCount, color: '#10b981' }, // Emerald
    { name: 'En cours', value: inProgressCount, color: '#2563eb' }, // Blue
    { name: 'A faire / Verrouillés', value: Math.max(0, notStartedCount), color: '#cbd5e1' }, // Slate
  ].filter((d) => d.value > 0);

  // Average Progression
  const totalPctSum = structuredProgression.reduce((acc, sp) => {
    if (sp.isCompleted || sp.isValidated) return acc + 100;
    return acc + (sp.progressionPct || 0);
  }, 0);
  const avgProgression = Math.round(totalPctSum / structuredProgression.length);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg">
              <PieChartIcon className="w-5 h-5" />
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              Analyse Visuelle de la Progression Théorique
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Graphique circulaire global et jauges d'avancement par module
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <span className="text-slate-500 dark:text-slate-400">Moyenne Globale :</span>
          <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-black">{avgProgression}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Global Donut Pie Chart */}
        <div className="lg:col-span-5 bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Répartition par Statut des Modules
          </h4>

          <div className="w-full h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} module(s)`, name]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Donut Center Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {validatedCount}/{structuredProgression.length}
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Validés
              </span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-[11px] font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Validés ({validatedCount})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>En cours ({inProgressCount})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span>A faire ({Math.max(0, notStartedCount)})</span>
            </div>
          </div>
        </div>

        {/* Right: Individual Circular Gauges per Module */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Progression par Module (Jauges Circulaires)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
            {structuredProgression.map((sp, idx) => {
              const pct = sp.isCompleted || sp.isValidated ? 100 : sp.progressionPct || 0;
              const isSelected = activeModuleId === sp.module._id;

              // SVG Circle Calculation (Radius = 24, Circumference = 2 * PI * 24 = 150.796)
              const radius = 24;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (pct / 100) * circumference;

              const strokeColor = sp.isCompleted || sp.isValidated
                ? '#10b981'
                : sp.isLocked
                ? '#cbd5e1'
                : '#2563eb';

              const completedLecCount = (sp.lecons || []).filter((l: any) => l.isCompleted).length;
              const totalLecCount = (sp.lecons || []).length;

              return (
                <div
                  key={sp.module._id || idx}
                  onClick={() => onSelectModule && !sp.isLocked && onSelectModule(sp)}
                  className={`p-3.5 rounded-xl border transition-all flex items-center space-x-3 ${
                    sp.isLocked
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/20 cursor-pointer shadow-xs'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer shadow-xs'
                  }`}
                >
                  {/* SVG Circular Ring Gauge */}
                  <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        className="stroke-slate-200 dark:stroke-slate-700"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="5"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center text-center">
                      <span className="text-[11px] font-black font-mono text-slate-900 dark:text-white">
                        {pct}%
                      </span>
                    </div>
                  </div>

                  {/* Module Infos */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                        Mod {sp.module.ordre}
                      </span>

                      {sp.isCompleted || sp.isValidated ? (
                        <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded-full border border-emerald-200">
                          Validé
                        </span>
                      ) : sp.isLocked ? (
                        <span className="text-[9px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
                          Verrouillé
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded-full">
                          En cours
                        </span>
                      )}
                    </div>

                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {sp.module.title}
                    </h5>

                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      Leçons : {completedLecCount}/{totalLecCount} • Quiz : {typeof sp.quizScore === 'number' ? `${sp.quizScore}%` : '-'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
