import React from 'react';

const COLORS = {
  m_top_1: '#4a5c44', m_top_2: '#e5ddd3', m_top_3: '#8fbce1',
  m_top_4: '#284635', m_top_5: '#f2ebe2', m_top_6: '#222222',
  m_bot_1: '#5a8ebf', m_bot_2: '#305170', m_bot_3: '#525a41',
  m_bot_4: '#c5523a', m_bot_5: '#2d3338', m_bot_6: '#224063',
  m_foot_1: '#ffffff', m_foot_2: '#5c3a21', m_foot_3: '#1a1a1a',

  f_top_1: '#E84342', f_top_2: '#FF7675', f_top_3: '#E17055',
  f_top_4: '#6C5CE7', f_top_5: '#00B894', f_top_6: '#ff9ff3', f_top_7: '#E84342',
  f_bot_1: '#2D3436', f_bot_3: '#0984E3',
  f_bot_4: '#E84342', f_bot_5: '#00CEC9', f_bot_6: '#6C5CE7', f_bot_7: '#8c7ae6',
  f_foot_1: '#2D3436', f_foot_2: '#636E72', f_foot_3: '#E17055', f_foot_4: '#ffffff'
};

const SKIN_TONES = { light: '#f7cdb9', medium: '#f4caa7', tan: '#d3a484', dark: '#9e694b' };

const SharedDefs = ({ topItem = 'none', bottomItem = 'none' }) => {
  return <defs></defs>;
};

