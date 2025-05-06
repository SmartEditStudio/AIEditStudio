
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
let img = new Image();

upload.addEventListener("change", function (e) {
  const file = upload.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function applyFilter(filter) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i], g = data[i + 1], b = data[i + 2];
    if (filter === "grayscale") {
      let avg = (r + g + b) / 3;
      data[i] = data[i + 1] = data[i + 2] = avg;
    } else if (filter === "sepia") {
      data[i] = r * 0.393 + g * 0.769 + b * 0.189;
      data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
      data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
    } else if (filter === "invert") {
      data[i] = 255 - r;
      data[i + 1] = 255 - g;
      data[i + 2] = 255 - b;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
}
