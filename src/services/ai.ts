import type { Question } from '../data/questions';
import type { Prescription } from '../hooks/usePrescription';

// This function will eventually call OpenAI/Anthropic API
export const generateDynamicQuestion = async (
    currentQuestion: Question,
    answer: string,
    prescription: Prescription | null
): Promise<Question | null> => {

    console.log('AI Generating question for:', { currentQuestion, answer, prescription });

    // Mock Logic for Demo

    // 1. If prescription changed (from basic question) -> Ask reason if AI is active
    if (currentQuestion.id === 'q1_change' && answer === '変更あり') {
        return {
            id: 'ai_q1_detail',
            text: 'お薬が変わりましたが、医師からはどのように説明がありましたか？',
            type: 'choice',
            options: [
                '症状が良くなったため減量',
                '効果が不十分で増量/変更',
                '副作用が出たため変更',
                'ジェネリックへの変更',
                'その他'
            ]
        };
    }

    // 2. Logic based on Prescription Data (Side effect check)
    // This would be triggered at startup or specific phase, but for now hooked to Q3
    if (currentQuestion.id === 'q3_side_effects' && prescription) {
        const highRiskDrugs = prescription.drugs.filter(d => d.category === '降圧薬');
        if (highRiskDrugs.length > 0 && answer === 'ふらつき・めまい') {
            return {
                id: 'ai_q3_risk',
                text: '降圧薬の影響の可能性があります。それは「立ち上がった時」に強く感じますか？',
                type: 'choice',
                options: ['はい（立ちくらみ）', 'いいえ（常に回る感じ）', 'わからない']
            };
        }
    }

    // 3. Adherence check
    if (currentQuestion.id === 'q4_adherence' && answer === '飲みづらい') {
        return {
            id: 'ai_q4_reason',
            text: 'どのように飲みづらいですか？',
            type: 'choice',
            options: ['粒が大きい', '数が多い', '味が苦い', '袋が開けにくい']
        };
    }

    return null;
};