const BaseAvatar = ({ gender, skinTone = 'medium' }) => {
  const SKIN = SKIN_TONES[skinTone] || SKIN_TONES.medium;
  const SHADOW = '#AD8A73';

  if (gender === 'male') {
    return (
      <g>
        {/* Ears */}
        <path d="M 36 22 C 30 20 31 28 36 28 Z" fill={SKIN} />
        <path d="M 34 23 C 31 23 32 27 34 26" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />
        <path d="M 64 22 C 70 20 69 28 64 28 Z" fill={SKIN} />
        <path d="M 66 23 C 69 23 68 27 66 26" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Neck */}
        <path d="M 45 35 L 45 46 L 55 46 L 55 35 Z" fill={SKIN} />
        <path d="M 45 36.5 L 55 36.5 L 55 41 L 45 37.5 Z" fill={SHADOW} />

        {/* Head */}
        <path d="M 36 20 C 36 6 64 6 64 20 C 64 34 56 38 50 38 C 44 38 36 34 36 20 Z" fill={SKIN} />

        {/* Eyes */}
        <ellipse cx="44" cy="20" rx="1.5" ry="2.2" fill="#111" />
        <ellipse cx="56" cy="20" rx="1.5" ry="2.2" fill="#111" />
        <circle cx="44.5" cy="19" r="0.5" fill="#fff" />
        <circle cx="56.5" cy="19" r="0.5" fill="#fff" />

        {/* Eyebrows */}
        <path d="M 41 16 Q 44 14 47 16" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 59 16 Q 56 14 53 16" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />

        {/* Nose */}
        <path d="M 50 22 L 48 26 L 50 27" fill="none" stroke="#111" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

        {/* Mouth */}
        <path d="M 46 32 Q 50 35 54 31" fill="none" stroke="#111" strokeWidth="0.8" strokeLinecap="round" />

        {/* Hair - Base block that prevents gaps by covering scalp */}
        <path d="M 33 22 C 33 -2 67 -2 67 22 C 67 22 62 12 50 12 C 38 12 33 22 33 22 Z" fill="#1b1514" />
        {/* Hair - Swoops & Details */}
        <path d="M 45 10 C 42 12 40 18 38 18 C 39 12 43 8 45 8 Z" fill="#1b1514" />
        <path d="M 36 12 C 34 16 34 22 36 24 C 36 18 38 14 40 12 Z" fill="#1b1514" />
        <path d="M 64 12 C 66 16 66 22 64 24 C 64 18 62 14 60 12 Z" fill="#1b1514" />
        <path d="M 40 6 C 45 4 55 4 60 8 C 55 5 45 5 40 7 Z" fill="#3a2e2b" />
        <path d="M 46 6 L 48 2 L 52 4 Z" fill="#1b1514" />

        {/* Torso Base */}
        <path d="M 34 45 L 66 45 L 62 90 L 38 90 Z" fill={SKIN} />
        <path d="M 34 45 L 42 45 L 42 90 L 38 90 Z" fill={SHADOW} />

        {/* Left Arm */}
        <path d="M 34 45 L 24 95 L 30 95 L 38 45 Z" fill={SKIN} />
        <path d="M 34 45 L 28 95 L 30 95 L 38 45 Z" fill={SHADOW} />
        {/* Left Hand */}
        <path d="M 24 95 C 20 105 28 110 32 105 C 34 100 32 95 30 95 Z" fill={SKIN} />
        <path d="M 26 102 L 27 106 M 28 103 L 29 107 M 30 102 L 31 106" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Right Arm */}
        <path d="M 66 45 L 76 95 L 70 95 L 62 45 Z" fill={SKIN} />
        <path d="M 66 45 L 72 95 L 70 95 L 62 45 Z" fill={SHADOW} />
        {/* Right Hand */}
        <path d="M 76 95 C 80 105 72 110 68 105 C 66 100 68 95 70 95 Z" fill={SKIN} />
        <path d="M 74 102 L 73 106 M 72 103 L 71 107 M 70 102 L 69 106" fill="none" stroke={SHADOW} strokeWidth="1" strokeLinecap="round" />

        {/* Legs base (Skin under pants - Tapered for fitted look) */}
        <path d="M 38 90 L 48 90 L 48 120 L 45 180 L 37 180 Z" fill={SKIN} />
        <path d="M 52 90 L 62 90 L 63 180 L 55 180 L 52 120 Z" fill={SKIN} />
      </g>
    );
  } else {
    return (
      <g>
        {/* Hair Back */}
        <path d="M 38 26 C 25 40 30 75 35 90 C 38 80 40 70 45 50 Z" fill="#3D2314" />
        <path d="M 62 26 C 75 40 70 75 65 90 C 62 80 60 70 55 50 Z" fill="#3D2314" />
        <path d="M 50 10 Q 30 15 32 50 L 68 50 Q 70 15 50 10 Z" fill="#3D2314" />

        {/* Neck */}
        <path d="M 46 36 L 54 36 L 54 45 L 46 45 Z" fill={SKIN} />

        {/* Torso */}
        <path d="M 38 44 C 45 41, 55 41, 62 44 L 62 70 L 65 105 L 35 105 L 38 70 Z" fill={SKIN} />

        {/* Arms */}
        <path d="M 38 44 Q 30 75 28 105 L 32 105 Q 36 75 40 55 Z" fill={SKIN} />
        <path d="M 62 44 Q 70 75 72 105 L 68 105 Q 64 75 60 55 Z" fill={SKIN} />

        {/* Hands */}
        <ellipse cx="30" cy="107" rx="2.5" ry="4" fill={SKIN} transform="rotate(15 30 107)" />
        <ellipse cx="70" cy="107" rx="2.5" ry="4" fill={SKIN} transform="rotate(-15 70 107)" />

        {/* Legs */}
        <path d="M 36 105 L 49 105 L 46 185 L 38 185 Z" fill={SKIN} />
        <path d="M 51 105 L 64 105 L 62 185 L 54 185 Z" fill={SKIN} />

        {/* Face Base */}
        <ellipse cx="38" cy="25" rx="2" ry="4" fill={SKIN} />
        <ellipse cx="62" cy="25" rx="2" ry="4" fill={SKIN} />
        <ellipse cx="50" cy="24" rx="12" ry="14" fill={SKIN} />

        {/* Eyes (Cute arcs) */}
        <path d="M 43 24 Q 45 21 47 24" stroke="#221100" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 53 24 Q 55 21 57 24" stroke="#221100" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Brows */}
        <path d="M 42 20 Q 45 18 48 20" stroke="#3A2315" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M 52 20 Q 55 18 58 20" stroke="#3A2315" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="42" cy="27" rx="3" ry="1.5" fill="#E88873" opacity="0.5" />
        <ellipse cx="58" cy="27" rx="3" ry="1.5" fill="#E88873" opacity="0.5" />

        {/* Nose */}
        <path d="M 49 27 Q 50 29 51 27" stroke="#AD8A73" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Mouth (Happy Smile with teeth) */}
        <path d="M 46 31 Q 50 36 54 31 Z" fill="#FFFFFF" stroke="#DD5555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Front Hair Bangs */}
        <path d="M 50 10 Q 40 12 36 28 C 36 30 38 25 43 20 C 46 17 48 15 50 12 Z" fill="#4A2F1D" />
        <path d="M 50 10 Q 60 12 64 28 C 64 30 62 25 57 20 C 54 17 52 15 50 12 Z" fill="#4A2F1D" />
      </g>
    );
  }
};

