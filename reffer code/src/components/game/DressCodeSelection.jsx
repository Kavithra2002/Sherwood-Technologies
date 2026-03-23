import React, { useState, useEffect, useRef } from 'react';
import '../../styles/game-dresscode.css';
import AvatarPreview from './AvatarPreview';
import { AvatarItemThumbnail } from './AvatarPreview';

// ==========================================
// 1. MALE SVGS
// ==========================================

// Tops
const LongSleeveShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_1" />;
const TShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_2" />;
const FormalShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_3" />;
const PoloShirt = () => <AvatarItemThumbnail type="top" itemId="m_top_4" />;
const SleevelessTop = () => <AvatarItemThumbnail type="top" itemId="m_top_5" />;
const TankTop = () => <AvatarItemThumbnail type="top" itemId="m_top_6" />;

// Bottoms
const RippedJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_1" />;
const RegularJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_2" />;
const CargoPants = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_3" />;
const BeachShorts = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_4" />;
const SportsCapri = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_5" />;
const ClassicFitJeans = () => <AvatarItemThumbnail type="bottom" itemId="m_bot_6" />;
// Footwear
const Sneakers = () => <AvatarItemThumbnail type="footwear" itemId="m_foot_1" />;
const FormalShoes = () => <AvatarItemThumbnail type="footwear" itemId="m_foot_2" />;
const Crocs = () => <AvatarItemThumbnail type="footwear" itemId="m_foot_3" />;
const FlipFlops = () => <AvatarItemThumbnail type="footwear" itemId="m_foot_4" />;
// ==========================================
// 2. FEMALE SVGS
// ==========================================

const FrockTop = () => <AvatarItemThumbnail type="top" itemId="f_top_1" />;
const FemaleSleeveless = () => <AvatarItemThumbnail type="top" itemId="f_top_3" />;
const OffShoulder = () => <AvatarItemThumbnail type="top" itemId="f_top_4" />;
const FemaleTShirt = () => <AvatarItemThumbnail type="top" itemId="f_top_5" />;
const CropTop = () => <AvatarItemThumbnail type="top" itemId="f_top_6" />;
const FormalTrousers = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_1" />;
const LongDress = () => <AvatarItemThumbnail type="top" itemId="f_top_7" />;
const FemaleJeans = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_3" />;
const ShortSkirt = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_4" />;
const DenimShorts = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_5" />;
const HighTornJeans = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_6" />;
const LongSkirt = () => <AvatarItemThumbnail type="bottom" itemId="f_bot_7" />;

const ClosedHeels = () => <AvatarItemThumbnail type="footwear" itemId="f_foot_1" />;
const FemaleSneakers = () => <AvatarItemThumbnail type="footwear" itemId="f_foot_2" />;
const FemaleSlippers = () => <AvatarItemThumbnail type="footwear" itemId="f_foot_3" />;
const AnimalSlippers = () => <AvatarItemThumbnail type="footwear" itemId="f_foot_4" />;

// ==========================================
// DATA MAPPING
// ==========================================

const MALE_DATA = {
  tops: [
    { id: 'm_top_1', label: 'long sleeve shirt', Comp: LongSleeveShirt },
    { id: 'm_top_2', label: 't shirt', Comp: TShirt },
    { id: 'm_top_3', label: 'formal shirt', Comp: FormalShirt },
    { id: 'm_top_4', label: 'polo t shirt', Comp: PoloShirt }, 
    { id: 'm_top_5', label: 'sleeveless top', Comp: SleevelessTop },
    { id: 'm_top_6', label: 'tank top', Comp: TankTop }
  ],
  bottoms: [
    { id: 'm_bot_1', label: 'ripped jeans', Comp: RippedJeans },
    { id: 'm_bot_2', label: 'regular jeans', Comp: RegularJeans },
    { id: 'm_bot_3', label: 'cargo jeans', Comp: CargoPants },
    { id: 'm_bot_4', label: 'beach shorts', Comp: BeachShorts },
    { id: 'm_bot_5', label: 'shorts', Comp: SportsCapri },
    { id: 'm_bot_6', label: 'classic jeans', Comp: ClassicFitJeans }
  ],
  footwear: [
    { id: 'm_foot_1', label: 'sneakers', Comp: Sneakers },
    { id: 'm_foot_2', label: 'formal shoes', Comp: FormalShoes },
    { id: 'm_foot_3', label: 'crocs', Comp: Crocs },
    { id: 'm_foot_4', label: 'flip flops', Comp: FlipFlops }
  ]
};

