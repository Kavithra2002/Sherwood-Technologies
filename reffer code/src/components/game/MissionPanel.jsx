import React, { useState, useEffect } from 'react'

function MissionPanel({ missions, onMissionUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter out hidden missions before rendering stats and list
  const visibleMissions = missions.filter(m => !m.isHidden)

  const completedCount = visibleMissions.filter(m => m.completed).length
  const totalCount = visibleMissions.length
  const progressPercent = (completedCount / totalCount) * 100

  // Test case
  useEffect(() => {
    if (completedCount > 0) {
      console.log(`Test Pass: Mission completed (${completedCount}/${totalCount})`);
    }
  }, [completedCount, totalCount]);

  return (
    <div className={`mission-panel ${isExpanded ? 'expanded' : ''}`}>
      {/* Header - Always visible */}
      <div className="mission-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="mission-header-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span className="mission-title">Missions</span>
        </div>
        <div className="mission-header-right">
          <span className="mission-progress-text">{completedCount}/{totalCount}</span>
          <svg
            className={`mission-chevron ${isExpanded ? 'rotated' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Progress Bar - Always visible */}
      <div className="mission-progress-bar">
        <div
          className="mission-progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Mission List - Expandable */}
      {isExpanded && (
        <div className="mission-list">
          {visibleMissions.map((mission) => (
            <div
              key={mission.id}
              className={`mission-item ${mission.completed ? 'completed' : ''}`}
            >
              <div className="mission-checkbox">
                {mission.completed ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <div className="mission-checkbox-empty"></div>
                )}
              </div>
              <div className="mission-info">
                <span className="mission-item-title">{mission.title}</span>
                <span className="mission-item-desc">{mission.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MissionPanel