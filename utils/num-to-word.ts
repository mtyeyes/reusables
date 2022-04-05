type Singular = string;
type Plural = string;

interface NumToWordOverload {
	(num: number, words: [Singular, Plural], lang: 'en'): string;
	(num: number, words: [Singular, string , Plural], lang?: 'ru'): string;
}

const numToWord: NumToWordOverload = (num: any, words: any, lang: any) => {
	return lang === 'en' ? numToWordEn(num, words) : numToWordRu(num,words);
}

export const numToWordRu = (num: number, words: [string, string, string]) =>{
	num = Math.abs(num) % 100; 

	if(num > 10 && num < 20) return words[2];

	const value = num % 10;

	if(value > 1 && value < 5) return words[1];

	if(value == 1) return words[0]; 

	return words[2];
}

export const numToWordEn = (num: number, words: [string, string]) => {
	return num === 1 ? words[0] : words[1];
}

export default numToWord;