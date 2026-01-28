import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Account Page (Mobile)
 * 
 * Account info, Responsible Use, Terms, Logout.
 */

interface AccountProps {
  isAuthorized: boolean;
  onLogout: () => void;
}

const Account: React.FC<AccountProps> = ({ isAuthorized, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Account Info */}
      <div className="space-y-4">
        <div className="p-4 bg-white/5 border border-white/10 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white">Account Status</h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAuthorized ? 'bg-electric-blue' : 'bg-soft-slate/40'}`} />
            <span className="text-xs font-mono text-soft-slate uppercase">
              {isAuthorized ? 'Authorized' : 'Not Authorized'}
            </span>
          </div>
          {isAuthorized && (
            <p className="text-[10px] font-mono text-soft-slate/60 mt-2">
              Active Alpha Tek credentials
            </p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-2">
        <Link
          to="/responsible-use"
          className="block p-4 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Responsible Use
            </span>
            <svg className="w-4 h-4 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          to="/research-ethics"
          className="block p-4 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Research Ethics
            </span>
            <svg className="w-4 h-4 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          to="/terms"
          className="block p-4 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Terms of Service
            </span>
            <svg className="w-4 h-4 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link
          to="/about"
          className="block p-4 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Mission
            </span>
            <svg className="w-4 h-4 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Parent Entity */}
      <div className="p-4 bg-white/5 border border-white/10 space-y-2">
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">Parent Entity</span>
        <a href="#" className="text-xs font-bold text-electric-blue hover:text-white transition-colors tracking-wider uppercase block">
          ALPHA TEK
        </a>
      </div>

      {/* Auth Actions */}
      {isAuthorized ? (
        <button
          onClick={handleLogout}
          className="w-full py-4 border border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
        >
          Disconnect
        </button>
      ) : (
        <Link
          to="/auth/login"
          className="block w-full text-center py-4 bg-electric-blue/10 border border-electric-blue/40 text-electric-blue hover:bg-electric-blue hover:text-midnight transition-all text-xs font-mono uppercase tracking-wider"
        >
          Authorize
        </Link>
      )}

      {/* Disclaimer */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-[10px] font-mono text-soft-slate/60 leading-relaxed text-center">
          FAKE Tek is a research instrument. No sensitive data is stored or shared.
        </p>
      </div>
    </div>
  );
};

export default Account;
