import React from 'react';
import { Certificat, AutoEcole, Eleve, User } from '../types';
import { Download, Award, ShieldCheck, X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CertificateModalProps {
  certificat: Certificat | null;
  eleve: Eleve;
  user: User | { name: string; email: string };
  autoEcole: AutoEcole | null;
  onClose: () => void;
  onDownload: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificat,
  eleve,
  user,
  autoEcole,
  onClose,
  onDownload,
}) => {
  const { language, t } = useLanguage();

  const emissionDate = certificat?.dateEmission
    ? new Date(certificat.dateEmission).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  const certCode = certificat?.certificateCode || `CERT-2026-MATOA-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container with Golden/Navy Luxury Framing */}
        <div
          id="certificate-render-node"
          className="p-8 sm:p-12 relative bg-white"
          style={{
            backgroundImage: `linear-gradient(135deg, ${autoEcole?.couleursTheme?.primaryColor || '#2563eb'}08 0%, #ffffff 50%, ${autoEcole?.couleursTheme?.secondaryColor || '#059669'}08 100%)`,
          }}
        >
          {/* Certificate Border Frame */}
          <div
            className="border-4 border-double p-6 sm:p-8 rounded-xl relative bg-white/90 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${autoEcole?.couleursTheme?.primaryColor || '#2563eb'}40` }}
          >
            {/* Corner Decorative Dots */}
            <div
              className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2"
              style={{ borderColor: autoEcole?.couleursTheme?.primaryColor || '#2563eb' }}
            />
            <div
              className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2"
              style={{ borderColor: autoEcole?.couleursTheme?.primaryColor || '#2563eb' }}
            />
            <div
              className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2"
              style={{ borderColor: autoEcole?.couleursTheme?.primaryColor || '#2563eb' }}
            />
            <div
              className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2"
              style={{ borderColor: autoEcole?.couleursTheme?.primaryColor || '#2563eb' }}
            />

            {/* Header Logos */}
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-6 mb-8">
              {/* Matoa Platform Brand */}
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/40 p-1 flex items-center justify-center shadow-sm shrink-0">
                  <img src="/matoa-logo.png" alt="Matoa Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">{t('appName')}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {t('saasNo1Badge')}
                  </p>
                </div>
              </div>

              {/* Driving School Brand */}
              <div className="text-right">
                {autoEcole?.logo ? (
                  <img
                    src={autoEcole.logo}
                    alt={autoEcole.name}
                    className="h-10 object-contain ml-auto mb-1"
                  />
                ) : (
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    {autoEcole?.name || t('partnerSchoolFallback')}
                  </span>
                )}
                <p className="text-xs font-medium text-slate-700">{autoEcole?.name}</p>
                <p className="text-[10px] text-slate-500">{t('schoolCodeLabel')} {autoEcole?.codeAutoEcoleUnique}</p>
              </div>
            </div>

            {/* Main Certificate Title */}
            <div className="text-center my-6">
              <div className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-700 mr-1" />
                {t('officialSuccessAttestationBadge')}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                {t('certEndTrainingTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
                {t('certLegalRequirementsDesc')}
              </p>
            </div>

            {/* Recipient Details */}
            <div className="text-center my-8 py-6 bg-white/80 rounded-xl border border-amber-100 shadow-sm">
              <p className="text-xs uppercase text-slate-400 font-medium tracking-wider">
                {t('certAttestsThatStudent')}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 my-1 font-serif text-blue-900">
                {user.name}
              </h3>
              <p className="text-xs text-slate-600 font-mono">
                {t('studentCodeLabel')} <span className="font-bold text-slate-800">{eleve.codeEleveUnique}</span> | {t('email')} : {user.email}
              </p>
            </div>

            {/* Content Text */}
            <p className="text-xs sm:text-sm text-slate-700 text-center max-w-xl mx-auto leading-relaxed">
              {t('certRecipientFollowedModules')} <strong className="text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{t('permisPrefix')} {eleve.typePermis || 'B'}</strong> {t('certTaughtBySchool')}{' '}
              <strong className="text-slate-900">{autoEcole?.name || t('partnerSchoolFallback')}</strong> {t('certPlatformSuccessConclusion')}
            </p>

            {/* Footer Signatures and Verification Badge */}
            <div className="mt-10 pt-6 border-t border-amber-200/60 grid grid-cols-2 gap-4 items-center text-xs">
              <div>
                <p className="text-slate-400 font-medium text-[10px] uppercase">{t('emissionDateLabel')}</p>
                <p className="font-bold text-slate-800">{emissionDate}</p>
                <p className="text-slate-400 font-medium text-[10px] uppercase mt-2">{t('verificationNumberLabel')}</p>
                <p className="font-mono text-xs font-bold text-amber-800 bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-200">
                  {certCode}
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-center">
                  <CheckCircle className="w-6 h-6 mx-auto text-amber-600 mb-1" />
                  <p className="text-[10px] font-bold uppercase tracking-wider">{t('digitalStampVerified')}</p>
                  <p className="text-[9px] text-slate-500">Matoa Platform SaaS Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="bg-slate-50 p-4 px-6 flex items-center justify-between border-t border-slate-200">
          <p className="text-xs text-slate-500 font-medium">
            {t('certAssiduityNotice')}
          </p>

          <button
            onClick={onDownload}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <Download className="w-4 h-4" />
            <span>{t('downloadAttestationPdfBtn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
