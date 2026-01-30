import itFlag from '@/assets/flags/it.svg';
import enFlag from '@/assets/flags/en.svg';

export const MAX_RESULTS = 10;
export const API_BASE_URL = "http://localhost:1337"; // Base URL for the API, change as needed from localhost to production URL
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Array of supported languages with their codes, labels, and flag image paths
export const languages = [
    { code: 'it', label: 'Italiano', flag: itFlag },
    { code: 'en', label: 'English', flag: enFlag },
];

// Array of platforms social links and icons
export const platforms = [
    { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/tuapagina', icon: 'bi-facebook' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/tuapagina', icon: 'bi-instagram' },
    { id: 'tiktok', name: 'Tik Tok', url: 'https://www.instagram.com/tuapagina', icon: 'bi-tiktok' },
    { id: 'vinted', name: 'Vinted', url: 'https://www.vinted.it', icon: 'bi-bag' } // fallback per Vinted
];

// Array of categories filters to apply on products (collection category on stapi backend)
export const categories = [
    "portachiavi",
    "pupazzo"
]