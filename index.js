import prompt from "prompt";
import colors from "colors";

async function getInput() {
  prompt.message = "";
  prompt.delimiter = " >";
  prompt.colors = false;

  prompt.start();

  console.clear();
  console.log("Welkom! Ik heb wat afmetingen van je nodig:\n");

  async function innerFn() {
    console.log(
      `We starten met de afmetingen van de balk.\nGeef de maten op in ${colors.green(
        "mm"
      )}.`
    );
    const balkPrompt = await prompt.get([
      {
        name: "Breedte",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
      {
        name: "Diepte",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
      {
        name: "Lengte",
        requried: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
    ]);
    console.clear();

    console.log(`Bedankt! Hoe groot is je matras?`);
    const matressPrompt = await prompt.get([
      {
        name: "Breedte",
        default: "1800",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
      {
        name: "Lengte",
        default: "2100",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
    ]);
    console.clear();

    console.log(`Bedankt! Hoe hoog moet het bed van de grond af staan?`);
    const potenPrompt = await prompt.get([
      {
        name: "Hoogte",
        default: "230",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number in mm",
      },
    ]);
    console.clear();

    console.log(
      "Laatste vraag: Uit hoeveel balken moet het hoofdeind bestaan?"
    );
    const hoofdeindPrompt = await prompt.get([
      {
        name: "Aantal",
        default: "8",
        required: true,
        validator: /^\d+$/,
        warning: "Must be a number",
      },
    ]);
    console.clear();

    const balk = {
      width: Number(balkPrompt.Breedte),
      depth: Number(balkPrompt.Diepte),
      length: Number(balkPrompt.Lengte),
    };

    const matress = {
      width: Number(matressPrompt.Breedte),
      length: Number(matressPrompt.Lengte),
    };

    const poten = {
      height: Number(potenPrompt.Hoogte),
    };

    const hoofdeind = {
      bars: Number(hoofdeindPrompt.Aantal),
    };

    console.log("Bedankt voor je input, dit is wat ik heb ontvangen:\n");
    console.log(
      `Balk:\n${colors.grey(
        `Breedte: ${balk.width}mm\Hoogte: ${balk.depth}mm\nLengte: ${balk.length}mm`
      )}\n`
    );
    console.log(
      `Matras:\n${colors.grey(
        `Breedte: ${matress.width}mm\nLengte: ${matress.length}mm`
      )}\n`
    );
    console.log(`Poten:\n${colors.grey(`Hoogte: ${poten.height}mm`)}\n`);
    console.log(
      `Hoofdeind:\n${colors.grey(`Aantal balken: ${hoofdeind.bars}`)}`
    );

    const correctPrompt = await prompt.get([
      {
        name: "Klopt dit? (Y/n)",
        default: "Y",
        required: true,
        validator: /^[Y,n]+$/,
        warning: "Must be Y or n",
      },
    ]);
    console.clear();

    if (correctPrompt["Klopt dit? (Y/n)"] === "Y") {
      return {
        balk,
        matress,
        poten,
        hoofdeind,
      };
    } else {
      console.log("Oke, dan gaan we opnieuw.\n");

      return innerFn();
    }
  }

  return innerFn();
}

const { balk, matress, poten, hoofdeind } = await getInput();

console.log(
  "Ik heb de berekeningen gemaakt! Je hebt de volgende materialen nodig:"
);

const spaces =
  Math.ceil(matress.width / balk.width) % 2 === 0
    ? Math.ceil(matress.width / balk.width) + 1
    : Math.ceil(matress.width / balk.width);
const plateauLength = balk.depth + matress.length + 230;

const plateauBalk = {
  amount: (spaces - 1) / 2 + 1,
  length: plateauLength,
  width: balk.width,
  height: balk.depth,
};
const tussenstukje = {
  amount: ((spaces - 1) / 2) * 4,
  length: balk.depth,
  width: balk.width,
  height: balk.depth,
};

console.log(`\n${colors.grey("Plateau:")}`);
console.log(
  `- Balken: ${colors.green(`${plateauBalk.amount}x`)} ${
    plateauBalk.length
  }mm x ${plateauBalk.width}mm x ${plateauBalk.height}mm (lxbxh)`
);
console.log(
  `- Tussenstukjes: ${colors.green(`${tussenstukje.amount}x`)} ${
    tussenstukje.length
  }mm x ${tussenstukje.width}mm x ${tussenstukje.height}mm (lxbxh)`
);
console.log(
  `- Schroeven: ${colors.green(`${(spaces - 2) * 4 * 2}x`)} ${
    balk.width + 15
  }mm (balk breedte + 15mm)`
);
console.log(
  `- Schroeven met mooie kop: ${colors.green(`16x`)} ${
    balk.width + 15
  }mm (balk breedte + 15mm)`
);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");

const potenBalk = {
  amount: (spaces - 4) * 2,
  length: poten.height,
  width: balk.width,
  height: balk.depth,
};

console.log(`\n${colors.grey("Poten:")}`);
console.log(
  `- Balken: ${colors.green(`${potenBalk.amount}x`)} ${potenBalk.length}mm x ${
    potenBalk.width
  }mm x ${potenBalk.height}mm (lxbxh)`
);
console.log(
  `- Schroeven: ${colors.green(`${(spaces - 4 - 2) * 2 * 2}x`)} ${
    balk.width + 15
  }mm (balk breedte + 15mm)`
);
console.log(
  `- Schroeven met mooie kop: ${colors.green(`8x`)} ${
    balk.width + 15
  }mm (balk breedte + 15mm)`
);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");

const hoofdbordBalkVerticaal = {
  amount: 2,
  length: (hoofdeind.bars * 2 - 1) * balk.width + balk.width + balk.depth + 50,
  width: balk.width,
  height: balk.depth,
};
const hoofdbordBalkHorizontaal = {
  amount: hoofdeind.bars,
  length: plateauLength,
  width: balk.width,
  height: balk.depth,
};

console.log(`\n${colors.grey("Hoofdbord:")}`);
console.log(
  `- Balken: ${colors.green(`${hoofdbordBalkHorizontaal.amount}x`)} ${
    hoofdbordBalkHorizontaal.length
  }mm x ${hoofdbordBalkHorizontaal.width}mm x ${
    hoofdbordBalkHorizontaal.height
  }mm (lxbxh)`
);
console.log(
  `- Balken: ${colors.green(`${hoofdbordBalkVerticaal.amount}x`)} ${
    hoofdbordBalkVerticaal.length
  }mm x ${hoofdbordBalkVerticaal.width}mm x ${
    hoofdbordBalkVerticaal.height
  }mm (lxbxh)`
);
console.log(
  `- Schroeven: ${colors.green(`${hoofdeind.bars * 2}x`)} ${
    Math.floor(balk.depth * 0.667) + 15
  }mm (2/3 van balk diepte + 15mm)`
);
console.log(
  `- Schroeven: ${colors.green("8x")} ${
    balk.width + 20
  }mm (balk breedte + 20mm)`
);
console.log("- Houtlijm");
console.log("- Water gebasseerde polyurethaan hout lak");

let sizes = [
  [plateauBalk.length, plateauBalk.amount],
  [tussenstukje.length, tussenstukje.amount],
  [potenBalk.length, potenBalk.amount],
  [hoofdbordBalkVerticaal.length, hoofdbordBalkVerticaal.amount],
  [hoofdbordBalkHorizontaal.length, hoofdbordBalkHorizontaal.amount],
].sort((a, b) => b[0] - a[0]);

const sawWidth = 4;
const balken = [];

while (sizes.reduce((acc, [, amount]) => acc + amount, 0) > 0) {
  let balkSawSizes = [];
  let balkSize = balk.length;

  sizes = sizes.map(([length, amount]) => {
    if (balkSize < sizes[sizes.length - 1][0]) {
      return [length, amount];
    }

    let newAmount = amount;

    while (newAmount > 0 && balkSize - length > 0) {
      balkSawSizes.push(length);
      balkSize -= length + sawWidth;
      newAmount -= 1;
    }

    return [length, newAmount];
  });

  balken.push(balkSawSizes);
}

console.log(
  `\n\nJe hebt ${colors.green(balken.length)} balken van ${balk.length}mm x ${
    balk.width
  }mm x ${
    balk.depth
  }mm nodig.\n\nUitgaande van een zaagsnede van ${sawWidth}mm, zaag ze als volgt:`
);
balken.forEach((balk, index) => {
  console.log(
    `Balk ${index + 1} in ${Object.entries(
      balk.reduce(
        (acc, stuk) => ({
          ...acc,
          [stuk]: acc[stuk] + 1 || 1,
        }),
        {}
      )
    )
      .sort((a, b) => b[0] - a[0])
      .map(([size, amount]) => `${amount}x ${size}mm`)
      .join(",")}`
  );
});

console.log(
  `\nVan de laatste balk blijft ${
    balk.length -
    balken[balken.length - 1].reduce((acc, balk) => acc + balk + 4, 0)
  }mm over`
);