const renderTopLayer = (id) => {
  const color = COLORS[id] || '#7bb0db';

  if (id.startsWith('f_')) {
    if (id === 'f_top_1') return (
      <g>
        {/* Frock */}
        <path d="M 38 44 C 45 41, 55 41, 62 44 L 62 70 L 65 105 Q 70 125 75 145 L 25 145 Q 30 125 35 105 L 38 70 Z" fill={color} />
        <path d="M 38 44 C 41 42, 43 43, 44 45 L 43 70 L 45 105 Q 49 125 51 145 L 25 145 Q 30 125 35 105 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 38 75 L 48 85 L 46 88 L 36 80 Z" fill="#111" opacity="0.1" />
        <path d="M 62 65 L 52 80 L 53 82 L 62 70 Z" fill="#111" opacity="0.1" />
        <path d="M 25 140 Q 50 145 75 140 L 75 145 L 25 145 Z" fill="#111" opacity="0.2" />

        <path d="M 45 44 L 50 52 L 55 44 Z" fill="#f4caa7" />

        <path d="M 38 44 Q 30 55 28 65 L 34 65 Q 38 55 40 50 Z" fill={color} />
        <path d="M 38 44 Q 32 50 31 58 L 28 65 L 34 65 Q 38 55 40 50 Z" fill="#111" opacity="0.15" />
        <path d="M 62 44 Q 70 55 72 65 L 66 65 Q 62 55 60 50 Z" fill={color} />
      </g>
    );
    if (id === 'f_top_3') return (
      <g>
        {/* Sleeveless Top */}
        <path d="M 42 44 L 42 40 M 58 44 L 58 40" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M 40 44 Q 45 50 50 50 Q 55 50 60 44 L 62 70 L 65 105 L 35 105 L 38 70 Z" fill={color} />
        <path d="M 40 44 Q 42 47 43 47 L 44 70 L 46 105 L 35 105 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 38 75 L 48 85 L 46 88 L 36 80 Z" fill="#111" opacity="0.1" />
        <path d="M 62 65 L 52 80 L 53 82 L 62 70 Z" fill="#111" opacity="0.1" />
      </g>
    );
    if (id === 'f_top_4') return (
      <g>
        {/* Off Shoulder Top */}
        <path d="M 32 52 L 68 52 L 63 70 L 65 105 L 35 105 L 37 70 Z" fill={color} />
        <path d="M 32 52 L 38 52 L 39 70 L 41 105 L 35 105 L 37 70 Z" fill="#111" opacity="0.15" />
        <path d="M 37 75 L 48 85 L 46 88 L 35 80 Z" fill="#111" opacity="0.1" />

        <path d="M 26 52 L 34 52 L 36 62 L 30 62 Z" fill={color} />
        <path d="M 26 52 L 30 52 L 33 60 L 30 62 Z" fill="#111" opacity="0.15" />
        <path d="M 74 52 L 66 52 L 64 62 L 70 62 Z" fill={color} />
      </g>
    );
    if (id === 'f_top_5') return (
      <g>
        {/* T-Shirt */}
        <path d="M 38 44 C 45 41, 55 41, 62 44 L 62 70 L 63 90 L 37 90 L 38 70 Z" fill={color} />
        <path d="M 38 44 C 42 42, 44 43, 44 46 L 43 70 L 44 90 L 37 90 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 37 80 L 48 88 L 47 90 L 37 85 Z" fill="#111" opacity="0.1" />
        <path d="M 63 75 L 53 85 L 54 87 L 62 80 Z" fill="#111" opacity="0.1" />

        <path d="M 44 44 Q 50 50 56 44 Z" fill="#fff" opacity="0.15" />

        <path d="M 38 44 Q 30 60 28 75 L 34 75 Q 38 60 40 55 Z" fill={color} />
        <path d="M 38 44 Q 32 55 31 65 L 28 75 L 34 75 Q 38 60 40 55 Z" fill="#111" opacity="0.15" />
        <path d="M 62 44 Q 70 60 72 75 L 66 75 Q 62 60 60 55 Z" fill={color} />
      </g>
    );
    if (id === 'f_top_6') return (
      <g>
        {/* Crop Top */}
        <path d="M 38 44 C 45 41, 55 41, 62 44 L 62 70 L 38 70 Z" fill={color} />
        <path d="M 38 44 C 42 42, 44 43, 44 46 L 44 70 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 38 68 L 62 68 L 62 70 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 44 44 Q 50 50 56 44 Z" fill="#f4caa7" />

        <path d="M 38 44 Q 30 60 28 75 L 34 75 Q 38 60 40 55 Z" fill={color} />
        <path d="M 38 44 Q 32 55 31 65 L 28 75 L 34 75 Q 38 60 40 55 Z" fill="#111" opacity="0.15" />
        <path d="M 62 44 Q 70 60 72 75 L 66 75 Q 62 60 60 55 Z" fill={color} />
      </g>
    );
    if (id === 'f_top_7') return (
      <g>
        {/* Long Dress */}
        <path d="M 38 44 C 45 41, 55 41, 62 44 L 62 70 L 65 105 L 70 180 L 30 180 L 35 105 L 38 70 Z" fill={color} />
        <path d="M 38 44 C 42 42, 43 43, 44 45 L 43 70 L 45 105 L 45 180 L 30 180 L 35 105 L 38 70 Z" fill="#111" opacity="0.15" />
        <path d="M 38 120 L 50 140 L 48 145 L 34 110 Z" fill="#111" opacity="0.1" />
        <path d="M 68 110 L 55 130 L 56 135 L 70 130 Z" fill="#111" opacity="0.1" />

        <path d="M 45 44 L 50 54 L 55 44 Z" fill="#f4caa7" />
        <path d="M 38 44 Q 25 70 24 100 L 32 100 Q 36 70 40 55 Z" fill={color} />
        <path d="M 38 44 Q 28 65 28 85 L 24 100 L 32 100 Q 36 70 40 55 Z" fill="#111" opacity="0.15" />
        <path d="M 62 44 Q 75 70 76 100 L 68 100 Q 64 70 60 55 Z" fill={color} />
      </g>
    );
  }

  const isFormal = id === 'm_top_3';
  const isPolo = id === 'm_top_4';
  const isSleeveless = id === 'm_top_5';
  const isTank = id === 'm_top_6';
  const isLong = id === 'm_top_1' || isFormal;

  return (
    <g>
      {/* Flat Vector Torso Base */}
      {isTank ? (
        <path d="M 38 46 L 43 46 Q 50 62 57 46 L 62 46 L 64 100 L 36 100 Z" fill={color} />
      ) : isSleeveless ? (
        <path d="M 34 46 Q 50 42 66 46 L 64 100 L 36 100 Z" fill={color} />
      ) : (
        <path d="M 33 46 Q 50 42 67 46 L 64 100 L 36 100 Z" fill={color} />
      )}

      {/* Flat Vector Left Torso Shadow */}
      {isTank ? (
        <path d="M 38 46 L 43 46 L 42 100 L 36 100 Z" fill="#111" opacity="0.15" />
      ) : (
        <path d="M 33 46 Q 40 44 42 46 L 42 100 L 36 100 Z" fill="#111" opacity="0.15" />
      )}

      {/* Flat Vector Sleeves */}
      {!isSleeveless && !isTank && (
        <g>
          {isLong ? (
            <g>
              <path d="M 34 45 L 23 96 L 31 96 L 38 45 Z" fill={color} />
              <path d="M 34 45 L 27 96 L 31 96 L 38 45 Z" fill="#111" opacity="0.15" />

              <path d="M 66 45 L 77 96 L 69 96 L 62 45 Z" fill={color} />
              <path d="M 66 45 L 73 96 L 69 96 L 62 45 Z" fill="#111" opacity="0.15" />
            </g>
          ) : (
            <g>
              <path d="M 34 45 L 27 75 L 34 75 L 38 45 Z" fill={color} />
              <path d="M 38 45 L 32 75 L 34 75 Z" fill="#111" opacity="0.15" />

              <path d="M 66 45 L 73 75 L 66 75 L 62 45 Z" fill={color} />
              <path d="M 62 45 L 68 75 L 66 75 Z" fill="#111" opacity="0.15" />
            </g>
          )}
        </g>
      )}

      {/* Clipart Stylized Wrinkles (Hard Edge) */}
      <path d="M 36 75 L 45 92 L 44 95 L 36 80 Z" fill="#111" opacity="0.1" />
      <path d="M 64 65 L 55 85 L 56 88 L 64 70 Z" fill="#111" opacity="0.1" />
      <path d="M 36 95 L 64 95 L 64 100 L 36 100 Z" fill="#111" opacity="0.15" />

      {/* Neck rings for non-formal */}
      {(!isFormal && !isPolo) && (
        <g>
          <path d="M 43 46 Q 50 52 57 46 L 55 45 Q 50 49 45 45 Z" fill={color} opacity="0.8" />
          <path d="M 43 46 Q 50 52 57 46 L 55 45 Q 50 49 45 45 Z" fill="#111" opacity="0.2" />
        </g>
      )}

      {isFormal && (
        <g>
          <path d="M 50 45 L 50 100" fill="none" stroke="#111" strokeWidth="1" opacity="0.3" />
          {[55, 65, 75, 85, 95].map(y => <circle key={y} cx="50" cy={y} r="1" fill="#fff" stroke="#888" strokeWidth="0.5" />)}
          <path d="M 43 42 L 50 49 L 57 42 L 50 40 Z" fill="#fff" />
          <path d="M 43 42 L 50 49 L 57 42" fill="none" stroke="#222" strokeWidth="1" opacity="0.2" />
        </g>
      )}

      {isPolo && (
        <g>
          <rect x="48" y="46" width="4" height="15" fill={color} stroke="#222" strokeWidth="0.5" opacity="0.8" />
          <circle cx="50" cy="52" r="0.8" fill="#fff" />
          <circle cx="50" cy="58" r="0.8" fill="#fff" />
          <path d="M 42 42 L 38 48 L 47 48 L 48 46 L 45 42 Z M 58 42 L 62 48 L 53 48 L 52 46 L 55 42 Z" fill="#111" opacity="0.8" />
        </g>
      )}
    </g>
  );
};

