import { ReactComponent as LockSvg } from '../../assets/images/icons/lock.svg';
import { IconProps } from './IconProps';

export default function LockIcon({ className }: IconProps) {
  return <LockSvg className={className} />;
}
