import React from 'react';
import { School, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BrandingPreviewCardProps {
  name: string;
  code: string;
  logoUrl?: string;
  slogan?: string;
  primaryColor: string;
  secondaryColor: string;
}

export const BrandingPreviewCard: React.FC<BrandingPreviewCardProps> = ({
  name,
  code,
  logoUrl,
  slogan,
  primaryColor,
  secondaryColor,
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-3 bg-slate-900 text-slate-300 text-xs font-mono flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400">{t('studentSpacePreviewHeader')} {code}</span>
        </div>
        <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">{t('customizedSpaceBadge')}</span>
      </div>

      {/* Simulated Student Portal Header */}
      <div
        className="p-6 text-white transition-colors duration-300 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="flex items-center space-x-4 relative z-10">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={t('schoolLogoAlt')}
              className="w-16 h-16 rounded-xl object-cover bg-white/10 p-1 border border-white/20 shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <School className="w-8 h-8" />
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              {t('officialStudentSpaceBadge')}
            </span>
            <h3 className="text-xl font-bold mt-1 text-white">{name || t('schoolNameFallback')}</h3>
            <p className="text-xs text-white/80 italic mt-0.5">
              {slogan || t('schoolSloganFallback')}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Student Portal Body */}
      <div className="p-5 bg-slate-50 space-y-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{t('theoreticalProgressSubtitle')}</p>
              <p className="text-sm font-bold text-slate-800">{t('mockModuleTitle')}</p>
            </div>
          </div>

          <span
            className="px-3 py-1 rounded-full text-xs font-bold text-white flex items-center space-x-1"
            style={{ backgroundColor: secondaryColor }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />
            {t('validated85PctBadge')}
          </span>
        </div>

        {/* Action Button Preview */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
          <span>{t('primaryColorCardLabel')} <strong className="font-mono text-slate-800">{primaryColor}</strong></span>
          <span>{t('secondaryColorCardLabel')} <strong className="font-mono text-slate-800">{secondaryColor}</strong></span>
        </div>
      </div>
    </div>
  );
};
