import { useState, useEffect } from 'react';

export type Drug = {
    code: string;
    name: string;
    category: string; // e.g. '降圧薬', '鎮痛薬'
    isNew: boolean; // 新規処方かどうか
};

export type Prescription = {
    patientId: string;
    issueDate: string;
    drugs: Drug[];
};

// Mock Data
const MOCK_DB: Record<string, Prescription> = {
    '12345': {
        patientId: '12345',
        issueDate: new Date().toISOString(),
        drugs: [
            { code: 'A01', name: 'アムロジピン錠5mg', category: '降圧薬', isNew: false },
            { code: 'B01', name: 'ロキソニン錠60mg', category: '鎮痛薬', isNew: true }
        ]
    },
    '99999': {
        patientId: '99999',
        issueDate: new Date().toISOString(),
        drugs: [] // No drugs
    }
};

export const usePrescription = (patientId: string) => {
    const [data, setData] = useState<Prescription | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!patientId) return;

        const fetchPrescription = async () => {
            setLoading(true);
            setError(null);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            if (MOCK_DB[patientId]) {
                setData(MOCK_DB[patientId]);
            } else {
                // Fallback for demo: generate random data
                setData({
                    patientId,
                    issueDate: new Date().toISOString(),
                    drugs: [
                        { code: 'X01', name: 'デモ用ビタミン剤', category: 'ビタミン薬', isNew: false }
                    ]
                });
            }
            setLoading(false);
        };

        fetchPrescription();
    }, [patientId]);

    return { data, loading, error };
};
