const randseed = new Array(4);

function seedrand(seed) {
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  let t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor() {
  const h = Math.floor(rand() * 360);
  const s = rand() * 60 + 40 + "%";
  const l = (rand() + rand() + rand() + rand()) * 25 + "%";

  const color = "hsl(" + h + "," + s + "," + l + ")";
  return color;
}

function createImageData(size) {
  const width = size;
  const height = size;

  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;

  const data = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < dataWidth; x++) {
      row[x] = Math.floor(rand() * 2.3);
    }
    const r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    for (let i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

function createCanvas(imageData, color, scale, bgcolor, spotcolor) {
  const c = document.createElement("canvas");
  const width = Math.sqrt(imageData.length);
  c.width = c.height = width * scale;

  const cc = c.getContext("2d");
  cc.fillStyle = bgcolor;
  cc.fillRect(0, 0, c.width, c.height);
  cc.fillStyle = color;

  for (let i = 0; i < imageData.length; i++) {
    const row = Math.floor(i / width);
    const col = i % width;
    cc.fillStyle = imageData[i] === 1 ? color : spotcolor;

    if (imageData[i]) {
      cc.fillRect(col * scale, row * scale, scale, scale);
    }
  }

  return c;
}

function createIcon(seed, size, scale) {
  seedrand(seed);

  const color = createColor();
  const bgcolor = createColor();
  const spotcolor = createColor();
  const imageData = createImageData(size);
  const canvas = createCanvas(imageData, color, scale, bgcolor, spotcolor);

  return canvas;
}

export default createIcon;
