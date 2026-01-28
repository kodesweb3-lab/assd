import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page Mobile View
 * 
 * App Home style with quick cards and CTAs.
 * Shows empty states honestly.
 */

const HomeMobile: React.FC = () => {
  const isAuthorized = localStorage.getItem('fake_authorized') === 'true';

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center py-4 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display uppercase">
          FAKE
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-signal-purple font-display uppercase">
          Tek
        </h2>
      </div>

      {/* Quick Cards */}
      <div className="space-y-4">
        {/* Continue Research */}
        {isAuthorized ? (
          <Link
            to="/dashboard"
            className="block p-6 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white font-display uppercase">Continue Research</h3>
              <p className="text-xs text-soft-slate font-light">
                Access your research hub
              </p>
            </div>
          </Link>
        ) : (
          <Link
            to="/auth/login"
            className="block p-6 bg-electric-blue/10 border border-electric-blue/20 hover:border-electric-blue/40 transition-all"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-electric-blue font-display uppercase">Join the Research</h3>
              <p className="text-xs text-soft-slate font-light">
                Authorize to access research tools
              </p>
            </div>
          </Link>
        )}

        {/* Start a Scan */}
        <Link
          to={isAuthorized ? "/scan" : "/auth/login"}
          className="block p-6 bg-white/5 border border-white/10 hover:border-electric-blue/20 transition-all"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white font-display uppercase">Start a Scan</h3>
            <p className="text-xs text-soft-slate font-light">
              Observe signals and save research items
            </p>
          </div>
        </Link>

        {/* Recent Items - Empty State */}
        <div className="p-6 bg-white/5 border border-white/10 opacity-40">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white font-display uppercase">Recent Items</h3>
            <p className="text-xs text-soft-slate/60 font-light">
              No recent items
            </p>
          </div>
        </div>

        {/* Saved Notes - Empty State */}
        <div className="p-6 bg-white/5 border border-white/10 opacity-40">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white font-display uppercase">Saved Notes</h3>
            <p className="text-xs text-soft-slate/60 font-light">
              No saved notes
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Quote */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-sm text-white font-light italic leading-relaxed text-center">
          "You cannot navigate systems you don't understand."
        </p>
        <p className="text-[10px] font-mono text-soft-slate/60 uppercase tracking-wider text-center mt-3">
          Field Analysis of Kinetic Engagement
        </p>
      </div>
    </div>
  );
};

export default HomeMobile;
