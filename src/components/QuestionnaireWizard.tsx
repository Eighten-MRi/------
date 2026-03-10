import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, User, Stethoscope, ClipboardList, Thermometer, UserCheck } from 'lucide-react';
import type { QuestionnaireData } from '../types/questionnaire';
import { defaultValues } from '../types/questionnaire';
import { Button } from './ui/Button';
import { StepCard, Field } from './ui/StepCard';
import { Input } from './ui/Input';
import { RadioGroup } from './ui/RadioGroup';
import { Textarea } from './ui/Textarea';

const steps = [
    { id: 'basic', title: '基本情報', icon: <User className="w-8 h-8" /> },
    { id: 'symptoms', title: '今回の症状', icon: <Stethoscope className="w-8 h-8" /> },
    { id: 'history', title: '健康状態', icon: <ClipboardList className="w-8 h-8" /> },
    { id: 'lifestyle', title: '生活習慣・他', icon: <Thermometer className="w-8 h-8" /> },
    { id: 'consent', title: '同意確認', icon: <UserCheck className="w-8 h-8" /> },
];

export function QuestionnaireWizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const methods = useForm<QuestionnaireData>({
        defaultValues,
        mode: 'onChange',
    });

    const { watch, setValue } = methods;
    const currentStep = steps[currentStepIndex];
    const isLastStep = currentStepIndex === steps.length - 1;

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            window.scrollTo(0, 0);
        }
    };

    const onSubmit = (data: QuestionnaireData) => {
        console.log('Form Submitted:', data);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
            >
                <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold text-primary-dark mb-4">ご回答ありがとうございました</h2>
                <p className="text-xl text-text-muted mb-8">
                    問診の入力が完了しました。<br />受付にお戻りになり、スタッフにお知らせください。
                </p>
                <Button size="lg" onClick={() => window.location.reload()}>
                    最初に戻る
                </Button>
            </motion.div>
        );
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full flex flex-col">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-primary-light/10">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content Area */}
                <div className="flex-1 mt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep(currentStepIndex, watch, setValue)}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-primary-light/20 flex items-center justify-between gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={prevStep}
                        disabled={currentStepIndex === 0}
                        className={currentStepIndex === 0 ? 'invisible' : ''}
                    >
                        <ChevronLeft className="mr-2 w-6 h-6" />
                        戻る
                    </Button>

                    {isLastStep ? (
                        <Button type="submit" variant="accent" size="lg" className="px-12">
                            回答を完了する
                            <CheckCircle2 className="ml-2 w-6 h-6" />
                        </Button>
                    ) : (
                        <Button type="button" size="lg" onClick={nextStep} className="px-12">
                            次へ進む
                            <ChevronRight className="ml-2 w-6 h-6" />
                        </Button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}

function renderStep(index: number, watch: any, setValue: any) {
    switch (index) {
        case 0:
            return (
                <StepCard title="基本情報を教えてください" icon={<User />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="お名前（フルネーム）" required>
                            <div className="flex gap-2">
                                <Input placeholder="山田" className="flex-1" />
                                <Input placeholder="太郎" className="flex-1" />
                            </div>
                        </Field>
                        <Field label="お名前（ふりがな）" required>
                            <div className="flex gap-2">
                                <Input placeholder="やまだ" className="flex-1" />
                                <Input placeholder="たろう" className="flex-1" />
                            </div>
                        </Field>
                        <Field label="生年月日" required>
                            <Input type="date" className="w-full" />
                        </Field>
                        <Field label="性別" required>
                            <RadioGroup
                                name="gender"
                                className="grid-cols-3"
                                options={[
                                    { label: '男性', value: 'male' },
                                    { label: '女性', value: 'female' },
                                    { label: 'その他', value: 'other' }
                                ]}
                                value={watch('gender')}
                                onChangeValue={(v) => setValue('gender', v as any)}
                            />
                        </Field>
                        <Field label="電話番号" required hint="ハイフンなしで入力してください">
                            <Input type="tel" placeholder="09012345678" />
                        </Field>
                        <Field label="住所" required>
                            <Input placeholder="愛知県名古屋市..." />
                        </Field>
                    </div>
                </StepCard>
            );
        case 1:
            return (
                <StepCard title="症状について教えてください" icon={<Stethoscope />}>
                    <div className="space-y-6">
                        <Field label="今日はどういった症状で受診しましたか？" required hint="一番つらい症状を教えてください">
                            <Textarea placeholder="例：3日前から熱があり、喉が痛いです。" />
                        </Field>
                        <Field label="その症状はいつ頃から始まりましたか？">
                            <Input placeholder="例：3日前の夜から" />
                        </Field>
                        <Field label="症状の変化はありますか？">
                            <RadioGroup
                                name="symptomProgression"
                                options={[
                                    { label: 'だんだんひどくなっている', value: 'worsening' },
                                    { label: '変わらない', value: 'stable' },
                                    { label: '良くなっている', value: 'improving' },
                                    { label: '時々痛む・波がある', value: 'intermittent' }
                                ]}
                                value={watch('symptomProgression')}
                                onChangeValue={(v) => setValue('symptomProgression', v)}
                            />
                        </Field>
                    </div>
                </StepCard>
            );
        case 2:
            return (
                <StepCard title="健康状態について教えてください" icon={<ClipboardList />}>
                    <div className="space-y-6">
                        <Field label="今までに大きな病気（入院・手術など）をしましたか？">
                            <Textarea placeholder="なければ「なし」と記入してください" />
                        </Field>
                        <Field label="現在、他の医療機関に通院していますか？">
                            <Textarea placeholder="病名や通院先の名称を教えてください" />
                        </Field>
                        <Field label="アレルギーはありますか？">
                            <Textarea placeholder="薬、食べ物、アルコールなどがあれば具体的に" />
                        </Field>
                        <Field label="現在、他で処方されているお薬はありますか？">
                            <RadioGroup
                                name="hasMedication"
                                options={[
                                    { label: 'ある（お薬手帳を持っていない）', value: 'yes_no_book' },
                                    { label: 'ある（お薬手帳を持っている）', value: 'yes_with_book' },
                                    { label: 'ない', value: 'no' }
                                ]}
                            />
                        </Field>
                    </div>
                </StepCard>
            );
        case 3:
            const gender = watch('gender');
            return (
                <StepCard title="生活習慣・その他" icon={<Thermometer />}>
                    <div className="space-y-8">
                        <Field label="喫煙について">
                            <RadioGroup
                                name="smoking"
                                className="grid-cols-3"
                                options={[
                                    { label: '吸う', value: 'current' },
                                    { label: '過去に吸っていた', value: 'past' },
                                    { label: '吸わない', value: 'never' }
                                ]}
                                value={watch('smoking')}
                                onChangeValue={(v) => setValue('smoking', v as any)}
                            />
                        </Field>

                        {gender === 'female' && (
                            <div className="p-6 bg-pink-50 rounded-2xl border border-pink-100 space-y-6">
                                <Field label="妊娠されていますか？、または可能性がありますか？">
                                    <RadioGroup
                                        name="isPregnant"
                                        className="grid-cols-2"
                                        options={[
                                            { label: 'はい', value: 'yes' },
                                            { label: 'いいえ', value: 'no' }
                                        ]}
                                        value={watch('isPregnant')}
                                        onChangeValue={(v) => setValue('isPregnant', v as any)}
                                    />
                                </Field>
                                <Field label="現在、授乳中ですか？">
                                    <RadioGroup
                                        name="isBreastfeeding"
                                        className="grid-cols-2"
                                        options={[
                                            { label: 'はい', value: 'yes' },
                                            { label: 'いいえ', value: 'no' }
                                        ]}
                                        value={watch('isBreastfeeding')}
                                        onChangeValue={(v) => setValue('isBreastfeeding', v as any)}
                                    />
                                </Field>
                            </div>
                        )}

                        <Field label="1週間の飲酒頻度を教えてください">
                            <Input placeholder="例：週に2回程度" />
                        </Field>
                    </div>
                </StepCard>
            );
        case 4:
            return (
                <StepCard title="最後に情報の取扱いについて確認です" icon={<UserCheck />}>
                    <div className="space-y-6">
                        <div className="p-6 bg-primary-light/5 rounded-2xl border border-primary-light/20 text-text">
                            <p className="font-semibold mb-4 text-xl">
                                マイナ保険証による診療情報取得への同意
                            </p>
                            <p className="text-lg leading-relaxed">
                                当薬局ではオンライン資格確認を行う体制を有しています。<br />
                                薬剤情報・特定健診情報その他必要な情報を取得・活用して調剤等を行うことに同意いただけますか？
                            </p>
                        </div>

                        <label className="flex items-center gap-4 p-6 border-2 border-primary rounded-2xl cursor-pointer bg-white">
                            <input
                                type="checkbox"
                                className="w-10 h-10 accent-primary rounded-lg"
                                checked={watch('myNumberConsent')}
                                onChange={(e) => setValue('myNumberConsent', e.target.checked)}
                            />
                            <span className="text-xl font-bold">同意して回答を終了する</span>
                        </label>
                    </div>
                </StepCard>
            );
        default:
            return null;
    }
}
