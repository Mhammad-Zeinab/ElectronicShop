//generate moduleId
let currentId = 0;

function generateCustomId(){
  currentId++;
  const paddedId = currentId.toString().padStart(3, '0');
  return `M${paddedId}`;
};

module.exports = {generateCustomId};