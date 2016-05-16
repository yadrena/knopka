import I18n from 'react-native-i18n';
import ru from './ru_RU';
import en from './en_US';

I18n.fallbacks = true;

I18n.translations = {
  'en': en,
  'en-US': en,
  'ru': ru,
  'ru-RU': ru
};

console.log('I18n', I18n.translations);