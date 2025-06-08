import './TestExecutionSlide.scss';

const TestExecutionSlide = () => {
  return (
    <div className="test-execution-slide">
      {/* The correct header, at the top of the page */}
      <div className="slide-header">
        <h1 className="slide-title">П Р О В Е Д Е Н И Е&nbsp;&nbsp;Т Е С Т О В</h1>
        <p className="slide-subtitle">Методология и контроль качества</p>
      </div>

      {/* The main content area, separate from the header */}
      <div className="content-container">
        <div className="main-grid">
          {/* Left container with flexbox column (like reference) */}
          <div className="left-container">
            {/* Rectangle #1 (Protocol Section) */}
            <div className="rectangle-1">
              <h3>Rectangle #1</h3>
              <p>This is where the Protocol section will go</p>
              <p>Green background, flexbox column layout</p>
            </div>
            
            {/* Rectangle #2 (63 card) */}
            <div className="rectangle-2">
              <h3>Rectangle #2</h3>
              <p>63 card will go here</p>
              <p>Purple background</p>
            </div>
          </div>

          {/* Right container for L-shapes (like reference) */}
          <div className="right-container">
            {/* L-shaped element (Stats section) */}
            <div className="l-shape-1">
              <h3>L-Shape #1</h3>
              <p>Stats section with clip-path</p>
              <p>Blue background</p>
            </div>
            
            {/* Orange rectangle (Metrics card) */}
            <div className="vertical-rectangle">
              <h3>Orange Rectangle</h3>
              <p>Metrics card will go here</p>
              <p>Takes remaining width</p>
            </div>
            
            {/* Brown rectangle (189 card) */}
            <div className="brown-rectangle">
              <h3>Brown Rectangle</h3>
              <p>189 card will go here</p>
              <p>Bottom-left position</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionSlide; 