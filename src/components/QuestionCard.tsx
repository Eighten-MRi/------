import React from 'react';
import { Button } from './Button';
import type { Question } from '../data/questions';

type QuestionCardProps = {
    question: Question;
    currentStep: number;
    totalSteps: number;
    onAnswer: (answer: string) => void;
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    currentStep,
    totalSteps,
    onAnswer
}) => {
    return (
        <div className="fade-in">
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-primary-dark)' }}>
                <span style={{ fontWeight: 'bold' }}>Q{currentStep}</span>
                <span>{currentStep} / {totalSteps}</span>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '2rem' }}>
                <div style={{
                    width: `${(currentStep / totalSteps) * 100}%`,
                    height: '100%',
                    background: 'var(--color-primary)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                }} />
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '3rem', textAlign: 'center' }}>
                {question.text}
            </h2>

            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
                {question.options?.map((option) => (
                    <Button
                        key={option}
                        variant="secondary"
                        onClick={() => onAnswer(option)}
                        className="option-btn"
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
};
