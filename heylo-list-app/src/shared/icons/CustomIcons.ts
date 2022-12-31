import AppleIcon from './AppleIcon';
import GoogleIcon from './GoogleIcon';


const ICONS: { [key in string]: any } = {
    google: GoogleIcon,
    apple: AppleIcon
}

export const CustomIcon = (name: string) => {
    return ICONS[name];
}
