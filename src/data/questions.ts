export type Question = {
    id: string;
    text: string;
    type: 'choice' | 'text';
    options?: string[];
    aiPrompt?: string; // For AI generation context
};

export const FIXED_QUESTIONS: Question[] = [
    {
        id: 'q1_change',
        text: '今日はお薬の内容に変更はありましたか？',
        type: 'choice',
        options: ['変更あり', '変更なし', 'わからない'],
        aiPrompt: 'If changed, ask why and what doctor said.'
    },
    {
        id: 'q2_effect',
        text: 'お薬を飲んでいて、効果はどう感じていますか？',
        type: 'choice',
        options: ['良くなっている', '変わらない', '悪くなっている', 'わからない']
    },
    {
        id: 'q3_side_effects',
        text: 'お薬を飲み始めてから、以前にはなかった症状はありませんか？',
        type: 'choice',
        options: ['特にない', 'ふらつき・めまい', '胃の痛み・ムカムカ', '足のむくみ', '乾いた咳', 'その他']
    },
    {
        id: 'q4_adherence',
        text: '指示通りに飲めないことはありましたか？',
        type: 'choice',
        options: ['完璧に飲めた', 'たまに忘れた', '意図的に減らした', '飲みづらい']
    }
];