const FEMALE_DATA = {
  tops: [
    { id: 'f_top_1', label: 'frock', Comp: FrockTop },
    { id: 'f_top_3', label: 'sleeveless top', Comp: FemaleSleeveless },
    { id: 'f_top_4', label: 'off shoulder top', Comp: OffShoulder }, 
    { id: 'f_top_5', label: 't shirt', Comp: FemaleTShirt },
    { id: 'f_top_6', label: 'crop top', Comp: CropTop },
    { id: 'f_top_7', label: 'long dress', Comp: LongDress }
  ],
  bottoms: [
    { id: 'f_bot_1', label: 'formal trousers', Comp: FormalTrousers },
    { id: 'f_bot_3', label: 'regular jeans', Comp: FemaleJeans },
    { id: 'f_bot_4', label: 'short skirt', Comp: ShortSkirt },
    { id: 'f_bot_5', label: 'denim shorts', Comp: DenimShorts },
    { id: 'f_bot_6', label: 'high torn jeans', Comp: HighTornJeans },
    { id: 'f_bot_7', label: 'long skirt', Comp: LongSkirt }
  ],
  footwear: [
    { id: 'f_foot_1', label: 'closed heels', Comp: ClosedHeels },
    { id: 'f_foot_2', label: 'sneakers', Comp: FemaleSneakers },
    { id: 'f_foot_3', label: 'slippers', Comp: FemaleSlippers },
    { id: 'f_foot_4', label: 'animal slippers', Comp: AnimalSlippers }
  ]
};

// --- VALIDATION RULES ---
const dressRules = {
  male: {
    tops: {
      'm_top_5': { message: "Sleeveless tops are not allowed. Shoulders must be covered.", suggestion: "Try: T-Shirt, Polo Shirt, Long Sleeve Shirt" },
      'm_top_6': { message: "Tank tops are not allowed. Wear a proper shirt or t-shirt.", suggestion: "Try: T-Shirt, Polo Shirt, Formal Shirt" }
    },
    bottoms: {
      'm_bot_1': { message: "Ripped jeans are not allowed. Clothing must not be torn.", suggestion: "Try: Regular Jeans, Cargo Pants, Classic Jeans" },
      'm_bot_4': { message: "Beach shorts are not allowed. Wear full-length trousers.", suggestion: "Try: Regular Jeans, Cargo Pants, Classic Jeans" },
      'm_bot_5': { message: "Shorts are not allowed. Wear full-length pants.", suggestion: "Try: Regular Jeans, Classic Jeans" }
    },
    footwear: {
      'm_foot_3': { message: "Crocs are too casual for university dress code. Please wear appropriate closed footwear.", suggestion: "Try: Sneakers, Formal Shoes" },
      'm_foot_4': { message: "Flip flops are strictly prohibited on campus. Appropriate closed footwear is required.", suggestion: "Try: Sneakers, Formal Shoes" }
    }
  },
  female: {
    tops: {
      'f_top_3': { message: "Sleeveless tops are not allowed. Shoulders must be covered.", suggestion: "Try: Frock, T Shirt, Long Dress" },
      'f_top_4': { message: "Off-shoulder tops are not allowed. Shoulders must be covered.", suggestion: "Try: Frock, T Shirt, Long Dress" },
      'f_top_6': { message: "Crop tops are not allowed. Midriff must be covered.", suggestion: "Try: Frock, T Shirt, Long Dress" }
    },
    bottoms: {
      'f_bot_4': { message: "Short skirts are not allowed. Skirts or shorts must be knee-length or longer.", suggestion: "Try: Formal Trouser, Regular Jeans, Long Skirt" },
      'f_bot_5': { message: "Denim shorts are not allowed. Wear full-length or knee-length pants/skirts.", suggestion: "Try: Formal Trouser, Regular Jeans, Long Skirt" },
      'f_bot_6': { message: "High torn jeans are not allowed. Clothing must not be torn.", suggestion: "Try: Formal Trouser, Regular Jeans, Long Skirt" }
    },
    footwear: {
      'f_foot_3': { message: "Slippers are not allowed. Closed or formal footwear is preferred.", suggestion: "Try: Sneakers, Closed Heels" },
      'f_foot_4': { message: "Animal stuffed slippers are not allowed on campus.", suggestion: "Try: Sneakers, Closed Heels" }
    }
  }
};

