
const slugify = (property) => {
  return property.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');    
};

export default slugify;
