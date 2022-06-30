export const stringAvatar = (name) => {
  if(!name) return [];
  return {
    children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
  };
};