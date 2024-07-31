# Gem Color Summary Generator

This Node.js script generates a summary of gem color combinations based on predefined shapes and rarity levels. The summary includes both solid and gradient color combinations and saves the output to a CSV file.

## Prerequisites

- Node.js installed on your machine.
- File system (`fs`) module, which is included with Node.js.

## Usage

1. Clone or download the repository to your local machine.

2. Navigate to the directory containing the script.

3. Run the script using Node.js:

   ```bash
   node gem_color_summary.js
   ```
4. The script will generate a gem_color_summary.csv file in the same directory.


## Summary Details

The CSV file contains the following columns:

- **Shape:** The shape code for the gem based on its rarity.
- **Color:** The color or gradient of the gem.
- **Type:** Indicates whether the color is solid or a gradient.

## Customization

- You can modify the shapes for each rarity level in the shapes object.
- The solid colors can be customized in the colors array.

## Example

The output CSV file will look like this:

```bash
Shape,Color,Type
2111,Ruby,solid
2111,Amber,solid
2111,Topaz,solid
.....
2212,Garnet-Sapphire,gradient
2212,Amethyst-Garnet,gradient
2212,Garnet-Amethyst,gradient
2221,Ruby,solid
.....
6666,Garnet-Sapphire,gradient
6666,Amethyst-Garnet,gradient
6666,Garnet-Amethyst,gradient
```


