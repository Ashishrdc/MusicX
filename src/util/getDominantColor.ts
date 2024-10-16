export const getDominantColorFromImage = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Handle cross-origin issues
      img.src = imageUrl;
  
      img.onload = () => {
        // Create a canvas element to draw the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject(new Error("Unable to get 2D context"));
          return;
        }
  
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
        // Get the pixel data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData?.data;
  
        if (!data) {
          reject(new Error("Unable to get image data"));
          return;
        }
  
        let r = 0, g = 0, b = 0;
        let pixelCount = 0;
  
        // Loop through every pixel (each pixel is represented by 4 values: R, G, B, A)
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];     // Red
          g += data[i + 1]; // Green
          b += data[i + 2]; // Blue
          pixelCount++;
        }
  
        // Avoid division by zero (in case of empty or invalid images)
        if (pixelCount === 0) {
          reject(new Error("No pixels found in the image"));
          return;
        }
  
        // Calculate the average color
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);
  
        // Resolve the dominant color as an RGB string
        resolve(`rgb(${r}, ${g}, ${b})`);
      };
  
      img.onerror = (error) => {
        reject(error);
      };
    });
  };
  