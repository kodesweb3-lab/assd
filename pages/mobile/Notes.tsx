import React, { useState } from 'react';

/**
 * Notes Page (Mobile)
 * 
 * Timeline list of notes with tags and filter.
 * Local state only - no fake data claims.
 */

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterTag, setFilterTag] = useState<string>('');
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  const filteredNotes = filterTag
    ? notes.filter(note => note.tags.includes(filterTag))
    : notes;

  const handleSaveNote = () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;

    const tags = newNoteTags
      .split(' ')
      .map(t => t.trim())
      .filter(t => t && t.startsWith('#'))
      .map(t => t.substring(1));

    const newNote: Note = {
      id: Date.now(),
      title: newNoteTitle.trim() || 'Untitled',
      content: newNoteContent.trim(),
      tags,
      timestamp: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
    setShowNewNote(false);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Filter Tags */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterTag('')}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all whitespace-nowrap ${
                !filterTag
                  ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                  : 'border-white/10 text-soft-slate hover:border-white/20'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === filterTag ? '' : tag)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all whitespace-nowrap ${
                  filterTag === tag
                    ? 'border-electric-blue bg-electric-blue/10 text-electric-blue'
                    : 'border-white/10 text-soft-slate hover:border-white/20'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* New Note Form */}
      {showNewNote ? (
        <div className="space-y-4 p-4 bg-white/5 border border-white/10">
          <input
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            placeholder="Title (optional)"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
          />
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Note content..."
            className="w-full h-32 px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all resize-none"
          />
          <input
            type="text"
            value={newNoteTags}
            onChange={(e) => setNewNoteTags(e.target.value)}
            placeholder="#tag1 #tag2"
            className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white placeholder-soft-slate/50 font-mono text-sm focus:outline-none focus:border-electric-blue/50 transition-all"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveNote}
              className="flex-1 py-2 bg-electric-blue text-midnight hover:bg-white transition-all text-xs font-bold font-mono uppercase tracking-wider"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowNewNote(false);
                setNewNoteTitle('');
                setNewNoteContent('');
                setNewNoteTags('');
              }}
              className="flex-1 py-2 border border-white/10 text-white hover:bg-white/5 transition-all text-xs font-mono uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNewNote(true)}
          className="w-full py-4 bg-electric-blue text-midnight hover:bg-white transition-all text-xs font-bold font-mono uppercase tracking-wider"
        >
          New Note
        </button>
      )}

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="pt-12 text-center space-y-3 opacity-40">
          <p className="text-xs font-mono text-soft-slate uppercase tracking-wider">
            {filterTag ? `No notes with #${filterTag}` : 'No notes saved'}
          </p>
          <p className="text-[10px] font-mono text-soft-slate/60">
            {filterTag ? 'Try a different tag' : 'Create your first note'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-white/5 border border-white/10 space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-bold text-white font-display flex-1">
                  {note.title}
                </h3>
                <span className="text-[9px] font-mono text-soft-slate/60 ml-2">
                  {new Date(note.timestamp).toLocaleDateString()}
                </span>
              </div>
              {note.content && (
                <p className="text-xs text-soft-slate leading-relaxed font-light">
                  {note.content}
                </p>
              )}
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(tag === filterTag ? '' : tag)}
                      className="px-2 py-0.5 bg-white/5 text-[9px] font-mono text-soft-slate/60 hover:text-electric-blue transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-6 border-t border-white/10">
        <p className="text-[10px] font-mono text-soft-slate/60 leading-relaxed text-center">
          Notes are stored locally. No data is synced or shared.
        </p>
      </div>
    </div>
  );
};

export default Notes;
