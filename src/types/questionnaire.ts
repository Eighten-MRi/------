export type QuestionnaireData = {
    // 基本情報
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    dob: string;
    age: string;
    gender: 'male' | 'female' | 'other' | '';
    address: string;
    phone: string;

    // 今回の受診について
    mainComplaint: string;
    symptomStart: string;
    symptomProgression: string;
    hasReferral: 'yes' | 'no' | '';

    // 健康状態の履歴
    majorIllness: string;
    currentTreatments: string;
    currentMedication: 'yes' | 'no' | '';
    hasMedicationNotebook: 'yes' | 'no' | '';
    allergies: string;
    recentCheckupNotes: string;

    // 女性向け
    isPregnant: 'yes' | 'no' | 'not_applicable' | '';
    isBreastfeeding: 'yes' | 'no' | 'not_applicable' | '';

    // 生活習慣・その他
    smoking: 'current' | 'past' | 'never' | '';
    alcohol: string;

    // マイナ保険証
    myNumberConsent: boolean;
};

export const defaultValues: QuestionnaireData = {
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    dob: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    mainComplaint: '',
    symptomStart: '',
    symptomProgression: '',
    hasReferral: '',
    majorIllness: '',
    currentTreatments: '',
    currentMedication: '',
    hasMedicationNotebook: '',
    allergies: '',
    recentCheckupNotes: '',
    isPregnant: '',
    isBreastfeeding: '',
    smoking: '',
    alcohol: '',
    myNumberConsent: false,
};