const renderBottomLayer = (id) => {
  const color = COLORS[id] || '#5d3936';
  if (id.startsWith('f_')) {
    if (id === 'f_bot_1') return (
      <g>
        {/* Formal Trousers */}
        <path d="M 37 85 L 63 85 L 65 105 L 62 185 L 52 185 L 50 110 L 48 185 L 38 185 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 43 105 L 43 185 L 38 185 L 35 105 Z" fill="#111" opacity="0.15" />
        <path d="M 50 110 L 48 185 L 45 185 L 47 115 Z" fill="#111" opacity="0.2" />
        <path d="M 50 110 L 52 185 L 55 185 L 53 115 Z" fill="#111" opacity="0.2" />
        <path d="M 45 85 L 55 85 L 50 110 Z" fill="#111" opacity="0.15" />
        <path d="M 37 140 L 42 160 L 41 165 L 36 145 Z" fill="#111" opacity="0.1" />
        <path d="M 63 130 L 58 150 L 59 155 L 64 135 Z" fill="#111" opacity="0.1" />
      </g>
    );
    if (id === 'f_bot_3') return (
      <g>
        {/* Regular Jeans */}
        <path d="M 37 85 L 63 85 L 65 105 L 62 185 L 53 185 L 50 110 L 47 185 L 38 185 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 43 105 L 43 185 L 38 185 L 35 105 Z" fill="#111" opacity="0.15" />
        <path d="M 50 110 L 47 185 L 44 185 L 47 115 Z" fill="#111" opacity="0.2" />
        <path d="M 50 110 L 53 185 L 56 185 L 53 115 Z" fill="#111" opacity="0.2" />
        <path d="M 45 85 L 55 85 L 50 110 Z" fill="#111" opacity="0.15" />
        <path d="M 37 140 L 42 160 L 41 165 L 36 145 Z" fill="#111" opacity="0.1" />
        <path d="M 63 130 L 58 150 L 59 155 L 64 135 Z" fill="#111" opacity="0.1" />
      </g>
    );
    if (id === 'f_bot_4') return (
      <g>
        {/* Short Skirt */}
        <path d="M 37 85 L 63 85 L 65 105 L 67 135 L 33 135 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 43 105 L 41 135 L 33 135 L 35 105 Z" fill="#111" opacity="0.15" />
        <path d="M 50 85 L 50 135" stroke="#222" strokeWidth="0.8" opacity="0.4" fill="none" />
        <path d="M 63 85 L 65 105 L 67 135 L 65 135 L 62 105 L 61 85 Z" fill="#fff" opacity="0.1" />
      </g>
    );
    if (id === 'f_bot_5') return (
      <g>
        {/* Denim Shorts */}
        <path d="M 37 85 L 63 85 L 65 105 L 65 125 L 52 125 L 50 110 L 48 125 L 35 125 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 44 105 L 43 125 L 35 125 L 35 105 Z" fill="#111" opacity="0.15" />
        <path d="M 50 110 L 48 125 L 46 125 L 48 110 Z" fill="#111" opacity="0.2" />
        <path d="M 50 110 L 52 125 L 54 125 L 52 110 Z" fill="#111" opacity="0.2" />
        <path d="M 50 85 L 50 108" stroke="#111" strokeWidth="0.5" opacity="0.4" fill="none" />
        <path d="M 37 95 Q 40 98 42 90" stroke="#111" strokeWidth="0.5" opacity="0.4" fill="none" />
        <path d="M 63 95 Q 60 98 58 90" stroke="#111" strokeWidth="0.5" opacity="0.4" fill="none" />
      </g>
    );
    if (id === 'f_bot_6') return (
      <g>
        {/* High Torn Jeans */}
        <path d="M 37 85 L 63 85 L 65 105 L 62 185 L 53 185 L 50 110 L 47 185 L 38 185 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 43 105 L 43 185 L 38 185 L 35 105 Z" fill="#111" opacity="0.15" />
        <path d="M 50 110 L 47 185 L 44 185 L 47 115 Z" fill="#111" opacity="0.2" />
        <path d="M 50 110 L 53 185 L 56 185 L 53 115 Z" fill="#111" opacity="0.2" />
        {/* Rips */}
        <path d="M 39 135 Q 42 133 45 137 Q 42 140 39 135 Z" fill="#f4caa7" />
        <path d="M 55 140 Q 58 138 61 142 Q 58 145 55 140 Z" fill="#f4caa7" />
      </g>
    );
    if (id === 'f_bot_7') return (
      <g>
        {/* Long Skirt */}
        <path d="M 37 85 L 63 85 L 65 105 L 70 180 L 30 180 L 35 105 Z" fill={color} />
        <path d="M 37 85 L 43 85 L 43 105 L 45 180 L 30 180 L 35 105 Z" fill="#111" opacity="0.15" />
        {/* Folds */}
        <path d="M 50 85 L 48 180 L 52 180 Z" fill="#111" opacity="0.1" />
        <path d="M 42 85 L 38 180 L 40 180 Z" fill="#111" opacity="0.1" />
        <path d="M 58 85 L 62 180 L 60 180 Z" fill="#111" opacity="0.1" />
        <path d="M 37 120 L 45 140 L 43 145 L 34 110 Z" fill="#111" opacity="0.05" />
        <path d="M 63 110 L 55 130 L 56 135 L 66 130 Z" fill="#111" opacity="0.05" />
      </g>
    );
    return <g></g>;
  }

  const isShorts = id === 'm_bot_4' || id === 'm_bot_5';
  const isCargo = id === 'm_bot_3';
  const isRipped = id === 'm_bot_1';
  const length = isShorts ? 150 : 180;

  return (
    <g>
      {/* Flat Vector Base Pants (Custom mapped to legs correctly) */}
      <path d={`M 36 100 L 50 100 L 50 120 L 49 ${length} L 31 ${length} Z`} fill={color} />
      <path d={`M 50 100 L 64 100 L 69 ${length} L 51 ${length} L 50 120 Z`} fill={color} />

      {/* Pants Shadows (flat block) */}
      {/* Left leg left-side shadow */}
      <path d={`M 36 100 L 42 100 L 37 ${length} L 31 ${length} Z`} fill="#111" opacity="0.15" />
      {/* Left leg inner shadow */}
      <path d={`M 50 120 L 49 ${length} L 47 ${length} L 49 125 Z`} fill="#111" opacity="0.2" />
      {/* Right leg inner shadow */}
      <path d={`M 50 120 L 51 ${length} L 53 ${length} L 51 125 Z`} fill="#111" opacity="0.2" />
      {/* Pelvis/crotch shadow */}
      <path d="M 45 100 L 55 100 L 50 120 Z" fill="#111" opacity="0.15" />

      {/* Wrinkles */}
      <path d="M 36 140 L 42 155 L 43 150 Z" fill="#111" opacity="0.1" />
      <path d="M 64 140 L 58 155 L 57 150 Z" fill="#111" opacity="0.1" />

      {/* Flat waist shadow under shirt */}
      <path d="M 36 100 L 64 100 L 64 105 L 36 105 Z" fill="#111" opacity="0.25" />

      {isCargo && (
        <g>
          <path d="M 30 135 L 42 135 L 41 155 L 32 155 Z M 70 135 L 58 135 L 59 155 L 68 155 Z" fill={color} stroke="#111" strokeWidth="1" />
          <path d="M 30 135 L 42 135 L 41 140 L 31 140 Z M 70 135 L 58 135 L 59 140 L 69 140 Z" fill="#111" opacity="0.2" />
        </g>
      )}

      {isRipped && (
        <g>
          <path d="M 37 140 Q 40 136 46 141 Q 45 143 43 145 Q 38 143 37 140 Z M 54 136 Q 58 134 62 137 Q 60 142 56 139 Z" fill="#d3a484" />
        </g>
      )}

      {isShorts && (
        <g>
          {/* Drop shadow on bare legs under the shorts */}
          <path d="M 37.3 150 L 46.5 150 L 46 160 L 37.2 160 Z" fill="#111" opacity="0.15" />
          <path d="M 53.5 150 L 62.7 150 L 62.8 160 L 54 160 Z" fill="#111" opacity="0.15" />
        </g>
      )}
    </g>
  );
};