// --- FULL BODY LOGIC ---
const FULL_BODY_TOPS = ['f_top_1', 'f_top_7']; // Frock, Long Dress

const validateOutfit = (gender, selectedOutfit) => {
  let errors = [];
  const rules = dressRules[gender];
  const currentData = gender === 'male' ? MALE_DATA : FEMALE_DATA;

  // check top
  if (selectedOutfit.top && rules.tops[selectedOutfit.top]) {
    const itemLabel = currentData.tops.find(t => t.id === selectedOutfit.top)?.label || selectedOutfit.top;
    errors.push({
      type: "Top",
      item: itemLabel,
      message: rules.tops[selectedOutfit.top].message,
      suggestion: rules.tops[selectedOutfit.top].suggestion
    });
  }

  // check bottom
  if (selectedOutfit.bottom && rules.bottoms[selectedOutfit.bottom]) {
    const itemLabel = currentData.bottoms.find(b => b.id === selectedOutfit.bottom)?.label || selectedOutfit.bottom;
    errors.push({
      type: "Bottom",
      item: itemLabel,
      message: rules.bottoms[selectedOutfit.bottom].message,
      suggestion: rules.bottoms[selectedOutfit.bottom].suggestion
    });
  }

  // check footwear
  if (selectedOutfit.footwear && rules.footwear[selectedOutfit.footwear]) {
    const itemLabel = currentData.footwear.find(f => f.id === selectedOutfit.footwear)?.label || selectedOutfit.footwear;
    errors.push({
      type: "Footwear",
      item: itemLabel,
      message: rules.footwear[selectedOutfit.footwear].message,
      suggestion: rules.footwear[selectedOutfit.footwear].suggestion
    });
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors: errors
    };
  }
  
  return { isValid: true, errors: [] };
};

