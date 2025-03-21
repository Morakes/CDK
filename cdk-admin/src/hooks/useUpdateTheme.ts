import { ThemeEnum } from '@/enums/appEnums';
import { addClass, hasClass, removeClass } from '@/utils/domUtils';

function useUpdateTheme(mode: ThemeEnum) {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  // 是否存在 ThemeEnum.DARK 类
  const hasDarkClass = hasClass(htmlRoot, ThemeEnum.DARK);
  if (mode === ThemeEnum.DARK) {
    htmlRoot.setAttribute('data-theme', ThemeEnum.DARK);
    if (!hasDarkClass) {
      addClass(htmlRoot, ThemeEnum.DARK);
    }
  } else {
    htmlRoot.setAttribute('data-theme', ThemeEnum.LIGHT);
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}

export default useUpdateTheme;