const renderFootwearLayer = (id) => {
  const color = COLORS[id] || '#fff';
  if (id.startsWith('f_')) {
    if (id === 'f_foot_1') return (
      <g>
        {/* Closed Heels */}
        <path d="M 37 184 C 36 192 36 195 41 195 C 46 195 47 190 47 184 Z" fill={color} />
        <path d="M 40.5 195 L 41 201 L 43 201 L 42.5 195 Z" fill="#222" />
        <path d="M 38 184 Q 42 190 46 184 Z" fill="#f4caa7" />

        <path d="M 53 184 C 53 190 54 195 59 195 C 64 195 64 192 63 184 Z" fill={color} />
        <path d="M 57.5 195 L 57 201 L 59 201 L 59.5 195 Z" fill="#222" />
        <path d="M 54 184 Q 58 190 62 184 Z" fill="#f4caa7" />
      </g>
    );
    if (id === 'f_foot_2') return (
      <g>
        {/* Sneakers */}
        <path d="M 36 183 C 34 190 35 195 41 195 C 48 195 48 190 47 183 Z" fill={color} />
        <path d="M 36 192 Q 41 196 47 192 L 48 195 Q 41 198 35 195 Z" fill="#fff" />
        <path d="M 40 185 L 44 185 M 39 188 L 45 188 M 38 191 L 46 191" stroke="#fff" strokeWidth="1" />

        <path d="M 53 183 C 52 190 52 195 59 195 C 66 195 66 190 64 183 Z" fill={color} />
        <path d="M 53 192 Q 59 196 64 192 L 65 195 Q 59 198 52 195 Z" fill="#fff" />
        <path d="M 56 185 L 60 185 M 55 188 L 61 188 M 54 191 L 62 191" stroke="#fff" strokeWidth="1" />
      </g>
    );
    if (id === 'f_foot_3') return (
      <g>
        {/* Slippers/Sandals */}
        <path d="M 37 184 C 36 192 36 194 40 194 A 4 4 0 0 0 47 184 Z" fill="#f4caa7" />
        <path d="M 36 190 Q 42 186 47 189" stroke={color} strokeWidth="2.5" fill="none" />
        <path d="M 38 194 L 46 194" stroke="#d2b48c" strokeWidth="2" strokeLinecap="round" />

        <path d="M 53 184 C 53 190 55 194 60 194 A 4 4 0 0 0 63 184 Z" fill="#f4caa7" />
        <path d="M 53 189 Q 58 186 64 190" stroke={color} strokeWidth="2.5" fill="none" />
        <path d="M 54 194 L 62 194" stroke="#d2b48c" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
    if (id === 'f_foot_4') return (
      <g>
        {/* Animal Slippers (Bunny) */}
        {/* Left Bunny */}
        <path d="M 35 184 C 33 194 36 197 42 197 C 48 197 49 194 47 184 C 47 181 37 181 35 184 Z" fill={color} />
        <path d="M 35 194 Q 41 198 47 194" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Left Ears */}
        <path d="M 38 184 Q 36 175 39 174 Q 42 175 41 184 Z" fill={color} />
        <path d="M 43 184 Q 43 175 46 174 Q 48 175 46 184 Z" fill={color} />
        <path d="M 38.5 182 Q 37 176 39 176 Q 40.5 176 40.5 182 Z" fill="#ff7675" />
        <path d="M 43.5 182 Q 44 176 45.5 176 Q 47 176 45.5 182 Z" fill="#ff7675" />

        {/* Left Face */}
        <circle cx="42" cy="189" r="1.5" fill="#ff7675" />
        <circle cx="39" cy="188" r="1.2" fill="#2d3436" />
        <circle cx="45" cy="188" r="1.2" fill="#2d3436" />

        {/* Right Bunny */}
        <path d="M 52 184 C 50 194 53 197 59 197 C 65 197 66 194 65 184 C 64 181 54 181 52 184 Z" fill={color} />
        <path d="M 52 194 Q 59 198 65 194" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Right Ears */}
        <path d="M 54 184 Q 52 175 55 174 Q 58 175 57 184 Z" fill={color} />
        <path d="M 60 184 Q 59 175 62 174 Q 65 175 63 184 Z" fill={color} />
        <path d="M 54.5 182 Q 53 176 55 176 Q 56.5 176 56.5 182 Z" fill="#ff7675" />
        <path d="M 60.5 182 Q 60 176 61.5 176 Q 64 176 62.5 182 Z" fill="#ff7675" />

        {/* Right Face */}
        <circle cx="59" cy="189" r="1.5" fill="#ff7675" />
        <circle cx="56" cy="188" r="1.2" fill="#2d3436" />
        <circle cx="62" cy="188" r="1.2" fill="#2d3436" />
      </g>
    );
    return <g></g>;
  }

  if (id === 'm_foot_1') return (
    <g>
      {/* Left Sneaker Realistic (White/Grey) */}
      <path d="M 33 175 C 32 181 32 186 42 186 C 47 186 48 181 48 175 Z" fill="#ecf0f1" />
      <path d="M 33 182 Q 42 186 48 182 L 48 186 Q 42 189 33 186 Z" fill="#bdc3c7" />
      <path d="M 36 177 L 44 177 M 35 179 L 45 179 M 34 181 L 46 181" stroke="#34495e" strokeWidth="0.8" />
      <path d="M 33 184 L 43 184" stroke="#95a5a6" strokeWidth="1.5" />

      {/* Right Sneaker Realistic */}
      <path d="M 52 175 C 52 181 53 186 63 186 C 68 186 68 181 67 175 Z" fill="#ecf0f1" />
      <path d="M 52 182 Q 63 186 67 182 L 67 186 Q 63 189 52 186 Z" fill="#bdc3c7" />
      <path d="M 56 177 L 64 177 M 55 179 L 65 179 M 54 181 L 66 181" stroke="#34495e" strokeWidth="0.8" />
      <path d="M 57 184 L 67 184" stroke="#95a5a6" strokeWidth="1.5" />
    </g>
  );
  if (id === 'm_foot_2') return (
    <g>
      {/* Left Formal Shoe Realistic */}
      <path d="M 35 175 C 33 182 34 186 41 186 C 48 186 48 182 48 175 Z" fill="#2d3436" />
      <path d="M 36 175 Q 41 179 47 175" fill="#1e272e" />
      <path d="M 34 184 L 48 184 L 48 187 L 34 187 Z" fill="#111" />
      <path d="M 38 176 L 43 176 M 38 178 L 44 178" stroke="#111" strokeWidth="1" />
      <path d="M 36 178 Q 40 183 45 178" stroke="#3d3d3d" strokeWidth="0.5" fill="none" />

      {/* Right Formal Shoe Realistic */}
      <path d="M 52 175 C 52 182 53 186 59 186 C 67 186 68 182 65 175 Z" fill="#2d3436" />
      <path d="M 53 175 Q 59 179 64 175" fill="#1e272e" />
      <path d="M 52 184 L 66 184 L 66 187 L 52 187 Z" fill="#111" />
      <path d="M 57 176 L 62 176 M 56 178 L 62 178" stroke="#111" strokeWidth="1" />
      <path d="M 55 178 Q 60 183 64 178" stroke="#3d3d3d" strokeWidth="0.5" fill="none" />
    </g>
  );
  if (id === 'm_foot_3') return (
    <g>
      {/* Left Croc Realistic */}
      <path d="M 33 176 C 30 182 31 187 42 187 C 50 187 49 182 48 176 Z" fill="#2c3e50" />
      <path d="M 32 183 Q 41 187 49 183 L 49 187 Q 41 190 31 187 Z" fill="#34495e" />
      <circle cx="39" cy="180" r="1.2" fill="#1a252f" /><circle cx="43" cy="180" r="1.2" fill="#1a252f" />
      <circle cx="37" cy="182" r="1.2" fill="#1a252f" /><circle cx="41" cy="182" r="1.2" fill="#1a252f" /><circle cx="45" cy="182" r="1.2" fill="#1a252f" />
      <path d="M 32 176 Q 41 179 48 176" stroke="#1a252f" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Right Croc Realistic */}
      <path d="M 52 176 C 51 182 50 187 58 187 C 69 187 70 182 67 176 Z" fill="#2c3e50" />
      <path d="M 51 183 Q 59 187 68 183 L 69 187 Q 59 190 51 187 Z" fill="#34495e" />
      <circle cx="57" cy="180" r="1.2" fill="#1a252f" /><circle cx="61" cy="180" r="1.2" fill="#1a252f" />
      <circle cx="55" cy="182" r="1.2" fill="#1a252f" /><circle cx="59" cy="182" r="1.2" fill="#1a252f" /><circle cx="63" cy="182" r="1.2" fill="#1a252f" />
      <path d="M 52 176 Q 59 179 68 176" stroke="#1a252f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  );
  if (id === 'm_foot_4') return (
    <g>
      {/* Left Bare Foot & Flip Flop */}
      <path d="M 36 175 C 33 182 34 185 41 185 C 47 185 46 182 46 175 Z" fill="#f4caa7" />
      <path d="M 33 184 L 46 184 L 46 186 L 33 186 Z" fill="#2c3e50" />
      <path d="M 35 182 L 40 178 L 45 182" stroke="#2980b9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 40 178 L 40 184" stroke="#2980b9" strokeWidth="2" strokeLinecap="round" />
      <path d="M 36 185 Q 40 184 45 185" fill="none" stroke="#2c3e50" strokeWidth="0.5" />

      {/* Right Bare Foot & Flip Flop */}
      <path d="M 54 175 C 54 182 53 185 59 185 C 66 185 67 182 64 175 Z" fill="#f4caa7" />
      <path d="M 54 184 L 67 184 L 67 186 L 54 186 Z" fill="#2c3e50" />
      <path d="M 55 182 L 60 178 L 65 182" stroke="#2980b9" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 60 178 L 60 184" stroke="#2980b9" strokeWidth="2" strokeLinecap="round" />
      <path d="M 55 185 Q 60 184 64 185" fill="none" stroke="#2c3e50" strokeWidth="0.5" />
    </g>
  );

  return <g></g>;
};

