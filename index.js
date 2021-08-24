import prompt from "prompt";
import colors from "colors";

async function getInput() {
  prompt.message = "";
  prompt.delimiter = " >";
  prompt.colors = false;

  prompt.start();

  console.log("Welkom! Ik heb wat afmetingen van je nodig:\n");

  async function innerFn() {
    console.log(`We starten met de afmetingen van de balk.\nGeef de maten op in ${colors.green("mm")}.`);
    const balkPrompt = await prompt.get([
      {
          name: 'Breedte',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number in mm'
      },
      {
          name: 'Diepte',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number in mm'
      }
    ]);
    console.clear();

    console.log(`Bedankt! Hoe groot is je matras?`);
    const matressPrompt = await prompt.get([
      {
          name: 'Breedte',
          default: '1800',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number in mm'
      },
      {
          name: 'Lengte',
          default: '2100',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number in mm'
      }
    ]);
    console.clear();

    console.log(`Bedankt! Hoe hoog moet het bed van de grond af staan?`);
    const potenPrompt = await prompt.get([
      {
          name: 'Hoogte',
          default: '230',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number in mm'
      }
    ]);
    console.clear();

    console.log("Laatste vraag: Uit hoeveel balken moet het hoofdeind bestaan?");
    const hoofdeindPrompt = await prompt.get([
      {
          name: 'Aantal',
          default: '8',
          required: true,
          validator: /^\d+$/,
          warning: 'Must be a number'
      }
    ]);
    console.clear();

    const balk = {
      width: Number(balkPrompt.Breedte),
      depth: Number(balkPrompt.Diepte),
    }

    const matress = {
      width: Number(matressPrompt.Breedte),
      length: Number(matressPrompt.Lengte),
    }

    const poten = {
      height: Number(potenPrompt.Hoogte),
    }

    const hoofdeind = {
      bars: Number(hoofdeindPrompt.Aantal),
    }

    console.log("Bedankt voor je input, dit is wat ik heb ontvangen:\n");
    console.log(`Balk:\n${colors.grey(`Breedte: ${balk.width}mm\nLengte: ${balk.depth}mm`)}\n`);
    console.log(`Matras:\n${colors.grey(`Breedte: ${matress.width}mm\nLengte: ${matress.length}mm`)}\n`);
    console.log(`Poten:\n${colors.grey(`Hoogte: ${poten.height}mm`)}\n`);
    console.log(`Hoofdeind:\n${colors.grey(`Aantal balken: ${hoofdeind.bars}`)}`);

    const correctPrompt = await prompt.get([
      {
          name: 'Klopt dit? (Y/n)',
          default: 'Y',
          required: true,
          validator: /^[Y,n]+$/,
          warning: 'Must be Y or n'
      }
    ]);
    console.clear();

    if(correctPrompt['Klopt dit? (Y/n)'] === 'Y') {
      return {
        balk,
        matress,
        poten,
        hoofdeind
      }
    } else {
      console.log("Oke, dan gaan we opnieuw.\n")

      return innerFn();
    }
  }

  return innerFn();
}

const { balk, matress, poten, hoofdeind } = await getInput();

console.log("Ik heb de berekeningen gemaakt! Je hebt de volgende materialen nodig:");

const spaces = Math.ceil(matress.width/balk.width) % 2 === 0 ? Math.ceil(matress.width/balk.width) + 1 : Math.ceil(matress.width/balk.width);
const plateauLength = balk.depth + matress.length + 230;

console.log(`\n${colors.grey("Plateau:")}`);
console.log(`- Balken: ${colors.green(`${(spaces - 1) / 2 + 1}x`)} ${plateauLength}mm x ${balk.width}mm x ${balk.depth}mm (lxbxh)`);
console.log(`- Tussenstukjes: ${colors.green(`${(spaces - 1) / 2 * 4}x`)} ${balk.depth}mm x ${balk.width}mm x ${balk.depth}mm (lxbxh)`);
console.log(`- Schroeven: ${colors.green(`${(spaces - 2) * 4 * 2}x`)} ${balk.width + 15}mm (balk breedte + 15mm)`);
console.log(`- Schroeven met mooie kop: ${colors.green(`16x`)} ${balk.width + 15}mm (balk breedte + 15mm)`);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");

console.log(`\n${colors.grey("Poten:")}`);
console.log(`- Balken: ${colors.green(`${(spaces - 4) * 2}x`)} ${poten.height}mm x ${balk.width}mm x ${balk.depth}mm (lxbxh)`);
console.log(`- Schroeven: ${colors.green(`${(spaces - 4 - 2) * 2}x`)} ${balk.width + 15}mm (balk breedte + 15mm)`);
console.log(`- Schroeven met mooie kop: ${colors.green(`8x`)} ${balk.width + 15}mm (balk breedte + 15mm)`);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");

console.log(`\n${colors.grey("Hoofdbord:")}`);
console.log(`- Balken: ${colors.green(`${hoofdeind.bars}x`)} ${plateauLength}mm x ${balk.width}mm x ${balk.depth}mm (lxbxh)`);
console.log(`- Balken: ${colors.green(`2x`)} ${(hoofdeind.bars * 2 - 1) * balk.width + balk.width + balk.depth + 50}mm x ${balk.width}mm x ${balk.depth}mm (lxbxh)`);
console.log(`- Schroeven: ${colors.green(`${hoofdeind.bars * 2}x`)} ${Math.floor((balk.depth * 0.667)) + 15}mm (2/3 van balk diepte + 15mm)`);
console.log(`- Schroeven: ${colors.green("8x")} ${balk.width + 20}mm (balk breedte + 20mm)`);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");
