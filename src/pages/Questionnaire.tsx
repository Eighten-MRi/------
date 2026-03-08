import { useState } from 'react';
import { Layout } from '../components/Layout';
import { QuestionCard } from '../components/QuestionCard';
import { FIXED_QUESTIONS, type Question } from '../data/questions';
import { usePrescription } from '../hooks/usePrescription';
import { generateDynamicQuestion } from '../services/ai';

type QuestionnaireProps = {
    patientId: string;
    onComplete: () => void;
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({ patientId, onComplete }) => {
    const { data: prescription, loading } = usePrescription(patientId);

    // Use state for questions because we modify the list dynamically
    const [questions, setQuestions] = useState<Question[]>(FIXED_QUESTIONS);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isProcessingAI, setIsProcessingAI] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = async (answer: string) => {
        // 1. Save answer
        const newAnswers = { ...answers, [currentQuestion.id]: answer };
        setAnswers(newAnswers);
        setIsProcessingAI(true);

        try {
            // 2. Check for dynamic question from AI
            const nextQuestion = await generateDynamicQuestion(currentQuestion, answer, prescription);

            if (nextQuestion) {
                // Insert new question immediately after current one
                const newQuestions = [...questions];
                newQuestions.splice(currentQuestionIndex + 1, 0, nextQuestion);
                setQuestions(newQuestions);
            }
        } catch (e) {
            console.error('AI Error', e);
        } finally {
            setIsProcessingAI(false);
            proceedToNext();
        }
    };

    const proceedToNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }, 300);
        } else {
            console.log('All answers:', answers);
            onComplete();
        }
    };

    if (loading) {
        return (
            <Layout>
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p>処方データを読み込んでいます...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: '#6b7280' }}>
                患者番号: {patientId}
                {prescription && <span style={{ marginLeft: '1rem', fontSize: '0.8rem', background: '#e0f2fe', padding: '2px 8px', borderRadius: '10px' }}>
                    処方薬: {prescription.drugs.length}種類
                </span>}
            </div>

            {isProcessingAI && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '0.5rem', background: '#fef3c7', textAlign: 'center', fontSize: '0.8rem' }}>
                    AIが回答を分析中...
                </div>
            )}

            <QuestionCard
                question={currentQuestion}
                currentStep={currentQuestionIndex + 1}
                totalSteps={questions.length}
                onAnswer={handleAnswer}
            />
        </Layout>
    );
};
