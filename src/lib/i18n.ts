import { LocalizedString } from "@/data/types";
import { Language } from "@/contexts/LanguageContext";

export function resolveLocalizedString(content: LocalizedString, language: Language): string {
    if (typeof content === 'string') {
        return content;
    }
    return content[language] || content['en'] || '';
}