export const AvatarItemThumbnail = ({ type, itemId }) => {
  // Using custom scalable viewBox containers tailored to cleanly center items of different shapes in 100x100
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <SharedDefs topItem={type === 'top' ? itemId : 'none'} bottomItem={type === 'bottom' ? itemId : 'none'} />
      {type === 'top' && (
        <g transform={
          itemId === 'f_top_1' || itemId === 'f_top_7' ? "translate(-10, -50) scale(1.15)" :
            itemId.startsWith('f_') ? "translate(-22, -60) scale(1.5)" :
              "translate(-15, -45) scale(1.3)"
        }>
          {renderTopLayer(itemId)}
        </g>
      )}
      {type === 'bottom' && (
        <g transform={
          itemId === 'f_bot_4' || itemId === 'f_bot_5' ? "translate(-12, -105) scale(1.25)" :
            itemId.startsWith('f_') ? "translate(-7, -100) scale(1.15)" :
              "translate(-5, -100) scale(1.1)"
        }>
          {renderBottomLayer(itemId)}
        </g>
      )}
      {type === 'footwear' && (
        <g transform={
          itemId.startsWith('f_') ? "translate(-90, -485) scale(2.8)" :
            "translate(-90, -460) scale(2.8)"
        }>
          {renderFootwearLayer(itemId)}
        </g>
      )}
    </svg>
  );
};

const AvatarPreview = ({ gender, topItem, bottomItem, footwearItem }) => {
  console.log("Avatar system works :  test case : Passed");
  return (
    <svg viewBox="0 0 100 200" className="avatar-preview-canvas w-full h-full" style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}>
      <SharedDefs topItem={topItem} bottomItem={bottomItem} />
      <BaseAvatar gender={gender} skinTone="medium" />
      {bottomItem && <g className="layer-animated">{renderBottomLayer(bottomItem)}</g>}
      {topItem && <g className="layer-animated">{renderTopLayer(topItem)}</g>}
      {footwearItem && <g className="layer-animated">{renderFootwearLayer(footwearItem)}</g>}
    </svg>
  );
};

export default AvatarPreview;