const DressCodeSelection = ({ onComplete, isMuted, onToggleMute }) => {
  const [gender, setGender] = useState('male');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState([]);
  
  const selectSoundRef = useRef(null);
  const errorSoundRef = useRef(null);

  useEffect(() => {
    selectSoundRef.current = new Audio('/audio/dress-select.mp3');
    selectSoundRef.current.volume = 0.5;
    selectSoundRef.current.load();

    errorSoundRef.current = new Audio('/audio/error.mp3');
    errorSoundRef.current.volume = 0.5;
    errorSoundRef.current.load();
  }, []);

  // Selection state structured by gender
  const [selections, setSelections] = useState({
    male: {
      top: 'm_top_2',
      bottom: 'm_bot_2',
      footwear: 'm_foot_1'
    },
    female: {
      top: 'f_top_1',
      bottom: 'f_bot_1',
      footwear: 'f_foot_1'
    }
  });

  const handleGenderSwitch = (newGender) => {
    if (gender === newGender) return;
    
    if (selectSoundRef.current && !isMuted) {
      selectSoundRef.current.currentTime = 0;
      selectSoundRef.current.play().catch(() => {});
    }

    setIsTransitioning(true);
    
    setTimeout(() => {
      setGender(newGender);
      // Reset selections to first item for new gender
      setSelections(prev => ({
        ...prev,
        [newGender]: {
          top: newGender === 'male' ? 'm_top_1' : 'f_top_1',
          bottom: newGender === 'male' ? 'm_bot_1' : 'f_bot_1',
          footwear: newGender === 'male' ? 'm_foot_1' : 'f_foot_1'
        }
      }));
      setIsTransitioning(false);
    }, 400);
  };

  const handleSelect = (category, id) => {
    if (selectSoundRef.current && !isMuted) {
      selectSoundRef.current.currentTime = 0;
      selectSoundRef.current.play().catch(() => {});
    }

    // Check if selecting a bottom while a full-body outfit is active
    if (category === 'bottom' && gender === 'female' && FULL_BODY_TOPS.includes(selections.female.top)) {
      setWarningMessage([{
        type: "Selection",
        item: "Bottoms",
        message: "You cannot select a bottom with a frock or long dress.",
        suggestion: "Change your top first to wear bottoms."
      }]);
      setShowWarning(true);
      return; 
    }

    setSelections(prev => {
      const nextState = { 
        ...prev,
        [gender]: { ...prev[gender], [category]: id }
      };

      // Dependency resolution
      if (gender === 'female' && category === 'top') {
        if (FULL_BODY_TOPS.includes(id)) {
          nextState.female.bottom = null; // Clear bottom when full body top selected
        } else if (!FULL_BODY_TOPS.includes(id) && nextState.female.bottom === null) {
          nextState.female.bottom = 'f_bot_1'; // Re-establish default bottom when switching to normal top
        }
      }

      return nextState;
    });
  };

  const handleNextClick = () => {
    const activeSelections = selections[gender];
    const finalConfig = {
      gender,
      top: activeSelections.top,
      bottom: activeSelections.bottom,
      footwear: activeSelections.footwear
    };

    // Run Validation
    const validationResult = validateOutfit(gender, activeSelections);
    
    if (!validationResult.isValid) {
      if (errorSoundRef.current && !isMuted) {
        errorSoundRef.current.currentTime = 0;
        errorSoundRef.current.play().catch(() => {});
      }
      setWarningMessage(validationResult.errors);
      setShowWarning(true);
      return; // Stop navigation
    }

    // Show success popup instead of immediately continuing
    if (selectSoundRef.current && !isMuted) {
      selectSoundRef.current.currentTime = 0;
      selectSoundRef.current.play().catch(() => {});
    }
    setShowSuccess(true);
  };

  const currentData = gender === 'male' ? MALE_DATA : FEMALE_DATA;
  const activeSelections = selections[gender];

  const SelectedTop = currentData.tops.find(t => t.id === activeSelections.top)?.Comp || (() => null);
  const SelectedBottom = currentData.bottoms.find(b => b.id === activeSelections.bottom)?.Comp || (() => null);
  const SelectedFootwear = currentData.footwear.find(f => f.id === activeSelections.footwear)?.Comp || (() => null);

  const getBottomGridClass = () => {
    return 'grid-3x2';
  };

  const isBottomsDisabled = gender === 'female' && FULL_BODY_TOPS.includes(activeSelections.top);

  return (
    <div className="dresscode-container">
      {/* Animated Sky Background */}
      <div className="dc-background"></div>
      <div className="dc-gradient"></div>
      
      {/* Light Rays */}
      <div className="dc-rays">
        <div className="dc-ray dc-ray-1"></div>
        <div className="dc-ray dc-ray-2"></div>
        <div className="dc-ray dc-ray-3"></div>
        <div className="dc-ray dc-ray-4"></div>
        <div className="dc-ray dc-ray-5"></div>
      </div>

      {/* Clouds */}
      <div className="dc-clouds">
        <div className="dc-cloud dc-cloud-1">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
          <div className="dc-cloud-puff dc-puff-4"></div>
        </div>
        <div className="dc-cloud dc-cloud-2">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
          <div className="dc-cloud-puff dc-puff-4"></div>
        </div>
        <div className="dc-cloud dc-cloud-3">
          <div className="dc-cloud-puff dc-puff-1"></div>
          <div className="dc-cloud-puff dc-puff-2"></div>
          <div className="dc-cloud-puff dc-puff-3"></div>
        </div>
      </div>

      {/* CORNER MUTE BUTTON */}
      <button className="mute-btn-corner" onClick={onToggleMute} title={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>

      <h1 className="title">University Dress Code — {gender === 'male' ? 'Male' : 'Female'}</h1>

      <div className={`main-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        
        {/* LEFT SIDE: Grids */}
        <div className="left-panels">
          <div className="top-row">
            
            {/* TOPS PANEL */}
            <div className="panel">
              <h3 className="panel-title">{gender === 'male' ? "Men's Tops" : "Women's Tops"}</h3>
              <div className="grid-3x2">
                {currentData.tops.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${activeSelections.top === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('top', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    <p className="item-label">{item.label}</p>
                    {activeSelections.top === item.id && (
                      <div className="check-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOMS PANEL */}
            <div className={`panel ${isBottomsDisabled ? 'disabled-panel' : ''}`}>
              <h3 className="panel-title">{gender === 'male' ? "Men's Bottoms" : "Women's Bottoms"}</h3>
              {isBottomsDisabled && (
                <p className="helper-text">Frock or long dress already covers full outfit. Bottom selection is not required.</p>
              )}
              <div className={getBottomGridClass()}>
                {currentData.bottoms.map(item => (
                  <div 
                    key={item.id} 
                    className={`card ${activeSelections.bottom === item.id ? 'active' : ''}`}
                    onClick={() => handleSelect('bottom', item.id)}
                  >
                    <div className="card-inner">
                      <item.Comp />
                    </div>
                    <p className="item-label">{item.label}</p>
                    {activeSelections.bottom === item.id && (
                      <div className="check-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* FOOTWEAR PANEL */}
          <div className="panel panel-bottom">
            <h3 className="panel-title">{gender === 'male' ? "Men's Footwear" : "Women's Footwear"}</h3>
            <div className="grid-3x1">
              {currentData.footwear.map(item => (
                <div 
                  key={item.id} 
                  className={`card ${activeSelections.footwear === item.id ? 'active' : ''}`}
                  onClick={() => handleSelect('footwear', item.id)}
                >
                  <div className="card-inner">
                    <item.Comp />
                  </div>
                  <p className="item-label">{item.label}</p>
                  {activeSelections.footwear === item.id && (
                    <div className="check-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Preview pane */}
        <div className="preview-panel">
          
          <div className="toggle-container">
            <div className="toggle-bg">
              <div 
                className={`toggle-option ${gender === 'male' ? 'active' : ''}`}
                onClick={() => handleGenderSwitch('male')}
              >
                Male
              </div>
              <div 
                className={`toggle-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => handleGenderSwitch('female')}
              >
                Female
              </div>
            </div>
          </div>

          <div className="avatar-wrapper">
            <AvatarPreview 
              gender={gender} 
              topItem={activeSelections.top} 
              bottomItem={activeSelections.bottom} 
              footwearItem={activeSelections.footwear} 
            />
          </div>

          <p className="preview-text">Preview</p>
          
          <div className="mini-thumbnails">
            <div className="thumbnail"><SelectedTop /></div>
            <div className="thumbnail">
              {activeSelections.bottom ? <SelectedBottom /> : null}
            </div>
            <div className="thumbnail"><SelectedFootwear /></div>
          </div>

        </div>

      </div>

      <button className="next-btn" onClick={handleNextClick}>NEXT</button>

      {/* Validation Warning Modal */}
      {showWarning && (
        <div className="validation-modal-overlay">
          <div className="validation-modal">
            <div className="validation-modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="validation-modal-title">Dress Code Violation</h2>
            <div className="validation-modal-message">
              <p style={{ fontWeight: '700', color: '#fff', marginBottom: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                You selected a not allowed dresscode. Please try again!
              </p>
              {Array.isArray(warningMessage) ? (
                <div className="validation-error-list">
                  {warningMessage.map((err, idx) => (
                    <div key={idx} className="validation-error-item">
                      <div className="validation-error-title">{err.type} Issue: {err.item.toUpperCase()}</div>
                      <div className="validation-error-desc">{err.message}</div>
                      {err.suggestion && (
                        <div className="validation-error-suggestion">{err.suggestion}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{warningMessage}</p>
              )}
            </div>
            <button className="validation-modal-btn" onClick={() => setShowWarning(false)}>Try Again</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="validation-modal-overlay">
          <div className="validation-modal">
            <div className="validation-modal-icon" style={{ color: '#2ecc71' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="validation-modal-title" style={{ color: '#fff', textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)' }}>All Allowed!</h2>
            <div className="validation-modal-message">
              <p style={{ fontWeight: '700', color: '#fff', marginBottom: '12px', textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                Excellent choice! Your selected dresscode follows all university rules.
              </p>
              <p>You now have permission to continue to the game.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                className="validation-modal-btn" 
                onClick={() => {
                  if (selectSoundRef.current && !isMuted) {
                    selectSoundRef.current.currentTime = 0;
                    selectSoundRef.current.play().catch(() => {});
                  }
                  onComplete({
                    gender,
                    top: selections[gender].top,
                    bottom: selections[gender].bottom,
                    footwear: selections[gender].footwear
                  });
                }}
              >
                Continue to Game
              </button>
              <button 
                className="validation-modal-btn" 
                style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff', border: '2px solid rgba(255, 255, 255, 0.4)', boxShadow: 'none' }} 
                onClick={() => {
                  if (errorSoundRef.current && !isMuted) {
                    errorSoundRef.current.currentTime = 0;
                    errorSoundRef.current.play().catch(() => {});
                  }
                  setShowSuccess(false);
                }}
              >
                Back to Selection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default DressCodeSelection;
