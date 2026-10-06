"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/homepage";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="or-faq-list">
      {faqs.map(([question, answer], index) => (
        <div
          className={`or-faq-item ${open === index ? "is-open" : ""}`}
          key={question}
        >
          <h3>
            <button
              id={`or-faq-question-${index}`}
              type="button"
              aria-expanded={open === index}
              aria-controls={`or-faq-answer-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {question}
              <Plus size={23} aria-hidden="true" />
            </button>
          </h3>
          <div
            id={`or-faq-answer-${index}`}
            className="or-faq-answer"
            role="region"
            aria-labelledby={`or-faq-question-${index}`}
            inert={open !== index}
          >
            <div>
              <p>{answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
