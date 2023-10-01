import { domain } from '../../constant';

export default function Avatar(data: { image: string | undefined }) {
  const { image } = data;
  return (
    <img
      src={
        image === 'null' || image === null
          ? require('../../images/placeholder-img-profile.png')
          : `${domain}${image}`
      }
      alt="user-image"
      className="w-12 h-12 rounded-2xl"
    />
  );
}
