import { faqs } from '../config/content';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';
export function FAQ() {
  return (
    <section id="faq" className="section faq-section reveal" aria-labelledby="faq-title">
      <div>
        <SectionHeading number="06" label="BEFORE YOU LOOK UP" id="faq-title">
          A few earthly
          <br />
          <em>questions.</em>
        </SectionHeading>
        <p className="section-copy">New to stargazing? You’re in good company.</p>
        <a className="text-link" href="mailto:astronomy@vit.ac.in">
          Ask us anything <Icon name="diagonal" />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <details key={faq.question}>
            <summary>
              <span className="faq-number">0{i + 1}</span>
              {faq.question}
              <Icon name="plus" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
