import { useLanguage } from '@/contexts/LanguageContext';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';

const locales = { en, ja };

export function useTranslation() {
    const { language } = useLanguage();
    const dictionary = locales[language] || en;

    const t = (key: keyof typeof en) => {
        if (!dictionary) {
            console.error(`Translation error: Dictionary not found for language ${language}`);
            return en[key] || key;
        }
        return dictionary[key] || en[key] || key;
    };

    return { t, language };
}
