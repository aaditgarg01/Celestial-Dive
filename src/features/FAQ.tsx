import { useRef, useState, type KeyboardEvent } from 'react';
import { faqs } from '../config/content';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

const starPositions = [
  { left: '15.7%', top: '66.5%' },
  { left: '34.3%', top: '42.9%' },
  { left: '48.7%', top: '50.6%' },
  { left: '61.5%', top: '24.1%' },
  { left: '76.1%', top: '55.3%' },
  { left: '85.7%', top: '37.6%' },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const starButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeFaq = faqs[activeIndex];
  const questionNumber = String(activeIndex + 1).padStart(2, '0');
  const totalQuestions = String(faqs.length).padStart(2, '0');

  function stepQuestion(direction: number) {
    setActiveIndex((index) => (index + direction + faqs.length) % faqs.length);
  }

  function handleStarKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? -1
          : 0;

    if (direction === 0) return;

    event.preventDefault();
    const nextIndex = (index + direction + faqs.length) % faqs.length;
    setActiveIndex(nextIndex);
    starButtons.current[nextIndex]?.focus();
  }

  return (
    <section id="faq" className="section faq-section reveal" aria-labelledby="faq-title">
      <div className="faq-intro">
        <SectionHeading number="06" label="BEFORE YOU LOOK UP" id="faq-title">
          New to stargazing?
          <br />
          <em>Start here.</em>
        </SectionHeading>
        <p className="section-copy">
          Six quick answers about what to expect at Celestial Dive 5.0, from first-time observing to
          event updates.
        </p>
        <a className="faq-contact-card" href="mailto:astronomy@vit.ac.in">
          <span className="faq-contact-icon">
            <Icon name="mail" />
          </span>
          <span className="faq-contact-copy">
            <span>STILL HAVE A QUESTION?</span>
            <strong>Ask VIT Stellar</strong>
            <small>astronomy@vit.ac.in</small>
          </span>
          <Icon name="diagonal" />
        </a>
        <div
          className="faq-constellation"
          role="group"
          aria-label="Choose a question from the star map"
        >
          <div className="faq-map">
            <svg viewBox="0 0 460 170" aria-hidden="true">
              <defs>
                <radialGradient id="faq-nebula">
                  <stop offset="0" stopColor="#dfbd91" stopOpacity=".2" />
                  <stop offset="1" stopColor="#dfbd91" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse className="faq-orbit faq-orbit-one" cx="232" cy="86" rx="154" ry="54" />
              <ellipse className="faq-orbit faq-orbit-two" cx="232" cy="86" rx="154" ry="54" />
              <circle cx="232" cy="86" r="53" fill="url(#faq-nebula)" />
              <path className="faq-star-map" d="m72 113 86-40 66 13 59-45 67 53 44-30" />
              <circle className="faq-map-star faq-map-star-one" cx="72" cy="113" r="3.4" />
              <circle className="faq-map-star faq-map-star-two" cx="158" cy="73" r="4.1" />
              <circle className="faq-map-star faq-map-star-three" cx="224" cy="86" r="3" />
              <circle className="faq-map-star faq-map-star-four" cx="283" cy="41" r="4.5" />
              <circle className="faq-map-star faq-map-star-five" cx="350" cy="94" r="3.2" />
              <circle className="faq-map-star faq-map-star-six" cx="394" cy="64" r="4" />
              <circle className="faq-orbiting-star" cx="89" cy="45" r="2" />
              <circle className="faq-orbiting-star" cx="365" cy="139" r="1.7" />
              <path className="faq-cross-star" d="M322 119v12m-6-6h12M121 31v9m-4.5-4.5h9" />
            </svg>
            {faqs.map((faq, index) => (
              <button
                key={faq.question}
                type="button"
                className={`faq-star-control${index === activeIndex ? ' is-active' : ''}`}
                style={starPositions[index]}
                ref={(element) => {
                  starButtons.current[index] = element;
                }}
                tabIndex={index === activeIndex ? 0 : -1}
                aria-label={`Question ${index + 1}: ${faq.question}`}
                aria-pressed={index === activeIndex}
                aria-controls="faq-answer"
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleStarKeyDown(event, index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <p className="faq-constellation-caption">PICK A STAR OR USE THE ARROW KEYS</p>
        </div>
      </div>

      <div className="faq-display">
        <div className="faq-list-header">
          <span className="faq-list-label">QUICK ANSWERS</span>
          <span className="faq-list-count">
            {totalQuestions} TOPICS <span aria-hidden="true">✦</span>
          </span>
        </div>
        <article
          id="faq-answer"
          key={activeIndex}
          className="faq-answer"
          data-step={questionNumber}
          aria-live="polite"
        >
          <div className="faq-answer-meta">
            <span>
              TRANSMISSION {questionNumber} / {totalQuestions}
            </span>
            <span className="faq-signal">
              <i /> SIGNAL RECEIVED
            </span>
          </div>
          <h3>{activeFaq.question}</h3>
          <p>{activeFaq.answer}</p>
          <div className="faq-answer-coordinate" aria-hidden="true">
            <span>VIT STELLAR</span>
            <span>CELESTIAL DIVE · 5.0</span>
          </div>
        </article>
        <div className="faq-navigation">
          <button type="button" onClick={() => stepQuestion(-1)} aria-label="Previous question">
            <Icon name="arrow" />
            <span>PREVIOUS</span>
          </button>
          <div className="faq-progress" aria-hidden="true">
            <span style={{ width: `${((activeIndex + 1) / faqs.length) * 100}%` }} />
          </div>
          <button type="button" onClick={() => stepQuestion(1)} aria-label="Next question">
            <span>NEXT</span>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
