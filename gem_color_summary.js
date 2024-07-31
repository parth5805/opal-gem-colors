const fs = require('fs');

// Define the shapes for each rarity level
const shapes = {
  common: {
    '0000': '1111', '0001': '1112', '0010': '1121', '0011': '1122',
    '0100': '1211', '0101': '1212', '0110': '1221', '0111': '1222',
    '1000': '2111', '1001': '2112', '1010': '2121', '1011': '2122',
    '1100': '2211', '1101': '2212', '1110': '2221', '1111': '2221', 
  },
  rare: {
    '0000': '2222', '0001': '2223', '0010': '2232', '0011': '2233',
    '0100': '2322', '0101': '2323', '0110': '2332', '0111': '2333',
    '1000': '3222', '1001': '3223', '1010': '3232', '1011': '3233',
    '1100': '3322', '1101': '3323', '1110': '3332', '1111': '3332'
  },
  unique: {
    '0000': '3333', '0001': '3334', '0010': '3343', '0011': '3344',
    '0100': '3433', '0101': '3434', '0110': '3443', '0111': '3444',
    '1000': '4333', '1001': '4334', '1010': '4343', '1011': '4344',
    '1100': '4433', '1101': '4434', '1110': '4443','1111': '4443'
  },
  epic: {
    '0000': '4444', '0001': '4445', '0010': '4454', '0011': '4455',
    '0100': '4544', '0101': '4545', '0110': '4554', '0111': '4555',
    '1000': '5444', '1001': '5445', '1010': '5454', '1011': '5455',
    '1100': '5544', '1101': '5545', '1110': '5554', '1111': '5554'
  },
  legendary: {
    '0000': '5555', '0001': '5556', '0010': '5565', '0011': '5566',
    '0100': '5655', '0101': '5656', '0110': '5665', '0111': '5666',
    '1000': '6555', '1001': '6556', '1010': '6565', '1011': '6566',
    '1100': '6655', '1101': '6656', '1110': '6665', '1111': '6665', 
  },
  mythic: {
    '0000': '6666',
  }
};

// Define the solid colors
const colors = ['Ruby', 'Amber', 'Topaz', 'Emerald', 'Turquoise', 'Sapphire', 'Amethyst', 'Garnet'];

// Function to generate combinations
const generateCombinations = (array, length) => {
  if (length === 1) {
    return array.map(item => [item]);
  }

  const combinations = [];
  array.forEach((item, index) => {
    const smallerCombinations = generateCombinations(array.slice(index + 1), length - 1);
    smallerCombinations.forEach(smallerCombination => {
      combinations.push([item, ...smallerCombination]);
    });
  });

  return combinations;
};

// Generate solid color combinations and gradient combinations
const solidColorCombinations = generateCombinations(colors, 2);
const gradientCombinations = solidColorCombinations.flatMap(solidCombo => [
  [solidCombo[0], solidCombo[1]],
  [solidCombo[1], solidCombo[0]]
]);

// Generate unique summary
const summary = [];

Object.entries(shapes).forEach(([rarity, shapeSet]) => {
  Object.values(shapeSet).forEach(shapeValue => {
    // Add solid color combinations
    colors.forEach(color => {
      summary.push({
        shape: shapeValue,
        color: color,
        type: 'solid'
      });
    });

    // Add gradient combinations
    gradientCombinations.forEach(gradient => {
      summary.push({
        shape: shapeValue,
        color: `${gradient[0]}-${gradient[1]}`,
        type: 'gradient'
      });
    });
  });
});

// Remove duplicate entries
const uniqueSummary = Array.from(new Set(summary.map(s => JSON.stringify(s)))).map(s => JSON.parse(s));

// Convert summary to CSV
const csvData = uniqueSummary.map(row => `${row.shape},${row.color},${row.type}`).join('\n');
fs.writeFileSync('gem_color_summary.csv', `Shape,Color,Type\n${csvData}`);

console.log('Summary has been saved to gem_summary.csv');
