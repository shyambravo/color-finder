var genImage = () => {
    const elem = document.getElementById("file");
    const file = elem.files[0];

    let reader = new FileReader();
    var image = new Image();

    reader.onload = () => {
        const base64 = reader.result;

        document.getElementById("colorpane").innerHTML = ";

        image.onload = () => {
            var colorMap = {};

            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
        
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            for(let i=0; i<imageData.data.length - 1; i++) {
                var x = i;
                var y = i;
                  var index = (y*imageData.width + x) * 4;
                  var red = imageData.data[index];
                  var green = imageData.data[index + 1];
                  var blue = imageData.data[index + 2];
                  var alpha = imageData.data[index + 3];

                  if(!red) {
                    break;
                  }

                  const hx = `rgba(${red},${green},${blue},${alpha})`;
                
                if(colorMap[hx]) {
                    colorMap[hx]++
                } else {
                    colorMap[hx] = 1;
                }
            }

            let order = Object.keys(colorMap);

            order = order.sort((a, b) => {
                return colorMap[a] > colorMap[b] ? 1 : -1
            })

            order.forEach((color, index) => {
                const pallete = document.createElement("div");

                pallete.style.width = "150px";
                pallete.style.height = "50px";
                pallete.style.margin = "2px";
                pallete.title = color

                pallete.style.backgroundColor = color;

                document.getElementById("colorpane").appendChild(pallete)
            })
        }

        image.src = base64;
    }

    reader.readAsDataURL(file)
}
